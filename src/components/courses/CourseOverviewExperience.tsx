"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import ActivationProgressProvider, {
  useActivationProgress,
} from "@/components/activation/ActivationProgressProvider";
import { getCourseLessons } from "@/data/courses";
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
                  TGPI practical course
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                  Version {course.version}
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

              return (
                <article key={courseModule.id} className="overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-sm)]">
                  <div className="grid gap-6 border-b border-[var(--tgpi-border-soft)] bg-white p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                        Module {String(moduleIndex + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">{courseModule.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tgpi-muted)]">{courseModule.description}</p>
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
