"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile, UserProfile } from "@/lib/profile";
import { getPlanLabel, isPremium } from "@/lib/plan";
import { getUserBadges } from "@/lib/badges";

function getNextLevelXP(level: number) {
  return level * 100;
}

function getCurrentLevelBaseXP(level: number) {
  return Math.max(0, (level - 1) * 100);
}

type Quest = {
  title: string;
  concluded: boolean;
  reward: number;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        }
      } catch (error) {
        console.error("Error loading dashboard profile:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const currentLevelBaseXP = useMemo(
    () => getCurrentLevelBaseXP(profile.level),
    [profile.level]
  );

  const nextLevelXP = useMemo(
    () => getNextLevelXP(profile.level),
    [profile.level]
  );

  const xpInsideLevel = Math.max(0, profile.xp - currentLevelBaseXP);
  const xpNeededInsideLevel = Math.max(1, nextLevelXP - currentLevelBaseXP);
  const levelProgressPercent = Math.min(
    100,
    Math.round((xpInsideLevel / xpNeededInsideLevel) * 100)
  );

  const quests: Quest[] = [
    {
      title: "Complete seu perfil",
      concluded: !!profile.completedActions?.includes("save_profile"),
      reward: 20,
    },
    {
      title: "Defina um país como meta",
      concluded: !!profile.completedActions?.includes("set_country_goal"),
      reward: 15,
    },
    {
      title: "Salve pelo menos um país favorito",
      concluded: !!profile.completedActions?.includes("toggle_favorite"),
      reward: 10,
    },
    {
      title: "Salve uma preferência de moeda",
      concluded: !!profile.completedActions?.includes("save_currency_usage"),
      reward: 5,
    },
  ];

  const completedQuestCount = quests.filter((quest) => quest.concluded).length;
  const badges = getUserBadges(profile);
  const unlockedBadges = badges.filter((badge) => badge.unlocked);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl text-slate-300">
          Loading your dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">
          <div className="mb-4 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
            Global Progress Dashboard
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Your Global Journey
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm">
              {getPlanLabel(profile.membershipPlan)}
            </span>

            {!isPremium(profile.membershipPlan) ? (
              <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                Upgrade available
              </span>
            ) : (
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
                Premium active
              </span>
            )}
          </div>

          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Track your country focus, progress, favorites, quests, badges, and
            global learning activity from one premium dashboard.
          </p>
        </section>

        {!isPremium(profile.membershipPlan) ? (
          <section className="mb-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-white/5 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Unlock Premium Features
                </h2>
                <p className="mt-2 max-w-2xl text-slate-300">
                  Upgrade to save more countries, unlock deeper platform
                  experiences, and prepare for future AI-driven global tools.
                </p>
              </div>

              <Link
                href="/upgrade"
                className="inline-flex w-fit items-center justify-center rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Upgrade Plan
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              Country Focus
            </p>
            <p className="text-2xl font-bold text-white">
              {profile.countryInterest || "Not set"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              Main Goal
            </p>
            <p className="text-2xl font-bold text-white">
              {profile.mainGoal || "Not set"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              Preferred Currency
            </p>
            <p className="text-2xl font-bold text-white">
              {profile.preferredCurrency || "USD"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              Preferred Language
            </p>
            <p className="text-2xl font-bold text-white">
              {profile.preferredLanguage || "English"}
            </p>
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">XP Progress</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Level up your global readiness with real actions.
                </p>
              </div>

              <div className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-300">
                Level {profile.level}
              </div>
            </div>

            <div className="mb-3 h-5 w-full rounded-full bg-white/10">
              <div
                className="h-5 rounded-full bg-yellow-500 transition-all"
                style={{ width: `${levelProgressPercent}%` }}
              />
            </div>

            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
              <span>{xpInsideLevel} XP in this level</span>
              <span>{Math.max(0, nextLevelXP - profile.xp)} XP to next level</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
                  Total XP
                </p>
                <p className="text-3xl font-bold text-yellow-400">
                  {profile.xp}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
                  Level
                </p>
                <p className="text-3xl font-bold text-yellow-400">
                  {profile.level}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
                  Streak
                </p>
                <p className="text-3xl font-bold text-yellow-400">
                  {profile.streak}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-2 text-2xl font-bold text-white">
              Quest Status
            </h2>
            <p className="mb-6 text-sm text-slate-400">
              Complete real actions to unlock your early progress.
            </p>

            <div className="mb-6 rounded-2xl border border-white/10 bg-black/10 p-4">
              <p className="text-sm text-slate-400">Completed Quests</p>
              <p className="mt-2 text-3xl font-bold text-yellow-400">
                {completedQuestCount}/{quests.length}
              </p>
            </div>

            <div className="space-y-4">
              {quests.map((quest) => (
                <div
                  key={quest.title}
                  className="rounded-2xl border border-white/10 bg-black/10 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{quest.title}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        quest.concluded
                          ? "bg-green-500/15 text-green-300"
                          : "bg-yellow-500/15 text-yellow-300"
                      }`}
                    >
                      {quest.concluded ? "Completed" : "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    Reward: +{quest.reward} XP
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Badges & Achievements</h2>
            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
              {unlockedBadges.length}/{badges.length} unlocked
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-3xl border p-6 ${
                  badge.unlocked
                    ? "border-yellow-500/30 bg-yellow-500/10"
                    : "border-white/10 bg-black/10"
                }`}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {badge.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      badge.unlocked
                        ? "bg-green-500/15 text-green-300"
                        : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {badge.unlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>

                <p className="text-sm leading-7 text-slate-300">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-5 text-2xl font-bold text-white">
              Recent Signals
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
                  Last Visited Country
                </p>
                <p className="font-semibold text-white">
                  {profile.lastVisitedCountry || "No country visited yet"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
                  Last Currency Target
                </p>
                <p className="font-semibold text-white">
                  {profile.lastCurrencyTarget || "USD"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
                  Last Converted Amount
                </p>
                <p className="font-semibold text-white">
                  {profile.lastConvertedAmount || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Favorite Countries
              </h2>

              <Link
                href="/countries"
                className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/20"
              >
                Explore More
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {profile.favorites?.length ? (
                profile.favorites.map((favorite) => (
                  <div
                    key={favorite}
                    className="rounded-2xl border border-white/10 bg-black/10 p-5"
                  >
                    <p className="text-lg font-semibold text-white">
                      {favorite}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/10 p-5 text-slate-400">
                  No favorite countries saved yet.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Continue Your Global Path
          </h2>

          <p className="mb-6 max-w-3xl leading-8 text-slate-300">
            Keep exploring countries, updating your profile, and using the
            platform to unlock new progress and build a stronger global
            readiness profile.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/countries"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Explore Countries
            </Link>

            <Link
              href="/profile"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Edit Profile
            </Link>

            {!isPremium(profile.membershipPlan) ? (
              <Link
                href="/upgrade"
                className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/20"
              >
                Upgrade Plan
              </Link>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}