import Link from "next/link";
import { redirect } from "next/navigation";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import CredentialSealStage from "@/components/credentials/CredentialSealStage";
import CredentialVerificationForm from "@/components/credentials/CredentialVerificationForm";
import { isGlobalKeyProofReference, readCertificateReference } from "@/lib/certificate-reference";
import "@/components/credentials/credential-hub.css";

const verificationGuide = [
  {
    title: "Find the certificate reference",
    detail: "Scan the QR code with your phone camera, paste the official link or enter the certificate ID.",
  },
  {
    title: "Check the current status",
    detail: "The TGPI registry reports whether the certificate is active, replaced or revoked.",
  },
  {
    title: "Compare the document",
    detail: "Compare the learner, course, date and certificate ID against this issuer record.",
  },
] as const;

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; legacy?: string; type?: string }>;
}) {
  const { reference, legacy, type } = await searchParams;
  const input = typeof reference === "string" ? reference : typeof legacy === "string" ? legacy : "";
  const recordType = type === "global_key" ? "global_key" : "credential";
  const value = input.trim();

  if (recordType === "global_key" && isGlobalKeyProofReference(value)) {
    redirect("/verify/global-key?proof=" + encodeURIComponent(value));
  }
  const id = recordType === "credential" && readCertificateReference(value);
  if (id) redirect("/verify/credentials/" + encodeURIComponent(id));

  return (
    <main className="credential-hub credential-verification">
      <div className="credential-hub-shell">
        <div className="credential-hub-bar">
          <p><span aria-hidden="true">✦</span> <LocalizedText text="The Global Polymath Institute" /></p>
          <Link href="/certificates"><LocalizedText text="My certificates" /> <span aria-hidden="true">↗</span></Link>
        </div>
        <section className="credential-hub-hero">
          <div className="credential-hub-hero-copy">
            <p className="credential-hub-kicker"><span aria-hidden="true" /> <LocalizedText text="TGPI Public Trust Registry" /></p>
            <h1><LocalizedText text="Verify a TGPI certificate" /></h1>
            <p className="credential-hub-lead"><LocalizedText text="Check the issuer’s live record before relying on a certificate." /></p>
            <CredentialVerificationForm
              key={recordType + (legacy ? "-legacy" : reference !== undefined ? "-submitted" : "")}
              initialType={recordType}
              initialError={legacy ? "legacy" : reference !== undefined ? "invalid" : undefined}
            />
          </div>
          <CredentialSealStage />
        </section>
        <section className="credential-verification-guide" aria-labelledby="verification-guide-title">
          <div className="credential-hub-section-heading">
            <p className="credential-hub-kicker"><LocalizedText text="Public verification" /></p>
            <h2 id="verification-guide-title"><LocalizedText text="How to verify a certificate" /></h2>
          </div>
          <ol>
            {verificationGuide.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3><LocalizedText text={step.title} /></h3>
                <p><LocalizedText text={step.detail} /></p>
              </li>
            ))}
          </ol>
          <p className="credential-registry-note"><LocalizedText text="The seal identifies TGPI as the issuer. Use the registry to confirm the status of an individual certificate." /></p>
        </section>
        <footer className="credential-hub-footer">
          <Link href="/certificates"><LocalizedText text="My certificates" /> ↗</Link>
          <Link href="/courses"><LocalizedText text="Learning" /> ↗</Link>
          <Link href="/global-key"><LocalizedText text="Global Key" /> ↗</Link>
        </footer>
      </div>
    </main>
  );
}
