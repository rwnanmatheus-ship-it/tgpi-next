export default function SmartFeed({ user }: { user: any }) {
  const feed = [
    `People are moving to ${user.targetCountry}`,
    `Users with same goal: ${user.travelIntent}`,
    `Your readiness is evolving`,
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-yellow-400 font-bold">Your Global Feed</h2>

      <div className="mt-4 space-y-2">
        {feed.map((f, i) => (
          <p key={i} className="text-sm text-slate-300">
            • {f}
          </p>
        ))}
      </div>
    </section>
  );
}