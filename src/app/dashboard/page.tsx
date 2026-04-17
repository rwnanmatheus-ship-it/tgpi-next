"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile, UserProfile } from "@/lib/profile";

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

  const progressPercent = Math.min(profile.level * 10, 100);

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-7xl text-slate-300">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            Your Global Journey
          </h1>
          <p className="text-slate-400">
            Track your progress, goals, and country pathways.
          </p>
        </div>

        {/* PROFILE SNAPSHOT */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <span className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
              Country Focus
            </span>
            <p className="font-semibold text-white">
              {profile.countryInterest || "Not set"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <span className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
              Main Goal
            </span>
            <p className="font-semibold text-white">
              {profile.mainGoal || "Not set"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <span className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
              Preferred Currency
            </span>
            <p className="font-semibold text-white">
              {profile.preferredCurrency || "USD"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <span className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
              Preferred Language
            </span>
            <p className="font-semibold text-white">
              {profile.preferredLanguage || "English"}
            </p>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mb-10 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-8">
          <h2 className="mb-4 text-2xl font-bold">Global Progress</h2>

          <div className="mb-3 h-4 w-full rounded-full bg-slate-800">
            <div
              className="h-4 rounded-full bg-yellow-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-sm text-slate-400">
            Level {profile.level} • {progressPercent}% visible journey progress
          </p>
        </div>

        {/* STATS */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <span className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
              XP
            </span>
            <p className="text-3xl font-bold text-yellow-400">{profile.xp}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <span className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
              Level
            </span>
            <p className="text-3xl font-bold text-yellow-400">{profile.level}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <span className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
              Streak
            </span>
            <p className="text-3xl font-bold text-yellow-400">{profile.streak}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <span className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
              Onboarding
            </span>
            <p className="text-lg font-semibold text-white">
              {profile.onboardingCompleted ? "Completed" : "In Progress"}
            </p>
          </div>
        </div>

        {/* ACTIVE PATHWAY */}
        <div className="mb-10">
          <h2 className="mb-6 text-2xl font-bold text-yellow-400">
            Your Active Pathway
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="mb-2 text-xl font-bold text-yellow-400">
                {profile.countryInterest === "Japan" && "🇯🇵 Japan"}
                {profile.countryInterest === "Brazil" && "🇧🇷 Brazil"}
                {profile.countryInterest === "Egypt" && "🇪🇬 Egypt"}
                {!["Japan", "Brazil", "Egypt"].includes(profile.countryInterest) &&
                  (profile.countryInterest || "🌍 Global Path")}
              </h3>

              <p className="mb-4 text-sm text-slate-400">
                {profile.mainGoal || "Global Goal"}
              </p>

              <div className="mb-3 h-2 w-full rounded-full bg-slate-800">
                <div className="h-2 w-[35%] rounded-full bg-yellow-500" />
              </div>

              <a
                href={
                  profile.countryInterest
                    ? `/countries/${profile.countryInterest.toLowerCase().replace(/\s+/g, "-")}`
                    : "/countries"
                }
                className="text-sm text-yellow-300"
              >
                Continue →
              </a>
            </div>
          </div>
        </div>

        {/* DAILY QUESTS */}
        <div className="mb-10">
          <h2 className="mb-6 text-2xl font-bold text-yellow-400">
            Daily Quests
          </h2>

          <div className="grid gap-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p>Update your global profile</p>
              <span className="text-green-400">+10 XP</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p>Open your main country pathway</p>
              <span className="text-green-400">+15 XP</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p>Continue one cultural learning activity</p>
              <span className="text-green-400">+20 XP</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-10 text-center">
          <h2 className="mb-4 text-2xl font-bold text-yellow-400">
            Expand Your Global Path
          </h2>

          <p className="mb-6 text-slate-300">
            Discover new countries and unlock new cultural pathways.
          </p>

          <a
            href="/countries"
            className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black"
          >
            Explore Countries
          </a>
        </div>
      </div>
    </div>
  );
}