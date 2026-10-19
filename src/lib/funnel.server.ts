import "server-only";
import { hasFunnelConsent, type FunnelEvent } from "./funnel";
export function recordFunnelEvent(event: FunnelEvent, consent: boolean) {
  if (process.env.TGPI_FUNNEL_ANALYTICS_ENABLED !== "true" || !consent) return;
  // Aggregate events only: no identity, email, goal, destination, payment or request data.
  console.info(JSON.stringify({ channel: "tgpi_funnel_v1", event, at: new Date().toISOString() }));
}
export function requestFunnelConsent(request: Request) {
  return hasFunnelConsent(request.headers.get("cookie"), request.headers.get("sec-gpc"));
}
