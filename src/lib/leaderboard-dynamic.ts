import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getLeaderboard() {
  const snapshot = await getDocs(collection(db, "users"));

  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return users.sort((a: any, b: any) => b.xp - a.xp).slice(0, 10);
}