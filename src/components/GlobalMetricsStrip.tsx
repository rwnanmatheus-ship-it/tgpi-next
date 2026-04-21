const metrics = [
  { label: "Global identities being built", value: "Growing" },
  { label: "Destination-focused journeys", value: "Multi-country" },
  { label: "Public trust signals", value: "Active" },
  { label: "Community movement", value: "Live" },
];

export default function GlobalMetricsStrip() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {metric.label}
            </p>
            <p className="mt-2 text-xl font-bold text-yellow-400">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}