"use client";

import { useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { calculateGlobalReadiness } from "@/lib/calculate-global-readiness";
import { calculateReputation } from "@/lib/calculate-reputation";
import GlobalReadinessCard from "@/components/GlobalReadinessCard";
import ShareActions from "@/components/ShareActions";
import RecruiterSignals from "@/components/RecruiterSignals";
import GlobalMomentum from "@/components/GlobalMomentum";
import PremiumStatusBadge from "@/components/PremiumStatusBadge";
import JourneyReasonsCard from "@/components/JourneyReasonsCard";
import { maskDocumentNumber, prettifyIntent } from "@/lib/identity";

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

  const readiness = useMemo(
    () => (userData ? calculateGlobalReadiness(userData) : 0),
    [userData]
  );

  const reputation = useMemo(
    () => (userData ? calculateReputation(userData) : 0),
    [userData]
  );

  if (!userData) {
    return <div className="p-10 text-white">Loading profile...</div>;
  }

  const publicName = userData.legalName || userData.name || "TGPI User";
  const username = userData.username ? `@${userData.username}` : "@tgpi_member";
  const maskedDocument = maskDocumentNumber(
    userData.documentType,
    userData.documentNumber
  );
  const countriesExploredCount = Array.isArray(userData.countriesExplored)
    ? userData.countriesExplored.length
    : 0;
  const certificatesCount = Number(userData.certificatesEarned || 0);

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Public Identity
              </p>

              <h1 className="text-4xl font-bold text-yellow-400">
                {publicName}
              </h1>

              <p className="mt-3 text-lg text-slate-300">{username}</p>

              <div className="mt-5">
                <PremiumStatusBadge
                  plan={userData.plan}
                  isVerified={userData.isVerified}
                />
              </div>

              <p className="mt-5 max-w-3xl text-slate-300">
                {userData.bio ||
                  "A globally minded TGPI member building international readiness and long-term global positioning."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card label="TGPI ID" value={userData.tgpiId || "—"} />
              <Card label="Level" value={String(userData.level || 1)} />
              <Card label="Global Score" value={String(userData.globalScore || 0)} />
              <Card label="Reputation" value={`${reputation}/100`} />
            </div>
          </div>
        </section>

        <GlobalReadinessCard score={readiness} />

        <GlobalMomentum
          score={Number(userData.globalScore || 0)}
          readiness={readiness}
          countries={countriesExploredCount}
          certificates={certificatesCount}
        />

        <section className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Public Profile Signals
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Card label="Nationality" value={userData.nationality || "—"} />
              <Card
                label="Current Location"
                value={
                  [userData.currentCity, userData.currentCountry]
                    .filter(Boolean)
                    .join(", ") || "—"
                }
              />
              <Card label="Target Country" value={userData.targetCountry || "—"} />
              <Card
                label="Travel Intent"
                value={prettifyIntent(userData.travelIntent)}
              />
              <Card label="Document Verification" value={maskedDocument} />
              <Card
                label="Identity Status"
                value={userData.isVerified ? "Verified Global Learner" : "Standard"}
              />
            </div>
          </section>

          <RecruiterSignals user={userData} />
        </section>

        <JourneyReasonsCard
          targetCountry={userData.targetCountry}
          travelIntent={userData.travelIntent}
          readinessScore={readiness}
          countriesExplored={countriesExploredCount}
        />

        <ShareActions
          title={`${publicName} • TGPI Public Profile`}
          text={`Explore the TGPI public profile of ${publicName} and follow their international journey.`}
          urlPath={`/u/${params.uid}`}
        />
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}