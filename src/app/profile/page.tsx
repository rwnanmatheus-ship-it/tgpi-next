"use client";

import PageContainer from "@/components/PageContainer";
import Link from "next/link";

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
  return (
    <PageContainer
      title="Your Global Profile"
      subtitle="A premium identity layer that reflects your international progress and preparation."
    >
      <section className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <p className="mb-3 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Identity
          </p>

          <h2 className="text-3xl font-bold text-yellow-400">
            You are building a global-ready profile.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-300">
            Your TGPI profile brings together your learning journey, country
            exploration, certifications, and premium identity in one place.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Membership</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">
                Premium Active
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Global Goal</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">
                Live and work in Europe
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
              <p className="text-xs text-slate-400">Preferred language track</p>
              <p className="mt-1 text-white">English + cultural integration</p>
            </div>
          </div>
        </div>
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
            Preferences
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Focus region</p>
              <p className="mt-1 text-white">Europe</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Primary objective</p>
              <p className="mt-1 text-white">Relocation + work abroad</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Preferred learning track</p>
              <p className="mt-1 text-white">Language + cultural integration</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Current premium tier</p>
              <p className="mt-1 text-white">Global Premium</p>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}