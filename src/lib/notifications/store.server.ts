import "server-only";
import { createHash } from "node:crypto";
import {
  createFirestoreUpdateWrite,
  getFirestoreDocument,
  runFirestoreQuery,
  runFirestoreTransaction,
} from "@/lib/firestore-admin-rest.server";
import {
  parsePreferences,
  safeNotificationHref,
  wantsEmail,
  type InboxNotification,
  type NotificationEvent,
  type NotificationPreferences,
} from "./model";

import {
  notificationUserPath as userPath,
  notificationItemPath,
  notificationJobPath,
} from "./paths";
import { pushCategoryEnabled } from "./push-policy";
export const notificationId = (uid: string, key: string) =>
  createHash("sha256").update(`${uid}:${key}`).digest("hex");
export function notificationsConfigured() {
  return Boolean(
    process.env.TGPI_FIREBASE_CLIENT_EMAIL &&
      process.env.TGPI_FIREBASE_PRIVATE_KEY &&
      process.env.TGPI_LEARNING_SECURITY_RULES_CONFIRMED === "true",
  );
}
export async function getNotificationPreferences(uid: string) {
  const document = await getFirestoreDocument<{
    preferences: NotificationPreferences;
  }>(userPath(uid));
  return parsePreferences(document?.data.preferences);
}
export async function saveNotificationPreferences(uid: string, value: unknown) {
  const preferences = parsePreferences(value);
  await runFirestoreTransaction(async ({ getDocuments }) => {
    const current = (
      await getDocuments<
        Record<string, import("@/lib/firestore-admin-rest.server").JsonValue>
      >([userPath(uid)])
    ).get(userPath(uid));
    return {
      result: preferences,
      writes: [
        createFirestoreUpdateWrite(
          userPath(uid),
          {
            ...current?.data,
            preferences,
            updatedAt: new Date().toISOString(),
            nextSyncAt: 0,
          },
          current ? { updateTime: current.updateTime } : { exists: false },
        ),
      ],
    };
  });
  return preferences;
}
export async function publishNotification(
  uid: string,
  event: NotificationEvent,
  options: {
    silent?: boolean;
    readAt?: string | null;
    archivedAt?: string | null;
    createdAt?: string;
  } = {},
) {
  if (!notificationsConfigured())
    throw new Error("Notification storage is not configured.");
  if (
    !safeNotificationHref(event.href) ||
    !event.key ||
    event.key.length > 300 ||
    event.title.length > 160 ||
    event.body.length > 1500
  )
    throw new Error("Invalid notification event.");
  const id = notificationId(uid, event.key);
  const path = notificationItemPath(uid, id);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const docs = await getDocuments<
      InboxNotification | { preferences: NotificationPreferences }
    >([path, userPath(uid)]);
    if (docs.get(path)) return { result: id, writes: [] };
    const preferences = parsePreferences(
      (
        docs.get(userPath(uid))?.data as
          | { preferences?: NotificationPreferences }
          | undefined
      )?.preferences,
    );
    const now = new Date().toISOString();
    const item: InboxNotification = {
      ...event,
      important: Boolean(event.important),
      uid,
      id,
      createdAt: options.createdAt || event.occurredAt || now,
      timestampKind: event.occurredAt ? "event" : "observed",
      readAt: options.readAt || null,
      archivedAt: options.archivedAt || null,
    };
    const writes = [
      createFirestoreUpdateWrite(path, { ...item }, { exists: false }),
    ];
    // The durable intent is atomic with the inbox item. No delivery is claimed until a real provider accepts it.
    if (!options.silent && wantsEmail(event, preferences))
      writes.push(
        createFirestoreUpdateWrite(
          `${userPath(uid)}/emailIntents/${id}`,
          {
            uid,
            notificationId: id,
            category: event.category,
            createdAt: now,
            status: "awaiting_provider",
            attempts: 0,
          },
          { exists: false },
        ),
      );
    if (
      !options.silent &&
      !item.readAt &&
      !item.archivedAt &&
      pushCategoryEnabled(event, preferences)
    )
      writes.push(
        createFirestoreUpdateWrite(
          notificationJobPath(id),
          {
            uid,
            notificationId: id,
            status: "pending",
            attempts: 0,
            nextAttemptAt: Date.now(),
            createdAt: now,
            expiresAt: Date.now() + 48 * 3600000,
            deliveredDevices: [],
          },
          { exists: false },
        ),
      );
    return { result: id, writes };
  });
}
function decodeCursor(value: string, uid: string) {
  const cursor = JSON.parse(
    Buffer.from(value, "base64url").toString("utf8"),
  ) as { name: string; date: string; uid: string };
  if (
    cursor.uid !== uid ||
    !cursor.name.endsWith(
      `/${userPath(uid)}/inbox/${cursor.name.split("/").at(-1)}`,
    ) ||
    !/^[a-f0-9]{64}$/.test(cursor.name.split("/").at(-1) || "") ||
    !Number.isFinite(Date.parse(cursor.date))
  )
    throw new Error("Invalid cursor.");
  return [{ stringValue: cursor.date }, { referenceValue: cursor.name }];
}
export async function listNotifications(uid: string, before?: string) {
  const documents = await runFirestoreQuery<InboxNotification>(
    {
      from: [{ collectionId: "inbox" }],
      orderBy: [
        { field: { fieldPath: "createdAt" }, direction: "DESCENDING" },
        { field: { fieldPath: "__name__" }, direction: "DESCENDING" },
      ],
      ...(before
        ? { startAt: { values: decodeCursor(before, uid), before: false } }
        : {}),
      limit: 50,
    },
    userPath(uid),
  );
  return {
    items: documents.map((d) => d.data),
    nextCursor:
      documents.length === 50
        ? Buffer.from(
            JSON.stringify({
              name: documents.at(-1)!.name,
              date: documents.at(-1)!.data.createdAt,
              uid,
            }),
          ).toString("base64url")
        : null,
  };
}
export async function mutateNotification(
  uid: string,
  id: string,
  action: "read" | "unread" | "archive",
) {
  if (!/^[a-f0-9]{64}$/.test(id)) throw new Error("Invalid notification ID.");
  const path = notificationItemPath(uid, id);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const doc = (await getDocuments<InboxNotification>([path])).get(path);
    if (!doc || doc.data.uid !== uid) return { result: false, writes: [] };
    const now = new Date().toISOString();
    const item = {
      ...doc.data,
      ...(action === "archive"
        ? { archivedAt: now, readAt: doc.data.readAt || now }
        : { readAt: action === "read" ? now : null }),
    };
    return {
      result: true,
      writes: [
        createFirestoreUpdateWrite(path, item, { updateTime: doc.updateTime }),
      ],
    };
  });
}
export async function tryPublishNotification(
  uid: string,
  event: NotificationEvent,
) {
  try {
    return await publishNotification(uid, event);
  } catch {
    console.error("TGPI notification event pending reconciliation", {
      category: event.category,
      key: event.key,
    });
    return null;
  }
}
