import type { UserPlan, VerificationStatus } from "./user";

export type ProfileVisibility = "private" | "members" | "public";

export type PublicProfile = {
  uid: string;
  username: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  country?: string;
  goal?: string;
  plan?: UserPlan;
  verificationStatus?: VerificationStatus;
  visibility: ProfileVisibility;
  publicAchievements?: string[];
  publicCredentialIds?: string[];
};

export type PrivateProfile = {
  uid: string;
  legalName?: string;
  dateOfBirth?: string;
  nationality?: string;
  documentType?: string;
  documentNumber?: string;
  currentCountry?: string;
  currentCity?: string;
  targetCountry?: string;
  travelIntent?: string;
};

export type ProfileFormValues = {
  displayName: string;
  username: string;
  bio: string;
  currentCountry: string;
  currentCity: string;
  targetCountry: string;
  travelIntent: string;
};

export type ProfileConversionRecord = {
  baseCurrency?: string;
  targetCurrency?: string;
  amount?: number;
  convertedAmount?: number;
  rate?: number;
  createdAt?: string;
};

export type ProfileActivityRecord = {
  id?: string;
  type?: string;
  label?: string;
  description?: string;
  href?: string;
  createdAt?: string;
};

export type CommandCenterProfile = {
  uid?: string;
  email?: string;
  displayName?: string;
  fullName?: string;
  username?: string;
  tgpiId?: string;
  usernameChangeCount?: number;
  usernameHistory?: string[];
  bio?: string;
  city?: string;
  country?: string;
  preferredCurrency?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  timezone?: string;
  languagePreference?: string;
  goal?: string;
  englishLevel?: string;
  budget?: string;
  continentInterest?: string;
  notificationsEmail?: boolean;
  notificationsPush?: boolean;
  marketingEmails?: boolean;
  profilePublic?: boolean;
  showLocation?: boolean;
  showProgress?: boolean;
  showGoals?: boolean;
  favoriteCountries?: string[];
  countryGoals?: string[];
  recentConversions?: ProfileConversionRecord[];
  activity?: ProfileActivityRecord[];
  lastVisitedCountry?: string;
  photoURL?: string;
  plan?: UserPlan | "FREE" | "PREMIUM";
  xp?: number;
  level?: number;
  streak?: number;
  updatedAt?: string;
};

export type UsernameAvailability = {
  available: boolean;
  reason?: string;
};
