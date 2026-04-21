export default function LiveActivityFeed() {
  const activities = [
    "User started learning German 🇩🇪",
    "User selected Canada as destination 🇨🇦",
    "User completed a TGPI certificate",
    "User increased readiness score",
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Live Activity
      </h2>

      <div className="mt-4 space-y-2">
        {activities.map((a, i) => (
          <p key={i} className="text-sm text-slate-300">
            • {a}
          </p>
        ))}
      </div>
    </section>
  );
}