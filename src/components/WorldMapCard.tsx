
import { LocalizedText } from "@/components/localization/LocaleProvider";
export default function WorldMapCard() {
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
      <h2 className="text-lg font-bold mb-3"><LocalizedText text={"Mapa Global"} /></h2>

      <div className="h-64 bg-black/40 rounded-xl flex items-center justify-center text-slate-500"><LocalizedText text={"Mapa interativo (fase 2)"} /></div>
    </div>
  );
}