import type { CinematicKey } from '@/lib/cinematic-art';
import type { CourseGoal } from '@/types/course-overview';

export type MarketUnit = readonly [title: string, method: string, example: string, correct: string, incorrect: string, alternative: string];
export type MarketTrack = {
  label: string; goal: CourseGoal; artwork: CinematicKey; prerequisite: string; sources: readonly string[];
  scope: string; units: readonly [MarketUnit, MarketUnit, MarketUnit, MarketUnit, MarketUnit, MarketUnit];
};
export type MarketCourseSpec = {
  id: string; track: string; title: string; role: string;
  /** Editorial hypothesis, never a measured search-volume or employability claim. */
  positioning: 'broad' | 'specialist';
  scenario: string; decision: string; misconception: string; changedConstraint: string;
  tasks: readonly [string, string, string, string, string, string];
};
export const marketWorkload = { hours: 40, labMinutes: 120, projectStageMinutes: 255, portfolioMinutes: 360, assessmentMinutes: 120, lessons: 12 } as const;
