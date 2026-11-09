import 'server-only';
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
  const [legacy, professional] = await Promise.allSettled([
    activation ? Promise.resolve(activation) : getUserActivationProgress(uid),
    isLearningStorageConfigured()
      ? listFirestoreDocuments<ProfessionalRecord>(`tgpiLearningUsers/${uid}`, 'professionalCourses', 100)
      : Promise.reject(new Error('Learning storage unavailable')),
  ]);
  if (legacy.status === 'rejected') unavailable.push('legacy');
  if (professional.status === 'rejected') unavailable.push('professional');
  return { unavailable, items: projectLearningProgress({ uid,
    legacy: legacy.status === 'fulfilled' ? legacy.value.courseProgress : {}, courses,
    professional: professional.status === 'fulfilled' ? professional.value.map(row => row.data) : [],
    professionalCourses: professionalCourseDrafts.filter(course => professionalCourseEnabled(course.id, process.env.VERCEL_ENV || process.env.NODE_ENV))
      .map(course => ({ id: course.id, title: course.title, version: course.version, lessonIds: course.modules.flatMap(module => module.lessons.map(lesson => lesson.id)) })),
  }) };
}
