export default function LiveRanking({ users }: { users: any[] }) {
  const top = users.slice(0, 5);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Live Ranking
      </h2>

      <div className="mt-4 space-y-3">
        {top.map((u, i) => (
          <div
            key={i}
            className="flex justify-between rounded-xl border border-slate-800 p-3"
          >
            <span>{u.name}</span>
            <span className="text-yellow-400">{u.globalScore}</span>
          </div>
        ))}
      </div>
    </section>
  );
}