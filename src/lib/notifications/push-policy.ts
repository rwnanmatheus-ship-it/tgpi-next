import type { NotificationEvent, NotificationPreferences } from "./model";

export type BrowserPushSubscription = {
  endpoint: string;
  expirationTime: number | null;
  keys: { p256dh: string; auth: string };
};
export function allowedPushEndpoint(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2048) return false;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.port ||
      url.username ||
      url.password ||
      url.hash
    )
      return false;
    return (
      url.hostname === "fcm.googleapis.com" ||
      url.hostname === "updates.push.services.mozilla.com" ||
      url.hostname.endsWith(".push.services.mozilla.com") ||
      url.hostname.endsWith(".push.apple.com") ||
      url.hostname === "web.push.apple.com" ||
      url.hostname.endsWith(".notify.windows.com")
    );
  } catch {
    return false;
  }
}
export function parsePushSubscription(value: unknown): BrowserPushSubscription {
  const input = value as Partial<BrowserPushSubscription> | null;
  if (
    !input ||
    !allowedPushEndpoint(input.endpoint) ||
    !input.keys ||
    !/^[A-Za-z0-9_-]{87}$/.test(input.keys.p256dh) ||
    !/^[A-Za-z0-9_-]{22}$/.test(input.keys.auth)
  )
    throw new Error("Invalid push subscription.");
  return {
    endpoint: input.endpoint,
    expirationTime:
      typeof input.expirationTime === "number" &&
      Number.isFinite(input.expirationTime)
        ? input.expirationTime
        : null,
    keys: { p256dh: input.keys.p256dh, auth: input.keys.auth },
  };
}
const pushKeys = {
  account: "pushAccount",
  billing: "pushBilling",
  learning: "pushLearning",
  planning: "pushPlanning",
  community: "pushCommunity",
  product: "pushProduct",
} as const;
export function pushCategoryEnabled(
  event: NotificationEvent,
  preferences: NotificationPreferences,
) {
  return preferences.pushEnabled && preferences[pushKeys[event.category]];
}
function minutesInZone(date: Date, zone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  return (
    Number(parts.find((p) => p.type === "hour")?.value) * 60 +
    Number(parts.find((p) => p.type === "minute")?.value)
  );
}
export function inQuietHours(prefs: NotificationPreferences, date: Date) {
  if (!prefs.quietHours || prefs.quietStart === prefs.quietEnd) return false;
  const number = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
  const start = number(prefs.quietStart),
    end = number(prefs.quietEnd),
    minute = minutesInZone(date, prefs.timezone);
  return start < end
    ? minute >= start && minute < end
    : minute >= start || minute < end;
}
/** Find the next permitted instant, including DST changes and quiet periods crossing midnight. */
export function nextPushTime(prefs: NotificationPreferences, now = new Date()) {
  let time = Math.max(now.getTime(), Date.parse(prefs.pausedUntil) || 0);
  if (!inQuietHours(prefs, new Date(time))) return time;
  time = Math.ceil(time / 60000) * 60000;
  for (let i = 0; i < 1500; i++, time += 60000)
    if (!inQuietHours(prefs, new Date(time))) return time;
  return time;
}
export function pushLocalDay(prefs: NotificationPreferences, now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: prefs.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function retryPushAt(attempts: number, now: number) {
  return now + Math.min(3600000, 60000 * 2 ** Math.max(0, attempts - 1));
}
