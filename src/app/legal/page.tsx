import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument from "@/components/legal/LegalDocument";
import { LocalizedText } from "@/components/localization/LocaleProvider";


export const metadata: Metadata = {
  title: "Legal & Company Information | TGPI",
  description: "Official company and legal information for The Global Polymath Institute.",
  alternates: { canonical: "/legal" },
};

const documents = [
  {
    title: "Terms of Use",
    description: "Rules governing accounts, platform use, Premium access and TGPI content.",
    href: "/terms",
  },
  {
    title: "Privacy Policy",
    description: "How personal data is collected, used, shared, retained and protected.",
    href: "/privacy",
  },
  {
    title: "Billing Terms",
    description: "Recurring billing, renewals, payment processing and failed payments.",
    href: "/billing-terms",
  },
  {
    title: "Refund & Cancellation Policy",
    description: "Cancellation, statutory withdrawal rights and refund handling.",
    href: "/refunds",
  },
  {
    title: "Cookie Policy",
    description: "Cookies and similar technologies used for secure digital operations.",
    href: "/cookies",
  },
] as const;

export default function LegalPage() {
  return (
    <LegalDocument
      eyebrow="Trust · Company"
      title="Legal & Company Information"
      summary="Official legal identity, contact channels and policies governing The Global Polymath Institute."
      updated="October 13, 2026"
    >
      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Company identity</h2>
        <dl className="mt-5 grid gap-4 rounded-2xl border border-[#D8D2C4] bg-[#FFFDF8] p-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#956A13]">Legal name</dt>
            <dd className="mt-1 font-bold text-[#0B1F3A]">TGPI GLOBAL EDUCATION LTDA</dd>
          </div>
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#956A13]">CNPJ</dt>
            <dd className="mt-1 font-bold text-[#0B1F3A]">49.709.438/0001-32</dd>
          </div>
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#956A13]">Brand</dt>
            <dd className="mt-1 font-bold text-[#0B1F3A]">TGPI — The Global Polymath Institute</dd>
          </div>
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#956A13]">Jurisdiction</dt>
            <dd className="mt-1 font-bold text-[#0B1F3A]">Campinas, São Paulo, Brazil</dd>
          </div>
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#956A13]"><LocalizedText text="Website" /></dt>
            <dd className="mt-1 font-bold text-[#0B1F3A]">theglobalpolymath.com</dd>
          </div>
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#956A13]">Official electronic address</dt>
            <dd className="mt-1 font-bold text-[#0B1F3A]">
              <a
                href="mailto:corporate@theglobalpolymath.com"
                className="underline-offset-4 hover:underline"
              >
                corporate@theglobalpolymath.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#956A13]">Customer & billing support</dt>
            <dd className="mt-1 font-bold text-[#0B1F3A]">
              <a
                href="mailto:contact@theglobalpolymath.com"
                className="underline-offset-4 hover:underline"
              >
                contact@theglobalpolymath.com
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">What TGPI provides</h2>
        <p className="mt-3">
          TGPI develops digital education, global decision intelligence, country comparison,
          practical learning, readiness tools, documents workflows, credentials and software
          services designed to help users make more informed international decisions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Payments</h2>
        <p className="mt-3">
          TGPI Premium is offered as a recurring digital membership. Stripe is used to
          securely process eligible payments and provide billing infrastructure. The standard
          published Premium price is US$ 19.90 per month unless the checkout clearly presents
          another authorized offer.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Legal documents</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {documents.map((document) => (
            <Link
              key={document.href}
              href={document.href}
              className="rounded-2xl border border-[#D8D2C4] bg-[#FFFDF8] p-5 transition hover:-translate-y-0.5 hover:border-[#B58A2A]"
            >
              <h3 className="font-extrabold text-[#0B1F3A]">{document.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#596576]">{document.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">Official and support contacts</h2>
        <p className="mt-3">
          The official electronic address registered for TGPI GLOBAL EDUCATION LTDA is{" "}
          <a href="mailto:corporate@theglobalpolymath.com" className="font-bold text-[#956A13] hover:underline">
            corporate@theglobalpolymath.com
          </a>.
        </p>
        <p className="mt-3">
          For customer accounts, subscriptions, billing, cancellation, privacy requests or general support, use{" "}
          <a href="mailto:contact@theglobalpolymath.com" className="font-bold text-[#956A13] hover:underline">
            contact@theglobalpolymath.com
          </a>.
        </p>
      </section>
    </LegalDocument>
  );
}
