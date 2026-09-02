"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function MobileContentFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const page = pathname.startsWith("/countries/") ? "country" : pathname.split("/")[1] || "home";
  return <div id="main-content" data-mobile-page={page}>{children}</div>;
}
