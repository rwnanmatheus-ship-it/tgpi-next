"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type {
  CourseGoal,
  CourseOverview,
} from "@/types/course-overview";

type LearningPathExplorerProps = {
  courses: CourseOverview[];
  learningHref: string;
};

export default function LearningPathExplorer({
  courses,
  learningHref,
}: LearningPathExplorerProps) {
  const [selectedGoal, setSelectedGoal] =
    useState<CourseGoal>("global-mobility");
  const selectedCourse =
    courses.find((course) => course.goal === selectedGoal) ?? courses[0];
  const availableCourse = courses.find(
    (course) => course.status === "available",
  );
  const plannedCourses = courses.filter(
    (course) => course.status === "planned",
  );

  if (!selectedCourse || !availableCourse) return null;

  const selectedHref =
    selectedCourse.status === "available"
      ? learningHref
      : selectedCourse.href;

  return (
    <section
      id="learning-paths"
      className="scroll-mt-28 py-14 sm:py-16"
      aria-labelledby="learning-paths-title"
    >
      <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
            Find your starting point
          </p>
          <h2
            id="learning-paths-title"
            className="mt-4 text-[clamp(2.5rem,4.6vw,4.35rem)] font-semibold leading-[0.97] tracking-[-0.045em] text-[var(--tgpi-navy)]"
          >
            Choose the capability your next chapter requires.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-8 text-[var(--tgpi-muted)] lg:justify-self-end">
          TGPI does not organize learning around passive subjects. Every path is
          built around a real outcome: communicate, decide, adapt or understand
          the systems shaping your opportunities.
        </p>
      </div>

      <div className="mt-8 rounded-[28px] border border-[var(--tgpi-border)] bg-white p-4 shadow-[var(--tgpi-shadow-soft)] sm:p-5">
        <p className="px-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-muted)]">
          What do you need to do better?
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((course, index) => {
            const selected = course.goal === selectedGoal;

            return (
              <button
                key={course.goal}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedGoal(course.goal)}
                className={`flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] ${
                  selected
                    ? "border-[var(--tgpi-gold)] bg-[var(--tgpi-navy)] text-white shadow-[0_12px_30px_rgba(7,26,50,0.18)]"
                    : "border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] text-[var(--tgpi-navy)] hover:border-[var(--tgpi-gold)]/60 hover:bg-[#FFF9E9]"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] ${
                    selected
                      ? "bg-[var(--tgpi-gold)] text-[var(--tgpi-navy-deep)]"
                      : "bg-white text-[var(--tgpi-gold-strong)]"
                  }`}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {course.goalLabel}
              </button>
            );
          })}
        </div>

        <div
          className="mt-4 grid gap-6 overflow-hidden rounded-[22px] border border-white/10 bg-[var(--tgpi-navy)] p-6 text-white sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end"
          aria-live="polite"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
                Recommended for your goal
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/65">
                {selectedCourse.releaseLabel}
              </span>
            </div>
            <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
              {selectedCourse.category}
            </p>
            <h3 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight sm:text-[2.15rem]">
              {selectedCourse.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
              {selectedCourse.desc}
            </p>
          </div>
          <div className="lg:text-right">
            <Link
              href={selectedHref}
              className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
            >
              {selectedCourse.status === "available"
                ? "Start this path"
                : "Request early access"}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
            {selectedCourse.status === "planned" ? (
              <p className="mt-3 text-xs font-bold text-white/45">
                Begin learning today with the flagship path below.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
              Available now
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--tgpi-navy)] sm:text-4xl">
              Start with the flagship TGPI path.
            </h2>
          </div>
          <p className="text-sm font-bold text-[var(--tgpi-muted)]">
            Progress follows your TGPI Global Key.
          </p>
        </div>

        <div className="mt-7">
          <CourseCard
            course={availableCourse}
            href={learningHref}
            highlighted={selectedCourse.id === availableCourse.id}
            featured
          />
        </div>
      </div>

      <div className="mt-12">
        <div className="max-w-3xl">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
            The capability roadmap
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--tgpi-navy)] sm:text-4xl">
            The next intelligence layers of TGPI Learning.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--tgpi-muted)] sm:text-base">
            Each path will connect to your country decisions, readiness and
            professional development — creating one growing global capability
            profile.
          </p>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          {plannedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              href={course.href}
              highlighted={selectedCourse.id === course.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({
  course,
  featured = false,
  highlighted,
  href,
}: {
  course: CourseOverview;
  featured?: boolean;
  highlighted: boolean;
  href: string;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-[28px] border bg-white shadow-[var(--tgpi-shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--tgpi-shadow-premium)] ${
        highlighted
          ? "border-[var(--tgpi-gold)] ring-4 ring-[var(--tgpi-gold)]/10"
          : "border-[var(--tgpi-border)]"
      } ${featured ? "grid lg:grid-cols-[0.92fr_1.08fr]" : "flex h-full flex-col"}`}
    >
      <div
        className={`relative isolate overflow-hidden bg-[var(--tgpi-navy)] ${
          featured ? "min-h-[300px] sm:min-h-[360px] lg:min-h-[460px]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          quality={88}
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 52vw"
              : "(max-width: 1024px) 100vw, 33vw"
          }
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,50,0.02)_35%,rgba(4,20,38,0.78)_100%)]" />
        <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 sm:inset-x-6 sm:top-6">
          <span className="rounded-full border border-white/20 bg-[var(--tgpi-navy-deep)]/75 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {course.releaseLabel}
          </span>
          <span className="rounded-full border border-[var(--tgpi-gold)]/40 bg-[var(--tgpi-navy-deep)]/75 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)] backdrop-blur-md">
            {course.level}
          </span>
        </div>
        <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
            {course.category}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-white/65">
            {course.duration} · {course.format}
          </p>
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col ${
          featured ? "p-7 sm:p-8 lg:p-9" : "p-6 sm:p-7"
        }`}
      >
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
          {course.goalLabel}
        </p>
        <h3
          className={`mt-3 font-semibold leading-[1.03] text-[var(--tgpi-navy)] ${
            featured ? "text-4xl sm:text-[2.75rem]" : "text-3xl"
          }`}
        >
          {course.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--tgpi-muted)]">
          {course.desc}
        </p>

        <div className="mt-6 border-t border-[var(--tgpi-border-soft)] pt-5">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-muted)]">
            Built for
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-[var(--tgpi-navy)]">
            {course.audience}
          </p>
        </div>

        <ul className="mt-6 grid gap-3">
          {course.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex gap-3 text-sm font-bold leading-6 text-[var(--tgpi-muted)]"
            >
              <span
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E4F3EB] text-[10px] text-[var(--tgpi-success)]"
                aria-hidden="true"
              >
                ✓
              </span>
              {benefit}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={`mt-7 inline-flex min-h-13 items-center justify-center rounded-2xl px-5 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] ${
            course.status === "available"
              ? "bg-[var(--tgpi-navy)] text-white hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)]"
              : "border border-[var(--tgpi-gold)] bg-[#FFF7DE] text-[var(--tgpi-navy)] hover:bg-[var(--tgpi-gold-soft)]"
          }`}
        >
          {course.status === "available"
            ? "Enter the learning path"
            : "Join the priority list"}
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
