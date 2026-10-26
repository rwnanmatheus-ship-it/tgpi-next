import { z } from "zod";

export const journalSchema = z.object({
  courseId: z.string().regex(/^[a-z0-9-]{1,100}$/),
  courseVersion: z.string().regex(/^[a-zA-Z0-9._-]{1,40}$/),
  lessonId: z.string().regex(/^[a-z0-9-]{1,100}$/),
  revision: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),
  notes: z.string().max(6000),
  practice: z.string().max(6000),
  diagnostic: z.string().max(2000),
  reviewDays: z.union([z.literal(0), z.literal(1), z.literal(3), z.literal(7), z.literal(14), z.literal(30)]),
}).strict();
export type JournalInput = z.infer<typeof journalSchema>;
export type LearningJournal = JournalInput & { updatedAt: string; nextReviewAt: string | null };

export class JournalError extends Error {
  readonly status: number;
  constructor(message: string, status = 400) { super(message); this.status = status; }
}

export function journalPath(uid: string, courseId: string, version: string, lessonId: string) {
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(uid)) throw new JournalError("Invalid account.");
  const parsed = journalSchema.pick({ courseId: true, courseVersion: true, lessonId: true }).safeParse({ courseId, courseVersion: version, lessonId });
  if (!parsed.success) throw new JournalError("Invalid lesson reference.");
  // Length-prefixed components avoid ambiguous IDs and never accept a client-supplied owner.
  const key = [courseId, version, lessonId].map(value => `${value.length}_${value}`).join("_");
  return `tgpiLearningUsers/${uid}/learningJournals/${key}`;
}

export function nextJournal(input: JournalInput, now: Date): LearningJournal {
  return { ...input, revision: input.revision + 1, updatedAt: now.toISOString(), nextReviewAt: input.reviewDays ? new Date(now.getTime() + input.reviewDays * 86_400_000).toISOString() : null };
}
