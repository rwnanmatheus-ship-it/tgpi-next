"use client";

import OnlineNow from "@/components/OnlineNow";
import ProfileCompletion from "@/components/ProfileCompletion";
import SmartAdvisor from "@/components/SmartAdvisor";
import QuickStart from "@/components/QuickStart";
import ShareProfile from "@/components/ShareProfile";
import GlobalReadinessCard from "@/components/GlobalReadinessCard";
import RecentActivityTimeline from "@/components/RecentActivityTimeline";
import FavoriteCountriesPanel from "@/components/FavoriteCountriesPanel";
import DailyMissionBoard from "@/components/DailyMissionBoard";
import RecommendedCountries from "@/components/RecommendedCountries";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <p className="mb-3 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
            TGPI Intelligence Layer
          </p>

          <h1 className="text-4xl font-bold text-yellow-400">
            Your Global Dashboard
          </h1>

          <p className="mt-3 max-w-3xl text-slate-300">
            Track your international progress, unlock smarter signals, and use
            TGPI as your command center for global evolution.
          </p>
        </section>

        <ShareProfile username="globaluser" />

        <div className="grid gap-6 md:grid-cols-2">
          <GlobalReadinessCard />
          <RecentActivityTimeline />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FavoriteCountriesPanel />
          <DailyMissionBoard />
        </div>

        <RecommendedCountries />

        <div className="grid gap-6 lg:grid-cols-2">
          <OnlineNow />
          <ProfileCompletion />
        </div>

        <SmartAdvisor />
        <QuickStart />
      </div>
    </main>
  );
}