import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PremiumActionButton from "@/components/PremiumActionButton";
import PricingOutcomeSelector from "@/components/pricing/PricingOutcomeSelector";
import TGPIPageShell from "@/components/TGPIPageShell";
import { TGPI_FREE_PLAN, TGPI_PREMIUM_PLAN } from "@/lib/subscription-plans";

export const metadata: Metadata = {
  title: "TGPI Premium — Global Decision Intelligence",
  description:
    "Connect country intelligence, comparisons, readiness, documents and practical learning in one premium TGPI command center.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "TGPI Premium — One System for Your Global Life",
    description:
      "Turn global ambition into an executable plan with connected intelligence, readiness and learning.",
    url: "/pricing",
    images: ["/images/pricing/tgpi-premium-command-center.webp"],
  },
};

const premiumSystems = [
  {
    number: "01",
    eyebrow: "Country Intelligence",
    title: "Choose with evidence.",
    description:
      "Move beyond rankings. Build a country shortlist around your goals, priorities, costs and real-life constraints.",
    href: "/countries",
  },
  {
    number: "02",
    eyebrow: "Decision Intelligence",
    title: "Compare what matters.",
    description:
      "Evaluate countries through one consistent framework and keep the reasoning behind every important decision visible.",
    href: "/compare",
  },
  {
    number: "03",
    eyebrow: "Documents OS",
    title: "Prepare the evidence.",
    description:
      "Turn scattered requirements into a destination-aware readiness path connected to your identity and objective.",
    href: "/passport",
  },
  {
    number: "04",
    eyebrow: "TGPI Learning",
    title: "Build the capability.",
    description:
      "Develop the language, judgment and adaptability required to act with confidence in an international environment.",
    href: "/courses",
  },
] as const;

const comparisonRows = [
  ["Country exploration", "Explore global profiles", "Unlimited shortlist + deeper Country Fit"],
  ["Country comparison", "1 starting comparison", "Unlimited saved decision comparisons"],
  ["Global readiness", "Preliminary orientation", "Readiness score + prioritized next actions"],
  ["Document strategy", "Country-level research", "Connected, objective-aware preparation system"],
  ["Learning", "Introductory access", "Full learning paths, progress and credentials"],
  ["Workspace", "TGPI Global Key", "Private Premium Command Center"],
  ["Product evolution", "Core platform updates", "New premium intelligence tools as released"],
] as const;

const standards = [
  {
    title: "One clear membership",
    description:
      "No artificial tier maze. Free supports discovery; Premium connects the complete decision system.",
  },
  {
    title: "Private continuity",
    description:
      "Your Global Key keeps countries, comparisons, readiness and learning connected across the TGPI journey.",
  },
  {
    title: "Transparent billing",
    description:
      "When billing opens, price and renewal terms will be shown before checkout and managed through the secure portal.",
  },
  {
    title: "Responsible intelligence",
    description:
      "TGPI structures research and decisions without presenting itself as a government, university or legal adviser.",
  },
] as const;

const faqs = [
  {
    question: "What makes TGPI Premium different from a content subscription?",
    answer:
      "Premium is designed as a connected operating system. Country research, comparisons, readiness, documents and learning inform one another instead of living in separate tools or disconnected notes.",
  },
  {
    question: "Is payment active today?",
    answer:
      "Not while early access is active. Joining the waitlist registers your interest and launch priority; it does not create a payment or subscription.",
  },
  {
    question: "How much will TGPI Premium cost?",
    answer:
      "The official planned membership is US$ 19.99 per month. Final checkout terms will always be presented transparently before any charge is created.",
  },
  {
    question: "Can I manage or cancel the membership?",
    answer:
      "Yes. When billing is officially enabled, active subscribers will manage renewal and cancellation through the secure customer portal.",
  },
  {
    question: "Does TGPI replace legal or immigration advice?",
    answer:
      "No. TGPI organizes research, readiness and evidence. Critical requirements must still be verified with the relevant government, institution or qualified professional.",
  },
  {
    question: "Are TGPI learning credentials externally accredited?",
    answer:
      "TGPI can issue professional records of completed learning and verified evidence. External accreditation is only claimed when a formal accrediting partnership exists.",
  },
] as const;

export default function PricingPage() {
  const billingEnabled = process.env.BILLING_ENABLED === "true";

  return (
    <TGPIPageShell>
      <section className="relative isolate min-h-[620px] overflow-hidden rounded-[30px] border border-white/10 bg-[#06162A] text-white shadow-[0_32px_90px_rgba(5,22,42,0.24)] sm:min-h-[580px] sm:rounded-[36px] lg:h-[540px] lg:min-h-0">
        <Image
          src="/images/pricing/tgpi-premium-command-center.webp"
          alt="TGPI global decision command center connecting country intelligence, readiness, documents and learning"
          fill
          priority
          quality={88}
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="object-cover object-[70%_center] sm:object-[68%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,15,30,0.9)_0%,rgba(3,15,30,0.77)_54%,rgba(3,15,30,0.93)_100%)] lg:bg-[linear-gradient(90deg,rgba(3,15,30,0.98)_0%,rgba(3,15,30,0.91)_44%,rgba(3,15,30,0.38)_72%,rgba(3,15,30,0.12)_100%)]" />

        <div className="relative z-10 flex min-h-[620px] flex-col justify-between p-7 sm:min-h-[580px] sm:p-10 lg:h-full lg:min-h-0 lg:p-12">
          <div className="max-w-[690px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#D7B45D]/35 bg-[#D7B45D]/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">
                TGPI Premium
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/65">
                One Global Decision System
              </span>
            </div>

            <h1 className="mt-5 max-w-[680px] font-[var(--tgpi-font-display)] text-[clamp(2.65rem,4.5vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-white">
              Turn global ambition into an executable system.
            </h1>
            <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-white/72 sm:text-base sm:leading-8">
              Connect countries, comparisons, readiness, documents and practical
              learning in one private command center built for decisions with real
              consequences.
            </p>

            <div className="mt-7 flex max-w-[660px] flex-col gap-3 sm:flex-row sm:items-center">
              <div className="w-full sm:max-w-[300px] [&_a]:min-h-14 [&_a]:content-center [&_a]:rounded-xl [&_button]:min-h-14 [&_button]:rounded-xl">
                <PremiumActionButton billingEnabled={billingEnabled} />
              </div>
              <Link
                href="#premium-system"
                className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-extrabold text-white transition hover:border-[#D7B45D]/60 hover:bg-white/10"
              >
                Explore what Premium unlocks
              </Link>
            </div>

            <p className="mt-4 text-xs leading-5 text-white/50">
              {billingEnabled
                ? "Secure recurring billing. Manage or cancel through the customer portal."
                : "Founding access · US$ 19.99/month at launch · No payment collected today"}
            </p>
          </div>

          <div className="mt-8 flex items-end justify-between gap-5">
            <dl className="grid flex-1 grid-cols-3 gap-4 border-t border-white/12 pt-5 sm:max-w-[570px]">
              {[
                ["195", "Country profiles"],
                ["04", "Connected systems"],
                ["01", "Global Key"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-xl font-extrabold text-[#F0D58C] sm:text-2xl">
                    {value}
                  </dt>
                  <dd className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.17em] text-white/45 sm:text-[10px]">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="hidden max-w-[265px] rounded-2xl border border-white/15 bg-[#07172B]/75 px-5 py-4 text-right backdrop-blur-xl xl:block">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">
                The Premium advantage
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-white/80">
                One decision system. Every global next step connected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-7 overflow-hidden rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_20px_60px_rgba(11,31,58,0.07)]">
        <div className="grid gap-px bg-[#D8D2C4] sm:grid-cols-3">
          {(billingEnabled
            ? [
                ["Membership", "US$ 19.99 per month"],
                ["Billing", "Secure recurring checkout"],
                ["Control", "Manage or cancel online"],
              ]
            : [
                ["Founding membership", "Launch priority for early members"],
                ["Published price", "US$ 19.99 per month"],
                ["No payment today", "Joining only reserves early access"],
              ]
          ).map(([label, value]) => (
            <div key={label} className="bg-[#FFFDF8] px-6 py-5 text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#956A13]">{label}</p>
              <p className="mt-2 text-sm font-bold text-[#0B1F3A]">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <PricingOutcomeSelector />

      <section id="premium-system" className="scroll-mt-28 py-16 sm:py-20">
        <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#956A13]">
              More than access
            </p>
            <h2 className="mt-4 max-w-[650px] font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[#071A31] sm:text-6xl">
              Premium is where TGPI becomes one operating system.
            </h2>
          </div>
          <p className="max-w-[680px] text-base leading-8 text-[#596576] lg:justify-self-end">
            Information becomes valuable when it changes the next decision. Premium
            connects the four TGPI intelligence layers so every action builds on the
            evidence, progress and priorities already inside your Global Key.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {premiumSystems.map((system) => (
            <article
              key={system.number}
              className="group rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#B58A2A]/60 hover:shadow-[0_20px_55px_rgba(11,31,58,0.09)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#956A13]">
                    {system.eyebrow}
                  </p>
                  <h3 className="mt-3 font-[var(--tgpi-font-display)] text-3xl font-semibold text-[#071A31] sm:text-4xl">
                    {system.title}
                  </h3>
                </div>
                <span className="font-[var(--tgpi-font-display)] text-4xl font-semibold text-[#D8C28A]">
                  {system.number}
                </span>
              </div>
              <p className="mt-5 max-w-[560px] text-sm leading-7 text-[#596576]">
                {system.description}
              </p>
              <Link
                href={system.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0B1F3A] transition group-hover:text-[#956A13]"
              >
                Explore this TGPI layer <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="membership" className="scroll-mt-28 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#956A13]">
            Choose your operating level
          </p>
          <h2 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-[#071A31] sm:text-6xl">
            Start free. Upgrade when the decision becomes real.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#596576]">
            Free helps you discover TGPI. Premium connects the intelligence,
            preparation and capability required to move forward with confidence.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <article className="rounded-[30px] border border-[#D8D2C4] bg-[#FFFDF8] p-7 shadow-[0_18px_50px_rgba(11,31,58,0.06)] sm:p-9">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#687486]">
              Explore the system
            </p>
            <h3 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold text-[#071A31]">
              {TGPI_FREE_PLAN.name}
            </h3>
            <div className="mt-5 flex items-end gap-2">
              <p className="text-5xl font-extrabold tracking-[-0.04em] text-[#071A31]">
                {TGPI_FREE_PLAN.price}
              </p>
              <span className="pb-1 text-sm font-semibold text-[#687486]">forever</span>
            </div>
            <p className="mt-5 min-h-14 text-sm leading-7 text-[#596576]">
              {TGPI_FREE_PLAN.description}
            </p>

            <ul className="mt-7 space-y-3 text-sm leading-6 text-[#303846]">
              {TGPI_FREE_PLAN.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="font-extrabold text-[#956A13]" aria-hidden="true">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/sign-up"
              className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-[#0B1F3A] bg-white px-6 text-sm font-extrabold text-[#0B1F3A] transition hover:bg-[#F3F6FA]"
            >
              Create my free Global Key
            </Link>
            <p className="mt-4 text-center text-xs leading-5 text-[#778293]">
              No credit card required.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-[30px] border border-[#B58A2A] bg-[#071A31] p-7 text-white shadow-[0_28px_85px_rgba(7,26,49,0.22)] sm:p-9">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#D7B45D]/10 blur-3xl" />
            <div className="relative">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">
                    Complete global decision system
                  </p>
                  <h3 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold">
                    {TGPI_PREMIUM_PLAN.name}
                  </h3>
                </div>
                <span className="rounded-full border border-[#D7B45D]/35 bg-[#D7B45D]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F0D58C]">
                  Recommended
                </span>
              </div>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-5xl font-extrabold tracking-[-0.04em] text-[#F0D58C] sm:text-6xl">
                  {TGPI_PREMIUM_PLAN.price}
                </p>
                <span className="pb-2 text-sm font-semibold text-white/55">
                  {TGPI_PREMIUM_PLAN.cadence}
                </span>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68">
                {TGPI_PREMIUM_PLAN.description}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {TGPI_PREMIUM_PLAN.features.map((feature) => (
                  <div key={feature} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white/85">
                    <span className="font-extrabold text-[#F0D58C]" aria-hidden="true">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 [&_a]:min-h-14 [&_a]:content-center [&_a]:rounded-xl [&_button]:min-h-14 [&_button]:rounded-xl">
                <PremiumActionButton billingEnabled={billingEnabled} />
              </div>
              <p className="mt-4 text-center text-xs leading-5 text-white/48">
                {billingEnabled
                  ? "Secure recurring billing. Manage or cancel through the customer portal."
                  : "Join the founding list today. No payment or subscription is created."}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_20px_60px_rgba(11,31,58,0.07)]">
          <div className="border-b border-[#D8D2C4] px-6 py-8 sm:px-9">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
              Clear comparison
            </p>
            <h2 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold text-[#071A31]">
              See exactly what changes with Premium.
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D8D2C4] bg-[#F4EFE4]">
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#687486] sm:px-9">Capability</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#687486]">Free</th>
                  <th className="bg-[#071A31] px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F0D58C] sm:px-9">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([capability, free, premium]) => (
                  <tr key={capability} className="border-b border-[#E5DED1] last:border-b-0">
                    <th scope="row" className="px-6 py-5 text-sm font-extrabold text-[#071A31] sm:px-9">{capability}</th>
                    <td className="px-6 py-5 text-sm leading-6 text-[#687486]">{free}</td>
                    <td className="bg-[#071A31] px-6 py-5 text-sm font-semibold leading-6 text-white/82 sm:px-9">
                      <span className="mr-2 text-[#F0D58C]" aria-hidden="true">✓</span>
                      {premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((standard) => (
            <article key={standard.title} className="rounded-[24px] border border-[#D8D2C4] bg-[#FFFDF8] p-6">
              <div className="h-px w-10 bg-[#B58A2A]" />
              <h3 className="mt-5 font-[var(--tgpi-font-display)] text-2xl font-semibold text-[#071A31]">
                {standard.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#596576]">
                {standard.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">
              Membership questions
            </p>
            <h2 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-[#071A31] sm:text-5xl">
              Clarity before commitment.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#596576]">
              TGPI should earn trust before asking for a subscription. These are the
              boundaries, controls and expectations behind Premium.
            </p>
          </div>

          <div className="divide-y divide-[#D8D2C4] border-y border-[#D8D2C4]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-extrabold text-[#071A31] marker:hidden sm:text-base">
                  {faq.question}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#D8D2C4] text-[#956A13] transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pr-12 pt-4 text-sm leading-7 text-[#596576]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mb-10 overflow-hidden rounded-[30px] bg-[#06162A] px-7 py-12 text-white shadow-[0_28px_80px_rgba(5,22,42,0.2)] sm:px-10 sm:py-14 lg:px-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#B58A2A]/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#F0D58C]">
              Your next chapter needs a system
            </p>
            <h2 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-6xl">
              Build a global life with every decision connected.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
              Begin with a free Global Key or join the founding Premium list for
              launch priority. TGPI will never create a charge without presenting
              the terms first.
            </p>
          </div>

          <div className="w-full lg:w-[300px] [&_a]:min-h-14 [&_a]:content-center [&_a]:rounded-xl [&_button]:min-h-14 [&_button]:rounded-xl">
            <PremiumActionButton billingEnabled={billingEnabled} />
            <Link href="/sign-up" className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/18 px-5 text-sm font-extrabold text-white transition hover:bg-white/5">
              Start free instead
            </Link>
          </div>
        </div>
      </section>
    </TGPIPageShell>
  );
}
