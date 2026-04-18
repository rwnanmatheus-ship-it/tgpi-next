"use client";

import Link from "next/link";

export default function UpgradePage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <section className="mb-14 text-center">
          <h1 className="text-5xl font-bold">
            Unlock Your Global Potential
          </h1>

          <p className="mt-4 text-lg text-slate-300">
            Go beyond limits. Access deeper insights, unlimited features,
            and premium global preparation tools.
          </p>
        </section>

        {/* PLAN CARDS */}
        <section className="grid gap-8 md:grid-cols-2">

          {/* FREE */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-bold text-white">Free</h2>

            <p className="mt-2 text-slate-400">
              Basic access to explore the platform
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>✔ Limited country access</li>
              <li>✔ Basic cultural insights</li>
              <li>✔ Up to 3 favorite countries</li>
              <li>✔ Standard dashboard</li>
              <li className="text-white/30">✖ Premium strategies</li>
              <li className="text-white/30">✖ Advanced country insights</li>
              <li className="text-white/30">✖ Unlimited features</li>
            </ul>

            <button className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-white">
              Current Plan
            </button>
          </div>

          {/* PREMIUM */}
          <div className="relative rounded-3xl border border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">

            <div className="absolute -top-3 right-6 rounded-full bg-yellow-500 px-4 py-1 text-xs font-semibold text-black">
              RECOMMENDED
            </div>

            <h2 className="text-2xl font-bold text-yellow-400">
              Premium
            </h2>

            <p className="mt-2 text-slate-300">
              Full access to the global platform
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li>✔ Unlimited country access</li>
              <li>✔ Full cultural + strategic insights</li>
              <li>✔ Unlimited favorite countries</li>
              <li>✔ Advanced dashboard & progression</li>
              <li>✔ Real-world relocation strategies</li>
              <li>✔ Visa, job & entry pathways</li>
              <li>✔ Future premium tools & AI features</li>
            </ul>

            <Link
              href="/upgrade-success"
              className="mt-8 block w-full rounded-xl bg-yellow-500 px-6 py-3 text-center font-semibold text-black hover:bg-yellow-400"
            >
              Upgrade Now
            </Link>

          </div>

        </section>

        {/* VALUE SECTION */}
        <section className="mt-16 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-white/5 p-10 text-center">
          <h2 className="text-3xl font-bold">
            This is not just a platform
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-slate-300">
            TGPI is designed to evolve into a global ecosystem for learning,
            cultural integration, and international positioning. Premium members
            gain early access to advanced features and future tools.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="mt-14 text-center">
          <h3 className="text-2xl font-semibold">
            Start building your global life today
          </h3>

          <Link
            href="/upgrade-success"
            className="mt-6 inline-block rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-black hover:bg-yellow-400"
          >
            Upgrade to Premium
          </Link>
        </section>

      </div>
    </main>
  );
}