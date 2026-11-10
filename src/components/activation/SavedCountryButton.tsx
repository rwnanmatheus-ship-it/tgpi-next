"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale , LocalizedText } from "@/components/localization/LocaleProvider";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";

export default function SavedCountryButton({
  countryName,
  countrySlug,
  compact = false,
}: {
  countryName: string;
  countrySlug: string;
  compact?: boolean;
}) {
  const { t } = useLocale();
  const { isAuthenticated, isLoading, mutate, progress } =
    useActivationProgress();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const isSaved = progress.savedCountries.includes(countrySlug);

  const actionLabel = t(isSaved ? "Saved to my plan" : "Save to my plan");
  const bookmark = compact ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 4h12v16l-6-4-6 4z" />
    </svg>
  ) : null;

  if (!isAuthenticated && !isLoading) {
    return (
      <Link
        href={`/sign-in?redirect_url=/countries/${countrySlug}`}
        prefetch={compact ? false : undefined}
        data-compact-save={compact || undefined}
        aria-label={compact ? `${actionLabel} · ${countryName}` : undefined}
        title={compact ? actionLabel : undefined}
        className="rounded-full border border-[var(--tgpi-border)] bg-[var(--tgpi-gold-soft)] px-4 py-2 text-sm font-bold text-[var(--tgpi-gold-strong)] transition hover:border-[var(--tgpi-gold)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-focus)]"
      >
        {bookmark ?? actionLabel}
      </Link>
    );
  }

  async function toggleSaved() {
    setIsSaving(true);
    setMessage("");
    try {
      await mutate({
        countrySlug,
        saved: !isSaved,
        type: "save_country",
      });
      setMessage(isSaved ? t("Removed from your plan.") : t("{country} saved.", { country: t(countryName) }));
    } catch {
      setMessage(t("Unable to update your plan."));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={compact ? "contents" : "flex flex-wrap items-center gap-2"}>
      <button
        type="button"
        onClick={toggleSaved}
        disabled={isLoading || isSaving}
        aria-pressed={isSaved}
        data-compact-save={compact || undefined}
        aria-label={compact ? `${actionLabel} · ${countryName}` : undefined}
        title={compact ? actionLabel : undefined}
        className={`rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-focus)] disabled:cursor-wait disabled:opacity-60 ${
          isSaved
            ? "border-[var(--tgpi-success)] bg-[var(--tgpi-success-soft)] text-[var(--tgpi-success)]"
            : "border-[var(--tgpi-border)] bg-[var(--tgpi-gold-soft)] text-[var(--tgpi-gold-strong)] hover:border-[var(--tgpi-gold)] hover:bg-white"
        }`}
      >
        {bookmark ?? (isSaving ? t("Saving…") : isSaved ? <LocalizedText text={"✓ {value0}"} values={{value0: String(t("Saved to my plan"))}} /> : <LocalizedText text={"+ {value0}"} values={{value0: String(t("Save to my plan"))}} />)}
      </button>
      <span className={compact && !message ? "sr-only" : "w-full text-xs leading-5 text-[var(--tgpi-muted)]"} data-save-feedback={compact && !!message || undefined} aria-live="polite">
        <LocalizedText text={message} />
      </span>
    </div>
  );
}
