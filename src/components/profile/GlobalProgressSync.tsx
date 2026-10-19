"use client";

import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { PROGRESS_SYNC_CHANNEL, PROGRESS_SYNC_EVENT } from "@/lib/progress-sync";

// Events update this tab and sibling tabs after a successful write. The visible
// page also refreshes periodically to reconcile changes from other devices.
export default function GlobalProgressSync() {
  const { userId } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (!userId || !(/^\/(profile|ranking|member|compare|country-fit|plan|passport|certificates|courses)(\/|$)/.test(pathname))) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      clearTimeout(timer);
      timer = setTimeout(() => router.refresh(), 350);
    };
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(PROGRESS_SYNC_CHANNEL) : null;
    if (channel) channel.onmessage = refresh;
    window.addEventListener(PROGRESS_SYNC_EVENT, refresh);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    const interval = window.setInterval(refresh, 60_000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      channel?.close();
      window.removeEventListener(PROGRESS_SYNC_EVENT, refresh);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [userId, pathname, router]);
  return null;
}
