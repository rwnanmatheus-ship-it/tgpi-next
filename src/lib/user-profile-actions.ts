import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile, UserProfile } from "@/lib/profile";
import { getPlanLimits } from "@/lib/plan";
import { awardXP } from "@/lib/xp-engine";

async function getUserProfileRef() {
  const user = auth.currentUser;
  if (!user) return null;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  let profile: UserProfile;

  if (!snap.exists()) {
    profile = defaultUserProfile(user.email || "");
  } else {
    profile = snap.data() as UserProfile;
  }

  return { ref, profile };
}

export async function getFavoriteCountries(): Promise<string[]> {
  const result = await getUserProfileRef();
  if (!result) return [];

  return result.profile.favorites || [];
}

export async function saveLastVisitedCountry(country: string) {
  const result = await getUserProfileRef();
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

export async function saveCurrencyUsage(
  targetCurrency: string,
  amount: number
) {
  const result = await getUserProfileRef();
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

  await awardXP("save_currency_usage");
}

export async function toggleFavoriteCountry(country: string) {
  const result = await getUserProfileRef();
  if (!result) return [];

  const { ref, profile } = result;

  const limits = getPlanLimits(profile.membershipPlan);

  let favorites = profile.favorites || [];

  const exists = favorites.includes(country);

  if (!exists && favorites.length >= limits.maxFavorites) {
    alert("Upgrade to Premium to save more countries.");
    return favorites;
  }

  if (exists) {
    favorites = favorites.filter((c) => c !== country);
  } else {
    favorites.push(country);
  }

  await setDoc(
    ref,
    {
      favorites,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  await awardXP("toggle_favorite");

  return favorites;
}