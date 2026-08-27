import Image from "next/image";
import Link from "next/link";
import { coursesOverview } from "@/data/courses-overview";

const learningOutcomes = [
  ["Understand", "Learn the context behind the decision."],
  ["Practice", "Apply capability through exercises and scenarios."],
  ["Demonstrate", "Complete evidence-based assessments."],
  ["Carry forward", "Connect progress to your Global Key."],
] as const;

export default function HomeLearningPortal() {
  return (
    <section
      className="border-y border-[var(--tgpi-border)] bg-[#F1EADC] px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="home-learning-title"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 xl:grid-cols-[0.78fr_1.22fr] xl:items-center">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
              TGPI Learning
            </p>
            <h2
              id="home-learning-title"
              className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] text-[var(--tgpi-ink)]"
            >
              Education that closes the gap between information and action.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">
              TGPI Learning develops the practical capability revealed by your global objective—from communication and independence to cultural safety and career action.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {learningOutcomes.map(([title, description], index) => (
                <div key={title} className="rounded-[22px] border border-[var(--tgpi-border)] bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--tgpi-navy)] text-[10px] font-extrabold text-[var(--tgpi-gold-light)]">
                      0{index + 1}
                    </span>
                    <h3 className="font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)]">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:flex">
              <Link
                href="/courses"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
              >
                Explore TGPI Learning
              </Link>
              <Link
                href="/courses/english-abroad"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[var(--tgpi-gold)] bg-white px-6 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
              >
                Start English for Life Abroad
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-white/12 bg-[var(--tgpi-navy)] p-4 text-white shadow-[var(--tgpi-shadow-premium)] sm:p-6">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] border border-white/10">
              <Image
                src="/images/home/tgpi-home-global-learning-atelier-v1.webp"
                alt="TGPI global learning atelier with a world atlas and practical preparation workspace"
                fill
                quality={86}
                sizes="(max-width: 767px) 94vw, (max-width: 1279px) 90vw, 720px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,38,.04),rgba(4,20,38,.2)_48%,rgba(4,20,38,.94))]" />
              <div className="absolute inset-x-4 bottom-4 rounded-[20px] border border-white/15 bg-[#041426]/76 p-4 backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                      First complete capability path
                    </p>
                    <p className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold text-white">
                      English for Life Abroad
                    </p>
                    <p className="mt-2 text-xs leading-6 text-white/60">
                      Practical communication for housing, safety, work and daily independence.
                    </p>
                  </div>
                  <Link
                    href="/courses/english-abroad"
                    className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[var(--tgpi-gold)] px-4 text-xs font-extrabold text-[var(--tgpi-navy)]"
                  >
                    Open course
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {coursesOverview.slice(0, 3).map((course, index) => (
                <Link
                  key={course.id}
                  href={course.status === "available" ? course.href : "/courses"}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]/55 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-extrabold tracking-[0.18em] text-[var(--tgpi-gold-light)]">
                      0{index + 1}
                    </span>
                    <span className="text-[var(--tgpi-gold-light)] transition group-hover:translate-x-1">→</span>
                  </div>
                  <p className="mt-4 text-sm font-extrabold leading-6 text-white">{course.title}</p>
                  <p className="mt-2 text-xs leading-5 text-white/45">{course.status === "available" ? "Available now" : "Capability roadmap"}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
