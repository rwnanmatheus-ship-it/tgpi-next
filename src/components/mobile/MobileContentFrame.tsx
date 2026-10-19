"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import JourneyNavigation from "@/components/navigation/JourneyNavigation";
import JourneyContinuation from "@/components/navigation/JourneyContinuation";

export default function MobileContentFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const page = pathname.startsWith("/countries/") ? "country" : pathname.split("/")[1] || "home";
  return <div id="main-content" tabIndex={-1} data-mobile-page={page}><JourneyNavigation pathname={pathname} />{children}<JourneyContinuation pathname={pathname} /></div>;
}
