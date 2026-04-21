"use client";

import PremiumGate from "@/components/PremiumGate";
import ShareActions from "@/components/ShareActions";
import { useUserData } from "@/hooks/useUserData";
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type RankingUser = {
  uid?: string;
  name?: string;
  email?: string;
  username?: string;
  tgpiId?: string;
  globalScore?: number;
  isVerified?: boolean;
  plan?: string;
};

function positionStyle(index: number) {
  if (index === 0) return "text-yellow-300";
  if (index === 1) return "text-slate-200";
  if (index === 2) return "text-amber-600";
  return "text-white";
}

export default function RankingPage() {
  const user = useUserData();
  const [users, setUsers] = useState<RankingUser[]>([]);

  useEffect(() => {
    async function load() {
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
    }

    load();
  }, []);

  const topPreview = useMemo(() => users.slice(0, 5), [users]);
  const lockedRemainderCount = Math.max(users.length - topPreview.length, 0);

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            🌍 Global Ranking
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            The free layer lets you preview TGPI’s competitive ecosystem. Premium
            unlocks the full leaderboard, deeper social signals, and stronger
            positioning visibility.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-yellow-400">
                Top Ranking Preview
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Free users can see a high-value preview. Premium users unlock the
                full ranking layer.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {topPreview.map((rankingUser, index) => (
              <div
                key={`${rankingUser.uid || rankingUser.email || "user"}-${index}`}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5"
              >
                <div>
                  <p className={`text-lg font-bold ${positionStyle(index)}`}>
                    #{index + 1}{" "}
                    {rankingUser.name ||
                      rankingUser.username ||
                      rankingUser.email ||
                      "Anonymous"}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {rankingUser.username
                      ? `@${rankingUser.username}`
                      : rankingUser.tgpiId || "TGPI Member"}{" "}
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

            {!topPreview.length ? (
              <p className="text-slate-300">Loading ranking preview...</p>
            ) : null}
          </div>
        </section>

        <PremiumGate
          user={user}
          feature="ranking_full"
          title="Unlock the Full Global Ranking"
          description="See more members, compare yourself across a larger leaderboard, and access stronger competitive visibility inside TGPI."
          highlights={[
            "Full global leaderboard visibility",
            "Deeper positioning and competitive signals",
            "Stronger reputation and premium identity value",
            "Advanced growth and comparison context",
          ]}
        >
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Full Ranking Access
            </h2>

            <div className="mt-6 space-y-4">
              {users.map((rankingUser, index) => (
                <div
                  key={`${rankingUser.uid || rankingUser.email || "full"}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <div>
                    <p className={`text-lg font-bold ${positionStyle(index)}`}>
                      #{index + 1}{" "}
                      {rankingUser.name ||
                        rankingUser.username ||
                        rankingUser.email ||
                        "Anonymous"}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {rankingUser.username
                        ? `@${rankingUser.username}`
                        : rankingUser.tgpiId || "TGPI Member"}{" "}
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

        {!user || user.plan !== "premium" ? (
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Why This Works
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InfoCard
                title="Free stays valuable"
                text="Users already get visibility into the ranking ecosystem and can understand what exists inside the product."
              />
              <InfoCard
                title="Premium feels meaningful"
                text="The locked layer unlocks more context, more visibility, and a stronger sense of positioning and status."
              />
              <InfoCard
                title="Upgrade has a reason"
                text={`There are currently ${lockedRemainderCount} additional ranking positions beyond the visible preview.`}
              />
            </div>
          </section>
        ) : null}

        <ShareActions
          title="TGPI Global Ranking"
          text="Check the TGPI global ranking and top learner progression."
          urlPath="/ranking"
        />
      </div>
    </div>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  );
}