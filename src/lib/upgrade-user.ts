import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function upgradeUserToPremium(uid: string) {
  const ref = doc(db, "users", uid);

  await setDoc(
    ref,
    {
      plan: "premium",
      upgradedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}