
import { LocalizedElement } from "@/components/localization/LocalizedElement";

import { LocalizedText } from "@/components/localization/LocaleProvider";
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
  const replaced = trustState === "replaced";
  const label = verified
    ? "Credential verified"
    : replaced ? "Credential replaced" : revoked
      ? "Credential revoked"
      : "Integrity review required";
  const description = verified
    ? "The live issuer record is active and its server signature is valid."
    : replaced ? "This certificate was replaced. Its original evidence remains in the history; use the replacement record." : revoked
      ? "This certificate is no longer active. Its original issuance remains in the history."
      : "The record could not pass every integrity check. Do not present it as verified.";
  const verificationUrl = certificateVerificationUrl(credential.id);
  const sharingAllowed = credential.professionalEvidence?.sharing !== false;
  const canPrint = owner && verified;
  return (
    <main className="credential-record">
      <div className="credential-record-shell">
        <LocalizedElement as="nav"
          aria-label="Certificate navigation"
          className="credential-record-breadcrumb"
        >
          <Link href={owner ? "/certificates" : "/verify"}>
            {owner ? <LocalizedText text={"My certificates"} /> : <LocalizedText text={"Public verification"} />}
          </Link>
          <span aria-hidden="true">/</span>
          <span><LocalizedText text={"Certificate record"} /></span>
        </LocalizedElement>
        <header className="credential-record-heading">
          <div>
            <p className="credential-eyebrow"><LocalizedText text={"TGPI · Verified learning"} /></p>
            <h1>
              {owner
                ? <LocalizedText text={"Your achievement, in one place."} />
                : <LocalizedText text={"Verify a learning achievement."} />}
            </h1>
            <p>
              {owner
                ? <LocalizedText text={"Download, share and manage your certificate."} />
                : <LocalizedText text={"Check the learner, issuer and current certificate status."} />}
            </p>
          </div>
          <LocalizedElement as="span"
            className={`credential-state ${verified ? "verified" : "review"}`}
            aria-label="Current lifecycle status"
          >
            {verified ? "✓ " : "! "}
            <LocalizedText text={label} />
          </LocalizedElement>
        </header>
        <div
          className={`credential-status-note ${verified ? "verified" : "review"}`}
          role="status"
        >
          <strong><LocalizedText text={label} /></strong>
          <span><LocalizedText text={description} /></span>
        </div>
        <CredentialActions
          credentialId={credential.id}
          courseTitle={credential.courseTitle}
          downloadUrl={`/api/credentials/${encodeURIComponent(credential.id)}?download=1`}
          verificationUrl={verificationUrl}
          canDownload={verified}
          sharingAllowed={sharingAllowed}
          owner={owner}
        />
        <LocalizedElement as="nav" className="credential-jump-nav" aria-label="Certificate sections">
          <a href="#certificate-document"><LocalizedText text="Certificate" /></a>
          <a href="#certificate-evidence"><LocalizedText text="Learning evidence" /></a>
          {canPrint && <a href="#certificate-print"><LocalizedText text="Print & display" /></a>}
        </LocalizedElement>
        {verified && sharingAllowed && (
          <section className="credential-comparison">
            <span className="credential-comparison-mark" aria-hidden="true">⌖</span>
            <div>
              <h2><LocalizedText text="Verify against the original" /></h2>
              <p><LocalizedText text="Compare the learner, course, date and certificate ID against this issuer record." /></p>
            </div>
            {credential.documentFingerprint && (
              <dl>
                <dt><LocalizedText text="Document fingerprint" /></dt>
                <dd className="credential-mono">{credential.documentFingerprint}</dd>
              </dl>
            )}
          </section>
        )}
        <div id="certificate-document">
          <CertificateDocument credential={credential} verified={verified} verificationUrl={verificationUrl} />
        </div>
        {canPrint && (
          <section id="certificate-print" className="credential-print-guide">
            <div><span aria-hidden="true">01</span><h2><LocalizedText text="A4 · Landscape" /></h2><p><LocalizedText text="Download the PDF and print at actual size using high quality settings." /></p></div>
            <div><span aria-hidden="true">02</span><h2><LocalizedText text="Made to frame" /></h2><p><LocalizedText text="Use matte white paper, 180–250 g/m², if supported by your printer. Keep the full border visible." /></p></div>
            <div><span aria-hidden="true">03</span><h2><LocalizedText text="Scan to verify" /></h2><p><LocalizedText text="Keep the QR code unobstructed so it remains readable after framing." /></p></div>
          </section>
        )}
        {credential.replacedBy && <p className="credential-status-note"><Link href={`${owner ? "/certificates/" : "/verify/credentials/"}${encodeURIComponent(credential.replacedBy)}`}><LocalizedText text={"Abrir certificado substituto →"} /></Link></p>}
        {canPrint && (
          <section className="credential-refresh-note">
            <div className="credential-refresh-icon" aria-hidden="true">
              ↻
            </div>
            <div>
              <h2><LocalizedText text={"Refresh an earlier certificate"} /></h2>
              <p><LocalizedText text={"The download always uses the latest document edition ("} />{CERTIFICATE_DESIGN_VERSION}<LocalizedText text={"). Your certificate ID, original issue date and learning evidence stay the same. No course retake is required."} /></p>
            </div>
          </section>
        )}
        <LocalizedElement as="section"
          className="credential-evidence-grid"
          id="certificate-evidence"
          aria-label="Learning evidence"
        >
          <article>
            <p className="credential-eyebrow"><LocalizedText text={"Assessment"} /></p>
            <h2>{credential.assessmentScore}<LocalizedText text={"% mastery"} /></h2>
            <p>
              {credential.masteryThreshold}<LocalizedText text={"% required ·"} />{" "}
              {credential.learningHours}{" "}<LocalizedText text={"learning hours"} /></p>
          </article>
          <article>
            <p className="credential-eyebrow"><LocalizedText text={"Identity"} /></p>
            <h2><LocalizedText text={"TGPI Global ID"} /></h2>
            <p className="credential-mono">
              {credential.identityEvidence.globalKeyId}
            </p>
          </article>
          <article>
            <p className="credential-eyebrow"><LocalizedText text={"Portability"} /></p>
            <h2>{sharingAllowed ? <LocalizedText text="Portable evidence" /> : <LocalizedText text="Private certificate" />}</h2>
            <p><LocalizedText text={sharingAllowed ? "Use the official verification link to check the current issuer record." : "Only you can view this certificate while sharing is disabled."} /></p>
          </article>
        </LocalizedElement>
        <details className="credential-details">
          <summary><LocalizedText text={"Learning evidence & verification details"} />{" "}
            <span aria-hidden="true">＋</span>
          </summary>
          <div className="credential-details-content">
            <section>
              <h2><LocalizedText text={"Demonstrated capabilities"} /></h2>
              <ul className="credential-skill-list">
                {credential.skills.map((skill) => (
                  <li key={skill.id}>
                    <strong>{skill.name}</strong>
                    <span><LocalizedText text={skill.level} />{" "}<LocalizedText text={"evidence"} /></span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2><LocalizedText text={"Evidence dossier"} /></h2>
              <ul className="credential-evidence-list">
                {credential.evidenceSummary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2><LocalizedText text={"Trust chain"} /></h2>
              <dl className="credential-trust-data">
                <div>
                  <dt><LocalizedText text={"Issuer"} /></dt>
                  <dd>{credential.issuer}</dd>
                </div>
                <div>
                  <dt><LocalizedText text={"Record fingerprint"} /></dt>
                  <dd className="credential-mono">
                    {credential.integrityFingerprint}
                  </dd>
                </div>
                {verified && credential.portableProof && (
                  <div>
                    <dt><LocalizedText text="Portable proof" /></dt>
                    <dd><a className="credential-inline-link" href={credential.portableProof.publicKeyUrl}>{credential.portableProof.algorithm} · {credential.portableProof.keyId}</a></dd>
                  </div>
                )}
                <div>
                  <dt><LocalizedText text="Course edition" /></dt>
                  <dd>{credential.courseVersion}</dd>
                </div>
                <div>
                  <dt><LocalizedText text={"Identity revision"} /></dt>
                  <dd>{credential.identityEvidence.revision}</dd>
                </div>
                <div>
                  <dt><LocalizedText text={"Public anchor"} /></dt>
                  <dd>
                    {credential.identityEvidence.anchor.status === "confirmed"
                      ? <LocalizedText text={"Confirmed on Base Mainnet"} />
                      : <LocalizedText text={"Identity anchor activation pending"} />}
                  </dd>
                </div>
              </dl>
            </section>
            <section>
              <h2><LocalizedText text={"International format references"} /></h2>
              <p><LocalizedText text={"These are implementation alignment targets. They do not mean this credential is externally accredited or certified by these organizations."} /></p>
              <ul className="credential-standard-list">
                {credential.standardsAlignment.map((standard) => (
                  <li key={standard}>
                    {standard}
                    <span><LocalizedText text={"Implementation target"} /></span>
                  </li>
                ))}
              </ul>
              <p><LocalizedText text={"The TGPI quality seal is the institute's own issuer mark, based on its identity, assessment and record-verification checks. This professional learning certificate is not a government degree or professional license."} /></p>
            </section>
          </div>
        </details>
        <LocalizedElement as="nav" className="credential-record-footer" aria-label="Next steps">
          <Link
            className="credential-button"
            href={owner ? "/certificates" : "/verify"}
          >
            {owner ? <LocalizedText text={"← Back to my certificates"} /> : <LocalizedText text={"Verify another record"} />}
          </Link>
          {owner && (
            <Link className="credential-button" href="/courses"><LocalizedText text={"Continue learning ↗"} /></Link>
          )}
        </LocalizedElement>
      </div>
    </main>
  );
}
