import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  profilePublic?: boolean;

  favoriteCountries?: string[];
  lastVisitedCountry?: string;
  recentConversions?: {
    from: string;
    to: string;
    amount: number;
    result?: number;
    date: string;
  }[];
  countryGoals?: string[];
  activity?: { action: string; date: string }[];
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
    goal: data?.goal || "",
    englishLevel: data?.englishLevel || "",
    budget: data?.budget || "",
    continentInterest: data?.continentInterest || "",
    notificationsEmail: data?.notificationsEmail ?? true,
    notificationsPush: data?.notificationsPush ?? true,
    profilePublic: data?.profilePublic ?? true,
    favoriteCountries: data?.favoriteCountries || [],
    countryGoals: data?.countryGoals || [],
    recentConversions: data?.recentConversions || [],
    activity: data?.activity || [],
    lastVisitedCountry: data?.lastVisitedCountry || "",
    plan: data?.plan || "FREE",
    xp: data?.xp ?? 0,
    level: data?.level ?? 1,
    streak: data?.streak ?? 0,
    updatedAt: data?.updatedAt || "",
  };
}