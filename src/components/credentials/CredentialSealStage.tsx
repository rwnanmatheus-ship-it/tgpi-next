import CertificateSeal from "./CertificateSeal";
import { LocalizedText } from "@/components/localization/LocaleProvider";

export default function CredentialSealStage() {
  return (
    <figure className="credential-seal-stage">
      <div className="credential-seal-orbit" aria-hidden="true"><i /><i /><i /></div>
      <CertificateSeal className="credential-stage-medal" priority sizes="(max-width: 760px) 168px, 330px" />
      <figcaption><span aria-hidden="true">✦</span> <LocalizedText text="TGPI issuer quality seal" /></figcaption>
    </figure>
  );
}
