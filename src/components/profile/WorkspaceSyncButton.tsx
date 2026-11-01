"use client";
import { useLocale } from "@/components/localization/LocaleProvider";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import NavigationIcon from "@/components/navigation/NavigationIcon";

export default function WorkspaceSyncButton() {
  const { t } = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return <button aria-busy={pending} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-[#F0D58C] transition hover:border-[#E5B94B]/50 disabled:opacity-60" disabled={pending} onClick={() => startTransition(() => router.refresh())} type="button"><NavigationIcon name="graph" width={17} height={17} /><span aria-live="polite">{t(pending ? "Updating workspace…" : "Refresh progress")}</span></button>;
}
