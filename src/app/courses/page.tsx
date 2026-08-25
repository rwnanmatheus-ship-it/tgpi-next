import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import TGPIEditorialVisual, {
  type TGPIVisualVariant,
} from "@/components/TGPIEditorialVisual";
import TGPIPageShell from "@/components/TGPIPageShell";
import { coursesOverview } from "@/data/courses-overview";
import type { CourseOverview } from "@/types/course-overview";

const courses: CourseOverview[] = coursesOverview;
const courseVisuals: TGPIVisualVariant[] = ["learning", "readiness", "premium", "compare"];

export default async function CoursesPage() {
  const { userId } = await auth();
  const learningHref = userId
    ? "/courses/english-abroad"
    : "/sign-in?redirect_url=/courses/english-abroad";

  return (
    <TGPIPageShell>
      <section className="overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_38px_100px_rgba(11,31,58,0.11)]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9A6A12]">
              TGPI Practical Learning
            </p>
            <h1 className="mt-5 max-w-2xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#0B0B0B] md:text-7xl">
              Learn what international life actually requires.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#566070]">
              Build decision, language, career, technology and global-readiness capabilities through connected learning paths.
            </p>
            <div className="mt-6 rounded-2xl border border-[#B58A2A]/35 bg-[#FFF7DE] p-4">
              <p className="text-sm font-black text-[#6F4908]">Best learning experience on desktop</p>
              <p className="mt-1 text-xs leading-6 text-[#6F5A31]">Browse from any device. Use a computer for long lessons, exercises and focused study.</p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={learningHref}
                className="rounded-2xl bg-[#0B1F3A] px-6 py-4 text-center text-sm font-black text-white transition hover:bg-[#132B4C]"
              >
                {userId ? "Continue Learning" : "Create Free Account"}
              </Link>
              <Link
                href="/pricing"
                className="rounded-2xl border border-[#B58A2A] bg-[#FFF7DE] px-6 py-4 text-center text-sm font-black text-[#6F4908] transition hover:bg-[#F7E8BA]"
              >
                Explore Membership
              </Link>
            </div>
          </div>

          <TGPIEditorialVisual
            variant="learning"
            id="courses-hero"
            ariaLabel="Authorial TGPI practical global education illustration"
            className="min-h-[520px]"
          />
        </div>
      </section>

      <section id="learning-paths" className="scroll-mt-28 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9A6A12]">Learning paths</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.04em] text-[#0B0B0B] md:text-6xl">
            Knowledge connected to practical decisions.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#566070]">
            TGPI education is designed to help users compare, prepare, communicate and act across borders.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {courses.map((course, index) => (
            <article
              key={course.id}
              className="group overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-white shadow-[0_24px_70px_rgba(11,31,58,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(11,31,58,0.14)]"
            >
              <TGPIEditorialVisual
                variant={courseVisuals[index % courseVisuals.length]}
                id={`course-${index}`}
                ariaLabel={`${course.title} authorial TGPI learning illustration`}
                className="aspect-[16/9] w-full transition duration-700 group-hover:scale-[1.02]"
              />

              <div className="p-7">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9A6A12]">
                  {course.meta}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold text-[#0B1F3A]">
                  {course.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#566070]">{course.desc}</p>

                <Link
                  href={course.status === "available" ? learningHref : course.href}
                  className="mt-6 inline-flex rounded-2xl bg-[#0B1F3A] px-5 py-3 text-sm font-black text-white transition hover:bg-[#132B4C]"
                >
                  {course.status === "available" ? "Start learning" : "Join path waitlist"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16 grid overflow-hidden rounded-[36px] border border-[#D8D2C4] bg-[#0B1F3A] text-white shadow-[0_34px_100px_rgba(11,31,58,0.2)] lg:grid-cols-[1fr_0.9fr]">
        <div className="p-8 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F0D58C]">
            Learning connected to readiness
          </p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Courses become more valuable when they change your next decision.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#D7DFEA]">
            TGPI connects learning progress with country comparison, readiness gaps and international planning.
          </p>
          <Link
            href="/premium-waitlist"
            className="mt-8 inline-flex rounded-2xl bg-[#B58A2A] px-6 py-4 text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36]"
          >
            Join Premium Early Access
          </Link>
        </div>

        <TGPIEditorialVisual
          variant="premium"
          id="courses-premium"
          ariaLabel="Authorial TGPI premium learning dashboard illustration"
          className="min-h-[460px]"
        />
      </section>
    </TGPIPageShell>
  );
}
