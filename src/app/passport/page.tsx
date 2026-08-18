"use client";

import GlobalReadinessCard from "@/components/GlobalReadinessCard";
import ShareActions from "@/components/ShareActions";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
import { maskDocumentNumber, prettifyIntent } from "@/lib/identity";
import { calculateReputation } from "@/lib/calculate-reputation";

function getCollectionCount(value: number | string[] | undefined): number {
  if (Array.isArray(value)) return value.length;
  return Number(value || 0);
}

export default function PassportPage() {
  const user = useUserData();

  if (user === undefined) {
    return (
      <main className="min-h-[70vh] bg-[var(--tgpi-canvas)] px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-[30px] border border-[var(--tgpi-border)] bg-white p-8 text-center shadow-[var(--tgpi-shadow-soft)]">
          <p className="text-sm font-bold text-[var(--tgpi-muted)]" role="status">Loading your TGPI Passport…</p>
        </div>
      </main>
    );
  }

  if (user === null) {
    return (
      <main className="min-h-[70vh] bg-[var(--tgpi-canvas)] px-4 py-16 sm:px-6">
        <section className="mx-auto max-w-4xl overflow-hidden rounded-[34px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-premium)]">
          <div className="grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-8 sm:p-12">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">TGPI Passport</p>
              <h1 className="mt-4 font-[var(--tgpi-font-display)] text-5xl font-semibold leading-none text-[var(--tgpi-navy)] sm:text-6xl">Your global plan needs a home.</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--tgpi-muted)]">
                Sign in to organize your identity, readiness, learning progress and document checklist in one private workspace.
              </p>
              <div className="mt-8 grid gap-3 sm:flex">
                <Link href="/login?next=/passport" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                  Sign in to continue
                </Link>
                <Link href="/countries" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[var(--tgpi-border)] bg-white px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                  Explore countries first
                </Link>
              </div>
            </div>
            <div className="bg-[var(--tgpi-navy)] p-8 text-white sm:p-10">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">Private workspace</p>
              <div className="mt-6 grid gap-3">
                {["Identity and travel goal", "Country shortlist", "Readiness and learning", "Documents and next actions"].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-extrabold text-[var(--tgpi-gold-light)]">0{index + 1}</span>
                    <span className="text-sm font-bold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const countriesCount = getCollectionCount(user.countriesExplored);
  const completedCoursesCount = getCollectionCount(user.completedCourses);
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
                value={String(countriesCount)}
              />
              <Card
                label="Completed Courses"
                value={String(completedCoursesCount)}
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
