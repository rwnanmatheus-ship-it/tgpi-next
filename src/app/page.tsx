"use client";

import Link from "next/link";
import SocialProof from "@/components/SocialProof";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-24">
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold leading-tight text-yellow-400">
            Leaving your country is confusing.
            <br />
            TGPI makes it clear.
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Build your global identity, understand exactly what you need, and
            connect with people going to the same destination.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/onboarding"
              className="rounded bg-yellow-500 px-8 py-4 text-lg font-bold text-black"
            >
              Start Your Global Journey
            </Link>

            <Link
              href="/why"
              className="rounded border border-yellow-500 px-8 py-4 text-lg"
            >
              Why TGPI
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-bold text-yellow-400">
            The problem is not leaving.
          </h2>

          <p className="text-slate-400">
            The problem is not knowing where to start, what to do, and who to
            trust.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-lg font-bold text-yellow-400">
              Global Identity
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Show your readiness and build credibility for moving abroad.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-lg font-bold text-yellow-400">
              Smart Roadmap
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Know exactly what steps you need to take for each country.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-lg font-bold text-yellow-400">
              Real Connections
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Meet people going to the same destination as you.
            </p>
          </div>
        </section>

        <SocialProof />

        <section className="space-y-3 text-center">
          <h2 className="text-2xl font-bold text-yellow-400">
            People are already preparing to move
          </h2>

          <p className="text-slate-400">
            Join a growing global network.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-slate-300">
            <span>🇨🇦 Canada</span>
            <span>🇵🇹 Portugal</span>
            <span>🇺🇸 USA</span>
            <span>🇩🇪 Germany</span>
          </div>
        </section>

        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-bold text-yellow-400">
            This is your global transition system.
          </h2>

          <Link
            href="/onboarding"
            className="inline-block rounded bg-yellow-500 px-10 py-5 text-xl font-bold text-black"
          >
            Join TGPI Now
          </Link>
        </section>
      </div>
    </main>
  );
}