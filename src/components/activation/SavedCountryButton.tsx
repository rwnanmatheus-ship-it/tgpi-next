"use client";

import Link from "next/link";
import { useState } from "react";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";

export default function SavedCountryButton({
  countryName,
  countrySlug,
}: {
  countryName: string;
  countrySlug: string;
}) {
  const { isAuthenticated, isLoading, mutate, progress } =
    useActivationProgress();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const isSaved = progress.savedCountries.includes(countrySlug);

  if (!isAuthenticated && !isLoading) {
    return (
      <Link
        href={`/sign-in?redirect_url=/countries/${countrySlug}`}
        className="rounded-full border border-[#D9BD70] bg-[#FFF7DE] px-4 py-2 text-sm font-bold text-[#765009] transition hover:border-[#C59632] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59632]"
      >
        Save to my plan
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
      setMessage(isSaved ? "Removed from your plan." : `${countryName} saved.`);
    } catch {
      setMessage("Unable to update your plan.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleSaved}
        disabled={isLoading || isSaving}
        aria-pressed={isSaved}
        className={`rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59632] disabled:cursor-wait disabled:opacity-60 ${
          isSaved
            ? "border-[#277352] bg-[#E3F3EB] text-[#1F6548]"
            : "border-[#D9BD70] bg-[#FFF7DE] text-[#765009] hover:border-[#C59632] hover:bg-white"
        }`}
      >
        {isSaving ? "Saving…" : isSaved ? "✓ Saved to my plan" : "+ Save to my plan"}
      </button>
      <span className="sr-only" aria-live="polite">
        {message}
      </span>
    </div>
  );
}
