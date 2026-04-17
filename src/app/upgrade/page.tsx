"use client";

import { useState } from "react";
import Link from "next/link";
import { activatePremium } from "@/lib/subscription";

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleUpgrade() {
    try {
      setLoading(true);
      setStatus("Processing upgrade...");

      await activatePremium();

      setStatus("Premium activated successfully!");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);
    } catch (error: any) {
      setStatus(error?.message || "Upgrade failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <section className="mb-14 text-center">
          <div className="mb-4 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
            Premium Upgrade
          </div>

          <h1 className="text-4xl font-bold md:text-5xl">
            Unlock Premium Global Access
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-400">
            Upgrade your experience and unlock the premium version of TGPI with
            more countries, deeper personalization, stronger progression, and
            future AI-powered global readiness tools.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Free Plan</h2>
              <p className="mt-2 text-slate-400">
                A strong starting point for exploring the platform.
              </p>
            </div>

            <div className="mb-8">
              <p className="text-4xl font-bold text-white">$0</p>
              <p className="mt-2 text-sm text-slate-400">Forever free</p>
            </div>

            <ul className="space-y-4 text-slate-300">
              <li>✔ Access to core platform pages</li>
              <li>✔ Save up to 3 favorite countries</li>
              <li>✔ Basic XP progression</li>
              <li>✔ Profile and dashboard access</li>
              <li>✔ Country pathway exploration</li>
            </ul>

            <div className="mt-10">
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Continue with Free
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">
            <div className="absolute right-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
              BEST VALUE
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">
                Premium Global Access
              </h2>
              <p className="mt-2 text-slate-300">
                Designed for users serious about global growth and platform
                depth.
              </p>
            </div>

            <div className="mb-8">
              <p className="text-4xl font-bold text-yellow-400">$9.90</p>
              <p className="mt-2 text-sm text-slate-400">per month</p>
            </div>

            <ul className="space-y-4 text-slate-300">
              <li>✔ Unlimited favorite countries</li>
              <li>✔ Premium dashboard evolution</li>
              <li>✔ Advanced country expansion access</li>
              <li>✔ Future AI-based recommendations</li>
              <li>✔ Priority premium features</li>
              <li>✔ Stronger long-term personalization</li>
            </ul>

            <div className="mt-10">
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-60"
              >
                {loading ? "Processing..." : "Upgrade Now"}
              </button>

              {status ? (
                <p className="mt-4 text-sm text-yellow-300">{status}</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="mb-4 text-2xl font-bold text-white">
            Why Upgrade?
          </h3>

          <p className="max-w-4xl leading-8 text-slate-300">
            TGPI is more than a learning platform. It is a global preparation
            system designed to help people prepare for life, work, study, and
            integration across countries. Premium gives users deeper access,
            greater personalization, and the strongest future experience.
          </p>
        </section>

        <div className="mt-10 text-center">
          <Link
            href="/dashboard"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}