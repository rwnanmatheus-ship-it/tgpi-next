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

export default function OnboardingPage() {
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
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800 px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_24%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Global Discovery
              </p>

              <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
                Explore countries through a premium global interface.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Start with visual discovery, compare pathways, and open country
                pages with deeper cultural, practical, and strategic detail.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/countries"
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Open Country System
                </Link>

                <Link
                  href="/dashboard"
                  className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  Open Dashboard
                </Link>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-3xl font-bold text-yellow-400">
                    {countries.length}
                  </div>
                  <p className="mt-2 text-sm text-slate-300">Country pathways</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-3xl font-bold text-yellow-400">
                    Global
                  </div>
                  <p className="mt-2 text-sm text-slate-300">Premium direction</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-3xl font-bold text-yellow-400">
                    Live
                  </div>
                  <p className="mt-2 text-sm text-slate-300">Practical context</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-yellow-700/20 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm">
              <div className="mb-6">
                <p className="text-sm font-semibold text-yellow-300">
                  Why this page matters
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  Discovery first. Commitment later.
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-slate-300">
                <p>• Browse countries visually before making decisions</p>
                <p>• Filter by region and long-term objective</p>
                <p>• Open detailed country pages with deeper context</p>
                <p>• Build a more intentional global journey from the start</p>
              </div>

              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  TGPI Promise
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  A more curated, elegant, and strategic way to explore the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:grid-cols-3">
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
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-yellow-400">
                Choose your country pathway
              </h2>
              <p className="mt-2 text-slate-400">
                {filteredCountries.length} countries available for exploration
              </p>
            </div>

            <Link
              href="/countries"
              className="text-sm font-semibold text-yellow-300 hover:text-yellow-200"
            >
              View full countries page →
            </Link>
          </div>

          {filteredCountries.length === 0 ? (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
              <p className="text-lg text-slate-300">No countries found.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCountries.map((country) => (
                <CountryCard key={country.slug} country={country} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}