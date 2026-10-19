"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CLIENT_FUNNEL_EVENTS, hasFunnelConsent, type ClientFunnelEvent } from "@/lib/funnel";
export default function FunnelTelemetry() {
  const pathname = usePathname();
  useEffect(() => {
    function send(event: ClientFunnelEvent) {
      const gpc = "globalPrivacyControl" in navigator && navigator.globalPrivacyControl === true;
      if (!hasFunnelConsent(document.cookie, gpc ? "1" : null)) return;
      void fetch("/api/analytics/funnel", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event }), keepalive: true }).catch(() => {});
    }
    if (pathname.startsWith("/sign-up")) send("signup_started");
    if (["/pricing", "/premium", "/upgrade"].includes(pathname)) send("premium_visit");
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-funnel-event]") : null;
      const name = target?.dataset.funnelEvent;
      if (name && CLIENT_FUNNEL_EVENTS.includes(name as ClientFunnelEvent)) send(name as ClientFunnelEvent);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);
  return null;
}
