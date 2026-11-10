"use client";

import { useLocale } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import { useState } from "react";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import { documentReviewItems, summarizeDocumentReview } from "@/lib/document-review";

type Props = {
  countryName: string;
  countrySlug: string;
  embedded?: boolean;
  signInHref?: string;
};

export default function DocumentReviewChecklist({ countryName, countrySlug, embedded = false, signInHref }: Props) {
  const { t } = useLocale();
  const { error, isAuthenticated, isLoading, mutate, progress } = useActivationProgress();
  const [pendingItemId, setPendingItemId] = useState("");
  const review = progress.documentReviews[countrySlug];
  const completedItemIds = new Set(review?.completedItemIds);
  const { completedItems, totalItems, percentage, hasLegacyItems } = summarizeDocumentReview(review);

  async function toggleItem(itemId: string, complete: boolean) {
    if (pendingItemId) return;
    setPendingItemId(itemId);
    try {
      await mutate({ complete, countrySlug, itemId, totalItems, type: "update_documents" });
    } catch {
      // The provider reports the failed save and keeps the last confirmed state.
    } finally {
      setPendingItemId("");
    }
  }

  const heading = t("Documents to verify");
  const description = t("Use official sources before legal, visa, tax or relocation decisions.");
  const progressLabel = t("Review progress");
  const authenticationLink = signInHref ?? `/sign-in?next=${encodeURIComponent(`/countries/${countrySlug}#documents-to-verify`)}`;

  return (
    <div className={embedded ? "documents-checklist" : "rounded-[1.5rem] border border-[#D8D0C0] bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,26,50,0.08)]"}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {embedded ? <h3>{heading}</h3> : <>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A641F]">{t("Protected progress")}</p>
            <h2 className="mt-2 text-2xl font-black text-[#071A32]">{heading}</h2>
          </>}
          <p className={embedded ? "documents-checklist-intro" : "mt-2 max-w-xl text-sm leading-6 text-[#5E6875]"}>{description}</p>
        </div>
        {isAuthenticated && <div className={embedded ? "documents-checklist-count" : "rounded-2xl border border-[#D9BD70] bg-[#FFF7DE] px-4 py-3 text-right"}>
          <p className={embedded ? "documents-eyebrow" : "text-[9px] font-black uppercase tracking-[0.16em] text-[#765009]"}>{progressLabel}</p>
          <strong className={embedded ? undefined : "mt-1 block text-xl font-black text-[#071A32]"}>{isLoading ? "—" : `${completedItems}/${totalItems}`}</strong>
        </div>}
      </div>

      {isAuthenticated && !isLoading && <progress className={embedded ? "documents-checklist-progress" : "mt-5 block h-2 w-full overflow-hidden rounded-full accent-[#277352]"} value={percentage} max={100} aria-label={progressLabel} />}

      <ol className={embedded ? "documents-checklist-items" : "mt-5 space-y-3"} aria-busy={Boolean(pendingItemId) || isLoading}>
        {documentReviewItems.map((item, index) => {
          const checked = completedItemIds.has(item.id);
          const details = <span>
            <strong className={embedded ? undefined : "block font-black text-[#071A32]"}>{t(item.title)}</strong>
            <span className={embedded ? undefined : "mt-1 block text-sm leading-6 text-[#5E6875]"}>{t(item.text)}</span>
          </span>;

          return <li key={item.id} data-checked={checked}>
            {embedded && !isAuthenticated ? <div className="documents-checklist-item">
              <span className="documents-checklist-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{details}
            </div> : <label className={embedded ? "documents-checklist-item" : `flex items-start gap-3 rounded-2xl border p-4 transition ${checked ? "border-[#9CCDB6] bg-[#EDF8F2]" : "border-[#E7E0D3] bg-[#FBF8F1]"}`}>
              <input
                type="checkbox"
                checked={checked}
                disabled={!isAuthenticated || isLoading}
                aria-disabled={Boolean(pendingItemId) || undefined}
                onChange={event => void toggleItem(item.id, event.target.checked)}
                className={embedded ? undefined : "mt-1 h-5 w-5 shrink-0 accent-[var(--tgpi-navy-raised)]"}
              />
              {details}
            </label>}
          </li>;
        })}
      </ol>

      {!isAuthenticated && !isLoading && (
        <div className={embedded ? "documents-checklist-sign-in" : "mt-5 rounded-2xl border border-[#B8C9DF] bg-[#EEF5FF] p-4 text-sm leading-6 text-[#334A64]"}>
          <p>{t("Sign in to keep this checklist synchronized with your TGPI workspace.")}</p>
          <Link href={authenticationLink} className={embedded ? "documents-text-link" : "mt-3 inline-flex font-black text-[#123A6F] underline underline-offset-4"}>
            {t("Sign in to save progress →")}
          </Link>
        </div>
      )}

      {hasLegacyItems && percentage < 100 && <p className={embedded ? "documents-checklist-note" : "mt-4 text-sm text-[#5E6875]"}>{t("Earlier checkpoints are kept in your account. Review the current checklist to update your progress.")}</p>}
      {isAuthenticated && <p className={embedded ? "documents-checklist-note" : "mt-4 min-h-5 text-xs font-bold text-[#8A5A0A]"} aria-live="polite">
        {error ? t(error) : pendingItemId || isLoading ? t("Updating workspace…") : percentage === 100
          ? t("{value0} document review completed.", { value0: t(countryName) })
          : t("Changes are saved to your private workspace.")}
      </p>}
    </div>
  );
}
