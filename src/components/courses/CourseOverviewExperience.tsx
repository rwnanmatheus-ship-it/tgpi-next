"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import ActivationProgressProvider, {
  useActivationProgress,
} from "@/components/activation/ActivationProgressProvider";
import { getCourseLessons } from "@/data/courses";
import { getCourseStandardAudit } from "@/lib/learning-standard";
import type { Course } from "@/types/course";

function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours} hours`;
}

export default function CourseOverviewExperience({ course }: { course: Course }) {
  return (
    <ActivationProgressProvider>
      <CourseOverview course={course} />
    </ActivationProgressProvider>
  );
}

function CourseOverview({ course }: { course: Course }) {
  const { error, isLoading, mutate, progress } = useActivationProgress();
  const startRequested = useRef(false);
  const lessons = useMemo(() => getCourseLessons(course), [course]);
  const standardAudit = useMemo(() => getCourseStandardAudit(course), [course]);
  const lessonIds = useMemo(
    () => new Set(lessons.map((lesson) => lesson.id)),
    [lessons],
  );
  const courseProgress = progress.courseProgress[course.id];
  const completedLessonIds = (courseProgress?.completedLessonIds || []).filter(
    (lessonId) => lessonIds.has(lessonId),
  );
  const completion = lessons.length
    ? Math.round((completedLessonIds.length / lessons.length) * 100)
    : 0;
  const isComplete = completedLessonIds.length === lessons.length;
  const nextLesson =
    lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) || lessons[0];
  const nextLessonIndex = nextLesson
    ? lessons.findIndex((lesson) => lesson.id === nextLesson.id)
    : 0;

  useEffect(() => {
    const needsCurrentVersion =
      !courseProgress || courseProgress.courseVersion !== course.version;

    if (!isLoading && needsCurrentVersion && !startRequested.current) {
      startRequested.current = true;
      mutate({ courseId: course.id, type: "start_course" }).catch(() => {
        startRequested.current = false;
      });
    }
  }, [course.id, course.version, courseProgress, isLoading, mutate]);

  return (
    <main className="min-h-screen bg-[var(--tgpi-canvas)] px-4 py-8 text-[var(--tgpi-navy)] sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Link
          href="/courses#learning-paths"
          className="inline-flex min-h-11 items-center rounded-full border border-[var(--tgpi-border)] bg-white px-4 text-sm font-extrabold transition hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
        >
          <span aria-hidden="true">←</span>&nbsp; All learning paths
        </Link>

        <section className="relative mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-[var(--tgpi-navy)] text-white shadow-[var(--tgpi-shadow-premium)] sm:rounded-[40px]">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[var(--tgpi-gold)]/20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-10 top-6 h-48 w-48 rounded-full bg-[var(--tgpi-gold)]/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid lg:grid-cols-[1.18fr_.82fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]">
                  TGPI applied mastery course
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                  Version {course.version}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                  Standard {course.learningStandard.version}
                </span>
              </div>
              <h1 className="mt-6 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(3rem,7vw,5.8rem)] font-semibold leading-[0.91] tracking-[-0.05em]">
                {course.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                {course.description}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Level", course.level],
                  ["Modules", String(course.modules.length)],
                  ["Lessons", String(lessons.length)],
                  ["Study time", formatDuration(course.estimatedMinutes)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <dt className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm font-extrabold text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="relative border-t border-white/10 bg-white/[0.045] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12" aria-label="Course progress">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
                Your learning progress
              </p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <p className="font-[var(--tgpi-font-display)] text-6xl font-semibold leading-none">
                  {completion}%
                </p>
                <p className="pb-1 text-sm font-extrabold text-white/65">
                  {completedLessonIds.length} of {lessons.length}
                </p>
              </div>
              <div
                className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Course completion"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={completion}
              >
                <div
                  className="h-full rounded-full bg-[var(--tgpi-gold)] transition-[width]"
                  style={{ width: `${completion}%` }}
                />
              </div>

              {nextLesson ? (
                <>
                  <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                    {isComplete ? "Course completed" : "Up next"}
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-white">
                    {isComplete ? "Review from the beginning" : nextLesson.title}
                  </p>
                  <Link
                    href={`/courses/${course.id}/lessons/${nextLesson.id}`}
                    className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {isComplete
                      ? "Review course"
                      : completedLessonIds.length
                        ? "Continue course"
                        : "Start first lesson"}
                    <span className="ml-2" aria-hidden="true">→</span>
                  </Link>
                </>
              ) : null}

              <p className="mt-5 text-xs leading-6 text-white/50">
                Progress is stored privately and follows your TGPI Global Key across devices.
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/45">
                    Learning standard
                  </p>
                  <span className="rounded-full bg-[#D8EFE4] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#175D41]">
                    Active
                  </span>
                </div>
                <p className="mt-2 text-sm font-extrabold text-white">
                  {course.learningStandard.title}
                </p>
              </div>
              <p role="status" className="mt-3 min-h-5 text-xs font-bold text-[var(--tgpi-gold-light)]">
                {isLoading ? "Loading your progress…" : error}
              </p>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-[1.1fr_.9fr] lg:py-16" aria-labelledby="course-outcomes-title">
          <div className="rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-7 shadow-[var(--tgpi-shadow-soft)] sm:p-9">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
              Practical transformation
            </p>
            <h2 id="course-outcomes-title" className="mt-4 text-4xl font-semibold sm:text-5xl">
              What you will be able to do
            </h2>
            <ul className="mt-7 grid gap-4">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-4 rounded-2xl border border-[var(--tgpi-border-soft)] bg-white p-4 text-sm font-bold leading-7 text-[var(--tgpi-muted)]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E4F3EB] text-xs text-[var(--tgpi-success)]" aria-hidden="true">✓</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-[var(--tgpi-gold)]/30 bg-[#FFF7DE] p-7 sm:p-9">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
              Designed for
            </p>
            <p className="mt-4 text-lg font-extrabold leading-8 text-[var(--tgpi-navy)]">
              {course.audience}
            </p>
            <div className="my-7 h-px bg-[var(--tgpi-gold)]/25" />
            <h2 className="text-2xl font-semibold">Completion standard</h2>
            <ol className="mt-5 grid gap-4">
              {course.completionRequirements.map((requirement, index) => (
                <li key={requirement} className="flex gap-3 text-sm font-bold leading-7 text-[#6F5A31]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--tgpi-navy)] text-[10px] text-white" aria-hidden="true">{index + 1}</span>
                  {requirement}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[var(--tgpi-navy)] text-white shadow-[var(--tgpi-shadow-premium)] sm:rounded-[38px]" aria-labelledby="learning-system-title">
          <div className="border-b border-white/10 p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]">
                  TGPI Learning OS
                </p>
                <h2 id="learning-system-title" className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[0.96] tracking-[-0.04em] sm:text-6xl">
                  A repeatable system for applied mastery.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                  {course.learningStandard.description}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                  Quality gates active
                </p>
                <p className="mt-2 text-2xl font-extrabold text-[var(--tgpi-gold-light)]">
                  {standardAudit.gates.filter((gate) => gate.passed).length}/{standardAudit.gates.length}
                </p>
              </div>
            </div>

            <ol className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {course.learningStandard.phases.map((phase, index) => (
                <li key={phase.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold">{phase.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-white/55">{phase.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid lg:grid-cols-3">
            {standardAudit.gates.map((gate) => (
              <div key={gate.id} className="border-t border-white/10 p-6 first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold">{gate.label}</p>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] ${gate.passed ? "bg-[#D8EFE4] text-[#175D41]" : "bg-[var(--tgpi-gold)]/15 text-[var(--tgpi-gold-light)]"}`}>
                    {gate.passed ? "Active" : "In build"}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-6 text-white/50">{gate.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 lg:py-18" aria-labelledby="capability-map-title">
          <div className="max-w-4xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
              Capability map
            </p>
            <h2 id="capability-map-title" className="mt-4 text-4xl font-semibold sm:text-6xl">
              The certificate will name what you can actually do.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--tgpi-muted)]">
              Every module builds one observable capability. Evidence is attached to the skill — not only to time spent watching content.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {course.competencies.map((competency, index) => (
              <article key={competency.id} className="rounded-[26px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-6 shadow-[var(--tgpi-shadow-sm)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--tgpi-navy)] text-[10px] font-extrabold text-[var(--tgpi-gold-light)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-[var(--tgpi-border-soft)] bg-white px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-muted)]">
                    {competency.level}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{competency.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">{competency.description}</p>
                <div className="mt-5 rounded-2xl border border-[var(--tgpi-gold)]/25 bg-[#FFF9E9] p-4">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]">Can-do statement</p>
                  <p className="mt-2 text-sm font-extrabold leading-7 text-[var(--tgpi-navy)]">{competency.canDoStatement}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 pb-14 lg:grid-cols-[1.08fr_.92fr] lg:pb-18" aria-labelledby="assessment-standard-title">
          <div className="rounded-[30px] border border-[var(--tgpi-border)] bg-white p-7 shadow-[var(--tgpi-shadow-soft)] sm:p-9">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
              Assessment architecture
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <h2 id="assessment-standard-title" className="max-w-xl text-4xl font-semibold sm:text-5xl">
                Evidence before certification.
              </h2>
              <div className="rounded-2xl bg-[var(--tgpi-navy)] px-4 py-3 text-center text-white">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)]">Mastery threshold</p>
                <p className="mt-1 text-2xl font-extrabold">{course.assessment.masteryThreshold}%</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {course.assessment.components.map((component) => (
                <div key={component.id} className="grid gap-4 rounded-2xl border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-extrabold">{component.title}</h3>
                      <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] ${component.status === "live" ? "bg-[#D8EFE4] text-[#175D41]" : "bg-[#FFF1C7] text-[#795712]"}`}>
                        {component.status === "live" ? "Live now" : component.status === "preview" ? "Preview ready" : "Credential gate"}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-[var(--tgpi-muted)]">{component.description}</p>
                  </div>
                  <div className="flex gap-2 sm:block sm:text-right">
                    <p className="text-sm font-extrabold">{component.count}×</p>
                    <p className="text-xs font-bold text-[var(--tgpi-muted)]">{component.weight}% weight</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold leading-6 text-[var(--tgpi-muted)]">
              {course.assessment.retakePolicy}
            </p>
          </div>

          <aside className="overflow-hidden rounded-[30px] border border-[var(--tgpi-gold)]/30 bg-[#FFF7DE] shadow-[var(--tgpi-shadow-soft)]" aria-label="Professional credential pathway">
            <div className="p-7 sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
                  Professional credential pathway
                </p>
                <span className="rounded-full bg-[var(--tgpi-navy)] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-gold-light)]">
                  Preview ready
                </span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">{course.credential.title}</h2>
              <p className="mt-3 text-sm font-bold text-[#6F5A31]">Issued by {course.credential.issuer}</p>

              <div className="mt-7 rounded-2xl border border-[var(--tgpi-gold)]/25 bg-white/65 p-5">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]">The record will include</p>
                <ul className="mt-4 grid gap-3">
                  {course.credential.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-[#6F5A31]">
                      <span aria-hidden="true" className="text-[var(--tgpi-success)]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]">Interoperability roadmap</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {course.credential.frameworkTargets.map((target) => (
                    <span key={target} className="rounded-full border border-[var(--tgpi-gold)]/35 bg-white/60 px-3 py-2 text-[10px] font-extrabold text-[#6F5A31]">{target}</span>
                  ))}
                </div>
              </div>

              <p className="mt-6 border-t border-[var(--tgpi-gold)]/25 pt-5 text-xs leading-6 text-[#7A6948]">
                Every assessment is scored on TGPI servers and recorded privately. Public verification exposes only the evidence needed to trust the credential.
              </p>
              <Link href={`/courses/${course.id}/certification`} className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white">
                Open certification path →
              </Link>
            </div>
          </aside>
        </section>

        <section className="pb-16" aria-labelledby="curriculum-title">
          <div className="max-w-3xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">
              Full curriculum
            </p>
            <h2 id="curriculum-title" className="mt-4 text-4xl font-semibold sm:text-6xl">
              Six stages from arrival to independence.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--tgpi-muted)]">
              Each lesson combines a real situation, language patterns, a model dialogue, coaching and a practical checkpoint.
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            {course.modules.map((courseModule, moduleIndex) => {
              const moduleCompleted = courseModule.lessons.filter((lesson) =>
                completedLessonIds.includes(lesson.id),
              ).length;
              const moduleCompetencies = course.competencies.filter(
                (competency) =>
                  courseModule.competencyIds.includes(competency.id),
              );

              return (
                <article key={courseModule.id} className="overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-sm)]">
                  <div className="grid gap-6 border-b border-[var(--tgpi-border-soft)] bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                        Module {String(moduleIndex + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">{courseModule.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tgpi-muted)]">{courseModule.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {moduleCompetencies.map((competency) => (
                          <span key={competency.id} className="rounded-full border border-[var(--tgpi-gold)]/25 bg-[#FFF9E9] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[var(--tgpi-gold-strong)]">
                            Capability · {competency.title}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] px-4 py-3 text-sm font-extrabold">
                      {moduleCompleted}/{courseModule.lessons.length} completed
                    </div>
                  </div>

                  <div className="grid gap-3 p-4 sm:p-6">
                    {courseModule.lessons.map((lesson) => {
                      const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
                      const completed = completedLessonIds.includes(lesson.id);
                      const current = lessonIndex === nextLessonIndex && !isComplete;

                      return (
                        <Link
                          key={lesson.id}
                          href={`/courses/${course.id}/lessons/${lesson.id}`}
                          className={`group grid gap-4 rounded-2xl border p-5 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] sm:grid-cols-[auto_1fr_auto] sm:items-center ${
                            completed
                              ? "border-[#B9DDCA] bg-[#F1F8F4]"
                              : current
                                ? "border-[var(--tgpi-gold)] bg-[#FFF9E9]"
                                : "border-[var(--tgpi-border-soft)] bg-white hover:border-[var(--tgpi-gold)]/60"
                          }`}
                        >
                          <span className={`grid h-10 w-10 place-items-center rounded-full text-xs font-extrabold ${completed ? "bg-[var(--tgpi-success)] text-white" : "bg-[var(--tgpi-navy)] text-[var(--tgpi-gold-light)]"}`} aria-hidden="true">
                            {completed ? "✓" : String(lessonIndex + 1).padStart(2, "0")}
                          </span>
                          <span>
                            <span className="block text-base font-extrabold text-[var(--tgpi-navy)]">{lesson.title}</span>
                            <span className="mt-1 block text-sm leading-6 text-[var(--tgpi-muted)]">{lesson.summary}</span>
                          </span>
                          <span className="flex items-center justify-between gap-4 sm:justify-end">
                            <span className="text-xs font-bold text-[var(--tgpi-muted)]">{lesson.durationMinutes} min</span>
                            <span className="text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-1" aria-hidden="true">→</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="border-t border-[var(--tgpi-border-soft)] bg-[var(--tgpi-navy)] px-6 py-4 text-sm font-bold leading-6 text-white/75 sm:px-8">
                    <span className="text-[var(--tgpi-gold-light)]">Module outcome:</span> {courseModule.outcome}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
