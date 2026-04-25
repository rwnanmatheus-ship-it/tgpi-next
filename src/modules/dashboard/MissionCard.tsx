export default function MissionCard() {
  return (
    <section className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-black p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-yellow-400">
        Current Mission
      </p>

      <h2 className="mt-3 text-2xl font-bold text-white">
        Build your global readiness
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        Continue preparing your profile, courses, country goals, and verified TGPI identity.
      </p>

      <div className="mt-5 h-2 rounded-full bg-white/10">
        <div className="h-2 w-[64%] rounded-full bg-yellow-500" />
      </div>

      <p className="mt-2 text-xs text-yellow-400">64% completed</p>
    </section>
  );
}