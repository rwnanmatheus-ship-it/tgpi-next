"use client";

import { useEffect, useState } from "react";
import { getUserMemory } from "@/lib/user-memory";
import {
  calculateGlobalReadinessScore,
  getReadinessLevel,
} from "@/lib/global-readiness-score";

type GlobalReadinessCardProps = {
  score?: number;
};

export default function GlobalReadinessCard({
  score: externalScore,
}: GlobalReadinessCardProps) {
  const [score, setScore] = useState(
    typeof externalScore === "number" ? externalScore : 0
  );
  const [level, setLevel] = useState(
    getReadinessLevel(typeof externalScore === "number" ? externalScore : 0)
  );

  useEffect(() => {
    async function load() {
      if (typeof externalScore === "number") {
        setScore(externalScore);
        setLevel(getReadinessLevel(externalScore));
        return;
      }

      const memory = await getUserMemory();
      const nextScore = calculateGlobalReadinessScore(memory);
      setScore(nextScore);
      setLevel(getReadinessLevel(nextScore));
    }

    load();
  }, [externalScore]);

  return (
    <section className="rounded-2xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-6">
      <h2 className="mb-2 text-xl font-bold text-yellow-400">
        Global Readiness Score
      </h2>

      <div className="flex items-end gap-3">
        <p className="text-5xl font-bold text-white">{score}</p>
        <p className="pb-2 text-sm text-slate-400">/100</p>
      </div>

      <p className="mt-3 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-sm text-yellow-200">
        {level} Level
      </p>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        This score reflects how prepared your TGPI journey is becoming based on
        activity, goals, favorites, and international exploration signals.
      </p>
    </section>
  );
}