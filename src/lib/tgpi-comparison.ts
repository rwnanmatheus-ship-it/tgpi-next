// Lenses organize research. They do not convert unsupported legacy estimates into rankings.
export const COMPARISON_GOALS = ["overall", "study", "work", "live", "travel"] as const;
export type ComparisonGoal = (typeof COMPARISON_GOALS)[number];
export type ComparisonGoalConfig = { label: string; shortLabel: string; description: string };
const GOAL_CONFIGS: Record<ComparisonGoal, ComparisonGoalConfig> = {
  overall: { label: "Personal research", shortLabel: "Overall", description: "Investigate your legal route, local budget, language requirements and personal constraints." },
  study: { label: "Study abroad", shortLabel: "Study", description: "Investigate accreditation, program requirements, language, tuition, deadlines and study authorization." },
  work: { label: "International career", shortLabel: "Work", description: "Investigate work authorization, qualifications recognition, professional licensing and actual opportunities." },
  live: { label: "Long-term life", shortLabel: "Live", description: "Investigate residence requirements, city-level housing, healthcare access, language and family needs." },
  travel: { label: "Travel preparation", shortLabel: "Travel", description: "Investigate entry requirements, current destination advice, insurance and an itinerary-specific budget." },
};
export function isComparisonGoal(value: string | undefined): value is ComparisonGoal {
  return COMPARISON_GOALS.includes(value as ComparisonGoal);
}
export function getComparisonGoalConfig(goal: ComparisonGoal): ComparisonGoalConfig { return GOAL_CONFIGS[goal]; }
