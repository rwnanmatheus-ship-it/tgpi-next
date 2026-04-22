"use client";

import { useMemo, useState } from "react";
import { countries } from "@/data/countries";
import { compareCountries } from "@/lib/country-comparison";

export default function CountryComparison() {
  const [firstSlug, setFirstSlug] = useState(countries[0]?.slug || "");
  const [secondSlug, setSecondSlug] = useState(countries[1]?.slug || "");

  const firstCountry = useMemo(
    () => countries.find((country) => country.slug === firstSlug),
    [firstSlug]
  );

  const secondCountry = useMemo(
    () => countries.find((country) => country.slug === secondSlug),
    [secondSlug]
  );

  const rows = useMemo(
    () => compareCountries(firstCountry, secondCountry),
    [firstCountry, secondCountry]
  );

  return (
    <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-yellow-400">
          Compare Countries
        </h2>
        <p className="mt-2 text-slate-300">
          Evaluate two pathways side by side and make smarter global decisions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <select
          value={firstSlug}
          onChange={(e) => setFirstSlug(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >
          {countries.map((country) => (
            <option key={country.slug} value={country.slug}>
              {country.name}
            </option>
          ))}
        </select>

        <select
          value={secondSlug}
          onChange={(e) => setSecondSlug(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >
          {countries.map((country) => (
            <option key={country.slug} value={country.slug}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
        <div className="grid grid-cols-3 bg-slate-900 p-4 text-sm font-semibold text-yellow-300">
          <div>Category</div>
          <div>{firstCountry?.name || "Country A"}</div>
          <div>{secondCountry?.name || "Country B"}</div>
        </div>

        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-3 border-t border-slate-800 bg-slate-950 p-4 text-sm text-slate-300"
          >
            <div className="font-medium text-white">{row.label}</div>
            <div>{row.first}</div>
            <div>{row.second}</div>
          </div>
        ))}
      </div>
    </section>
  );
}