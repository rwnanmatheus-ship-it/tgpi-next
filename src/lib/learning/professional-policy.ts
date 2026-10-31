import type {
  ProfessionalAssessmentAttempt,
  ProfessionalAssessmentQuestion,
  ProfessionalCourseDraft,
  ProfessionalProjectReview,
  ProfessionalReleaseEvidence,
} from "../../types/professional-learning.ts";

export class ProfessionalPolicyError extends Error {}

const RELEASE_CHECKS = [
  "editorialReviewed", "subjectReviewed", "lessonCoverageReviewed", "diagnosticsTested",
  "questionBankTested", "downloadsTested", "finalProjectTested", "reviewerOperationTested",
  "appealsTested", "persistenceTested", "crossUserIsolationTested", "legacyCompatibilityTested",
  "certificatePdfTested", "credentialLifecycleTested", "mobileAndKeyboardTested",
  "artworkIntegrated", "authenticatedPreviewTested", "measuredTimeReviewed",
] as const satisfies ReadonlyArray<keyof Omit<ProfessionalReleaseEvidence, "courseId" | "courseVersion">>;

export function estimateProfessionalMinutes(course: ProfessionalCourseDraft) {
  return course.modules.flatMap(module => module.lessons).reduce(
    (total, lesson) => total + lesson.minutes.study + lesson.minutes.practice + lesson.minutes.assessment,
    course.project.minutes,
  );
}

/** Fail closed. An absent item is missing evidence, never an implied approval. */
export function professionalReleaseBlockers(
  course: ProfessionalCourseDraft,
  evidence?: ProfessionalReleaseEvidence,
): string[] {
  const blockers: string[] = [];
  if (course.status !== "ready") blockers.push("curriculum_not_ready");
  if (course.access === "unresolved") blockers.push("access_policy_unresolved");
  if (!evidence || evidence.courseId !== course.id || evidence.courseVersion !== course.version) {
    blockers.push("release_evidence_missing_or_stale");
    return blockers;
  }
  for (const key of RELEASE_CHECKS) if (evidence[key] !== true) blockers.push(key);
  return blockers;
}

export function scoreProfessionalQuiz(
  questions: ProfessionalAssessmentQuestion[],
  answers: Array<{ questionId: string; optionId: string }>,
  minimum = 80,
) {
  if (!questions.length || questions.length > 100 || !Number.isFinite(minimum) || minimum < 0 || minimum > 100) {
    throw new ProfessionalPolicyError("Invalid assessment configuration.");
  }
  if (new Set(questions.map(question => question.id)).size !== questions.length) {
    throw new ProfessionalPolicyError("Duplicate assessment question.");
  }
  if (answers.length !== questions.length || new Set(answers.map(answer => answer.questionId)).size !== answers.length) {
    throw new ProfessionalPolicyError("Answer each question exactly once.");
  }
  const selections = new Map(answers.map(answer => [answer.questionId, answer.optionId]));
  const feedback = questions.map(question => {
    if (question.options.length < 2 || new Set(question.options.map(option => option.id)).size !== question.options.length ||
        !question.options.some(option => option.id === question.correctOptionId)) {
      throw new ProfessionalPolicyError("Invalid question configuration.");
    }
    const selected = selections.get(question.id);
    if (!selected || !question.options.some(option => option.id === selected)) throw new ProfessionalPolicyError("Invalid answer option.");
    return { questionId: question.id, correct: selected === question.correctOptionId, essential: question.essential, explanation: question.explanation };
  });
  const score = feedback.filter(item => item.correct).length / questions.length * 100;
  const essentialPassed = feedback.every(item => !item.essential || item.correct);
  return { score, passed: score >= minimum && essentialPassed, essentialPassed, feedback };
}

export function scoreProfessionalProject(
  course: ProfessionalCourseDraft,
  ownerUid: string,
  review: ProfessionalProjectReview,
) {
  const rubric = course.project.rubric;
  if (!ownerUid || !review.reviewerUid || review.reviewerUid === ownerUid || !review.submissionId.trim() ||
      !Number.isFinite(Date.parse(review.reviewedAt)) || review.feedback.trim().length < 80) {
    throw new ProfessionalPolicyError("Independent, documented review is required.");
  }
  if (review.courseVersion !== course.version || review.rubricVersion !== course.approval.rubricVersion) {
    throw new ProfessionalPolicyError("The review belongs to a different curriculum or rubric.");
  }
  if (!rubric.length || new Set(rubric.map(criterion => criterion.id)).size !== rubric.length ||
      rubric.some(criterion => !Number.isFinite(criterion.weight) || criterion.weight <= 0 || !Number.isFinite(criterion.minimum) || criterion.minimum < 0 || criterion.minimum > 100) ||
      Math.abs(rubric.reduce((sum, criterion) => sum + criterion.weight, 0) - 100) > 0.000001) {
    throw new ProfessionalPolicyError("Invalid rubric configuration.");
  }
  if (Object.keys(review.scores).length !== rubric.length || rubric.some(criterion => !Object.hasOwn(review.scores, criterion.id))) {
    throw new ProfessionalPolicyError("Every rubric criterion must be scored exactly once.");
  }
  for (const score of Object.values(review.scores)) {
    if (!Number.isFinite(score) || score < 0 || score > 100) throw new ProfessionalPolicyError("Scores must be finite and between 0 and 100.");
  }
  const score = rubric.reduce((sum, criterion) => sum + review.scores[criterion.id] * criterion.weight / 100, 0);
  const essentialPassed = rubric.every(criterion => !criterion.essential || review.scores[criterion.id] >= criterion.minimum);
  return { score, essentialPassed, passed: score >= course.approval.projectMinimum && essentialPassed };
}

/** Pure decision only. Storage transactions and authorization must enforce the returned decision. */
export function professionalEligibility(input: {
  course: ProfessionalCourseDraft;
  ownerUid: string;
  requiredActivityIds: string[];
  completedActivityIds: string[];
  requiredAssessmentIds: string[];
  attempts: ProfessionalAssessmentAttempt[];
  review?: ProfessionalProjectReview;
  verifiedIdentity: boolean;
  publicSharingConsent: boolean;
}) {
  const { course } = input;
  const missing: string[] = [];
  if (!input.requiredActivityIds.length || new Set(input.requiredActivityIds).size !== input.requiredActivityIds.length ||
      input.requiredActivityIds.some(id => !input.completedActivityIds.includes(id))) missing.push("required_activities");
  if (!input.requiredAssessmentIds.length || new Set(input.requiredAssessmentIds).size !== input.requiredAssessmentIds.length ||
      input.requiredAssessmentIds.some(id => !input.attempts.some(attempt =>
        attempt.assessmentId === id && attempt.courseVersion === course.version && attempt.passed &&
        Number.isFinite(attempt.score) && attempt.score >= course.approval.quizMinimum && attempt.score <= 100 && Number.isFinite(Date.parse(attempt.submittedAt)),
      ))) missing.push("assessments");
  let projectPassed = false;
  if (input.review) {
    try { projectPassed = scoreProfessionalProject(course, input.ownerUid, input.review).passed; }
    catch { projectPassed = false; }
  }
  if (!projectPassed) missing.push("reviewed_project");
  if (!input.verifiedIdentity) missing.push("verified_identity");
  if (!input.publicSharingConsent) missing.push("sharing_consent");
  return { eligible: missing.length === 0, missing };
}
