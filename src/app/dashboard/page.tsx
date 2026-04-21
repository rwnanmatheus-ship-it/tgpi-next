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

export default function DashboardPage() {
  const xp = 120;
  const intent = "work";

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-4xl font-bold text-yellow-400">
          Your Global Dashboard
        </h1>

        <DailyStreak />
        <XPProgress xp={xp} />
        <UserBadges />

        <RecommendedCountries intent={intent} />
        <GlobalAdvisor />
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