"use client";

import Link from "next/link";
import { useState } from "react";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import { createProgressItemId } from "@/lib/activation-progress";

type DocumentItem = {
  text: string;
  title: string;
};

export default function DocumentReviewChecklist({
  countryName,
  countrySlug,
  items,
}: {
  countryName: string;
  countrySlug: string;
  items: DocumentItem[];
}) {
  const { error, isAuthenticated, isLoading, mutate, progress } =
    useActivationProgress();
  const [pendingItemId, setPendingItemId] = useState("");
  const review = progress.documentReviews[countrySlug];
  const completedItemIds = review?.completedItemIds || [];
  const checklistItems = items.map((item, index) => ({
    ...item,
    itemId: createProgressItemId(item.title, index),
  }));
  const completedCount = checklistItems.filter((item) =>
    completedItemIds.includes(item.itemId),
  ).length;
  const completion = items.length
    ? Math.round((completedCount / items.length) * 100)
    : 0;

  async function toggleItem(itemId: string, complete: boolean) {
    setPendingItemId(itemId);
    try {
      await mutate({
        complete,
        countrySlug,
        itemId,
        totalItems: items.length,
        type: "update_documents",
      });
    } catch {
      // The provider exposes a user-facing error through the live status below.
    } finally {
      setPendingItemId("");
    }
  }

  return (
    <div className="rounded-[1.5rem] border border-[#D8D0C0] bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,26,50,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A641F]">
            Protected progress
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#071A32]">
            Documents to verify
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#5E6875]">
            Use official sources before legal, visa, tax or relocation decisions.
          </p>
        </div>
        <div className="rounded-2xl border border-[#D9BD70] bg-[#FFF7DE] px-4 py-3 text-right">
          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#765009]">
            Review progress
          </p>
          <p className="mt-1 text-xl font-black text-[#071A32]">
            {completedCount}/{items.length}
          </p>
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#E7E0D3]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C59632] to-[#277352] transition-[width]"
          style={{ width: `${completion}%` }}
        />
      </div>

      {!isAuthenticated && !isLoading ? (
        <div className="mt-5 rounded-2xl border border-[#B8C9DF] bg-[#EEF5FF] p-4 text-sm leading-6 text-[#334A64]">
          <p>Sign in to keep this checklist synchronized with your TGPI workspace.</p>
          <Link
            href={`/sign-in?redirect_url=/countries/${countrySlug}%23documents-to-verify`}
            className="mt-3 inline-flex font-black text-[#123A6F] underline underline-offset-4"
          >
            Sign in to save progress →
          </Link>
        </div>
      ) : null}

      <div className="mt-5 space-y-3">
        {checklistItems.map((item) => {
          const { itemId } = item;
          const checked = completedItemIds.includes(itemId);
          const pending = pendingItemId === itemId;

          return (
            <label
              key={itemId}
              className={`grid cursor-pointer gap-3 rounded-2xl border p-4 transition sm:grid-cols-[auto_1fr] ${
                checked
                  ? "border-[#9CCDB6] bg-[#EDF8F2]"
                  : "border-[#E7E0D3] bg-[#FBF8F1] hover:border-[#C59632]"
              } ${!isAuthenticated ? "cursor-default" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={!isAuthenticated || isLoading || pending}
                onChange={(event) => toggleItem(itemId, event.target.checked)}
                className="mt-1 h-5 w-5 accent-[#0B1F3A]"
              />
              <span>
                <span className="block font-black text-[#071A32]">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-[#5E6875]">
                  {item.text}
                </span>
              </span>
            </label>
          );
        })}
      </div>

      <p className="mt-4 min-h-5 text-xs font-bold text-[#8A5A0A]" aria-live="polite">
        {error ||
          (completion === 100
            ? `${countryName} document review completed.`
            : isAuthenticated
              ? "Changes are saved to your private workspace."
              : "")}
      </p>
    </div>
  );
}
