export const FUNNEL_CONSENT_COOKIE = "tgpi_analytics_consent";
export const CLIENT_FUNNEL_EVENTS = ["home_primary_cta", "signup_started", "premium_visit"] as const;
export type ClientFunnelEvent = typeof CLIENT_FUNNEL_EVENTS[number];
export type FunnelEvent = ClientFunnelEvent | "signup_completed" | "checkout_started" | "subscription_confirmed" | "comparison_saved" | "learning_started" | "learning_checkpoint_saved" | "document_checkpoint_saved";
export function hasFunnelConsent(cookie: string | null, globalPrivacyControl: string | null = null) {
  return globalPrivacyControl !== "1" && (cookie ?? "").split(";").some(part => part.trim() === `${FUNNEL_CONSENT_COOKIE}=granted`);
}
