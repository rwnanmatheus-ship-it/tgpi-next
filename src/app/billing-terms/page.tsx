
import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Billing Terms | TGPI",
  description: "Billing, renewal, cancellation and payment terms for TGPI Premium.",
  alternates: { canonical: "/billing-terms" },
};

export default function BillingTermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal · Billing"
      title="TGPI Premium Billing Terms"
      summary="Clear rules for the TGPI Premium recurring subscription, payment processing, renewals, failed payments and cancellation."
      updated="October 13, 2026"
    >
      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">1. Subscription price</h2>
        <p className="mt-3">
          The standard TGPI Premium membership is <strong>US$ 19.90 per month</strong>.
          If TGPI offers another price, currency, promotion or billing period, the checkout
          page shown before purchase controls that transaction.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">2. Automatic renewal</h2>
        <p className="mt-3">
          TGPI Premium is a recurring subscription. Unless you cancel, Stripe will attempt to
          charge the payment method associated with your subscription at the beginning of each
          new monthly billing period. Your next renewal date is shown in the customer billing
          portal when available.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">3. Payment processor</h2>
        <p className="mt-3">
          Payments are processed by Stripe. Stripe may collect and process payment credentials,
          fraud-prevention information and transaction data under its own legal and privacy
          terms. TGPI generally receives identifiers and status information required to
          activate and manage your subscription rather than full card details.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">4. Currency, taxes and issuer charges</h2>
        <p className="mt-3">
          The standard membership is priced in US dollars. Your bank, card issuer or payment
          provider may convert the charge into another currency and may apply its own exchange
          rate or fees. Applicable taxes may be added or handled as required by law and the
          payment flow presented to you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">5. Cancellation</h2>
        <p className="mt-3">
          You may cancel recurring renewal through the TGPI customer billing portal or another
          cancellation method provided by TGPI. Unless mandatory law or a specific offer
          provides otherwise, cancellation takes effect at the end of the current paid billing
          period and prevents future renewals.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">6. Failed payments</h2>
        <p className="mt-3">
          If a payment fails, Stripe may retry the payment or request an updated payment
          method. TGPI may restrict paid features while a subscription is unpaid, past due,
          cancelled or otherwise not entitled to Premium access, subject to applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">7. Price changes</h2>
        <p className="mt-3">
          TGPI may change subscription pricing prospectively. Where applicable law requires
          notice or consent before a new recurring price applies, TGPI will follow those
          requirements. A price change does not retroactively alter charges already completed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">8. Refunds and statutory rights</h2>
        <p className="mt-3">
          Refund eligibility and mandatory withdrawal rights are described in the{" "}
          <Link href="/refunds" className="font-bold text-[#956A13] hover:underline"><LocalizedText text="Refund & Cancellation Policy" /></Link>.
          Nothing in these Billing Terms limits rights that cannot legally be waived.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">9. Billing support</h2>
        <p className="mt-3">
          For billing questions, duplicate charges, cancellation issues or refund requests,
          contact{" "}
          <a href="mailto:contact@theglobalpolymath.com" className="font-bold text-[#956A13] hover:underline">
            contact@theglobalpolymath.com
          </a>.
        </p>
      </section>
    </LegalDocument>
  );
}
