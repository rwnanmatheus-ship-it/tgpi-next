import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import Image from "@/components/localization/LocalizedImage";
import CertificateQr from "./CertificateQr";
import CertificateSeal from "./CertificateSeal";
import { CertificateIssueDate, CertificatePrivacyText } from "./CertificatePresentationText";
import { CERTIFICATE_DESIGN_VERSION, CERTIFICATE_QUALITY_MARKS } from "@/lib/certificate-presentation";
import type { PublicTgpiLearningCredential } from "@/types/learning";

const frameCorners = ["top-left", "top-right", "bottom-right", "bottom-left"] as const;
const engravingPaths = Array.from({ length: 9 }, (_, ring) => {
  const points = Array.from({ length: 144 }, (_, point) => {
    const angle = point * Math.PI / 72;
    const radius = 118 + ring * 4.4 + 15 * Math.cos(angle * 12 + ring * .14)
      + 4 * Math.sin(angle * 24 - ring * .19);
    return `${(180 + radius * Math.cos(angle)).toFixed(1)} ${(180 + radius * Math.sin(angle)).toFixed(1)}`;
  });
  return `M${points.join("L")}Z`;
});

export default function CertificateDocument({
  credential,
  verified,
  verificationUrl,
}: {
  credential: PublicTgpiLearningCredential;
  verified: boolean;
  verificationUrl: string;
}) {
  const privateSharing = credential.professionalEvidence?.sharing === false;
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
            <path d="M1 55V1h54M5 45V5h40M9 33V9h24M13 28c0-8 7-15 15-15m-15 9c0-5 4-9 9-9" />
            <path className="diploma-corner-diamond" d="m18 13 5 5-5 5-5-5z" />
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
          {engravingPaths.map((path, index) => <path key={index} d={path} />)}
          <g className="diploma-engraving-globe">
            <circle cx="180" cy="180" r="111" strokeDasharray="1 3" />
            <circle cx="180" cy="180" r="99" />
            {[35, 72].map((radius) => <ellipse key={radius} cx="180" cy="180" rx={radius} ry="99" />)}
            {[36, 69].map((radius) => <ellipse key={radius} cx="180" cy="180" rx="99" ry={radius} />)}
            <path d="M81 180h198M180 81v198m0-170 14 57 57 14-57 14-14 57-14-57-57-14 57-14z" />
          </g>
        </svg>
        <header className="diploma-brand">
          <Image src="/brand/tgpi-crest-metal-v3.webp" alt="" width={54} height={66} />
          <div>
            <strong><LocalizedText text="The Global Polymath Institute" /></strong>
            <small><LocalizedText text="Education for a global life" /></small>
          </div>
        </header>
        <div className="diploma-main">
          <p className="diploma-eyebrow"><LocalizedText text="TGPI · Verified learning" /></p>
          <h2><LocalizedText text="Academic Certificate" /></h2>
          {credential.documentNature && <p className="diploma-document-nature">{credential.documentNature}</p>}
          <p className="diploma-label"><LocalizedText text="Awarded to" /></p>
          <p className="diploma-name"><bdi>{credential.publicName}</bdi></p>
          <p className="diploma-description"><LocalizedText text="For successful completion of the applied learning and assessed performance in" /></p>
          <h3 className="diploma-course">{credential.courseTitle}</h3>
          <p className="diploma-skills">
            {credential.skills.slice(0, 3).map((skill) => skill.name).join(" · ")}
          </p>
        </div>
        <dl className="diploma-metrics">
          <div>
            <dt><LocalizedText text="Issued" /></dt>
            <dd><CertificateIssueDate value={credential.issuedAt} /></dd>
          </div>
          <div>
            <dt><LocalizedText text={credential.automatedEvidence ? "Automatic assessment" : "Mastery"} /></dt>
            <dd>{credential.assessmentScore}%</dd>
          </div>
          <div>
            <dt><LocalizedText text={credential.automatedEvidence ? "estimated workload" : "Learning hours"} /></dt>
            <dd>{credential.learningHours}{" "}<LocalizedText text="hours" /></dd>
          </div>
        </dl>
        <dl className="diploma-identifiers">
          <div>
            <dt><LocalizedText text="TGPI Global ID" /></dt>
            <dd>{credential.identityEvidence.globalKeyId}</dd>
          </div>
          <div>
            <dt><LocalizedText text="Certificate ID" /></dt>
            <dd>{credential.id}</dd>
          </div>
          {verified && credential.documentFingerprint && (
            <div className="diploma-document-code">
              <dt><LocalizedText text="Document fingerprint" /></dt>
              <dd>{credential.documentFingerprint}</dd>
            </div>
          )}
        </dl>
        <footer className="diploma-footer">
          <div className="diploma-quality-marks">
            {CERTIFICATE_QUALITY_MARKS.map((mark, index) => (
              <div key={mark.title}>
                <span aria-hidden="true">{["◇", "✦", "⌖"][index]}</span>
                <div>
                  <strong>{privateSharing && mark.title === "Public verification" ? <CertificatePrivacyText /> : <LocalizedText text={mark.title} />}</strong>
                  <small>{privateSharing && mark.title === "Public verification" ? <CertificatePrivacyText detail /> : <LocalizedText text={mark.detail} />}</small>
                </div>
              </div>
            ))}
          </div>
          <p><LocalizedText text="TGPI-issued professional learning certificate. Not a government degree, professional license or third-party accreditation." /></p>
          <p><LocalizedText text="Document edition" />{" "}{CERTIFICATE_DESIGN_VERSION}</p>
        </footer>
      </div>
      <aside className="diploma-verification">
        <p className="diploma-rail-brand">TGPI</p>
        <p className="diploma-rail-label"><LocalizedText text="TGPI issuer quality seal" /></p>
        <div className="diploma-seal-stage"><CertificateSeal className="diploma-seal" /></div>
        <div className="diploma-verification-link">
          {privateSharing ? (
            <div className="diploma-private-mark" aria-hidden="true">◇</div>
          ) : (
            <LocalizedElement as="a" className="diploma-qr" href={verificationUrl} aria-label="Open live verification">
              <CertificateQr url={verificationUrl} id={credential.id} />
            </LocalizedElement>
          )}
          <p className="diploma-qr-caption">
            {privateSharing ? <CertificatePrivacyText /> : <LocalizedText text="Scan to verify" />}
            <span>{privateSharing ? <CertificatePrivacyText detail /> : <LocalizedText text="Live status · Issuer record" />}</span>
          </p>
        </div>
        <p className="diploma-rail-site"><LocalizedText text="theglobalpolymath.com" /></p>
      </aside>
    </LocalizedElement>
  );
}
