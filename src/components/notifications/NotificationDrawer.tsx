"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import { containDialogFocus } from "@/lib/dialog-focus";
import { notificationText } from "@/lib/notifications/text";
import NotificationInbox from "./NotificationInbox";
import { useNotifications } from "./NotificationProvider";
import styles from "./NotificationInbox.module.css";

export default function NotificationDrawer() {
  const { closeDrawer, drawerTrigger } = useNotifications();
  const { locale } = useLocale();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const trigger = drawerTrigger.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [drawerTrigger]);

  return (
    <dialog
      className={styles.drawer}
      ref={ref}
      aria-label={notificationText(locale, "title")}
      onKeyDown={containDialogFocus}
      onCancel={(event) => { event.preventDefault(); closeDrawer(); }}
      onClick={(event) => { if (event.target === event.currentTarget) closeDrawer(); }}
    >
      <NotificationInbox onClose={closeDrawer} />
    </dialog>
  );
}
