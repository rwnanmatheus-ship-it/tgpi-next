import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

export async function addReferral(uid: string) {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    referrals: increment(1),
  });
}