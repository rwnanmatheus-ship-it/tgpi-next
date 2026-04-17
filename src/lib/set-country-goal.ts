import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function setCountryGoal(country: string, goal: string) {
  const user = auth.currentUser;

  if (!user) {
    window.location.href = "/login";
    return;
  }

  await setDoc(
    doc(db, "users", user.uid),
    {
      countryInterest: country,
      mainGoal: goal,
      onboardingCompleted: true,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}