"use client";

import { useEffect, useState } from "react";
import { getGlobalProfile } from "@/lib/global-profile";
import { getBestCountries } from "@/lib/ai-decision";
import type { Country } from "@/types";

export default function AIDecision() {
  const [results, setResults] = useState<Country[]>([]);

  useEffect(() => {
    async function load() {
      const profile = await getGlobalProfile();
      setResults(getBestCountries(profile));
    }

    void load();
  }, []);

  return (
    <div className="grid gap-4">
      {results.map((country) => (
        <div key={country.slug} className="card">
          <h3>{country.name}</h3>
        </div>
      ))}
    </div>
  );
}
