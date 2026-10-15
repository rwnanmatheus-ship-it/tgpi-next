import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/guards";
import NotificationInbox from "@/components/notifications/NotificationInbox";
export const metadata: Metadata = {
  title: "Notifications — TGPI",
  robots: { index: false, follow: false },
};
export default async function NotificationsPage() {
  await requireUser();
  return <NotificationInbox />;
}
