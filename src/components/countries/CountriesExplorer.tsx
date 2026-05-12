// src/components/countries/CountriesExplorer.tsx

"use client";

import { useMemo, useState } from "react";
import { CountryCard } from "@/components/countries/CountryCard";
import {
  getAllGoals,
  getAllRegions,
  getCountrySearchText,
  type Country,
  type CountryGoal,
} from "@/lib/countries";

type SortOption = "score" | "budget" | "safety" | "name";

type CountriesExplorerProps = {
  countries: Country[];
};

export function CountriesExplorer({ countries }: CountriesExplorerProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [goal, setGoal] = useState<CountryGoal | "all">("all");
  const [sort, setSort] = useState<SortOption>("score");

  const regions = useMemo(() => getAllRegions(), []);
  const goals = useMemo(() => getAllGoals(), []);

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return countries
      .filter((country) => {
        const matchesRegion = region === "all" || country.region === region;
        const matchesGoal = goal === "all" || country.idealFor.includes(goal);
        const matchesQuery =
          !normalizedQuery ||
          getCountrySearchText(country).includes(normalizedQuery);

        return matchesRegion && matchesGoal && matchesQuery;
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

        if (sort === "name") {
          return a.name.localeCompare(b.name);
        }

        return b.tgpiScore - a.tgpiScore;
      });
  }, [countries, query, region, goal, sort]);

  return (
    <section className="mt-10">
      <div className="rounded-[1.5rem] border border-white/10 bg-[#111118] p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr]">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Search
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country, language, goal..."
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/70"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Region
            </span>
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
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Goal
            </span>
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
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Sort
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/70"
            >
              <option value="score">TGPI Score</option>
              <option value="budget">Budget</option>
              <option value="safety">Safety</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-bold text-white">{filteredCountries.length}</span>{" "}
          countries
        </p>

        <p className="hidden text-sm text-slate-500 md:block">
          Strategic data layer for international readiness.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCountries.map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
      </div>

      {filteredCountries.length === 0 ? (
        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#111118] p-8 text-center">
          <p className="text-lg font-bold text-white">No countries found.</p>
          <p className="mt-2 text-sm text-slate-400">
            Try another country, language, region or goal.
          </p>
        </div>
      ) : null}
    </section>
  );
}