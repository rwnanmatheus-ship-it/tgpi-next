
import { LocalizedText } from "@/components/localization/LocaleProvider";
export default function SmartAdvisor() {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
      <h3 className="text-yellow-400 font-bold"><LocalizedText text={"Smart Advisor"} /></h3>

      <p className="text-sm text-white mt-2"><LocalizedText text={"Focus on increasing XP, joining rooms and strengthening your profile."} /></p>
    </div>
  );
}