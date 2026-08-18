import type { Metadata } from "next";
import Link from "next/link";
import HomeCountryCardsV2 from "@/components/home/HomeCountryCardsV2";
import HomeHeroV3 from "@/components/home/HomeHeroV3";
import HomeInstagramContinuity from "@/components/home/HomeInstagramContinuity";
import HomeLaunchClose from "@/components/home/HomeLaunchClose";
import HomeLearningPortal from "@/components/home/HomeLearningPortal";
import HomePortal from "@/components/home/HomePortal";

export const metadata: Metadata = {
  title: "TGPI — Explore the World. Build the Skills to Move Through It",
  description:
    "Explore 195 country profiles, compare destinations, develop practical skills and organize your next international move with TGPI.",
  alternates: { canonical: "https://theglobalpolymath.com" },
};

const responsibleUse = [
  [
    "01",
    "Compare consistently",
    "Review destinations through the same dimensions instead of isolated impressions.",
  ],
  [
    "02",
    "Treat scores as directional",
    "Use TGPI signals to frame questions and comparisons, not as absolute answers.",
  ],
  [
    "03",
    "Verify changing details",
    "Confirm costs, visas, taxes and local rules with current official sources.",
  ],
  [
    "04",
    "Move toward action",
    "Connect what you learn to a shortlist, readiness gaps and a practical next step.",
  ],
] as const;

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <HomeHeroV3 />
      <HomePortal />
      <HomeCountryCardsV2 />
      <HomeLearningPortal />
      <HomeInstagramContinuity />

      <section className="border-y border-[var(--tgpi-border)] bg-[#f1eadc] px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="responsible-decisions-title">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">Responsible by design</p>
              <h2 id="responsible-decisions-title" className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[0.95] text-[var(--tgpi-ink)]">
                Use TGPI to frame the decision. Verify the details.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--tgpi-muted)]">
                TGPI is an educational decision platform. It does not replace legal, tax, financial or immigration advice.
              </p>
              <Link href="/why" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[var(--tgpi-border)] bg-white px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                Understand the TGPI approach
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {responsibleUse.map(([number, title, description]) => (
                <div key={number} className="rounded-[22px] border border-[var(--tgpi-border)] bg-white p-5">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">Principle {number}</p>
                  <h3 className="mt-3 font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--tgpi-muted)]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeLaunchClose />
    </main>
  );
}
