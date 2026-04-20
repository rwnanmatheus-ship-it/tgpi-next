"use client";

import PageContainer from "@/components/PageContainer";
import Link from "next/link";

const featuredCourses = [
  {
    title: "English for Living Abroad",
    category: "Language",
    level: "Beginner",
    description:
      "Build practical English for airports, housing, jobs, daily life, and real conversations abroad.",
    slug: "english-abroad",
  },
  {
    title: "Cultural Integration Basics",
    category: "Cultural Integration",
    level: "Beginner",
    description:
      "Learn how to adapt socially, understand etiquette, and avoid common mistakes in a new country.",
    slug: "cultural-preparation-basics",
  },
  {
    title: "Work Abroad Preparation",
    category: "Career",
    level: "Intermediate",
    description:
      "Understand interviews, professional positioning, communication, and global work readiness.",
    slug: "work-abroad-preparation",
  },
  {
    title: "Travel Preparation Essentials",
    category: "Travel",
    level: "Beginner",
    description:
      "Prepare yourself for international travel with practical guidance, safety, and planning skills.",
    slug: "travel-preparation-essentials",
  },
  {
    title: "Relocation Readiness",
    category: "Relocation",
    level: "Intermediate",
    description:
      "Prepare for moving abroad with a stronger understanding of adaptation, planning, and next steps.",
    slug: "relocation-readiness",
  },
  {
    title: "Global Country Orientation",
    category: "Global Readiness",
    level: "Beginner",
    description:
      "A foundational course to understand how to evaluate countries for tourism, study, work, or relocation.",
    slug: "global-country-orientation",
  },
];

export default function CoursesPage() {
  return (
    <PageContainer
      title="Courses"
      subtitle="Explore language, cultural integration, travel, and global preparation courses inside TGPI."
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
          <p className="mb-3 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Education
          </p>

          <h2 className="text-3xl font-bold text-yellow-400">
            Learn the skills needed to live anywhere in the world.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-300">
            TGPI courses are designed to prepare users for international life through
            language, cultural integration, travel readiness, relocation planning,
            and strategic global knowledge.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Available courses</p>
              <p className="mt-2 text-3xl font-bold text-yellow-400">
                {featuredCourses.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Main focus</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">
                Global readiness
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Learning style</p>
              <p className="mt-2 text-2xl font-bold text-yellow-400">
                Practical + premium
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            What you can study here
          </h2>

          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <p>• Language preparation for real life abroad</p>
            <p>• Cultural integration and adaptation skills</p>
            <p>• Travel preparation and safety awareness</p>
            <p>• Work and relocation readiness</p>
            <p>• Global country orientation and strategic planning</p>
          </div>

          <Link
            href="/premium"
            className="mt-8 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Unlock Premium Learning
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-yellow-400">
            Available Courses
          </h2>
          <p className="mt-2 text-slate-400">
            Browse the current learning catalog available inside TGPI.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredCourses.map((course) => (
            <div
              key={course.slug}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-yellow-500"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-yellow-300">{course.category}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {course.title}
                  </h3>
                </div>

                <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300">
                  {course.level}
                </span>
              </div>

              <p className="text-sm leading-7 text-slate-400">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/courses/${course.slug}`}
                  className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
                >
                  Open Course
                </Link>

                <Link
                  href="/premium"
                  className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-5 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  Premium Access
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}