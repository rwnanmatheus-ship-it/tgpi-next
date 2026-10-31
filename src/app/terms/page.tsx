
import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Use | TGPI",
  description:
    "Terms governing access to TGPI, TGPI Premium, educational content and global decision tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal · Terms"
      title="Terms of Use"
      summary="These Terms govern access to The Global Polymath Institute, including free services, TGPI Premium, learning, country intelligence, documents and related digital features."
      updated="October 13, 2026"
    >
      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">1. Who provides TGPI</h2>
        <p className="mt-3">
          TGPI — The Global Polymath Institute — is operated by TGPI GLOBAL EDUCATION LTDA,
          CNPJ 49.709.438/0001-32, a company organized under Brazilian law and based in
          Campinas, São Paulo, Brazil. References to “TGPI”, “we”, “us” or “our” mean this
          legal entity unless the context states otherwise.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">2. Acceptance and eligibility</h2>
        <p className="mt-3">
          By creating an account, accessing TGPI or purchasing a subscription, you agree to
          these Terms and the policies incorporated by reference. If you are not legally
          capable of entering into a binding contract in your jurisdiction, a parent or legal
          guardian must authorize your use and any purchase.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">3. Platform purpose</h2>
        <p className="mt-3">
          TGPI provides educational content, country intelligence, comparison tools,
          readiness frameworks, document organization, learning resources, credentials and
          planning tools for international decisions. TGPI is not a government authority,
          immigration adviser, law firm, financial institution, medical provider or licensed
          professional adviser.
        </p>
        <p className="mt-3">
          Country rules, costs, visa requirements, labour conditions, tax rules and other
          external information can change. Important decisions must be independently verified
          with the relevant official authority or qualified professional before you act.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">4. Accounts and security</h2>
        <p className="mt-3">
          You must provide accurate account information, keep access credentials secure and
          promptly notify TGPI of suspected unauthorized access. You are responsible for
          activity performed through your account unless applicable law provides otherwise.
          TGPI may restrict or suspend access when reasonably necessary to investigate fraud,
          abuse, security incidents or material violations of these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">5. TGPI Premium subscription</h2>
        <p className="mt-3">
          TGPI Premium is currently offered as a recurring monthly digital subscription at
          <strong> US$ 19.90 per month</strong>, unless a different price, currency, promotion
          or billing interval is clearly presented before checkout. The subscription renews
          automatically at the start of each billing period until cancelled.
        </p>
        <p className="mt-3">
          Payments are processed through Stripe. Your card issuer or payment provider may
          apply exchange rates, taxes, fees or other charges that TGPI does not control.
          Detailed billing rules are available in the{" "}
          <Link href="/billing-terms" className="font-bold text-[#956A13] hover:underline">
            Billing Terms
          </Link>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">6. Cancellation, withdrawal and refunds</h2>
        <p className="mt-3">
          You can cancel renewal through the TGPI billing portal or another cancellation
          method made available to you. Unless applicable law requires otherwise, cancellation
          stops future renewals and access continues through the end of the paid billing
          period.
        </p>
        <p className="mt-3">
          Consumers may have mandatory withdrawal or refund rights under applicable law,
          including rights that may apply to online contracts in Brazil. These rights are not
          waived by these Terms. See the{" "}
          <Link href="/refunds" className="font-bold text-[#956A13] hover:underline"><LocalizedText text="Refund & Cancellation Policy" /></Link>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">7. Learning and credentials</h2>
        <p className="mt-3">
          TGPI may issue records, certificates or digital credentials for completed learning
          or verified activity. A TGPI credential is not a government licence, professional
          licence, academic degree or externally accredited qualification unless the specific
          credential explicitly states otherwise.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">8. Acceptable use</h2>
        <p className="mt-3">
          You may not use TGPI to violate law, infringe third-party rights, interfere with
          platform security, scrape or reproduce protected content at scale, reverse engineer
          restricted systems, impersonate others, distribute malware, commit fraud or use the
          service in a way that materially harms TGPI or other users.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">9. Intellectual property</h2>
        <p className="mt-3">
          TGPI branding, software, interfaces, frameworks, databases, editorial materials,
          visual systems and original content are owned by TGPI or its licensors and are
          protected by applicable intellectual-property laws. Your subscription grants a
          limited, personal, non-exclusive, non-transferable right to use the service while
          your access remains valid. It does not transfer ownership.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">10. Availability and changes</h2>
        <p className="mt-3">
          TGPI is an evolving digital service. Features, data sources, interfaces and
          availability may change. We may perform maintenance or modify functionality when
          reasonably necessary for security, reliability, legal compliance or product
          development. Material changes affecting a paid subscription will be communicated
          when required by applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">11. Disclaimers and responsibility</h2>
        <p className="mt-3">
          TGPI uses reasonable efforts to provide useful and reliable information, but cannot
          guarantee that third-party data is complete, current or suitable for every
          individual decision. Nothing on the platform guarantees admission, employment,
          immigration approval, financial outcomes or any particular result.
        </p>
        <p className="mt-3">
          Nothing in these Terms excludes rights, remedies, warranties or liabilities that
          cannot lawfully be excluded or limited under applicable consumer or data-protection
          law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">12. Privacy</h2>
        <p className="mt-3">
          Personal data is handled as described in the{" "}
          <Link href="/privacy" className="font-bold text-[#956A13] hover:underline"><LocalizedText text="Privacy Policy" /></Link>{" "}
          and{" "}
          <Link href="/cookies" className="font-bold text-[#956A13] hover:underline"><LocalizedText text="Cookie Policy" /></Link>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">13. Governing law and consumer rights</h2>
        <p className="mt-3">
          These Terms are governed by Brazilian law, without excluding mandatory protections
          that apply to consumers in their country or region. Where mandatory consumer law
          grants you additional rights, those rights prevail over conflicting contractual
          provisions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">14. Contact</h2>
        <p className="mt-3">
          Questions, complaints, cancellation or legal notices may be sent to{" "}
          <a href="mailto:contact@theglobalpolymath.com" className="font-bold text-[#956A13] hover:underline">
            contact@theglobalpolymath.com
          </a>.
        </p>
      </section>
    </LegalDocument>
  );
}
