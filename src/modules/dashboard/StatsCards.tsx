const stats = [
  ["Countries Explored", "24"],
  ["Courses in Progress", "8"],
  ["Study Hours", "184h"],
  ["Achievements", "17"],
];

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map(([title, value]) => (
        <div
          key={title}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-bold text-yellow-400">{value}</p>
        </div>
      ))}
    </div>
  );
}