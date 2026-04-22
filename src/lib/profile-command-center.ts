import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type RecentConversion = {
  from: string;
  to: string;
  amount: number;
  result?: number;
  date: string;
};

export type UserActivityItem = {
  action: string;
  date: string;
};

export type CommandCenterProfile = {
  username?: string;
  displayName?: string;
  fullName?: string;
  bio?: string;
  photoURL?: string;
  city?: string;
  country?: string;
  preferredCurrency?: string;
  plan?: string;
  xp?: number;
  level?: number;
  streak?: number;
  phone?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  timezone?: string;
  languagePreference?: string;

  notificationsEmail?: boolean;
  notificationsPush?: boolean;
  marketingEmails?: boolean;
  profilePublic?: boolean;
  showLocation?: boolean;
  showProgress?: boolean;
  showGoals?: boolean;

  favoriteCountries?: string[];
  lastVisitedCountry?: string;
  recentConversions?: RecentConversion[];
  countryGoals?: string[];
  activity?: UserActivityItem[];

  goal?: "work" | "study" | "live";
  englishLevel?: "basic" | "intermediate" | "advanced";
  budget?: "low" | "medium" | "high";
  continentInterest?: string;

  updatedAt?: string;
};

export async function getCommandCenterUserId() {
  return auth.currentUser?.uid || null;
}

export async function loadCommandCenterProfile(): Promise<CommandCenterProfile | null> {
  const uid = await getCommandCenterUserId();
  if (!uid) return null;

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as CommandCenterProfile;
}

export async function saveCommandCenterProfile(
  data: Partial<CommandCenterProfile>
) {
  const uid = await getCommandCenterUserId();
  if (!uid) {
    throw new Error("User is not authenticated.");
  }

  const ref = doc(db, "users", uid);

  await setDoc(
    ref,
    {
      ...data,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export function buildSafeProfileDefaults(
  data: CommandCenterProfile | null | undefined
) {
  return {
    username: data?.username || "",
    displayName: data?.displayName || data?.fullName || "",
    bio: data?.bio || "",
    photoURL: data?.photoURL || "",
    city: data?.city || "",
    country: data?.country || "",
    preferredCurrency: data?.preferredCurrency || "USD",
    phone: data?.phone || "",
    website: data?.website || "",
    instagram: data?.instagram || "",
    linkedin: data?.linkedin || "",
    timezone: data?.timezone || "",
    languagePreference: data?.languagePreference || "English",

    notificationsEmail: data?.notificationsEmail ?? true,
    notificationsPush: data?.notificationsPush ?? true,
    marketingEmails: data?.marketingEmails ?? false,
    profilePublic: data?.profilePublic ?? true,
    showLocation: data?.showLocation ?? true,
    showProgress: data?.showProgress ?? true,
    showGoals: data?.showGoals ?? true,

    favoriteCountries: data?.favoriteCountries || [],
    lastVisitedCountry: data?.lastVisitedCountry || "",
    recentConversions: data?.recentConversions || [],
    countryGoals: data?.countryGoals || [],
    activity: data?.activity || [],

    goal: data?.goal || "",
    englishLevel: data?.englishLevel || "",
    budget: data?.budget || "",
    continentInterest: data?.continentInterest || "",

    plan: data?.plan || "FREE",
    xp: data?.xp ?? 0,
    level: data?.level ?? 1,
    streak: data?.streak ?? 0,
    updatedAt: data?.updatedAt || "",
  };
}