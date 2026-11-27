import { hasFunnelConsent, type ClientFunnelEvent } from "./funnel";

/** Returns whether a consented request was attempted. No page or worksheet data is sent. */
export function sendClientFunnelEvent(event: ClientFunnelEvent): boolean {
  const gpc = "globalPrivacyControl" in navigator && navigator.globalPrivacyControl === true;
  if (!hasFunnelConsent(document.cookie, gpc ? "1" : null)) return false;
  void fetch("/api/analytics/funnel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event }),
    keepalive: true,
  }).catch(() => {});
  return true;
}
