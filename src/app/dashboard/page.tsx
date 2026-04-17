"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile, UserProfile } from "@/lib/profile";

function getNextLevelXP(level: number) {
  return level * 100;
}

function getCurrentLevelBaseXP(level: number) {
  return Math.max(0, (level - 1) * 100);
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        }
      } catch (error) {
        console.error("Error loading dashboard profile:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const progressPercent = Math.min(profile.level * 10, 100);

  const currentLevelBaseXP = useMemo(
    () => getCurrentLevelBaseXP(profile.level),
    [profile.level]
  );

  const nextLevelXP = useMemo(
    () => getNextLevelXP(profile.level),
    [profile.level]
  );

  const xpInsideLevel = Math.max(0, profile.xp - currentLevelBaseXP);
  const xpNeededInsideLevel = Math.max(1, nextLevelXP - currentLevelBaseXP);
  const levelProgressPercent = Math.min(
    100,
    Math.round((xpInsideLevel / xpNeededInsideLevel) * 100)
  );

  const quests = [
    {
      title: "Complete your profile",
      done: profile.onboardingCompleted,
      reward: 20,
    },
    {
      title: "Choose your country focus",
      done: !!profile.countryInterest,
      reward: 15,
    },
    {
      title: "Save at least one favorite country",
      done: !!profile.favorites?.length,
      reward: 10