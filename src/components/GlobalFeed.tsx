
import { LocalizedText } from "@/components/localization/LocaleProvider";
export default function GlobalFeed() {
  return (
    <div className="card">
      <p><LocalizedText text={"Users exploring Canada 🇨🇦"} /></p>
      <p><LocalizedText text={"Users moving to Portugal 🇵🇹"} /></p>
    </div>
  );
}