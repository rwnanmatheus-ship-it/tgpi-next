"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ActivationProgressProvider, {
  useActivationProgress,
} from "@/components/activation/ActivationProgressProvider";
import { getCourseLessons } from "@/data/courses";
import type { Course, CourseLesson, CourseModule } from "@/types/course";

type LessonExperienceProps = {
  course: Course;
  courseModule: CourseModule;
  lesson: CourseLesson;
  lessonIndex: number;
  nextLesson?: CourseLesson;
  previousLesson?: CourseLesson;
};

export default function LessonExperience(props: LessonExperienceProps) {
  return (
    <ActivationProgressProvider>
      <Lesson {...props} />
    </ActivationProgressProvider>
  );
}

function Lesson({
  course,
  courseModule,
  lesson,
  lessonIndex,
  nextLesson,
  previousLesson,
}: LessonExperienceProps) {
  const { error, isLoading, mutate, progress } = useActivationProgress();
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [checkpointResult, setCheckpointResult] = useState<
    "idle" | "correct" | "incorrect"
  >("idle");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const startRequested = useRef(false);
  const lessons = useMemo(() => getCourseLessons(course), [course]);
  const courseProgress = progress.courseProgress[course.id];
  const validLessonIds = useMemo(
    () => new Set(lessons.map((item) => item.id)),
    [lessons],
  );
  const completedLessonIds = (courseProgress?.completedLessonIds || []).filter(
    (lessonId) => validLessonIds.has(lessonId),
  );
  const isCompleted = completedLessonIds.includes(lesson.id);
  const completion = lessons.length
    ? Math.round((completedLessonIds.length / lessons.length) * 100)
    : 0;
  const checkpointPassed = checkpointResult === "correct" || isCompleted;

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

  function checkAnswer() {
    if (!selectedOptionId) return;
    setCheckpointResult(
      selectedOptionId === lesson.checkpoint.correctOptionId
        ? "correct"
        : "incorrect",
    );
  }

  async function completeLesson() {
    if (!checkpointPassed || isCompleted || isSaving) return;

    setIsSaving(true);
    setSaveMessage("");
    try {
      const nextProgress = await mutate({
        checkpointOptionId: selectedOptionId,
        courseId: course.id,
        lessonId: lesson.id,
        type: "complete_lesson",
      });
      setSaveMessage(
        nextProgress.courseProgress[course.id]?.completedAt
          ? "Course completed. Your TGPI workspace is now up to date."
          : "Lesson completed. Your progress has been saved.",
      );
    } catch {
      setSaveMessage("We could not save this lesson. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--tgpi-canvas)] text-[var(--tgpi-navy)]">
      <div className="border-b border-white/10 bg-[var(--tgpi-navy)] text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex min-h-11 w-fit items-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold)]/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]"
            >
              <span aria-hidden="true">←</span>&nbsp; Course overview
            </Link>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/55">
              Lesson {lessonIndex + 1} of {lessons.length}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-white/10"
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
            <span className="text-xs font-extrabold text-[var(--tgpi-gold-light)]">
              {completion}%
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_310px] lg:px-8">
        <article className="min-w-0">
          <header className="rounded-[30px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-7 shadow-[var(--tgpi-shadow-soft)] sm:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--tgpi-navy)] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">
                Module {course.modules.findIndex((item) => item.id === courseModule.id) + 1}
              </span>
              <span className="rounded-full border border-[var(--tgpi-border)] bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-muted)]">
                {lesson.durationMinutes} minutes
              </span>
              {isCompleted ? (
                <span className="rounded-full bg-[#E4F3EB] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--tgpi-success)]">
                  ✓ Completed
                </span>
              ) : null}
            </div>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
              {courseModule.title}
            </p>
            <h1 className="mt-3 max-w-4xl text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
              {lesson.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">
              {lesson.summary}
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--tgpi-gold)]/30 bg-[#FFF7DE] p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">
                Lesson objective
              </p>
              <p className="mt-2 text-sm font-extrabold leading-7 text-[#6F5A31]">
                {lesson.objective}
              </p>
            </div>
          </header>

          <div className="mt-7 grid gap-7">
            <LessonSection eyebrow="The situation" title="Enter the scenario">
              <div className="rounded-2xl border-l-4 border-[var(--tgpi-gold)] bg-[var(--tgpi-navy)] p-6 text-base font-bold leading-8 text-white/80 sm:p-7">
                {lesson.scenario}
              </div>
            </LessonSection>

            <LessonSection eyebrow="Language toolkit" title="Four phrases to carry with you">
              <div className="grid gap-4 sm:grid-cols-2">
                {lesson.keyPhrases.map((item, index) => (
                  <div key={item.phrase} className="rounded-2xl border border-[var(--tgpi-border-soft)] bg-white p-5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--tgpi-gold-soft)] text-[10px] font-extrabold text-[var(--tgpi-gold-strong)]" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-[var(--tgpi-navy)]">“{item.phrase}”</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--tgpi-muted)]">{item.meaning}</p>
                    <p className="mt-4 rounded-xl bg-[var(--tgpi-canvas)] p-3 text-sm font-bold leading-6 text-[var(--tgpi-navy)]">
                      {item.example}
                    </p>
                  </div>
                ))}
              </div>
            </LessonSection>

            <LessonSection eyebrow="Model conversation" title="See the language in motion">
              <div className="grid gap-3">
                {lesson.dialogue.map((line, index) => {
                  const isLearner = line.speaker === "You";
                  return (
                    <div key={`${line.speaker}-${index}`} className={`flex ${isLearner ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[88%] rounded-2xl p-4 sm:max-w-[75%] ${isLearner ? "rounded-br-sm bg-[var(--tgpi-navy)] text-white" : "rounded-bl-sm border border-[var(--tgpi-border-soft)] bg-white"}`}>
                        <p className={`text-[9px] font-extrabold uppercase tracking-[0.18em] ${isLearner ? "text-[var(--tgpi-gold-light)]" : "text-[var(--tgpi-gold-strong)]"}`}>
                          {line.speaker}
                        </p>
                        <p className={`mt-2 text-sm font-bold leading-7 ${isLearner ? "text-white/85" : "text-[var(--tgpi-navy)]"}`}>
                          {line.line}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </LessonSection>

            <LessonSection eyebrow="Coach notes" title="Make it sound clear and natural">
              <ul className="grid gap-3">
                {lesson.coachNotes.map((note) => (
                  <li key={note} className="flex gap-4 rounded-2xl border border-[var(--tgpi-border-soft)] bg-white p-4 text-sm font-bold leading-7 text-[var(--tgpi-muted)]">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E4F3EB] text-xs text-[var(--tgpi-success)]" aria-hidden="true">✓</span>
                    {note}
                  </li>
                ))}
              </ul>

              <div className="mt-5 overflow-hidden rounded-2xl border border-[#E8C5C5] bg-[#FFF5F5]">
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-danger)]">Avoid</p>
                    <p className="mt-2 text-sm font-extrabold text-[#7F2828]">“{lesson.commonMistake.avoid}”</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-success)]">Use instead</p>
                    <p className="mt-2 text-sm font-extrabold text-[#175D41]">“{lesson.commonMistake.useInstead}”</p>
                  </div>
                </div>
                <p className="border-t border-[#E8C5C5] px-5 py-4 text-xs font-bold leading-6 text-[var(--tgpi-muted)]">
                  {lesson.commonMistake.reason}
                </p>
              </div>
            </LessonSection>

            <LessonSection eyebrow="Action rehearsal" title={lesson.practiceTask.title}>
              <p className="text-sm leading-7 text-[var(--tgpi-muted)]">{lesson.practiceTask.instruction}</p>
              <div className="mt-5 rounded-2xl border border-dashed border-[var(--tgpi-gold)] bg-[#FFF9E9] p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">Your rehearsal prompt</p>
                <p className="mt-3 text-base font-extrabold leading-8 text-[var(--tgpi-navy)]">{lesson.practiceTask.prompt}</p>
              </div>
            </LessonSection>

            <section id="checkpoint" className="scroll-mt-24 rounded-[28px] border border-[var(--tgpi-gold)]/35 bg-[#FFF7DE] p-6 shadow-[var(--tgpi-shadow-soft)] sm:p-8" aria-labelledby="checkpoint-title">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">Practical checkpoint</p>
              <h2 id="checkpoint-title" className="mt-3 text-3xl font-semibold sm:text-4xl">Prove the decision</h2>
              <fieldset className="mt-6">
                <legend className="text-base font-extrabold leading-8 text-[var(--tgpi-navy)]">{lesson.checkpoint.prompt}</legend>
                <div className="mt-5 grid gap-3">
                  {lesson.checkpoint.options.map((option) => {
                    const selected = selectedOptionId === option.id;
                    return (
                      <label key={option.id} className={`flex cursor-pointer gap-4 rounded-2xl border p-4 transition focus-within:ring-2 focus-within:ring-[var(--tgpi-gold)] ${selected ? "border-[var(--tgpi-gold)] bg-white" : "border-[var(--tgpi-border)] bg-white/65 hover:border-[var(--tgpi-gold)]/60"}`}>
                        <input
                          type="radio"
                          name={`checkpoint-${lesson.id}`}
                          value={option.id}
                          checked={selected}
                          onChange={() => {
                            setSelectedOptionId(option.id);
                            setCheckpointResult("idle");
                          }}
                          className="mt-1 h-5 w-5 shrink-0 accent-[var(--tgpi-navy)]"
                        />
                        <span className="text-sm font-bold leading-7 text-[var(--tgpi-navy)]">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={checkAnswer}
                disabled={!selectedOptionId}
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--tgpi-navy)] px-6 text-sm font-extrabold text-white transition hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] disabled:cursor-not-allowed disabled:opacity-45"
              >
                Check answer
              </button>

              <div aria-live="polite" className="mt-5 min-h-6">
                {checkpointResult !== "idle" ? (
                  <div className={`rounded-2xl border p-4 text-sm font-bold leading-7 ${checkpointResult === "correct" ? "border-[#B9DDCA] bg-[#F1F8F4] text-[#175D41]" : "border-[#E8C5C5] bg-[#FFF5F5] text-[#7F2828]"}`}>
                    <p>{checkpointResult === "correct" ? "Correct — this is the clearest response." : "Not yet. Review the options and try again."}</p>
                    {checkpointResult === "correct" ? <p className="mt-1 font-medium">{lesson.checkpoint.explanation}</p> : null}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 border-t border-[var(--tgpi-gold)]/25 pt-6">
                <button
                  type="button"
                  onClick={completeLesson}
                  disabled={!checkpointPassed || isCompleted || isSaving}
                  className={`inline-flex min-h-14 w-full items-center justify-center rounded-2xl px-6 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] sm:w-auto ${isCompleted ? "bg-[#D8EFE4] text-[#175D41]" : "bg-[var(--tgpi-gold)] text-[var(--tgpi-navy-deep)] hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)] disabled:cursor-not-allowed disabled:opacity-45"}`}
                >
                  {isSaving ? "Saving…" : isCompleted ? "✓ Lesson completed" : "Complete lesson"}
                </button>
                {!checkpointPassed ? (
                  <p className="mt-3 text-xs font-bold text-[#6F5A31]">Pass the checkpoint to complete this lesson.</p>
                ) : null}
                <p role="status" className="mt-3 min-h-5 text-xs font-bold text-[#6F4908]">{saveMessage || error}</p>
              </div>
            </section>
          </div>

          <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Lesson navigation">
            {previousLesson ? (
              <LessonNavigationLink courseId={course.id} direction="previous" lesson={previousLesson} />
            ) : (
              <div />
            )}
            {nextLesson ? (
              <LessonNavigationLink courseId={course.id} direction="next" lesson={nextLesson} />
            ) : (
              <Link href={`/courses/${course.id}`} className="rounded-2xl bg-[var(--tgpi-navy)] p-5 text-right text-white transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
                <span className="block text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]">Course complete</span>
                <span className="mt-2 block text-sm font-extrabold">Return to course overview →</span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="self-start lg:sticky lg:top-6" aria-label="Lesson guide">
          <div className="rounded-[26px] border border-[var(--tgpi-border)] bg-white p-6 shadow-[var(--tgpi-shadow-soft)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[var(--tgpi-gold-strong)]">Lesson rhythm</p>
            <ol className="mt-5 grid gap-4">
              {[
                ["01", "Enter the scenario"],
                ["02", "Learn key phrases"],
                ["03", "Study the dialogue"],
                ["04", "Rehearse aloud"],
                ["05", "Pass the checkpoint"],
              ].map(([number, label]) => (
                <li key={number} className="flex items-center gap-3 text-sm font-bold text-[var(--tgpi-muted)]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--tgpi-canvas)] text-[10px] font-extrabold text-[var(--tgpi-gold-strong)]">{number}</span>
                  {label}
                </li>
              ))}
            </ol>
            <a href="#checkpoint" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[var(--tgpi-gold)] bg-[#FFF7DE] px-4 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:bg-[var(--tgpi-gold-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
              Go to checkpoint ↓
            </a>
            <p className="mt-4 text-xs leading-6 text-[var(--tgpi-muted)]">Say every model phrase aloud. Recognition is useful; retrieval is what you need in the real world.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function LessonSection({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-6 shadow-[var(--tgpi-shadow-sm)] sm:p-8">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function LessonNavigationLink({
  courseId,
  direction,
  lesson,
}: {
  courseId: string;
  direction: "next" | "previous";
  lesson: CourseLesson;
}) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={`/courses/${courseId}/lessons/${lesson.id}`}
      className={`rounded-2xl border border-[var(--tgpi-border)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[var(--tgpi-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] ${isPrevious ? "text-left" : "text-right"}`}
    >
      <span className="block text-[9px] font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">{isPrevious ? "← Previous lesson" : "Next lesson →"}</span>
      <span className="mt-2 block text-sm font-extrabold text-[var(--tgpi-navy)]">{lesson.title}</span>
    </Link>
  );
}
