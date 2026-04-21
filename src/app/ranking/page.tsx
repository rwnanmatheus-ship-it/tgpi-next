"use client";

import ShareActions from "@/components/ShareActions";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

function positionStyle(index: number) {
  if (index === 0) return "text-yellow-300";
  if (index === 1) return "text-slate-200";
  if (index === 2) return "text-amber-600";
  return "text-white";
}

export default function RankingPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const q = query(
        collection(db, "users"),
        orderBy("globalScore", "desc"),
        limit(50)
      );

      const snap = await getDocs(q);
      const data = snap.docs.map((item) => item.data());

      setUsers(data);
    }

    load();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            🌍 Global Ranking
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Track the strongest public progression signals inside TGPI through
            global score, consistency, and visible learning momentum.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="space-y-4">
            {users.map((user, index) => (
              <div
                key={`${user.uid || user.email || "user"}-${index}`}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5"
              >
                <div>
                  <p className={`text-lg font-bold ${positionStyle(index)}`}>
                    #{index + 1} {user.name || user.email || "Anonymous"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {user.tgpiId || "TGPI Member"} •{" "}
                    {user.isVerified ? "Verified" : "Standard"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-400">Global Score</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {user.globalScore || 0}
                  </p>
                </div>
              </div>
            ))}

            {!users.length ? (
              <p className="text-slate-300">Loading ranking...</p>
            ) : null}
          </div>
        </section>

        <ShareActions
          title="TGPI Global Ranking"
          text="Check the TGPI global ranking and top learner progression."
          urlPath="/ranking"
        />
      </div>
    </div>
  );
}