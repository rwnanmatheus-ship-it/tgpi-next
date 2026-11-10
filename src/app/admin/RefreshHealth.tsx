"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { healthCopy } from "@/lib/admin/product-health-copy";

export default function RefreshHealth() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#e8c675] px-5 text-sm font-extrabold text-[#16100a] transition-colors hover:bg-[#ffdc8b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f1ca77] disabled:cursor-wait disabled:opacity-75"
      onClick={() => startTransition(() => router.refresh())}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7v5h-5M4 17v-5h5m11 0a8 8 0 0 0-14-5m-2 5a8 8 0 0 0 14 5" />
      </svg>
      {pending ? healthCopy.refreshing : healthCopy.refresh}
    </button>
  );
}
