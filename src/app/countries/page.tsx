"use client";

import CountryCard from "@/components/CountryCard";
import { countries } from "@/data/countries";
import Link from "next/link";
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
    const query = search.trim().toLowerCase();

    return countries.filter((country) => {
      const matchesSearch =
        query === "" ||
        country.name.toLowerCase().includes(query) ||
        country.language.toLowerCase().includes(query) ||
        country.currencyCode.toLowerCase().includes(query) ||
        country.region.toLowerCase().includes(query) ||
        country.capital.toLowerCase().includes(query);

      const matchesGoal = goal === "All" || country.mainGoal === goal;
      const matchesRegion = region === "All" || country.region === region;

      return matchesSearch && matchesGoal && matchesRegion;
    });
  }, [search, goal, region]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Country System
              </p>

              <h1 className="text-4xl font-bold md:text-5xl">
                Explore 13 country pathways with depth, filters, and direct access.
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Browse countries, filter by region and goal, and open a dedicated
                page with currency, cost-of-life, and pathway details.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-500"
                >
                  Open Dashboard
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="text-2xl font-bold text-yellow-400">System Status</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>• {countries.length} countries loaded</p>
                <p>• Dedicated page for each country</p>
                <p>• Search by name, capital, language, region, and currency</p>
                <p>• Filters by goal and region</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Search
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Country, capital, language, region or currency"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Goal
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
              Region
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
              <h2 className="text-3xl font-bold text-yellow-400">Available Countries</h2>
              <p className="mt-2 text-sm text-slate-400">
                {filteredCountries.length} countries found
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