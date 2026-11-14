export const installGuideEvent = "tgpi:open-install-guide";
export const installReminderKey = "tgpi:pwa-install-reminder:v2";
export const legacyInstallDismissKey = "tgpi:pwa-install-dismissed:v1";
export const installReminderDelay = 14 * 24 * 60 * 60 * 1000;

export const installPlatforms = ["ios", "android", "chromium", "edge", "safari", "firefoxWindows", "samsung", "firefoxAndroid", "other"] as const;
export type InstallPlatform = typeof installPlatforms[number];

export function detectInstallPlatform(userAgent: string, platform: string, touchPoints: number): InstallPlatform {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua) || (platform === "MacIntel" && touchPoints > 1)) return "ios";
  if (/instagram|fban|fbav|tiktok|; wv\)/.test(ua)) return "other";
  if (ua.includes("android")) {
    if (ua.includes("samsungbrowser")) return "samsung";
    if (ua.includes("firefox")) return "firefoxAndroid";
    return "android";
  }
  if (ua.includes("edg/")) return "edge";
  if (ua.includes("firefox") && ua.includes("windows")) return "firefoxWindows";
  if (/chrome\/|chromium\//.test(ua)) return "chromium";
  if (ua.includes("macintosh") && ua.includes("safari/")) return "safari";
  return "other";
}

export function canInviteToInstall(pathname: string) {
  return ["/profile", "/dashboard", "/plan", "/courses"].includes(pathname);
}

export function isInstallReminderPaused(value: string | null, now: number) {
  return Number(value) > now;
}
