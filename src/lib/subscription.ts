import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export async function activatePremium() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const ref = doc(db, "users", user.uid);

  await updateDoc(ref, {
    membershipPlan: "Premium",
    subscriptionStatus: "active",
    subscriptionUpdatedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function cancelPremium() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const ref = doc(db, "users", user.uid);

  await updateDoc(ref, {
    membershipPlan: "Free",
    subscriptionStatus: "canceled",
    subscriptionUpdatedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}