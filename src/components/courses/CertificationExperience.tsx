"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import ActivationProgressProvider, {
  useActivationProgress,
} from "@/components/activation/ActivationProgressProvider";
import type { Course } from "@/types/course";
import type {
  LearningAssessment,
  LearningCertificationStatus,
} from "@/types/learning";

type StatusResponse = {
  error?: string;
  status?: LearningCertificationStatus;
};

function formatDate(value?: string) {
  if (!value) return "Not passed yet";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function CertificationExperience({
  assessments,
  course,
}: {
  assessments: LearningAssessment[];
  course: Course;
}) {
  return (
    <ActivationProgressProvider>
      <CertificationDashboard assessments={assessments} course={course} />
    </ActivationProgressProvider>
  );
}

function CertificationDashboard({
  assessments,
  course,
}: {
  assessments: LearningAssessment[];
  course: Course;
}) {
  const { progress } = useActivationProgress();
  const [status, setStatus] = useState<LearningCertificationStatus | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isIssuing, setIsIssuing] = useState(false);

  const loadStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/learning/status?courseId=${encodeURIComponent(course.id)}`,
        { cache: "no-store", credentials: "same-origin" },
      );
      const payload = (await response.json()) as StatusResponse;
      if (!response.ok || !payload.status) {
        throw new Error(payload.error || "Unable to load certification status.");
      }
      setStatus(payload.status);
      setError("");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load certification status.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [course.id]);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  const completedLessons = useMemo(
    () =>
      new Set(progress.courseProgress[course.id]?.completedLessonIds || []),
    [course.id, progress.courseProgress],
  );
  const summaries = new Map(
    (status?.assessments || []).map((item) => [item.assessmentId, item]),
  );
  const allGatesPassed = assessments
    .filter((item) => item.kind === "module_gate")
    .every((item) => summaries.get(item.id)?.passedAt);
  const allLessonsCompleted =
    completedLessons.size >= (status?.eligibility.totalLessons || Infinity);

  function isAssessmentReady(assessment: LearningAssessment) {
    if (!status?.storageConfigured) return false;
    if (assessment.kind === "capstone") {
      return allLessonsCompleted && allGatesPassed;
    }
    const courseModule = course.modules.find(
      (item) => item.id === assessment.moduleId,
    );
    return Boolean(
      courseModule?.lessons.every((lesson) => completedLessons.has(lesson.id)),
    );
  }

  async function issueCredential() {
    setIsIssuing(true);
    setError("");
    try {
      const response = await fetch("/api/learning/credentials/issue", {
        body: JSON.stringify({
          courseId: course.id,
          publicNameConsent: true,
        }),
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = (await response.json()) as {
        credentialId?: string;
        error?: string;
      };
      if (!response.ok || !payload.credentialId) {
        throw new Error(payload.error || "Unable to issue credential.");
      }
      await loadStatus();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to issue credential.",
      );
    } finally {
      setIsIssuing(false);
    }
  }

  const eligibility = status?.eligibility;

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#0B1F3A]">
      <section className="border-b border-[#D9D1C2] bg-[#07172D] px-4 py-12 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/courses/${course.id}`}
            className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E8CC7B]"
          >
            ← Back to course
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#E8CC7B]">
                TGPI Assessment Engine · Standard {course.learningStandard.version}
              </p>
              <h1 className="mt-4 max-w-4xl font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[.98] tracking-[-0.04em] sm:text-6xl">
                Prove the capability. Earn the record.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#C8D1DE]">
                Seven protected performance gates turn completed lessons into
                evidence. Answers are scored on TGPI servers and every attempt
                becomes part of your private learning record.
              </p>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-white/[0.06] p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E8CC7B]">
                Credential score
              </p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <span className="text-5xl font-extrabold">
                  {eligibility?.finalScore ?? 0}
                </span>
                <span className="pb-1 text-sm font-bold text-[#C8D1DE]">
                  / 100 · mastery {course.assessment.masteryThreshold}
                </span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#E5BF5A] transition-[width]"
                  style={{ width: `${eligibility?.finalScore || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {!isLoading && status && !status.storageConfigured ? (
          <div className="mb-8 rounded-2xl border border-[#D8B75D]/45 bg-[#FFF6D8] p-5 text-sm leading-7 text-[#6F5719]">
            <strong className="block text-[#0B1F3A]">Secure record activation pending</strong>
            The assessment experience is installed, but attempts remain locked
            until the server-only learning record credentials are configured.
            No answer or credential will fall back to insecure browser storage.
          </div>
        ) : null}

        {error ? (
          <div role="alert" className="mb-8 rounded-2xl border border-[#D7A9A4] bg-[#FFF1EF] p-5 text-sm font-bold text-[#8D2F28]">
            {error}
          </div>
        ) : null}

        <section aria-labelledby="evidence-dashboard-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#956A13]">
                Evidence dashboard
              </p>
              <h2 id="evidence-dashboard-title" className="mt-3 text-3xl font-semibold sm:text-5xl">
                Your path to certification
              </h2>
            </div>
            <span className="rounded-full border border-[#D9D1C2] bg-white px-4 py-2 text-xs font-extrabold">
              {eligibility?.moduleGatesPassed || 0}/6 gates passed
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Scenario checkpoints", `${eligibility?.lessonsCompleted || 0}/${eligibility?.totalLessons || 18}`, "20%"],
              ["Module gates", `${eligibility?.moduleGatesPassed || 0}/6`, "30%"],
              ["Integrated capstone", eligibility?.capstonePassed ? "Passed" : "Pending", "40%"],
              ["Transfer reflection", eligibility?.reflectionCompleted ? "Complete" : "Pending", "10%"],
            ].map(([label, value, weight]) => (
              <div key={label} className="rounded-[22px] border border-[#D9D1C2] bg-[#FFFDF8] p-5 shadow-[0_12px_35px_rgba(11,31,58,.05)]">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#956A13]">{weight} of record</p>
                <p className="mt-4 text-2xl font-extrabold">{value}</p>
                <p className="mt-1 text-xs font-bold text-[#6D7480]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="performance-gates-title">
          <h2 id="performance-gates-title" className="text-3xl font-semibold">
            Protected performance gates
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {assessments.map((assessment, index) => {
              const summary = summaries.get(assessment.id);
              const ready = isAssessmentReady(assessment);
              return (
                <article key={assessment.id} className="flex flex-col rounded-[26px] border border-[#D9D1C2] bg-[#FFFDF8] p-6 shadow-[0_16px_45px_rgba(11,31,58,.06)]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B1F3A] text-xs font-extrabold text-[#F0D58C]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`rounded-full px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.13em] ${summary?.passedAt ? "bg-[#DDF1E7] text-[#175D41]" : ready ? "bg-[#FFF0BF] text-[#735410]" : "bg-[#E9E5DD] text-[#6D7480]"}`}>
                      {summary?.passedAt ? "Mastery proven" : ready ? "Ready" : "Locked"}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold">{assessment.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-[#657082]">{assessment.description}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2 border-y border-[#E7E1D5] py-4 text-center">
                    <div><p className="text-lg font-extrabold">{assessment.questions.length}</p><p className="text-[9px] font-bold uppercase text-[#7B8088]">Decisions</p></div>
                    <div><p className="text-lg font-extrabold">{assessment.masteryThreshold}%</p><p className="text-[9px] font-bold uppercase text-[#7B8088]">Pass</p></div>
                    <div><p className="text-lg font-extrabold">{summary?.bestScore ?? "—"}</p><p className="text-[9px] font-bold uppercase text-[#7B8088]">Best score</p></div>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <p className="text-xs font-bold text-[#6D7480]">
                      {summary ? `${summary.attemptCount} attempt${summary.attemptCount === 1 ? "" : "s"} · ${formatDate(summary.passedAt)}` : `${assessment.durationMinutes} min`}
                    </p>
                    {ready ? (
                      <Link href={`/courses/${course.id}/certification/${assessment.id}`} className="inline-flex min-h-11 items-center rounded-xl bg-[#0B1F3A] px-5 text-xs font-extrabold text-white">
                        {summary ? "Open gate" : "Begin"} →
                      </Link>
                    ) : (
                      <span className="text-xs font-extrabold text-[#8A8F96]">
                        Complete prerequisites
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-[30px] border border-[#D5BA6B]/50 bg-[#0B1F3A] text-white">
          <div className="grid lg:grid-cols-[1fr_360px]">
            <div className="p-7 sm:p-10">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#E8CC7B]">TGPI professional credential</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{course.credential.title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#C8D1DE]">
                Issued only after authenticated completion, mastery scoring and
                transfer reflection. The public record exposes evidence and
                status—not your private learning history.
              </p>
            </div>
            <div className="border-t border-white/10 bg-white/[0.05] p-7 lg:border-l lg:border-t-0 sm:p-8">
              {eligibility?.credentialId ? (
                <Link href={`/certificates/${eligibility.credentialId}`} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#E5BF5A] px-5 text-sm font-extrabold text-[#0B1F3A]">
                  View issued credential →
                </Link>
              ) : (
                <div>
                  <p className="mb-3 text-xs leading-6 text-[#C8D1DE]">
                    By issuing, you consent to displaying <strong className="text-white">{status?.publicName || "your profile name"}</strong> on the public verification record.
                  </p>
                  <button
                    type="button"
                    disabled={!eligibility?.eligible || isIssuing}
                    onClick={() => void issueCredential()}
                    className="min-h-12 w-full rounded-xl bg-[#E5BF5A] px-5 text-sm font-extrabold text-[#0B1F3A] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isIssuing ? "Issuing secure record…" : "Consent & issue credential"}
                  </button>
                </div>
              )}
              <p className="mt-4 text-xs leading-6 text-[#C8D1DE]">
                Identity: {eligibility?.identityVerified ? "verified" : "verify your primary email"}. Secure issuance: {status?.credentialConfigured ? "ready" : "activation pending"}.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
