"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import ActivationProgressProvider, {
  useActivationProgress,
} from "@/components/activation/ActivationProgressProvider";
import { getCourseLessons } from "@/data/courses";
import { getCourseStandardAudit } from "@/lib/learning-standard";
import type { Course } from "@/types/course";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";


function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours ? (minutes ? `${hours}h ${minutes}m` : `${hours}h`) : `${minutes}m`;
}

export default function CourseOverviewExperience({ course, workshop }: { course: Course; workshop?: ReactNode }) {
  return (
    <ActivationProgressProvider>
      <CourseOverview course={course} workshop={workshop} />
    </ActivationProgressProvider>
  );
}

function CourseOverview({ course, workshop }: { course: Course; workshop?: ReactNode }) {
  const { locale, t } = useLocale();
  const { error, isAuthenticated, isLoading, mutate, progress } = useActivationProgress();
  const startRequested = useRef(false);
  const lessons = useMemo(() => getCourseLessons(course), [course]);
  const standardAudit = useMemo(() => getCourseStandardAudit(course), [course]);
  const lessonIds = useMemo(
    () => new Set(lessons.map((lesson) => lesson.id)),
    [lessons],
  );
  const courseProgress = progress.courseProgress[course.id];
  const completedLessonIds = [...new Set(courseProgress?.completedLessonIds || [])].filter(
    (lessonId) => lessonIds.has(lessonId),
  );
  const completion = lessons.length
    ? Math.round((completedLessonIds.length / lessons.length) * 100)
    : 0;
  const isComplete = lessons.length > 0 && completedLessonIds.length === lessons.length;
  const nextLesson =
    lessons.find((lesson) => lesson.id === courseProgress?.lastLessonId && !completedLessonIds.includes(lesson.id)) ||
    lessons.find((lesson) => !completedLessonIds.includes(lesson.id)) || lessons[0];
  const nextLessonIndex = nextLesson
    ? lessons.findIndex((lesson) => lesson.id === nextLesson.id)
    : 0;

  useEffect(() => {
    const needsCurrentVersion =
      !courseProgress || courseProgress.courseVersion !== course.version;

    if (isAuthenticated && !isLoading && needsCurrentVersion && !startRequested.current) {
      startRequested.current = true;
      mutate({ courseId: course.id, type: "start_course" }).catch(() => {
        startRequested.current = false;
      });
    }
  }, [course.id, course.version, courseProgress, isAuthenticated, isLoading, mutate]);

  return (
    <main lang={locale} className="min-h-screen bg-[var(--tgpi-canvas)] px-4 py-8 text-[var(--tgpi-navy)] sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Link
          href="/courses#learning-paths"
          className="inline-flex min-h-11 items-center rounded-full border border-[var(--tgpi-border)] bg-white px-4 text-sm font-extrabold transition hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
        >
          <span aria-hidden="true">←</span>{" "}<LocalizedText text="All learning paths" /></Link>

        {course.series && <nav aria-label={t("Course series")} className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--tgpi-border)] bg-white px-5 py-4 text-sm">
          <p className="font-bold">{t(course.series.name)} <span className="font-normal text-[var(--tgpi-muted)]"><LocalizedText text="· Chapter" />{" "}{course.series.chapter}{" "}<LocalizedText text="of" />{" "}{course.series.totalChapters}</span></p>
          {course.series.nextCourseId && <Link href={`/courses/${course.series.nextCourseId}`} className="inline-flex min-h-11 items-center font-bold underline underline-offset-4"><LocalizedText text="Next in this series →" /></Link>}
        </nav>}

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
                <span className="rounded-full border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold)]/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-light)]"><LocalizedText text="New edition 2026 · Applied mastery" /></span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70"><LocalizedText text="Version" />{course.version}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70"><LocalizedText text="Standard" />{course.learningStandard.version}
                </span>
              </div>
              <h1 className="mt-6 max-w-4xl font-[var(--tgpi-font-display)] text-[clamp(2.3rem,4.5vw,4.2rem)] font-semibold leading-[0.91] tracking-[-0.05em]">
                <LocalizedText text={course.title} />
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                {t(course.description)}
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
                      {t(label)}
                    </dt>
                    <dd className="mt-2 text-sm font-extrabold text-white">{t(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="relative border-t border-white/10 bg-white/[0.045] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12" aria-label={t("Course progress")}>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]"><LocalizedText text="Your learning progress" /></p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <p className="font-[var(--tgpi-font-display)] text-6xl font-semibold leading-none">
                  {completion}%
                </p>
                <p className="pb-1 text-sm font-extrabold text-white/65">
                  {completedLessonIds.length}{" "}<LocalizedText text="of" />{" "}{lessons.length}
                </p>
              </div>
              <div
                className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label={t("Course completion")}
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
                    {t(isComplete ? "Lessons completed" : "Up next")}
                  </p>
                  <p className="mt-2 text-lg font-extrabold text-white">
                    {t(isComplete ? "Review from the beginning" : nextLesson.title)}
                  </p>
                  <Link
                    href={`/courses/${course.id}/lessons/${nextLesson.id}`}
                    className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {t(isComplete ? "Review course" : courseProgress ? "Resume your studies" : "Start first lesson")}
                    <span className="ml-2" aria-hidden="true">→</span>
                  </Link>
                </>
              ) : null}

              <p className="mt-5 text-xs leading-6 text-white/50"><LocalizedText text="Progress is stored privately and follows your TGPI Global Key across devices." /></p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/45"><LocalizedText text="Learning standard" /></p>
                  <span className="rounded-full bg-[#D8EFE4] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#175D41]"><LocalizedText text="Active" /></span>
                </div>
                <p className="mt-2 text-sm font-extrabold text-white">
                  {t(course.learningStandard.title)}
                </p>
              </div>
              <p role="status" className="mt-3 min-h-5 text-xs font-bold text-[var(--tgpi-gold-light)]">
                {isLoading ? t("Loading your progress…") : error ? t(error) : null}
              </p>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-[1.1fr_.9fr] lg:py-16" aria-labelledby="course-outcomes-title">
          <div className="rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-7 shadow-[var(--tgpi-shadow-soft)] sm:p-9">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Practical transformation" /></p>
            <h2 id="course-outcomes-title" className="mt-4 text-4xl font-semibold sm:text-5xl"><LocalizedText text="What you will be able to do" /></h2>
            <ul className="mt-7 grid gap-4">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-4 rounded-2xl border border-[var(--tgpi-border-soft)] bg-white p-4 text-sm font-bold leading-7 text-[var(--tgpi-muted)]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E4F3EB] text-xs text-[var(--tgpi-success)]" aria-hidden="true">✓</span>
                  {t(outcome)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-[var(--tgpi-gold)]/30 bg-[#FFF7DE] p-7 sm:p-9">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Designed for" /></p>
            <p className="mt-4 text-lg font-extrabold leading-8 text-[var(--tgpi-navy)]">
              {t(course.audience)}
            </p>
            <div className="my-7 h-px bg-[var(--tgpi-gold)]/25" />
            <h2 className="text-2xl font-semibold"><LocalizedText text="Completion standard" /></h2>
            <ol className="mt-5 grid gap-4">
              {course.completionRequirements.map((requirement, index) => (
                <li key={requirement} className="flex gap-3 text-sm font-bold leading-7 text-[#6F5A31]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--tgpi-navy)] text-[10px] text-white" aria-hidden="true">{index + 1}</span>
                  {t(requirement)}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[var(--tgpi-navy)] text-white shadow-[var(--tgpi-shadow-premium)] sm:rounded-[38px]" aria-labelledby="learning-system-title">
          <div className="border-b border-white/10 p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-light)]"><LocalizedText text="TGPI Learning OS" /></p>
                <h2 id="learning-system-title" className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[0.96] tracking-[-0.04em] sm:text-6xl"><LocalizedText text="A repeatable system for applied mastery." /></h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">
                  {t(course.learningStandard.description)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/45"><LocalizedText text="Curriculum structure" /></p>
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
                  <h3 className="mt-3 text-lg font-extrabold">{t(phase.title)}</h3>
                  <p className="mt-2 text-xs leading-6 text-white/55">{t(phase.description)}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid lg:grid-cols-3">
            {standardAudit.gates.map((gate) => (
              <div key={gate.id} className="border-t border-white/10 p-6 first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold">{t(gate.id === "catalog" ? "Catalog structure" : gate.id === "learning" ? "Learning structure" : "Credential requirements")}</p>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] ${gate.passed ? "bg-[#D8EFE4] text-[#175D41]" : "bg-[var(--tgpi-gold)]/15 text-[var(--tgpi-gold-light)]"}`}>
                    {t(gate.passed ? "Defined" : "Needs review")}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-6 text-white/50">{t(gate.id === "credential" ? "Credential availability and eligibility are checked separately in the certification path." : gate.description)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 lg:py-18" aria-labelledby="capability-map-title">
          <div className="max-w-4xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Capability map" /></p>
            <h2 id="capability-map-title" className="mt-4 text-4xl font-semibold sm:text-6xl">
              {t(course.id === "global-english-2026" ? "The certificate will name what you can actually do." : "Build capabilities you can put to work.")}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--tgpi-muted)]"><LocalizedText text="Every module builds one observable capability. Create the practical output and review your reasoning before moving to the next step." /></p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {course.competencies.map((competency, index) => (
              <article key={competency.id} className="rounded-[26px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-6 shadow-[var(--tgpi-shadow-sm)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--tgpi-navy)] text-[10px] font-extrabold text-[var(--tgpi-gold-light)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-[var(--tgpi-border-soft)] bg-white px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-muted)]">
                    {t(competency.level)}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{t(competency.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--tgpi-muted)]">{t(competency.description)}</p>
                <div className="mt-5 rounded-2xl border border-[var(--tgpi-gold)]/25 bg-[#FFF9E9] p-4">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Can-do statement" /></p>
                  <p className="mt-2 text-sm font-extrabold leading-7 text-[var(--tgpi-navy)]">{t(competency.canDoStatement)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 pb-14 lg:grid-cols-[1.08fr_.92fr] lg:pb-18" aria-labelledby="assessment-standard-title">
          <div className="rounded-[30px] border border-[var(--tgpi-border)] bg-white p-7 shadow-[var(--tgpi-shadow-soft)] sm:p-9">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Assessment architecture" /></p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <h2 id="assessment-standard-title" className="max-w-xl text-4xl font-semibold sm:text-5xl">
                {t(course.id === "global-english-2026" ? "Evidence before certification." : "Practice before commitment.")}
              </h2>
              <div className="rounded-2xl bg-[var(--tgpi-navy)] px-4 py-3 text-center text-white">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)]"><LocalizedText text="Mastery threshold" /></p>
                <p className="mt-1 text-2xl font-extrabold">{course.assessment.masteryThreshold}%</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {course.assessment.components.map((component) => (
                <div key={component.id} className="grid gap-4 rounded-2xl border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-extrabold">{t(component.title)}</h3>
                      <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] ${component.status === "live" ? "bg-[#D8EFE4] text-[#175D41]" : "bg-[#FFF1C7] text-[#795712]"}`}>
                        {t(component.status === "live" ? "Live now" : component.status === "preview" ? "Preview ready" : "Credential gate")}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-[var(--tgpi-muted)]">{t(component.description)}</p>
                  </div>
                  <div className="flex gap-2 sm:block sm:text-right">
                    <p className="text-sm font-extrabold">{component.count}×</p>
                    <p className="text-xs font-bold text-[var(--tgpi-muted)]">{component.weight}<LocalizedText text="% weight" /></p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold leading-6 text-[var(--tgpi-muted)]">
              {t(course.assessment.retakePolicy)}
            </p>
          </div>

          {course.id === "global-english-2026" ? (
          <aside className="overflow-hidden rounded-[30px] border border-[var(--tgpi-gold)]/30 bg-[#FFF7DE] shadow-[var(--tgpi-shadow-soft)]" aria-label={t("Professional credential pathway")}>
            <div className="p-7 sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Professional credential pathway" /></p>
                <span className="rounded-full bg-[var(--tgpi-navy)] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-gold-light)]"><LocalizedText text="Assessment required" /></span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">{t(course.credential.title)}</h2>
              <p className="mt-3 text-sm font-bold text-[#6F5A31]"><LocalizedText text="Issued by" />{" "}{course.credential.issuer}</p>

              <div className="mt-7 rounded-2xl border border-[var(--tgpi-gold)]/25 bg-white/65 p-5">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="The record will include" /></p>
                <ul className="mt-4 grid gap-3">
                  {course.credential.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-[#6F5A31]">
                      <span aria-hidden="true" className="text-[var(--tgpi-success)]">✓</span>
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Interoperability roadmap" /></p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {course.credential.frameworkTargets.map((target) => (
                    <span key={target} className="rounded-full border border-[var(--tgpi-gold)]/35 bg-white/60 px-3 py-2 text-[10px] font-extrabold text-[#6F5A31]">{target}</span>
                  ))}
                </div>
              </div>

              <p className="mt-6 border-t border-[var(--tgpi-gold)]/25 pt-5 text-xs leading-6 text-[#7A6948]"><LocalizedText text="Every assessment is scored on TGPI servers and recorded privately. Public verification exposes only the evidence needed to trust the credential." /></p>
              <Link href={`/courses/${course.id}/certification`} className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white"><LocalizedText text="Open certification path →" /></Link>
            </div>
          </aside>
          ) : <aside className="self-start rounded-[26px] border border-[var(--tgpi-border)] bg-white p-7 sm:p-9"><p className="text-sm font-bold text-[var(--tgpi-gold-strong)]"><LocalizedText text="Applied short course" /></p><h2 className="mt-3 text-3xl font-semibold"><LocalizedText text="Make something you can use." /></h2><p className="mt-4 text-base leading-7 text-[var(--tgpi-muted)]"><LocalizedText text="Complete the lessons and formative checkpoints, then self-review your practical outputs. Lesson progress is saved to your account. This course does not issue a professional certificate." /></p><Link href="/dashboard" className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-[var(--tgpi-navy)] px-5 text-sm font-bold text-white"><LocalizedText text="Open my workspace →" /></Link></aside>}
        </section>

        <section className="pb-16" aria-labelledby="curriculum-title">
          <div className="max-w-3xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Full curriculum" /></p>
            <h2 id="curriculum-title" className="mt-4 text-4xl font-semibold sm:text-6xl">
              {course.id === "global-english-2026" ? "Six stages from arrival to independence." : `${course.modules.length} modules. One practical outcome at a time.`}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--tgpi-muted)]">
              {course.id === "global-english-2026" ? "Each lesson combines a real situation, language patterns, a model dialogue, coaching and a practical checkpoint." : "Each lesson combines a realistic scenario, a worked example, a practical output and a formative checkpoint."}
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
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Module" />{" "}{String(moduleIndex + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">{t(courseModule.title)}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tgpi-muted)]">{t(courseModule.description)}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {moduleCompetencies.map((competency) => (
                          <span key={competency.id} className="rounded-full border border-[var(--tgpi-gold)]/25 bg-[#FFF9E9] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[var(--tgpi-gold-strong)]"><LocalizedText text="Capability ·" />{t(competency.title)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[var(--tgpi-border-soft)] bg-[var(--tgpi-canvas)] px-4 py-3 text-sm font-extrabold">
                      {moduleCompleted}/{courseModule.lessons.length}{" "}<LocalizedText text="completed" /></div>
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
                            <span className="block text-base font-extrabold text-[var(--tgpi-navy)]">{t(lesson.title)}</span>
                            <span className="mt-1 block text-sm leading-6 text-[var(--tgpi-muted)]">{t(course.id === "global-english-2026" ? lesson.summary : lesson.objective)}</span>
                          </span>
                          <span className="flex items-center justify-between gap-4 sm:justify-end">
                            <span className="text-xs font-bold text-[var(--tgpi-muted)]">{lesson.durationMinutes}{" "}<LocalizedText text="min" /></span>
                            <span className="text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-1" aria-hidden="true">→</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="border-t border-[var(--tgpi-border-soft)] bg-[var(--tgpi-navy)] px-6 py-4 text-sm font-bold leading-6 text-white/75 sm:px-8">
                    <span className="text-[var(--tgpi-gold-light)]"><LocalizedText text="Module outcome:" /></span> {t(courseModule.outcome)}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        {workshop}
      </div>
    </main>
  );
}
