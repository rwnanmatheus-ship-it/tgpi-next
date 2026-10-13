import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | TGPI",
  description: "Cancellation, withdrawal and refund rules for TGPI Premium subscriptions.",
  alternates: { canonical: "/refunds" },
};

export default function RefundPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal · Consumer"
      title="Refund & Cancellation Policy"
      summary="How to cancel TGPI Premium, exercise applicable withdrawal rights and request review of charges."
      updated="October 13, 2026"
    >
      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">1. Cancel anytime</h2>
        <p className="mt-3">
          You can cancel recurring renewal through the TGPI customer billing portal or by
          contacting TGPI. Unless applicable law requires a different result, cancellation
          stops future renewal and Premium access remains available until the end of the
          already-paid billing period.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">2. Brazilian right of withdrawal</h2>
        <p className="mt-3">
          Where the Brazilian Consumer Defense Code applies to an online purchase, a consumer
          may exercise the statutory right of withdrawal within seven days from the applicable
          legal starting point. When validly exercised, TGPI will process the cancellation and
          refund in accordance with mandatory Brazilian consumer law.
        </p>
        <p className="mt-3">
          To exercise this right, send a clear request to contact@theglobalpolymath.com and
          include the email used for the TGPI account and enough transaction information for
          us to identify the subscription. TGPI will confirm receipt of the request.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">3. Refunds outside mandatory withdrawal periods</h2>
        <p className="mt-3">
          Except where law requires a refund, fees for an elapsed or partially elapsed billing
          period are generally non-refundable. TGPI may nevertheless review requests involving
          duplicate charges, technical billing errors, unauthorized transactions or exceptional
          circumstances on a case-by-case basis.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">4. Processing time</h2>
        <p className="mt-3">
          Approved refunds are submitted through the payment processor. The time for funds to
          appear depends on Stripe, the card network, bank and payment method. TGPI does not
          control external settlement timelines after a refund has been submitted.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">5. Account access after cancellation or refund</h2>
        <p className="mt-3">
          A standard end-of-period cancellation normally preserves Premium access until the
          paid period expires. A full refund, charge reversal or withdrawal from the contract
          may end Premium access earlier where consistent with applicable law and the reason
          for the refund.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">6. How to contact us</h2>
        <p className="mt-3">
          Cancellation or refund support:{" "}
          <a href="mailto:contact@theglobalpolymath.com" className="font-bold text-[#956A13] hover:underline">
            contact@theglobalpolymath.com
          </a>.
        </p>
      </section>
    </LegalDocument>
  );
}
