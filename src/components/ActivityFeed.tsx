export default function ActivityFeed() {
  const items = [
    "User joined Canada room",
    "Profile updated",
    "XP increased",
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl text-yellow-400 font-bold">Activity</h2>

      <div className="mt-4 space-y-3">
        {items.map((item, i) => (
          <p key={i} className="text-sm text-slate-300">
            • {item}
          </p>
        ))}
      </div>
    </div>
  );
}