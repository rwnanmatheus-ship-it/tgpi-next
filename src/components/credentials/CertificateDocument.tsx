
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import Image from "@/components/localization/LocalizedImage";
import CertificateQr from "./CertificateQr";
import CertificateSeal from "./CertificateSeal";
import {
  CERTIFICATE_DESIGN_VERSION,
  CERTIFICATE_QUALITY_MARKS,
  certificateDate,
  certificateVerificationUrl,
} from "@/lib/certificate-presentation";
import type { PublicTgpiLearningCredential } from "@/types/learning";
import { LocalizedText } from "@/components/localization/LocaleProvider";


export default function CertificateDocument({
  credential,
  verified,
}: {
  credential: PublicTgpiLearningCredential;
  verified: boolean;
}) {
  return (
    <LocalizedElement as="article"
      className={`diploma-document${verified ? "" : " diploma-inactive"}`}
      aria-label="TGPI certificate preview"
    >
      <header className="diploma-brand">
        <div className="diploma-brand-main">
          <Image
            src="/brand/tgpi-crest-metal-v3.webp"
            alt="TGPI institutional crest"
            width={72}
            height={88}
            priority
          />
          <div>
            <strong><LocalizedText text={"TGPI"} /></strong>
            <span><LocalizedText text={"The Global Polymath Institute"} /></span>
            <small><LocalizedText text="Education for a global life" /></small>
          </div>
        </div>
        <span className="diploma-brand-edition"><LocalizedText text={"Verified learning"} /><br /><LocalizedText text={"Professional achievement"} /></span>
      </header>
      {!verified && (
        <div className="diploma-inactive-banner" role="status">
          {credential.status === "revoked"
            ? <LocalizedText text={"REVOKED - This certificate is no longer active"} />
            : credential.status === "replaced" ? <LocalizedText text={"REPLACED - Open the replacement record"} /> : <LocalizedText text={"INTEGRITY REVIEW - This record is not verified"} />}
        </div>
      )}
      <div className="diploma-body">
        <div className="diploma-main">
          <p className="diploma-eyebrow"><LocalizedText text={"Certificate of achievement"} /></p>
          <h2>{credential.documentNature || <LocalizedText text={"Professional Certificate"} />}</h2>
          <p className="diploma-label"><LocalizedText text={"Awarded to"} /></p>
          <p className="diploma-name">{credential.publicName}</p>
          <p className="diploma-description"><LocalizedText text={"For successful completion of the applied learning and assessed performance in"} /></p>
          <h3 className="diploma-course">{credential.courseTitle}</h3>
          <p className="diploma-skills">
            {credential.skills
              .slice(0, 3)
              .map((skill) => skill.name)
              .join(" / ")}
          </p>
        </div>
        <aside className="diploma-verification">
          <CertificateSeal verified={verified} />
          <p className="diploma-seal-caption"><LocalizedText text={"TGPI issuer quality seal"} /></p>
          <LocalizedElement as="a"
            className="diploma-qr"
            href={certificateVerificationUrl(credential.id)}
            aria-label="Open live verification"
          >
            <CertificateQr
              url={certificateVerificationUrl(credential.id)}
              id={credential.id}
            />
          </LocalizedElement>
          <p className="diploma-qr-caption"><LocalizedText text="Scan to verify" /><br />
            <span><LocalizedText text={"Live status · Issuer record"} /></span>
          </p>
        </aside>
      </div>
      <dl className="diploma-identifiers">
        <div className="diploma-global-id">
          <dt><LocalizedText text={"TGPI Global ID"} /></dt>
          <dd>{credential.identityEvidence.globalKeyId}</dd>
        </div>
        <div className="diploma-certificate-id">
          <dt><LocalizedText text="Certificate ID" /></dt>
          <dd>{credential.id}</dd>
        </div>
        <div>
          <dt><LocalizedText text="Issued" /></dt>
          <dd>{certificateDate(credential.issuedAt)}</dd>
        </div>
        <div>
          <dt><LocalizedText text={"Mastery"} /></dt>
          <dd>{credential.assessmentScore}%</dd>
        </div>
        <div>
          <dt><LocalizedText text={"Volume"} /></dt>
          <dd>{credential.learningHours}{" "}<LocalizedText text={"hours"} /></dd>
        </div>
      </dl>
      <footer className="diploma-footer">
        <div className="diploma-quality-marks">
          {CERTIFICATE_QUALITY_MARKS.map((mark) => (
            <div key={mark.title}>
              <span aria-hidden="true">{verified ? "✓" : "·"}</span>
              <div>
                <strong><LocalizedText text={mark.title} /></strong>
                <small><LocalizedText text={mark.detail} /></small>
              </div>
            </div>
          ))}
        </div>
        <p><LocalizedText text={"TGPI-issued professional learning certificate. Not a government degree, professional license or third-party accreditation."} /></p>
        <div className="diploma-edition">
          <span><LocalizedText text={"Document edition"} />{" "}{CERTIFICATE_DESIGN_VERSION}{" "}<LocalizedText text={"· Original achievement preserved"} /></span>
          <span><LocalizedText text={"theglobalpolymath.com"} /></span>
        </div>
      </footer>
    </LocalizedElement>
  );
}
