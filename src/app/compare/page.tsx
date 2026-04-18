"use client";

import { countries } from "@/data/countries";
import Link from "next/link";
import { useMemo, useState } from "react";

function CompareRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm text-white">{value}</p>
    </div>
  );
}

export default function ComparePage() {
  const [leftSlug, setLeftSlug] = useState(countries[0]?.slug || "");
  const [rightSlug, setRightSlug] = useState(countries[1]?.slug || "");

  const leftCountry = useMemo(
    () => countries.find((country) => country.slug === leftSlug),
    [leftSlug]
  );

  const rightCountry = useMemo(
    () => countries.find((country) => country.slug === rightSlug),
    [rightSlug]
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Comparison
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Compare two country pathways side by side.
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Evaluate direction, language, region, currency, and strategic fit
            before going deeper into a specific country page.
          </p>
        </section>

        <section className="mb-10 grid gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              First country
            </label>
            <select
              value={leftSlug}
              onChange={(e) => setLeftSlug(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            >
              {countries.map((country) => (
                <option key={country.slug} value={country.slug}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Second country
            </label>
            <select
              value={rightSlug}
              onChange={(e) => setRightSlug(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            >
              {countries.map((country) => (
                <option key={country.slug} value={country.slug}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {leftCountry && rightCountry ? (
          <section className="grid gap-6 xl:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <div className="mb-6">
                <p className="text-5xl">{leftCountry.emoji}</p>
                <h2 className="mt-4 text-3xl font-bold text-yellow-400">
                  {leftCountry.name}
                </h2>
                <p className="mt-2 text-slate-400">
                  {leftCountry.shortDescription}
                </p>
              </div>

              <div className="space-y-4">
                <CompareRow label="Region" value={leftCountry.region} />
                <CompareRow label="Language" value={leftCountry.language} />
                <CompareRow label="Capital" value={leftCountry.capital} />
                <CompareRow label="Currency" value={leftCountry.currency} />
                <CompareRow label="Main Goal" value={leftCountry.mainGoal} />
              </div>

              <Link
                href={`/countries/${leftCountry.slug}`}
                className="mt-8 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Open {leftCountry.name}
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <div className="rounded-full border border-yellow-700/30 bg-yellow-500/5 px-5 py-3 text-sm font-semibold text-yellow-300">
                VS
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <div className="mb-6">
                <p className="text-5xl">{rightCountry.emoji}</p>
                <h2 className="mt-4 text-3xl font-bold text-yellow-400">
                  {rightCountry.name}
                </h2>
                <p className="mt-2 text-slate-400">
                  {rightCountry.shortDescription}
                </p>
              </div>

              <div className="space-y-4">
                <CompareRow label="Region" value={rightCountry.region} />
                <CompareRow label="Language" value={rightCountry.language} />
                <CompareRow label="Capital" value={rightCountry.capital} />
                <CompareRow label="Currency" value={rightCountry.currency} />
                <CompareRow label="Main Goal" value={rightCountry.mainGoal} />
              </div>

              <Link
                href={`/countries/${rightCountry.slug}`}
                className="mt-8 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Open {rightCountry.name}
              </Link>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}