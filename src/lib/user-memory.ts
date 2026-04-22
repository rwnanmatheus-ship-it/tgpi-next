import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

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

export type UserMemory = {
  preferredCurrency?: string;
  favoriteCountries?: string[];
  lastVisitedCountry?: string;
  recentConversions?: RecentConversion[];
  countryGoals?: string[];
  activity?: UserActivityItem[];
};

export async function getCurrentUserId() {
  return auth.currentUser?.uid || null;
}

export async function getUserMemory(): Promise<UserMemory | null> {
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as UserMemory;
}

export async function updateUserMemory(data: Partial<UserMemory>) {
  const uid = await getCurrentUserId();
  if (!uid) return;

  const ref = doc(db, "users", uid);
  await setDoc(ref, data, { merge: true });
}

export async function appendUserActivity(action: string) {
  const uid = await getCurrentUserId();
  if (!uid) return;

  const ref = doc(db, "users", uid);

  await setDoc(
    ref,
    {
      activity: arrayUnion({
        action,
        date: new Date().toISOString(),
      }),
    },
    { merge: true }
  );
}

export async function setLastVisitedCountry(country: string) {
  await updateUserMemory({ lastVisitedCountry: country });
}

export async function addRecentConversion(conversion: RecentConversion) {
  const memory = await getUserMemory();
  const current = memory?.recentConversions || [];
  const next = [conversion, ...current].slice(0, 10);

  await updateUserMemory({ recentConversions: next });
}

export async function toggleFavoriteCountryInMemory(country: string) {
  const memory = await getUserMemory();
  const favorites = memory?.favoriteCountries || [];

  const exists = favorites.includes(country);
  const next = exists
    ? favorites.filter((item) => item !== country)
    : [...favorites, country];

  await updateUserMemory({ favoriteCountries: next });
  return next;
}

export async function addCountryGoal(country: string) {
  const memory = await getUserMemory();
  const currentGoals = memory?.countryGoals || [];

  if (currentGoals.includes(country)) return currentGoals;

  const next = [...currentGoals, country];
  await updateUserMemory({ countryGoals: next });
  return next;
}