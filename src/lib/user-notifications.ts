import { auth, db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export type UserNotificationInput = {
  title: string;
  description: string;
  href?: string;
  unread?: boolean;
  timeLabel?: string;
};

export async function createUserNotification(input: UserNotificationInput) {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error("User is not authenticated.");
  }

  const notificationsRef = collection(db, "users", uid, "notifications");

  await addDoc(notificationsRef, {
    title: input.title,
    description: input.description,
    href: input.href || "/notifications",
    unread: input.unread ?? true,
    timeLabel: input.timeLabel || "Agora mesmo",
    createdAt: new Date().toISOString(),
  });
}