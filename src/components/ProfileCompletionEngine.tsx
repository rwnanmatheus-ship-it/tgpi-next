"use client";

import {
  buildProfileCompletionItems,
  getCompletionScore,
  getNextPriorityItems,
} from "@/lib/profile-completion-engine";

type TabKey = "overview" | "edit" | "goals" | "settings";

export default function ProfileCompletionEngine({
  profile,
  onOpenTab,
}: {
  profile: any;
  onOpenTab: (tab: TabKey) => void;
}) {
  const items = buildProfileCompletionItems(profile);
  const score = getCompletionScore(items);
  const nextItems = getNextPriorityItems(items, 4);

  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 shadow-[0_0_35px_rgba(250,204,21,0.03)]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-yellow-400">
          Completion Engine
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Fill the most important profile areas to unlock a stronger TGPI experience.
        </p>
      </div>

      <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-end gap-3">
          <p className="text-5xl font-bold text-white">{score}</p>
          <p className="pb-2 text-sm text-slate-400">/100 complete</p>
        </div>

        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {nextItems.length ? (
          nextItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenTab(item.tab)}
                  className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-500/15"
                >
                  Complete now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Your profile is highly complete. Great job.
          </div>
        )}
      </div>
    </section>
  );
}