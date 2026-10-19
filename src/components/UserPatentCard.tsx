import Link from "next/link";

/** Legacy XP is retained for history and never converted into earned ranks. */
export default function UserPatentCard({ xp }: { xp: number }) {
  const legacyXp = Number.isFinite(xp) ? Math.max(0, Math.floor(xp)) : 0;
  return <section className="rounded-3xl border border-[#D8D2C4] bg-[#F8F5EE] p-6 text-[#0B1F3A]"><h2 className="text-xl font-bold">TGPI Progression II</h2><p className="mt-3 text-sm leading-7">Ranks now use completed learning, research and your personal plan. Legacy XP is kept separately and does not unlock a rank.</p><p className="mt-4 text-sm">Historical XP: {legacyXp}</p><Link className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[#0B1F3A] px-4 text-sm font-bold text-white" href="/ranking">Open my progress →</Link></section>;
}
