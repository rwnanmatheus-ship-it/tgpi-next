/** New authoring contract. Existing course IDs and earned credentials are untouched. */
export type ProfessionalLesson = {
  id: string;
  title: string;
  objective: string;
  explanation: string;
  workedExample: string;
  guidedPractice: string;
  independentPractice: string;
  successCriteria: string[];
  commonErrors: string[];
  recovery: string;
  referenceUrls: string[];
  minutes: { study: number; practice: number; assessment: number };
};

export type ProfessionalRubricCriterion = {
  id: string;
  title: string;
  description: string;
  weight: number;
  essential: boolean;
  minimum: number;
};

export type ProfessionalCourseDraft = {
  id: string;
  version: string;
  status: "authoring" | "review" | "ready";
  title: string;
  instructionLanguage: "pt-BR";
  certificateLanguage: "pt-BR";
  prerequisites: string[];
  tools: string[];
  outcomes: string[];
  buildsOn: string[];
  diagnostic: string;
  modules: Array<{ id: string; title: string; lessons: ProfessionalLesson[] }>;
  project: {
    brief: string;
    deliverables: string[];
    transfer: string;
    reviewMode: "human";
    minutes: number;
    rubric: ProfessionalRubricCriterion[];
  };
  continuation: string;
  access: "unresolved" | "free" | "premium";
  approval: {
    quizMinimum: number;
    projectMinimum: number;
    rubricVersion: string;
  };
};

export type ProfessionalReleaseEvidence = {
  courseId: string;
  courseVersion: string;
  editorialReviewed: boolean;
  subjectReviewed: boolean;
  lessonCoverageReviewed: boolean;
  diagnosticsTested: boolean;
  questionBankTested: boolean;
  downloadsTested: boolean;
  finalProjectTested: boolean;
  reviewerOperationTested: boolean;
  appealsTested: boolean;
  persistenceTested: boolean;
  crossUserIsolationTested: boolean;
  legacyCompatibilityTested: boolean;
  certificatePdfTested: boolean;
  credentialLifecycleTested: boolean;
  mobileAndKeyboardTested: boolean;
  artworkIntegrated: boolean;
  authenticatedPreviewTested: boolean;
  measuredTimeReviewed: boolean;
};

export type ProfessionalAssessmentQuestion = {
  id: string;
  prompt: string;
  options: Array<{ id: string; label: string }>;
  correctOptionId: string;
  essential: boolean;
  explanation: string;
};

export type ProfessionalAssessmentAttempt = {
  assessmentId: string;
  courseVersion: string;
  score: number;
  passed: boolean;
  submittedAt: string;
};

export type ProfessionalProjectReview = {
  courseVersion: string;
  rubricVersion: string;
  submissionId: string;
  reviewerUid: string;
  reviewedAt: string;
  scores: Record<string, number>;
  feedback: string;
};
