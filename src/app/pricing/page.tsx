import type { Metadata } from "next";
import Link from "next/link";
import PremiumActionButton from "@/components/PremiumActionButton";
import TGPIPageShell from "@/components/TGPIPageShell";
import { TGPI_FREE_PLAN, TGPI_PREMIUM_PLAN } from "@/lib/subscription-plans";

export const metadata: Metadata = {
  title: "TGPI Pricing — Free and Premium",
  description:
    "Compare TGPI Free and TGPI Premium for country intelligence, global readiness, learning and international planning.",
};

export default function PricingPage() {
  const billingEnabled = process.env.BILLING_ENABLED === "true";

  return (
    <TGPIPageShell>
      <section className="mx-auto max-w-4xl py-10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#B58A2A]">
          TGPI Membership
        </p>
        <h1 className="mt-5 font-serif text-5xl font-semibold tracking-[-0.04em] text-[#0B0B0B] md:text-7xl">
          Build your global life with a clearer system.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#566070]">
          Start free. Upgrade when you need complete comparisons, readiness analysis,
          planning tools and premium intelligence.
        </p>
      </section>

      {!billingEnabled && (
        <section className="mx-auto mb-8 max-w-4xl rounded-3xl border border-[#D8D2C4] bg-[#FFF7DE] px-6 py-5 text-center">
          <p className="text-sm font-bold text-[#6E4706]">
            TGPI Premium is preparing for its first members. Join the early-access
            list to receive launch priority.
          </p>
        </section>
      )}

      <section className="mx-auto grid max-w-5xl gap-6 pb-14 lg:grid-cols-2">
        <article className="rounded-[32px] border border-[#D8D2C4] bg-white p-7 shadow-[0_24px_70px_rgba(11,31,58,0.08)] md:p-9">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#667085]">
            Start with clarity
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-[#0B0B0B]">
            {TGPI_FREE_PLAN.name}
          </h2>
          <p className="mt-4 text-5xl font-black text-[#0B1F3A]">
            {TGPI_FREE_PLAN.price}
          </p>
          <p className="mt-4 min-h-14 leading-7 text-[#566070]">
            {TGPI_FREE_PLAN.description}
          </p>

          <ul className="mt-8 space-y-4 text-sm leading-6 text-[#303846]">
            {TGPI_FREE_PLAN.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="font-black text-[#B58A2A]">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/login"
            className="mt-9 block w-full rounded-2xl border border-[#0B1F3A] bg-white px-6 py-4 text-center text-sm font-black text-[#0B1F3A] transition hover:bg-[#F3F6FA]"
          >
            Create Free Account
          </Link>
        </article>

        <article className="relative overflow-hidden rounded-[32px] border border-[#B58A2A] bg-[#0B1F3A] p-7 text-white shadow-[0_30px_90px_rgba(11,31,58,0.2)] md:p-9">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#B58A2A]/20 blur-3xl" />
          <div className="relative">
            <p className="w-fit rounded-full border border-[#D7B45D]/60 bg-[#B58A2A]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#F0D58C]">
              Complete decision system
            </p>
            <h2 className="mt-5 font-serif text-4xl font-semibold">
              {TGPI_PREMIUM_PLAN.name}
            </h2>
            <p className="mt-4 text-5xl font-black text-[#F0D58C]">
              {TGPI_PREMIUM_PLAN.price}
              <span className="ml-2 text-base font-semibold text-[#C8D0DC]">
                {TGPI_PREMIUM_PLAN.cadence}
              </span>
            </p>
            <p className="mt-4 min-h-14 leading-7 text-[#D7DFEA]">
              {TGPI_PREMIUM_PLAN.description}
            </p>

            <ul className="mt-8 space-y-4 text-sm leading-6 text-[#EDF1F6]">
              {TGPI_PREMIUM_PLAN.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="font-black text-[#F0D58C]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <PremiumActionButton billingEnabled={billingEnabled} />
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-[#B8C1CF]">
              Payments remain disabled until TGPI billing is legally and technically
              ready. No charge is created while early access is active.
            </p>
          </div>
        </article>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 pb-20 md:grid-cols-3">
        {[
          ["Cancel with control", "Subscribers will manage billing through the secure customer portal."],
          ["One clear plan", "No confusing tiers. Free for discovery and Premium for complete planning."],
          ["Built for progress", "Your profile, comparisons, readiness and learning stay connected."],
        ].map(([title, description]) => (
          <article
            key={title}
            className="rounded-3xl border border-[#D8D2C4] bg-[#FFFDF8] p-6"
          >
            <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B]">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#566070]">{description}</p>
          </article>
        ))}
      </section>
    </TGPIPageShell>
  );
}
