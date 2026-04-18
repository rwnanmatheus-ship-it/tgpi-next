"use client";

import { courses } from "@/data/courses";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const params = useParams<{ id: string }>();

  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Course not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <section className="mb-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            {course.title}
          </h1>

          <p className="mt-4 text-slate-300">{course.description}</p>
        </section>

        <section className="space-y-8">
          {course.modules.map((module) => (
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
                    <h3 className="font-semibold">{lesson.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {lesson.content}
                    </p>
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