
import { LocalizedText } from "@/components/localization/LocaleProvider";
export default function ReadinessGaps() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h3 className="text-yellow-400 font-bold"><LocalizedText text={"Readiness Gaps"} /></h3>

      <p className="text-sm text-slate-300 mt-2"><LocalizedText text={"Missing: language proof, financial proof, documentation planning."} /></p>
    </div>
  );
}