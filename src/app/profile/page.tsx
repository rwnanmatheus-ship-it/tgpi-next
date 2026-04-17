"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile, UserProfile } from "@/lib/profile";

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

  function updateField<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
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

      setStatus("Profile updated successfully.");
    } catch (error: any) {
      setStatus(error?.message || "Could not save profile.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-6xl text-slate-300">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-8">
          <h1 className="mb-3 text-4xl font-bold text-yellow-400">
            Your Global Profile
          </h1>
          <p className="max-w-3xl text-slate-300">
            Define your international direction, preferred country pathways,
            learning language, and preferred currency to personalize the TGPI
            experience.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <span className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
              Current Focus
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
              Preferred Language
            </span>
            <p className="font-semibold text-white">
              {profile.preferredLanguage || "Not set"}
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
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-yellow-400">
              Edit Profile
            </h2>
            <p className="text-sm text-slate-400">
              This information will shape future recommendations, pathways,
              currency views, and personalization.
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
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Membership Plan
              </label>
              <select
                value={profile.membershipPlan}
                onChange={(e) => updateField("membershipPlan", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option>Global Access</option>
                <option>Starter</option>
                <option>Institutional</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Country of Interest
              </label>
              <select
                value={profile.countryInterest}
                onChange={(e) => updateField("countryInterest", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option>Japan</option>
                <option>Brazil</option>
                <option>Egypt</option>
                <option>Italy</option>
                <option>France</option>
                <option>Germany</option>
                <option>United States</option>
                <option>United Kingdom</option>
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
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
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
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option>English</option>
                <option>Portuguese</option>
                <option>Spanish</option>
                <option>Arabic</option>
                <option>Japanese</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Preferred Currency
              </label>
              <select
                value={profile.preferredCurrency}
                onChange={(e) => updateField("preferredCurrency", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option value="USD">USD — US Dollar</option>
                <option value="BRL">BRL — Brazilian Real</option>
                <option value="EUR">EUR — Euro</option>
                <option value="JPY">JPY — Japanese Yen</option>
                <option value="EGP">EGP — Egyptian Pound</option>
                <option value="GBP">GBP — British Pound</option>
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
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              >
                <option>Mixed Global Path</option>
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
                className="min-h-[140px] w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={saveProfile}
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Save Profile
              </button>

              <a
                href="/dashboard"
                className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
              >
                Go to Dashboard
              </a>
            </div>
          </div>

          {status ? (
            <p className="mt-6 text-sm text-yellow-300">{status}</p>
          ) : null}
        </div>

        <div className="mt-8 rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8">
          <h2 className="mb-3 text-2xl font-bold text-yellow-400">
            Why this matters
          </h2>
          <p className="max-w-4xl text-slate-300">
            Your profile shapes future recommendations, country routes, dynamic
            currency display, personalized learning priorities, and premium
            pathway suggestions across the TGPI platform.
          </p>
        </div>
      </div>
    </div>
  );
}