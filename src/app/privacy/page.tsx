import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument from "@/components/legal/LegalDocument";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: `${translate(locale, "Privacy Policy")} | TGPI`,
    description: translate(locale, "This policy explains how TGPI handles personal data across accounts, country intelligence, learning, billing, credentials and platform operations."),
    alternates: { canonical: "/privacy" },
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);
  return (
    <LegalDocument
      eyebrow={t("Legal · Privacy")}
      title={t("Privacy Policy")}
      summary={t("This policy explains how TGPI handles personal data across accounts, country intelligence, learning, billing, credentials and platform operations.")}
      updated="October 13, 2026"
    >
      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("1. Controller")}</h2>
        <p className="mt-3">{t("TGPI GLOBAL EDUCATION LTDA, CNPJ 49.709.438/0001-32, is the controller of personal data processed for the operation of TGPI where it determines the purposes and means of processing. Privacy requests can be sent to")}{" "}
          <a href="mailto:contact@theglobalpolymath.com" className="font-bold text-[#956A13] hover:underline">
            contact@theglobalpolymath.com
          </a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("2. Data we may collect")}</h2>
        <p className="mt-3">{t("Depending on how you use TGPI, we may process account identifiers, name, email, profile information, preferences, selected countries, comparison data, readiness inputs, learning progress, certificates, document-related metadata, support communications, subscription status, transaction references, device information, logs, IP address and security signals.")}</p>
        <p className="mt-3">{t("Payment-card details are generally collected and processed by Stripe rather than stored directly by TGPI. TGPI may receive payment status, customer identifiers, subscription identifiers, billing dates and limited transaction information needed to operate your membership.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("3. Why we use personal data")}</h2>
        <p className="mt-3">{t("We use personal data to create and secure accounts; provide and personalize TGPI features; save progress and preferences; deliver Premium access; process and reconcile subscriptions; provide support; issue and verify eligible credentials; prevent abuse; diagnose reliability problems; comply with legal obligations; and improve the platform.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("4. Legal bases")}</h2>
        <p className="mt-3">{t("Where the Brazilian General Data Protection Law (LGPD) applies, processing may rely on performance of a contract or pre-contractual procedures, compliance with legal or regulatory obligations, legitimate interests subject to applicable safeguards, exercise of rights, fraud-prevention and security grounds permitted by law, or consent when consent is the appropriate legal basis.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("5. Service providers")}</h2>
        <p className="mt-3">{t("TGPI uses specialized providers to operate the service. These may include Clerk for authentication and account infrastructure, Stripe for billing and payment processing, Vercel for hosting and deployment infrastructure, and Google/Firebase services where enabled for platform storage or application functionality. We may also use security, communications and performance providers when necessary.")}</p>
        <p className="mt-3">{t("Providers process data under their own terms and privacy obligations and receive only the information reasonably necessary for the services they perform.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("6. International transfers")}</h2>
        <p className="mt-3">{t("TGPI is built for international use and some infrastructure providers may process or store data outside Brazil. When applicable, TGPI relies on lawful transfer mechanisms and safeguards available under the LGPD and other applicable data-protection laws, together with the contractual and security commitments of its providers.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("7. Retention")}</h2>
        <p className="mt-3">{t("We retain personal data for as long as reasonably necessary to provide the service, maintain account continuity, comply with tax, accounting, legal and security obligations, resolve disputes and enforce agreements. Retention periods vary by data type. Data may be deleted, anonymized or isolated when it is no longer required, subject to lawful retention obligations.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("8. Security")}</h2>
        <p className="mt-3">{t("TGPI applies technical and organizational measures intended to protect personal data, including access controls, secured infrastructure, restricted secrets and trusted payment and authentication providers. No internet service can guarantee absolute security, and users should protect their own credentials and devices.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("9. Your privacy rights")}</h2>
        <p className="mt-3">{t("Subject to applicable law, you may request confirmation of processing, access, correction, information about sharing, portability where regulated and applicable, review of eligible automated decisions, anonymization, blocking or deletion of certain data, withdrawal of consent where processing is based on consent, and other rights available under the LGPD or local law.")}</p>
        <p className="mt-3">{t("Requests may be sent to contact@theglobalpolymath.com. We may need to verify your identity before fulfilling a request and may retain information where the law permits or requires continued retention.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("10. Children and minors")}</h2>
        <p className="mt-3">{t("TGPI does not knowingly seek to process children's personal data contrary to applicable law. Where a minor cannot validly consent or contract independently, authorization from a parent or legal guardian may be required. If you believe a child's data has been provided improperly, contact us so we can assess and take appropriate action.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("11. Cookies and similar technologies")}</h2>
        <p className="mt-3">{t("Authentication, security, payment and preference technologies may be used to keep TGPI functional and secure. Details are available in the")}{" "}
          <Link href="/cookies" className="font-bold text-[#956A13] hover:underline"><LocalizedText text="Cookie Policy" /></Link>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("12. Updates and contact")}</h2>
        <p className="mt-3">{t("We may update this policy as TGPI evolves or legal requirements change. Material updates will be reflected by a revised date and, where required, additional notice. Privacy requests:")}{" "}
          <a href="mailto:contact@theglobalpolymath.com" className="font-bold text-[#956A13] hover:underline">
            contact@theglobalpolymath.com
          </a>.
        </p>
      </section>
    </LegalDocument>
  );
}
