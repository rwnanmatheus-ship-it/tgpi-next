"use client";

import { countries } from "@/data/countries";
import { auth } from "@/lib/firebase";
import { getUserMemory, type UserMemory } from "@/lib/user-memory";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type GatewayTab = "countries" | "courses" | "premium";

const gatewayContent: Record<
  GatewayTab,
  {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    ctaLabel: string;
    ctaHref: string;
    accent: string;
  }
> = {
  countries: {
    eyebrow: "Global Discovery Layer",
    title: "Navigate countries with real-world context.",
    description:
      "Explore countries through language, lifestyle, cost signals, cultural readiness, and practical international relevance.",
    points: [
      "Country pathways with practical context",
      "Cost of life and value perception",
      "Culture, language, and integration signals",
    ],
    ctaLabel: "Enter Countries",
    ctaHref: "/countries",
    accent: "Countries",
  },
  courses: {
    eyebrow: "Learning Architecture",
    title: "Turn exploration into structured preparation.",
    description:
      "Move from curiosity to readiness through premium learning pathways designed to support real international goals.",
    points: [
      "Language and cultural preparation",
      "Skills for global readiness",
      "Structured progression for future certification",
    ],
    ctaLabel: "Open Courses",
    ctaHref: "/courses",
    accent: "Courses",
  },
  premium: {
    eyebrow: "Elite Access Layer",
    title: "Unlock the strongest version of the TGPI journey.",
    description:
      "Premium expands personalization, comparison depth, and long-term progression for users who want a more advanced global experience.",
    points: [
      "More personalization and saved continuity",
      "More powerful comparison and access",
      "A stronger premium path in USD",
    ],
    ctaLabel: "Unlock Premium",
    ctaHref: "/upgrade",
    accent: "Premium",
  },
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [memory, setMemory] = useState<UserMemory | null>(null);
  const [activeTab, setActiveTab] = useState<GatewayTab>("countries");
  const [mouseX, setMouseX] = useState(52);
  const [mouseY, setMouseY] = useState(28);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setMemory(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getUserMemory(user.uid);
        setMemory(data);
      } catch (error) {
        console.error("Could not load homepage memory:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const featuredCountries = useMemo(() => countries.slice(0, 3), []);

  const favoriteCountries = useMemo(() => {
    if (!memory?.favoriteCountries?.length) return [];
    return countries.filter((country) =>
      memory.favoriteCountries?.includes(country.slug)
    );
  }, [memory]);

  const lastVisitedCountry = useMemo(() => {
    if (!memory?.lastVisitedCountry) return null;
    return (
      countries.find((country) => country.slug === memory.lastVisitedCountry) ||
      null
    );
  }, [memory]);

  const activeGateway = gatewayContent[activeTab];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section
        className="relative overflow-hidden border-b border-slate-800 px-6 py-24 md:py-28"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          setMouseX(x);
          setMouseY(y);
        }}
      >
        <div className="absolute inset-0 bg-slate-950" />

        <div
          className="absolute inset-0 opacity-100 transition-all duration-300"
          style={{
            background: `
              radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(234,179,8,0.18), transparent 18%),
              radial-gradient(circle at 18% 18%, rgba(234,179,8,0.16), transparent 28%),
              radial-gradient(circle at 82% 22%, rgba(255,255,255,0.06), transparent 20%),
              radial-gradient(circle at 72% 74%, rgba(234,179,8,0.10), transparent 26%)
            `,
          }}
        />

        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:46px_46px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.25),rgba(2,6,23,0.7))]" />

        <div className="pointer-events-none absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-7rem] top-28 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-6rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200 shadow-[0_0_30px_rgba(234,179,8,0.08)]">
                The Global Polymath Institute • Global Gateway
              </p>

              <h1 className="max-w-5xl text-5xl font-bold leading-[1.02] md:text-7xl">
                The world is not just a map.
                <span className="mt-2 block bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                  It is a system to understand, enter, and master.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                TGPI is a premium global platform built to help people prepare
                to live, study, work, and integrate anywhere in the world
                through country intelligence, structured learning, and elevated
                digital readiness.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/countries"
                  className="rounded-xl bg-yellow-500 px-7 py-3 font-semibold text-black shadow-[0_14px_50px_rgba(234,179,8,0.18)] transition hover:-translate-y-0.5 hover:bg-yellow-400"
                >
                  Explore the World
                </Link>

                <Link
                  href="/upgrade"
                  className="rounded-xl border border-yellow-500/60 bg-yellow-500/5 px-7 py-3 font-semibold text-yellow-300 transition hover:-translate-y-0.5 hover:bg-yellow-500/10"
                >
                  Enter Premium
                </Link>

                <Link
                  href="/dashboard"
                  className="rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-yellow-500/30 hover:bg-slate-900"
                >
                  Open Dashboard
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "Global Readiness",
                    value: "195+",
                    text: "country-scale ambition",
                  },
                  {
                    label: "Practical Reality",
                    value: "Live",
                    text: "value, cost, comparison",
                  },
                  {
                    label: "Education",
                    value: "Learn",
                    text: "skills and pathways",
                  },
                  {
                    label: "Positioning",
                    value: "Elite",
                    text: "premium digital institution",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4 backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-yellow-500/30"
                  >
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-yellow-400">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[2.5rem] bg-yellow-500/10 blur-3xl" />
              <div className="absolute right-8 top-0 h-28 w-28 rounded-full border border-yellow-400/15 bg-yellow-400/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-yellow-700/20 bg-slate-900/70 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_34%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_36%,transparent_70%,rgba(255,255,255,0.04))]" />

                <div className="relative z-10">
                  <div className="mb-6 flex flex-wrap gap-3">
                    {(["countries", "courses", "premium"] as GatewayTab[]).map(
                      (tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            activeTab === tab
                              ? "border border-yellow-400/40 bg-yellow-500 text-black shadow-[0_8px_30px_rgba(234,179,8,0.18)]"
                              : "border border-slate-700 bg-slate-950/70 text-slate-300 hover:border-yellow-500/30 hover:text-white"
                          }`}
                        >
                          {tab === "countries"
                            ? "Countries"
                            : tab === "courses"
                            ? "Courses"
                            : "Premium"}
                        </button>
                      )
                    )}
                  </div>

                  <div className="grid gap-8 xl:grid-cols-[0.94fr_1.06fr] xl:items-center">
                    <div className="relative mx-auto flex h-[21rem] w-[21rem] max-w-full items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-yellow-500/8 blur-3xl" />
                      <div className="absolute inset-[5%] rounded-full border border-yellow-400/12 bg-[radial-gradient(circle,rgba(234,179,8,0.16),rgba(15,23,42,0.3),transparent_72%)] shadow-[0_0_120px_rgba(234,179,8,0.14)]" />
                      <div className="absolute inset-[15%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18),rgba(234,179,8,0.10),rgba(15,23,42,0.5))]" />
                      <div className="absolute inset-[27%] rounded-full border border-yellow-400/10 bg-slate-950/55" />
                      <div className="absolute left-[26%] top-[20%] h-10 w-10 rounded-full bg-white/20 blur-xl" />
                      <div className="absolute right-[18%] top-[28%] h-6 w-6 rounded-full bg-yellow-300/30 blur-md" />
                      <div className="absolute bottom-[23%] left-[20%] h-7 w-7 rounded-full bg-amber-200/20 blur-md" />
                      <div className="absolute bottom-[15%] right-[26%] h-12 w-12 rounded-full bg-yellow-500/10 blur-xl" />

                      <div className="absolute inset-[2%] rounded-full border border-dashed border-yellow-400/15" />
                      <div className="absolute inset-[10%] rounded-full border border-dashed border-white/10" />

                      <div className="relative z-10 rounded-full border border-yellow-400/15 bg-slate-950/60 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.42)]">
                        <img
                          src="/brand/logo.png"
                          alt="TGPI Seal"
                          className="w-32 md:w-40"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                        {activeGateway.eyebrow}
                      </p>

                      <h2 className="mt-3 text-3xl font-bold leading-tight text-white">
                        {activeGateway.title}
                      </h2>

                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        {activeGateway.description}
                      </p>

                      <div className="mt-6 space-y-3">
                        {activeGateway.points.map((point) => (
                          <div
                            key={point}
                            className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-200"
                          >
                            {point}
                          </div>
                        ))}
                      </div>

                      <Link
                        href={activeGateway.ctaHref}
                        className="mt-7 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black shadow-[0_12px_40px_rgba(234,179,8,0.18)] transition hover:bg-yellow-400"
                      >
                        {activeGateway.ctaLabel}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {[
                      {
                        title: "Global Intelligence",
                        text: "Understand places beyond surface-level content.",
                      },
                      {
                        title: "Structured Preparation",
                        text: "Move from interest to readiness with direction.",
                      },
                      {
                        title: "Premium Positioning",
                        text: "Build a stronger international path over time.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
                      >
                        <p className="text-sm font-semibold text-yellow-400">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              {
                title: "Countries",
                text: "Discover country pathways and global direction.",
                href: "/countries",
              },
              {
                title: "Courses",
                text: "Build readiness through structured learning.",
                href: "/courses",
              },
              {
                title: "Cost of Life",
                text: "See reference prices and daily local reality.",
                href: "/countries",
              },
              {
                title: "Dashboard",
                text: "Return to your saved TGPI progression.",
                href: "/dashboard",
              },
              {
                title: "Premium",
                text: "Unlock the strongest experience in USD.",
                href: "/upgrade",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-slate-800 bg-slate-900/75 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-yellow-500/40 hover:bg-slate-900"
              >
                <p className="text-lg font-semibold text-yellow-400 transition group-hover:text-yellow-300">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                Why TGPI Feels Different
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-bold leading-tight">
                This is not just a homepage. It is the first threshold into a
                global preparation system.
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-slate-600">
              TGPI combines premium visual identity, practical global context,
              and future-ready platform logic to create a stronger sense of
              ambition from the first screen.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                number: "01",
                title: "Explore",
                text: "Discover countries with better clarity, depth, and relevance.",
              },
              {
                number: "02",
                title: "Understand",
                text: "See cost, value, culture, and international lifestyle signals.",
              },
              {
                number: "03",
                title: "Prepare",
                text: "Move toward learning, confidence, and structured readiness.",
              },
              {
                number: "04",
                title: "Evolve",
                text: "Return with memory, saved goals, and stronger long-term progression.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)]"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Step {item.number}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!loading && memory ? (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Personalized Layer
                </p>
                <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                  Continue Your Journey
                </h2>
                <p className="mt-2 max-w-2xl text-slate-300">
                  Your homepage remembers progress and brings you back into the
                  TGPI experience with more continuity and value.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="inline-flex rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-5 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
              >
                Open Dashboard
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.24)]">
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  Last Country
                </h3>

                {lastVisitedCountry ? (
                  <>
                    <p className="text-lg text-slate-200">
                      {lastVisitedCountry.emoji} {lastVisitedCountry.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Return to your latest pathway and continue building your
                      international direction.
                    </p>
                    <Link
                      href={`/countries/${lastVisitedCountry.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-yellow-300"
                    >
                      Continue →
                    </Link>
                  </>
                ) : (
                  <p className="text-slate-400">No recent country yet.</p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.24)]">
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  Favorites
                </h3>

                {favoriteCountries.length ? (
                  <div className="space-y-3">
                    {favoriteCountries.slice(0, 3).map((country) => (
                      <div
                        key={country.slug}
                        className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                      >
                        <p className="text-slate-200">
                          {country.emoji} {country.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">No favorites saved yet.</p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.24)]">
                <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                  Your Plan
                </h3>
                <p className="text-lg text-slate-200">
                  {memory.plan === "premium" ? "Premium Access" : "Free Access"}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Preferred currency: {memory.preferredCurrency || "USD"}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Your access layer shapes how deeply you can personalize and
                  expand your TGPI experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Featured Pathways
              </p>
              <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                Start with stronger global entry points
              </h2>
              <p className="mt-2 max-w-2xl text-slate-300">
                Early TGPI country experiences built to combine practical
                context, culture, and real international relevance.
              </p>
            </div>

            <Link
              href="/countries"
              className="inline-flex rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-5 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
            >
              View All Countries
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredCountries.map((country, index) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className={`group overflow-hidden rounded-[2rem] border bg-slate-900 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 ${
                  index === 1
                    ? "border-yellow-500/40"
                    : "border-slate-800 hover:border-yellow-500/30"
                }`}
              >
                <div className="h-2 bg-gradient-to-r from-yellow-500/90 via-yellow-300/60 to-transparent" />

                <div className="p-7">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
                    TGPI Pathway
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-yellow-400 transition group-hover:text-yellow-300">
                    {country.emoji} {country.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {country.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {country.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 text-sm text-slate-400">
                    {country.language} • {country.currencyCode}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-yellow-300">
                    Explore pathway →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Free Access
              </p>
              <h2 className="mt-3 text-3xl font-bold text-yellow-400">Free</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Enter the TGPI ecosystem with essential country access and
                foundational global tools.
              </p>

              <ul className="mt-6 space-y-3 text-slate-300">
                <li>Explore countries</li>
                <li>View core country data</li>
                <li>Basic currency exploration</li>
                <li>Up to 3 favorites</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Premium Access
              </p>
              <h2 className="mt-3 text-3xl font-bold text-yellow-400">
                Premium
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Unlock the advanced TGPI layer with deeper personalization,
                stronger access, and a more elite long-term experience.
              </p>

              <ul className="mt-6 space-y-3 text-slate-300">
                <li>Unlimited favorites</li>
                <li>Deeper personalization</li>
                <li>Advanced country comparison</li>
                <li>Expanded premium pathways</li>
              </ul>

              <Link
                href="/upgrade"
                className="mt-7 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black shadow-[0_12px_40px_rgba(234,179,8,0.18)] transition hover:bg-yellow-400"
              >
                Unlock Premium
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}