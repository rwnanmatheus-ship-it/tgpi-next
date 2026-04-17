import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { defaultUserProfile } from "@/lib/profile";

async function ensureUserDocument() {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const baseProfile = defaultUserProfile(user.email || "");
    await setDoc(ref, {
      ...baseProfile,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { ref, data: baseProfile };
  }

  return { ref, data: snap.data() };
}

export async function saveLastVisitedCountry(country: string) {
  const result = await ensureUserDocument();
  if (!result) return;

  await setDoc(
    result.ref,
    {
      lastVisitedCountry: country,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function saveCurrencyUsage(targetCurrency: string, amount: number) {
  const result = await ensureUserDocument();
  if (!result) return;

  await setDoc(
    result.ref,
    {
      lastCurrencyTarget: targetCurrency,
      lastConvertedAmount: amount,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function toggleFavoriteCountry(country: string) {
  const result = await ensureUserDocument();
  if (!result) return [];

  const currentFavorites: string[] = Array.isArray(result.data?.favorites)
    ? result.data.favorites
    : [];

  const nextFavorites = currentFavorites.includes(country)
    ? currentFavorites.filter((item) => item !== country)
    : [...currentFavorites, country];

  await setDoc(
    result.ref,
    {
      favorites: nextFavorites,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return nextFavorites;
}

export async function getFavoriteCountries(): Promise<string[]> {
  const result = await ensureUserDocument();
  if (!result) return [];

  return Array.isArray(result.data?.favorites) ? result.data.favorites : [];
}