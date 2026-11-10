
import { LocalizedText } from "@/components/localization/LocaleProvider";
export default function CertificateCard() {
  return (
    <div className="card">
      <h3><LocalizedText text={"TGPI Certificate"} /></h3>
      <p><LocalizedText text={"Verified Completion"} /></p>
    </div>
  );
}