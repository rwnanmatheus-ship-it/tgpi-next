import "server-only";
import {
  createFirestoreDeleteWrite as del,
  createFirestoreUpdateWrite as put,
  getFirestoreDocument as get,
  runFirestoreQuery as query,
  runFirestoreTransaction as transaction,
} from "@/lib/firestore-admin-rest.server";
import { notificationRoot, notificationUserPath } from "./paths";
import { removePushDevice, type NotificationUser } from "./push.server";
/** Called only after a verified deletion webhook or Clerk's authoritative 404. Work is bounded and resumable. */
export async function eraseNotificationAccount(uid: string) {
  const path = notificationUserPath(uid),
    user = await get<NotificationUser>(path);
  for (const id of user?.data.deviceIds || []) await removePushDevice(uid, id);
  let complete = true;
  for (const collectionId of [
    "inbox",
    "emailIntents",
    "automation",
    "limits",
  ]) {
    const docs = await query({ from: [{ collectionId }], limit: 50 }, path);
    if (docs.length === 50) complete = false;
    if (docs.length)
      await transaction(async () => ({
        result: true,
        writes: docs.map((doc) => del(doc.name.split("/documents/")[1])),
      }));
  }
  const jobs = await query(
    {
      from: [{ collectionId: "pushJobs" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "uid" },
          op: "EQUAL",
          value: { stringValue: uid },
        },
      },
      limit: 50,
    },
    notificationRoot,
  );
  if (jobs.length === 50) complete = false;
  if (jobs.length)
    await transaction(async () => ({
      result: true,
      writes: jobs.map((doc) => del(doc.name.split("/documents/")[1])),
    }));
  await transaction(async ({ getDocuments }) => {
    const latest = (await getDocuments<NotificationUser>([path])).get(path);
    return {
      result: true,
      writes: complete
        ? [del(path), del(`${notificationRoot}/sync/${uid}`)]
        : latest
          ? [
              put(
                path,
                {
                  ...latest.data,
                  nextSyncAt: 0,
                  deviceIds: [],
                  preferences: {
                    ...latest.data.preferences!,
                    pushEnabled: false,
                  },
                },
                { updateTime: latest.updateTime },
              ),
            ]
          : [],
    };
  });
  return complete;
}
