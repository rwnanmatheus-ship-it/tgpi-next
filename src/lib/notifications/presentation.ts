import type { InboxNotification } from "./model";
export function notificationGroup(iso: string, now: Date): string {
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return "Earlier";
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  if (date >= today) return "Today";
  if (date >= yesterday) return "Yesterday";
  return "Earlier";
}
export function notificationRelativeTime(iso: string, now: Date): string {
  const seconds = Math.max(0, (now.getTime() - Date.parse(iso)) / 1000);
  if (!Number.isFinite(seconds)) return "Date unavailable";
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
export function sortNotifications(items: InboxNotification[]): InboxNotification[] {
  return [...items].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt) || a.id.localeCompare(b.id));
}
