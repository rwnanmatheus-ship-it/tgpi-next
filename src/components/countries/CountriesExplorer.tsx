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

type CountriesExplorerProps = {
  countries: Country[];
};

export function CountriesExplorer({ countries }: CountriesExplorerProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [goal, setGoal] = useState<CountryGoal | "all">("all");
  const [cost, setCost] = useState<CostFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [sort, setSort] = useState<SortOption>("score");

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

        return (
          matchesRegion &&
          matchesGoal &&
          matchesCost &&
          matchesDifficulty &&
          matchesQuery
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
  }, [countries, query, region, goal, cost, difficulty, sort]);

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

  function clearFilters() {
    setQuery("");
    setRegion("all");
    setGoal("all");
    setCost("all");
    setDifficulty("all");
    setSort("score");
  }

  return (
    <section className="mt-10">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111118]">
        <div className="border-b border-white/10 bg-black/25 p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Explorer controls
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">
                Find the country that fits your strategy.
              </h3>
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

        <div className="grid gap-3 p-4 md:p-5 lg:grid-cols-[1.2fr_0.7fr_0.65fr_0.65fr_0.75fr_0.75fr]">
          <label className="block">
            <FieldLabel>Search</FieldLabel>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Country, language, currency, capital..."
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/70"
            />
          </label>

          <label className="block">
            <FieldLabel>Region</FieldLabel>
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
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
              onChange={(event) =>
                setGoal(event.target.value as CountryGoal | "all")
              }
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
              onChange={(event) => setCost(event.target.value as CostFilter)}
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
              onChange={(event) =>
                setDifficulty(event.target.value as DifficultyFilter)
              }
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
              onChange={(event) => setSort(event.target.value as SortOption)}
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