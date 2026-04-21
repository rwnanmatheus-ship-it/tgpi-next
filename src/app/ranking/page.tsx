"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import PremiumGate from "@/components/PremiumGate";
import ShareActions from "@/components/ShareActions";
import { useUserData } from "@/hooks/useUserData";
import UserPatentCard from "@/components/UserPatentCard";

type RankingUser = {
  uid?: string;
  name?: string;
  username?: string;
  tgpiId?: string;
  globalScore?: number;
  targetCountry?: string;
  plan?: string;
  isVerified?: boolean;
  xp?: number;
};

export default function RankingPage() {
  const user = useUserData();
  const [users, setUsers] = useState<RankingUser[]>([]);

  useEffect(() => {
    async function loadRanking() {
      try {
        const q = query(
          collection(db, "users"),
          orderBy("globalScore", "desc"),
          limit(50)
        );

        const snap = await getDocs(q);
        const data = snap.docs.map((item) => ({
          uid: item.id,
          ...(item.data() as RankingUser),
        }));

        setUsers(data);
      } catch (error) {
        console.error("Could not load ranking:", error);
      }
    }

    loadRanking();
  }, []);

  const preview = useMemo(() => users.slice(0, 8), [users]);
  const topCountries = useMemo(() => {
    const counts: Record<string, number> = {};

    users.forEach((rankingUser) => {
      const key = rankingUser.targetCountry || "Unknown";
      counts[key] = (counts[key] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [users]);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            Global Ranking
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            The ranking shows who is building the strongest visible global
            positioning through TGPI. It combines movement, proof, and progress
            into one public layer.
          </p>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Ranking Preview
            </h2>

            <div className="mt-6 space-y-4">
              {preview.map((rankingUser, index) => (
                <div
                  key={`${rankingUser.uid || rankingUser.username}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <div>
                    <p className="text-lg font-bold text-white">
                      #{index + 1}{" "}
                      {rankingUser.name || rankingUser.username || "TGPI Member"}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {rankingUser.username
                        ? `@${rankingUser.username}`
                        : rankingUser.tgpiId || "TGPI Identity"}{" "}
                      • {rankingUser.isVerified ? "Verified" : "Standard"}
                    </p>

                    {rankingUser.username ? (
                      <Link
                        href={`/user/${rankingUser.username}`}
                        className="mt-2 inline-block text-sm text-yellow-300 hover:underline"
                      >
                        Open public profile
                      </Link>
                    ) : null}
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-400">Global Score</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {rankingUser.globalScore || 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-bold text-yellow-400">
                Top Destination Signals
              </h2>

              <div className="mt-4 space-y-3">
                {topCountries.map(([country, count]) => (
                  <div
                    key={country}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <p className="text-sm text-slate-300">
                      {country} • {count} members
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <UserPatentCard xp={Number(user?.xp || 0)} />
          </section>
        </section>

        <PremiumGate
          user={user}
          feature="ranking_full"
          title="Unlock Full Ranking Access"
          description="Premium users get deeper ranking visibility, stronger social positioning, and more strategic comparison layers."
          highlights={[
            "See more global members",
            "Compare your position with greater depth",
            "Gain stronger premium identity perception",
            "Unlock more visibility and competitive context",
          ]}
        >
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Full Global Ranking
            </h2>

            <div className="mt-6 space-y-4">
              {users.map((rankingUser, index) => (
                <div
                  key={`full-${rankingUser.uid || rankingUser.username}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <div>
                    <p className="text-lg font-bold text-white">
                      #{index + 1}{" "}
                      {rankingUser.name || rankingUser.username || "TGPI Member"}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {rankingUser.username
                        ? `@${rankingUser.username}`
                        : rankingUser.tgpiId || "TGPI Identity"}{" "}
                      • {rankingUser.isVerified ? "Verified" : "Standard"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-400">Global Score</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {rankingUser.globalScore || 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </PremiumGate>

        <ShareActions
          title="TGPI Global Ranking"
          text="Explore the TGPI global ranking and see who is building visible international positioning."
          urlPath="/ranking"
        />
      </div>
    </main>
  );
}