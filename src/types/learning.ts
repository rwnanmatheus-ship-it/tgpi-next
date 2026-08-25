export type LearningAssessmentKind = "module_gate" | "capstone";

export type LearningAssessmentOption = {
  id: string;
  label: string;
};

export type LearningAssessmentQuestion = {
  competencyId: string;
  id: string;
  options: LearningAssessmentOption[];
  prompt: string;
};

export type LearningAssessment = {
  description: string;
  durationMinutes: number;
  id: string;
  kind: LearningAssessmentKind;
  masteryThreshold: number;
  moduleId?: string;
  questions: LearningAssessmentQuestion[];
  reflectionPrompt?: string;
  title: string;
};

export type LearningAssessmentAnswer = {
  optionId: string;
  questionId: string;
};

export type LearningAssessmentSubmission = {
  answers: LearningAssessmentAnswer[];
  reflection?: string;
};

export type LearningAssessmentResult = {
  assessmentId: string;
  attemptNumber: number;
  correctAnswers: number;
  feedback: Array<{
    correct: boolean;
    explanation: string;
    questionId: string;
  }>;
  passed: boolean;
  score: number;
  submittedAt: string;
  totalQuestions: number;
};

export type LearningAssessmentSummary = {
  assessmentId: string;
  attemptCount: number;
  bestScore: number;
  lastAttemptAt: string;
  passedAt?: string;
};

export type LearningCredentialEligibility = {
  capstonePassed: boolean;
  checkpointCompletion: number;
  credentialId?: string;
  eligible: boolean;
  finalScore: number;
  identityVerified: boolean;
  lessonsCompleted: number;
  moduleGatesPassed: number;
  reflectionCompleted: boolean;
  totalLessons: number;
};

export type LearningCertificationStatus = {
  assessments: LearningAssessmentSummary[];
  credentialConfigured: boolean;
  eligibility: LearningCredentialEligibility;
  publicName: string;
  storageConfigured: boolean;
};

export type TgpiLearningCredentialStatus = "active" | "revoked";

export type TgpiLearningCredential = {
  assessmentScore: number;
  competencyIds: string[];
  courseId: string;
  courseTitle: string;
  courseVersion: string;
  credentialStandardVersion: string;
  evidenceSummary: string[];
  id: string;
  issuedAt: string;
  issuer: "TGPI — The Global Polymath Institute";
  keyId: string;
  learningHours: number;
  masteryThreshold: number;
  ownerUid: string;
  publicName: string;
  status: TgpiLearningCredentialStatus;
  verificationHash: string;
};

export type PublicTgpiLearningCredential = Omit<
  TgpiLearningCredential,
  "ownerUid" | "verificationHash"
> & {
  integrityVerified: boolean;
};
