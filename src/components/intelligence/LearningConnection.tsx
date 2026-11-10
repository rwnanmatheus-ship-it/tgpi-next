
import { LocalizedText } from "@/components/localization/LocaleProvider";
import Link from "next/link";
export default function LearningConnection() {
  return <aside className="ig-banner"><p className="ig-eyebrow"><LocalizedText text={"Applied learning / Evidence to decision"} /></p><h2><LocalizedText text={"Learn the method. Apply it to your next move."} /></h2><p><LocalizedText text={"Distinguish a visa funds requirement from living costs, verify who awards a degree and build a dated budget. Use the decision dossiers as practical case studies, then record your own research."} /></p><div className="ig-actions"><Link href="/intelligence/research" className="ig-button"><LocalizedText text={"Explore decision dossiers →"} /></Link><Link href="/intelligence#learning" className="ig-button ig-secondary"><LocalizedText text={"Practice evidence literacy"} /></Link><Link href="/country-fit#research-workbench" className="ig-link"><LocalizedText text={"Build my personal scenario →"} /></Link></div></aside>;
}
