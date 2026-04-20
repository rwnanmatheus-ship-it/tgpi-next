import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
        visitedCountries: [],
        completedLessons: [],
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

export async function awardXp(uid: string, amount: number) {
  const ref = doc(db, "users", uid);

  await setDoc(
    ref,
    {
      xp: increment(amount),
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function completeProfileAndAwardXp(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};

  if (!data?.profileCompleted) {
    await setDoc(
      ref,
      {
        profileCompleted: true,
        xp: increment(100),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  }
}

export async function trackCountryVisit(uid: string, countrySlug: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(
      ref,
      {
        xp: 40,
        countriesExplored: 1,
        visitedCountries: [countrySlug],
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return;
  }

  const data = snap.data();
  const visitedCountries: string[] = Array.isArray(data?.visitedCountries)
    ? data.visitedCountries
    : [];

  if (!visitedCountries.includes(countrySlug)) {
    await updateDoc(ref, {
      visitedCountries: [...visitedCountries, countrySlug],
      countriesExplored: increment(1),
      xp: increment(40),
      updatedAt: new Date().toISOString(),
    });
  }
}

export async function trackLessonCompletion(
  uid: string,
  lessonKey: string,
  courseId: string
) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(
      ref,
      {
        completedLessons: [lessonKey],
        courseLessonsCompleted: 1,
        coursesInProgress: 1,
        xp: 20,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return;
  }

  const data = snap.data();
  const completedLessons: string[] = Array.isArray(data?.completedLessons)
    ? data.completedLessons
    : [];

  if (!completedLessons.includes(lessonKey)) {
    const currentCoursesInProgress =
      typeof data?.coursesInProgress === "number" ? data.coursesInProgress : 0;

    await updateDoc(ref, {
      completedLessons: [...completedLessons, lessonKey],
      courseLessonsCompleted: increment(1),
      coursesInProgress:
        currentCoursesInProgress < 1 ? increment(1) : currentCoursesInProgress,
      xp: increment(20),
      updatedAt: new Date().toISOString(),
    });
  }
}

export type LeaderboardEntry = {
  id: string;
  name: string;
  xp: number;
  level: number;
  photoURL?: string;
};

export async function getLeaderboardEntries(): Promise<LeaderboardEntry[]> {
  const snapshot = await getDocs(collection(db, "users"));

  const users = snapshot.docs.map((docItem) => {
    const data = docItem.data();
    const xp = typeof data?.xp === "number" ? data.xp : 0;
    const level = Math.max(1, Math.floor(xp / 200) + 1);

    return {
      id: docItem.id,
      name: data?.fullName || data?.email || "TGPI User",
      xp,
      level,
      photoURL: data?.photoURL || "",
    };
  });

  return users.sort((a, b) => b.xp - a.xp).slice(0, 10);
}