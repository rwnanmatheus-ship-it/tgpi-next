"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { calculateGlobalReadiness } from "@/lib/calculate-global-readiness";
import { calculateReputation } from "@/lib/calculate-reputation";
import { maskDocumentNumber, prettifyIntent } from "@/lib/identity";
import PremiumStatusBadge from "@/components/PremiumStatusBadge";
import GlobalReadinessCard from "@/components/GlobalReadinessCard";
import GlobalMomentum from "@/components/GlobalMomentum";
import RecruiterSignals from "@/components/RecruiterSignals";
import ShareActions from "@/components/ShareActions";
import UserPatentCard from "@/components/UserPatentCard";
import TrustLayerCard from "@/components/TrustLayerCard";

export default function UsernamePublicProfilePage({ params }: any) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadByUsername() {
      try {
        const username = String(params?.username || "").toLowerCase();
        if (!username) {
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "users"),
          where("usernameLower", "==", username)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          setUserData({
            uid: snap.docs[0].id,
            ...snap.docs[0].data(),
          });
        }
      } catch (error) {
        console.error("Could not load public username profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadByUsername();
  }, [params?.username]);

  const readiness = useMemo(
    () => (userData ? calculateGlobalReadiness(userData) : 0),
    [userData]
  );

  const reputation = useMemo(
    () => (userData ? calculateReputation(userData) : 0),
    [userData]
  );

  if (loading) {
    return <div className="p-10 text-white">Loading public profile...</div>;
  }

  if (!userData) {
    return (
      <div className="p-10 text-white">
        <h1 className="text-3xl font-bold text-yellow-400">Profile not found</h1>
        <p className="mt-4 text-slate-300">
          This public profile does not exist yet.
        </p>
        <Link
          href="/community"
          className="mt-6 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black"
        >
          Explore Community
        </Link>
      </div>
    );
  }

  const publicName = userData.legalName || userData.name || "TGPI Member";
  const username = userData.username ? `@${userData.username}` : "@tgpi_member";
  const countriesExplored = Array.isArray(userData.countriesExplored)
    ? userData.countriesExplored.length
    : 0;
  const certificates = Number(userData.certificatesEarned || 0);
  const maskedDocument = maskDocumentNumber(
    userData.documentType,
    userData.documentNumber
  );

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
                TGPI Global Public Profile
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

              <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-300">
                {userData.bio ||
                  "Building an international identity, readiness, and long-term global positioning through TGPI."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/u/${userData.uid}`}
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black"
                >
                  Open UID Profile
                </Link>

                <Link
                  href="/premium"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white"
                >
                  View Premium
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card label="TGPI ID" value={userData.tgpiId || "—"} />
              <Card label="Global Score" value={String(userData.globalScore || 0)} />
              <Card label="Reputation" value={`${reputation}/100`} />
              <Card label="Travel Intent" value={prettifyIntent(userData.travelIntent)} />
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <GlobalReadinessCard score={readiness} />
          <GlobalMomentum
            score={Number(userData.globalScore || 0)}
            readiness={readiness}
            countries={countriesExplored}
            certificates={certificates}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <UserPatentCard xp={Number(userData.xp || 0)} />
          <TrustLayerCard
            verified={Boolean(userData.isVerified)}
            plan={userData.plan}
            maskedDocument={maskedDocument}
          />
          <InfoPanel
            title="Public Signals"
            lines={[
              `Nationality: ${userData.nationality || "Not defined"}`,
              `Target country: ${userData.targetCountry || "Not defined"}`,
              `Current location: ${
                [userData.currentCity, userData.currentCountry].filter(Boolean).join(", ") ||
                "Not defined"
              }`,
            ]}
          />
        </div>

        <RecruiterSignals user={userData} />

        <ShareActions
          title={`${publicName} • TGPI Public Profile`}
          text={`Explore ${publicName}'s international profile on TGPI.`}
          urlPath={`/user/${userData.username || params?.username}`}
        />
      </div>
    </main>
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

function InfoPanel({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">{title}</h2>
      <div className="mt-4 space-y-3">
        {lines.map((line) => (
          <p key={line} className="text-sm text-slate-300">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}