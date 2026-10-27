import { z } from "zod";
import type { Course } from "@/types/course";

export const PORTFOLIO_RUBRIC_VERSION = "applied-1.0";
const id = z.string().regex(/^[a-zA-Z0-9._-]{1,128}$/);
export const portfolioSubmissionSchema = z.object({
  courseId: id, courseVersion: id, revision: z.number().int().min(0),
  project: z.string().trim().min(200).max(14000),
  transfer: z.string().trim().min(100).max(6000),
  evidence: z.record(id, z.string().trim().min(80).max(3000)),
  aiDisclosure: z.string().trim().min(2).max(1000),
}).strict();
export const portfolioReviewSchema = z.object({
  revision: z.number().int().min(1),
  scores: z.record(id, z.number().int().min(0).max(100)),
  feedback: z.string().trim().min(80).max(6000),
}).strict();
export type PortfolioSubmission = z.infer<typeof portfolioSubmissionSchema>;
export type PortfolioRecord = PortfolioSubmission & {
  rubricVersion: string; submittedAt: string;
  state: "submitted" | "revision_requested" | "approved";
  review?: { reviewerId: string; reviewedAt: string; scores: Record<string, number>; feedback: string; rubricVersion: string };
};
export function portfolioPath(uid: string, courseId: string, version: string) {
  for (const value of [uid, courseId, version]) if (!id.safeParse(value).success) throw new Error("Invalid portfolio reference.");
  return `tgpiLearningUsers/${uid}/learningPortfolios/${courseId.length}_${courseId}_${version.length}_${version}`;
}
export function hasExactCompetencies(course: Course, values: Record<string, unknown>) {
  return Object.keys(values).length === course.competencies.length && course.competencies.every(skill => Object.hasOwn(values, skill.id));
}
export function portfolioApproved(course: Course, record?: PortfolioRecord | null) {
  return Boolean(record && record.courseId === course.id && record.courseVersion === course.version &&
    record.state === "approved" && record.rubricVersion === PORTFOLIO_RUBRIC_VERSION &&
    record.review?.rubricVersion === PORTFOLIO_RUBRIC_VERSION && record.review.reviewerId &&
    hasExactCompetencies(course, record.evidence) && hasExactCompetencies(course, record.review.scores) &&
    course.competencies.every(skill => Number.isInteger(record.review!.scores[skill.id]) && record.review!.scores[skill.id] >= course.assessment.masteryThreshold && record.review!.scores[skill.id] <= 100));
}
export function portfolioScore(course: Course, record?: PortfolioRecord | null) {
  if (!record?.review || !hasExactCompetencies(course, record.review.scores)) return 0;
  return Math.round(course.competencies.reduce((total, skill) => total + record.review!.scores[skill.id], 0) / course.competencies.length);
}
