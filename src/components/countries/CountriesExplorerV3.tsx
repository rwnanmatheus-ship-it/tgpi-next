"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { CountryCard } from "@/components/countries/CountryCard";
import type { CountryExplorerItem, CountryGoal } from "@/lib/countries";

type SortOption = "score" | "cost" | "safety" | "english" | "quality" | "name";
type CostFilter = "all" | "low" | "medium" | "high";
type DifficultyFilter = "all" | "easy" | "medium" | "hard";
type IntentId = "study" | "career" | "remote" | "cost" | "quality" | "mobility";

type CountriesExplorerV3Props = {
  countries: CountryExplorerItem[];
  goals: CountryGoal[];
  regions: string[];
};

type IntentPreset = {
  id: IntentId;
  label: string;
  goal?: CountryGoal;
  cost?: CostFilter;
  difficulty?: DifficultyFilter;
  sort: SortOption;
  minSafety?: number;
  minEnglish?: number;
};

const PRESETS: IntentPreset[] = [
  { id: "study", label: "Study abroad", goal: "study", sort: "score", minSafety: 70 },
  { id: "career", label: "Build a career", goal: "work", sort: "score", minSafety: 65 },
  { id: "remote", label: "Remote work", goal: "work", sort: "quality", minEnglish: 60 },
  { id: "cost", label: "Lower cost", cost: "low", sort: "cost" },
  { id: "quality", label: "Quality of life", sort: "quality", minSafety: 75 },
  { id: "mobility", label: "Long-term mobility", goal: "travel", sort: "score", difficulty: "easy" },
];

const MAX_COMPARE = 3;
const INITIAL_RESULTS = 12;
const RESULTS_INCREMENT = 12;
const COMPARE_STORAGE_KEY = "tgpi-country-comparison:v1";
const COST_ORDER: Record<CountryExplorerItem["costLevel"], number> = {
  low: 0,
  medium: 1,
  high: 2,
};

const GOAL_LABELS: Record<CountryGoal, string> = {
  work: "Work",
  study: "Study",
  live: "Live",
  travel: "Travel",
  cultural: "Culture",
};

function getCountryGoalLabel(goal: CountryGoal) {
  return GOAL_LABELS[goal];
}

function getCountrySearchText(country: CountryExplorerItem) {
  return [
    country.slug,
    country.name,
    country.region,
    country.language,
    country.currency,
    country.currencyCode,
    country.capital,
    country.mainGoal,
    country.shortDescription,
    ...country.tags,
    ...country.idealFor,
  ]
    .join(" ")
    .toLowerCase();
}

export default function CountriesExplorerV3({ countries, goals, regions }: CountriesExplorerV3Props) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [goal, setGoal] = useState<CountryGoal | "all">("all");
  const [cost, setCost] = useState<CostFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [sort, setSort] = useState<SortOption>("score");
  const [minSafety, setMinSafety] = useState(0);
  const [minEnglish, setMinEnglish] = useState(0);
  const [activePreset, setActivePreset] = useState<IntentId | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_RESULTS);
  const [compareNotice, setCompareNotice] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const comparisonRestoredRef = useRef(false);

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COMPARE_STORAGE_KEY);
      const parsed: unknown = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) {
        const validSlugs = parsed
          .filter((slug): slug is string => typeof slug === "string")
          .filter((slug) => countries.some((country) => country.slug === slug))
          .slice(0, MAX_COMPARE);
        setSelectedSlugs(validSlugs);
      }
    } catch {
      window.localStorage.removeItem(COMPARE_STORAGE_KEY);
    } finally {
      comparisonRestoredRef.current = true;
    }

    const requestedIntent = new URLSearchParams(window.location.search).get("intent");
    const preset = PRESETS.find((item) => item.id === requestedIntent);
    if (!preset) return;

    setGoal(preset.goal ?? "all");
    setCost(preset.cost ?? "all");
    setDifficulty(preset.difficulty ?? "all");
    setSort(preset.sort);
    setMinSafety(preset.minSafety ?? 0);
    setMinEnglish(preset.minEnglish ?? 0);
    setActivePreset(preset.id);
  }, [countries]);

  useEffect(() => {
    if (!comparisonRestoredRef.current) return;
    window.localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(selectedSlugs));
  }, [selectedSlugs]);

  useEffect(() => {
    if (!filtersOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filtersOpen]);

  const filteredCountries = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    return countries
      .filter((country) => {
        const matchesQuery = !normalizedQuery || getCountrySearchText(country).includes(normalizedQuery);
        const matchesRegion = region === "all" || country.region === region;
        const matchesGoal = goal === "all" || country.idealFor.includes(goal);
        const matchesCost = cost === "all" || country.costLevel === cost;
        const matchesDifficulty = difficulty === "all" || country.difficulty === difficulty;
        const matchesSafety = country.intelligence.safetyScore >= minSafety;
        const matchesEnglish = country.intelligence.englishFriendliness >= minEnglish;
        return matchesQuery && matchesRegion && matchesGoal && matchesCost && matchesDifficulty && matchesSafety && matchesEnglish;
      })
      .sort((a, b) => {
        if (sort === "cost") {
          const costDifference = COST_ORDER[a.costLevel] - COST_ORDER[b.costLevel];
          return costDifference || b.tgpiScore - a.tgpiScore;
        }
        if (sort === "safety") return b.intelligence.safetyScore - a.intelligence.safetyScore;
        if (sort === "english") return b.intelligence.englishFriendliness - a.intelligence.englishFriendliness;
        if (sort === "quality") return b.intelligence.qualityOfLifeScore - a.intelligence.qualityOfLifeScore;
        if (sort === "name") return a.name.localeCompare(b.name);
        return b.tgpiScore - a.tgpiScore;
      });
  }, [countries, deferredQuery, region, goal, cost, difficulty, sort, minSafety, minEnglish]);

  useEffect(() => {
    setVisibleCount(INITIAL_RESULTS);
  }, [query, region, goal, cost, difficulty, sort, minSafety, minEnglish]);

  const visibleCountries = useMemo(
    () => filteredCountries.slice(0, visibleCount),
    [filteredCountries, visibleCount],
  );

  const selectedCountries = useMemo(
    () => selectedSlugs.map((slug) => countries.find((country) => country.slug === slug)).filter((country): country is CountryExplorerItem => Boolean(country)),
    [countries, selectedSlugs],
  );

  const activeFilters = useMemo(() => {
    const items: string[] = [];
    if (activePreset) items.push(PRESETS.find((preset) => preset.id === activePreset)?.label ?? "Preset");
    if (region !== "all") items.push(region);
    if (goal !== "all") items.push(getCountryGoalLabel(goal));
    if (cost !== "all") items.push(`${cost} cost profile`);
    if (difficulty !== "all") items.push(`${difficulty} adaptation`);
    if (minSafety > 0) items.push(`Safety ${minSafety}+`);
    if (minEnglish > 0) items.push(`English ${minEnglish}+`);
    return items;
  }, [activePreset, region, goal, cost, difficulty, minSafety, minEnglish]);

  const compareHref = useMemo(() => {
    const params = new URLSearchParams();
    selectedSlugs.forEach((slug) => params.append("country", slug));
    return selectedSlugs.length ? `/compare?${params.toString()}` : "/compare";
  }, [selectedSlugs]);

  const hasActiveControls = Boolean(
    query || activeFilters.length || sort !== "score",
  );

  function clearFilters() {
    setQuery("");
    setRegion("all");
    setGoal("all");
    setCost("all");
    setDifficulty("all");
    setSort("score");
    setMinSafety(0);
    setMinEnglish(0);
    setActivePreset(null);
    window.history.replaceState(null, "", "/countries#country-explorer");
  }

  function applyPreset(preset: IntentPreset) {
    setGoal(preset.goal ?? "all");
    setCost(preset.cost ?? "all");
    setDifficulty(preset.difficulty ?? "all");
    setSort(preset.sort);
    setMinSafety(preset.minSafety ?? 0);
    setMinEnglish(preset.minEnglish ?? 0);
    setActivePreset(preset.id);
    window.history.replaceState(
      null,
      "",
      `/countries?intent=${preset.id}#country-explorer`,
    );
    window.requestAnimationFrame(() => document.getElementById("countries-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function toggleCountry(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= MAX_COMPARE) {
        setCompareNotice("You can compare up to three countries. Remove one before adding another.");
        return current;
      }
      setCompareNotice("");
      return [...current, slug];
    });
  }

  return (
    <section className="mt-8 pb-28">
      <div className="sticky top-[72px] z-30 rounded-[24px] border border-[var(--tgpi-border)] bg-[rgba(255,253,248,0.94)] p-3 shadow-[var(--tgpi-shadow-soft)] backdrop-blur-2xl">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Search countries</span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setActivePreset(null); }} placeholder="Search countries, regions, languages or currencies" className="h-12 w-full rounded-2xl border border-[var(--tgpi-border)] bg-white px-4 pr-12 text-sm text-[var(--tgpi-navy)] outline-none transition placeholder:text-[var(--tgpi-muted)] focus:border-[var(--tgpi-gold)] focus:ring-2 focus:ring-[var(--tgpi-gold)]/20" />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--tgpi-gold-strong)]">⌕</span>
          </label>
          <button type="button" onClick={() => setFiltersOpen(true)} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-5 text-sm font-extrabold text-white transition hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
            Filters{activeFilters.length ? ` ${activeFilters.length}` : ""}
          </button>
        </div>
      </div>

      <div className="mt-6 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-6">
        {PRESETS.map((preset) => {
          const active = activePreset === preset.id;
          return (
            <button key={preset.id} type="button" onClick={() => applyPreset(preset)} className={`min-w-[72vw] snap-center rounded-[20px] border p-4 text-left transition sm:min-w-0 ${active ? "border-[var(--tgpi-gold)] bg-[var(--tgpi-navy)] text-white shadow-[var(--tgpi-shadow-premium)]" : "border-[var(--tgpi-border)] bg-white text-[var(--tgpi-navy)] hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]"}`}>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">Decision path</span>
              <span className="mt-3 block font-[var(--tgpi-font-display)] text-xl font-semibold">{preset.label}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-5 flex flex-col gap-4 rounded-[24px] border border-[var(--tgpi-border)] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[var(--tgpi-muted)]">
            Showing <span className="font-extrabold text-[var(--tgpi-navy)]">{Math.min(visibleCountries.length, filteredCountries.length)}</span> of <span className="font-extrabold text-[var(--tgpi-navy)]">{filteredCountries.length}</span> countries
          </p>
          {activeFilters.length ? <div className="mt-3 flex flex-wrap gap-2">{activeFilters.map((filter) => <span key={filter} className="rounded-full border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] px-3 py-2 text-xs font-bold text-[var(--tgpi-navy)]">{filter}</span>)}</div> : null}
        </div>
        {hasActiveControls ? <button type="button" onClick={clearFilters} className="min-h-11 rounded-xl px-3 text-sm font-extrabold text-[var(--tgpi-gold-strong)] transition hover:bg-[var(--tgpi-gold-soft)]">Clear all</button> : null}
      </div>

      {compareNotice ? <p role="status" className="mt-4 rounded-2xl border border-[#A23B32]/25 bg-[#FFF1EF] px-4 py-3 text-sm font-bold text-[#7F2E28]">{compareNotice}</p> : null}

      <div id="countries-results" className="scroll-mt-40">
        {filteredCountries.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleCountries.map((country) => {
              const selected = selectedSlugs.includes(country.slug);
              return (
                <div key={country.slug} className={`relative rounded-[28px] ${selected ? "ring-2 ring-[var(--tgpi-gold)] ring-offset-4 ring-offset-[var(--tgpi-canvas)]" : ""}`}>
                  <div className="mb-3 flex items-center justify-between gap-3 px-1">
                    <p className="text-xs font-bold text-[var(--tgpi-muted)]">Compare this profile</p>
                    <button type="button" aria-pressed={selected} aria-label={`${selected ? "Remove" : "Add"} ${country.name} ${selected ? "from" : "to"} comparison`} onClick={() => toggleCountry(country.slug)} className={`min-h-10 rounded-full border px-4 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] ${selected ? "border-[var(--tgpi-gold)] bg-[var(--tgpi-gold)] text-[var(--tgpi-navy)]" : "border-[var(--tgpi-border)] bg-white text-[var(--tgpi-navy)] hover:border-[var(--tgpi-gold)]"}`}>{selected ? "Added ✓" : "Add to compare"}</button>
                  </div>
                  <CountryCard country={country} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-[28px] border border-[var(--tgpi-border)] bg-white p-8 text-center shadow-[var(--tgpi-shadow-soft)]">
            <p className="font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)]">No country matches every selected filter.</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--tgpi-muted)]">Lower the minimum safety score, expand the region or remove one preference to reopen the country pool.</p>
            <button type="button" onClick={clearFilters} className="mt-6 rounded-2xl bg-[var(--tgpi-navy)] px-6 py-3 text-sm font-extrabold text-white">Reset filters</button>
          </div>
        )}

        {visibleCountries.length < filteredCountries.length ? (
          <div className="mt-8 flex flex-col items-center rounded-[24px] border border-[var(--tgpi-border)] bg-white p-5 text-center">
            <p className="text-sm text-[var(--tgpi-muted)]">{filteredCountries.length - visibleCountries.length} more profiles match this view.</p>
            <button type="button" onClick={() => setVisibleCount((current) => current + RESULTS_INCREMENT)} className="mt-4 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
              Load {Math.min(RESULTS_INCREMENT, filteredCountries.length - visibleCountries.length)} more countries
            </button>
          </div>
        ) : null}
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setFiltersOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-label="Country filters" className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-[32px] bg-[var(--tgpi-canvas)] p-5 shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[460px] md:rounded-none md:rounded-l-[32px]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] pb-4">
              <div><p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">Smart filters</p><h2 className="mt-1 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[var(--tgpi-navy)]">Refine your shortlist</h2></div>
              <button ref={closeButtonRef} type="button" onClick={() => setFiltersOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--tgpi-border)] bg-white text-[var(--tgpi-navy)]" aria-label="Close filters">×</button>
            </div>
            <div className="grid gap-4 py-5">
              <SelectField label="Region" value={region} onChange={(value) => { setRegion(value); setActivePreset(null); }} options={["all", ...regions]} format={(value) => value === "all" ? "All regions" : value} />
              <SelectField label="Goal" value={goal} onChange={(value) => { setGoal(value as CountryGoal | "all"); setActivePreset(null); }} options={["all", ...goals]} format={(value) => value === "all" ? "All goals" : getCountryGoalLabel(value as CountryGoal)} />
              <SelectField label="Cost profile" value={cost} onChange={(value) => { setCost(value as CostFilter); setActivePreset(null); }} options={["all", "low", "medium", "high"]} format={(value) => value === "all" ? "All cost profiles" : `${value} cost profile`} />
              <SelectField label="Adaptation" value={difficulty} onChange={(value) => { setDifficulty(value as DifficultyFilter); setActivePreset(null); }} options={["all", "easy", "medium", "hard"]} format={(value) => value === "all" ? "All levels" : `${value} adaptation`} />
              <SelectField label="Sort" value={sort} onChange={(value) => setSort(value as SortOption)} options={["score", "cost", "safety", "english", "quality", "name"]} format={(value) => ({ score: "TGPI score", cost: "Lowest cost profile", safety: "Safety", english: "English access", quality: "Quality of life", name: "Name" }[value] ?? value)} />
              <RangeField label="Minimum safety" value={minSafety} onChange={(value) => { setMinSafety(value); setActivePreset(null); }} />
              <RangeField label="Minimum English access" value={minEnglish} onChange={(value) => { setMinEnglish(value); setActivePreset(null); }} />
            </div>
            <div className="sticky bottom-0 grid gap-3 border-t border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] pt-4 sm:grid-cols-2">
              <button type="button" onClick={clearFilters} className="min-h-12 rounded-2xl border border-[var(--tgpi-border)] bg-white text-sm font-extrabold text-[var(--tgpi-navy)]">Reset</button>
              <button type="button" onClick={() => setFiltersOpen(false)} className="min-h-12 rounded-2xl bg-[var(--tgpi-navy)] text-sm font-extrabold text-white">Show {filteredCountries.length} results</button>
            </div>
          </section>
        </div>
      ) : null}

      {selectedCountries.length ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--tgpi-gold)]/30 bg-[rgba(7,26,50,0.96)] px-4 py-4 text-white shadow-2xl backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">Comparison tray</p><div className="mt-2 flex flex-wrap gap-2">{selectedCountries.map((country) => <button key={country.slug} type="button" onClick={() => toggleCountry(country.slug)} className="rounded-full border border-white/15 px-3 py-2 text-xs font-bold">{country.name} ×</button>)}</div></div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => { setSelectedSlugs([]); setCompareNotice(""); }} className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-extrabold">Clear</button>
              {selectedCountries.length >= 2 ? <Link href={compareHref} className="rounded-2xl bg-[var(--tgpi-gold)] px-5 py-3 text-sm font-extrabold text-[var(--tgpi-navy)]">Compare {selectedCountries.length} countries</Link> : <span className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-[#D7E0EB]">Select one more country</span>}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function SelectField({ label, value, onChange, options, format }: { label: string; value: string; onChange: (value: string) => void; options: string[]; format: (value: string) => string }) {
  return <label className="block"><span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-muted)]">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-2xl border border-[var(--tgpi-border)] bg-white px-4 text-sm font-semibold text-[var(--tgpi-navy)] outline-none focus:border-[var(--tgpi-gold)]">{options.map((option) => <option key={option} value={option}>{format(option)}</option>)}</select></label>;
}

function RangeField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="block rounded-2xl border border-[var(--tgpi-border)] bg-white p-4"><span className="flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-muted)]"><span>{label}</span><span className="text-[var(--tgpi-gold-strong)]">{value}+</span></span><input type="range" min="0" max="100" step="5" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-4 w-full accent-[var(--tgpi-gold)]" /></label>;
}
