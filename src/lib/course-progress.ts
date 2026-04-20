import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function markLessonComplete(
  uid: string,
  courseId: string,
  lessonId: string
) {
  const ref = doc(db, "progress", uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      [courseId]: [lessonId],
    });
    return;
  }

  const data = snap.data();

  const lessons = data[courseId] || [];

  if (!lessons.includes(lessonId)) {
    await updateDoc(ref, {
      [courseId]: [...lessons, lessonId],
    });
  }
}