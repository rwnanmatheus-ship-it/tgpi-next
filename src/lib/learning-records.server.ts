import "server-only";

import { createHash } from "node:crypto";
import { portfolioPath, portfolioApproved, portfolioScore, type PortfolioRecord } from "@/lib/learning/portfolio";
import { getEnglishAbroadAssessmentBank } from "@/data/courses/english-abroad/assessment-bank.server";
import {
  getCourse,
  getCourseLessonCount,
} from "@/data/courses";
import { getUserActivationProgress } from "@/lib/activation-store.server";
import { getOrCreateGlobalKey } from "@/lib/global-key.server";
import {
  TGPI_CREDENTIAL_ALIGNMENT_TARGETS,
  TGPI_VERIFIED_LEARNING_PROFILE,
  TGPI_VERIFIED_LEARNING_SCHEMA_VERSION,
} from "@/lib/credential-standard";
import {
  createCredentialId,
  isCredentialSigningConfigured,
  signLearningCredential,
  TGPI_CREDENTIAL_KEY_ID,
  verifyLearningCredentialIntegrity,
} from "@/lib/credential-signing.server";
import {
  createFirestoreUpdateWrite,
  getFirestoreDocument,
  isLearningStorageConfigured,
  listFirestoreDocuments,
  runFirestoreTransaction,
} from "@/lib/firestore-admin-rest.server";
import type {
  LearningAssessmentResult,
  LearningAssessmentSubmission,
  LearningAssessmentSummary,
  LearningCertificationStatus,
  LearningCredentialEligibility,
  PublicTgpiLearningCredential,
  TgpiLearningCredential,
} from "@/types/learning";

type CourseLearningRecord = {
  assessments: Record<string, LearningAssessmentSummary>;
  courseId: string;
  courseVersion: string;
  createdAt: string;
  credentialId?: string;
  reflectionCompleted: boolean;
  reflectionUpdatedAt?: string;
  updatedAt: string;
  userId: string;
};

type LearningAttemptRecord = LearningAssessmentResult & {
  answers: LearningAssessmentSubmission["answers"];
  courseId: string;
  id: string;
  reflection?: string;
  userId: string;
};

type LearnerIdentity = {
  emailVerified: boolean;
  publicName: string;
  uid: string;
};

export class LearningInputError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "LearningInputError";
    this.status = status;
  }
}

const COURSE_ID = "global-english-2026";
const MIN_REFLECTION_LENGTH = 120;

function hasIssuablePublicName(value: string) {
  const normalized = value.trim();
  return normalized.length >= 2 && normalized !== "TGPI Member";
}

function courseRecordPath(userId: string, courseId: string) {
  return `tgpiLearningUsers/${userId}/courses/${courseId}`;
}

function attemptPath(userId: string, attemptId: string) {
  return `tgpiLearningUsers/${userId}/attempts/${attemptId}`;
}

function credentialPath(credentialId: string) {
  return `tgpiLearningCredentials/${credentialId}`;
}

function userCredentialPath(userId: string, credentialId: string) {
  return `tgpiLearningUsers/${userId}/credentials/${credentialId}`;
}

function supportedCourse(courseId: string) {
  const course = getCourse(courseId);
  if (!course || courseId !== course.id) {
    throw new LearningInputError("This certification path is not available.", 404);
  }
  return course;
}

function emptyRecord(
  userId: string,
  courseId: string,
  courseVersion: string,
): CourseLearningRecord {
  const now = new Date().toISOString();
  return {
    assessments: {},
    courseId,
    courseVersion,
    createdAt: now,
    reflectionCompleted: false,
    updatedAt: now,
    userId,
  };
}

function getAssessmentSummary(
  record: CourseLearningRecord,
  assessmentId: string,
) {
  return record.assessments[assessmentId];
}

function computeEligibility(
  record: CourseLearningRecord,
  lessonsCompleted: number,
  totalLessons: number,
  identityVerified: boolean,
  portfolio?: PortfolioRecord | null,
): LearningCredentialEligibility {
  if (record.courseId !== COURSE_ID) {
    const course = supportedCourse(record.courseId);
    const approved = portfolioApproved(course, portfolio);
    const complete = totalLessons > 0 && lessonsCompleted >= totalLessons;
    return {
      capstonePassed: approved, checkpointCompletion: totalLessons ? Math.min(100, Math.round(lessonsCompleted / totalLessons * 100)) : 0,
      credentialId: record.credentialId, eligible: complete && approved && identityVerified && isLearningStorageConfigured() && isCredentialSigningConfigured(),
      finalScore: portfolioScore(course, portfolio), identityVerified, lessonsCompleted,
      moduleGatesPassed: approved ? course.competencies.length : 0, reflectionCompleted: approved, totalLessons,
    };
  }
  const bank = getEnglishAbroadAssessmentBank();
  const moduleGates = bank.filter((item) => item.kind === "module_gate");
  const capstone = bank.find((item) => item.kind === "capstone");
  const moduleSummaries = moduleGates.map((item) =>
    getAssessmentSummary(record, item.id),
  );
  const moduleGatesPassed = moduleSummaries.filter((item) => item?.passedAt)
    .length;
  const moduleScore = moduleSummaries.reduce(
    (total, item) => total + (item?.bestScore || 0),
    0,
  ) / moduleGates.length;
  const capstoneSummary = capstone
    ? getAssessmentSummary(record, capstone.id)
    : undefined;
  const capstonePassed = Boolean(capstoneSummary?.passedAt);
  const checkpointCompletion = totalLessons
    ? Math.min(100, (lessonsCompleted / totalLessons) * 100)
    : 0;
  const finalScore = Math.round(
    checkpointCompletion * 0.2 +
      moduleScore * 0.3 +
      (capstoneSummary?.bestScore || 0) * 0.4 +
      (record.reflectionCompleted ? 10 : 0),
  );
  const course = supportedCourse(record.courseId);
  const requirementsMet =
    lessonsCompleted >= totalLessons &&
    moduleGatesPassed === moduleGates.length &&
    capstonePassed &&
    record.reflectionCompleted &&
    finalScore >= course.assessment.masteryThreshold;

  return {
    capstonePassed,
    checkpointCompletion: Math.round(checkpointCompletion),
    credentialId: record.credentialId,
    eligible:
      requirementsMet &&
      identityVerified &&
      isLearningStorageConfigured() &&
      isCredentialSigningConfigured(),
    finalScore,
    identityVerified,
    lessonsCompleted,
    moduleGatesPassed,
    reflectionCompleted: record.reflectionCompleted,
    totalLessons,
  };
}

function credentialPayload(
  record: CourseLearningRecord,
  identity: LearnerIdentity,
  eligibility: LearningCredentialEligibility,
  credentialId: string,
  issuedAt: string,
  globalKey: Awaited<ReturnType<typeof getOrCreateGlobalKey>>,
) {
  const course = supportedCourse(record.courseId);
  const anchor =
    globalKey.anchor.status === "confirmed"
      ? {
          anchoredAt: globalKey.anchor.anchoredAt,
          blockNumber: globalKey.anchor.blockNumber,
          chainId: globalKey.anchor.chainId,
          explorerUrl: globalKey.anchor.explorerUrl,
          network: globalKey.anchor.network,
          status: globalKey.anchor.status,
          transactionHash: globalKey.anchor.transactionHash,
        }
      : { status: globalKey.anchor.status };

  return {
    achievementType: "Professional Certificate" as const,
    assessmentScore: eligibility.finalScore,
    competencyIds: course.competencies.map((item) => item.id),
    courseId: course.id,
    courseTitle: course.title,
    courseVersion: course.version,
    credentialProfile: TGPI_VERIFIED_LEARNING_PROFILE,
    credentialSchemaVersion: TGPI_VERIFIED_LEARNING_SCHEMA_VERSION,
    credentialStandardVersion: course.id === COURSE_ID ? "2.0" : "applied-1.0",
    criteriaUrl: "/courses/" + course.id + "/certification",
    evidenceSummary: course.id !== COURSE_ID ? [
      `${eligibility.lessonsCompleted}/${eligibility.totalLessons} formative lesson checkpoints completed`,
      `${course.competencies.length} competencies assessed by an authorized TGPI reviewer; each at or above ${course.assessment.masteryThreshold}%`,
      "Original applied project and transfer task reviewed; rubric applied-1.0",
      "Not an academic degree or independently accredited qualification",
    ] : [
      `${eligibility.lessonsCompleted}/${eligibility.totalLessons} scenario checkpoints completed`,
      `${eligibility.moduleGatesPassed}/6 module performance gates passed`,
      `Integrated capstone passed at or above ${course.assessment.masteryThreshold}%`,
      "Transfer reflection completed",
    ],
    id: credentialId,
    identityEvidence: {
      anchor,
      fingerprint: globalKey.fingerprint,
      globalKeyId: globalKey.keyId,
      revision: globalKey.revision,
    },
    issuedAt,
    issuer: course.credential.issuer,
    keyId: TGPI_CREDENTIAL_KEY_ID,
    learningHours: Math.round(((course.estimatedMinutes + (course.id === COURSE_ID ? 0 : 30)) / 60) * 10) / 10,
    masteryThreshold: course.assessment.masteryThreshold,
    publicName: identity.publicName.slice(0, 120),
    skills: course.competencies.map((item) => ({
      id: item.id,
      level: item.level,
      name: item.title,
    })),
    standardsAlignment: [...TGPI_CREDENTIAL_ALIGNMENT_TARGETS],
    status: "active" as const,
  };
}

function createCredential(
  record: CourseLearningRecord,
  identity: LearnerIdentity,
  eligibility: LearningCredentialEligibility,
  credentialId: string,
  issuedAt: string,
  globalKey: Awaited<ReturnType<typeof getOrCreateGlobalKey>>,
): TgpiLearningCredential {
  const payload = credentialPayload(
    record,
    identity,
    eligibility,
    credentialId,
    issuedAt,
    globalKey,
  );
  const unsignedCredential = {
    ...payload,
    ownerUid: identity.uid,
  };
  return {
    ...unsignedCredential,
    verificationHash: signLearningCredential(unsignedCredential),
  };
}

function requireAssessmentAccess(
  courseId: string,
  assessmentId: string,
  completedLessonIds: string[],
  record: CourseLearningRecord,
) {
  const course = supportedCourse(courseId);
  if (course.id !== COURSE_ID) throw new LearningInputError("This course uses a reviewed practical project, not this assessment bank.", 404);
  const assessment = getEnglishAbroadAssessmentBank().find(
    (item) => item.id === assessmentId,
  );
  if (!assessment) {
    throw new LearningInputError("Assessment not found.", 404);
  }
  const completed = new Set(completedLessonIds);

  if (assessment.kind === "module_gate") {
    const courseModule = course.modules.find(
      (item) => item.id === assessment.moduleId,
    );
    const ready = courseModule?.lessons.every((lesson) => completed.has(lesson.id));
    if (!ready) {
      throw new LearningInputError(
        "Complete every lesson in this module before attempting its performance gate.",
        409,
      );
    }
  }

  if (assessment.kind === "capstone") {
    const allLessons = course.modules
      .flatMap((item) => item.lessons)
      .every((lesson) => completed.has(lesson.id));
    const gatesPassed = getEnglishAbroadAssessmentBank()
      .filter((item) => item.kind === "module_gate")
      .every((item) => record.assessments[item.id]?.passedAt);
    if (!allLessons || !gatesPassed) {
      throw new LearningInputError(
        "Complete all lessons and pass all six module gates before the capstone.",
        409,
      );
    }
  }

  return assessment;
}

function parseSubmission(
  value: unknown,
  assessmentId: string,
): LearningAssessmentSubmission {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new LearningInputError("Assessment submission is invalid.");
  }
  const input = value as Record<string, unknown>;
  if (!Array.isArray(input.answers)) {
    throw new LearningInputError("Every assessment question requires one answer.");
  }
  const answers = input.answers.map((answer) => {
    if (!answer || typeof answer !== "object" || Array.isArray(answer)) {
      throw new LearningInputError("Assessment answers are invalid.");
    }
    const item = answer as Record<string, unknown>;
    if (
      typeof item.questionId !== "string" ||
      typeof item.optionId !== "string" ||
      item.questionId.length > 80 ||
      item.optionId.length > 20
    ) {
      throw new LearningInputError("Assessment answers are invalid.");
    }
    return { optionId: item.optionId, questionId: item.questionId };
  });
  const questionIds = new Set(answers.map((item) => item.questionId));
  if (questionIds.size !== answers.length) {
    throw new LearningInputError("Submit only one answer per question.");
  }
  const reflection =
    typeof input.reflection === "string"
      ? input.reflection.trim().slice(0, 2_000)
      : undefined;
  if (assessmentId === "global-english-capstone" && !reflection) {
    throw new LearningInputError("Complete the transfer reflection before submitting.");
  }
  if (
    assessmentId === "global-english-capstone" &&
    (reflection?.length || 0) < MIN_REFLECTION_LENGTH
  ) {
    throw new LearningInputError(
      `The transfer reflection requires at least ${MIN_REFLECTION_LENGTH} characters.`,
    );
  }
  return { answers, reflection };
}

function scoreSubmission(
  assessmentId: string,
  rawSubmission: unknown,
  attemptNumber: number,
) {
  const assessment = getEnglishAbroadAssessmentBank().find(
    (item) => item.id === assessmentId,
  );
  if (!assessment) throw new LearningInputError("Assessment not found.", 404);
  const submission = parseSubmission(rawSubmission, assessmentId);
  if (submission.answers.length !== assessment.questions.length) {
    throw new LearningInputError("Answer every question before submitting.");
  }
  const selections = new Map(
    submission.answers.map((item) => [item.questionId, item.optionId]),
  );
  assessment.questions.forEach((question) => {
    const selected = selections.get(question.id);
    if (!selected || !question.options.some((option) => option.id === selected)) {
      throw new LearningInputError("One or more selected answers are invalid.");
    }
  });
  const feedback = assessment.questions.map((question) => ({
    correct: selections.get(question.id) === question.correctOptionId,
    explanation: question.explanation,
    questionId: question.id,
  }));
  const correctAnswers = feedback.filter((item) => item.correct).length;
  const score = Math.round((correctAnswers / assessment.questions.length) * 100);
  const submittedAt = new Date().toISOString();
  const result: LearningAssessmentResult = {
    assessmentId,
    attemptNumber,
    correctAnswers,
    feedback,
    passed: score >= assessment.masteryThreshold,
    score,
    submittedAt,
    totalQuestions: assessment.questions.length,
  };
  return { result, submission };
}

async function progressSnapshot(userId: string, courseId: string) {
  const course = supportedCourse(courseId);
  const progress = await getUserActivationProgress(userId);
  const courseProgress = progress.courseProgress[courseId];
  return {
    completedLessonIds: [...new Set((courseProgress?.completedLessonIds || []).filter(id => course.modules.some(courseModule => courseModule.lessons.some(lesson => lesson.id === id))))],
    totalLessons: getCourseLessonCount(course),
  };
}

export async function getLearningCertificationStatus(
  identity: LearnerIdentity,
  courseId: string,
): Promise<LearningCertificationStatus> {
  const course = supportedCourse(courseId);
  const progress = await progressSnapshot(identity.uid, courseId);
  const storageConfigured = isLearningStorageConfigured();
  const record = storageConfigured
    ? (await getFirestoreDocument<CourseLearningRecord>(
        courseRecordPath(identity.uid, courseId),
      ))?.data || emptyRecord(identity.uid, courseId, course.version)
    : emptyRecord(identity.uid, courseId, course.version);

  const portfolio = storageConfigured && course.id !== COURSE_ID
    ? (await getFirestoreDocument<PortfolioRecord>(portfolioPath(identity.uid, course.id, course.version)))?.data : null;
  return {
    assessments: Object.values(record.assessments).sort((a, b) =>
      a.assessmentId.localeCompare(b.assessmentId),
    ),
    credentialConfigured:
      storageConfigured && isCredentialSigningConfigured(),
    eligibility: computeEligibility(
      record,
      progress.completedLessonIds.length,
      progress.totalLessons,
      identity.emailVerified && hasIssuablePublicName(identity.publicName),
      portfolio,
    ),
    publicName: identity.publicName,
    storageConfigured,
  };
}

export async function submitLearningAssessment(
  identity: LearnerIdentity,
  courseId: string,
  assessmentId: string,
  rawSubmission: unknown,
) {
  if (!isLearningStorageConfigured()) {
    throw new LearningInputError(
      "The secure learning record service is not configured.",
      503,
    );
  }
  const course = supportedCourse(courseId);
  const progress = await progressSnapshot(identity.uid, courseId);
  const recordPath = courseRecordPath(identity.uid, courseId);

  return runFirestoreTransaction(async ({ getDocuments }) => {
    const documents = await getDocuments<CourseLearningRecord>([recordPath]);
    const existing = documents.get(recordPath);
    const record = existing?.data || emptyRecord(identity.uid, courseId, course.version);
    const assessment = requireAssessmentAccess(
      courseId,
      assessmentId,
      progress.completedLessonIds,
      record,
    );
    const previous = record.assessments[assessmentId];
    if (
      previous?.lastAttemptAt &&
      Date.now() - new Date(previous.lastAttemptAt).getTime() < 30_000
    ) {
      throw new LearningInputError(
        "Wait 30 seconds before starting another scored attempt.",
        429,
      );
    }
    const { result, submission } = scoreSubmission(
      assessmentId,
      rawSubmission,
      (previous?.attemptCount || 0) + 1,
    );
    const summary: LearningAssessmentSummary = {
      assessmentId,
      attemptCount: result.attemptNumber,
      bestScore: Math.max(previous?.bestScore || 0, result.score),
      lastAttemptAt: result.submittedAt,
      passedAt: previous?.passedAt || (result.passed ? result.submittedAt : undefined),
    };
    const reflectionCompleted =
      record.reflectionCompleted ||
      (assessment.kind === "capstone" &&
        (submission.reflection?.length || 0) >= MIN_REFLECTION_LENGTH);
    const nextRecord: CourseLearningRecord = {
      ...record,
      assessments: { ...record.assessments, [assessmentId]: summary },
      courseVersion: course.version,
      reflectionCompleted,
      reflectionUpdatedAt:
        assessment.kind === "capstone" && submission.reflection
          ? result.submittedAt
          : record.reflectionUpdatedAt,
      updatedAt: result.submittedAt,
    };
    const eligibility = computeEligibility(
      nextRecord,
      progress.completedLessonIds.length,
      progress.totalLessons,
      identity.emailVerified && hasIssuablePublicName(identity.publicName),
    );
    const writes = [];
    const attemptId = `${assessmentId}-${crypto.randomUUID()}`;
    const attempt: LearningAttemptRecord = {
      ...result,
      answers: submission.answers,
      courseId,
      id: attemptId,
      reflection: submission.reflection,
      userId: identity.uid,
    };

    writes.push(
      createFirestoreUpdateWrite(
        attemptPath(identity.uid, attemptId),
        { ...attempt },
        { exists: false },
      ),
      createFirestoreUpdateWrite(
        recordPath,
        { ...nextRecord },
        existing?.updateTime
          ? { updateTime: existing.updateTime }
          : { exists: false },
      ),
    );

    return {
      result: {
        eligibility,
        result: result.passed ? result : { ...result, feedback: [] },
      },
      writes,
    };
  });
}

export async function issueLearningCredential(
  identity: LearnerIdentity,
  courseId: string,
) {
  if (!isLearningStorageConfigured() || !isCredentialSigningConfigured()) {
    throw new LearningInputError(
      "Credential issuance is not configured.",
      503,
    );
  }
  const course = supportedCourse(courseId);
  let globalKey: Awaited<ReturnType<typeof getOrCreateGlobalKey>>;
  try {
    globalKey = await getOrCreateGlobalKey(identity.uid);
  } catch {
    throw new LearningInputError(
      "Your verified TGPI Global Key must be available before credential issuance.",
      409,
    );
  }
  const progress = await progressSnapshot(identity.uid, courseId);
  const recordPath = courseRecordPath(identity.uid, courseId);

  return runFirestoreTransaction(async ({ getDocuments }) => {
    const projectPath = portfolioPath(identity.uid, course.id, course.version);
    const documents = await getDocuments<CourseLearningRecord | PortfolioRecord>(course.id === COURSE_ID ? [recordPath] : [recordPath, projectPath]);
    const existing = documents.get(recordPath) as { data: CourseLearningRecord; updateTime?: string } | null | undefined;
    const portfolio = documents.get(projectPath)?.data as PortfolioRecord | undefined;
    const record = existing?.data || emptyRecord(identity.uid, courseId, course.version);
    const eligibility = computeEligibility(
      record,
      progress.completedLessonIds.length,
      progress.totalLessons,
      identity.emailVerified && hasIssuablePublicName(identity.publicName),
      portfolio,
    );
    if (record.credentialId) return { result: record.credentialId, writes: [] };
    if (!eligibility.eligible) {
      throw new LearningInputError(
        "Complete every learning, assessment, reflection and identity requirement first.",
        409,
      );
    }
    const issuedAt = new Date().toISOString();
    const credentialId = createCredentialId(courseId);
    const credential = createCredential(
      record,
      identity,
      eligibility,
      credentialId,
      issuedAt,
      globalKey,
    );
    const nextRecord = {
      ...record,
      credentialId,
      updatedAt: issuedAt,
    };
    return {
      result: credentialId,
      writes: [
        createFirestoreUpdateWrite(
          credentialPath(credentialId),
          { ...credential },
          { exists: false },
        ),
        createFirestoreUpdateWrite(
          userCredentialPath(identity.uid, credentialId),
          { ...credential },
          { exists: false },
        ),
        createFirestoreUpdateWrite(
          recordPath,
          { ...nextRecord },
          existing?.updateTime
            ? { updateTime: existing.updateTime }
            : { exists: false },
        ),
      ],
    };
  });
}

export async function listUserLearningCredentials(userId: string) {
  if (!isLearningStorageConfigured()) return [];
  const documents = await listFirestoreDocuments<TgpiLearningCredential>(
    `tgpiLearningUsers/${userId}`,
    "credentials",
    50,
  );
  return documents
    .map((item) => item.data)
    .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
}

export async function getUserLearningCredential(
  userId: string,
  credentialId: string,
) {
  if (!isLearningStorageConfigured() || credentialId.length > 100) return null;
  return (
    await getFirestoreDocument<TgpiLearningCredential>(
      userCredentialPath(userId, credentialId),
    )
  )?.data || null;
}

export async function getPublicLearningCredential(
  credentialId: string,
): Promise<PublicTgpiLearningCredential | null> {
  if (!isLearningStorageConfigured() || credentialId.length > 100) return null;
  const document = await getFirestoreDocument<TgpiLearningCredential>(
    credentialPath(credentialId),
  );
  if (!document) return null;
  const { ownerUid: _ownerUid, verificationHash: _verificationHash, ...credential } =
    document.data;
  void _ownerUid;
  void _verificationHash;
  return {
    ...credential,
    integrityFingerprint: createHash("sha256")
      .update(document.data.verificationHash)
      .digest("base64url"),
    integrityVerified: verifyLearningCredentialIntegrity(document.data),
  };
}
