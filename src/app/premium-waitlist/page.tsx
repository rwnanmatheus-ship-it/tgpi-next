import type { Metadata } from "next";
import Link from "next/link";
import PremiumWaitlistForm from "@/components/PremiumWaitlistForm";
import TGPIPageShell from "@/components/TGPIPageShell";

export const metadata: Metadata = {
  title: "TGPI Premium Early Access",
  description:
    "Join the TGPI Premium waitlist for launch priority and early access to the global decision system.",
};

export default function PremiumWaitlistPage() {
  return (
    <TGPIPageShell>
      <section className="mx-auto grid max-w-6xl gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Link
            href="/pricing"
            className="text-sm font-bold text-[#0B1F3A] transition hover:text-[#B58A2A]"
          >
            ← Back to pricing
          </Link>

          <p className="mt-10 text-xs font-black uppercase tracking-[0.3em] text-[#B58A2A]">
            TGPI Premium Early Access
          </p>
          <h1 className="mt-5 font-serif text-5xl font-semibold tracking-[-0.04em] text-[#0B0B0B] md:text-6xl">
            Help shape the first TGPI membership.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#566070]">
            Register your interest while payments remain disabled. Your answers help
            TGPI validate demand, pricing and the tools that should be prioritized for
            the first subscribers.
          </p>

          <div className="mt-8 rounded-[28px] border border-[#D8D2C4] bg-[#0B1F3A] p-7 text-white">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F0D58C]">
              Planned launch membership
            </p>
            <p className="mt-4 text-4xl font-black text-[#F0D58C]">
              US$ 9.99
              <span className="ml-2 text-sm font-semibold text-[#C8D0DC]">/month</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[#E7EDF5]">
              <li>✓ Complete Country Fit and Global Readiness</li>
              <li>✓ Unlimited comparisons and saved countries</li>
              <li>✓ International plan, goals and checklists</li>
              <li>✓ Premium courses, certificates and updates</li>
            </ul>
          </div>
        </div>

        <PremiumWaitlistForm />
      </section>
    </TGPIPageShell>
  );
}
