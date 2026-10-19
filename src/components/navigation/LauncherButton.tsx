"use client";

import { useSyncExternalStore } from "react";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import { SUPER_APP_OPEN_EVENT } from "@/lib/super-app";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  const dialog = document.getElementById("tgpi-super-app-launcher");
  return dialog instanceof HTMLDialogElement && dialog.open;
}

export default function LauncherButton({ compact = false }: { compact?: boolean }) {
  const open = useSyncExternalStore(subscribe, getSnapshot, () => false);
  return (
    <button
      type="button"
      aria-label="Open TGPI apps"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls="tgpi-super-app-launcher"
      aria-keyshortcuts="Control+K Meta+K"
      title="Open TGPI apps (Ctrl/⌘ K)"
      onClick={() => window.dispatchEvent(new Event(SUPER_APP_OPEN_EVENT))}
      className={compact ? "tgpi-compact-action tgpi-compact-apps" : "tgpi-navigation-icon-button"}
    >
      <NavigationIcon name={compact ? "menu" : "apps"} width={20} height={20} />
      <span className="tgpi-apps-label">Apps</span>
    </button>
  );
}
