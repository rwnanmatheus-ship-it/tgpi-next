"use client";

import { useEffect, useState } from "react";
import { getUserMemory } from "@/lib/user-memory";
import { buildDailyMissions } from "@/lib/daily-missions";

export default function DailyMissionBoard() {
  const [missions, setMissions] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const memory = await getUserMemory();
      setMissions(buildDailyMissions(memory));
    }

    load();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-yellow-400">Daily Missions</h2>

      {missions.length === 0 ? (
        <p className="text-sm text-slate-400">
          Great job. Your current missions are complete.
        </p>
      ) : (
        <div className="space-y-3">
          {missions.map((mission) => (
            <div
              key={mission}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300"
            >
              • {mission}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}