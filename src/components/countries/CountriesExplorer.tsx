// src/components/countries/CountriesExplorer.tsx

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CountryCard } from "@/components/countries/CountryCard";
import {
  formatCurrencyAmount,
  getAllGoals,
  getAllRegions,
  getCountryCostLabel,
  getCountryDecisionLabel,
  getCountryGoalLabel,
  getCountrySearchText,
  type Country,
  type CountryGoal,
} from "@/lib/countries";

type SortOption = "score" | "budget" | "safety" | "english" | "quality" | "name";
type CostFilter = "all" | "low" | "medium" | "high";
type DifficultyFilter = "all" | "easy" | "medium" | "hard";
type ViewMode = "compact" | "detailed";
type IntentPresetId =
  | "study"
  | "work"
  | "cheaper"
  | "safe"
  | "language"
  | "travel"
  | "reset";

type CountriesExplorerProps = {
  countries: Country[];
};

type IntentPreset = {
  id: IntentPresetId;
  title: string;
  description: string;
  query?: string;
  region?: string;
  goal?: CountryGoal | "all";
  cost?: CostFilter;
  difficulty?: DifficultyFilter;
  sort?: SortOption;
  minSafety?: number;
  minEnglish?: number;
};

const INTENT_PRESETS: IntentPreset[] = [
  {
    id: "study",
    title: "Study abroad",
    description: "Prioritize strong score, safety and adaptation.",
    goal: "study",
    sort: "score",
    minSafety: 70,
  },
  {
    id: "work",
    title: "Work abroad",
    description: "Find countries with work, mobility and global readiness.",
    goal: "work",
    sort: "score",
    minSafety: 65,
  },
  {
    id: "cheaper",
    title: "Live cheaper",
    description: "Start with lower-cost countries and easier planning.",
    cost: "low",
    sort: "budget",
  },
  {
    id: "safe",
    title: "Move safely",
    description: "Rank countries by safety and daily-life stability.",
    sort: "safety",
    minSafety: 85,
  },
  {
    id: "language",
    title: "Learn languages",
    description: "Prioritize language access and cultural immersion.",
    goal: "cultural",
    sort: "english",
    minEnglish: 60,
  },
  {
    id: "travel",
    title: "Travel strategically",
    description: "Find strong travel and culture destinations.",
    goal: "travel",
    sort: "quality",
  },
];

const MAX_COMPARE_COUNTRIES = 3;

const NAV_ITEMS = [
  { label: "Overview", href: "#country-overview" },
  { label: "Presets", href: "#country-presets" },
  { label: "Filters", href: "#country-filters" },
  { label: "Intelligence", href: "#country-intelligence" },
  { label: "Recommendations", href: "#country-recommendations" },
  { label: "Countries", href: "#country-list" },
];

export function CountriesExplorer({ countries }: CountriesExplorerProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [goal, setGoal] = useState<CountryGoal | "all">("all");
  const [cost, setCost] = useState<CostFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [sort, setSort] = useState<SortOption>("score");
  const [viewMode, setViewMode] = useState<ViewMode>("compact");
  const [activeIntent, setActiveIntent] = useState<IntentPresetId | "custom">(
    "custom",
  );
  const [minSafety, setMinSafety] = useState(0);
  const [minEnglish, setMinEnglish] = useState(0);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const regions = useMemo(() => getAllRegions(), []);
  const goals = useMemo(() => getAllGoals(), []);

  const selectedCountries = useMemo(() => {
    return selectedSlugs
      .map((slug) => countries.find((country) => country.slug === slug))
      .filter((country): country is Country => Boolean(country));
  }, [countries, selectedSlugs]);

  const compareHref = useMemo(() => {
    if (selectedSlugs.length === 0) return "/compare";

    const params = new URLSearchParams();

    selectedSlugs.forEach((slug) => {
      params.append("country", slug);
    });

    return `/compare?${params.toString()}`;
  }, [selectedSlugs]);

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return countries
      .filter((country) => {
        const matchesRegion = region === "all" || country.region === region;
        const matchesGoal = goal === "all" || country.idealFor.includes(goal);
        const matchesCost = cost === "all" || country.costLevel === cost;
        const matchesDifficulty =
          difficulty === "all" || country.difficulty === difficulty;
        const matchesQuery =
          !normalizedQuery ||
          getCountrySearchText(country).includes(normalizedQuery);
        const matchesSafety = country.intelligence.safetyScore >= minSafety;
        const matchesEnglish =
          country.intelligence.englishFriendliness >= minEnglish;

        return (
          matchesRegion &&
          matchesGoal &&
          matchesCost &&
          matchesDifficulty &&
          matchesQuery &&
          matchesSafety &&
          matchesEnglish
        );
      })
      .sort((a, b) => {
        if (sort === "budget") {
          return (
            a.intelligence.averageMonthlyBudget -
            b.intelligence.averageMonthlyBudget
          );
        }

        if (sort === "safety") {
          return b.intelligence.safetyScore - a.intelligence.safetyScore;
        }

        if (sort === "english") {
          return (
            b.intelligence.englishFriendliness -
            a.intelligence.englishFriendliness
          );
        }

        if (sort === "quality") {
          return (
            b.intelligence.qualityOfLifeScore -
            a.intelligence.qualityOfLifeScore
          );
        }

        if (sort === "name") {
          return a.name.localeCompare(b.name);
        }

        return b.tgpiScore - a.tgpiScore;
      });
  }, [
    countries,
    query,
    region,
    goal,
    cost,
    difficulty,
    sort,
    minSafety,
    minEnglish,
  ]);

  const eliteCount = filteredCountries.filter(
    (country) => country.tgpiScore >= 88,
  ).length;

  const averageScore =
    filteredCountries.length > 0
      ? Math.round(
          filteredCountries.reduce(
            (sum, country) => sum + country.tgpiScore,
            0,
          ) / filteredCountries.length,
        )
      : 0;

  const averageSafety =
    filteredCountries.length > 0
      ? Math.round(
          filteredCountries.reduce(
            (sum, country) => sum + country.intelligence.safetyScore,
            0,
          ) / filteredCountries.length,
        )
      : 0;

  const averageEnglish =
    filteredCountries.length > 0
      ? Math.round(
          filteredCountries.reduce(
            (sum, country) => sum + country.intelligence.englishFriendliness,
            0,
          ) / filteredCountries.length,
        )
      : 0;

  const strongestCountry = filteredCountries[0];

  const safestCountry = useMemo(() => {
    return [...filteredCountries].sort(
      (a, b) => b.intelligence.safetyScore - a.intelligence.safetyScore,
    )[0];
  }, [filteredCountries]);

  const bestBudgetCountry = useMemo(() => {
    return [...filteredCountries].sort(
      (a, b) =>
        a.intelligence.averageMonthlyBudget -
        b.intelligence.averageMonthlyBudget,
    )[0];
  }, [filteredCountries]);

  const bestEnglishCountry = useMemo(() => {
    return [...filteredCountries].sort(
      (a, b) =>
        b.intelligence.englishFriendliness -
        a.intelligence.englishFriendliness,
    )[0];
  }, [filteredCountries]);

  const regionDistribution = useMemo(() => {
    return getDistribution(filteredCountries, (country) => country.region);
  }, [filteredCountries]);

  const costDistribution = useMemo(() => {
    return getDistribution(filteredCountries, (country) => country.costLevel);
  }, [filteredCountries]);

  const decisionSummary = getDecisionSummary({
    count: filteredCountries.length,
    averageScore,
    averageSafety,
    averageEnglish,
    activeIntent,
    region,
    cost,
  });

  function markCustomFilters() {
    setActiveIntent("custom");
  }

  function clearFilters() {
    setQuery("");
    setRegion("all");
    setGoal("all");
    setCost("all");
    setDifficulty("all");
    setSort("score");
    setMinSafety(0);
    setMinEnglish(0);
    setActiveIntent("custom");
  }

  function clearCompareSelection() {
    setSelectedSlugs([]);
  }

  function toggleCountrySelection(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length >= MAX_COMPARE_COUNTRIES) {
        return [...current.slice(1), slug];
      }

      return [...current, slug];
    });
  }

  function applyIntentPreset(preset: IntentPreset) {
    setQuery(preset.query ?? "");
    setRegion(preset.region ?? "all");
    setGoal(preset.goal ?? "all");
    setCost(preset.cost ?? "all");
    setDifficulty(preset.difficulty ?? "all");
    setSort(preset.sort ?? "score");
    setMinSafety(preset.minSafety ?? 0);
    setMinEnglish(preset.minEnglish ?? 0);
    setActiveIntent(preset.id);
  }

  return (
    <section className="mt-6 pb-28">
      <div id="country-overview" className="scroll-mt-28">
        <NavigationHub
          resultCount={filteredCountries.length}
          selectedCount={selectedCountries.length}
          activeIntent={
            activeIntent === "custom" ? "Custom search" : "Preset active"
          }
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111118]">
        <div className="border-b border-white/10 bg-black/25 p-4 md:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Smart Country Navigator
              </p>
              <h3 className="mt-2 text-xl font-black text-white md:text-2xl">
                Start with your goal, then refine the country list.
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                Use TGPI presets to avoid random searching. Choose an intent,
                then filter by region, cost, language access, safety and
                adaptation difficulty.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setFiltersOpen((current) => !current)}
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-slate-300 transition hover:border-[#38BDF8]/60 hover:text-white"
              >
                {filtersOpen ? "Hide filters" : "Show filters"}
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-slate-300 transition hover:border-[#D4AF37]/60 hover:text-white"
              >
                Reset filters
              </button>
            </div>
          </div>
        </div>

        <div
          id="country-presets"
          className="scroll-mt-28 border-b border-white/10 bg-[#080B14] p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                What are you trying to do?
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Select a guided path. You can still edit every filter manually.
              </p>
            </div>

            <span className="hidden rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold text-slate-400 md:inline-flex">
              {activeIntent === "custom" ? "Custom search" : "Preset active"}
            </span>
          </div>

          <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-6">
            {INTENT_PRESETS.map((preset) => {
              const isActive = activeIntent === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyIntentPreset(preset)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    isActive
                      ? "border-[#D4AF37]/70 bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/10"
                      : "border-white/10 bg-black/25 hover:border-[#D4AF37]/40 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-black text-white">
                        {preset.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                        {preset.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${
                      isActive
                        ? "bg-[#D4AF37] text-black"
                        : "border border-white/10 text-slate-400"
                    }`}
                  >
                    {isActive ? "Active" : "Apply"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filtersOpen ? (
          <div id="country-filters" className="scroll-mt-28">
            <div className="grid gap-3 p-4 lg:grid-cols-[1.2fr_0.7fr_0.65fr_0.65fr_0.75fr_0.75fr]">
              <label className="block">
                <FieldLabel>Search</FieldLabel>
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    markCustomFilters();
                  }}
                  placeholder="Country, language, currency, capital..."
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/70"
                />
              </label>

              <label className="block">
                <FieldLabel>Region</FieldLabel>
                <select
                  value={region}
                  onChange={(event) => {
                    setRegion(event.target.value);
                    markCustomFilters();
                  }}
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
                >
                  <option value="all">All regions</option>
                  {regions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <FieldLabel>Goal</FieldLabel>
                <select
                  value={goal}
                  onChange={(event) => {
                    setGoal(event.target.value as CountryGoal | "all");
                    markCustomFilters();
                  }}
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
                >
                  <option value="all">All goals</option>
                  {goals.map((item) => (
                    <option key={item} value={item}>
                      {getCountryGoalLabel(item)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <FieldLabel>Cost</FieldLabel>
                <select
                  value={cost}
                  onChange={(event) => {
                    setCost(event.target.value as CostFilter);
                    markCustomFilters();
                  }}
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
                >
                  <option value="all">All cost</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              <label className="block">
                <FieldLabel>Difficulty</FieldLabel>
                <select
                  value={difficulty}
                  onChange={(event) => {
                    setDifficulty(event.target.value as DifficultyFilter);
                    markCustomFilters();
                  }}
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
                >
                  <option value="all">All levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>

              <label className="block">
                <FieldLabel>Sort</FieldLabel>
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value as SortOption);
                    markCustomFilters();
                  }}
                  className="h-11 w-full rounded-2xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
                >
                  <option value="score">TGPI Score</option>
                  <option value="budget">Lowest budget</option>
                  <option value="safety">Safety</option>
                  <option value="english">English access</option>
                  <option value="quality">Quality of life</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>
          </div>
        ) : null}

        <div className="grid gap-2 border-t border-white/10 bg-black/20 p-4 sm:grid-cols-2 xl:grid-cols-4">
          <ExplorerMetric
            label="Results"
            value={String(filteredCountries.length)}
            detail={`from ${countries.length} countries`}
          />
          <ExplorerMetric
            label="Avg score"
            value={`${averageScore}/100`}
            detail="current filter set"
          />
          <ExplorerMetric
            label="Avg safety"
            value={`${averageSafety}/100`}
            detail="stability signal"
          />
          <ExplorerMetric
            label="Avg English"
            value={`${averageEnglish}/100`}
            detail="language access"
          />
        </div>
      </div>

      <div id="country-intelligence" className="scroll-mt-28">
        <DecisionIntelligencePanel
          summary={decisionSummary}
          strongestCountry={strongestCountry}
          safestCountry={safestCountry}
          bestBudgetCountry={bestBudgetCountry}
          bestEnglishCountry={bestEnglishCountry}
          regionDistribution={regionDistribution}
          costDistribution={costDistribution}
          totalResults={filteredCountries.length}
        />
      </div>

      <section
        id="country-recommendations"
        className="mt-5 grid scroll-mt-28 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        <RecommendationCard
          label="Best current match"
          country={strongestCountry}
          detail="Highest TGPI score in this filter set."
        />
        <RecommendationCard
          label="Safest current match"
          country={safestCountry}
          detail="Highest safety score in this filter set."
        />
        <RecommendationCard
          label="Lowest-cost current match"
          country={bestBudgetCountry}
          detail="Lowest estimated monthly budget in this filter set."
        />
        <RecommendationCard
          label="Best English access"
          country={bestEnglishCountry}
          detail="Highest English-access signal in this filter set."
        />
      </section>

      <div
        id="country-list"
        className="mt-5 flex scroll-mt-28 flex-col justify-between gap-3 md:flex-row md:items-center"
      >
        <div>
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-bold text-white">
              {filteredCountries.length}
            </span>{" "}
            countries with the current filters.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Compact mode is optimized for fast scanning. Detailed mode is better
            for deeper review.
          </p>
        </div>

        <a
          href="#country-overview"
          className="text-sm font-bold text-[#F5D76E] transition hover:text-[#D4AF37]"
        >
          Back to navigator ↑
        </a>
      </div>

      <div
        className={
          viewMode === "compact"
            ? "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
            : "mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        }
      >
        {filteredCountries.map((country) => {
          const isSelected = selectedSlugs.includes(country.slug);

          return (
            <div
              key={country.slug}
              className={`relative rounded-[1.25rem] transition ${
                isSelected
                  ? "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#050505]"
                  : ""
              }`}
            >
              <div className="absolute left-2 top-2 z-20">
                <button
                  type="button"
                  onClick={() => toggleCountrySelection(country.slug)}
                  className={`rounded-full border px-2.5 py-1.5 text-[10px] font-black shadow-xl backdrop-blur transition md:px-3 md:py-2 md:text-xs ${
                    isSelected
                      ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                      : "border-white/15 bg-black/55 text-white hover:border-[#D4AF37]/60"
                  }`}
                >
                  {isSelected ? "Selected" : "Compare"}
                </button>
              </div>

              {viewMode === "compact" ? (
                <CompactCountryCard country={country} />
              ) : (
                <CountryCard country={country} />
              )}
            </div>
          );
        })}
      </div>

      {filteredCountries.length === 0 ? (
        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#111118] p-8 text-center">
          <p className="text-lg font-bold text-white">No countries found.</p>
          <p className="mt-2 text-sm text-slate-400">
            Try another country, language, region, cost level or goal.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-black text-black transition hover:bg-[#F5D76E]"
          >
            Reset filters
          </button>
        </div>
      ) : null}

      <CompareTray
        selectedCountries={selectedCountries}
        compareHref={compareHref}
        onClear={clearCompareSelection}
        onRemove={(slug) =>
          setSelectedSlugs((current) => current.filter((item) => item !== slug))
        }
      />
    </section>
  );
}

type DistributionItem = {
  label: string;
  count: number;
  percentage: number;
};

function getDistribution(
  countries: Country[],
  getKey: (country: Country) => string,
): DistributionItem[] {
  if (countries.length === 0) return [];

  const counts = countries.reduce<Record<string, number>>((acc, country) => {
    const key = getKey(country);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([label, count]) => ({
      label,
      count,
      percentage: Math.round((count / countries.length) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

type DecisionSummaryInput = {
  count: number;
  averageScore: number;
  averageSafety: number;
  averageEnglish: number;
  activeIntent: IntentPresetId | "custom";
  region: string;
  cost: CostFilter;
};

function getDecisionSummary(input: DecisionSummaryInput) {
  if (input.count === 0) {
    return {
      title: "No strategic match found.",
      text: "The current filters are too restrictive. Reset filters or remove one constraint to reopen the country pool.",
      risk: "High filtering pressure",
    };
  }

  const intentLabel =
    input.activeIntent === "custom"
      ? "custom search"
      : INTENT_PRESETS.find((preset) => preset.id === input.activeIntent)?.title;

  const costSignal =
    input.cost === "low"
      ? "low-cost countries"
      : input.cost === "medium"
        ? "balanced-cost countries"
        : input.cost === "high"
          ? "premium-cost countries"
          : "mixed-cost countries";

  const regionSignal =
    input.region === "all" ? "global pool" : `${input.region} pool`;

  const scoreSignal =
    input.averageScore >= 80
      ? "strong"
      : input.averageScore >= 70
        ? "promising"
        : "early-stage";

  const risk =
    input.averageSafety >= 85
      ? "Low risk signal"
      : input.averageSafety >= 70
        ? "Moderate risk signal"
        : "Requires deeper validation";

  return {
    title: `${scoreSignal} ${intentLabel ?? "country"} set`,
    text: `This filter is currently showing ${input.count} ${costSignal} inside a ${regionSignal}. Average TGPI score is ${input.averageScore}/100, safety is ${input.averageSafety}/100, and English access is ${input.averageEnglish}/100. Use this as a shortlist, not a final decision.`,
    risk,
  };
}

type NavigationHubProps = {
  resultCount: number;
  selectedCount: number;
  activeIntent: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
};

function NavigationHub({
  resultCount,
  selectedCount,
  activeIntent,
  viewMode,
  onViewModeChange,
}: NavigationHubProps) {
  return (
    <nav className="sticky top-3 z-40 rounded-[1.5rem] border border-white/10 bg-[#050505]/88 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#F5D76E]">
            TGPI Navigator
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-300">
            {resultCount} results
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-300">
            {selectedCount} selected
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-300">
            {activeIntent}
          </span>
        </div>

        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
          <div className="flex rounded-full border border-white/10 bg-black/30 p-1">
            <button
              type="button"
              onClick={() => onViewModeChange("compact")}
              className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
                viewMode === "compact"
                  ? "bg-[#D4AF37] text-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Compact
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("detailed")}
              className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
                viewMode === "detailed"
                  ? "bg-[#D4AF37] text-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Detailed
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 xl:pb-0">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-xs font-black text-slate-300 transition hover:border-[#D4AF37]/60 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

type CompactCountryCardProps = {
  country: Country;
};

function CompactCountryCard({ country }: CompactCountryCardProps) {
  const budget = `${formatCurrencyAmount(
    country,
    country.intelligence.averageMonthlyBudget,
  )} ${country.currencyCode}`;

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group block min-h-[188px] rounded-[1.25rem] border border-white/10 bg-[#0B0F19] p-3 transition hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:bg-white/[0.03] md:min-h-[204px] md:p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 pt-8 md:pt-7">
          <div className="text-2xl md:text-3xl">{country.emoji}</div>
          <h3 className="mt-2 truncate text-base font-black text-white md:text-lg">
            {country.name}
          </h3>
          <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 md:text-xs">
            {country.capital}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-2.5 py-2 text-center">
          <p className="text-[9px] uppercase tracking-[0.18em] text-[#F5D76E]">
            TGPI
          </p>
          <p className="text-lg font-black text-[#D4AF37]">
            {country.tgpiScore}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <CompactMetric label="Safety" value={`${country.intelligence.safetyScore}`} />
        <CompactMetric
          label="English"
          value={`${country.intelligence.englishFriendliness}`}
        />
      </div>

      <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-2.5">
        <p className="text-[10px] text-slate-500">Budget</p>
        <p className="mt-0.5 truncate text-xs font-black text-[#D4AF37]">
          {budget}
        </p>
      </div>

      <p className="mt-3 line-clamp-1 text-[11px] font-semibold text-slate-400">
        {getCountryDecisionLabel(country)}
      </p>

      <span className="sr-only">
        {getCountryCostLabel(country)}. {country.shortDescription}
      </span>
    </Link>
  );
}

type CompactMetricProps = {
  label: string;
  value: string;
};

function CompactMetric({ label, value }: CompactMetricProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 px-2 py-2">
      <p className="text-[10px] text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-black text-white">{value}/100</p>
    </div>
  );
}

type FieldLabelProps = {
  children: React.ReactNode;
};

function FieldLabel({ children }: FieldLabelProps) {
  return (
    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
      {children}
    </span>
  );
}

type ExplorerMetricProps = {
  label: string;
  value: string;
  detail: string;
};

function ExplorerMetric({ label, value, detail }: ExplorerMetricProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-3 md:p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-black text-[#D4AF37] md:text-2xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

type DecisionIntelligencePanelProps = {
  summary: {
    title: string;
    text: string;
    risk: string;
  };
  strongestCountry?: Country;
  safestCountry?: Country;
  bestBudgetCountry?: Country;
  bestEnglishCountry?: Country;
  regionDistribution: DistributionItem[];
  costDistribution: DistributionItem[];
  totalResults: number;
};

function DecisionIntelligencePanel({
  summary,
  strongestCountry,
  safestCountry,
  bestBudgetCountry,
  bestEnglishCountry,
  regionDistribution,
  costDistribution,
  totalResults,
}: DecisionIntelligencePanelProps) {
  return (
    <section className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#D4AF37]/20 bg-gradient-to-br from-[#111118] via-[#080B14] to-black">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            Decision Intelligence
          </p>
          <h3 className="mt-2 text-xl font-black text-white md:text-2xl">
            {summary.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {summary.text}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MiniSignal label="Risk signal" value={summary.risk} />
            <MiniSignal
              label="Current pool"
              value={`${totalResults} countries`}
            />
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2">
          <DecisionPick label="Best score" country={strongestCountry} />
          <DecisionPick label="Safest" country={safestCountry} />
          <DecisionPick label="Lowest cost" country={bestBudgetCountry} />
          <DecisionPick label="Best English" country={bestEnglishCountry} />
        </div>
      </div>

      <div className="grid gap-4 border-t border-white/10 p-5 lg:grid-cols-2">
        <DistributionPanel
          title="Region concentration"
          items={regionDistribution}
        />
        <DistributionPanel title="Cost concentration" items={costDistribution} />
      </div>
    </section>
  );
}

type MiniSignalProps = {
  label: string;
  value: string;
};

function MiniSignal({ label, value }: MiniSignalProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

type DecisionPickProps = {
  label: string;
  country?: Country;
};

function DecisionPick({ label, country }: DecisionPickProps) {
  if (!country) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-bold text-slate-400">No country</p>
      </div>
    );
  }

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-[#D4AF37]/60"
    >
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 truncate font-black text-white">{country.name}</p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-xs text-slate-500">TGPI</p>
        <p className="text-lg font-black text-[#D4AF37]">
          {country.tgpiScore}
        </p>
      </div>
    </Link>
  );
}

type DistributionPanelProps = {
  title: string;
  items: DistributionItem[];
};

function DistributionPanel({ title, items }: DistributionPanelProps) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/25 p-4">
      <p className="text-sm font-black text-white">{title}</p>

      <div className="mt-4 space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-slate-400">
                  {item.label}
                </p>
                <p className="text-xs font-black text-[#D4AF37]">
                  {item.count} • {item.percentage}%
                </p>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#38BDF8]"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No distribution available.</p>
        )}
      </div>
    </div>
  );
}

type RecommendationCardProps = {
  label: string;
  country?: Country;
  detail: string;
};

function RecommendationCard({ label, country, detail }: RecommendationCardProps) {
  if (!country) {
    return (
      <div className="rounded-[1.25rem] border border-white/10 bg-[#111118] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
          {label}
        </p>
        <p className="mt-3 text-sm text-slate-500">No match available.</p>
      </div>
    );
  }

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group rounded-[1.25rem] border border-white/10 bg-[#111118] p-4 transition hover:border-[#D4AF37]/60 hover:bg-white/[0.03]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
        {label}
      </p>

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-lg font-black text-white">
            {country.name}
          </p>
          <p className="mt-1 truncate text-xs text-slate-500">
            {country.region} • {country.capital}
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-2 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5D76E]">
            TGPI
          </p>
          <p className="text-lg font-black text-[#D4AF37]">
            {country.tgpiScore}
          </p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
        {detail}
      </p>

      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <p className="text-xs text-slate-500">
          Safety {country.intelligence.safetyScore}/100
        </p>
        <span className="text-xs font-black text-[#F5D76E] transition group-hover:text-[#D4AF37]">
          View →
        </span>
      </div>
    </Link>
  );
}

type CompareTrayProps = {
  selectedCountries: Country[];
  compareHref: string;
  onClear: () => void;
  onRemove: (slug: string) => void;
};

function CompareTray({
  selectedCountries,
  compareHref,
  onClear,
  onRemove,
}: CompareTrayProps) {
  if (selectedCountries.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D4AF37]/20 bg-[#050505]/92 px-4 py-4 shadow-2xl shadow-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            Compare tray
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedCountries.map((country) => (
              <button
                key={country.slug}
                type="button"
                onClick={() => onRemove(country.slug)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white transition hover:border-red-500/50"
              >
                {country.name} ×
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClear}
            className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-slate-300 transition hover:border-white/30 hover:text-white"
          >
            Clear
          </button>

          <Link
            href={compareHref}
            className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-center text-sm font-black text-black transition hover:bg-[#F5D76E]"
          >
            Compare {selectedCountries.length} countries
          </Link>
        </div>
      </div>
    </div>
  );
}