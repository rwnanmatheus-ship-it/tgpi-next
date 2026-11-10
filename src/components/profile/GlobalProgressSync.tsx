"use client";

import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { PROGRESS_SYNC_CHANNEL, PROGRESS_SYNC_EVENT } from "@/lib/progress-sync";

// Server-rendered account areas reconcile after writes and on return.
// Client learning/research providers own their snapshots without duplicate RSC polling.
export default function GlobalProgressSync() {
  const { isLoaded, sessionId } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const previousSession = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (!isLoaded) return;
    const nextSession = sessionId ?? null;
    if (previousSession.current !== undefined && previousSession.current !== nextSession) router.refresh();
    previousSession.current = nextSession;
  }, [isLoaded, router, sessionId]);
  useEffect(() => {
    if (!sessionId || !(/^\/(profile|ranking|member|plan|passport|certificates|premium)(\/|$)/.test(pathname))) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      if (document.visibilityState !== "visible" || !navigator.onLine) return;
      clearTimeout(timer);
      timer = setTimeout(() => router.refresh(), 350);
    };
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(PROGRESS_SYNC_CHANNEL) : null;
    if (channel) channel.onmessage = refresh;
    window.addEventListener(PROGRESS_SYNC_EVENT, refresh);
    window.addEventListener("focus", refresh);
    window.addEventListener("online", refresh);
    document.addEventListener("visibilitychange", refresh);
    const interval = window.setInterval(refresh, 90_000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      channel?.close();
      window.removeEventListener(PROGRESS_SYNC_EVENT, refresh);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("online", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [sessionId, pathname, router]);
  return null;
}
