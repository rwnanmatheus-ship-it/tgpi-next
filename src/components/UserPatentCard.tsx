
import { LocalizedText } from "@/components/localization/LocaleProvider";
import Link from "next/link";

/** Legacy XP is retained for history and never converted into earned ranks. */
export default function UserPatentCard({ xp }: { xp: number }) {
  const legacyXp = Number.isFinite(xp) ? Math.max(0, Math.floor(xp)) : 0;
  return <section className="rounded-3xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas-alt)] p-6 text-[var(--tgpi-navy-raised)]"><h2 className="text-xl font-bold"><LocalizedText text={"TGPI Progression II"} /></h2><p className="mt-3 text-sm leading-7"><LocalizedText text={"Ranks now use completed learning, research and your personal plan. Legacy XP is kept separately and does not unlock a rank."} /></p><p className="mt-4 text-sm"><LocalizedText text={"Historical XP:"} />{" "}{legacyXp}</p><Link className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[var(--tgpi-navy-raised)] px-4 text-sm font-bold text-white" href="/ranking"><LocalizedText text={"Open my progress →"} /></Link></section>;
}
