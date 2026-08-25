import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LearningPathExplorer from "@/components/courses/LearningPathExplorer";
import TGPIPageShell from "@/components/TGPIPageShell";
import { coursesOverview } from "@/data/courses-overview";

export const metadata: Metadata = {
  title: "TGPI Learning — Build Global Capabilities",
  description:
    "Build practical capabilities for international life through TGPI learning paths in global English, decision intelligence, AI and global economics.",
};

const learningPrinciples = [
  {
    label: "Real pressure",
    title: "Practice the moment, not just the theory.",
    description:
      "Lessons begin with situations that happen in airports, homes, workplaces and global decisions.",
  },
  {
    label: "Active proof",
    title: "Progress requires a decision.",
    description:
      "Checkpoints validate understanding before a lesson can be completed and saved.",
  },
  {
    label: "Connected growth",
    title: "Learning strengthens your global plan.",
    description:
      "Your path connects with TGPI readiness, country comparison and the next action in your workspace.",
  },
  {
    label: "Private continuity",
    title: "One identity across every device.",
    description:
      "Your progress follows your private TGPI Global Key so you can stop, return and continue with clarity.",
  },
] as const;

export default async function CoursesPage() {
  const { userId } = await auth();
  const learningHref = userId
    ? "/courses/english-abroad"
    : "/sign-in?redirect_url=/courses/english-abroad";

  return (
    <TGPIPageShell>
      <section className="relative isolate overflow-hidden rounded-[34px] border border-white/10 bg-[var(--tgpi-navy)] text-white shadow-[var(--tgpi-shadow-premium)] sm:rounded-[42px]">
        <div
          className="pointer-events-none absolute -left-24 top-[-7rem] h-80 w-80 rounded-full bg-[var(--tgpi-gold)]/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid lg:grid-cols-[0.96fr_1.04fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                TGPI Learning Intelligence
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/60">
                Practical · Global · Connected
              </span>
            </div>
            <h1 className="mt-7 max-w-3xl text-[clamp(3.4rem,7vw,6.6rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
              Build the capabilities to move through the world.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              Learn to communicate, decide, adapt and understand global
              opportunity through paths designed for international life — not
              passive consumption.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#learning-paths"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Find my learning path
                <span className="ml-2" aria-hidden="true">
                  ↓
                </span>
              </Link>
              <Link
                href={learningHref}
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
              >
                {userId ? "Continue flagship course" : "Create a free Global Key"}
              </Link>
            </div>

            <p className="mt-5 text-xs font-bold leading-6 text-white/45">
              Built for mobile continuity. Designed for deeper work on desktop.
            </p>

            <dl className="mt-9 grid grid-cols-3 gap-2 border-t border-white/10 pt-7">
              {[
                ["04", "Capability paths"],
                ["18", "Live scenarios"],
                ["01", "Global profile"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-extrabold text-[var(--tgpi-gold-light)] sm:text-3xl">
                    {value}
                  </dt>
                  <dd className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/45">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-white/10 bg-[var(--tgpi-navy-deep)] p-3 sm:p-4 lg:border-l lg:border-t-0">
            <div className="grid min-h-[520px] grid-cols-2 grid-rows-2 gap-3 lg:min-h-full">
              {coursesOverview.map((course, index) => (
                <div
                  key={course.id}
                  className="group relative isolate min-h-56 overflow-hidden rounded-[22px] border border-white/10"
                >
                  <Image
                    src={course.image}
                    alt={course.imageAlt}
                    fill
                    priority={index === 0}
                    quality={88}
                    sizes="(max-width: 1024px) 50vw, 26vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,38,0.02)_30%,rgba(4,20,38,0.9)_100%)]" />
                  <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
                      Path {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs font-extrabold leading-5 text-white sm:text-sm">
                      {course.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LearningPathExplorer
        courses={coursesOverview}
        learningHref={learningHref}
      />

      <section
        className="mb-16 overflow-hidden rounded-[34px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-soft)] sm:rounded-[38px]"
        aria-labelledby="learning-standard-title"
      >
        <div className="grid border-b border-[var(--tgpi-border-soft)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="bg-[var(--tgpi-navy)] p-7 text-white sm:p-10 lg:p-12">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
              The TGPI Learning Standard
            </p>
            <h2
              id="learning-standard-title"
              className="mt-5 text-4xl font-semibold leading-[0.98] sm:text-5xl"
            >
              Education becomes valuable when it changes what you can do next.
            </h2>
            <p className="mt-6 text-sm leading-7 text-white/65 sm:text-base">
              Every TGPI path is designed to convert knowledge into capability,
              and capability into better decisions across borders.
            </p>
          </div>

          <div className="grid sm:grid-cols-2">
            {learningPrinciples.map((principle, index) => (
              <article
                key={principle.label}
                className={`p-7 sm:p-8 ${
                  index % 2 === 0 ? "sm:border-r sm:border-[var(--tgpi-border-soft)]" : ""
                } ${index < 2 ? "border-b border-[var(--tgpi-border-soft)]" : ""}`}
              >
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                  {String(index + 1).padStart(2, "0")} · {principle.label}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-[var(--tgpi-navy)]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-[#FFF7DE] p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
              Your capability compounds
            </p>
            <p className="mt-2 max-w-3xl text-lg font-extrabold leading-8 text-[var(--tgpi-navy)]">
              Start with global English. Add decision intelligence, technology
              and economic understanding as your international plan grows.
            </p>
          </div>
          <Link
            href={learningHref}
            className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
          >
            Start building capability →
          </Link>
        </div>
      </section>
    </TGPIPageShell>
  );
}
