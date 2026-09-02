"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

export default function MonthlyCostPlanner({
  baseline,
  countryName,
  countrySlug,
  currency,
}: {
  baseline: number;
  countryName: string;
  countrySlug: string;
  currency: string;
}) {
  const { error, isAuthenticated, isLoading, mutate, progress } =
    useActivationProgress();
  const savedEstimate = progress.costEstimates[countrySlug];
  const [amount, setAmount] = useState(baseline);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (savedEstimate?.amount && savedEstimate.currency === currency) setAmount(savedEstimate.amount);
  }, [savedEstimate?.amount, savedEstimate?.currency, currency]);

  async function saveEstimate() {
    setIsSaving(true);
    setSaved(false);
    try {
      await mutate({
        amount,
        countrySlug,
        currency,
        type: "save_cost_estimate",
      });
      setSaved(true);
    } catch {
      // The provider exposes a user-facing error through the live status below.
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mt-6 rounded-[1.25rem] border border-[#B8C9DF] bg-[#EEF5FF] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#315F98]">
            My monthly estimate
          </p>
          <p className="mt-2 text-sm leading-6 text-[#334A64]">
            Enter your own monthly estimate for {countryName} in {currency}. Use dated local quotes; no reference budget is supplied by TGPI.
          </p>
        </div>
        <p className="text-2xl font-black text-[#071A32]">
          {amount > 0 ? formatAmount(amount, currency) : "Not set"}
        </p>
      </div>

      <label className="mt-5 block">
        <span className="sr-only">Monthly cost estimate</span>
        <input
          type="number"
          min={1}
          max={1000000}
          step={1}
          value={amount || ""}
          onChange={(event) => {
            setAmount(Number(event.target.value));
            setSaved(false);
          }}
          className="w-full rounded-xl border border-[#B8C9DF] bg-white p-3 text-base text-[#0B1F3A]"
        />
      </label>

      <p className="mt-3 text-xs text-[#657082]">Your estimate is stored in its stated currency. Older estimates in another currency are not converted or relabeled.</p>

      {isAuthenticated ? (
        <button
          type="button"
          onClick={saveEstimate}
          disabled={isLoading || isSaving || !Number.isFinite(amount) || amount <= 0 || amount > 1000000}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B1F3A] px-5 text-sm font-black text-white transition hover:bg-[#143454] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59632] disabled:cursor-wait disabled:opacity-60"
        >
          {isSaving
            ? "Saving…"
            : saved || (savedEstimate?.amount === amount && savedEstimate?.currency === currency)
              ? "✓ Estimate saved"
              : "Save monthly estimate"}
        </button>
      ) : !isLoading ? (
        <Link
          href={`/sign-in?redirect_url=/countries/${countrySlug}%23cost-of-living`}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B1F3A] px-5 text-sm font-black text-white"
        >
          Sign in to save estimate
        </Link>
      ) : null}

      <p className="mt-3 min-h-5 text-xs font-bold text-[#8A5A0A]" aria-live="polite">
        {error ||
          (saved
            ? "Saved to your private TGPI workspace."
            : "Educational estimate only. Validate current local prices before decisions.")}
      </p>
    </div>
  );
}
