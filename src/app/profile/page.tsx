"use client";

import AvatarUpload from "@/components/AvatarUpload";
import PageContainer from "@/components/PageContainer";
import { auth } from "@/lib/firebase";
import { calculateGamification } from "@/lib/gamification";
import {
  defaultUserProfile,
  getUserProfile,
  saveUserProfile,
  type UserProfileData,
} from "@/lib/user-profile";
import { getUserStats } from "@/lib/user-stats";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const certificates = [
  {
    title: "English for Living Abroad",
    status: "Issued",
  },
];

const completedCourses = [
  "English for Living Abroad",
  "Cultural Preparation Basics",
];

const favoriteCountries = [
  { name: "Portugal", emoji: "🇵🇹", slug: "portugal" },
  { name: "Canada", emoji: "🇨🇦", slug: "canada" },
  { name: "Germany", emoji: "🇩🇪", slug: "germany" },
];

export default function ProfilePage() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [form, setForm] = useState<UserProfileData>(defaultUserProfile);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserId("");
        setLoading(false);
        return;
      }

      try {
        setUserId(user.uid);
        const profile = await getUserProfile(user.uid);

        setForm({
          ...profile,
          email: profile.email || user.email || "",
          fullName: profile.fullName || user.displayName || "",
        });
      } catch (error) {
        console.error("Could not load profile:", error);
        setMessage("Could not load profile information.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  function updateField(field: keyof UserProfileData, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userId) {
      setMessage("You must be signed in to save your profile.");
      setMessageType("error");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setMessageType("");

      await saveUserProfile(userId, form);

      setMessage("Profile saved successfully.");
      setMessageType("success");
    } catch (error) {
      console.error(error);
      setMessage("Could not save profile information.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  const stats = useMemo(
    () => ({
      certificates: certificates.length,
      completedCourses: completedCourses.length,
      favoriteCountries: favoriteCountries.length,
    }),
    []
  );

  const statsData = getUserStats();
  const game = calculateGamification(statsData);

  return (
    <PageContainer
      title="Your Global Profile"
      subtitle="Manage your identity, preferences, and strategic TGPI path in one premium user hub."
    >
      {loading ? (
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-slate-300">Loading profile...</p>
        </section>
      ) : !userId ? (
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Sign in required
          </h2>
          <p className="mt-3 text-slate-300">
            Sign in to access and manage your TGPI profile.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Go to Login
          </Link>
        </section>
      ) : (
        <>
          <section className="rounded-3xl border border-yellow-700/20 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Your Global Level
            </h2>

            <p className="mt-2 text-slate-300">
              Level {game.level} • {game.rankTitle}
            </p>

            <p className="mt-1 text-sm text-slate-400">{game.xp} XP</p>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${game.progressPercent}%` }}
              />
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
              <p className="mb-3 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Identity
              </p>

              <h2 className="text-3xl font-bold text-yellow-400">
                Your international identity hub
              </h2>

              <p className="mt-4 max-w-2xl text-slate-300">
                This page brings together your profile, preferences, certificates,
                completed learning, and personal international direction.
              </p>

              <div className="mb-6 mt-6 flex items-center gap-6">
                <AvatarUpload />

                <div>
                  <p className="text-sm text-slate-400">Global Identity</p>
                  <p className="text-lg font-semibold text-white">
                    {form.fullName || "Unnamed User"}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">Membership</p>
                  <p className="mt-2 text-2xl font-bold text-yellow-400">
                    {form.membership}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-sm text-slate-400">Current goal</p>
                  <p className="mt-2 text-2xl font-bold text-yellow-400">
                    {form.countryGoal || "Not set yet"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-2xl font-bold text-yellow-400">
                Quick Status
              </h2>

              <div className="mt-6 grid gap-4">
                <StatusCard
                  label="Certificates"
                  value={`${stats.certificates} issued`}
                />
                <StatusCard
                  label="Completed courses"
                  value={`${stats.completedCourses} completed`}
                />
                <StatusCard
                  label="Favorite countries"
                  value={`${stats.favoriteCountries} saved`}
                />
                <StatusCard
                  label="Focus region"
                  value={form.focusRegion || "Not set yet"}
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-yellow-400">
                  Profile Information
                </h2>
                <p className="mt-2 text-slate-400">
                  Keep your most important TGPI account details updated and accessible.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-500"
              >
                Open Dashboard
              </Link>
            </div>

            <form onSubmit={handleSave} className="grid gap-6 xl:grid-cols-2">
              <Field
                label="Full name"
                value={form.fullName}
                onChange={(value) => updateField("fullName", value)}
                placeholder="Enter your full name"
              />

              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                placeholder="Enter your email"
              />

              <Field
                label="Phone number"
                value={form.phone}
                onChange={(value) => updateField("phone", value)}
                placeholder="Enter your phone number"
              />

              <Field
                label="Country goal"
                value={form.countryGoal}
                onChange={(value) => updateField("countryGoal", value)}
                placeholder="Ex: Portugal"
              />

              <SelectField
                label="Focus region"
                value={form.focusRegion}
                onChange={(value) => updateField("focusRegion", value)}
                options={[
                  "Europe",
                  "North America",
                  "South America",
                  "Asia",
                  "Africa",
                  "Middle East",
                  "Oceania",
                ]}
              />

              <SelectField
                label="Primary objective"
                value={form.primaryObjective}
                onChange={(value) => updateField("primaryObjective", value)}
                options={[
                  "Relocation + work abroad",
                  "Study abroad",
                  "Tourism preparation",
                  "Business expansion",
                  "Cultural learning",
                ]}
              />

              <div className="xl:col-span-2">
                <SelectField
                  label="Learning track"
                  value={form.learningTrack}
                  onChange={(value) => updateField("learningTrack", value)}
                  options={[
                    "Language + cultural integration",
                    "Travel preparation",
                    "Work abroad readiness",
                    "Study abroad readiness",
                    "Relocation preparation",
                  ]}
                />
              </div>

              <div className="xl:col-span-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>

                <Link
                  href="/premium"
                  className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  View Premium
                </Link>

                {message ? (
                  <p
                    className={`text-sm ${
                      messageType === "success"
                        ? "text-yellow-300"
                        : "text-red-300"
                    }`}
                  >
                    {message}
                  </p>
                ) : null}
              </div>
            </form>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-2xl font-bold text-yellow-400">
                Certificates
              </h2>

              <div className="mt-6 space-y-4">
                {certificates.map((certificate) => (
                  <div
                    key={certificate.title}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-white">
                        {certificate.title}
                      </h3>
                      <span className="text-sm text-yellow-300">
                        {certificate.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      Stored as part of your TGPI premium profile.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-2xl font-bold text-yellow-400">
                Completed Courses
              </h2>

              <div className="mt-6 space-y-4">
                {completedCourses.map((course) => (
                  <div
                    key={course}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <h3 className="text-lg font-semibold text-white">{course}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      This course is part of your international preparation path.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-2xl font-bold text-yellow-400">
                Favorite Countries
              </h2>

              <div className="mt-6 space-y-4">
                {favoriteCountries.map((country) => (
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
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-2xl font-bold text-yellow-400">
                Active Snapshot
              </h2>

              <div className="mt-6 grid gap-4">
                <StatusCard label="Full name" value={form.fullName || "Not set"} />
                <StatusCard label="Email" value={form.email || "Not set"} />
                <StatusCard label="Phone" value={form.phone || "Not set"} />
                <StatusCard
                  label="Learning track"
                  value={form.learningTrack || "Not set"}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </PageContainer>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-white">{value}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}