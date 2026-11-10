import Link from "next/link";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import "./credential-hub.css";

export default function CredentialVerificationProblem({ unavailable = false }: { unavailable?: boolean }) {
  return (
    <main className="credential-hub">
      <div className="credential-hub-shell">
        <section className="credential-problem">
          <p className="credential-hub-kicker"><LocalizedText text="TGPI Public Trust Registry" /></p>
          <h1><LocalizedText text={unavailable ? "Verification temporarily unavailable" : "Public certificate record unavailable"} /></h1>
          <p><LocalizedText text={unavailable
            ? "The issuer registry could not be reached. Try this link again in a moment."
            : "Check the ID or ask the holder for their current public verification link."} /></p>
          <div className="credential-hub-actions">
            <Link href="/verify" className="credential-hub-button"><LocalizedText text="Verify another record" /></Link>
            <Link href="/certificates" className="credential-hub-button secondary"><LocalizedText text="My certificates" /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
