import "server-only";
import { createHash } from "node:crypto";
import { getCourse } from "@/data/courses";
import { getUserActivationProgress } from "@/lib/activation-store.server";
import { createFirestoreUpdateWrite, getFirestoreDocument, isLearningStorageConfigured, runFirestoreQuery, runFirestoreTransaction } from "@/lib/firestore-admin-rest.server";
import { portfolioPath, portfolioSubmissionSchema, portfolioReviewSchema, hasExactCompetencies, PORTFOLIO_RUBRIC_VERSION, type PortfolioRecord } from "./portfolio";

export class PortfolioError extends Error {}
function courseFor(id: string) {
  const course = getCourse(id);
  if (!course || course.id !== id || id === "global-english-2026") throw new PortfolioError("This course uses a different certification path.");
  if (!isLearningStorageConfigured()) throw new PortfolioError("Secure learning storage is unavailable. Please retry later.");
  return course;
}
const queuePath = (path: string) => `tgpiLearningUsers/_learningReviewQueue/items/${createHash("sha256").update(path).digest("hex")}`;
export async function getPortfolio(uid: string, courseId: string) {
  const course = courseFor(courseId);
  return (await getFirestoreDocument<PortfolioRecord>(portfolioPath(uid, courseId, course.version)))?.data ?? null;
}
export async function submitPortfolio(uid: string, raw: unknown) {
  const parsed = portfolioSubmissionSchema.safeParse(raw);
  if (!parsed.success) throw new PortfolioError("Complete all fields within their length limits.");
  const input = parsed.data; const course = courseFor(input.courseId);
  if (input.courseVersion !== course.version || !hasExactCompetencies(course, input.evidence)) throw new PortfolioError("The course or competency list changed. Reload before submitting.");
  const progress = await getUserActivationProgress(uid);
  const completed = new Set(progress.courseProgress[course.id]?.completedLessonIds ?? []);
  if (!course.modules.flatMap(item => item.lessons).every(lesson => completed.has(lesson.id))) throw new PortfolioError("Complete every lesson checkpoint before submitting the project.");
  const path = portfolioPath(uid, course.id, course.version);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const existing = (await getDocuments<PortfolioRecord>([path])).get(path);
    if ((existing?.data.revision ?? 0) !== input.revision) throw new PortfolioError("Your submission changed in another session. Reload before submitting.");
    if (existing?.data.state === "approved" || existing?.data.state === "submitted") throw new PortfolioError("This submission is approved or awaiting review. A pending submission cannot be replaced.");
    const record: PortfolioRecord = { ...input, revision: input.revision + 1, rubricVersion: PORTFOLIO_RUBRIC_VERSION, state: "submitted", submittedAt: new Date().toISOString() };
    return { result: record, writes: [
      createFirestoreUpdateWrite(path, { ...record }, existing?.updateTime ? { updateTime: existing.updateTime } : { exists: false }),
      createFirestoreUpdateWrite(`${path}/history/submission-${record.revision}`, { ...record }, { exists: false }),
      createFirestoreUpdateWrite(queuePath(path), { uid, courseId: course.id, courseVersion: course.version, revision: record.revision, state: record.state, submittedAt: record.submittedAt }),
    ] };
  });
}
export async function reviewPortfolio(reviewerId: string, uid: string, courseId: string, raw: unknown) {
  if (reviewerId === uid) throw new PortfolioError("You cannot assess your own work.");
  const course = courseFor(courseId); const parsed = portfolioReviewSchema.safeParse(raw);
  if (!parsed.success || !hasExactCompetencies(course, parsed.data.scores)) throw new PortfolioError("Score every competency and provide evidence-based feedback.");
  const input = parsed.data; const path = portfolioPath(uid, course.id, course.version);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const existing = (await getDocuments<PortfolioRecord>([path])).get(path);
    if (!existing || existing.data.revision !== input.revision || existing.data.state !== "submitted") throw new PortfolioError("This submission has already changed or been reviewed.");
    const approved = course.competencies.every(skill => input.scores[skill.id] >= course.assessment.masteryThreshold);
    const record: PortfolioRecord = { ...existing.data, state: approved ? "approved" : "revision_requested", review: { reviewerId, reviewedAt: new Date().toISOString(), scores: input.scores, feedback: input.feedback, rubricVersion: PORTFOLIO_RUBRIC_VERSION } };
    return { result: record, writes: [
      createFirestoreUpdateWrite(path, { ...record }, { updateTime: existing.updateTime }),
      createFirestoreUpdateWrite(`${path}/history/review-${record.revision}`, { ...record }, { exists: false }),
      createFirestoreUpdateWrite(queuePath(path), { uid, courseId: course.id, courseVersion: course.version, revision: record.revision, state: record.state, submittedAt: record.submittedAt }),
    ] };
  });
}
export async function listPortfolioQueue() {
  if (!isLearningStorageConfigured()) throw new PortfolioError("Secure learning storage is unavailable.");
  return (await runFirestoreQuery<{ uid: string; courseId: string; courseVersion: string; revision: number; state: string; submittedAt: string }>({ from: [{ collectionId: "items" }], where: { fieldFilter: { field: { fieldPath: "state" }, op: "EQUAL", value: { stringValue: "submitted" } } }, limit: 100 }, "tgpiLearningUsers/_learningReviewQueue")).map(item => item.data);
}
