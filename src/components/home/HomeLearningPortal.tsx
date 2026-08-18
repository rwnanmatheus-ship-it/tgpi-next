import Link from "next/link";
import { coursesOverview } from "@/data/courses-overview";

const deviceModes = [
  {
    label: "On mobile",
    title: "Discover and keep moving",
    description: "Explore paths, review shorter content and check your progress wherever you are.",
  },
  {
    label: "On desktop",
    title: "Study with full focus",
    description: "Use the complete workspace for long lessons, exercises, notes and multi-step activities.",
  },
] as const;

export default function HomeLearningPortal() {
  return (
    <section className="border-y border-[var(--tgpi-border)] bg-[#f1eadc] px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="home-learning-title">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
              TGPI Learning
            </p>
            <h2 id="home-learning-title" className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] text-[var(--tgpi-ink)]">
              Learn anywhere. Go deeper on desktop.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">
              TGPI stays available on mobile, while the desktop experience is recommended for focused study and more demanding course activities.
            </p>

            <div className="mt-7 grid gap-3">
              {deviceModes.map((mode) => (
                <div key={mode.label} className="rounded-[22px] border border-[var(--tgpi-border)] bg-white p-5">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">{mode.label}</p>
                  <h3 className="mt-2 font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)]">{mode.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--tgpi-muted)]">{mode.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:flex">
              <Link href="/courses" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                Explore courses
              </Link>
              <Link href="/login?next=/courses" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[var(--tgpi-gold)] bg-[var(--tgpi-surface)] px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                Create free account
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[var(--tgpi-navy)] p-4 text-white shadow-[var(--tgpi-shadow-premium)] sm:p-6">
            <div className="rounded-[24px] border border-white/10 bg-[var(--tgpi-navy-soft)]/65 p-5 sm:p-7">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">Learning workspace preview</p>
                  <h3 className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">Choose your next capability</h3>
                </div>
                <span className="w-fit rounded-full border border-[var(--tgpi-gold)]/30 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-gold-light)]">
                  Desktop recommended
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {coursesOverview.slice(0, 3).map((course, index) => (
                  <Link key={course.title} href="/courses" className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]/55 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-extrabold text-[var(--tgpi-gold-light)]">0{index + 1}</span>
                    <span>
                      <span className="block text-sm font-extrabold text-white">{course.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-white/50">{course.desc}</span>
                    </span>
                    <span className="text-[var(--tgpi-gold-light)] transition group-hover:translate-x-1">→</span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2" aria-label="Learning workspace capabilities">
                {["Lessons", "Exercises", "Progress"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-black/10 px-2 py-3 text-center text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/60">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
