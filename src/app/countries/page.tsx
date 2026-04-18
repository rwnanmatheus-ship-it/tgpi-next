"use client";

import CountryCard from "@/components/CountryCard";
import WorldMapExplorer from "@/components/WorldMapExplorer";
import { countries } from "@/data/countries";
import { useMemo, useState } from "react";

const goalOptions = [
  "All",
  "Work abroad",
  "Live abroad",
  "Cultural learning",
];

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [goal, setGoal] = useState("All");

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch =
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.language.toLowerCase().includes(search.toLowerCase()) ||
        country.currencyCode.toLowerCase().includes(search.toLowerCase()) ||
        country.region.toLowerCase().includes(search.toLowerCase());

      const matchesGoal = goal === "All" || country.mainGoal === goal;

      return matchesSearch && matchesGoal;
    });
  }, [search, goal]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-8">
          <p className="mb-4 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Countries
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Explore countries through a premium global interface.
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Choose a country, understand its pathway, and open a richer page with
            currency, cost of life, and global readiness context.
          </p>
        </section>

        <section className="mb-10 grid gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-[1fr_260px]">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Search country, language, region or currency
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Filter by goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            >
              {goalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-yellow-400">
              Available Countries
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {filteredCountries.length} country pathways found
            </p>
          </div>

          {filteredCountries.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
              <p className="text-lg text-slate-300">No countries found.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCountries.map((country) => (
                <CountryCard key={country.slug} country={country} />
              ))}
            </div>
          )}
        </section>

        <WorldMapExplorer />
      </div>
    </main>
  );
}