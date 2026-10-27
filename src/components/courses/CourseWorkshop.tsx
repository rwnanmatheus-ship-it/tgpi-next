import type { Course } from "@/types/course";
import { learningWorkshops } from "@/data/courses/learning-workshops";

export default function CourseWorkshop({ course }: { course: Course }) {
  const workshop = learningWorkshops[course.id];
  if (!workshop) return null;
  return <section aria-labelledby="workshop-heading" className="mt-8 rounded-3xl border border-[var(--tgpi-border)] bg-white p-5 sm:p-8">
    <p className="text-xs font-bold uppercase tracking-widest text-[var(--tgpi-gold-strong)]">TGPI applied workshop · Supplement 1.0</p>
    <h2 id="workshop-heading" className="mt-2 text-3xl font-semibold">Build something you can explain and defend</h2>
    <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--tgpi-muted)]">Original optional practice, authored 26 October 2026. Not independently specialist-reviewed. Existing issued certificates remain valid. The optional applied certification route requires a reviewed project in addition to lesson checkpoints. Estimated additional practice: 25–40 minutes (5–10 reading, 15–20 producing, 5–10 self-review); this is a planning estimate, not verified study time.</p>
    <div className="mt-5 rounded-2xl bg-[var(--tgpi-canvas)] p-4 text-sm leading-7"><strong>Before you begin:</strong> {workshop.prerequisite}</div>
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div><h3 className="text-lg font-bold">The case</h3><p className="mt-2 text-sm leading-7">{workshop.scenario}</p><h3 className="mt-5 text-lg font-bold">How to reason through it</h3><p className="mt-2 text-sm leading-7">{workshop.explanation}</p></div>
      <div className="rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-5"><h3 className="text-lg font-bold">Worked example</h3><p className="mt-3 text-sm leading-7">{workshop.workedExample}</p></div>
    </div>
    <div className="mt-6 rounded-2xl bg-[var(--tgpi-navy)] p-5 text-white"><h3 className="text-lg font-bold">Your independent application</h3><p className="mt-3 text-sm leading-7">{workshop.assignment}</p><p className="mt-3 text-xs leading-6 text-white/80">Rehearse in the final lesson’s private journal, then submit your final evidence through the project review page. AI may help explain concepts or review a practice draft; identify its contribution, verify its claims and write your own final response. Do not use AI to answer protected assessments.</p></div>
    <h3 className="mt-6 text-lg font-bold">Self-review criteria — visible before you start</h3>
    <ol className="mt-3 grid list-decimal gap-3 pl-5 text-sm leading-7 sm:grid-cols-2">{workshop.criteria.map(criterion => <li key={criterion} className="pr-4">{criterion}</li>)}</ol>
    <p className="mt-3 text-xs leading-6 text-[var(--tgpi-muted)]">For each criterion, identify the exact sentence, calculation or artifact that supports it. Mark missing evidence as “revise”. Self-review is not a validated grade or a demonstrated competency.</p>
    <div className="mt-5 grid gap-5 sm:grid-cols-2"><div><h3 className="font-bold">Transfer to a new situation</h3><p className="mt-2 text-sm leading-7">{workshop.transfer}</p></div><div><h3 className="font-bold">If you need another attempt</h3><p className="mt-2 text-sm leading-7">{workshop.recovery}</p></div></div>
    {course.id !== "global-english-2026" && <a href={`/courses/${course.id}/project`} className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-[var(--tgpi-navy)] px-5 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-[var(--tgpi-gold)]">Practical project and certificate review →</a>}
    <details className="mt-6 border-t border-[var(--tgpi-border)] pt-4 text-sm leading-7"><summary className="min-h-11 cursor-pointer font-bold focus-visible:outline-2 focus-visible:outline-[var(--tgpi-gold)]">Scope, sources and assessment limits</summary><p className="mt-2">This is original TGPI educational material. Examples are hypothetical. It does not establish personal immigration, legal, health, tax or financial eligibility; verify applicable facts with the responsible local authority. No external university affiliation, academic equivalence or employment outcome is claimed.</p><p className="mt-3">Teaching-method references, consulted 26 October 2026: <a href="https://bokcenter.harvard.edu/active-learning" className="underline">Harvard Bok Center: Active Learning</a>; <a href="https://blog.coursera.org/how-to-integrate-mastery-learning-into-course-design/" className="underline">Coursera: Mastery Learning in Course Design</a>. These support the instructional approach, not specialist approval of the subject matter.</p></details>
  </section>;
}
