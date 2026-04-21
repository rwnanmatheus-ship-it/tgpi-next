type GlobalMomentumProps = {
  score: number;
  readiness: number;
  countries: number;
  certificates: number;
};

export default function GlobalMomentum({
  score,
  readiness,
  countries,
  certificates,
}: GlobalMomentumProps) {
  const momentum = Math.min(
    100,
    Math.floor(score * 0.2 + readiness * 0.5 + countries * 6 + certificates * 8)
  );

  const status =
    momentum >= 85
      ? "Global Velocity"
      : momentum >= 65
      ? "Strong International Momentum"
      : momentum >= 40
      ? "Growing International Momentum"
      : "Early Global Momentum";

  return (
    <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8 text-white">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="mb-3 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Global Momentum
          </p>

          <h2 className="text-3xl font-bold text-yellow-400">{momentum}/100</h2>
          <p className="mt-2 text-slate-300">{status}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Momentum State
          </p>
          <p className="mt-2 text-lg font-bold text-white">{status}</p>
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
            style={{ width: `${momentum}%` }}
          />
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          Momentum reflects how strongly your TGPI identity is turning into real
          international positioning. It rises through exploration, certificates,
          readiness, and visible progress.
        </p>
      </div>
    </section>
  );
}