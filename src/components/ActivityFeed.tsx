const activityItems = [
  {
    user: "Renan Matheus",
    action: "completed English for Living Abroad",
    time: "2 hours ago",
  },
  {
    user: "Sophia Carter",
    action: "reached Level 3",
    time: "4 hours ago",
  },
  {
    user: "Lucas Bennett",
    action: "explored Portugal and Canada",
    time: "6 hours ago",
  },
  {
    user: "Emma Wilson",
    action: "earned the Identity Built badge",
    time: "Today",
  },
];

export default function ActivityFeed() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">Community Activity</h2>
      <p className="mt-2 text-slate-400">
        Follow progress and learning moments across the platform.
      </p>

      <div className="mt-6 space-y-4">
        {activityItems.map((item) => (
          <div
            key={`${item.user}-${item.action}`}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <p className="text-white">
              <span className="font-semibold text-yellow-300">{item.user}</span>{" "}
              {item.action}
            </p>
            <p className="mt-1 text-sm text-slate-400">{item.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}