"use client";

import DailyStreak from "@/components/DailyStreak";
import DailyMissions from "@/components/DailyMissions";
import ReferralSystem from "@/components/ReferralSystem";
import XPProgress from "@/components/XPProgress";
import ActivityFeed from "@/components/ActivityFeed";
import UserBadges from "@/components/UserBadges";

export default function DashboardPage() {
  const xp = 120;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-yellow-400">
          Your Global Dashboard
        </h1>

        <DailyStreak />

        <XPProgress xp={xp} />

        <UserBadges />

        <DailyMissions />

        <ReferralSystem />

        <ActivityFeed />
      </div>
    </main>
  );
}