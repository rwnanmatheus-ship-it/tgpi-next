import type { Metadata } from "next";
import Link from "next/link";
import PremiumWaitlistForm from "@/components/PremiumWaitlistForm";
import TGPIEditorialVisual from "@/components/TGPIEditorialVisual";
import TGPIPageShell from "@/components/TGPIPageShell";

export const metadata: Metadata = {
  title: "TGPI Premium Early Access",
  description:
    "Join the TGPI Premium waitlist for launch priority and early access to the global decision system.",
};

export default function PremiumWaitlistPage() {
  return (
    <TGPIPageShell>
      <section className="overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_38px_100px_rgba(11,31,58,0.11)]">
        <div className="grid lg:grid-cols-[0.96fr_1.04fr]">
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <Link
              href="/pricing"
              className="text-sm font-bold text-[#0B1F3A] transition hover:text-[#B58A2A]"
            >
              ← Back to pricing
            </Link>
            <p className="mt-10 text-xs font-black uppercase tracking-[0.3em] text-[#B58A2A]">
              TGPI Premium Founding Access
            </p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#0B0B0B] md:text-7xl">
              Secure priority for the first TGPI Premium release.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#566070]">
              Join the founding list while payments remain disabled. Tell TGPI where
              you are going and which outcome matters most so the first membership
              experience begins around real global decisions.
            </p>
          </div>

          <TGPIEditorialVisual
            variant="premium"
            id="waitlist-hero"
            ariaLabel="Authorial TGPI premium early access illustration"
            className="min-h-[540px]"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[28px] border border-[#D8D2C4] bg-[#0B1F3A] text-white shadow-[0_26px_80px_rgba(11,31,58,0.2)]">
            <TGPIEditorialVisual
              variant="compare"
              id="waitlist-benefits"
              ariaLabel="Authorial TGPI membership benefits illustration"
              className="aspect-[16/10] w-full border-b border-white/10"
            />
            <div className="p-7">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F0D58C]">
                Founding membership
              </p>
              <p className="mt-4 text-4xl font-black text-[#F0D58C]">
                US$ 19.99
                <span className="ml-2 text-sm font-semibold text-[#C8D0DC]">/month</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#E7EDF5]">
                <li>✓ Complete Country Fit and Global Readiness</li>
                <li>✓ Unlimited comparisons and saved countries</li>
                <li>✓ International plan, goals and checklists</li>
                <li>✓ Premium courses, certificates and updates</li>
              </ul>
              <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-[#B8C4D2]">
                Joining the waitlist does not create a subscription or charge.
              </p>
            </div>
          </div>
        </div>

        <PremiumWaitlistForm />
      </section>
    </TGPIPageShell>
  );
}
