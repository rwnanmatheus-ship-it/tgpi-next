import type { Metadata } from "next";
import { buildMetadata } from "@/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for TGPI — The Global Polymath Institute.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="bg-[var(--tgpi-canvas)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <article className="mx-auto max-w-4xl rounded-[32px] border border-[var(--tgpi-border)] bg-white p-7 shadow-[var(--tgpi-shadow-soft)] sm:p-10 lg:p-14">
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
          Legal
        </p>
        <h1 className="mt-5 text-5xl font-semibold leading-none text-[var(--tgpi-navy-deep)] sm:text-6xl">
          Terms of Use
        </h1>
        <p className="mt-6 text-sm font-semibold text-[var(--tgpi-muted)]">
          Last updated: August 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-8 text-[#4D5868]">
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Platform purpose</h2>
            <p className="mt-3">
              TGPI provides educational information, comparison tools and planning resources for international decisions. Content is informational and does not replace legal, immigration, financial, medical or professional advice.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Accounts</h2>
            <p className="mt-3">
              Users are responsible for providing accurate information, protecting account credentials and using the platform lawfully. Access may be limited when misuse or security risks are detected.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Country information</h2>
            <p className="mt-3">
              Country data, costs, requirements and rankings can change. Users must verify critical decisions with official government, institutional or professional sources before acting.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Subscriptions</h2>
            <p className="mt-3">
              Paid features, prices, renewal conditions and cancellation rules will be presented before checkout. Billing only becomes active when the corresponding payment functionality is officially enabled.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Intellectual property</h2>
            <p className="mt-3">
              TGPI branding, interfaces, frameworks, original content and platform materials may not be copied, resold or redistributed without authorization.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Contact</h2>
            <p className="mt-3">Questions about these terms: contact@theglobalpolymath.com</p>
          </section>
        </div>
      </article>
    </main>
  );
}
