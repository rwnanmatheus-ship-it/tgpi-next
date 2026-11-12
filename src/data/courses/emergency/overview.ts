import type { CourseOverview } from '@/types/course-overview';
import { emergencyCover, emergencyCourseGoal, emergencyCourses } from './catalog';

export const emergencyOverview: CourseOverview[] = emergencyCourses.map(course => ({
  id: course.id,
  title: course.title,
  category: 'Primeiros socorros e desastres',
  desc: course.description,
  audience: course.audience,
  benefits: [...course.outcomes],
  duration: `${course.hours}h`,
  format: `${course.lessons} aulas e laboratórios online`,
  goal: emergencyCourseGoal,
  goalLabel: 'Primeiros socorros e desastres',
  href: `/courses/${course.id}`,
  image: emergencyCover(course.id),
  imageAlt: course.imageAlt,
  level: 'Formação aplicada',
  releaseLabel: 'Disponível agora',
  status: 'available',
  learningPolicy: {
    kind: 'practice',
    publicationStatus: 'published',
    accessPolicy: 'free_account',
    assessmentPolicy: 'automatic_assessment',
    credentialStatus: 'criteria_available',
    instructionLanguage: 'pt-BR',
    ...(course.practicalTraining ? { credentialScope: 'theory' } : {}),
  },
}));
