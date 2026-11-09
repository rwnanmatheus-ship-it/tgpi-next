"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import JourneyNavigation from "@/components/navigation/JourneyNavigation";
import JourneyContinuation from "@/components/navigation/JourneyContinuation";
import ProductFrame from '@/components/navigation/ProductFrame';
import { isProductRoute } from '@/lib/product-navigation';

export default function MobileContentFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const page = pathname.startsWith("/countries/") ? "country" : pathname.split("/")[1] || "home";
  const product = isProductRoute(pathname);
  return <div id="main-content" tabIndex={-1} data-mobile-page={page}>{product ? null : <JourneyNavigation pathname={pathname} />}<ProductFrame pathname={pathname}>{children}</ProductFrame>{product ? null : <JourneyContinuation pathname={pathname} />}</div>;
}
