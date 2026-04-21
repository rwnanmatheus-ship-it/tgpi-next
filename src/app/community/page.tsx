"use client";

import Link from "next/link";
import { useUserData } from "@/hooks/useUserData";
import SmartMatchingEngine from "@/components/SmartMatchingEngine";
import ConnectionSuggestions from "@/components/ConnectionSuggestions";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import LiveRanking from "@/components/LiveRanking";

export default function CommunityPage() {
  const user = useUserData();

  if (!user) {
    return <div className="p-10 text-white">Loading community...</div>;
  }

  const mockUsers = [
    user,
    {
      uid: "1",
      name: "Anna",
      targetCountry: user.targetCountry,
      travelIntent: "study",
      globalScore: 80,
    },
    {
      uid: "2",
      name: "Lucas",
      targetCountry: "Canada",
      travelIntent: "work",
      globalScore: 75,
    },
    {
      uid: "3",
      name: "Maria",
      targetCountry: user.targetCountry,
      travelIntent: "relocation",
      globalScore: 90,
    },
  ];

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            Global Community
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            You are not alone in your journey. TGPI connects people moving across
            the world, building something bigger than a platform — a global
            network of movement.
          </p>
        </section>

        <SmartMatchingEngine currentUser={user} users={mockUsers} />

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-yellow-400">
            Clickable Community Profiles
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mockUsers
              .filter((communityUser) => communityUser.uid !== user.uid)
              .map((communityUser) => (
                <Link
                  key={communityUser.uid}
                  href={`/u/${communityUser.uid}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-yellow-500"
                >
                  <p className="font-semibold text-white hover:text-yellow-400">
                    {communityUser.name}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    {communityUser.targetCountry || "No target country"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {communityUser.travelIntent || "No intent defined"}
                  </p>
                </Link>
              ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <ConnectionSuggestions users={mockUsers} />
          <LiveActivityFeed />
        </div>

        <LiveRanking users={mockUsers} />
      </div>
    </div>
  );
}