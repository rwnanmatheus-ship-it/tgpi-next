"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { countries } from "@/data/countries";

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [goalFilter, setGoalFilter] = useState("All");
  const [currencyFilter, setCurrencyFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");

  const goalOptions = useMemo(
    () => ["All", ...Array.from(new Set(countries.map((country) => country.mainGoal)))],
    []
  );

  const currencyOptions = useMemo(
    () => ["All", ...Array.from(new Set(countries.map((country) => country.currencyCode)))],
    []
  );

  const languageOptions = useMemo(
    () => ["All", ...Array.from(new Set(countries.map((country) => country.language)))],
    []
  );

  const filteredCountries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return countries.filter((country) => {
      const matchesSearch =
        !normalizedSearch ||
        country.name.toLowerCase().includes(normalizedSearch) ||
        country.language.toLowerCase().includes(normalizedSearch) ||
        country.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      const matchesGoal =
        goalFilter === "All" || country.mainGoal === goalFilter;

      const matchesCurrency =
        currencyFilter === "All" || country.currencyCode === currencyFilter;

      const matchesLanguage =
        languageFilter === "All" || country.language === languageFilter;

      return matchesSearch && matchesGoal && matchesCurrency && matchesLanguage;
    });
  }, [search, goalFilter, currencyFilter, languageFilter]);

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12">
          <div className="mb-4 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
            Global Country Pathways
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Explore Countries
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Discover premium country pathways designed to help people prepare
            for global life through language, culture, integration, and
            real-world readiness.
          </p>
        </section>

        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by country, language, or tag"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Goal
              </label>
              <select
                value={goalFilter}
                onChange={(e) => setGoalFilter(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                {goalOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Currency
              </label>
              <select
                value={currencyFilter}
                onChange={(e) => setCurrencyFilter(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                {currencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Language
              </label>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                {languageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 text-sm text-slate-400">
            {filteredCountries.length} country pathway
            {filteredCountries.length === 1 ? "" : "s"} found
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCountries.map((country) => (
            <article
              key={country.slug}
              className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:border-yellow-500/30 hover:bg-white/[0.07]"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 text-4xl">{country.emoji}</div>
                  <h2 className="text-2xl font-bold text-white">
                    {country.name}
                  </h2>
                </div>

                <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-yellow-300">
                  {country.mainGoal}
                </span>
              </div>

              <p className="mb-6 text-sm leading-7 text-slate-300">
                {country.shortDescription}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {country.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-6 grid gap-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                  <span>Language</span>
                  <span className="font-medium text-white">{country.language}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                  <span>Capital</span>
                  <span className="font-medium text-white">{country.capital}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                  <span>Currency</span>
                  <span className="font-medium text-white">
                    {country.currencyCode}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                  <span>Difficulty</span>
                  <span className="font-medium text-white">
                    {country.difficultyLevel}
                  </span>
                </div>
              </div>

              <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                <p className="mb-2 text-xs uppercase tracking-wide text-yellow-300">
                  Premium Teaser
                </p>
                <p className="text-sm leading-7 text-slate-200">
                  {country.premiumInsight}
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={`/countries/${country.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Explore Pathway
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}