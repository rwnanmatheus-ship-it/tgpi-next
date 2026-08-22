export const onboardingGoalValues = [
  "live",
  "study",
  "work",
  "travel",
  "learn",
] as const;

export const onboardingTimeHorizonValues = [
  "now",
  "3-months",
  "6-months",
  "12-months",
  "exploring",
] as const;

export const onboardingBudgetValues = [
  "under-1500",
  "1500-3000",
  "3000-5000",
  "5000-plus",
  "undecided",
] as const;

export const onboardingExperienceValues = [
  "first-step",
  "short-trips",
  "lived-abroad",
  "global-citizen",
] as const;

export const onboardingPriorityValues = [
  "safety",
  "cost",
  "career",
  "quality-of-life",
  "documentation",
  "education",
  "language",
  "culture",
] as const;

export type OnboardingGoal = (typeof onboardingGoalValues)[number];
export type OnboardingTimeHorizon =
  (typeof onboardingTimeHorizonValues)[number];
export type OnboardingBudget = (typeof onboardingBudgetValues)[number];
export type OnboardingExperience =
  (typeof onboardingExperienceValues)[number];
export type OnboardingPriority =
  (typeof onboardingPriorityValues)[number];

export type TgpiOnboardingData = {
  schemaVersion: 1;
  completed: boolean;
  currentStep: number;
  primaryGoal: OnboardingGoal | "";
  targetCountries: string[];
  timeHorizon: OnboardingTimeHorizon | "";
  budgetRange: OnboardingBudget | "";
  languages: string[];
  profession: string;
  educationLevel: string;
  internationalExperience: OnboardingExperience | "";
  priorities: OnboardingPriority[];
  updatedAt?: string;
  completedAt?: string;
};

export type OnboardingCountry = {
  slug: string;
  name: string;
  emoji: string;
  region: string;
};
