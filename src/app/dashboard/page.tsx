"use client";

import BadgesGrid from "@/components/BadgesGrid";
import ContinueJourney from "@/components/ContinueJourney";
import PageContainer from "@/components/PageContainer";
import ReferralCard from "@/components/ReferralCard";
import SharePanel from "@/components/SharePanel";
import { getUserBadges } from "@/lib/badges";
import { calculateGamification } from "@/lib/gamification";
import Link from "next/link";

const recommendedCountries = [
  {
    name: "Portugal",
    emoji: "🇵🇹",
    slug: "portugal",
    reason: "Strong fit for relocation and European integration",
  },
  {
    name: "Canada",
    emoji: "🇨🇦",
    slug: "canada",
    reason: "High quality of life and structured immigration paths",
  },
  {
    name: "Germany",
    emoji: "🇩🇪",
    slug: "germany",
    reason: "Excellent for work abroad and European career growth",
  },
];

const recentActivity = [
  {
    title: "Visited Portugal country page",
    detail: "You explored relocation context, culture, and cost of life.",
    xp: "+10 XP",
  },
  {
    title: "Started English for Living Abroad",
    detail: "Your language preparation journey has already begun.",
    xp: "+25 XP",
  },
  {
    title: "Saved Germany to favorites",
    detail: "You strengthened your global shortlist strategically.",
    xp: "+15 XP",
  },
];

export default function DashboardPage() {
  const stats = {
    countriesExplored: 5,
    coursesInProgress: 2,
    certificatesEarned: 1,
    countriesSaved: 3,
    profileCompleted: true,
  };

  const game = calculateGamification(stats);
  const badges = getUserBadges({
    countriesExplored: stats.countriesExplored,
    coursesCompleted: 1,
    profileCompleted: stats.profileCompleted,
    level: game.level,
  });

  const shareText = `I reached Level ${game.level} on TGPI with ${game.xp} XP and I am building my global journey on The Global Polymath Institute 🌍`;

  return (
    <PageContainer
      title="Your Global Dashboard 🌍"
      subtitle="Track your growth, level up your global intelligence, and keep moving forward."
    >
      <section className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                Global XP System
              </p>

              <h2 className="text-3xl font-bold text-yellow-400">
                Level {game.level} • {game.rankTitle}
              </h2>

              <p className="mt-3 max-w-2xl text-slate-300">
                Every country explored, course started, and achievement earned
                increases your TGPI global progression.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Total XP
              </p>
              <p className="mt-2 text-3xl font-bold text-yellow-400">
                {game.xp}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>{game.currentLevelXp} XP</span>
              <span>{game.nextLevelXp} XP</span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-yellow-500 transition-all"
                style={{ width: `${game.progressPercent}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {game.progressPercent}% progress to Level {game.level + 1}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/countries"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Explore More Countries
            </Link>

            <Link
              href="/courses"
              className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
            >
              Continue Learning
            </Link>

            <Link
              href="/profile"
              className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-yellow-500"
            >
              Complete Profile
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Next Level Rewards
          </h2>

          <div className="mt-6 space-y-4">
            <RewardCard
              title="Unlock stronger country recommendations"
              detail="The more you explore, the more relevant your global suggestions become."
            />
            <RewardCard
              title="Build a premium-ready profile"
              detail="A complete profile increases strategic personalization across the platform."
            />
            <RewardCard
              title="Strengthen your TGPI identity"
              detail="Higher levels reinforce your learning and international preparation path."
            />
          </div>
        </div>
      </section>

      <ContinueJourney />

      <section className="grid gap-6 md:grid-cols-4">
        <StatCard
          label="Countries explored"
          value={String(stats.countriesExplored)}
          detail="Each country expands your global map"
        />
        <StatCard
          label="Courses in progress"
          value={String(stats.coursesInProgress)}
          detail="Learning fuels your progression"
        />
        <StatCard
          label="Certificates earned"
          value={String(stats.certificatesEarned)}
          detail="Recognition adds major XP value"
        />
        <StatCard
          label="Countries saved"
          value={String(stats.countriesSaved)}
          detail="Your shortlist is part of your strategy"
        />
      </section>

      <BadgesGrid badges={badges} />

      <section className="grid gap-6 xl:grid-cols-2">
        <SharePanel text={shareText} />
        <ReferralCard />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Recommended Countries
          </h2>

          <div className="mt-6 space-y-4">
            {recommendedCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="block rounded-2xl border border-slate-800 bg-slate-950 p-4 transition hover:border-yellow-500"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">
                    {country.emoji} {country.name}
                  </h3>
                  <span className="text-sm text-yellow-300">Open →</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{country.reason}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Activity Timeline
          </h2>

          <div className="mt-6 space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <span className="text-sm font-semibold text-yellow-300">
                    {item.xp}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-bold text-yellow-400">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </div>
  );
}

function RewardCard({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{detail}</p>
    </div>
  );
}