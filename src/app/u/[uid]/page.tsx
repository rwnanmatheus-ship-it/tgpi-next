"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { calculateGlobalReadiness } from "@/lib/calculate-global-readiness";
import { calculateReputation } from "@/lib/calculate-reputation";
import GlobalReadinessCard from "@/components/GlobalReadinessCard";
import ShareActions from "@/components/ShareActions";
import RecruiterSignals from "@/components/RecruiterSignals";

export default function PublicProfilePage({ params }: any) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const ref = doc(db, "users", params.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserData(snap.data());
      }
    }

    loadUser();
  }, [params.uid]);

  if (!userData) {
    return <div className="p-10 text-white">Loading profile...</div>;
  }

  const readiness = calculateGlobalReadiness(userData);
  const reputation = calculateReputation(userData);

  return (
    <div className="p-10 text-white max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">{userData.name || "User"}</h1>

      <p className="mt-2 text-slate-400">
        Global Polymath • Level {userData.level || 1}
      </p>

      <div className="mt-6">
        <GlobalReadinessCard score={readiness} />
      </div>

      <div className="mt-6 rounded-xl border border-white/10 p-4">
        <h2 className="mb-2 text-lg font-semibold">Reputation Score</h2>
        <p className="text-2xl font-bold text-yellow-400">{reputation}/100</p>
      </div>

      <RecruiterSignals user={userData} />

      <div className="mt-6">
        <ShareActions
          title={`${userData.name || "TGPI User"} • TGPI Public Profile`}
          text={`See the TGPI public profile of ${userData.name || "this user"} and follow their global readiness journey.`}
          urlPath={`/u/${params.uid}`}
        />
      </div>
    </div>
  );
}