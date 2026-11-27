export const FUNNEL_CONSENT_COOKIE = "tgpi_analytics_consent";
export const CLIENT_FUNNEL_EVENTS = ["home_primary_cta", "country_guide_view", "country_guide_download", "country_guide_compare_opened", "editorial_compare_opened", "editorial_pdf_clicked", "editorial_signup_clicked", "signup_started", "premium_visit", "credential_linkedin_opened", "credential_verification_viewed"] as const;
export type ClientFunnelEvent = typeof CLIENT_FUNNEL_EVENTS[number];
export type FunnelEvent = ClientFunnelEvent | "credential_issued" | "signup_completed" | "checkout_started" | "subscription_confirmed" | "plan_context_saved" | "comparison_saved" | "learning_started" | "learning_checkpoint_saved" | "document_checkpoint_saved";
export function hasFunnelConsent(cookie: string | null, globalPrivacyControl: string | null = null) {
  return globalPrivacyControl !== "1" && (cookie ?? "").split(";").some(part => part.trim() === `${FUNNEL_CONSENT_COOKIE}=granted`);
}
