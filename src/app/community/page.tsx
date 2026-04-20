"use client";

import ActivityFeed from "@/components/ActivityFeed";
import Leaderboard from "@/components/Leaderboard";
import PageContainer from "@/components/PageContainer";

const suggestedUsers = [
  {
    name: "Sophia Carter",
    focus: "Europe + relocation",
  },
  {
    name: "Lucas Bennett",
    focus: "Work abroad + language",
  },
  {
    name: "Emma Wilson",
    focus: "Travel preparation + culture",
  },
];

export default function CommunityPage() {
  return (
    <PageContainer
      title="Community"
      subtitle="Discover other learners, follow progress, and grow inside the TGPI ecosystem."
    >
      <section className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <Leaderboard />

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Suggested Members
          </h2>
          <p className="mt-2 text-slate-400">
            Connect with users who are building their global paths too.
          </p>

          <div className="mt-6 space-y-4">
            {suggestedUsers.map((user) => (
              <div
                key={user.name}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {user.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">{user.focus}</p>
                </div>

                <button className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>

      <ActivityFeed />
    </PageContainer>
  );
}