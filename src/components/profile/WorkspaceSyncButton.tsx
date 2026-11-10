"use client";
import { useLocale } from "@/components/localization/LocaleProvider";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { PROGRESS_SYNC_EVENT } from "@/lib/progress-sync";
import NavigationIcon from "@/components/navigation/NavigationIcon";

export default function WorkspaceSyncButton() {
  const { t } = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return <button aria-busy={pending} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-[var(--tgpi-gold-light)] transition hover:border-[var(--tgpi-gold)]/50 disabled:opacity-60" disabled={pending} onClick={() => { window.dispatchEvent(new Event(PROGRESS_SYNC_EVENT)); startTransition(() => router.refresh()); }} type="button"><NavigationIcon name="graph" width={17} height={17} /><span aria-live="polite">{t(pending ? "Updating workspace…" : "Refresh progress")}</span></button>;
}
