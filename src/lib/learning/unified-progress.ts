import type { CourseProgress } from '../activation-progress.ts';
import type { Course } from '../../types/course.ts';
import type { ProfessionalRecord } from './professional-model.ts';
import { getLearningContinuation } from '../learning-continuity.ts';

export type LearningStatus = 'in_progress' | 'awaiting_review' | 'revision_requested' | 'approved' | 'completed' | 'edition_changed' | 'review_due' | 'certificate_pending';
export type LearningProgressItem = {
  courseId: string; title: string; href: string; kind: 'legacy' | 'professional' | 'academy';
  status: LearningStatus; completed: number; total: number; updatedAt: string;
};
export type LearningSummary = { items: LearningProgressItem[]; unavailable: Array<'legacy' | 'professional' | 'academy'> };
export type ProfessionalProgressCourse = { id: string; title: string; version: string; lessonIds: string[] };

/** Read-only projection: preserve editions and never infer certification from lesson completion. */
export function projectLearningProgress(input: {
  uid: string; legacy: Readonly<Record<string, CourseProgress>>; courses: readonly Course[];
  professional: readonly ProfessionalRecord[]; professionalCourses: readonly ProfessionalProgressCourse[];
}): LearningProgressItem[] {
  const items: LearningProgressItem[] = [];
  for (const [id, record] of Object.entries(input.legacy)) {
    if (id === 'english-abroad' && input.legacy['global-english-2026']) continue;
    const next = getLearningContinuation(input.courses, { [id]: record });
    const course = input.courses.find(course => course.id === next?.courseId);
    if (!course || !next) continue;
    const lessons = new Set(course.modules.flatMap(module => module.lessons.map(lesson => lesson.id)));
    const current = course.version === record.courseVersion;
    const completed = current ? new Set(record.completedLessonIds.filter(id => lessons.has(id))).size : 0;
    items.push({ courseId: course.id, title: course.title, href: next.href, kind: 'legacy',
      status: !current ? 'edition_changed' : next.complete ? 'completed' : 'in_progress',
      completed, total: lessons.size, updatedAt: record.updatedAt });
  }
  // Multiple stored editions remain intact. Prefer the current edition for the same course.
  const records = [...input.professional].filter(record => record.uid === input.uid)
    .sort((a,b) => b.updatedAt.localeCompare(a.updatedAt));
  for (const course of input.professionalCourses) {
    const candidates = records.filter(record => record.courseId === course.id);
    const record = candidates.find(record => record.version === course.version) ?? candidates[0];
    if (!record) continue;
    const current = record.version === course.version;
    const valid = new Set(course.lessonIds);
    const completed = current ? Object.keys(record.activities).filter(id => valid.has(id)).length : 0;
    const status: LearningStatus = !current ? 'edition_changed' : record.credentialId ? 'completed'
      : record.state === 'approved' ? 'approved' : record.state === 'submitted' || record.state === 'appealed' ? 'awaiting_review'
      : record.state === 'revision_requested' ? 'revision_requested' : 'in_progress';
    items.push({ courseId: course.id, title: course.title, href: `/courses/${course.id}${current ? '/study' : ''}`,
      kind: 'professional', status, completed, total: valid.size, updatedAt: record.updatedAt });
  }
  return items.sort((a,b) => Number(a.status === 'completed') - Number(b.status === 'completed') || b.updatedAt.localeCompare(a.updatedAt));
}

export const learningStatusLabels: Record<LearningStatus, string> = {
  in_progress: 'In progress', awaiting_review: 'Awaiting project review',
  revision_requested: 'Project revisions requested', approved: 'Project approved · Check certificate requirements',
  review_due: 'Spaced review pending', certificate_pending: 'Completed · Certificate pending',
  completed: 'Completed', edition_changed: 'New edition · Review your course',
};
