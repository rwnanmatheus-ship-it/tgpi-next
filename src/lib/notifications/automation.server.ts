import "server-only";
import { createHash } from "node:crypto";
import {
  createFirestoreUpdateWrite as put,
  getFirestoreDocument as get,
  runFirestoreQuery as query,
  runFirestoreTransaction as transaction,
  type JsonValue,
} from "@/lib/firestore-admin-rest.server";
import { getCountryBySlug } from "@/data/countries";
import type { TgpiActivationProgress } from "@/lib/activation-progress";
import type { NotificationEvent } from "./model";
import { notificationRoot, notificationUserPath } from "./paths";
import { decodeAccountInboxState } from "./account-inbox.server";
import { parsePreferences } from "./model";
import { resolveLocale } from "@/lib/localization/config";
import type { NotificationUser } from "./push.server";

export async function initializeNotificationUser(
  uid: string,
  metadata: Record<string, unknown>,
  locale: unknown,
) {
  const path = notificationUserPath(uid),
    old = decodeAccountInboxState(metadata.tgpiInboxV2);
  await transaction(async ({ getDocuments }) => {
    const doc = (await getDocuments<NotificationUser>([path])).get(path);
    if (doc?.data.initialized) return { result: false, writes: [] };
    return {
      result: true,
      writes: [
        put(
          path,
          {
            ...doc?.data,
            initialized: true,
            preferences: parsePreferences(
              doc?.data.preferences || old.preferences,
            ),
            legacyMarks: old.marks,
            legacySeen: old.seen || {},
            locale: resolveLocale(locale) || "en",
            deviceIds: doc?.data.deviceIds || [],
            nextSyncAt: Date.now() + 300000,
          },
          doc ? { updateTime: doc.updateTime } : { exists: false },
        ),
      ],
    };
  });
  return old;
}
export async function automationEvents(
  uid: string,
  progress: TgpiActivationProgress,
  now = new Date(),
): Promise<NotificationEvent[]> {
  const events: NotificationEvent[] = [];
  const watched = [
    ...new Set([
      ...progress.savedCountries,
      ...progress.comparisons.flatMap((c) => c.countrySlugs),
    ]),
  ].slice(0, 20);
  const fingerprints: Record<string, string> = {};
  for (const slug of watched) {
    const country = getCountryBySlug(slug);
    if (!country) continue;
    fingerprints[slug] = createHash("sha256")
      .update(
        JSON.stringify({
          cost: country.costOfLife,
          intelligence: country.intelligence,
          currency: country.currencyCode,
        }),
      )
      .digest("hex")
      .slice(0, 24);
  }
  const path = `${notificationUserPath(uid)}/automation/research`;
  const previous = await get<{ fingerprints: Record<string, string> }>(path);
  for (const [slug, fingerprint] of Object.entries(fingerprints)) {
    if (
      previous?.data.fingerprints?.[slug] &&
      previous.data.fingerprints[slug] !== fingerprint
    )
      events.push({
        key: `research:country:${slug}:${fingerprint}`,
        category: "planning",
        title: "Your saved country research was updated",
        body: `TGPI updated the research profile for ${getCountryBySlug(slug)!.name}. Review the information and official sources before changing your plan.`,
        href: `/countries/${slug}`,
        actionLabel: "Review country research",
        occurredAt: now.toISOString(),
      });
  }
  // Persist snapshots only after every event has reached the durable inbox (see commitAutomationSnapshot).
  for (const [id, course] of Object.entries(progress.courseProgress)) {
    const age =
      (now.getTime() - Date.parse(course.updatedAt || course.startedAt)) /
      86400000;
    if (!course.completedAt && age >= 3 && age <= 30)
      events.push({
        key: `reminder:course:${id}:${course.updatedAt || course.startedAt}:${Math.floor((age - 3) / 7)}`,
        category: "learning",
        title: "Your next lesson is waiting",
        body: "Continue your saved learning progress whenever you are ready. You can adjust study reminders in notification preferences.",
        href: `/courses/${id}`,
        actionLabel: "Continue learning",
        occurredAt: new Date(
          Date.parse(course.updatedAt || course.startedAt) +
            (3 + 7 * Math.floor((age - 3) / 7)) * 86400000,
        ).toISOString(),
      });
  }
  return events;
}
export async function commitAutomationSnapshot(
  uid: string,
  progress: TgpiActivationProgress,
) {
  const fingerprints: Record<string, string> = {};
  for (const slug of [
    ...new Set([
      ...progress.savedCountries,
      ...progress.comparisons.flatMap((c) => c.countrySlugs),
    ]),
  ].slice(0, 20)) {
    const country = getCountryBySlug(slug);
    if (country)
      fingerprints[slug] = createHash("sha256")
        .update(
          JSON.stringify({
            cost: country.costOfLife,
            intelligence: country.intelligence,
            currency: country.currencyCode,
          }),
        )
        .digest("hex")
        .slice(0, 24);
  }
  await transaction(async () => ({
    result: true,
    writes: [
      put(`${notificationUserPath(uid)}/automation/research`, {
        fingerprints,
        checkedAt: new Date().toISOString(),
      }),
    ],
  }));
}
export async function reconcileNotificationBatch() {
  const users = await query<NotificationUser>(
    {
      from: [{ collectionId: "users" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "nextSyncAt" },
          op: "LESS_THAN_OR_EQUAL",
          value: { integerValue: String(Date.now()) },
        },
      },
      orderBy: [{ field: { fieldPath: "nextSyncAt" }, direction: "ASCENDING" }],
      limit: 20,
    },
    notificationRoot,
  );
  let processed = 0,
    failed = 0;
  const { reconcileNotifications } = await import("./reconcile.server");
  for (const user of users) {
    const uid = user.name.split("/").at(-1)!;
    // Claim before work. An interrupted invocation becomes eligible again in five minutes.
    const claimed = await transaction(async ({ getDocuments }) => {
      const path = notificationUserPath(uid),
        doc = (await getDocuments<NotificationUser>([path])).get(path);
      if (!doc || (doc.data.nextSyncAt || 0) > Date.now())
        return { result: false, writes: [] };
      return {
        result: true,
        writes: [
          put(
            path,
            { ...doc.data, nextSyncAt: Date.now() + 300000 },
            { updateTime: doc.updateTime },
          ),
        ],
      };
    });
    if (!claimed) continue;
    try {
      await reconcileNotifications(uid);
      processed++;
    } catch (error) {
      failed++;
      if ((error as { status?: number }).status === 404) {
        const { eraseNotificationAccount } = await import("./privacy.server");
        await eraseNotificationAccount(uid);
      }
    }
  }
  // Minimal operational heartbeat: no user IDs, messages or device endpoints.
  await transaction(async () => ({
    result: true,
    writes: [
      put(`${notificationRoot}/operations/reconcile`, {
        at: new Date().toISOString(),
        processed,
        failed,
      } as Record<string, JsonValue>),
    ],
  }));
  return { processed, failed };
}
