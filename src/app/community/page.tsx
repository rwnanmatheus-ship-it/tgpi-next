"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { prettifyIntent } from "@/lib/identity";

type CommunityUser = {
  uid?: string;
  name?: string;
  legalName?: string;
  username?: string;
  currentCountry?: string;
  currentCity?: string;
  targetCountry?: string;
  travelIntent?: string;
  bio?: string;
};

export default function CommunityPage() {
  const [currentUserUid, setCurrentUserUid] = useState("");
  const [currentUserData, setCurrentUserData] = useState<CommunityUser | null>(null);
  const [users, setUsers] = useState<CommunityUser[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 NOVO FILTRO (SEM QUEBRAR)
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      try {
        setCurrentUserUid(firebaseUser.uid);

        const allUsersQuery = query(collection(db, "users"), limit(40));
        const allUsersSnap = await getDocs(allUsersQuery);

        const allUsers = allUsersSnap.docs.map((item) => ({
          uid: item.id,
          ...(item.data() as CommunityUser),
        }));

        const me = allUsers.find((item) => item.uid === firebaseUser.uid) || null;
        const others = allUsers.filter((item) => item.uid !== firebaseUser.uid);

        setCurrentUserData(me);
        setUsers(others);
      } catch (error) {
        console.error("Could not load community:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const matches = useMemo(() => {
    if (!currentUserData) return [];

    const currentTarget = (currentUserData.targetCountry || "").toLowerCase();
    const currentIntent = (currentUserData.travelIntent || "").toLowerCase();
    const currentCountry = (currentUserData.currentCountry || "").toLowerCase();

    return users
      .map((user) => {
        let score = 0;
        const reasons: string[] = [];

        if (
          currentTarget &&
          user.targetCountry &&
          user.targetCountry.toLowerCase() === currentTarget
        ) {
          score += 50;
          reasons.push("Same target country");
        }

        if (
          currentIntent &&
          user.travelIntent &&
          user.travelIntent.toLowerCase() === currentIntent
        ) {
          score += 30;
          reasons.push("Same travel intent");
        }

        if (
          currentCountry &&
          user.currentCountry &&
          user.currentCountry.toLowerCase() === currentCountry
        ) {
          score += 20;
          reasons.push("Same current country");
        }

        return {
          ...user,
          score,
          reasons,
        };
      })
      .filter((user) => user.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [currentUserData, users]);

  // 🔥 FILTRO APLICADO (SAFE)
  const filteredMatches = useMemo(() => {
    if (!filter) return matches;
    return matches.filter((u) => u.travelIntent === filter);
  }, [matches, filter]);

  if (loading) {
    return <div className="p-10 text-white">Loading community...</div>;
  }

  if (!currentUserUid) {
    return (
      <div className="p-10 text-white">
        <h1 className="text-3xl font-bold text-yellow-400">Community</h1>
        <p className="mt-4 text-slate-300">
          Sign in to connect with people globally.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">

        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            🌍 Global Matching Community
          </h1>
        </section>

        {/* 🔥 FILTRO UI */}
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2"
          >
            <option value="">All</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="relocation">Relocation</option>
            <option value="tourism">Tourism</option>
          </select>
        </div>

        <section className="grid gap-5 md:grid-cols-2">
          {filteredMatches.length ? (
            filteredMatches.map((user) => (
              <div
                key={user.uid}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {user.legalName || user.name || "TGPI Member"}
                </h3>

                <p className="text-yellow-300">
                  {user.username ? `@${user.username}` : "@tgpi_member"}
                </p>

                <p className="mt-3 text-sm text-slate-300">
                  {prettifyIntent(user.travelIntent)}
                </p>

                <div className="mt-4">
                  <Link
                    href={`/u/${user.uid}`}
                    className="rounded-xl bg-yellow-500 px-4 py-2 text-black font-semibold"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-300">
              No matches found for this filter.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}