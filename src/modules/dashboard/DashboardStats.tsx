const stats = [
  { title: "Countries Explored", value: "24", subtitle: "of 195 countries" },
  { title: "Courses in Progress", value: "8", subtitle: "keep learning" },
  { title: "Study Hours", value: "184h", subtitle: "+12h this week" },
  { title: "Achievements", value: "17", subtitle: "view all" },
  { title: "Streak", value: "21 days", subtitle: "keep the rhythm 🔥" },
];

export default function DashboardStats() {
  return (
    <section className="grid gap-4 md:grid-cols-5">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <p className="text-sm text-slate-400">{item.title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
          <p className="mt-1 text-xs text-yellow-400">{item.subtitle}</p>
        </div>
      ))}
    </section>
  );
}