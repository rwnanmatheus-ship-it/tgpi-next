import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import Image from "@/components/localization/LocalizedImage";
import CertificateQr from "./CertificateQr";
import CertificateSeal from "./CertificateSeal";
import { CertificateIssueDate, CertificatePrivacyText } from "./CertificatePresentationText";
import { CERTIFICATE_DESIGN_VERSION } from "@/lib/certificate-presentation";
import { credentialTrustPresentation } from "@/lib/credential-trust-presentation";
import type { PublicTgpiLearningCredential } from "@/types/learning";

const frameCorners = ["top-left", "top-right", "bottom-right", "bottom-left"] as const;

/** The document presents the issuer record; decorative seals do not assert accreditation. */
export default function CertificateDocument({
  credential,
  verified,
  verificationUrl,
  owner = false,
}: {
  credential: PublicTgpiLearningCredential;
  verified: boolean;
  owner?: boolean;
  verificationUrl: string;
}) {
  const privateSharing = credential.professionalEvidence?.sharing === false;
  const identityAnchored = verified && Boolean(credentialTrustPresentation(credential).anchorExplorerUrl);
  const hasWorkload = Number.isFinite(credential.learningHours) && credential.learningHours > 0;
  const hasAssessment = owner && Number.isFinite(credential.assessmentScore);
  const skills = credential.skills.slice(0, 4).map((skill) => skill.name).filter(Boolean);
  return (
    <LocalizedElement
      as="article"
      className={`diploma-document${verified ? "" : " diploma-inactive"}`}
      translate="no"
      aria-label="TGPI certificate preview"
    >
      <div className="diploma-corners" aria-hidden="true">
        {frameCorners.map((corner) => (
          <svg key={corner} className={`diploma-corner ${corner}`} viewBox="0 0 56 56" focusable="false">
            <path d="M2 54V2h52M7 42V7h35M13 31V13h18M13 23c0-6 4-10 10-10" />
            <path className="diploma-corner-diamond" d="m20 16 4 4-4 4-4-4z" />
          </svg>
        ))}
      </div>
      {!verified && (
        <div className="diploma-inactive-banner" role="status">
          <LocalizedText text={credential.status === "revoked"
            ? "REVOKED - This certificate is no longer active"
            : credential.status === "replaced"
              ? "REPLACED - Open the replacement record"
              : "INTEGRITY REVIEW - This record is not verified"} />
        </div>
      )}
      <div className="diploma-paper">
        <svg className="diploma-engraving" viewBox="0 0 360 360" aria-hidden="true" focusable="false">
          <circle cx="180" cy="180" r="145" />
          <circle cx="180" cy="180" r="136" strokeDasharray="1 5" />
          <g className="diploma-engraving-globe">
            <circle cx="180" cy="180" r="112" />
            {[40, 78].map((radius) => <ellipse key={radius} cx="180" cy="180" rx={radius} ry="112" />)}
            {[40, 78].map((radius) => <ellipse key={radius} cx="180" cy="180" rx="112" ry={radius} />)}
            <path d="M68 180h224M180 68v224m0-177 13 52 52 13-52 13-13 52-13-52-52-13 52-13z" />
          </g>
        </svg>
        <header className="diploma-brand">
          <Image src="/brand/tgpi-academic-crest-2026.svg" alt="" width={74} height={84} unoptimized />
          <strong><LocalizedText text="The Global Polymath Institute" /></strong>
          <small><LocalizedText text="Education for a global life" /></small>
        </header>
        <div className="diploma-main">
          <p className="diploma-eyebrow"><LocalizedText text="Assessed learning" /></p>
          <h2><LocalizedText text="Academic Certificate" /></h2>
          <div className="diploma-title-ornament" aria-hidden="true"><span />◇<span /></div>
          {credential.documentNature && <p className="diploma-document-nature">{credential.documentNature}</p>}
          <p className="diploma-label"><LocalizedText text="Awarded to" /></p>
          <p className="diploma-name"><bdi>{credential.publicName}</bdi></p>
          <p className="diploma-description"><LocalizedText text="For successful completion of the applied learning and assessed performance in" /></p>
          <h3 className="diploma-course">{credential.courseTitle}</h3>
          {skills.length > 0 && <p className="diploma-skills">{skills.join(" · ")}</p>}
        </div>
        <div className="diploma-attestation">
          <div className="diploma-institutional-mark">
            <CertificateSeal className="diploma-seal" sizes="(max-width: 680px) 110px, 140px" />
            <p><LocalizedText text="The Global Polymath Institute" /></p>
            <span><LocalizedText text="Issuer record" /></span>
          </div>
          <div className="diploma-record-summary">
            <dl className="diploma-metrics">
              <div>
                <dt><LocalizedText text="Issued" /></dt>
                <dd><CertificateIssueDate value={credential.issuedAt} /></dd>
              </div>
              {hasWorkload && <div>
                <dt><LocalizedText text={credential.automatedEvidence ? "estimated workload" : "Learning hours"} /></dt>
                <dd>{credential.learningHours}{" "}<LocalizedText text="hours" /></dd>
              </div>}
              {hasAssessment && <div>
                <dt><LocalizedText text={credential.automatedEvidence ? "Automatic assessment" : "Mastery"} /></dt>
                <dd>{credential.assessmentScore}%</dd>
              </div>}
            </dl>
            <dl className="diploma-identifiers">
              <div>
                <dt><LocalizedText text="Certificate ID" /></dt>
                <dd>{credential.id}</dd>
              </div>
              {owner && <div>
                <dt><LocalizedText text="TGPI Global ID" /></dt>
                <dd>{credential.identityEvidence.globalKeyId}</dd>
              </div>}
              {verified && credential.documentFingerprint && <div className="diploma-document-code">
                <dt><LocalizedText text="Document fingerprint" /></dt>
                <dd>{credential.documentFingerprint}</dd>
              </div>}
            </dl>
          </div>
          <aside className="diploma-verification" data-verified={verified}>
            <div className="diploma-integrity-heading">
              <Image src="/brand/tgpi-integrity-seal-2026.svg" alt="" width={64} height={64} unoptimized />
              <div><strong><LocalizedText text="TGPI Integrity Chain" /></strong><span><LocalizedText text={identityAnchored ? "Base Mainnet" : "Issuer record"} /></span></div>
            </div>
            <div className="diploma-verification-link">
              {privateSharing ? <div className="diploma-private-mark" aria-hidden="true">◇</div> : (
                <LocalizedElement as="a" className="diploma-qr" href={verificationUrl} aria-label="Open live verification">
                  <CertificateQr url={verificationUrl} id={credential.id} />
                </LocalizedElement>
              )}
              <p className="diploma-qr-caption">
                {privateSharing ? <CertificatePrivacyText /> : <LocalizedText text="Scan to verify" />}
                <span>{privateSharing ? <CertificatePrivacyText detail /> : <LocalizedText text="Live status · Issuer record" />}</span>
              </p>
            </div>
          </aside>
        </div>
        <footer className="diploma-footer">
          <p><LocalizedText text="TGPI-issued professional learning certificate. Not a government degree, professional license or third-party accreditation." /></p>
          <div><span><LocalizedText text="THEGLOBALPOLYMATH.COM" /></span><span><LocalizedText text="Document edition" /> {CERTIFICATE_DESIGN_VERSION}</span></div>
        </footer>
      </div>
    </LocalizedElement>
  );
}
