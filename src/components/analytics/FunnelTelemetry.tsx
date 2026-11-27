"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CLIENT_FUNNEL_EVENTS, type ClientFunnelEvent } from "@/lib/funnel";
import { sendClientFunnelEvent } from "@/lib/funnel.client";
export default function FunnelTelemetry() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/guia-paises") sendClientFunnelEvent("country_guide_view");
    if (pathname.startsWith("/sign-up")) sendClientFunnelEvent("signup_started");
    if (["/pricing", "/premium", "/upgrade"].includes(pathname)) sendClientFunnelEvent("premium_visit");
    if (/^\/verify\/credentials\/TGPI-[A-Z0-9_-]+$/.test(pathname) && document.querySelector('[data-state="active_verified"]')) sendClientFunnelEvent("credential_verification_viewed");
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-funnel-event]") : null;
      const name = target?.dataset.funnelEvent;
      if (name && CLIENT_FUNNEL_EVENTS.includes(name as ClientFunnelEvent)) sendClientFunnelEvent(name as ClientFunnelEvent);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);
  return null;
}
