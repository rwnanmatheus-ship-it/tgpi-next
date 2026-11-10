import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"a"> & {
  href: string;
  prefetch?: boolean;
};

export default function NavigationLink({ href, prefetch, ...props }: Props) {
  const pathname = href.split(/[?#]/, 1)[0].replace(/\/+$/, "");

  // A fresh document loads the active deployment even from a tab on an older build.
  if (pathname === "/profile" || pathname.startsWith("/profile/") || pathname === "/dashboard") {
    return <a {...props} href={href} />;
  }

  return <Link {...props} href={href} prefetch={prefetch} />;
}
