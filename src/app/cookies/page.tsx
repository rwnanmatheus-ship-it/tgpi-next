import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import AnalyticsPreferences from "@/components/analytics/AnalyticsPreferences";
import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);
  return {
  title: `${t("Cookie Policy")} | TGPI`,
  description: t("How TGPI uses cookies and similar technologies for authentication, security, billing and preferences."),
  alternates: { canonical: "/cookies" },
  };
}

export default async function CookiePolicyPage() {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);
  return (
    <LegalDocument
      eyebrow={t("Legal · Privacy")}
      title={t("Cookie Policy")}
      summary={t("How cookies and similar technologies support secure sessions, authentication, billing and platform functionality.")}
      updated="October 13, 2026"
    >
      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("1. What these technologies are")}</h2>
        <p className="mt-3">{t("Cookies, local storage, session storage and similar technologies can store or read information on your device so websites can maintain sessions, remember choices, prevent abuse and deliver requested functionality.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("2. Strictly necessary and security technologies")}</h2>
        <p className="mt-3">{t("TGPI and its service providers may use essential technologies required for account authentication, session continuity, security, fraud prevention, payment flows and core application functionality. Disabling these technologies may prevent sign-in, billing or other parts of TGPI from working correctly.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("3. Functional preferences")}</h2>
        <p className="mt-3">{t("TGPI may store preferences needed to maintain user-selected settings or improve continuity between visits. These may include interface or application state that is not used for cross-site advertising.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("4. Analytics and measurement")}</h2>
        <p className="mt-3">{t("TGPI may use privacy-conscious performance or analytics technologies when enabled to understand reliability and product usage. Where applicable law requires consent for non-essential cookies, TGPI will provide appropriate controls before using them.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("5. Third-party services")}</h2>
        <p className="mt-3">{t("Authentication and payment providers such as Clerk and Stripe may use their own cookies or similar technologies to secure sessions, detect fraud and complete requested services. Their handling of information is also governed by their own privacy and cookie disclosures.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("6. Your controls")}</h2>
        <p className="mt-3">{t("Your browser may allow you to block or delete cookies. Blocking essential cookies can break authentication, security or payment functions. Optional usage measurement is off by default. Use the controls below to allow it or keep it off.")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">{t("7. Contact")}</h2>
        <p className="mt-3">{t("Questions about cookies or privacy may be sent to")}{" "}
          <a href="mailto:contact@theglobalpolymath.com" className="font-bold text-[#956A13] hover:underline">
            contact@theglobalpolymath.com
          </a>.
        </p>
      </section>
      <AnalyticsPreferences />
    </LegalDocument>
  );
}
