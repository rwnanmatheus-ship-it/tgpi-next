"use client";

import Link from "next/link";
import { useRef, type ComponentProps } from "react";
import { useNotifications } from "./NotificationProvider";

export default function NotificationInboxLink({ children, ...props }: Omit<ComponentProps<typeof Link>, "onNavigate" | "ref">) {
  const trigger = useRef<HTMLAnchorElement>(null);
  const { drawerOpen, openDrawer } = useNotifications();
  return (
    <Link
      {...props}
      ref={trigger}
      aria-haspopup="dialog"
      aria-expanded={drawerOpen}
      onNavigate={(event) => {
        event.preventDefault();
        openDrawer(trigger.current ?? undefined);
      }}
    >{children}</Link>
  );
}
