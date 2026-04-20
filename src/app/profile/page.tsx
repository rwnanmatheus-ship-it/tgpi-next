"use client";

import PageContainer from "@/components/PageContainer";
import Link from "next/link";
import { useState } from "react";

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
  const [form, setForm] = useState({
    fullName: "Renan Matheus",
    email: "theglobalpolymath@gmail.com",
    phone: "+1 703-996-3146",
    countryGoal: "Portugal",
    focusRegion: "Europe",
    primaryObjective: "Relocation + work abroad",
    learningTrack: "Language + cultural integration",
  });

  const [message, setMessage] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Profile information updated successfully.");
  }

  return (
    <PageContainer
      title="Your Global Profile"
      subtitle="Manage your identity, preferences, and personal TGPI pathway."
    >
      <section className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <p className="mb-3 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Identity
          </p>

          <h2 className="text-3xl font-bold text-yellow-400">
            Build a premium global profile.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-300">
            Your profile connects learning, countries, certifications, and
            personal preferences into one international identity layer.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Membership</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">
                Premium Active
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Current goal</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">
                {form.countryGoal}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Quick Status
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Certificates</p>
              <p className="mt-1 text-white">1 issued</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Completed courses</p>
              <p className="mt-1 text-white">2 completed</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Favorite countries</p>
              <p className="mt-1 text-white">3 saved</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Focus region</p>
              <p className="mt-1 text-white">{form.focusRegion}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            Editable Profile Information
          </h2>
          <p className="mt-2 text-slate-400">
            Update the information that powers your TGPI experience.
          </p>
        </div>

        <form onSubmit={handleSave} className="grid gap-6 xl:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full name
            </label>
            <input
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Phone number
            </label>
            <input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Country goal
            </label>
            <input
              value={form.countryGoal}
              onChange={(e) => updateField("countryGoal", e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Focus region
            </label>
            <select
              value={form.focusRegion}
              onChange={(e) => updateField("focusRegion", e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            >
              <option>Europe</option>
              <option>North America</option>
              <option>South America</option>
              <option>Asia</option>
              <option>Africa</option>
              <option>Middle East</option>
              <option>Oceania</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Primary objective
            </label>
            <select
              value={form.primaryObjective}
              onChange={(e) => updateField("primaryObjective", e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            >
              <option>Relocation + work abroad</option>
              <option>Study abroad</option>
              <option>Tourism preparation</option>
              <option>Business expansion</option>
              <option>Cultural learning</option>
            </select>
          </div>

          <div className="xl:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">
              Learning track
            </label>
            <select
              value={form.learningTrack}
              onChange={(e) => updateField("learningTrack", e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            >
              <option>Language + cultural integration</option>
              <option>Travel preparation</option>
              <option>Work abroad readiness</option>
              <option>Study abroad readiness</option>
              <option>Relocation preparation</option>
            </select>
          </div>

          <div className="xl:col-span-2 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Save Profile
            </button>

            {message ? (
              <p className="text-sm text-yellow-300">{message}</p>
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
                  This course is part of your active international preparation pathway.
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
            Active Preferences
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Full name</p>
              <p className="mt-1 text-white">{form.fullName}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Email</p>
              <p className="mt-1 text-white">{form.email}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Phone</p>
              <p className="mt-1 text-white">{form.phone}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Current track</p>
              <p className="mt-1 text-white">{form.learningTrack}</p>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}