import { getRank } from "@/lib/rank-system";

export default function UserPatentCard({ xp }: { xp: number }) {
  const rank = getRank(Number(xp || 0));

  const descriptionMap: Record<string, string> = {
    Explorer: "Beginning the journey of global discovery and readiness.",
    Builder: "Building structure, knowledge, and visible progress.",
    Connector: "Creating meaningful links with people and opportunities.",
    Strategist: "Moving with stronger precision and international direction.",
    "Global Elite": "Operating with advanced positioning and visible readiness.",
    "TGPI Authority": "Top-tier global identity, trust, and progression signal.",
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">Current Patent</h2>

      <div className="mt-4 rounded-2xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Based on XP
        </p>

        <h3 className="mt-3 text-2xl font-bold text-white">{rank}</h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          {descriptionMap[rank] || "Progressing through the TGPI global ladder."}
        </p>

        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">XP</p>
          <p className="mt-1 text-lg font-bold text-yellow-400">
            {Number(xp || 0)}
          </p>
        </div>
      </div>
    </section>
  );
}