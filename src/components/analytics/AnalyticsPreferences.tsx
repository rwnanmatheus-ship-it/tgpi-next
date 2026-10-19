"use client";
import { useSyncExternalStore } from "react";
import { FUNNEL_CONSENT_COOKIE, hasFunnelConsent } from "@/lib/funnel";
const subscribe = (callback: () => void) => { window.addEventListener("tgpi-consent-change", callback); return () => window.removeEventListener("tgpi-consent-change", callback); };
export default function AnalyticsPreferences() {
  const consent = useSyncExternalStore(subscribe, () => hasFunnelConsent(document.cookie), () => false);
  function setConsent(granted: boolean) {
    document.cookie = `${FUNNEL_CONSENT_COOKIE}=${granted ? "granted" : "denied"}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    window.dispatchEvent(new Event("tgpi-consent-change"));
  }
  return <section className="rounded-xl border border-[#D8D2C4] bg-white p-6" aria-labelledby="analytics-choice"><h2 id="analytics-choice" className="text-2xl">Optional usage measurement</h2><p className="mt-3">You can allow basic event counts for Home actions, registration and membership. Event logs exclude your identity, research answers and payment details. This is off by default. Global Privacy Control is respected.</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => setConsent(true)} aria-pressed={consent} className="min-h-11 rounded-lg bg-[#071827] px-5 py-3 text-sm font-bold text-white">Allow optional measurement</button><button type="button" onClick={() => setConsent(false)} aria-pressed={!consent} className="min-h-11 rounded-lg border border-[#9A8F7A] px-5 py-3 text-sm font-bold">Keep measurement off</button></div><p className="mt-3 text-sm" role="status">Your preference: {consent ? "allowed (subject to Global Privacy Control)" : "off"}. You can change it here at any time. Changes apply to future browser events; previously recorded aggregate counts cannot identify you.</p></section>;
}
