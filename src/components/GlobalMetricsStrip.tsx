export default function GlobalMetricsStrip() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Metric label="Users" value="Growing" />
      <Metric label="Countries" value="Global" />
      <Metric label="Profiles" value="Active" />
      <Metric label="Momentum" value="Rising" />
    </section>
  );
}

function Metric({ label, value }: any) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-lg font-bold text-yellow-400">{value}</p>
    </div>
  );
}