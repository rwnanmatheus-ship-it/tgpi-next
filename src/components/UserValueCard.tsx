
import { LocalizedText } from "@/components/localization/LocaleProvider";
export default function UserValueCard() {
  return (
    <div className="card">
      <h3><LocalizedText text={"Account Value"} /></h3>
      <p><LocalizedText text={"High potential global user"} /></p>
    </div>
  );
}