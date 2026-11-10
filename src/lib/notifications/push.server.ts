import "server-only";
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";
import webpush from "web-push";
import { clerkClient } from "@clerk/nextjs/server";
import {
  createFirestoreDeleteWrite as del,
  createFirestoreUpdateWrite as put,
  getFirestoreDocument as get,
  runFirestoreQuery as query,
  runFirestoreTransaction as transaction,
  type JsonValue,
} from "@/lib/firestore-admin-rest.server";
import {
  notificationRoot,
  notificationUserPath,
  notificationItemPath,
  notificationJobPath,
} from "./paths";
import {
  parsePreferences,
  type InboxNotification,
  type NotificationPreferences,
} from "./model";
import {
  nextPushTime,
  parsePushSubscription,
  pushCategoryEnabled,
  pushLocalDay,
  retryPushAt,
  type BrowserPushSubscription,
} from "./push-policy";
import { notificationsConfigured } from "./store.server";
import { resolveLocale, type Locale } from "@/lib/localization/config";
import { notificationText, localizedNotification } from "./text";

export type NotificationUser = {
  preferences?: NotificationPreferences;
  deviceIds?: string[];
  initialized?: boolean;
  nextSyncAt?: number;
  locale?: string;
  dailyDay?: string;
  dailyCount?: number;
  [key: string]: JsonValue | undefined;
};
type Device = {
  uid: string;
  id: string;
  ciphertext: string;
  label: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: number;
  lastAcceptedAt?: string;
  lastError?: number;
};
type Job = {
  uid: string;
  notificationId: string;
  status: string;
  attempts: number;
  nextAttemptAt: number;
  expiresAt: number;
  createdAt: string;
  deliveredDevices: string[];
  lease?: string;
  lastError?: string;
  reserved?: boolean;
};
const record = (value: object) => value as Record<string, JsonValue>;
const devicePath = (id: string) => `${notificationRoot}/devices/${id}`;
const terminal = 8640000000000000;
const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
export function pushConfigured() {
  return (
    notificationsConfigured() &&
    Boolean(
      process.env.TGPI_PUSH_VAPID_PUBLIC_KEY &&
        process.env.TGPI_PUSH_VAPID_PRIVATE_KEY,
    )
  );
}
function encryptionKey() {
  return createHash("sha256")
    .update(`tgpi-push-storage:${process.env.TGPI_PUSH_VAPID_PRIVATE_KEY}`)
    .digest();
}
function seal(value: BrowserPushSubscription) {
  const iv = randomBytes(12),
    cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  return Buffer.concat([
    iv,
    cipher.update(JSON.stringify(value)),
    cipher.final(),
    cipher.getAuthTag(),
  ]).toString("base64url");
}
function unseal(value: string): BrowserPushSubscription {
  const bytes = Buffer.from(value, "base64url"),
    decipher = createDecipheriv(
      "aes-256-gcm",
      encryptionKey(),
      bytes.subarray(0, 12),
    );
  decipher.setAuthTag(bytes.subarray(-16));
  return parsePushSubscription(
    JSON.parse(
      Buffer.concat([
        decipher.update(bytes.subarray(12, -16)),
        decipher.final(),
      ]).toString(),
    ),
  );
}
export async function getPushDevices(uid: string) {
  const state = await get<NotificationUser>(notificationUserPath(uid));
  const devices = await Promise.all(
    (state?.data.deviceIds || [])
      .slice(0, 10)
      .map((id) => get<Device>(devicePath(id))),
  );
  return devices.flatMap((d) =>
    d?.data.uid === uid
      ? [
          {
            id: d.data.id,
            label: d.data.label,
            updatedAt: d.data.updatedAt,
            lastAcceptedAt: d.data.lastAcceptedAt || null,
          },
        ]
      : [],
  );
}
export async function registerPushDevice(
  uid: string,
  input: Record<string, unknown>,
  userAgent: string,
) {
  if (!pushConfigured()) throw new Error("Push is unavailable.");
  const subscription = parsePushSubscription(input.subscription),
    id = hash(subscription.endpoint),
    path = devicePath(id),
    up = notificationUserPath(uid);
  // Validate an actual uncompressed P-256 point; malformed keys never reach a provider.
  if (Buffer.from(subscription.keys.p256dh, "base64url")[0] !== 4)
    throw new Error("Invalid push key.");
  const now = new Date().toISOString(),
    locale = resolveLocale(input.locale) || "en";
  await transaction(async ({ getDocuments }) => {
    const docs = await getDocuments<NotificationUser | Device>([path, up]);
    const device = docs.get(path)?.data as Device | undefined,
      user = docs.get(up)?.data as NotificationUser | undefined;
    const ids = [...new Set([...(user?.deviceIds || []), id])];
    if (ids.length > 10)
      throw new Error("Remove a device before adding another.");
    const writes = [];
    if (device && device.uid !== uid) {
      const oldPath = notificationUserPath(device.uid),
        old = (await getDocuments<NotificationUser>([oldPath])).get(oldPath);
      if (old)
        writes.push(
          put(
            oldPath,
            {
              ...old.data,
              deviceIds: (old.data.deviceIds || []).filter(
                (item) => item !== id,
              ),
            },
            { updateTime: old.updateTime },
          ),
        );
    }
    const prefs = parsePreferences(user?.preferences);
    // Explicit subscribe enables the channel. Background refresh must never undo an opt-out.
    if (input.enable === true) prefs.pushEnabled = true;
    if (typeof input.timezone === "string")
      prefs.timezone = parsePreferences({ timezone: input.timezone }).timezone;
    writes.push(
      put(
        up,
        { ...user, preferences: prefs, locale, deviceIds: ids, nextSyncAt: 0 },
        docs.get(up)
          ? { updateTime: docs.get(up)!.updateTime }
          : { exists: false },
      ),
    );
    writes.push(
      put(
        path,
        record({
          uid,
          id,
          ciphertext: seal(subscription),
          label: /iPhone|iPad/.test(userAgent)
            ? "iPhone / iPad"
            : /Android/.test(userAgent)
              ? "Android"
              : /Mac/.test(userAgent)
                ? "Mac"
                : /Windows/.test(userAgent)
                  ? "Windows"
                  : "Browser",
          locale,
          createdAt: device?.uid === uid ? device.createdAt : now,
          updatedAt: now,
          expiresAt: subscription.expirationTime || Date.now() + 90 * 86400000,
          ...(device?.uid === uid && device.lastAcceptedAt
            ? { lastAcceptedAt: device.lastAcceptedAt }
            : {}),
        }),
        docs.get(path)
          ? { updateTime: docs.get(path)!.updateTime }
          : { exists: false },
      ),
    );
    return { result: true, writes };
  });
  return id;
}
export async function removePushDevice(uid: string, id: string) {
  if (!/^[a-f0-9]{64}$/.test(id)) throw new Error("Invalid device.");
  const path = devicePath(id),
    up = notificationUserPath(uid);
  return transaction(async ({ getDocuments }) => {
    const docs = await getDocuments<Device | NotificationUser>([path, up]);
    const device = docs.get(path)?.data as Device | undefined,
      user = docs.get(up)?.data as NotificationUser | undefined;
    if (device && device.uid !== uid) return { result: false, writes: [] };
    return {
      result: true,
      writes: [
        ...(device ? [del(path)] : []),
        ...(user
          ? [
              put(
                up,
                {
                  ...user,
                  deviceIds: (user.deviceIds || []).filter(
                    (value) => value !== id,
                  ),
                },
                { updateTime: docs.get(up)!.updateTime },
              ),
            ]
          : []),
      ],
    };
  });
}
async function send(
  device: Device,
  item: InboxNotification,
  prefs: NotificationPreferences,
  test = false,
) {
  const locale = (resolveLocale(device.locale) || "en") as Locale;
  const event = localizedNotification(item, locale);
  const result = await webpush.sendNotification(
    unseal(device.ciphertext),
    JSON.stringify({
      title: test
        ? notificationText(locale, "testTitle")
        : prefs.showPreview
          ? event.title
          : "TGPI",
      body: test
        ? notificationText(locale, "testBody")
        : prefs.showPreview
          ? event.body
          : notificationText(locale, "privatePush"),
      href: item.href,
      id: item.id,
      tag: `tgpi-${item.id}`,
      timestamp: Date.parse(item.createdAt),
    }),
    {
      TTL: 86400,
      urgency: item.important ? "high" : "normal",
      topic: hash(item.id).slice(0, 32),
      timeout: 8000,
      vapidDetails: {
        subject: "mailto:corporate@theglobalpolymath.com",
        publicKey: process.env.TGPI_PUSH_VAPID_PUBLIC_KEY!,
        privateKey: process.env.TGPI_PUSH_VAPID_PRIVATE_KEY!,
      },
    },
  );
  return result.statusCode;
}
async function markDeviceAccepted(uid: string, id: string) {
  await transaction(async ({ getDocuments }) => {
    const doc = (await getDocuments<Device>([devicePath(id)])).get(
      devicePath(id),
    );
    return {
      result: true,
      writes:
        doc?.data.uid === uid
          ? [
              put(
                devicePath(id),
                record({
                  ...doc.data,
                  lastAcceptedAt: new Date().toISOString(),
                }),
                { updateTime: doc.updateTime },
              ),
            ]
          : [],
    };
  });
}
export async function testPushDevice(uid: string, id: string) {
  if (!/^[a-f0-9]{64}$/.test(id)) throw new Error("Invalid device.");
  const path = `${notificationUserPath(uid)}/limits/pushTest`;
  const allowed = await transaction(async ({ getDocuments }) => {
    const doc = (await getDocuments<{ nextAt: number }>([path])).get(path);
    if ((doc?.data.nextAt || 0) > Date.now())
      return { result: false, writes: [] };
    return {
      result: true,
      writes: [
        put(
          path,
          { nextAt: Date.now() + 60000 },
          doc ? { updateTime: doc.updateTime } : { exists: false },
        ),
      ],
    };
  });
  if (!allowed) throw new Error("Wait one minute before testing again.");
  const device = await get<Device>(devicePath(id));
  if (!device || device.data.uid !== uid) throw new Error("Device not found.");
  const now = new Date().toISOString();
  try {
    await send(
      device.data,
      {
        id: `test-${randomUUID()}`,
        uid,
        key: "push:test",
        category: "account",
        title: "TGPI",
        body: "",
        href: "/notifications",
        actionLabel: "",
        createdAt: now,
        readAt: null,
        archivedAt: null,
      },
      parsePreferences({}),
      true,
    );
    await markDeviceAccepted(uid, id);
  } catch (error) {
    const code = (error as { statusCode?: number }).statusCode;
    if (code === 404 || code === 410) await removePushDevice(uid, id);
    throw new Error(
      "The push service did not accept the test. Re-enable this device and retry.",
    );
  }
  return { accepted: true };
}
async function updateJob(id: string, lease: string, changes: Partial<Job>) {
  const path = notificationJobPath(id);
  await transaction(async ({ getDocuments }) => {
    const doc = (await getDocuments<Job>([path])).get(path);
    return {
      result: true,
      writes:
        doc?.data.lease === lease
          ? [
              put(path, record({ ...doc.data, ...changes }), {
                updateTime: doc.updateTime,
              }),
            ]
          : [],
    };
  });
}
export async function dispatchPushJob(id: string) {
  const path = notificationJobPath(id),
    lease = randomUUID();
  const job = await transaction(async ({ getDocuments }) => {
    const doc = (await getDocuments<Job>([path])).get(path);
    if (
      !doc ||
      doc.data.nextAttemptAt > Date.now() ||
      !["pending", "retry", "processing"].includes(doc.data.status)
    )
      return { result: null, writes: [] };
    const claimed = {
      ...doc.data,
      lease,
      status: "processing",
      nextAttemptAt: Date.now() + 180000,
    };
    return {
      result: claimed,
      writes: [put(path, record(claimed), { updateTime: doc.updateTime })],
    };
  });
  if (!job) return "unclaimed";
  try {
    const [userDoc, notification, account] = await Promise.all([
      get<NotificationUser>(notificationUserPath(job.uid)),
      get<InboxNotification>(notificationItemPath(job.uid, job.notificationId)),
      (await clerkClient()).users.getUser(job.uid).catch((error: unknown) => {
        if ((error as { status?: number }).status === 404) return null;
        throw error;
      }),
    ]);
    const prefs = parsePreferences(userDoc?.data.preferences);
    const complete = (status: string) =>
      updateJob(id, lease, { status, nextAttemptAt: terminal });
    if (!account) {
      for (const device of userDoc?.data.deviceIds || [])
        await removePushDevice(job.uid, device);
      await complete("account_removed");
      return "skipped";
    }
    if (
      !notification ||
      notification.data.readAt ||
      notification.data.archivedAt ||
      !pushCategoryEnabled(notification.data, prefs) ||
      Date.now() > job.expiresAt
    ) {
      await complete("suppressed");
      return "skipped";
    }
    const next = nextPushTime(prefs);
    if (next > Date.now()) {
      await updateJob(id, lease, { status: "pending", nextAttemptAt: next });
      return "deferred";
    }
    const devices = (
      await Promise.all(
        (userDoc?.data.deviceIds || []).map((id) =>
          get<Device>(devicePath(id)),
        ),
      )
    ).flatMap((d) => (d?.data.uid === job.uid ? [d.data] : []));
    if (!devices.length) {
      await complete("no_devices");
      return "skipped";
    }
    if (!job.reserved) {
      const reserved = await transaction(async ({ getDocuments }) => {
        const up = notificationUserPath(job.uid),
          docs = await getDocuments<NotificationUser | Job>([up, path]);
        const current = docs.get(up)?.data as NotificationUser | undefined,
          currentJob = docs.get(path)?.data as Job | undefined;
        if (currentJob?.lease !== lease) return { result: false, writes: [] };
        const day = pushLocalDay(prefs),
          count = current?.dailyDay === day ? current.dailyCount || 0 : 0;
        if (count >= prefs.dailyLimit) return { result: false, writes: [] };
        return {
          result: true,
          writes: [
            put(
              up,
              { ...current, dailyDay: day, dailyCount: count + 1 },
              { updateTime: docs.get(up)!.updateTime },
            ),
            put(path, record({ ...currentJob, reserved: true }), {
              updateTime: docs.get(path)!.updateTime,
            }),
          ],
        };
      });
      if (!reserved) {
        await updateJob(id, lease, {
          status: "pending",
          nextAttemptAt: Date.now() + 3600000,
        });
        return "limited";
      }
    }
    const deliveredDevices = [...job.deliveredDevices];
    let failed = false;
    for (const device of devices) {
      if (deliveredDevices.includes(device.id)) continue;
      if (device.expiresAt <= Date.now()) {
        await removePushDevice(job.uid, device.id);
        continue;
      }
      // Recheck owner immediately before dispatch; the endpoint may have moved to another account.
      const current = await get<Device>(devicePath(device.id));
      if (current?.data.uid !== job.uid) continue;
      try {
        await send(current.data, notification.data, prefs);
        deliveredDevices.push(device.id);
        await markDeviceAccepted(job.uid, device.id);
      } catch (error) {
        const code = (error as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410)
          await removePushDevice(job.uid, device.id);
        else failed = true;
      }
      // Save progress after each provider acceptance so retries target only the remaining devices.
      await updateJob(id, lease, { deliveredDevices });
    }
    const attempts = job.attempts + 1;
    await updateJob(id, lease, {
      deliveredDevices,
      attempts,
      status: failed ? (attempts >= 6 ? "failed" : "retry") : "accepted",
      nextAttemptAt:
        failed && attempts < 6 ? retryPushAt(attempts, Date.now()) : terminal,
    });
    return failed ? "retry" : "accepted";
  } catch {
    const attempts = job.attempts + 1;
    await updateJob(id, lease, {
      attempts,
      status: attempts >= 6 ? "failed" : "retry",
      nextAttemptAt:
        attempts >= 6 ? terminal : retryPushAt(attempts, Date.now()),
      lastError: "dispatch_unavailable",
    });
    return "retry";
  }
}
export async function dispatchPushBatch() {
  if (!pushConfigured()) return { configured: false, processed: 0 };
  const jobs = await query<Job>(
    {
      from: [{ collectionId: "pushJobs" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "nextAttemptAt" },
          op: "LESS_THAN_OR_EQUAL",
          value: { integerValue: String(Date.now()) },
        },
      },
      orderBy: [
        { field: { fieldPath: "nextAttemptAt" }, direction: "ASCENDING" },
      ],
      limit: 25,
    },
    notificationRoot,
  );
  const statuses: string[] = [];
  // Bounded concurrency keeps Firestore and browser providers below burst limits.
  for (let i = 0; i < jobs.length; i += 5)
    statuses.push(
      ...(await Promise.all(
        jobs
          .slice(i, i + 5)
          .map((job) => dispatchPushJob(job.data.notificationId)),
      )),
    );
  return {
    configured: true,
    processed: statuses.length,
    accepted: statuses.filter((s) => s === "accepted").length,
    retry: statuses.filter((s) => s === "retry").length,
  };
}
