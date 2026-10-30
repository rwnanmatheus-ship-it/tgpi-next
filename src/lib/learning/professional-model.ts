import { z } from "zod";
import type { ProfessionalProjectReview } from "../../types/professional-learning";

export const professionalId = z.string().regex(/^[a-zA-Z0-9._-]{1,128}$/);
export const professionalProjectSchema = z.object({
  project: z.string().trim().min(200).max(14000),
  transfer: z.string().trim().min(100).max(6000),
  evidence: z.record(professionalId, z.string().trim().min(80).max(2000)),
  aiDisclosure: z.string().trim().min(2).max(1000),
  audioId: professionalId.optional(),
  files: z.array(professionalId).max(6).optional(),
}).strict();
export const professionalMutationSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("enrol"), version: professionalId, diagnostic: z.string().trim().min(80).max(4000) }).strict(),
  z.object({ action: z.literal("activity"), version: professionalId, revision: z.number().int().nonnegative(), lessonId: professionalId, text: z.string().trim().min(80).max(4000) }).strict(),
  z.object({ action: z.literal("quiz"), version: professionalId, answers: z.array(z.object({ questionId: professionalId, optionId: professionalId }).strict()).min(1).max(100) }).strict(),
  z.object({ action: z.literal("draft"), version: professionalId, revision: z.number().int().nonnegative(), project: z.string().max(14000), transfer: z.string().max(6000), evidence: z.record(professionalId, z.string().max(2000)), aiDisclosure: z.string().max(1000), audioId: professionalId.optional(), files: z.array(professionalId).max(6).optional() }).strict(),
  z.object({ action: z.literal("submit"), version: professionalId, revision: z.number().int().nonnegative() }).strict(),
  z.object({ action: z.literal("appeal"), version: professionalId, revision: z.number().int().nonnegative(), text: z.string().trim().min(80).max(4000) }).strict(),
  z.object({ action: z.literal("issue"), version: professionalId, nameConsent: z.literal(true), sharing: z.boolean() }).strict(),
  z.object({ action: z.literal("sharing"), version: professionalId, sharing: z.boolean() }).strict(),
]);
export type ProfessionalMutation = z.infer<typeof professionalMutationSchema>;
export type ProfessionalProject = z.infer<typeof professionalProjectSchema>;
export type ProfessionalRecord = {
  uid: string;
  courseId: string;
  version: string;
  revision: number;
  enrolledAt: string;
  updatedAt: string;
  diagnostic: string;
  activities: Record<string, string>;
  lastLessonId?: string;
  quiz?: { score: number; passed: boolean; submittedAt: string; attempt: number };
  draft?: { project: string; transfer: string; evidence: Record<string, string>; aiDisclosure: string; audioId?: string; files?: string[] };
  submission?: ProfessionalProject & { id: string; submittedAt: string };
  state: "studying" | "submitted" | "revision_requested" | "approved" | "appealed";
  review?: ProfessionalProjectReview;
  appeal?: { text: string; submittedAt: string };
  completedAt?: string;
  credentialId?: string;
};

export const professionalReviewSchema = z.object({
  uid: professionalId, courseId: professionalId, version: professionalId,
  revision: z.number().int().nonnegative(),
  scores: z.record(professionalId, z.number().min(0).max(100)),
  feedback: z.string().trim().min(80).max(6000),
  expertiseAttestation: z.literal(true),
  oralEvidenceReviewed: z.boolean().optional(),
}).strict();

export function professionalRecordPath(uid: string, courseId: string, version: string) {
  for (const id of [uid, courseId, version]) professionalId.parse(id);
  return `tgpiLearningUsers/${uid}/professionalCourses/${courseId}--${version}`;
}
