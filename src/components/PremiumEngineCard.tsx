
import { LocalizedText } from "@/components/localization/LocaleProvider";
import Link from "next/link";

export default function PremiumEngineCard() {
  return (
    <section className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-black p-5">
      <p className="text-sm uppercase tracking-[0.25em] text-yellow-400"><LocalizedText text={"Premium Engine"} /></p>

      <h2 className="mt-3 text-2xl font-bold"><LocalizedText text={"Unlock TGPI Elite Level"} /></h2>

      <p className="mt-3 text-sm text-slate-400"><LocalizedText text={"Access premium certificates, verified identity, advanced resources, and global planning tools."} /></p>

      <Link
        href="/premium"
        className="mt-5 block rounded-xl bg-yellow-500 px-5 py-3 text-center font-bold text-black"
      ><LocalizedText text={"View plans"} /></Link>
    </section>
  );
}