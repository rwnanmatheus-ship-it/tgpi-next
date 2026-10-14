import "server-only";
import { after } from "next/server";
import { reconcileNotifications } from "./reconcile.server";
import { notificationsConfigured } from "./store.server";
export function scheduleNotificationReconciliation(uid: string) {
  if (!notificationsConfigured()) return;
  after(async () => {
    try {
      await reconcileNotifications(uid);
    } catch {
      console.error(
        "TGPI progress notifications will reconcile on the next authenticated sync.",
      );
    }
  });
}
