import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile, UserProfile } from "@/lib/profile";
import { getPlanLimits } from "@/lib/plan";

export async function toggleFavoriteCountry(country: string) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  let profile: UserProfile;

  if (!snap.exists()) {
    profile = defaultUserProfile(user.email || "");
  } else {
    profile = snap.data() as UserProfile;
  }

  const limits = getPlanLimits(profile.membershipPlan);

  let favorites = profile.favorites || [];

  const exists = favorites.includes(country);

  if (!exists && favorites.length >= limits.maxFavorites) {
    alert("Upgrade to Premium to save more countries.");
    return;
  }

  if (exists) {
    favorites = favorites.filter((c) => c !== country);
  } else {
    favorites.push(country);
  }

  await setDoc(
    ref,
    {
      ...profile,
      favorites,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}