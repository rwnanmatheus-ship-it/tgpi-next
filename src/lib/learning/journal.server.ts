import "server-only";
import { getCourse, getCourseLesson } from "@/data/courses";
import { createFirestoreUpdateWrite, getFirestoreDocument, isLearningStorageConfigured, runFirestoreTransaction } from "@/lib/firestore-admin-rest.server";
import { JournalError, journalPath, journalSchema, nextJournal, type LearningJournal } from "./journal";

function reference(uid: string, courseId: string, version: string, lessonId: string) {
  const path = journalPath(uid, courseId, version, lessonId);
  const course = getCourse(courseId);
  if (!course || course.id !== courseId || !getCourseLesson(course, lessonId)) throw new JournalError("Lesson not found.", 404);
  if (course.version !== version) throw new JournalError("This course version changed. Reload before saving; your earlier journal is preserved.", 409);
  if (!isLearningStorageConfigured()) throw new JournalError("Private learning storage is unavailable. Keep this page open and retry.", 503);
  return path;
}

export async function readJournal(uid: string, courseId: string, version: string, lessonId: string) {
  return (await getFirestoreDocument<LearningJournal>(reference(uid, courseId, version, lessonId)))?.data ?? null;
}

export async function saveJournal(uid: string, raw: unknown) {
  const parsed = journalSchema.safeParse(raw);
  if (!parsed.success) throw new JournalError("Check the journal fields and text limits.");
  const input = parsed.data;
  const path = reference(uid, input.courseId, input.courseVersion, input.lessonId);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const existing = (await getDocuments<LearningJournal>([path])).get(path);
    if ((existing?.data.revision ?? 0) !== input.revision) throw new JournalError("A newer copy was saved in another tab or device. Copy your draft before reloading.", 409);
    const journal = nextJournal(input, new Date());
    return { result: journal, writes: [createFirestoreUpdateWrite(path, { ...journal }, existing?.updateTime ? { updateTime: existing.updateTime } : { exists: false })] };
  });
}
