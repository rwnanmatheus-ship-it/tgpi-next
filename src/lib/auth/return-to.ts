/** Deliberately narrow local destinations. Never accept protocol-relative or external redirects. */
const destinations = new Set(["/onboarding", "/profile", "/country-fit", "/compare", "/pricing", "/courses", "/passport", "/plan", "/premium", "/welcome", "/certificates", "/global-key", "/notifications", "/settings", "/profile/security", "/atlas"]);
export function safeReturnTo(value: unknown, fallback = "/onboarding"): string {
  if (typeof value !== "string" || value.length > 1024 || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u0020]/.test(value)) return fallback;
  try {
    const url = new URL(value, "https://tgpi.invalid");
    if (url.origin !== "https://tgpi.invalid" || (!destinations.has(url.pathname) && !/^\/(?:countries|member)\/[a-zA-Z0-9-]+$/.test(url.pathname) && !/^\/courses\/[a-zA-Z0-9-]+(?:\/(?:study|history|lessons\/[a-z0-9-]+|certification(?:\/[a-z0-9-]+)?))?$/.test(url.pathname))) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch { return fallback; }
}

/** Reuse a pending profile destination when switching between access routes. */
export function registrationReturnTo(value: unknown): string {
  const url = new URL(safeReturnTo(value), "https://tgpi.invalid");
  const destination = safeReturnTo(url.pathname === "/welcome" ? url.searchParams.get("next") : value);
  return new URL(destination, url.origin).pathname === "/welcome" ? "/onboarding" : destination;
}

export function registrationUrl(value: unknown): string {
  return `/welcome?next=${encodeURIComponent(registrationReturnTo(value))}`;
}
