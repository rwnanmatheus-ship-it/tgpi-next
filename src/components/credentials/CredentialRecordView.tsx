import Link from "next/link";
import CertificateDocument from "./CertificateDocument";
import CredentialActions from "./CredentialActions";
import { getCredentialTrustState } from "@/lib/credential-standard";
import {
  CERTIFICATE_DESIGN_VERSION,
  certificateVerificationUrl,
} from "@/lib/certificate-presentation";
import type { PublicTgpiLearningCredential } from "@/types/learning";
import "@/app/certificates/credential-record.css";

export default function CredentialRecordView({
  credential,
  owner,
}: {
  credential: PublicTgpiLearningCredential;
  owner: boolean;
}) {
  const trustState = getCredentialTrustState(credential);
  const verified = trustState === "active_verified";
  const revoked = trustState === "revoked";
  const label = verified
    ? "Credential verified"
    : revoked
      ? "Credential revoked"
      : "Integrity review required";
  const description = verified
    ? "The live issuer record is active and its server signature is valid."
    : revoked
      ? "This certificate is no longer active. Its original issuance remains in the history."
      : "The record could not pass every integrity check. Do not present it as verified.";
  const verificationUrl = certificateVerificationUrl(credential.id);
  return (
    <main className="credential-record">
      <div className="credential-record-shell">
        <nav
          aria-label="Certificate navigation"
          className="credential-record-breadcrumb"
        >
          <Link href={owner ? "/certificates" : "/verify"}>
            {owner ? "My certificates" : "Public verification"}
          </Link>
          <span aria-hidden="true">/</span>
          <span>Certificate record</span>
        </nav>
        <header className="credential-record-heading">
          <div>
            <p className="credential-eyebrow">TGPI · Verified learning</p>
            <h1>
              {owner
                ? "Your achievement, in one place."
                : "Verify a learning achievement."}
            </h1>
            <p>
              {owner
                ? "Download, share and manage your certificate."
                : "Check the learner, issuer and current certificate status."}
            </p>
          </div>
          <span
            className={`credential-state ${verified ? "verified" : "review"}`}
            aria-label="Current lifecycle status"
          >
            {verified ? "✓ " : "! "}
            {label}
          </span>
        </header>
        <div
          className={`credential-status-note ${verified ? "verified" : "review"}`}
          role="status"
        >
          <strong>{label}</strong>
          <span>{description}</span>
        </div>
        <CredentialActions
          credentialId={credential.id}
          courseTitle={credential.courseTitle}
          downloadUrl={`/api/credentials/${encodeURIComponent(credential.id)}?download=1`}
          verificationUrl={verificationUrl}
          canDownload={verified}
          owner={owner}
        />
        <CertificateDocument credential={credential} verified={verified} />
        {owner && (
          <section className="credential-refresh-note">
            <div className="credential-refresh-icon" aria-hidden="true">
              ↻
            </div>
            <div>
              <h2>Refresh an earlier certificate</h2>
              <p>
                The download always uses the latest document edition (
                {CERTIFICATE_DESIGN_VERSION}). Your certificate ID, original
                issue date and learning evidence stay the same. No course retake
                is required.
              </p>
            </div>
          </section>
        )}
        <section
          className="credential-evidence-grid"
          aria-label="Learning evidence"
        >
          <article>
            <p className="credential-eyebrow">Assessment</p>
            <h2>{credential.assessmentScore}% mastery</h2>
            <p>
              {credential.masteryThreshold}% required ·{" "}
              {credential.learningHours} learning hours
            </p>
          </article>
          <article>
            <p className="credential-eyebrow">Identity</p>
            <h2>TGPI Global ID</h2>
            <p className="credential-mono">
              {credential.identityEvidence.globalKeyId}
            </p>
          </article>
          <article>
            <p className="credential-eyebrow">Portability</p>
            <h2>Share worldwide</h2>
            <p>
              English-language PDF, public QR verification and portable
              evidence. Acceptance depends on the receiving institution.
            </p>
          </article>
        </section>
        <details className="credential-details">
          <summary>
            Learning evidence & verification details{" "}
            <span aria-hidden="true">＋</span>
          </summary>
          <div className="credential-details-content">
            <section>
              <h2>Demonstrated capabilities</h2>
              <ul className="credential-skill-list">
                {credential.skills.map((skill) => (
                  <li key={skill.id}>
                    <strong>{skill.name}</strong>
                    <span>{skill.level} evidence</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2>Evidence dossier</h2>
              <ul className="credential-evidence-list">
                {credential.evidenceSummary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>Trust chain</h2>
              <dl className="credential-trust-data">
                <div>
                  <dt>Issuer</dt>
                  <dd>{credential.issuer}</dd>
                </div>
                <div>
                  <dt>Record fingerprint</dt>
                  <dd className="credential-mono">
                    {credential.integrityFingerprint}
                  </dd>
                </div>
                <div>
                  <dt>Identity revision</dt>
                  <dd>{credential.identityEvidence.revision}</dd>
                </div>
                <div>
                  <dt>Public anchor</dt>
                  <dd>
                    {credential.identityEvidence.anchor.status === "confirmed"
                      ? "Confirmed on Base Mainnet"
                      : "Identity anchor activation pending"}
                  </dd>
                </div>
              </dl>
            </section>
            <section>
              <h2>International format references</h2>
              <p>
                These are implementation alignment targets. They do not mean
                this credential is externally accredited or certified by these
                organizations.
              </p>
              <ul className="credential-standard-list">
                {credential.standardsAlignment.map((standard) => (
                  <li key={standard}>
                    {standard}
                    <span>Implementation target</span>
                  </li>
                ))}
              </ul>
              <p>
                The TGPI quality seal is the institute's own issuer mark, based
                on its identity, assessment and record-verification checks. This
                professional learning certificate is not a government degree or
                professional license.
              </p>
            </section>
          </div>
        </details>
        <nav className="credential-record-footer" aria-label="Next steps">
          <Link
            className="credential-button"
            href={owner ? "/certificates" : "/verify"}
          >
            {owner ? "← Back to my certificates" : "Verify another record"}
          </Link>
          {owner && (
            <Link className="credential-button" href="/courses">
              Continue learning ↗
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
