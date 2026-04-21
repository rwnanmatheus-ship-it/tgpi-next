import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function followUser(currentUid: string, targetUid: string) {
  if (!currentUid || !targetUid) return;

  const currentRef = doc(db, "users", currentUid);
  const targetRef = doc(db, "users", targetUid);

  await updateDoc(currentRef, {
    following: arrayUnion(targetUid),
  });

  await updateDoc(targetRef, {
    followers: arrayUnion(currentUid),
  });
}