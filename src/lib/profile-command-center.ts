import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { generateTGPIId } from "@/lib/tgpi-credentials";
import type {
  CommandCenterProfile,
  UsernameAvailability,
} from "@/types";

async function getUid(): Promise<string | null> {
  return auth.currentUser?.uid || null;
}

export async function loadCommandCenterProfile(): Promise<CommandCenterProfile | null> {
  const uid = await getUid();
  if (!uid) return null;

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as CommandCenterProfile;
}

export async function loadCommandCenterProfileByUid(
  uid: string
): Promise<CommandCenterProfile | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as CommandCenterProfile;
}

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

export async function checkUsernameAvailability(
  username: string,
  currentUid?: string
): Promise<UsernameAvailability> {
  if (!username || username.length < 3) {
    return { available: false, reason: "Username muito curto" };
  }

  const ref = doc(db, "usernames", username.toLowerCase());
  const snap = await getDoc(ref);

  if (!snap.exists()) return { available: true };

  const data = snap.data() as { uid?: string };
  if (data.uid === currentUid) return { available: true };

  return { available: false, reason: "Username já em uso" };
}

export async function saveCommandCenterProfileWithRules(
  data: Partial<CommandCenterProfile>
): Promise<void> {
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
