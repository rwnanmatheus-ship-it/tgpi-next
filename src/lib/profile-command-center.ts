import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { generateTGPIId } from "@/lib/tgpi-credentials";

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

  recentConversions?: any[];
  activity?: any[];

  lastVisitedCountry?: string;

  photoURL?: string;

  plan?: string;
  xp?: number;
  level?: number;
  streak?: number;

  updatedAt?: string;
};

async function getUid() {
  const user = auth.currentUser;
  return user?.uid || null;
}

// =========================
// LOAD PROFILE
// =========================
export async function loadCommandCenterProfile() {
  const uid = await getUid();
  if (!uid) return null;

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as CommandCenterProfile;
}

// =========================
// LOAD BY UID (FIX)
// =========================
export async function loadCommandCenterProfileByUid(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as CommandCenterProfile;
}

// =========================
// SAFE DEFAULTS (FIX)
// =========================
export function buildSafeProfileDefaults(
  data: Partial<CommandCenterProfile> | null
): CommandCenterProfile {
  return {
    displayName: data?.displayName || "",
    fullName: data?.fullName || "",
    username: data?.username || "",
    tgpiId: data?.tgpiId || "",

    bio: data?.bio || "",
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
    marketingEmails: data?.marketingEmails ?? false,

    profilePublic: data?.profilePublic ?? true,
    showLocation: data?.showLocation ?? true,
    showProgress: data?.showProgress ?? true,
    showGoals: data?.showGoals ?? true,

    favoriteCountries: data?.favoriteCountries || [],
    countryGoals: data?.countryGoals || [],

    recentConversions: data?.recentConversions || [],
    activity: data?.activity || [],

    lastVisitedCountry: data?.lastVisitedCountry || "",

    photoURL: data?.photoURL || "",

    plan: data?.plan || "FREE",
    xp: data?.xp || 0,
    level: data?.level || 1,
    streak: data?.streak || 0,

    usernameChangeCount: data?.usernameChangeCount || 0,
    usernameHistory: data?.usernameHistory || [],

    updatedAt: data?.updatedAt || "",
  };
}

// =========================
// USERNAME CHECK
// =========================
export async function checkUsernameAvailability(
  username: string,
  currentUid?: string
) {
  if (!username || username.length < 3) {
    return { available: false, reason: "Username muito curto" };
  }

  const ref = doc(db, "usernames", username.toLowerCase());
  const snap = await getDoc(ref);

  if (!snap.exists()) return { available: true };

  const data = snap.data();

  if (data.uid === currentUid) {
    return { available: true };
  }

  return { available: false, reason: "Username já em uso" };
}

// =========================
// SAVE WITH RULES (FIX)
// =========================
export async function saveCommandCenterProfileWithRules(
  data: Partial<CommandCenterProfile>
) {
  const uid = await getUid();
  if (!uid) throw new Error("Not authenticated");

  const ref = doc(db, "users", uid);
  const current = await loadCommandCenterProfile();

  const tgpiId = current?.tgpiId || generateTGPIId(uid);

  await setDoc(
    ref,
    {
      ...current,
      ...data,
      tgpiId,
      uid,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}