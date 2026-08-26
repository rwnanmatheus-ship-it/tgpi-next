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

function buildComparisonPath(slugs: string[], goal: ComparisonGoal) {
  const params = new URLSearchParams();
  slugs.forEach((slug) => params.append("country", slug));
  if (goal !== "overall") params.set("goal", goal);
  return `/compare?${params.toString()}`;
}

export default function CompareCountryPicker({
  countries,
  initialSlugs,
  initialGoal,
  hasExplicitSelection,
}: CompareCountryPickerProps) {
  const router = useRouter();
  const { isAuthenticated, mutate } = useActivationProgress();
  const builderRef = useRef<HTMLElement>(null);
  const builderTopRef = useRef<number | null>(null);
  const restoredRef = useRef(false);
  const [slots, setSlots] = useState<string[]>(() => createSlots(initialSlugs));
  const [goal, setGoal] = useState<ComparisonGoal>(initialGoal);
  const [notice, setNotice] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [isPastBuilder, setIsPastBuilder] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [isSavingComparison, setIsSavingComparison] = useState(false);
  const [isPending, startTransition] = useTransition();
  const validSlugs = useMemo(
    () => new Set(countries.map((country) => country.slug)),
    [countries],
  );
  const countryBySlug = useMemo(
    () => new Map(countries.map((country) => [country.slug, country])),
    [countries],
  );
  const selectedSlugs = useMemo(
    () => Array.from(new Set(slots.filter(Boolean))),
    [slots],
  );
  const selectedCountries = useMemo(
    () =>
      selectedSlugs
        .map((slug) => countryBySlug.get(slug))
        .filter((country): country is ComparePickerCountry => Boolean(country)),
    [countryBySlug, selectedSlugs],
  );
  const isCompact = isPastBuilder && !isManuallyExpanded;

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
      startTransition(() => router.replace(buildComparisonPath(restored, goal)));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [goal, hasExplicitSelection, initialSlugs, router, validSlugs]);

  useEffect(() => {
    let frame = 0;

    function updateBuilderMode() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (builderTopRef.current === null && builderRef.current) {
          builderTopRef.current =
            builderRef.current.getBoundingClientRect().top + window.scrollY;
        }
        const builderTop = builderTopRef.current ?? Number.POSITIVE_INFINITY;
        const pastBuilder = window.scrollY > builderTop + 180;
        setIsPastBuilder(pastBuilder);
        if (!pastBuilder) setIsManuallyExpanded(false);
      });
    }

    updateBuilderMode();
    window.addEventListener("scroll", updateBuilderMode, { passive: true });
    window.addEventListener("resize", updateBuilderMode);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateBuilderMode);
      window.removeEventListener("resize", updateBuilderMode);
    };
  }, []);

  function updateSlot(index: number, slug: string) {
    setNotice("");
    setCopyStatus("");
    setSlots((current) => {
      const next = [...current];
      next[index] = slug;
      return next;
    });
  }

  function swapPrimaryCountries() {
    setSlots((current) => [current[1] ?? "", current[0] ?? "", current[2] ?? ""]);
    setNotice("");
    setCopyStatus("");
  }

  function clearSelection() {
    setSlots(createSlots([]));
    setNotice("Choose at least two countries to build a comparison.");
    setCopyStatus("");
    window.localStorage.removeItem(STORAGE_KEY);
  }

  async function copyComparisonLink() {
    if (selectedSlugs.length < 2) {
      setCopyStatus("Choose two countries before copying a decision link.");
      return;
    }

    try {
      const path = buildComparisonPath(selectedSlugs, goal);
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      setCopyStatus("Decision link copied.");
    } catch {
      setCopyStatus("The link is ready in the address bar after you run the comparison.");
    }
  }

  async function runComparison() {
    if (selectedSlugs.length < 2) {
      setNotice("Choose at least two different countries before comparing.");
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSlugs));

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

    startTransition(() => router.push(buildComparisonPath(selectedSlugs, goal)));
  }

  return (
    <section
      ref={builderRef}
      id="comparison-builder"
      aria-labelledby="comparison-builder-title"
      className="relative z-30 mt-7 scroll-mt-28 rounded-[28px] border border-[var(--tgpi-border)] bg-[rgba(255,253,248,0.97)] shadow-[var(--tgpi-shadow-premium)] backdrop-blur-2xl transition-all duration-300 lg:sticky lg:top-[76px]"
    >
      {isCompact ? (
        <div className="flex min-h-[74px] flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--tgpi-navy)] text-sm font-extrabold text-[var(--tgpi-gold-light)] sm:grid">
              C
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                Active decision set · {getComparisonGoalConfig(goal).shortLabel}
              </p>
              <p className="mt-1 truncate text-sm font-extrabold text-[var(--tgpi-navy)]">
                {selectedCountries.length
                  ? selectedCountries
                      .map((country) => `${country.emoji} ${country.name}`)
                      .join("  ·  ")
                  : "Choose countries to continue"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsManuallyExpanded(true)}
              aria-expanded="false"
              className="min-h-11 rounded-xl border border-[var(--tgpi-border)] bg-white px-4 text-xs font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              Edit comparison
            </button>
            <button
              type="button"
              onClick={runComparison}
              disabled={isPending || isSavingComparison || selectedSlugs.length < 2}
              className="min-h-11 rounded-xl bg-[var(--tgpi-gold)] px-5 text-xs font-extrabold text-[var(--tgpi-navy-deep)] transition hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-navy)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isSavingComparison ? "Saving…" : isPending ? "Building…" : "Rebuild decision"}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 border-b border-[var(--tgpi-border-soft)] pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
                Comparison builder
              </p>
              <h2
                id="comparison-builder-title"
                className="mt-1 max-w-3xl font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)] sm:text-3xl"
              >
                Build the decision set. TGPI will expose the trade-offs.
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {isPastBuilder ? (
                <button
                  type="button"
                  onClick={() => setIsManuallyExpanded(false)}
                  aria-expanded="true"
                  className="inline-flex min-h-11 items-center text-sm font-extrabold text-[var(--tgpi-muted)] transition hover:text-[var(--tgpi-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
                >
                  Keep compact ↑
                </button>
              ) : null}
              <Link
                href="/countries#country-explorer"
                className="inline-flex min-h-11 items-center text-sm font-extrabold text-[var(--tgpi-gold-strong)] underline decoration-[var(--tgpi-gold)]/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
              >
                Browse all 195 profiles
              </Link>
            </div>
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
                onChange={(event) => {
                  setGoal(event.target.value as ComparisonGoal);
                  setNotice("");
                  setCopyStatus("");
                }}
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
              disabled={isPending || isSavingComparison || selectedSlugs.length < 2}
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
            <div>
              <p aria-live="polite" className="text-sm font-semibold text-[var(--tgpi-muted)]">
                {notice ||
                  (selectedSlugs.length >= 2
                    ? `${selectedSlugs.length} countries ready for the ${getComparisonGoalConfig(goal).shortLabel.toLowerCase()} lens.`
                    : `Choose ${2 - selectedSlugs.length} more ${selectedSlugs.length === 1 ? "country" : "countries"}.`)}
              </p>
              {copyStatus ? (
                <p aria-live="polite" className="mt-1 text-xs font-bold text-[var(--tgpi-gold-strong)]">
                  {copyStatus}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyComparisonLink}
                disabled={selectedSlugs.length < 2}
                className="min-h-10 rounded-xl border border-[var(--tgpi-border)] bg-white px-4 text-xs font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] disabled:opacity-40"
              >
                Copy decision link
              </button>
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
        </div>
      )}
    </section>
  );
}
