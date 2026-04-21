"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* HERO */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-yellow-400">
            Leaving your country is broken.
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            TGPI is the first platform that helps you build your global identity,
            prepare intelligently, and connect with people going to the same destination.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/onboarding" className="bg-yellow-500 px-6 py-3 rounded text-black font-bold">
              Start Your Global Journey
            </Link>

            <Link href="/ranking" className="border border-yellow-500 px-6 py-3 rounded">
              View Global Ranking
            </Link>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-yellow-400">
            People are already moving
          </h2>

          <p className="text-slate-400 mt-2">
            Join a growing network preparing to live abroad.
          </p>
        </section>

        {/* VALUE */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-yellow-400 font-bold">Global Identity</h3>
            <p className="text-sm text-slate-400 mt-2">
              Build your international profile and prove your readiness.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-yellow-400 font-bold">Smart Preparation</h3>
            <p className="text-sm text-slate-400 mt-2">
              Know exactly what to do to move to another country.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-yellow-400 font-bold">Global Network</h3>
            <p className="text-sm text-slate-400 mt-2">
              Connect with people going to the same destination.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-yellow-400">
            This is your global transition system.
          </h2>

          <Link href="/onboarding" className="mt-6 inline-block bg-yellow-500 px-8 py-4 rounded text-black font-bold">
            Join TGPI Now
          </Link>
        </section>

      </div>
    </main>
  );
}