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

export default function DashboardPage() {
  const xp = 120;
  const intent = "work";

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-yellow-400">
          Your Global Dashboard
        </h1>

        <DailyStreak />
        <XPProgress xp={xp} />
        <UserBadges />

        <RecommendedCountries intent={intent} />
        <GlobalAdvisor />
        <ActionPlan />

        <ProfileInsights />
        <OpportunityRadar />
        <ReadinessGaps />
        <PriorityMatrix />

        <DailyMissions />
        <ReferralSystem />
        <ActivityFeed />
      </div>
    </main>
  );
}