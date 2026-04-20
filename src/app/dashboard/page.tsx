"use client";

import ContinueJourney from "@/components/ContinueJourney";
import PageContainer from "@/components/PageContainer";
import Link from "next/link";

const recommendedCountries = [
  {
    name: "Portugal",
    emoji: "🇵🇹",
    slug: "portugal",
    reason: "Strong fit for relocation and European integration",
  },
  {
    name: "Canada",
    emoji: "🇨🇦",
    slug: "canada",
    reason: "High quality of life and structured immigration paths",
  },
  {
    name: "Germany",
    emoji: "🇩🇪",
    slug: "germany",
    reason: "Excellent for work abroad and European career growth",
  },
];

const recentActivity = [
  {
    title: "Visited Portugal country page",
    detail: "You explored relocation context, culture, and cost of life.",
  },
  {
    title: "Started English for Living Abroad",
    detail: "Your language preparation journey has already begun.",
  },
  {
    title: "Saved a country to favorites",
    detail: "You are building your global shortlist strategically.",
  },
];

export default function DashboardPage() {
  return (
    <PageContainer
      title="Your Global Dashboard 🌍"
      subtitle="Track your progress, continue your journey, and take the next step with clarity."
    >
      <section className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <p className="mb-3 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            Global Progress
          </p>

          <h2 className="text-3xl font-bold text-yellow-400">
            You are building a real international pathway.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-300">
            Your TGPI activity is starting to form a structured global profile
            through countries, courses, and strategic exploration.
          </p>

          <div className="mt-8 h-4 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[32%] rounded-full bg-yellow-500" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <span>32% pathway progress</span>
            <span>5 countries explored</span>
            <span>2 courses in progress</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/countries"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Explore More Countries
            </Link>

            <Link
              href="/courses"
              className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
            >
              Continue Learning
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Next Best Step
          </h2>

          <p className="mt-4 text-slate-300">
            Your strongest next move is to compare your top countries and align
            them with your learning pathway.
          </p>

          <div className="mt-6 space-y-3">
            <Link
              href="/compare"
              className="block rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 transition hover:border-yellow-500"
            >
              Compare countries
            </Link>

            <Link
              href="/premium"
              className="block rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 transition hover:border-yellow-500"
            >
              Unlock premium path
            </Link>

            <Link
              href="/profile"
              className="block rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 transition hover:border-yellow-500"
            >
              Review your profile
            </Link>
          </div>
        </div>
      </section>

      <ContinueJourney />

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Countries explored</p>
          <p className="mt-3 text-4xl font-bold text-yellow-400">5</p>
          <p className="mt-2 text-sm text-slate-300">
            Active exploration of your global options
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Courses in progress</p>
          <p className="mt-3 text-4xl font-bold text-yellow-400">2</p>
          <p className="mt-2 text-sm text-slate-300">
            Education aligned with your international goals
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Certificates earned</p>
          <p className="mt-3 text-4xl font-bold text-yellow-400">1</p>
          <p className="mt-2 text-sm text-slate-300">
            Recognition that reinforces your profile
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Recommended Countries
          </h2>

          <div className="mt-6 space-y-4">
            {recommendedCountries.map((country) => (
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
                <p className="mt-2 text-sm text-slate-400">{country.reason}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Recent Activity
          </h2>

          <div className="mt-6 space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}