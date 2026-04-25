import TGPIPageShell from "@/components/TGPIPageShell";

const courses = [
  ["Leadership & Management", "Develop leaders and high-performance teams.", "Global strategy · 6 weeks", "🏔️"],
  ["Philosophy & Critical Thinking", "Question, analyze, and make better decisions.", "Mindset · 4 weeks", "🗿"],
  ["Global Economics", "Understand markets, currencies, and global forces.", "Finance · 8 weeks", "🌍"],
  ["History of Civilizations", "Explore major shifts and cultural legacies.", "History · 6 weeks", "🏛️"],
  ["Science & Innovation", "Connect research, discovery, and future systems.", "STEM · 7 weeks", "🧪"],
  ["Art & Aesthetics", "Decode beauty, symbols, and creative culture.", "Culture · 5 weeks", "🎨"],
  ["Applied Psychology", "Understand people, behavior, and motivation.", "Human skills · 6 weeks", "🧠"],
  ["Technology & Future", "Explore AI, automation, and emerging industries.", "Technology · 8 weeks", "🤖"],
];

export default function CoursesPage() {
  return (
    <TGPIPageShell>
      <section className="mb-8">
        <p className="text-sm text-slate-500">Home › Courses</p>
        <h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight">
          Courses to expand your <span className="text-yellow-400">horizons</span>
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Learn with high-impact content across multiple areas of knowledge.
        </p>

        <input
          placeholder="Search courses..."
          className="mt-6 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-yellow-500/40"
        />

        <div className="mt-5 flex flex-wrap gap-3">
          {["All areas", "Level", "Format", "Duration"].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:border-yellow-500/40 hover:text-yellow-400"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {courses.map(([title, desc, meta, icon]) => (
          <article
            key={title}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-[#07111f] transition hover:border-yellow-500/40"
          >
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-yellow-500/20 to-blue-900/30 text-6xl">
              {icon}
            </div>

            <div className="p-5">
              <h2 className="font-bold text-white">{title}</h2>
              <p className="mt-2 text-sm text-slate-400">{desc}</p>
              <p className="mt-4 text-xs text-yellow-400">{meta}</p>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>⭐ 4.9</span>
                <span className="rounded-full bg-yellow-500 px-3 py-1 font-bold text-black">
                  Start
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </TGPIPageShell>
  );
}