import 'server-only';
import { academyCourses, getAcademyCourse, PREVIOUS_ACADEMY_VERSION } from '@/data/courses/academy/catalog.server';
import type { AcademyRecord } from './academy/types';
import type { LearningProgressItem } from './unified-progress';
import { courses } from '@/data/courses';
import { professionalCourseDrafts } from '@/data/courses/professional';
import { getUserActivationProgress } from '@/lib/activation-store.server';
import { isLearningStorageConfigured, listFirestoreDocuments } from '@/lib/firestore-admin-rest.server';
import type { TgpiActivationProgress } from '@/lib/activation-progress';
import type { ProfessionalRecord } from './professional-model';
import { professionalCourseEnabled } from './professional-runtime';
import { projectLearningProgress, type LearningSummary } from './unified-progress';

/** Callers must derive uid from the server session, never query parameters. */
export async function loadLearningSummary(uid: string, activation?: TgpiActivationProgress): Promise<LearningSummary> {
  const unavailable: LearningSummary['unavailable'] = [];
  const [legacy, professional, academy] = await Promise.allSettled([
    activation ? Promise.resolve(activation) : getUserActivationProgress(uid),
    isLearningStorageConfigured()
      ? listFirestoreDocuments<ProfessionalRecord>(`tgpiLearningUsers/${uid}`, 'professionalCourses', 100)
      : Promise.reject(new Error('Learning storage unavailable')),
    isLearningStorageConfigured() ? listFirestoreDocuments<AcademyRecord>(`tgpiLearningUsers/${uid}`, 'academyCourses', 100) : Promise.reject(new Error('Learning storage unavailable')),
  ]);
  if (legacy.status === 'rejected') unavailable.push('legacy');
  if (professional.status === 'rejected') unavailable.push('professional');
  if (academy.status === 'rejected') unavailable.push('academy');
  const oldItems = projectLearningProgress({ uid,
    legacy: legacy.status === 'fulfilled' ? legacy.value.courseProgress : {}, courses,
    professional: professional.status === 'fulfilled' ? professional.value.map(row => row.data) : [],
    professionalCourses: professionalCourseDrafts.filter(course => professionalCourseEnabled(course.id, process.env.VERCEL_ENV || process.env.NODE_ENV))
      .map(course => ({ id: course.id, title: course.title, version: course.version, lessonIds: course.modules.flatMap(module => module.lessons.map(lesson => lesson.id)) })),
  });
  const records = academy.status === "fulfilled" ? academy.value.map(row => row.data).filter(record => record.uid === uid) : [];
  const current: LearningProgressItem[] = academyCourses.flatMap(course => {
    const record = records.find(r => r.courseId === course.id && r.version === course.version)
      ?? records.find(r => r.courseId === course.id && r.version === PREVIOUS_ACADEMY_VERSION);
    const edition = record && getAcademyCourse(course.id, record.version);
    if (!record || !edition) return [];
    return [{ courseId: course.id, title: course.title, href: `/courses/${course.id}/study`, kind: "academy",
      status: record.credentialId ? "completed" : record.completedAt ? "certificate_pending" : record.final ? "review_due" : "in_progress",
      completed: edition.lessons.filter(l => record.completed[l.id]).length + Number(record.portfolio.trim().length >= 200) + Number(Boolean(record.final)) + Number(Boolean(record.retention)), total: edition.lessons.length + 3, updatedAt: record.updatedAt }];
  });
  const updatedIds = new Set(current.map(item => item.courseId));
  return { unavailable, items: [...current, ...oldItems.filter(item => !updatedIds.has(item.courseId)).map(item => academyCourses.some(c => c.id === item.courseId) ? { ...item, href: `/courses/${item.courseId}/study`, status: "edition_changed" as const } : item)].sort((a,b) => Number(a.status === "completed") - Number(b.status === "completed") || b.updatedAt.localeCompare(a.updatedAt)) };
}
