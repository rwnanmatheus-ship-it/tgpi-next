import Image from "next/image";
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
    <article
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
            <strong>TGPI</strong>
            <span>The Global Polymath Institute</span>
            <small><LocalizedText text="Education for a global life" /></small>
          </div>
        </div>
        <span className="diploma-brand-edition">
          Verified learning
          <br />
          Professional achievement
        </span>
      </header>
      {!verified && (
        <div className="diploma-inactive-banner" role="status">
          {credential.status === "revoked"
            ? "REVOKED - This certificate is no longer active"
            : "INTEGRITY REVIEW - This record is not verified"}
        </div>
      )}
      <div className="diploma-body">
        <div className="diploma-main">
          <p className="diploma-eyebrow">Certificate of achievement</p>
          <h2>Professional Certificate</h2>
          <p className="diploma-label">Awarded to</p>
          <p className="diploma-name">{credential.publicName}</p>
          <p className="diploma-description">
            For successful completion of the applied learning and assessed
            performance in
          </p>
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
          <p className="diploma-seal-caption">TGPI issuer quality seal</p>
          <a
            className="diploma-qr"
            href={certificateVerificationUrl(credential.id)}
            aria-label="Open live verification"
          >
            <CertificateQr
              url={certificateVerificationUrl(credential.id)}
              id={credential.id}
            />
          </a>
          <p className="diploma-qr-caption"><LocalizedText text="Scan to verify" /><br />
            <span>Live status · Issuer record</span>
          </p>
        </aside>
      </div>
      <dl className="diploma-identifiers">
        <div className="diploma-global-id">
          <dt>TGPI Global ID</dt>
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
          <dt>Mastery</dt>
          <dd>{credential.assessmentScore}%</dd>
        </div>
        <div>
          <dt>Volume</dt>
          <dd>{credential.learningHours} hours</dd>
        </div>
      </dl>
      <footer className="diploma-footer">
        <div className="diploma-quality-marks">
          {CERTIFICATE_QUALITY_MARKS.map((mark) => (
            <div key={mark.title}>
              <span aria-hidden="true">{verified ? "✓" : "·"}</span>
              <div>
                <strong>{mark.title}</strong>
                <small>{mark.detail}</small>
              </div>
            </div>
          ))}
        </div>
        <p>
          TGPI-issued professional learning certificate. Not a government
          degree, professional license or third-party accreditation.
        </p>
        <div className="diploma-edition">
          <span>
            Document edition {CERTIFICATE_DESIGN_VERSION} · Original achievement
            preserved
          </span>
          <span>theglobalpolymath.com</span>
        </div>
      </footer>
    </article>
  );
}
