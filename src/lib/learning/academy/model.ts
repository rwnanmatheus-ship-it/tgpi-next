import { z } from 'zod';
export const academyId = z.string().regex(/^[a-zA-Z0-9._-]{1,160}$/);
const common = { version: academyId };
export const academyGoals = ['foundation', 'application', 'portfolio'] as const;
export const academyMutation = z.discriminatedUnion('action', [
  z.object({ ...common, action: z.literal('enrol'), diagnostic: z.string().trim().min(30).max(3000), nameConsent: z.literal(true), plan: z.object({ goal: z.enum(academyGoals), weeklyHours: z.number().int().min(1).max(20) }).strict().optional() }).strict(),
  z.object({ ...common, action: z.literal('save'), revision: z.number().int().nonnegative(), lessonId: academyId, text: z.string().max(6000) }).strict(),
  z.object({ ...common, action: z.literal('portfolio'), revision: z.number().int().nonnegative(), text: z.string().max(12000) }).strict(),
  z.object({ ...common, action: z.literal('begin'), revision: z.number().int().nonnegative(), target: academyId }).strict(),
  z.object({ ...common, action: z.literal('submit'), challengeId: academyId, answers: z.array(z.object({ questionId: academyId, optionId: academyId }).strict()).min(1).max(40), calculation: z.string().max(40).optional() }).strict(),
  z.object({ ...common, action: z.literal('issue'), confirmedName: z.string().min(1).max(121).optional() }).strict(),
  z.object({ ...common, action: z.literal('sharing'), sharing: z.boolean() }).strict(),
]);
export function academyRecordPath(uid: string, courseId: string, version: string) {
  [uid, courseId, version].forEach(id => academyId.parse(id));
  return `tgpiLearningUsers/${uid}/academyCourses/${courseId}--${version}`;
}
export function numericAnswer(value: string | undefined): number | null {
  const normalized = (value ?? '').trim().replace(',', '.');
  if (!/^-?\d+(?:\.\d{1,6})?$/.test(normalized)) return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}
