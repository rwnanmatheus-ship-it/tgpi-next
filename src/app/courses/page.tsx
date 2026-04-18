"use client";

import { courses } from "@/data/courses";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-12">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Education
          </p>

          <h1 className="text-5xl font-bold md:text-6xl">
            Global preparation courses
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Learn languages, understand cultures and prepare yourself to live,
            work or study anywhere in the world.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:scale-[1.02] hover:border-yellow-500"
            >
              <div className="mb-4 text-sm text-yellow-300">
                {course.category} • {course.level}
              </div>

              <h2 className="text-2xl font-bold group-hover:text-yellow-400">
                {course.title}
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                {course.description}
              </p>

              <div className="mt-6 text-sm text-yellow-300">
                Open course →
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}