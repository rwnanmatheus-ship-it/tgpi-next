"use client";
import Link from "next/link";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import { useNotifications } from "@/components/notifications/NotificationProvider";
export default function NotificationBell() {
  const { items } = useNotifications();
  const unread = items.filter(
    (item) => !item.readAt && !item.archivedAt,
  ).length;
  return (
    <Link
      href="/notifications"
      className="tgpi-navigation-square-button relative"
      aria-label={
        unread
          ? `Notifications, ${unread} unread in recent history`
          : "Open notifications"
      }
      title="Notifications"
    >
      <NavigationIcon name="bell" width={20} height={20} />
      {unread > 0 && (
        <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-[#805c17] px-1 text-center text-[10px] font-extrabold text-white">
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </Link>
  );
}
