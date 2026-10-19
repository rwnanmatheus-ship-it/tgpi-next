import AnalyticsPreferences from "@/components/analytics/AnalyticsPreferences";
import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Cookie Policy | TGPI",
  description: "How TGPI uses cookies and similar technologies for authentication, security, billing and preferences.",
  alternates: { canonical: "/cookies" },
};

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal · Privacy"
      title="Cookie Policy"
      summary="How cookies and similar technologies support secure sessions, authentication, billing and platform functionality."
      updated="October 13, 2026"
    >
      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">1. What these technologies are</h2>
        <p className="mt-3">
          Cookies, local storage, session storage and similar technologies can store or read
          information on your device so websites can maintain sessions, remember choices,
          prevent abuse and deliver requested functionality.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">2. Strictly necessary and security technologies</h2>
        <p className="mt-3">
          TGPI and its service providers may use essential technologies required for account
          authentication, session continuity, security, fraud prevention, payment flows and
          core application functionality. Disabling these technologies may prevent sign-in,
          billing or other parts of TGPI from working correctly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">3. Functional preferences</h2>
        <p className="mt-3">
          TGPI may store preferences needed to maintain user-selected settings or improve
          continuity between visits. These may include interface or application state that is
          not used for cross-site advertising.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">4. Analytics and measurement</h2>
        <p className="mt-3">
          TGPI may use privacy-conscious performance or analytics technologies when enabled to
          understand reliability and product usage. Where applicable law requires consent for
          non-essential cookies, TGPI will provide appropriate controls before using them.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">5. Third-party services</h2>
        <p className="mt-3">
          Authentication and payment providers such as Clerk and Stripe may use their own
          cookies or similar technologies to secure sessions, detect fraud and complete
          requested services. Their handling of information is also governed by their own
          privacy and cookie disclosures.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">6. Your controls</h2>
        <p className="mt-3">
          Your browser may allow you to block or delete cookies. Blocking essential cookies
          can break authentication, security or payment functions. Optional usage measurement is off by default. Use the controls below to allow it or keep it off.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[var(--tgpi-navy)]">7. Contact</h2>
        <p className="mt-3">
          Questions about cookies or privacy may be sent to{" "}
          <a href="mailto:contact@theglobalpolymath.com" className="font-bold text-[#956A13] hover:underline">
            contact@theglobalpolymath.com
          </a>.
        </p>
      </section>
      <AnalyticsPreferences />
    </LegalDocument>
  );
}
