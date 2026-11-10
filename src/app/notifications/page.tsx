import { localizeMetadata } from "@/lib/localization/metadata.server";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/guards";
import NotificationInbox from "@/components/notifications/NotificationInbox";
const sourceMetadata: Metadata = {
  title: "Notifications — TGPI",
  robots: { index: false, follow: false },
};
export default async function NotificationsPage() {
  await requireUser();
  return <NotificationInbox />;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
