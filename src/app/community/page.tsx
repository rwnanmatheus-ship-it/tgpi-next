"use client";

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
    { name: "Anna", targetCountry: user.targetCountry, travelIntent: "study", globalScore: 80 },
    { name: "Lucas", targetCountry: "Canada", travelIntent: "work", globalScore: 75 },
    { name: "Maria", targetCountry: user.targetCountry, travelIntent: "move", globalScore: 90 },
  ];

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            Global Community
          </h1>

          <p className="mt-4 text-slate-300 max-w-3xl">
            You are not alone in your journey. TGPI connects people moving across
            the world, building something bigger than a platform — a global
            network of movement.
          </p>
        </section>

        <SmartMatchingEngine currentUser={user} users={mockUsers} />

        <div className="grid gap-6 xl:grid-cols-2">
          <ConnectionSuggestions users={mockUsers} />
          <LiveActivityFeed />
        </div>

        <LiveRanking users={mockUsers} />
      </div>
    </div>
  );
}