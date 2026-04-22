import { auth, db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

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
  usernameHistory?: string[];
  usernameChangeCount?: number;

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

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

export function isValidUsername(value: string) {
  const normalized = normalizeUsername(value);
  return /^[a-z0-9._]{3,20}$/.test(normalized);
}

export async function getCommandCenterUserId() {
  return auth.currentUser?.uid || null;
}

export async function loadCommandCenterProfileByUid(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as CommandCenterProfile;
}

export async function loadCommandCenterProfile(): Promise<CommandCenterProfile | null> {
  const uid = await getCommandCenterUserId();
  if (!uid) return null;
  return loadCommandCenterProfileByUid(uid);
}

export async function checkUsernameAvailability(
  username: string,
  currentUid?: string
): Promise<{
  available: boolean;
  normalized: string;
  reason?: string;
}> {
  const normalized = normalizeUsername(username);

  if (!normalized) {
    return { available: false, normalized, reason: "Username is required." };
  }

  if (!isValidUsername(normalized)) {
    return {
      available: false,
      normalized,
      reason: "Use 3–20 characters: letters, numbers, dot or underscore.",
    };
  }

  const usernameRef = doc(db, "usernames", normalized);
  const usernameSnap = await getDoc(usernameRef);

  if (!usernameSnap.exists()) {
    return { available: true, normalized };
  }

  const data = usernameSnap.data() as { uid?: string };

  if (data?.uid && currentUid && data.uid === currentUid) {
    return { available: true, normalized };
  }

  return {
    available: false,
    normalized,
    reason: "This username is already in use.",
  };
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

export async function saveCommandCenterProfileWithRules(
  data: Partial<CommandCenterProfile>
) {
  const uid = await getCommandCenterUserId();
  if (!uid) throw new Error("User is not authenticated.");

  const current = await loadCommandCenterProfileByUid(uid);
  const currentUsername = normalizeUsername(current?.username || "");
  const requestedUsername = normalizeUsername(data.username || current?.username || "");

  let nextUsernameChangeCount = current?.usernameChangeCount ?? 0;
  let nextUsernameHistory = current?.usernameHistory || [];

  if (requestedUsername) {
    const availability = await checkUsernameAvailability(requestedUsername, uid);
    if (!availability.available) {
      throw new Error(availability.reason || "Username unavailable.");
    }

    const usernameChanged =
      currentUsername &&
      requestedUsername &&
      currentUsername !== requestedUsername;

    if (usernameChanged) {
      if (nextUsernameChangeCount >= 2) {
        throw new Error(
          "You have reached the lifetime limit of 2 username changes."
        );
      }

      nextUsernameChangeCount += 1;

      if (currentUsername && !nextUsernameHistory.includes(currentUsername)) {
        nextUsernameHistory = [...nextUsernameHistory, currentUsername];
      }

      const oldUsernameRef = doc(db, "usernames", currentUsername);
      try {
        await deleteDoc(oldUsernameRef);
      } catch {
        // ignore old mapping cleanup failures
      }
    }

    const newUsernameRef = doc(db, "usernames", requestedUsername);
    await setDoc(
      newUsernameRef,
      {
        uid,
        username: requestedUsername,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  }

  await saveCommandCenterProfile({
    ...data,
    username: requestedUsername || "",
    usernameChangeCount: nextUsernameChangeCount,
    usernameHistory: nextUsernameHistory,
  });
}

export function buildSafeProfileDefaults(
  data: CommandCenterProfile | null | undefined
) {
  return {
    username: data?.username || "",
    usernameHistory: data?.usernameHistory || [],
    usernameChangeCount: data?.usernameChangeCount ?? 0,

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