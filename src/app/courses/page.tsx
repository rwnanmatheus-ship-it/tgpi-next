import TGPIPageShell from "@/components/TGPIPageShell";
import { tgpiImages } from "@/data/tgpi-images";

const courses = [
  {
    title: "Leadership & Management",
    desc: "Develop leadership, strategy, and execution skills.",
    meta: "Global strategy · 6 weeks",
    image: tgpiImages.leadership,
  },
  {
    title: "Philosophy & Critical Thinking",
    desc: "Analyze ideas, arguments, and decisions with clarity.",
    meta: "Mindset · 4 weeks",
    image: tgpiImages.philosophy,
  },
  {
    title: "Technology & Future",
    desc: "Explore AI, automation, and emerging industries.",
    meta: "Technology · 8 weeks",
    image: tgpiImages.technology,
  },
  {
    title: "Global Economics",
    desc: "Understand markets, currencies, and international systems.",
    meta: "Economics · 8 weeks",
    image: tgpiImages.globe,
  },
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
          Learn with premium global content across leadership, culture, technology, and international readiness.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-4">
        {courses.map((course) => (
          <article
            key={course.title}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-[#07111f] transition hover:border-yellow-500/40"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${course.image})` }}
            />

            <div className="p-5">
              <h2 className="font-bold text-white">{course.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{course.desc}</p>
              <p className="mt-4 text-xs text-yellow-400">{course.meta}</p>

              <button className="mt-5 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
                Start course
              </button>
            </div>
          </article>
        ))}
      </section>
    </TGPIPageShell>
  );
}