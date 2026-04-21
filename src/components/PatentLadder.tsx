import { getRank } from "@/lib/rank-system";

const ladder = [
  { minXp: 0, name: "Explorer" },
  { minXp: 50, name: "Builder" },
  { minXp: 150, name: "Connector" },
  { minXp: 300, name: "Strategist" },
  { minXp: 600, name: "Global Elite" },
  { minXp: 1000, name: "TGPI Authority" },
];

export default function PatentLadder({ xp }: { xp: number }) {
  const current = getRank(xp);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">
        TGPI Patent Ladder
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        Your patent reflects your visible level of movement, progress, and
        strategic global readiness.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ladder.map((item) => (
          <div
            key={item.name}
            className={`rounded-2xl border p-5 ${
              item.name === current
                ? "border-yellow-500 bg-yellow-500/10"
                : "border-slate-800 bg-slate-950"
            }`}
          >
            <p className="text-sm text-slate-400">Starts at {item.minXp} XP</p>
            <p className="mt-2 text-lg font-bold text-white">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}