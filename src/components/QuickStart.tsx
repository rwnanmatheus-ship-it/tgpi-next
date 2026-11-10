
import { LocalizedText } from "@/components/localization/LocaleProvider";
export default function QuickStart() {
  return (
    <div className="rounded-2xl border border-slate-800 p-5 bg-slate-900">
      <h3 className="text-yellow-400 font-bold"><LocalizedText text={"Quick Start"} /></h3>

      <ul className="mt-3 text-sm text-slate-300 space-y-2">
        <li><LocalizedText text={"• Complete your profile"} /></li>
        <li><LocalizedText text={"• Choose a destination"} /></li>
        <li><LocalizedText text={"• Join a country room"} /></li>
      </ul>
    </div>
  );
}