import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type UserStats = {
  xp: number;
  countriesExplored: number;
  coursesInProgress: number;
  certificatesEarned: number;
  countriesSaved: number;
  profileCompleted: boolean;
  courseLessonsCompleted: number;
};

export const defaultUserStats: UserStats = {
  xp: 0,
  countriesExplored: 0,
  coursesInProgress: 0,
  certificatesEarned: 0,
  countriesSaved: 0,
  profileCompleted: false,
  courseLessonsCompleted: 0,
};

export async function getUserStats(uid: string): Promise<UserStats> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(
      ref,
      {
        xp: 0,
        countriesExplored: 0,
        coursesInProgress: 0,
        certificatesEarned: 0,
        countriesSaved: 0,
        profileCompleted: false,
        courseLessonsCompleted: 0,
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return defaultUserStats;
  }

  const data = snap.data();

  return {
    xp: typeof data?.xp === "number" ? data.xp : 0,
    countriesExplored:
      typeof data?.countriesExplored === "number" ? data.countriesExplored : 0,
    coursesInProgress:
      typeof data?.coursesInProgress === "number" ? data.coursesInProgress : 0,
    certificatesEarned:
      typeof data?.certificatesEarned === "number"
        ? data.certificatesEarned
        : 0,
    countriesSaved:
      typeof data?.countriesSaved === "number" ? data.countriesSaved : 0,
    profileCompleted:
      typeof data?.profileCompleted === "boolean"
        ? data.profileCompleted
        : false,
    courseLessonsCompleted:
      typeof data?.courseLessonsCompleted === "number"
        ? data.courseLessonsCompleted
        : 0,
  };
}