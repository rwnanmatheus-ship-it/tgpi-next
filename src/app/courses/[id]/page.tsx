"use client";

import { courses } from "@/data/courses";
import { auth } from "@/lib/firebase";
import { markLessonComplete } from "@/lib/course-progress";
import { trackLessonCompletion } from "@/lib/user-stats";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function CoursePage() {
  const params = useParams<{ id: string }>();

  const course = useMemo(() => {
    return courses.find((c) => c.id === params.id);
  }, [params]);

  const [completed, setCompleted] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Course not found
      </main>
    );
  }

  const safeCourse = course;

  async function handleComplete(lessonId: string) {
    const user = auth.currentUser;
    if (!user) {
      setMessage("You must be signed in to track lesson progress.");
      return;
    }

    try {
      await markLessonComplete(user.uid, safeCourse.id, lessonId);
      await trackLessonCompletion(user.uid, `${safeCourse.id}:${lessonId}`, safeCourse.id);

      setCompleted((prev) =>
        prev.includes(lessonId) ? prev : [...prev, lessonId]
      );

      setMessage("Lesson completed. XP added.");
    } catch (error) {
      console.error(error);
      setMessage("Could not complete lesson.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <section className="mb-10">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Course
          </p>

          <h1 className="text-4xl font-bold text-yellow-400">
            {safeCourse.title}
          </h1>

          <p className="mt-4 text-slate-300">{safeCourse.description}</p>

          {message ? (
            <p className="mt-4 text-sm text-yellow-300">{message}</p>
          ) : null}
        </section>

        <section className="space-y-8">
          {safeCourse.modules.map((module) => (
            <div
              key={module.id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-2xl font-bold text-yellow-300">
                {module.title}
              </h2>

              <div className="mt-4 space-y-4">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <h3 className="font-semibold text-white">{lesson.title}</h3>

                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {lesson.content}
                    </p>

                    <button
                      onClick={() => handleComplete(lesson.id)}
                      className="mt-4 rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-400"
                    >
                      {completed.includes(lesson.id)
                        ? "Completed"
                        : "Mark as Complete"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}