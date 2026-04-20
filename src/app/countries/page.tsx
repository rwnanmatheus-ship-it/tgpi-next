"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { countries, countryGoals, countryRegions } from "@/data/countries";

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [goal, setGoal] = useState<(typeof countryGoals)[number]>("All");
  const [region, setRegion] = useState<(typeof countryRegions)[number]>("All");

  const filteredCountries = useMemo(() => {
    const term = search.trim().toLowerCase();

    return countries.filter((country) => {
      const matchesSearch =
        !term ||
        country.name.toLowerCase().includes(term) ||
        country.language.toLowerCase().includes(term) ||
        country.currencyCode.toLowerCase().includes(term) ||
        country.region.toLowerCase().includes(term) ||
        country.tags.some((tag) => tag.toLowerCase().includes(term));

      const matchesGoal = goal === "All" || country.mainGoal === goal;
      const matchesRegion = region === "All" || country.region === region;

      return matchesSearch && matchesGoal && matchesRegion;
    });
  }, [search, goal, region]);

  const totalCountries = countries.length;
  const totalRegions = new Set(countries.map((country) => country.region)).size;

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="border-b border-yellow-700/10 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),linear-gradient(to_bottom,#071021,#050816)]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-yellow-500/25 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
              TGPI Countries
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Build global readiness by country.
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
              Explore countries through a premium TGPI lens: culture, language,
              lifestyle, adaptation, tourism, and preparation paths for study,
              work, travel, and long-term international positioning.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-yellow-600/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-sm text-slate-400">Countries available</div>
              <div className="mt-2 text-3xl font-bold text-yellow-400">
                {totalCountries}
              </div>
            </div>

            <div className="rounded-3xl border border-yellow-600/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-sm text-slate-400">Regions mapped</div>
              <div className="mt-2 text-3xl font-bold text-yellow-400">
                {totalRegions}
              </div>
            </div>

            <div className="rounded-3xl border border-yellow-600/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-sm text-slate-400">Preparation model</div>
              <div className="mt-2 text-3xl font-bold text-yellow-400">
                Premium
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Search countries, languages, tags, or currency code
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Japan, EUR, relocation, culture..."
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Main goal
              </label>
              <select
                value={goal}
                onChange={(e) =>
                  setGoal(e.target.value as (typeof countryGoals)[number])
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                {countryGoals.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Region
              </label>
              <select
                value={region}
                onChange={(e) =>
                  setRegion(e.target.value as (typeof countryRegions)[number])
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                {countryRegions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
              {filteredCountries.length} result{filteredCountries.length === 1 ? "" : "s"}
            </span>

            <span className="rounded-full border border-slate-700 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300">
              Catalog
            </span>

            <span className="rounded-full border border-slate-700 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300">
              Culture
            </span>

            <span className="rounded-full border border-slate-700 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300">
              Pathways
            </span>

            <span className="rounded-full border border-slate-700 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300">
              Premium Preparation
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        {filteredCountries.length === 0 ? (
          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-10 text-center">
            <h2 className="text-2xl font-semibold text-yellow-400">
              No countries found
            </h2>
            <p className="mt-3 text-slate-300">
              Try another search term, region, or goal filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCountries.map((country) => (
              <article
                key={country.slug}
                className="group rounded-[28px] border border-slate-800 bg-[linear-gradient(to_bottom,rgba(234,179,8,0.06),rgba(2,6,23,0.95))] p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-500/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-4xl">{country.emoji}</div>
                    <h2 className="mt-4 text-2xl font-bold">{country.name}</h2>
                    <p className="mt-2 text-sm text-slate-400">{country.region}</p>
                  </div>

                  <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-yellow-300">
                    {country.mainGoal}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-300">
                  {country.shortDescription}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Language
                    </div>
                    <div className="mt-2 text-sm font-medium text-white">
                      {country.language}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Currency
                    </div>
                    <div className="mt-2 text-sm font-medium text-white">
                      {country.currencyCode}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {country.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href={`/countries/${country.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                  >
                    Explore {country.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <h3 className="text-2xl font-bold text-yellow-400">
              Beyond tourism
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              TGPI Countries is designed to move beyond generic destination
              pages. Each country becomes a preparation environment with
              cultural, linguistic, and practical signals.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <h3 className="text-2xl font-bold text-yellow-400">
              Built to monetize
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              This structure is ready to connect with premium pathways, course
              recommendations, user goals, saved countries, and future locked
              intelligence layers.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-800 bg-slate-950 p-7">
            <h3 className="text-2xl font-bold text-yellow-400">
              Global product logic
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The catalog is now positioned as a premium discovery layer that
              can support study, work, relocation, language, and country-fit
              decisions across the TGPI ecosystem.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}