import type { Locale } from '@/lib/localization/config';

export type AcademyTranslations = Readonly<Record<Locale, string>>;
export type AcademySection = {
  title: string; body: string;
  /** Preserve the language of an utterance being taught, independently of UI language. */
  preserveTitle?: boolean; preserveBody?: boolean;
  bodyParts?: Array<{ text: string; preserve?: boolean }>;
};
/** The public DTO deliberately contains no scoring keys. */
export type AcademyLesson = {
  id: string; title: string; objective: string; sections: AcademySection[];
  practice: string[]; deliverable: string; minutes: number; references: string[]; foundation: boolean;
};
export type AcademyCourse = {
  id: string; version: string; title: string; description: string; descriptionParts?: string[]; outcomes: string[];
  lessons: AcademyLesson[]; minutes: number; portfolioMinutes: number; assessmentMinutes: number;
  language: string; image: string; legacyHref?: string;
};
export type AcademyQuestion = { id: string; lessonId: string; prompt: string; translations?: AcademyTranslations; options: Array<{ id: string; label: string; translations?: AcademyTranslations }>; essential: boolean };
export type AcademyPrivateQuestion = AcademyQuestion & { correctOptionId: string; explanation: string };
export type AcademyChallenge = {
  id: string; target: string; createdAt: string;
  questions: AcademyQuestion[];
  calculation?: { prompt: string; unit: string; translations?: AcademyTranslations; unitTranslations?: AcademyTranslations };
};
export type AcademyFeedback = { questionId: string; lessonId: string; correct: boolean; explanation: string; translations?: AcademyTranslations };
export type AcademyResult = { challengeId: string; target: string; score: number; passed: boolean; feedback: AcademyFeedback[]; submittedAt: string };
export type AcademyRecord = {
  uid: string; courseId: string; version: string; revision: number; enrolledAt: string; updatedAt: string;
  consent: { publicName: string; acceptedAt: string }; diagnostic: string;
  notes: Record<string, string>; completed: Record<string, { score: number; at: string; challengeId: string }>;
  portfolio: string; final?: { score: number; at: string }; retention?: { score: number; at: string };
  reviewAvailableAt?: string; completedAt?: string; credentialId?: string; sharing: boolean;
  legacy?: { version: string; completed: number; credentialId?: string; state?: string };
  attemptLimits: Record<string, { day: string; count: number; lastAt: string }>;
};
export type AcademyStatus = { record: AcademyRecord | null; publicName: string; emailVerified: boolean; signingReady: boolean; challenge: AcademyChallenge | null; lastResult: AcademyResult | null };
export type LabDecision = [prompt: string, correct: string, incorrect: string, alternative: string, explanation: string];
export type AcademyLab = {
  title: string; concept: string; example: string; practice: string; transfer: string;
  decisions: LabDecision[];
};
export type CaseSpec = {
  prompt: string; unit: string; operation: 'remaining' | 'ratio' | 'percent' | 'sum'; explanation: string;
};
