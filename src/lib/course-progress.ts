import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getCourseProgress(userId: string) {
  const ref = doc(db, "progress", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return { courses: {} };
  }

  return snap.data();
}

export async function markLessonComplete(
  userId: string,
  courseId: string,
  lessonId: string
) {
  const ref = doc(db, "progress", userId);
  const data = await getCourseProgress(userId);

  if (!data.courses[courseId]) {
    data.courses[courseId] = {
      completedLessons: [],
    };
  }

  if (!data.courses[courseId].completedLessons.includes(lessonId)) {
    data.courses[courseId].completedLessons.push(lessonId);
  }

  await setDoc(ref, data);
}