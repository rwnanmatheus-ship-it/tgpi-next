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

export type TgpiCredentialAnchorEvidence =
  | {
      status: "activation_pending" | "awaiting_anchor";
    }
  | {
      anchoredAt: string;
      blockNumber: string;
      chainId: 8453;
      explorerUrl: string;
      network: "base-mainnet";
      status: "confirmed";
      transactionHash: string;
    };

export type TgpiCredentialSkill = {
  id: string;
  level: "foundation" | "applied" | "independent";
  name: string;
};

export type TgpiCredentialIdentityEvidence = {
  anchor: TgpiCredentialAnchorEvidence;
  fingerprint: string;
  globalKeyId: string;
  revision: number;
};

export type TgpiLearningCredential = {
  achievementType: "Professional Certificate";
  assessmentScore: number;
  competencyIds: string[];
  courseId: string;
  courseTitle: string;
  courseVersion: string;
  credentialProfile: "TGPI Verified Learning Credential";
  credentialSchemaVersion: 2;
  credentialStandardVersion: string;
  criteriaUrl: string;
  evidenceSummary: string[];
  id: string;
  identityEvidence: TgpiCredentialIdentityEvidence;
  issuedAt: string;
  issuer: "TGPI — The Global Polymath Institute";
  keyId: string;
  learningHours: number;
  masteryThreshold: number;
  ownerUid: string;
  publicName: string;
  skills: TgpiCredentialSkill[];
  standardsAlignment: string[];
  status: TgpiLearningCredentialStatus;
  verificationHash: string;
};

export type PublicTgpiLearningCredential = Omit<
  TgpiLearningCredential,
  "ownerUid" | "verificationHash"
> & {
  integrityFingerprint: string;
  integrityVerified: boolean;
};
