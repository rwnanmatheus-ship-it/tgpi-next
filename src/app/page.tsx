"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* HERO */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-yellow-400 leading-tight">
            Leaving your country is confusing.
            <br />
            TGPI makes it clear.
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Build your global identity, understand exactly what you need,
            and connect with people going to the same destination.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/onboarding"
              className="bg-yellow-500 px-8 py-4 rounded text-black font-bold text-lg"
            >
              Start Your Journey
            </Link>

            <Link
              href="/why"
              className="border border-yellow-500 px-8 py-4 rounded text-lg"
            >
              Why TGPI
            </Link>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-400">
            The problem is not leaving.
          </h2>

          <p className="text-slate-400">
            The problem is not knowing where to start, what to do,
            and who to trust.
          </p>
        </section>

        {/* SOLUTION */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-yellow-400 font-bold text-lg">
              Global Identity
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Show your readiness and build credibility for moving abroad.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-yellow-400 font-bold text-lg">
              Smart Roadmap
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Know exactly what steps you need to take for each country.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-yellow-400 font-bold text-lg">
              Real Connections
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Meet people going to the same destination as you.
            </p>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-yellow-400">
            People are already preparing to move
          </h2>

          <p className="text-slate-400">
            Join a growing global network.
          </p>

          <div className="flex justify-center gap-6 text-sm text-slate-300 mt-4 flex-wrap">
            <span>🇨🇦 Canada</span>
            <span>🇵🇹 Portugal</span>
            <span>🇺🇸 USA</span>
            <span>🇩🇪 Germany</span>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-yellow-400">
            This is your global transition system.
          </h2>

          <Link
            href="/onboarding"
            className="inline-block bg-yellow-500 px-10 py-5 rounded text-black font-bold text-xl"
          >
            Join TGPI Now
          </Link>
        </section>

      </div>
    </main>
  );
}