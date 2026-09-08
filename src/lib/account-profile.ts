export const accountVisibilityValues = ["private", "members", "public"] as const;
export const measurementSystemValues = ["metric", "imperial"] as const;

export type AccountVisibility = (typeof accountVisibilityValues)[number];
export type MeasurementSystem = (typeof measurementSystemValues)[number];

export type TgpiAccountProfile = {
  schemaVersion: 1;
  headline: string;
  bio: string;
  currentCountry: string;
  currentCity: string;
  nationality: string;
  profession: string;
  educationLevel: string;
  languages: string[];
  preferredLanguage: string;
  preferredCurrency: string;
  timezone: string;
  measurementSystem: MeasurementSystem;
  website: string;
  linkedin: string;
  instagram: string;
  notifications: {
    planReminders: boolean;
    researchAlerts: boolean;
    learningUpdates: boolean;
    productNews: boolean;
  };
  privacy: {
    visibility: AccountVisibility;
    showLocation: boolean;
    showProgress: boolean;
    showGoals: boolean;
  };
  updatedAt?: string;
};

export type AccountIdentityInput = {
  firstName: string;
  lastName: string;
};

export type TgpiAccountUpdate = {
  identity: AccountIdentityInput;
  profile: TgpiAccountProfile;
};

const MAX_LANGUAGES = 8;

export const emptyTgpiAccountProfile: TgpiAccountProfile = {
  schemaVersion: 1,
  headline: "",
  bio: "",
  currentCountry: "",
  currentCity: "",
  nationality: "",
  profession: "",
  educationLevel: "",
  languages: [],
  preferredLanguage: "English",
  preferredCurrency: "USD",
  timezone: "",
  measurementSystem: "metric",
  website: "",
  linkedin: "",
  instagram: "",
  notifications: {
    planReminders: true,
    researchAlerts: true,
    learningUpdates: true,
    productNews: false,
  },
  privacy: {
    visibility: "private",
    showLocation: false,
    showProgress: false,
    showGoals: false,
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanUrl(value: unknown, host?: string) {
  const input = cleanText(value, 240);
  if (!input) return "";

  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  try {
    const url = new URL(withProtocol);
    if (!/^https?:$/.test(url.protocol)) return "";
    if (host && !url.hostname.endsWith(host)) return "";
    return url.toString().slice(0, 240);
  } catch {
    return "";
  }
}

function cleanLanguages(value: unknown) {
  if (!Array.isArray(value)) return [];

  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim().slice(0, 40))
        .filter(Boolean),
    ),
  ).slice(0, MAX_LANGUAGES);
}

function getBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function isOneOf<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === "string" && options.includes(value as T);
}

export function normalizeAccountIdentity(value: unknown): AccountIdentityInput {
  const input = isRecord(value) ? value : {};

  return {
    firstName: cleanText(input.firstName, 60),
    lastName: cleanText(input.lastName, 60),
  };
}

export function normalizeTgpiAccountProfile(value: unknown): TgpiAccountProfile {
  const input = isRecord(value) ? value : {};
  const notifications = isRecord(input.notifications) ? input.notifications : {};
  const privacy = isRecord(input.privacy) ? input.privacy : {};

  return {
    schemaVersion: 1,
    headline: cleanText(input.headline, 120),
    bio: cleanText(input.bio, 500),
    currentCountry: cleanText(input.currentCountry, 80),
    currentCity: cleanText(input.currentCity, 100),
    nationality: cleanText(input.nationality, 80),
    profession: cleanText(input.profession, 100),
    educationLevel: cleanText(input.educationLevel, 100),
    languages: cleanLanguages(input.languages),
    preferredLanguage: cleanText(input.preferredLanguage, 40) || "English",
    preferredCurrency: cleanText(input.preferredCurrency, 8).toUpperCase() || "USD",
    timezone: cleanText(input.timezone, 80),
    measurementSystem: isOneOf(input.measurementSystem, measurementSystemValues)
      ? input.measurementSystem
      : "metric",
    website: cleanUrl(input.website),
    linkedin: cleanUrl(input.linkedin, "linkedin.com"),
    instagram: cleanUrl(input.instagram, "instagram.com"),
    notifications: {
      planReminders: getBoolean(notifications.planReminders, true),
      researchAlerts: getBoolean(notifications.researchAlerts, true),
      learningUpdates: getBoolean(notifications.learningUpdates, true),
      productNews: getBoolean(notifications.productNews, false),
    },
    privacy: {
      visibility: isOneOf(privacy.visibility, accountVisibilityValues)
        ? privacy.visibility
        : "private",
      showLocation: getBoolean(privacy.showLocation, false),
      showProgress: getBoolean(privacy.showProgress, false),
      showGoals: getBoolean(privacy.showGoals, false),
    },
    updatedAt: cleanText(input.updatedAt, 40) || undefined,
  };
}

export function mergeAccountProfileWithOnboarding(
  profileValue: unknown,
  onboardingValue: unknown,
) {
  const profile = normalizeTgpiAccountProfile(profileValue);
  const onboarding = isRecord(onboardingValue) ? onboardingValue : {};

  if (!profile.languages.length && Array.isArray(onboarding.languages)) {
    profile.languages = cleanLanguages(onboarding.languages);
  }
  if (!profile.profession) {
    profile.profession = cleanText(onboarding.profession, 100);
  }
  if (!profile.educationLevel) {
    profile.educationLevel = cleanText(onboarding.educationLevel, 100);
  }

  return profile;
}

export function getAccountProfileCompletion(
  identity: AccountIdentityInput,
  profile: TgpiAccountProfile,
) {
  const signals = [
    Boolean(identity.firstName),
    Boolean(profile.headline),
    Boolean(profile.bio),
    Boolean(profile.currentCountry),
    Boolean(profile.currentCity),
    Boolean(profile.profession),
    Boolean(profile.educationLevel),
    profile.languages.length > 0,
    Boolean(profile.preferredLanguage),
    Boolean(profile.timezone),
  ];

  return Math.round(
    (signals.filter(Boolean).length / signals.length) * 100,
  );
}

export function canViewTgpiProfile({
  ownerId,
  viewerId,
  visibility,
}: {
  ownerId: string;
  viewerId?: string | null;
  visibility: AccountVisibility;
}) {
  if (viewerId === ownerId) return true;
  if (visibility === "public") return true;
  return visibility === "members" && Boolean(viewerId);
}
