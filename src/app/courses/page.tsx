import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import MobileMicroLesson from "@/components/mobile/MobileMicroLesson";
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
    title: "Mastery requires evidence.",
    description:
      "Formative checkpoints support learning; performance gates and a capstone determine credential eligibility.",
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
  {
    label: "Observable capability",
    title: "The record names what you can do.",
    description:
      "Every module maps to a can-do statement, performance evidence and a transparent assessment rubric.",
  },
  {
    label: "Credential integrity",
    title: "A certificate must be verifiable.",
    description:
      "TGPI credentials release only after the mastery threshold and include a public status without exposing private data.",
  },
] as const;

export default async function CoursesPage() {
  const { userId } = await auth();
  const learningHref = userId
    ? "/courses/english-abroad"
    : "/sign-in?redirect_url=/courses/english-abroad";

  return (
    <TGPIPageShell>
      <section className="mobile-compact-hero relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-[var(--tgpi-navy)] text-white shadow-[var(--tgpi-shadow-premium)] sm:rounded-[36px]">
        <Image
          src="/images/learning/tgpi-learning-hero-v2.webp"
          alt="TGPI global knowledge observatory with an illuminated world atlas"
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover object-[68%_center] sm:object-[64%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,38,0.93)_0%,rgba(4,20,38,0.87)_68%,rgba(4,20,38,0.76)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,20,38,0.98)_0%,rgba(4,20,38,0.92)_42%,rgba(4,20,38,0.34)_72%,rgba(4,20,38,0.14)_100%)]" />
        <div
          className="pointer-events-none absolute -left-24 top-[-7rem] h-80 w-80 rounded-full bg-[var(--tgpi-gold)]/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="mobile-compact-hero-content relative z-10 flex min-h-[620px] flex-col justify-center p-7 sm:min-h-[580px] sm:p-9 lg:h-[540px] lg:min-h-0 lg:p-10 xl:p-12">
          <div className="max-w-[680px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                TGPI Learning Intelligence
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/60">
                Practical · Global · Connected
              </span>
            </div>
            <h1 className="mt-5 max-w-2xl text-[clamp(2.65rem,4.5vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
              Build the capabilities to move through the world.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
              Learn to communicate, decide, adapt and understand global
              opportunity through paths designed for international life — not
              passive consumption.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#learning-paths"
                className="inline-flex min-h-13 items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Find my learning path
                <span className="ml-2" aria-hidden="true">
                  ↓
                </span>
              </Link>
              <Link
                href={learningHref}
                className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
              >
                {userId ? "Continue flagship course" : "Create a free Global Key"}
              </Link>
            </div>

            <dl className="mt-6 grid max-w-xl grid-cols-3 gap-2 border-t border-white/10 pt-5">
              {[
                ["04", "Capability paths"],
                ["18", "Live scenarios"],
                ["01", "Global profile"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-extrabold text-[var(--tgpi-gold-light)]">
                    {value}
                  </dt>
                  <dd className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/45">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="absolute bottom-8 right-9 hidden max-w-[270px] rounded-[22px] border border-white/15 bg-[var(--tgpi-navy-deep)]/55 p-5 text-right backdrop-blur-md lg:block">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
              The TGPI Learning System
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-white/85">
              One connected capability profile for a life without borders.
            </p>
          </div>
        </div>
      </section>

      <MobileMicroLesson />

      <LearningPathExplorer
        courses={coursesOverview}
        learningHref={learningHref}
      />

      <section
        className="mb-14 overflow-hidden rounded-[30px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-soft)] sm:rounded-[36px]"
        aria-labelledby="learning-standard-title"
      >
        <div className="grid border-b border-[var(--tgpi-border-soft)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="bg-[var(--tgpi-navy)] p-7 text-white sm:p-9 lg:p-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
              The TGPI Learning Standard
            </p>
            <h2
              id="learning-standard-title"
              className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-[2.75rem]"
            >
              Education becomes valuable when it changes what you can do next.
            </h2>
            <p className="mt-6 text-sm leading-7 text-white/65 sm:text-base">
              Every new path must pass the same publication gates: clear
              capabilities, applied learning and evidence strong enough to
              support a professional credential.
            </p>
          </div>

          <div className="grid sm:grid-cols-2">
            {learningPrinciples.map((principle, index) => (
              <article
                key={principle.label}
                className={`p-7 sm:p-8 ${
                  index % 2 === 0 ? "sm:border-r sm:border-[var(--tgpi-border-soft)]" : ""
                  } ${index < learningPrinciples.length - 2 ? "border-b border-[var(--tgpi-border-soft)]" : ""} ${index === learningPrinciples.length - 2 ? "border-b border-[var(--tgpi-border-soft)] sm:border-b-0" : ""}`}
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
