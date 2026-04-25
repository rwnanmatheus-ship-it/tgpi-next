import Link from "next/link";

const stats = [
  { icon: "🎓", value: "120+", label: "Courses" },
  { icon: "🌐", value: "195", label: "Countries" },
  { icon: "👥", value: "50K+", label: "Students" },
  { icon: "⭐", value: "4.9", label: "Rating" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617] px-4 py-8 text-white">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-yellow-500/20 bg-[#030712] shadow-[0_0_80px_rgba(250,204,21,0.06)]">
        <div className="relative min-h-[780px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-95"
            style={{
              backgroundImage: "url('/tgpi-global-hero.png')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />

          <div className="relative z-10 grid min-h-[780px] items-center gap-10 px-8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <div className="max-w-2xl">
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">
                Welcome to TGPI
              </p>

              <h1 className="text-5xl font-black leading-[1.05] md:text-7xl">
                Your journey starts here.
                <br />
                The world is your{" "}
                <span className="text-yellow-400">next step.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
                Learn languages, understand cultures, and build global skills to
                live, work, study, and thrive anywhere in the world.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/countries"
                  className="rounded-2xl bg-yellow-500 px-8 py-4 text-center text-lg font-bold text-black shadow-[0_0_35px_rgba(250,204,21,0.25)] transition hover:bg-yellow-400"
                >
                  Explore Countries →
                </Link>

                <Link
                  href="/courses"
                  className="rounded-2xl border border-white/30 bg-black/30 px-8 py-4 text-center text-lg font-bold text-white backdrop-blur transition hover:border-yellow-400 hover:text-yellow-400"
                >
                  View Courses
                </Link>
              </div>
            </div>

            <div />
          </div>

          <div className="relative z-10 mx-8 mb-10 rounded-3xl border border-white/10 bg-[#07111f]/90 p-6 backdrop-blur-xl lg:mx-12">
            <div className="grid gap-5 md:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10 text-3xl text-yellow-400">
                    {item.icon}
                  </div>

                  <div>
                    <p className="text-3xl font-black text-white">
                      {item.value}
                    </p>
                    <p className="text-sm text-slate-300">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}