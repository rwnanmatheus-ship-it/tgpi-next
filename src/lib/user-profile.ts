import { db } from "@/lib/firebase";
import { completeProfileAndAwardXp } from "@/lib/user-stats";
import { doc, getDoc, setDoc } from "firebase/firestore";

export type UserProfileData = {
  fullName: string;
  email: string;
  phone: string;
  countryGoal: string;
  focusRegion: string;
  primaryObjective: string;
  learningTrack: string;
  membership: "Free" | "Premium";
};

export const defaultUserProfile: UserProfileData = {
  fullName: "",
  email: "",
  phone: "",
  countryGoal: "",
  focusRegion: "Europe",
  primaryObjective: "Relocation + work abroad",
  learningTrack: "Language + cultural integration",
  membership: "Free",
};

export async function getUserProfile(uid: string): Promise<UserProfileData> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return defaultUserProfile;
  }

  const data = snap.data();

  return {
    fullName: data?.fullName || "",
    email: data?.email || "",
    phone: data?.phone || "",
    countryGoal: data?.countryGoal || "",
    focusRegion: data?.focusRegion || "Europe",
    primaryObjective:
      data?.primaryObjective || "Relocation + work abroad",
    learningTrack:
      data?.learningTrack || "Language + cultural integration",
    membership: data?.plan === "premium" ? "Premium" : "Free",
  };
}

export async function saveUserProfile(
  uid: string,
  profile: UserProfileData
) {
  const ref = doc(db, "users", uid);

  const profileCompleted = Boolean(
    profile.fullName.trim() &&
      profile.email.trim() &&
      profile.phone.trim() &&
      profile.countryGoal.trim() &&
      profile.focusRegion.trim() &&
      profile.primaryObjective.trim() &&
      profile.learningTrack.trim()
  );

  await setDoc(
    ref,
    {
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      countryGoal: profile.countryGoal,
      focusRegion: profile.focusRegion,
      primaryObjective: profile.primaryObjective,
      learningTrack: profile.learningTrack,
      plan: profile.membership.toLowerCase(),
      profileCompleted,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  if (profileCompleted) {
    await completeProfileAndAwardXp(uid);
  }
}