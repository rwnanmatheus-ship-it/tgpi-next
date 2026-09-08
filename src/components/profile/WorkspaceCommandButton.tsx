"use client";

import { SUPER_APP_OPEN_EVENT } from "@/lib/super-app";

export default function WorkspaceCommandButton() {
  function openCommandCenter() {
    window.dispatchEvent(new Event(SUPER_APP_OPEN_EVENT));
  }

  return (
    <button
      aria-haspopup="dialog"
      aria-keyshortcuts="Control+K Meta+K"
      aria-label="Search TGPI apps and actions"
      className="group flex h-12 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-[#0A1521] px-4 text-left text-sm text-[#8999AB] transition hover:border-[#E5B94B]/40 hover:bg-[#0D1B2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B94B] xl:w-[360px] xl:flex-none 2xl:w-[410px]"
      onClick={openCommandCenter}
      type="button"
    >
      <span aria-hidden="true" className="text-base text-[#E5B94B]">
        ⌕
      </span>
      <span className="min-w-0 flex-1 truncate group-hover:text-[#C6D0DA]">
        Find an app, action or destination
      </span>
      <kbd className="hidden rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-sans text-[11px] font-bold text-[#AAB8C6] sm:inline">
        ⌘ K
      </kbd>
    </button>
  );
}
