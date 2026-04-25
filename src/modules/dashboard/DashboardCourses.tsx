const courses = [
  { title: "Japanese for Beginners", level: "A2", progress: "30%" },
  { title: "Brazilian Portuguese", level: "B1", progress: "45%" },
  { title: "Modern Arabic", level: "A1", progress: "15%" },
  { title: "Business English", level: "B2", progress: "60%" },
];

export default function DashboardCourses() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Continue Learning</h2>
        <a href="/courses" className="text-sm text-yellow-400">
          View all
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {courses.map((course) => (
          <div
            key={course.title}
            className="rounded-2xl border border-white/10 bg-black/40 p-4"
          >
            <div className="mb-3 flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-blue-900/30 text-4xl">
              ▶️
            </div>

            <p className="font-semibold text-white">{course.title}</p>
            <p className="mt-1 text-xs text-slate-400">{course.level}</p>

            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-yellow-500"
                style={{ width: course.progress }}
              />
            </div>

            <p className="mt-2 text-xs text-yellow-400">{course.progress}</p>
          </div>
        ))}
      </div>
    </section>
  );
}