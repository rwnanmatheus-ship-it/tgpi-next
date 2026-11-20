import type { ProfessionalArea } from '@/lib/learning/professional-areas';
import type { CourseRegion } from '@/lib/learning/course-regions';
import type { MarketCourseSpec } from '../types';

export type GlobalCourseListing = {
  id: string; title: string; track: ProfessionalArea; role: string;
  positioning: 'broad' | 'specialist'; region: CourseRegion;
};
export type GlobalCourseSpec = MarketCourseSpec & GlobalCourseListing & {
  method: string; workedExample: string; sources: readonly string[];
};
export const globalWorkload = { hours: 60, lessons: 14, technicalLessonMinutes: 360, extraPortfolioMinutes: 480 } as const;
