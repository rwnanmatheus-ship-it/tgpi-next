"use client";

import DailyStreak from "@/components/DailyStreak";
import DailyMissions from "@/components/DailyMissions";
import ReferralSystem from "@/components/ReferralSystem";
import XPProgress from "@/components/XPProgress";
import ActivityFeed from "@/components/ActivityFeed";
import UserBadges from "@/components/UserBadges";

import RecommendedCountries from "@/components/RecommendedCountries";
import ActionPlan from "@/components/ActionPlan";
import GlobalAdvisor from "@/components/GlobalAdvisor";
import ProfileInsights from "@/components/ProfileInsights";
import OpportunityRadar from "@/components/OpportunityRadar";
import ReadinessGaps from "@/components/ReadinessGaps";
import PriorityMatrix from "@/components/PriorityMatrix";

import GlobalRoomsList from "@/components/GlobalRoomsList";
import SocialFeed from "@/components/SocialFeed";
import ViralLoop from "@/components/ViralLoop";
import OnlineNow from "@/components/OnlineNow";
import ProfileCompletion from "@/components/ProfileCompletion";

export default function DashboardPage() {
  const xp = 120;
  const intent = "work";

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">
              Your Global Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Your movement, readiness, and global identity are evolving in real time.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <OnlineNow />
            <ProfileCompletion />
          </div>
        </section>

        <DailyStreak />
        <XPProgress xp={xp} />
        <UserBadges />

        <div className="grid gap-6 xl:grid-cols-2">
          <RecommendedCountries intent={intent} />
          <GlobalAdvisor />
        </div>

        <ActionPlan />

        <div className="grid gap-6 md:grid-cols-2">
          <ProfileInsights />
          <OpportunityRadar />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ReadinessGaps />
          <PriorityMatrix />
        </div>

        <DailyMissions />
        <ReferralSystem />
        <ActivityFeed />

        <GlobalRoomsList />
        <SocialFeed />
        <ViralLoop />
      </div>
    </main>
  );
}