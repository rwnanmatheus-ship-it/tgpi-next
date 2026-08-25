"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  LearningAssessment,
  LearningAssessmentResult,
  LearningCredentialEligibility,
} from "@/types/learning";

type SubmissionResponse = {
  eligibility?: LearningCredentialEligibility;
  error?: string;
  result?: LearningAssessmentResult;
};

export default function AssessmentExperience({
  assessment,
  courseId,
}: {
  assessment: LearningAssessment;
  courseId: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reflection, setReflection] = useState("");
  const [result, setResult] = useState<LearningAssessmentResult | null>(null);
  const [credentialId, setCredentialId] = useState<string>();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const answered = Object.keys(answers).length;
  const isComplete =
    answered === assessment.questions.length &&
    (!assessment.reflectionPrompt || reflection.trim().length >= 120);
  const feedback = useMemo(
    () => new Map(result?.feedback.map((item) => [item.questionId, item]) || []),
    [result],
  );

  async function submit() {
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch(
        `/api/learning/assessments/${encodeURIComponent(assessment.id)}`,
        {
          body: JSON.stringify({
            answers: Object.entries(answers).map(([questionId, optionId]) => ({
              optionId,
              questionId,
            })),
            courseId,
            reflection,
          }),
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          method: "POST",
        },
      );
      const payload = (await response.json()) as SubmissionResponse;
      if (!response.ok || !payload.result) {
        throw new Error(payload.error || "Unable to submit this assessment.");
      }
      setResult(payload.result);
      setCredentialId(payload.eligibility?.credentialId);
      window.scrollTo({ behavior: "smooth", top: 0 });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to submit this assessment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function beginRetake() {
    setAnswers({});
    setReflection("");
    setResult(null);
    setError("");
    window.scrollTo({ behavior: "smooth", top: 0 });
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#0B1F3A]">
      <header className="sticky top-0 z-20 border-b border-[#D8D2C4] bg-[#FFFDF8]/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <Link href={`/courses/${courseId}/certification`} className="text-xs font-extrabold text-[#6B7280]">
            ← Certification path
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold">{answered}/{assessment.questions.length}</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-[#E3DED5] sm:w-40">
              <div className="h-full bg-[#C39A31]" style={{ width: `${(answered / assessment.questions.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="rounded-[30px] bg-[#0B1F3A] p-7 text-white shadow-[0_24px_70px_rgba(11,31,58,.16)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#E8CC7B]">
              {assessment.kind === "capstone" ? "Integrated capstone" : "Module performance gate"}
            </p>
            <span className="rounded-full border border-white/15 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em]">
              Protected scoring · {assessment.masteryThreshold}% mastery
            </span>
          </div>
          <h1 className="mt-5 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none tracking-[-0.03em] sm:text-5xl">
            {assessment.title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#C8D1DE]">{assessment.description}</p>
        </section>

        {result ? (
          <section className={`mt-7 rounded-[26px] border p-7 sm:p-9 ${result.passed ? "border-[#86BCA1] bg-[#EAF7F0]" : "border-[#D8B75D] bg-[#FFF6D8]"}`} aria-live="polite">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#72520F]">Attempt {result.attemptNumber} scored</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold">{result.passed ? "Mastery threshold reached" : "Review, rehearse, retry"}</h2>
                <p className="mt-2 text-sm leading-7 text-[#5F6875]">{result.correctAnswers} of {result.totalQuestions} decisions correct. Your best result remains in your private learning record.</p>
              </div>
              <div className="text-5xl font-extrabold">{result.score}%</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/courses/${courseId}/certification`} className="inline-flex min-h-12 items-center rounded-xl bg-[#0B1F3A] px-6 text-sm font-extrabold text-white">
                Continue pathway →
              </Link>
              <button type="button" onClick={beginRetake} className="min-h-12 rounded-xl border border-[#B9A76F] bg-white/70 px-6 text-sm font-extrabold">
                Start a new attempt
              </button>
              {credentialId ? (
                <Link href={`/certificates/${credentialId}`} className="inline-flex min-h-12 items-center rounded-xl bg-[#C39A31] px-6 text-sm font-extrabold text-[#0B1F3A]">
                  View credential
                </Link>
              ) : null}
            </div>
          </section>
        ) : null}

        {error ? (
          <div role="alert" className="mt-7 rounded-2xl border border-[#D7A9A4] bg-[#FFF1EF] p-5 text-sm font-bold text-[#8D2F28]">{error}</div>
        ) : null}

        <section className="mt-8 grid gap-6" aria-label="Assessment questions">
          {assessment.questions.map((question, index) => {
            const itemFeedback = feedback.get(question.id);
            return (
              <fieldset key={question.id} disabled={Boolean(result)} className="rounded-[24px] border border-[#D9D1C2] bg-[#FFFDF8] p-6 shadow-[0_12px_35px_rgba(11,31,58,.05)] sm:p-8">
                <legend className="sr-only">Question {index + 1}</legend>
                <div className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EEE6D2] text-xs font-extrabold text-[#72520F]">{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-extrabold leading-7 sm:text-lg">{question.prompt}</p>
                    <div className="mt-5 grid gap-3">
                      {question.options.map((option) => {
                        const selected = answers[question.id] === option.id;
                        return (
                          <label key={option.id} className={`flex cursor-pointer gap-3 rounded-2xl border p-4 text-sm font-bold leading-6 transition ${selected ? "border-[#B68B22] bg-[#FFF6D8]" : "border-[#DED8CC] bg-white hover:border-[#B8AA8E]"}`}>
                            <input
                              type="radio"
                              name={question.id}
                              value={option.id}
                              checked={selected}
                              onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                              className="mt-1 accent-[#0B1F3A]"
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                    {itemFeedback ? (
                      <div className={`mt-5 rounded-2xl p-4 text-sm leading-7 ${itemFeedback.correct ? "bg-[#E5F4EC] text-[#175D41]" : "bg-[#FFF0ED] text-[#823B34]"}`}>
                        <strong>{itemFeedback.correct ? "Sound decision." : "Decision needs revision."}</strong>{" "}{itemFeedback.explanation}
                      </div>
                    ) : null}
                  </div>
                </div>
              </fieldset>
            );
          })}
        </section>

        {assessment.reflectionPrompt ? (
          <section className="mt-6 rounded-[24px] border border-[#D5BA6B] bg-[#FFF7DE] p-6 sm:p-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8A6416]">Transfer reflection · 10% of final record</p>
            <label htmlFor="transfer-reflection" className="mt-4 block text-lg font-extrabold leading-8">{assessment.reflectionPrompt}</label>
            <textarea
              id="transfer-reflection"
              disabled={Boolean(result)}
              value={reflection}
              onChange={(event) => setReflection(event.target.value.slice(0, 2_000))}
              rows={7}
              className="mt-5 w-full rounded-2xl border border-[#CDBA84] bg-white p-4 text-sm leading-7 outline-none focus:border-[#8A6416]"
              placeholder="Write a specific plan using the situations, decisions and capabilities you practiced…"
            />
            <p className="mt-2 text-right text-xs font-bold text-[#756641]">{reflection.trim().length}/120 minimum</p>
          </section>
        ) : null}

        {!result ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-[#D9D1C2] bg-white p-5">
            <p className="text-xs font-bold leading-6 text-[#69717E]">Submission is final for this attempt. You may retry after reviewing server-scored feedback.</p>
            <button
              type="button"
              disabled={!isComplete || isSubmitting}
              onClick={() => void submit()}
              className="min-h-12 rounded-xl bg-[#0B1F3A] px-7 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "Securing attempt…" : "Submit for scoring"}
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
