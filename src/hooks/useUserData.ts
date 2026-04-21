"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { generateTGPIId } from "@/lib/generate-tgpi-id";
import { calculateGlobalScore } from "@/lib/calculate-global-score";

export function useUserData() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

      let data = snap.data();

      // TGPI ID
      if (!data.tgpiId) {
        data.tgpiId = generateTGPIId();
      }

      // VERIFIED
      data.isVerified = (data.xp || 0) >= 1000;

      // GLOBAL SCORE
      data.globalScore = calculateGlobalScore(data);

      await setDoc(ref, data, { merge: true });

      setUserData(data);
    }

    load();
  }, []);

  return userData;
}