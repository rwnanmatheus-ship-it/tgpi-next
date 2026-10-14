import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { reconcileNotifications } from "@/lib/notifications/reconcile.server";
import { notificationsConfigured } from "@/lib/notifications/store.server";
import {
  createFirestoreUpdateWrite,
  runFirestoreTransaction,
} from "@/lib/firestore-admin-rest.server";
export async function POST(request: Request) {
  const { userId } = await auth();
  const reply = (data: unknown, status = 200) =>
    NextResponse.json(data, {
      status,
      headers: { "Cache-Control": "private, no-store" },
    });
  if (!userId) return reply({ error: "Authentication required." }, 401);
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return reply({ error: "Unverified origin." }, 403);
  if (!notificationsConfigured())
    return reply({ error: "Notification service is unavailable." }, 503);
  const path = `tgpiNotificationSync/${userId}`;
  try {
    const claimed = await runFirestoreTransaction(async ({ getDocuments }) => {
      const doc = (await getDocuments<{ nextAt: number }>([path])).get(path);
      if ((doc?.data.nextAt || 0) > Date.now())
        return { result: false, writes: [] };
      return {
        result: true,
        writes: [
          createFirestoreUpdateWrite(
            path,
            { nextAt: Date.now() + 60_000 },
            doc ? { updateTime: doc.updateTime } : { exists: false },
          ),
        ],
      };
    });
    if (claimed) await reconcileNotifications(userId);
    return reply({ ok: true });
  } catch {
    return reply({ error: "Notification synchronization will retry." }, 503);
  }
}
