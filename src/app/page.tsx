import type { Metadata } from "next";
import Link from "next/link";
import HomeHeroV3 from "@/components/home/HomeHeroV3";
import HomeCountryCardsV2 from "@/components/home/HomeCountryCardsV2";
import HomeInstagramContinuity from "@/components/home/HomeInstagramContinuity";
import HomeLaunchClose from "@/components/home/HomeLaunchClose";
import HomeDecisionOS from "@/components/HomeDecisionOS";

export const metadata: Metadata = {
  title: "TGPI — Compare the World Before You Choose",
  description:
    "Compare 195 countries and build a practical international strategy through TGPI country intelligence, readiness and decision tools.",
  alternates: { canonical: "https://theglobalpolymath.com" },
};

const framework = [
  ["Cost", "Budget, housing and purchasing power", "/countries"],
  ["Career", "Income, opportunity and professional fit", "/countries"],
  ["Education", "Institutions, access and learning leverage", "/courses"],
  ["Culture", "Language, lifestyle and adaptation", "/countries"],
  ["Mobility", "Entry pathways, documents and movement", "/passport"],
] as const;

const methodology = [
  ["01", "Consistent framework", "Every country is evaluated through the same strategic lens."],
  ["02", "Source-aware intelligence", "Country information is designed to be checked against official sources."],
  ["03", "Responsible guidance", "TGPI informs without replacing legal, tax or immigration advice."],
  ["04", "Action-oriented product", "Comparisons and readiness tools move users toward a practical next step."],
] as const;

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <HomeHeroV3 />

      <section className="border-y border-[var(--tgpi-border)] bg-[#f1eadc] px-4 py-5 sm:px-6 lg:px-8" aria-label="TGPI trust signals">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-3 sm:grid-cols-4">
          {["195 countries", "100+ signals", "5 dimensions", "Source-aware"].map((item) => (
            <div key={item} className="rounded-2xl border border-[var(--tgpi-border)] bg-white/70 px-4 py-4 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-navy)] backdrop-blur">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">The TGPI decision framework</p>
            <h2 className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95]">A country is not a dream. It is a system of trade-offs.</h2>
            <p className="mt-5 text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">Evaluate every destination through one consistent strategic lens.</p>
          </div>
          <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
            {framework.map(([title, description, href], index) => (
              <Link key={title} href={href} className="min-w-[78vw] snap-center rounded-[24px] border border-[var(--tgpi-border)] bg-white p-6 shadow-[var(--tgpi-shadow-soft)] transition hover:-translate-y-1 hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] sm:min-w-[48vw] lg:min-w-0">
                <span className="text-xs font-extrabold text-[var(--tgpi-gold-strong)]">0{index + 1}</span>
                <h3 className="mt-5 font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--tgpi-muted)]">{description}</p>
                <span className="mt-5 inline-flex text-sm font-extrabold text-[var(--tgpi-navy)]">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomeDecisionOS />
      <HomeCountryCardsV2 />
      <HomeInstagramContinuity />

      <section className="border-y border-[var(--tgpi-border)] bg-[#f1eadc] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">Built on evidence</p>
              <h2 className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.5rem)] font-semibold leading-[0.95]">Clarity requires a method users can trust.</h2>
              <Link href="/authority" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[var(--tgpi-border)] bg-white px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">View TGPI methodology</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {methodology.map(([number, title, description]) => (
                <div key={number} className="rounded-[22px] border border-[var(--tgpi-border)] bg-white p-5">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">Evidence {number}</p>
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
