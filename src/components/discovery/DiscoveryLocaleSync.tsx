"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { discoveryTransitionRequiresRefresh } from "@/lib/discovery";

/** Refresh shared server chrome when entering, changing or leaving URL-based locales. */
export default function DiscoveryLocaleSync() {
  const pathname = usePathname();
  const router = useRouter();
  const previous = useRef<string | null>(null);
  useEffect(() => {
    const refresh = discoveryTransitionRequiresRefresh(previous.current, pathname);
    previous.current = pathname;
    if (refresh) router.refresh();
  }, [pathname, router]);
  return null;
}
