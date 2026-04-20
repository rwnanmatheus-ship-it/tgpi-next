import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserData(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      xp: 0,
      countriesExplored: 0,
      coursesCompleted: 0,
      createdAt: Date.now(),
    });
    return {
      xp: 0,
      countriesExplored: 0,
      coursesCompleted: 0,
    };
  }

  return snap.data();
}

export async function addXP(uid: string, amount: number) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);
  const currentXP = snap.data()?.xp || 0;

  await updateDoc(ref, {
    xp: currentXP + amount,
  });
}