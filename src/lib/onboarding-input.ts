import { onboardingBudgetValues, onboardingExperienceValues, onboardingGoalValues, onboardingPriorityValues, onboardingTimeHorizonValues } from "@/types/onboarding";
export const onboardingConflictMessage = "This profile changed in another session. Copy your edits, reload and review the latest version before saving.";

/** Validate writes separately from the tolerant reader used for legacy metadata. */
export function isOnboardingInput(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;
  const text = (input: unknown, max: number) => typeof input === "string" && input.length <= max && !/[\p{Cc}<>]/u.test(input);
  const list = (input: unknown, max: number, length: number) => Array.isArray(input) && input.length <= max && input.every(item => text(item, length) && item.trim().length > 0) && new Set(input).size === input.length;
  const choice = (input: unknown, allowed: readonly string[]) => input === "" || typeof input === "string" && allowed.includes(input);
  if (data.schemaVersion !== 1 || typeof data.completed !== "boolean" || !Number.isInteger(data.currentStep) || Number(data.currentStep) < 1 || Number(data.currentStep) > 5) return false;
  if (!choice(data.primaryGoal, onboardingGoalValues) || !choice(data.timeHorizon, onboardingTimeHorizonValues) || !choice(data.budgetRange, onboardingBudgetValues) || !choice(data.internationalExperience, onboardingExperienceValues)) return false;
  if (!list(data.targetCountries, 5, 80) || !list(data.languages, 8, 40) || !list(data.priorities, 5, 40)) return false;
  if (!(data.targetCountries as string[]).every(slug => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) || !(data.priorities as string[]).every(priority => onboardingPriorityValues.includes(priority as typeof onboardingPriorityValues[number]))) return false;
  if (!text(data.profession, 100) || !text(data.educationLevel, 80) || data.updatedAt !== undefined && (!text(data.updatedAt, 40) || !Number.isFinite(Date.parse(data.updatedAt as string)))) return false;
  return !data.completed || Boolean(data.primaryGoal && (data.targetCountries as string[]).length && data.timeHorizon && data.budgetRange && (data.languages as string[]).length && data.internationalExperience && (data.priorities as string[]).length >= 3);
}
