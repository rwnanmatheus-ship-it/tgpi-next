"use client";
import { useLocale } from "@/components/localization/LocaleProvider";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import { useNotifications } from "@/components/notifications/NotificationProvider";
export default function NotificationBell() {
  const { t } = useLocale();
  const { items, drawerOpen, openDrawer } = useNotifications();
  const unread = items.filter(
    (item) => !item.readAt && !item.archivedAt,
  ).length;
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={drawerOpen}
      onClick={(event) => openDrawer(event.currentTarget)}
      className="tgpi-navigation-square-button relative"
      aria-label={
        unread
          ? t("Notifications, {count} unread in recent history", { count: unread })
          : t("Open notifications")
      }
      title={t("Notifications")}
    >
      <NavigationIcon name="bell" width={20} height={20} />
      {unread > 0 && (
        <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-[#805c17] px-1 text-center text-[10px] font-extrabold text-white">
          {unread > 9 ? "9+" : unread}
        </span>
      )}
    </button>
  );
}
