"use client";

import { useUserData } from "@/hooks/useUserData";
import NotificationCenter from "@/components/NotificationCenter";
import XPRace from "@/components/XPRace";
import GlobalReadinessCard from "@/components/GlobalReadinessCard";
import GlobalMomentum from "@/components/GlobalMomentum";
import JourneyReasonsCard from "@/components/JourneyReasonsCard";
import PremiumStatusBadge from "@/components/PremiumStatusBadge";
import Link from "next/link";

export default function DashboardPage() {
  const user = useUserData();

  if (!user) {
    return <div className="p-10 text-white">Loading dashboard...</div>;
  }

  const countriesExploredCount = Array.isArray(user.countriesExplored)
    ? user.countriesExplored.length
    : 0;
  const certificatesCount = Number(user.certificatesEarned || 0);
  const readinessScore = Number(user.globalReadinessScore || 0);

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Control Center
              </p>

              <h1 className="text-4xl font-bold text-yellow-400">
                Welcome back, {user.name || "Global User"}
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                This is your center of gravity inside TGPI — where readiness,
                movement, visibility, and international progress turn into
                something measurable and real.
              </p>

              <div className="mt-5">
                <PremiumStatusBadge
                  plan={user.plan}
                  isVerified={user.isVerified}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/countries"
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Explore Countries
                </Link>

                <Link
                  href="/passport"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-yellow-500"
                >
                  Open Passport
                </Link>

                <Link
                  href="/premium"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-yellow-500"
                >
                  View Premium
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card title="XP" value={user.xp || 0} />
              <Card title="Level" value={user.level || 1} />
              <Card title="Global Score" value={user.globalScore || 0} />
              <Card title="Readiness" value={`${readinessScore}/100`} />
            </div>
          </div>
        </section>

        <GlobalReadinessCard score={readinessScore} />

        <GlobalMomentum
          score={Number(user.globalScore || 0)}
          readiness={readinessScore}
          countries={countriesExploredCount}
          certificates={certificatesCount}
        />

        <JourneyReasonsCard
          targetCountry={user.targetCountry}
          travelIntent={user.travelIntent}
          readinessScore={readinessScore}
          countriesExplored={countriesExploredCount}
        />

        <section className="grid gap-6 xl:grid-cols-2">
          <NotificationCenter />
          <XPRace users={[user]} />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <InsightCard
            title="Identity Strength"
            text="Your TGPI identity is becoming a visible layer of global trust, not just a profile."
          />
          <InsightCard
            title="International Positioning"
            text="Every country explored and certificate earned increases your relevance for future international opportunities."
          />
          <InsightCard
            title="Why Users Upgrade"
            text="Premium users gain stronger visibility, deeper access, and a more powerful signal across the ecosystem."
          />
        </section>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-yellow-400">{value}</p>
    </div>
  );
}

function InsightCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-bold text-yellow-400">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
    </section>
  );
}