"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useActivationProgress } from "@/components/activation/ActivationProgressProvider";
import {
  COMPARISON_GOALS,
  getComparisonGoalConfig,
  type ComparisonGoal,
} from "@/lib/tgpi-comparison";

const MAX_COUNTRIES = 3;
const STORAGE_KEY = "tgpi-country-comparison:v1";

export type ComparePickerCountry = {
  slug: string;
  name: string;
  emoji: string;
  region: string;
};

type CompareCountryPickerProps = {
  countries: ComparePickerCountry[];
  initialSlugs: string[];
  initialGoal: ComparisonGoal;
  hasExplicitSelection: boolean;
};

function createSlots(slugs: string[]): string[] {
  return Array.from({ length: MAX_COUNTRIES }, (_, index) => slugs[index] ?? "");
}

export default function CompareCountryPicker({
  countries,
  initialSlugs,
  initialGoal,
  hasExplicitSelection,
}: CompareCountryPickerProps) {
  const router = useRouter();
  const { isAuthenticated, mutate } = useActivationProgress();
  const [slots, setSlots] = useState<string[]>(() => createSlots(initialSlugs));
  const [goal, setGoal] = useState<ComparisonGoal>(initialGoal);
  const [notice, setNotice] = useState("");
  const [isSavingComparison, setIsSavingComparison] = useState(false);
  const [isPending, startTransition] = useTransition();
  const restoredRef = useRef(false);
  const validSlugs = useMemo(
    () => new Set(countries.map((country) => country.slug)),
    [countries],
  );
  const selectedSlugs = useMemo(
    () => Array.from(new Set(slots.filter(Boolean))),
    [slots],
  );

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;

    if (hasExplicitSelection) {
      if (initialSlugs.length >= 2) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSlugs));
      }
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(parsed)) return;

      const restored = Array.from(
        new Set(
          parsed.filter(
            (slug): slug is string =>
              typeof slug === "string" && validSlugs.has(slug),
          ),
        ),
      ).slice(0, MAX_COUNTRIES);

      if (restored.length < 2) return;
      const params = new URLSearchParams();
      restored.forEach((slug) => params.append("country", slug));
      if (goal !== "overall") params.set("goal", goal);
      startTransition(() => router.replace(`/compare?${params.toString()}`));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [goal, hasExplicitSelection, initialSlugs, router, validSlugs]);

  function updateSlot(index: number, slug: string) {
    setNotice("");
    setSlots((current) => {
      const next = [...current];
      next[index] = slug;
      return next;
    });
  }

  function swapPrimaryCountries() {
    setSlots((current) => [current[1] ?? "", current[0] ?? "", current[2] ?? ""]);
    setNotice("");
  }

  function clearSelection() {
    setSlots(createSlots([]));
    setNotice("Choose at least two countries to build a comparison.");
    window.localStorage.removeItem(STORAGE_KEY);
  }

  async function runComparison() {
    if (selectedSlugs.length < 2) {
      setNotice("Choose at least two different countries before comparing.");
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSlugs));
    const params = new URLSearchParams();
    selectedSlugs.forEach((slug) => params.append("country", slug));
    if (goal !== "overall") params.set("goal", goal);

    if (isAuthenticated) {
      setIsSavingComparison(true);
      try {
        await mutate({
          countrySlugs: selectedSlugs,
          goal,
          type: "record_comparison",
        });
      } catch {
        setNotice(
          "The comparison is ready, but TGPI could not save it to your workspace.",
        );
      } finally {
        setIsSavingComparison(false);
      }
    }

    startTransition(() => router.push(`/compare?${params.toString()}`));
  }

  return (
    <section
      aria-labelledby="comparison-builder-title"
      className="z-30 rounded-[28px] border border-[var(--tgpi-border)] bg-[rgba(255,253,248,0.96)] p-4 shadow-[var(--tgpi-shadow-premium)] backdrop-blur-2xl sm:p-5 lg:sticky lg:top-[72px]"
    >
      <div className="flex flex-col gap-3 border-b border-[var(--tgpi-border-soft)] pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
            Comparison builder
          </p>
          <h2
            id="comparison-builder-title"
            className="mt-1 font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)]"
          >
            Choose two countries. Add a third when it improves the decision.
          </h2>
        </div>
        <Link
          href="/countries#country-explorer"
          className="inline-flex min-h-11 items-center text-sm font-extrabold text-[var(--tgpi-gold-strong)] underline decoration-[var(--tgpi-gold)]/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
        >
          Browse all 195 profiles
        </Link>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_0.9fr_auto] lg:items-end">
        {slots.map((slug, index) => (
          <label key={index} className="block">
            <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-muted)]">
              {index === 0
                ? "Country A"
                : index === 1
                  ? "Country B"
                  : "Country C · optional"}
            </span>
            <select
              value={slug}
              onChange={(event) => updateSlot(index, event.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--tgpi-border)] bg-white px-4 text-sm font-bold text-[var(--tgpi-navy)] outline-none transition focus:border-[var(--tgpi-gold)] focus:ring-2 focus:ring-[var(--tgpi-gold)]/25"
            >
              <option value="">Choose a country</option>
              {countries.map((country) => {
                const usedElsewhere = slots.some(
                  (selected, selectedIndex) =>
                    selectedIndex !== index && selected === country.slug,
                );
                return (
                  <option
                    key={country.slug}
                    value={country.slug}
                    disabled={usedElsewhere}
                  >
                    {country.emoji} {country.name} · {country.region}
                  </option>
                );
              })}
            </select>
          </label>
        ))}

        <label className="block">
          <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-muted)]">
            Decision lens
          </span>
          <select
            value={goal}
            onChange={(event) => setGoal(event.target.value as ComparisonGoal)}
            className="h-12 w-full rounded-2xl border border-[var(--tgpi-border)] bg-white px-4 text-sm font-bold text-[var(--tgpi-navy)] outline-none transition focus:border-[var(--tgpi-gold)] focus:ring-2 focus:ring-[var(--tgpi-gold)]/25"
          >
            {COMPARISON_GOALS.map((value) => (
              <option key={value} value={value}>
                {getComparisonGoalConfig(value).label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={runComparison}
          disabled={
            isPending || isSavingComparison || selectedSlugs.length < 2
          }
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
        >
          {isSavingComparison
            ? "Saving…"
            : isPending
              ? "Building…"
              : "Compare now"}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm font-semibold text-[var(--tgpi-muted)]">
          {notice ||
            (selectedSlugs.length >= 2
              ? `${selectedSlugs.length} countries ready for the ${getComparisonGoalConfig(goal).shortLabel.toLowerCase()} lens.`
              : `Choose ${2 - selectedSlugs.length} more ${selectedSlugs.length === 1 ? "country" : "countries"}.`)}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={swapPrimaryCountries}
            disabled={!slots[0] || !slots[1]}
            className="min-h-10 rounded-xl border border-[var(--tgpi-border)] bg-white px-4 text-xs font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] disabled:opacity-40"
          >
            Swap A ↔ B
          </button>
          <button
            type="button"
            onClick={clearSelection}
            className="min-h-10 rounded-xl px-4 text-xs font-extrabold text-[var(--tgpi-gold-strong)] transition hover:bg-[var(--tgpi-gold-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
}
