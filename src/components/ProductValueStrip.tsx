export default function ProductValueStrip() {
  const items = [
    "Global Education",
    "Country Intelligence",
    "Gamified Growth",
    "AI Signals",
    "Premium Readiness",
  ];

  return (
    <section className="rounded-2xl border border-yellow-700/20 bg-gradient-to-r from-yellow-500/10 to-slate-950 p-6">
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}