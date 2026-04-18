"use client";

import CountryCard from "@/components/CountryCard";
import { countries } from "@/data/countries";
import { useMemo, useState } from "react";

const goalOptions = [
  "All",
  "Work abroad",
  "Live abroad",
  "Cultural learning",
  "Study abroad",
  "Digital nomad",
  "Business expansion",
];

const regionOptions = [
  "All",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Middle East",
  "Oceania",
];

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [goal, setGoal] = useState("All");
  const [region, setRegion] = useState("All");

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const q = search.toLowerCase();

      const matchesSearch =
        country.name.toLowerCase().includes(q) ||
        country.language.toLowerCase().includes(q) ||
        country.currencyCode.toLowerCase().includes(q) ||
        country.region.toLowerCase().includes(q) ||
        country.capital.toLowerCase().includes(q);

      const matchesGoal = goal === "All" || country.mainGoal === goal;
      const matchesRegion = region === "All" || country.region === region;

      return matchesSearch && matchesGoal && matchesRegion;
    });
  }, [search, goal, region]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 overflow-hidden rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Country System
              </p>

              <h1 className="text-4xl font-bold md:text-5xl">
                Explore global country pathways with more depth and clarity.
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Choose a country, preview key information, and open a dedicated
                page with cost of life, currency context, and global readiness.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="text-2xl font-bold text-yellow-400">What you can do here</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>• Search countries by name, region, capital, or currency</p>
                <p>• Filter by goal and region</p>
                <p>• Open dedicated country pages</p>
                <p>• Build a stronger global exploration journey</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Search country, region, capital, language or currency
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

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Filter by region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            >
              {regionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-yellow-400">Country Pathways</h2>
              <p className="mt-2 text-sm text-slate-400">
                {filteredCountries.length} countries available
              </p>
            </div>
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
      </div>
    </main>
  );
}