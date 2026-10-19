"use client";

import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import NavigationIcon from "@/components/navigation/NavigationIcon";

export default function WorkspaceSyncButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const lastRefresh = useRef(0);

  useEffect(() => {
    function refreshOnReturn() {
      if (document.visibilityState !== "visible" || Date.now() - lastRefresh.current < 30_000) return;
      lastRefresh.current = Date.now();
      startTransition(() => router.refresh());
    }
    window.addEventListener("focus", refreshOnReturn);
    document.addEventListener("visibilitychange", refreshOnReturn);
    return () => {
      window.removeEventListener("focus", refreshOnReturn);
      document.removeEventListener("visibilitychange", refreshOnReturn);
    };
  }, [router]);

  return (
    <button
      aria-busy={pending}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-[#F0D58C] transition hover:border-[#E5B94B]/50 disabled:opacity-60"
      disabled={pending}
      onClick={() => {
        lastRefresh.current = Date.now();
        startTransition(() => router.refresh());
      }}
      type="button"
    >
      <NavigationIcon name="graph" width={17} height={17} />
      <span aria-live="polite">{pending ? "Updating workspace…" : "Refresh progress"}</span>
    </button>
  );
}
