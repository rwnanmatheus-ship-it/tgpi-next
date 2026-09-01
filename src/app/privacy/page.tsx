import type { Metadata } from "next";
import { buildMetadata } from "@/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy information for TGPI — The Global Polymath Institute.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="bg-[var(--tgpi-canvas)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <article className="mx-auto max-w-4xl rounded-[32px] border border-[var(--tgpi-border)] bg-white p-7 shadow-[var(--tgpi-shadow-soft)] sm:p-10 lg:p-14">
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
          Legal
        </p>
        <h1 className="mt-5 text-5xl font-semibold leading-none text-[var(--tgpi-navy-deep)] sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-sm font-semibold text-[var(--tgpi-muted)]">
          Last updated: August 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-8 text-[#4D5868]">
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Information we collect</h2>
            <p className="mt-3">
              TGPI may collect account details, profile information, preferences, saved countries, progress data and technical information required to operate and secure the platform.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">How information is used</h2>
            <p className="mt-3">
              Information is used to provide account features, personalize the experience, maintain security, improve the product and communicate essential service updates.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Service providers</h2>
            <p className="mt-3">
              TGPI may use trusted infrastructure and payment providers to deliver authentication, hosting, analytics, storage and billing. Each provider processes information under its own contractual and privacy obligations.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Your choices</h2>
            <p className="mt-3">
              You may request access, correction or deletion of eligible personal information by contacting TGPI. Some records may be retained when required for security, legal or accounting purposes.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Contact</h2>
            <p className="mt-3">Privacy requests: contact@theglobalpolymath.com</p>
          </section>
        </div>
      </article>
    </main>
  );
}
