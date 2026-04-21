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

  if (loading) {
    return <div className="p-10 text-white">Loading community...</div>;
  }

  if (!currentUserUid) {
    return (
      <div className="p-10 text-white">
        <h1 className="text-3xl font-bold text-yellow-400">Community</h1>
        <p className="mt-4 text-slate-300">
          Sign in to connect with people who are traveling, moving, studying, or
          working toward similar global goals.
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

          <p className="mt-4 max-w-3xl text-slate-300">
            Meet people moving toward the same countries and goals. Use TGPI to
            build useful friendships while learning, preparing, traveling,
            relocating, or planning international work.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            Best Matches For You
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {matches.length ? (
              matches.map((user) => (
                <div
                  key={user.uid}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {user.legalName || user.name || "TGPI Member"}
                      </h3>
                      <p className="mt-1 text-sm text-yellow-300">
                        {user.username ? `@${user.username}` : "@tgpi_member"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-yellow-700/20 bg-yellow-500/10 px-3 py-2 text-sm font-semibold text-yellow-300">
                      Match {user.score}%
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <InfoRow
                      label="Target Country"
                      value={user.targetCountry || "—"}
                    />
                    <InfoRow
                      label="Travel Intent"
                      value={prettifyIntent(user.travelIntent)}
                    />
                    <InfoRow
                      label="Current Location"
                      value={
                        [user.currentCity, user.currentCountry]
                          .filter(Boolean)
                          .join(", ") || "—"
                      }
                    />
                  </div>

                  {user.bio ? (
                    <p className="mt-5 text-sm leading-7 text-slate-300">
                      {user.bio}
                    </p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {user.reasons.map((reason) => (
                      <span
                        key={reason}
                        className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/u/${user.uid}`}
                      className="inline-block rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                    >
                      Open Public Profile
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-300">
                No strong matches yet. Complete your identity profile with target
                country and travel intent to unlock better matches.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}