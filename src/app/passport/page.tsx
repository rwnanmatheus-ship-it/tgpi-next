"use client";

import GlobalReadinessCard from "@/components/GlobalReadinessCard";
import ShareActions from "@/components/ShareActions";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";

export default function PassportPage() {
  const user = useUserData();

  if (!user) {
    return <div className="p-10 text-white">Loading passport...</div>;
  }

  const countries = user.countriesExplored || [];
  const completedCourses = user.completedCourses || [];
  const readinessScore = user.globalReadinessScore || 0;
  const profileUrl = user.uid ? `/u/${user.uid}` : "/profile";

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Global Passport
              </p>

              <h1 className="text-4xl font-bold text-yellow-400">
                🌍 Your Global Identity
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Your passport is the portable identity layer of your TGPI
                journey. It centralizes progress, status, countries explored,
                readiness, and signals of international commitment.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/countries"
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Explore Countries
                </Link>

                <Link
                  href={profileUrl}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-yellow-500"
                >
                  Open Public Profile
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">TGPI ID</p>
                <p className="mt-2 text-xl font-bold text-white">
                  {user.tgpiId || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Status</p>
                <p className="mt-2 text-xl font-bold text-yellow-400">
                  {user.isVerified ? "Verified Global Learner" : "Standard"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Global Score</p>
                <p className="mt-2 text-xl font-bold text-white">
                  {user.globalScore || 0}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Level</p>
                <p className="mt-2 text-xl font-bold text-white">
                  {user.level || 1}
                </p>
              </div>
            </div>
          </div>
        </section>

        <GlobalReadinessCard score={readinessScore} />

        <section className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Countries Explored
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {countries.length ? (
                countries.map((country) => (
                  <span
                    key={country}
                    className="rounded-xl border border-yellow-700/20 bg-yellow-500/10 px-4 py-2 text-yellow-300"
                  >
                    {country}
                  </span>
                ))
              ) : (
                <p className="text-slate-300">
                  No countries added yet. Explore countries to start building
                  your global identity.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Completed Courses
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {completedCourses.length ? (
                completedCourses.map((course) => (
                  <span
                    key={course}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-white"
                  >
                    {course}
                  </span>
                ))
              ) : (
                <p className="text-slate-300">
                  No completed courses yet. Complete courses to raise readiness
                  and global score.
                </p>
              )}
            </div>
          </section>
        </section>

        <ShareActions
          title="My TGPI Global Passport"
          text={`I am building my international readiness on TGPI with a readiness score of ${readinessScore}/100.`}
          urlPath="/passport"
        />
      </div>
    </div>
  );
}