import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function sendNotification(
  toUid: string,
  type: string,
  message: string
) {
  if (!toUid) return;

  await addDoc(collection(db, "notifications"), {
    toUid,
    type,
    message,
    createdAt: serverTimestamp(),
    read: false,
  });
}