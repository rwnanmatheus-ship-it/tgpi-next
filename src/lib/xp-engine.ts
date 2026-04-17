import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile, UserProfile } from "@/lib/profile";

type AwardXPReason =
  | "save_profile"
  | "set_country_goal"
  | "toggle_favorite"
  | "save_currency_usage";

const XP_REWARDS: Record<AwardXPReason, number> = {
  save_profile: 20,
  set_country_goal: 15,
  toggle_favorite: 10,
  save_currency_usage: 5,
};

function calculateLevelFromXP(xp: number) {
  return Math.max(1, Math.floor(xp / 100) + 1);
}

export async function awardXP(reason: AwardXPReason) {
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

  const completed = profile.completedActions || [];

  // 🚨 ANTI-EXPLOIT
  if (completed.includes(reason)) {
    return {
      reward: 0,
      xp: profile.xp,
      level: profile.level,
      alreadyCompleted: true,
    };
  }

  const reward = XP_REWARDS[reason] || 0;

  const nextXP = (profile.xp || 0) + reward;
  const nextLevel = calculateLevelFromXP(nextXP);

  const updatedCompleted = [...completed, reason];

  await setDoc(
    ref,
    {
      ...profile,
      xp: nextXP,
      level: nextLevel,
      completedActions: updatedCompleted,
      updatedAt: new Date().toISOString(),
      createdAt:
        (snap.exists() && profile.createdAt) || new Date().toISOString(),
    },
    { merge: true }
  );

  return {
    reward,
    xp: nextXP,
    level: nextLevel,
    alreadyCompleted: false,
  };
}