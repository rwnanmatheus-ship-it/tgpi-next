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
