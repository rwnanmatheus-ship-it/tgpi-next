"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { generateTGPIId } from "@/lib/generate-tgpi-id";
import { calculateGlobalScore } from "@/lib/calculate-global-score";
import { calculateGlobalReadiness } from "@/lib/calculate-global-readiness";
import type { UserData } from "@/types/user";

export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    async function load() {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      const baseData = snap.exists() ? snap.data() : {};

      const data: UserData = {
        uid: user.uid,
        name: user.displayName || String(baseData?.name || ""),
        email: user.email || String(baseData?.email || ""),
        photoURL: user.photoURL || String(baseData?.photoURL || ""),

        xp: Number(baseData?.xp || 0),
        level: Number(baseData?.level || 1),

        tgpiId: String(baseData?.tgpiId || generateTGPIId()),
        isVerified: Number(baseData?.xp || 0) >= 1000,

        countriesExplored: Array.isArray(baseData?.countriesExplored)
          ? baseData.countriesExplored
          : [],
        completedCourses: Array.isArray(baseData?.completedCourses)
          ? baseData.completedCourses
          : [],

        certificatesEarned: Number(baseData?.certificatesEarned || 0),
        profileCompleted: Boolean(baseData?.profileCompleted),

        globalScore: 0,
        globalReadinessScore: 0,
      };

      data.globalScore = calculateGlobalScore(data);
      data.globalReadinessScore = calculateGlobalReadiness(data);

      await setDoc(ref, data, { merge: true });
      setUserData(data);
    }

    load();
  }, []);

  return userData;
}