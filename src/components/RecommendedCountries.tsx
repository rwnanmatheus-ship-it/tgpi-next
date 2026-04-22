"use client";

import { useEffect, useState } from "react";
import { countries } from "@/data/countries";
import { getUserMemory } from "@/lib/user-memory";
import { buildRecommendationSignals } from "@/lib/recommendation-signals";

export default function RecommendedCountries() {
  const [recommended, setRecommended] = useState<typeof countries>([]);

  useEffect(() => {
    async function load() {
      const memory = await getUserMemory();
      const signals = buildRecommendationSignals(memory);

      const result = countries.filter((country) => {
        const nameMatch = signals.favoriteCountries.includes(country.name);
        const goalMatch = signals.countryGoals.includes(country.name);
        return nameMatch || goalMatch;
      });

      setRecommended(result.slice(0, 3));
    }

    load();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-yellow-400">
        Recommended Countries
      </h2>

      {recommended.length === 0 ? (
        <p className="text-sm text-slate-400">
          Recommendations will improve as you favorite countries and set goals.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {recommended.map((country) => (
            <div
              key={country.slug}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4"
            >
              <div className="text-2xl">{country.emoji}</div>
              <h3 className="mt-2 font-bold text-white">{country.name}</h3>
              <p className="mt-1 text-sm text-slate-400">
                {country.shortDescription}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}