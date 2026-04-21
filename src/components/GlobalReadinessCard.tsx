import { getReadinessTier } from "@/lib/calculate-global-readiness";

type GlobalReadinessCardProps = {
  score: number;
};

export default function GlobalReadinessCard({
  score,
}: GlobalReadinessCardProps) {
  const tier = getReadinessTier(score);

  return (
    <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="mb-3 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Global Readiness
          </p>

          <h2 className="text-3xl font-bold text-yellow-400">{score}/100</h2>
          <p className="mt-2 text-slate-300">{tier}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Current Tier
          </p>
          <p className="mt-2 text-lg font-bold text-white">{tier}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
          <span>0</span>
          <span>100</span>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-yellow-500 transition-all"
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          Your readiness score reflects global progression across learning,
          countries explored, profile quality, and completion signals.
        </p>
      </div>
    </section>
  );
}