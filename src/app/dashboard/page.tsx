"use client";

import { useUserData } from "@/hooks/useUserData";
import UserConnections from "@/components/UserConnections";
import NotificationBell from "@/components/NotificationBell";
import SmartFeed from "@/components/SmartFeed";
import GlobalMomentum from "@/components/GlobalMomentum";
import PremiumStatusBadge from "@/components/PremiumStatusBadge";
import JourneyReasonsCard from "@/components/JourneyReasonsCard";
import InviteSystem from "@/components/InviteSystem";

export default function DashboardPage() {
  const user = useUserData();

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </main>
    );
  }

  const countriesExploredCount = Array.isArray(user.countriesExplored)
    ? user.countriesExplored.length
    : 0;

  const certificatesCount = Number(user.certificatesEarned || 0);
  const readinessScore = Number(user.globalReadinessScore || 0);
  const globalScore = Number(user.globalScore || 0);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">
              Welcome back, {user.name || "Explorer"}
            </h1>

            <p className="text-sm text-slate-400">
              Your global journey is in motion.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell />
            <PremiumStatusBadge
              plan={user.plan}
              isVerified={user.isVerified}
            />
          </div>
        </section>

        <GlobalMomentum
          score={globalScore}
          readiness={readinessScore}
          countries={countriesExploredCount}
          certificates={certificatesCount}
        />

        <UserConnections
          followers={user.followers || []}
          following={user.following || []}
        />

        <JourneyReasonsCard
          targetCountry={user.targetCountry}
          travelIntent={user.travelIntent}
          readinessScore={readinessScore}
          countriesExplored={countriesExploredCount}
        />

        <SmartFeed user={user} />

        <InviteSystem />
      </div>
    </main>
  );
}