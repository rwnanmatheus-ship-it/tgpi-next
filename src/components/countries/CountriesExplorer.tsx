// src/components/countries/CountriesExplorer.tsx

"use client";

import { useMemo, useState } from "react";
import { CountryCard } from "@/components/countries/CountryCard";
import {
  getAllGoals,
  getAllRegions,
  getCountryGoalLabel,
  getCountrySearchText,
  type Country,
  type CountryGoal,
} from "@/lib/countries";

type SortOption = "score" | "budget" | "safety" | "english" | "quality" | "name";
type CostFilter = "all" | "low" | "medium" | "high";
type DifficultyFilter = "all" | "easy" | "medium" | "hard";
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

export function CountriesExplorer({ countries }: CountriesExplorerProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [goal, setGoal] = useState<CountryGoal | "all">("all");
  const [cost, setCost] = useState<CostFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [sort, setSort] = useState<SortOption>("score");
  const [activeIntent, setActiveIntent] = useState<IntentPresetId | "custom">(
    "custom",
  );
  const [minSafety, setMinSafety] = useState(0);
  const [minEnglish, setMinEnglish] = useState(0);

  const regions = useMemo(() => getAllRegions(), []);
  const goals = useMemo(() => getAllGoals(), []);

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

  const averageBudget =
    filteredCountries.length > 0
      ? Math.round(
          filteredCountries.reduce(
            (sum, country) => sum + country.intelligence.averageMonthlyBudget,
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
    <section className="mt-10">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111118]">
        <div className="border-b border-white/10 bg-black/25 p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Smart Country Navigator
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">
                Start with your goal, then refine the country list.
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                Use TGPI presets to avoid random searching. Choose an intent,
                then filter by region, cost, language access, safety and
                adaptation difficulty.
              </p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-slate-300 transition hover:border-[#D4AF37]/60 hover:text-white"
            >
              Reset filters
            </button>
          </div>
        </div>

        <div className="border-b border-white/10 bg-[#080B14] p-4 md:p-5">
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

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {INTENT_PRESETS.map((preset) => {
              const isActive = activeIntent === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyIntentPreset(preset)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? "border-[#D4AF37]/70 bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/10"
                      : "border-white/10 bg-black/25 hover:border-[#D4AF37]/40 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-white">{preset.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {preset.description}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        isActive
                          ? "bg-[#D4AF37] text-black"
                          : "border border-white/10 text-slate-400"
                      }`}
                    >
                      {isActive ? "Active" : "Apply"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 p-4 md:p-5 lg:grid-cols-[1.2fr_0.7fr_0.65fr_0.65fr_0.75fr_0.75fr]">
          <label className="block">
            <FieldLabel>Search</FieldLabel>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                markCustomFilters();
              }}
              placeholder="Country, language, currency, capital..."
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/70"
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
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
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
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
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
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
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
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
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
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
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

        <div className="grid gap-3 border-t border-white/10 bg-black/20 p-4 md:grid-cols-4 md:p-5">
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
            label="Elite profiles"
            value={String(eliteCount)}
            detail="TGPI score 88+"
          />
          <ExplorerMetric
            label="Avg budget"
            value={String(averageBudget)}
            detail="local currency estimate"
          />
        </div>
      </div>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
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
      </section>

      <div className="mt-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-bold text-white">{filteredCountries.length}</span>{" "}
          countries with the current filters.
        </p>

        <p className="text-sm text-slate-500">
          Use filters as decision signals, not final answers.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredCountries.map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
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
    </section>
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
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-[#D4AF37]">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
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
      <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
          {label}
        </p>
        <p className="mt-3 text-sm text-slate-500">No match available.</p>
      </div>
    );
  }

  return (
    <a
      href={`/countries/${country.slug}`}
      className="group rounded-[1.5rem] border border-white/10 bg-[#111118] p-5 transition hover:border-[#D4AF37]/60 hover:bg-white/[0.03]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
        {label}
      </p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-xl font-black text-white">
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
          <p className="text-xl font-black text-[#D4AF37]">
            {country.tgpiScore}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-400">{detail}</p>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <p className="text-xs text-slate-500">
          Safety {country.intelligence.safetyScore}/100
        </p>
        <span className="text-xs font-black text-[#F5D76E] transition group-hover:text-[#D4AF37]">
          View profile →
        </span>
      </div>
    </a>
  );
}