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
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800 px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_24%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            
            {/* TEXTO */}
            <div>
              <p className="mb-5 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Global Discovery
              </p>

              <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
                Explore countries, learn skills, and prepare to live anywhere in the world.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Discover countries, compare opportunities, and access premium courses to prepare your global journey.
              </p>

              {/* BOTÕES PRINCIPAIS */}
              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  href="/countries"
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 hover:scale-[1.03]"
                >
                  Explore Countries
                </Link>

                <Link
                  href="/compare"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-yellow-500 hover:scale-[1.03]"
                >
                  Compare Countries
                </Link>

                <Link
                  href="/courses"
                  className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10 hover:scale-[1.03]"
                >
                  Explore Courses
                </Link>

                <Link
                  href="/dashboard"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-yellow-500 hover:scale-[1.03]"
                >
                  Open Dashboard
                </Link>
              </div>

              {/* METRICAS */}
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-3xl font-bold text-yellow-400">
                    {countries.length}
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Country pathways
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-3xl font-bold text-yellow-400">
                    Courses
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Global preparation
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-3xl font-bold text-yellow-400">
                    Global
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Life strategy
                  </p>
                </div>
              </div>
            </div>

            {/* BLOCO DIREITA */}
            <div className="rounded-[28px] border border-yellow-700/20 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm">
              <h2 className="text-3xl font-bold">
                Your global life starts here
              </h2>

              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <p>• Explore countries with real insights</p>
                <p>• Compare opportunities globally</p>
                <p>• Learn languages and cultures</p>
                <p>• Prepare to live abroad with confidence</p>
              </div>

              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  TGPI Vision
                </p>
                <p className="mt-3 text-sm text-slate-300">
                  A global education platform to prepare anyone to live anywhere.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:grid-cols-3">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            >
              {goalOptions.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            >
              {regionOptions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

          </div>
        </div>
      </section>

      {/* LISTA DE PAISES */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">

          <h2 className="mb-6 text-3xl font-bold text-yellow-400">
            Choose your country pathway
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCountries.map((country) => (
              <CountryCard key={country.slug} country={country} />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}