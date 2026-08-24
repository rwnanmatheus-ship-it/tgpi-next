"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ActivationProgressProvider, {
  useActivationProgress,
} from "@/components/activation/ActivationProgressProvider";
import { courses } from "@/data/courses";

export default function CoursePage() {
  return (
    <ActivationProgressProvider>
      <CourseExperience />
    </ActivationProgressProvider>
  );
}

function CourseExperience() {
  const params = useParams<{ id: string }>();
  const { error, isLoading, mutate, progress } = useActivationProgress();
  const [pendingLessonId, setPendingLessonId] = useState("");
  const [message, setMessage] = useState("");
  const startRequested = useRef(false);
  const course = useMemo(
    () => courses.find((item) => item.id === params.id),
    [params.id],
  );
  const courseProgress = course ? progress.courseProgress[course.id] : undefined;
  const lessonIds = useMemo(
    () =>
      course?.modules.flatMap((module) =>
        module.lessons.map((lesson) => lesson.id),
      ) || [],
    [course],
  );
  const completedLessonIds = (courseProgress?.completedLessonIds || []).filter(
    (lessonId) => lessonIds.includes(lessonId),
  );
  const totalLessons = lessonIds.length;
  const completion = totalLessons
    ? Math.round((completedLessonIds.length / totalLessons) * 100)
    : 0;

  useEffect(() => {
    if (!course || isLoading || courseProgress || startRequested.current) return;
    startRequested.current = true;
    mutate({ courseId: course.id, type: "start_course" }).catch(() => {
      startRequested.current = false;
    });
  }, [course, courseProgress, isLoading, mutate]);

  if (!course) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-[#F5F1E8] px-6 text-[#0B1F3A]">
        <div className="max-w-lg rounded-[28px] border border-[#D8D2C4] bg-white p-8 text-center shadow-[0_24px_70px_rgba(11,31,58,0.1)]">
          <h1 className="font-[var(--tgpi-font-display)] text-4xl font-semibold">
            Course not found
          </h1>
          <Link href="/courses" className="mt-6 inline-flex font-black text-[#956A13]">
            Return to learning paths →
          </Link>
        </div>
      </main>
    );
  }

  const safeCourse = course;

  async function handleComplete(lessonId: string) {
    if (completedLessonIds.includes(lessonId)) return;
    setPendingLessonId(lessonId);
    setMessage("");
    try {
      const next = await mutate({
        courseId: safeCourse.id,
        lessonId,
        type: "complete_lesson",
      });
      const nextCourse = next.courseProgress[safeCourse.id];
      setMessage(
        nextCourse?.completedAt
          ? "Learning path completed. Your workspace has been updated."
          : "Lesson completed and saved to your workspace.",
      );
    } catch {
      setMessage("Unable to save this lesson. Please try again.");
    } finally {
      setPendingLessonId("");
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-10 text-[#0B1F3A] sm:px-6 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/courses#learning-paths"
          className="inline-flex min-h-11 items-center rounded-full border border-[#D8D2C4] bg-white px-4 text-sm font-black text-[#0B1F3A] transition hover:border-[#B58A2A]"
        >
          ← All learning paths
        </Link>

        <section className="mt-6 overflow-hidden rounded-[36px] border border-[#D0B168] bg-[#0B1F3A] text-white shadow-[0_32px_90px_rgba(11,31,58,0.22)]">
          <div className="grid lg:grid-cols-[1.15fr_.85fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F0D58C]">
                TGPI Practical Learning
              </p>
              <h1 className="mt-5 max-w-3xl font-[var(--tgpi-font-display)] text-5xl font-semibold leading-[0.96] sm:text-6xl">
                {safeCourse.title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#D7E0EB] sm:text-base">
                {safeCourse.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-xs font-black">
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                  {safeCourse.category}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
                  {safeCourse.level}
                </span>
                <span className="rounded-full border border-[#F0D58C]/35 bg-[#F0D58C]/10 px-4 py-2 text-[#F0D58C]">
                  {totalLessons} lessons
                </span>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.045] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F0D58C]">
                    Learning progress
                  </p>
                  <p className="mt-3 font-[var(--tgpi-font-display)] text-5xl font-semibold">
                    {completion}%
                  </p>
                </div>
                <p className="text-sm font-black text-[#D7E0EB]">
                  {completedLessonIds.length}/{totalLessons}
                </p>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#E5BF5A] transition-[width]"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <p className="mt-5 text-xs leading-6 text-[#C7D0DC]">
                Progress is stored privately and follows your TGPI Global Key across devices.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6">
          {safeCourse.modules.map((module, moduleIndex) => (
            <section
              key={module.id}
              className="rounded-[30px] border border-[#D8D2C4] bg-[#FFFDF8] p-6 shadow-[0_20px_60px_rgba(11,31,58,0.08)] sm:p-8"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#956A13]">
                Module {String(moduleIndex + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold">
                {module.title}
              </h2>

              <div className="mt-6 grid gap-4">
                {module.lessons.map((lesson, lessonIndex) => {
                  const completed = completedLessonIds.includes(lesson.id);
                  const pending = pendingLessonId === lesson.id;
                  return (
                    <article
                      key={lesson.id}
                      className={`rounded-2xl border p-5 transition ${
                        completed
                          ? "border-[#9CCDB6] bg-[#EDF8F2]"
                          : "border-[#E4DED2] bg-white"
                      }`}
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="max-w-3xl">
                          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#7A8390]">
                            Lesson {lessonIndex + 1}
                          </p>
                          <h3 className="mt-2 text-lg font-black">{lesson.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-[#657082]">
                            {lesson.content}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleComplete(lesson.id)}
                          disabled={completed || Boolean(pendingLessonId)}
                          className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl px-5 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A2A] disabled:cursor-default ${
                            completed
                              ? "bg-[#D8EFE4] text-[#1F6548]"
                              : "bg-[#0B1F3A] text-white hover:bg-[#143454] disabled:opacity-60"
                          }`}
                        >
                          {pending ? "Saving…" : completed ? "✓ Completed" : "Mark complete"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <p
          role="status"
          className="mt-6 min-h-6 text-sm font-bold text-[#8A641F]"
        >
          {message || error}
        </p>
      </div>
    </main>
  );
}
