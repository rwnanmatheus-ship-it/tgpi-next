"use client";

import GlobalReadinessCard from "@/components/GlobalReadinessCard";
import ShareActions from "@/components/ShareActions";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
import { maskDocumentNumber, prettifyIntent } from "@/lib/identity";
import { calculateReputation } from "@/lib/calculate-reputation";

export default function PassportPage() {
  const user = useUserData();

  if (!user) {
    return <div className="p-10 text-white">Loading passport...</div>;
  }

  const countries = user.countriesExplored || [];
  const completedCourses = user.completedCourses || [];
  const readinessScore = user.globalReadinessScore || 0;
  const reputation = calculateReputation(user);
  const profileUrl = user.uid ? `/u/${user.uid}` : "/profile";
  const maskedDocument = maskDocumentNumber(
    user.documentType,
    user.documentNumber
  );

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8 text-white">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Global Passport
              </p>

              <h1 className="text-4xl font-bold text-yellow-400">
                🌍 Your Verified Global Identity
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Your passport centralizes your TGPI readiness, identity signals,
                travel objective, and high-value progress indicators in one
                premium global profile.
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
              <Card label="TGPI ID" value={user.tgpiId || "—"} />
              <Card
                label="Username"
                value={user.username ? `@${user.username}` : "—"}
              />
              <Card label="Global Score" value={String(user.globalScore || 0)} />
              <Card label="Reputation" value={`${reputation}/100`} />
            </div>
          </div>
        </section>

        <GlobalReadinessCard score={readinessScore} />

        <section className="grid gap-6 lg:grid-cols-2 text-white">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Identity & Travel Layer
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Card label="Legal Name" value={user.legalName || user.name || "—"} />
              <Card label="Nationality" value={user.nationality || "—"} />
              <Card label="Document Verification" value={maskedDocument} />
              <Card label="Travel Intent" value={prettifyIntent(user.travelIntent)} />
              <Card label="Target Country" value={user.targetCountry || "—"} />
              <Card
                label="Current Location"
                value={
                  [user.currentCity, user.currentCountry].filter(Boolean).join(", ") ||
                  "—"
                }
              />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Learning Footprint
            </h2>

            <div className="mt-6 space-y-4">
              <Card
                label="Countries Explored"
                value={String(countries.length)}
              />
              <Card
                label="Completed Courses"
                value={String(completedCourses.length)}
              />
              <Card
                label="Certificates Earned"
                value={String(user.certificatesEarned || 0)}
              />
              <Card
                label="Verification Status"
                value={user.isVerified ? "Verified Global Learner" : "Standard"}
              />
            </div>
          </section>
        </section>

        <ShareActions
          title="My TGPI Global Passport"
          text="Explore my TGPI Global Passport, international goals, and readiness signals."
          urlPath="/passport"
        />
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}