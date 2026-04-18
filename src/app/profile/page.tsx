"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile, UserProfile } from "@/lib/profile";
import { awardXP } from "@/lib/xp-engine";
import { isPremium } from "@/lib/plan";
import { getUserBadges } from "@/lib/badges";

export default function ProfilePage() {
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      setUid(user.uid);

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
      } else {
        const newProfile = defaultUserProfile(user.email || "");
        await setDoc(ref, {
          ...newProfile,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        setProfile(newProfile);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function updateField<K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K]
  ) {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function saveProfile() {
    if (!uid) return;

    try {
      setStatus("Saving profile...");

      await setDoc(
        doc(db, "users", uid),
        {
          ...profile,
          onboardingCompleted: true,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      await awardXP("save_profile");

      setStatus("Profile updated successfully.");
    } catch (error: any) {
      setStatus(error?.message || "Could not save profile.");
    }
  }

  const badges = getUserBadges(profile);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl text-slate-300">Loading profile...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        {!isPremium(profile.membershipPlan) ? (
          <section className="mb-8 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-white/5 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Upgrade Your Account
                </h2>
                <p className="mt-2 max-w-2xl text-slate-300">
                  Unlock stronger personalization, unlimited favorite countries,
                  and future premium global readiness tools.
                </p>
              </div>

              <Link
                href="/upgrade"
                className="inline-flex w-fit items-center justify-center rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Upgrade Now
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mb-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">
          <div className="mb-4 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
            Global User Profile
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Shape Your Global Profile
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Define your country interests, learning preferences, and global
            direction to personalize the TGPI experience.
          </p>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              Current Focus
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
              Preferred Language
            </p>
            <p className="text-2xl font-bold text-white">
              {profile.preferredLanguage || "Not set"}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              Membership Plan
            </p>
            <p className="text-2xl font-bold text-white">
              {profile.membershipPlan}
            </p>
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Badges & Achievements
            </h2>
            <Link
              href="/dashboard"
              className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/20"
            >
              View Dashboard
            </Link>
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

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-white">Edit Profile</h2>
            <p className="text-slate-400">
              Your data shapes recommendations, country pathways, currency
              views, and future personalization.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Membership Plan
              </label>
              <select
                value={profile.membershipPlan}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "Free" || value === "Premium") {
                    updateField("membershipPlan", value);
                  }
                }}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Country of Interest
              </label>
              <select
                value={profile.countryInterest}
                onChange={(e) => updateField("countryInterest", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option>Japan</option>
                <option>Brazil</option>
                <option>Egypt</option>
                <option>Germany</option>
                <option>Canada</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Main Goal
              </label>
              <select
                value={profile.mainGoal}
                onChange={(e) => updateField("mainGoal", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option>Work abroad</option>
                <option>Live abroad</option>
                <option>Study abroad</option>
                <option>Cultural learning</option>
                <option>Language mastery</option>
                <option>Art and Civilization Studies</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Preferred Learning Language
              </label>
              <select
                value={profile.preferredLanguage}
                onChange={(e) => updateField("preferredLanguage", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option>English</option>
                <option>Portuguese</option>
                <option>Spanish</option>
                <option>Arabic</option>
                <option>Japanese</option>
                <option>German</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Preferred Currency
              </label>
              <select
                value={profile.preferredCurrency}
                onChange={(e) => updateField("preferredCurrency", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option value="USD">USD — US Dollar</option>
                <option value="BRL">BRL — Brazilian Real</option>
                <option value="EUR">EUR — Euro</option>
                <option value="JPY">JPY — Japanese Yen</option>
                <option value="EGP">EGP — Egyptian Pound</option>
                <option value="CAD">CAD — Canadian Dollar</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Weekly Study Focus
              </label>
              <select
                value={profile.weeklyFocus}
                onChange={(e) => updateField("weeklyFocus", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option>Global Path</option>
                <option>Languages</option>
                <option>Cultural Integration</option>
                <option>Ancient Civilizations</option>
                <option>Classical Music</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Personal Goal Note
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                className="min-h-[150px] w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={saveProfile}
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Save Profile
            </button>

            <Link
              href="/dashboard"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Go to Dashboard
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

          {status ? (
            <p className="mt-5 text-sm text-yellow-300">{status}</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}