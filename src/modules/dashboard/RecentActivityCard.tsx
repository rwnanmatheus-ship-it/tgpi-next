const activity = [
  "Profile identity updated",
  "Japan pathway viewed",
  "Currency explorer opened",
  "AI Advisor activated",
];

export default function RecentActivityCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-bold text-white">Recent Activity</h2>

      <div className="mt-4 space-y-3">
        {activity.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}