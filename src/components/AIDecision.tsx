"use client";

import { useEffect, useState } from "react";
import { getGlobalProfile } from "@/lib/global-profile";
import { getBestCountries } from "@/lib/ai-decision";

export default function AIDecision() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const profile = await getGlobalProfile();
      const res = getBestCountries(profile);
      setResults(res);
    }
    load();
  }, []);

  return (
    <div className="grid gap-4">
      {results.map((c) => (
        <div key={c.slug} className="card">
          <h3>{c.name}</h3>
        </div>
      ))}
    </div>
  );
}