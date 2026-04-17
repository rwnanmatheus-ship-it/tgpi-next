import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile } from "@/lib/profile";
import { awardXP } from "@/lib/xp-engine";

export async function setCountryGoal(country: string, goal: string) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  const baseProfile = snap.exists()
    ? snap.data()
    : defaultUserProfile(user.email || "");

  await setDoc(
    ref,
    {
      ...baseProfile,
      countryInterest: country,
      mainGoal: goal,
      updatedAt: new Date().toISOString(),
      createdAt:
        (snap.exists() && snap.data()?.createdAt) || new Date().toISOString(),
    },
    { merge: true }
  );

  await awardXP("set_country_goal");
}