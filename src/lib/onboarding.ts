import {
  onboardingBudgetValues,
  onboardingExperienceValues,
  onboardingGoalValues,
  onboardingPriorityValues,
  onboardingTimeHorizonValues,
  type OnboardingBudget,
  type OnboardingExperience,
  type OnboardingGoal,
  type OnboardingPriority,
  type OnboardingTimeHorizon,
  type TgpiOnboardingData,
} from "@/types/onboarding";

const MAX_COUNTRIES = 5;
const MAX_LANGUAGES = 8;
const MAX_PRIORITIES = 5;

const languageAliases: Record<string, string> = {
  Português: "Portuguese",
  Inglês: "English",
  Espanhol: "Spanish",
  Francês: "French",
  Alemão: "German",
  Italiano: "Italian",
  Mandarim: "Mandarin Chinese",
  Árabe: "Arabic",
  Japonês: "Japanese",
  Outro: "Other",
};

export const emptyOnboardingData: TgpiOnboardingData = {
  schemaVersion: 1,
  completed: false,
  currentStep: 1,
  primaryGoal: "",
  targetCountries: [],
  timeHorizon: "",
  budgetRange: "",
  languages: [],
  profession: "",
  educationLevel: "",
  internationalExperience: "",
  priorities: [],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOneOf<T extends string>(
  value: unknown,
  allowedValues: readonly T[],
): value is T {
  return typeof value === "string" && allowedValues.includes(value as T);
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanStringList(
  value: unknown,
  maxItems: number,
  maxLength: number,
) {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim().slice(0, maxLength))
        .filter(Boolean),
    ),
  ).slice(0, maxItems);
}

function cleanLanguageList(value: unknown) {
  return Array.from(
    new Set(
      cleanStringList(value, MAX_LANGUAGES, 40).map(
        (language) => languageAliases[language] || language,
      ),
    ),
  );
}

function cleanEnumList<T extends string>(
  value: unknown,
  allowedValues: readonly T[],
  maxItems: number,
) {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(value.filter((item): item is T => isOneOf(item, allowedValues))),
  ).slice(0, maxItems);
}

export function normalizeOnboardingData(value: unknown): TgpiOnboardingData {
  if (!isRecord(value)) return { ...emptyOnboardingData };

  const currentStep =
    typeof value.currentStep === "number" && Number.isFinite(value.currentStep)
      ? Math.min(5, Math.max(1, Math.round(value.currentStep)))
      : 1;

  return {
    schemaVersion: 1,
    completed: value.completed === true,
    currentStep,
    primaryGoal: isOneOf<OnboardingGoal>(
      value.primaryGoal,
      onboardingGoalValues,
    )
      ? value.primaryGoal
      : "",
    targetCountries: cleanStringList(value.targetCountries, MAX_COUNTRIES, 80),
    timeHorizon: isOneOf<OnboardingTimeHorizon>(
      value.timeHorizon,
      onboardingTimeHorizonValues,
    )
      ? value.timeHorizon
      : "",
    budgetRange: isOneOf<OnboardingBudget>(
      value.budgetRange,
      onboardingBudgetValues,
    )
      ? value.budgetRange
      : "",
    languages: cleanLanguageList(value.languages),
    profession: cleanText(value.profession, 100),
    educationLevel: cleanText(value.educationLevel, 80),
    internationalExperience: isOneOf<OnboardingExperience>(
      value.internationalExperience,
      onboardingExperienceValues,
    )
      ? value.internationalExperience
      : "",
    priorities: cleanEnumList<OnboardingPriority>(
      value.priorities,
      onboardingPriorityValues,
      MAX_PRIORITIES,
    ),
    updatedAt: cleanText(value.updatedAt, 40) || undefined,
    completedAt: cleanText(value.completedAt, 40) || undefined,
  };
}
