/** Deliberately narrow local destinations. Never accept protocol-relative or external redirects. */
const destinations = new Set(["/onboarding", "/profile", "/country-fit", "/compare", "/pricing", "/courses", "/passport", "/plan", "/premium", "/welcome", "/certificates", "/global-key", "/notifications", "/settings", "/profile/security"]);
export function safeReturnTo(value: unknown, fallback = "/onboarding"): string {
  if (typeof value !== "string" || value.length > 1024 || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u0020]/.test(value)) return fallback;
  try {
    const url = new URL(value, "https://tgpi.invalid");
    if (url.origin !== "https://tgpi.invalid" || (!destinations.has(url.pathname) && !/^\/(?:countries|member|courses)\/[a-zA-Z0-9-]+(?:\/(?:lessons\/[a-z0-9-]+|certification(?:\/[a-z0-9-]+)?))?$/.test(url.pathname))) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch { return fallback; }
}
