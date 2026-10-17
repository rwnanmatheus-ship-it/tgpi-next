"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = { children: ReactNode; navigation: ReactNode; footer: ReactNode; runtime: ReactNode };

/** Dedicated access routes retain their own brand/navigation, without site chrome. */
export default function AccessAwareChrome({ children, navigation, footer, runtime }: Props) {
  const pathname = usePathname();
  const focused = ["/sign-in", "/sign-up", "/welcome", "/login"].some(route => pathname === route || pathname.startsWith(`${route}/`));
  return <>{focused ? null : navigation}{children}{focused ? null : footer}{focused ? null : runtime}</>;
}
