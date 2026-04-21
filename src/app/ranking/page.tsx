"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
      const data = snap.docs.map(doc => doc.data());

      setUsers(data);
    }

    load();
  }, []);

  return (
    <div className="p-10">
      <h1 className="mb-6 text-4xl font-bold text-yellow-400">
        🌍 Global Ranking
      </h1>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={index} className="flex justify-between bg-slate-900 p-4 rounded-xl">
            <span>#{index + 1} {user.name || "Anonymous"}</span>
            <span>{user.globalScore || 0} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}