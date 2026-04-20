"use client";

import PageContainer from "@/components/PageContainer";
import { db } from "@/lib/firebase";
import { calculateGamification } from "@/lib/gamification";
import { defaultUserStats, type UserStats } from "@/lib/user-stats";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type PublicUser = {
  fullName: string;
  email: string;
  photoURL: string;
};

export default function PublicProfilePage() {
  const params = useParams<{ uid: string }>();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<PublicUser>({
    fullName: "",
    email: "",
    photoURL: "",
  });
  const [stats, setStats] = useState<UserStats>(defaultUserStats);

  useEffect(() => {
    async function loadPublicProfile() {
      if (!params?.uid) return;

      try {
        const ref = doc(db, "users", params.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setLoading(false);
          return;
        }

        const data = snap.data();

        setUserData({
          fullName: data?.fullName || "TGPI User",
          email: data?.email || "",
          photoURL: data?.photoURL || "",
        });

        setStats({
          xp: typeof data?.xp === "number" ? data.xp : 0,
          countriesExplored:
            typeof data?.countriesExplored === "number"
              ? data.countriesExplored
              : 0,
          coursesInProgress:
            typeof data?.coursesInProgress === "number"
              ? data.coursesInProgress
              : 0,
          certificatesEarned:
            typeof data?.certificatesEarned === "number"
              ? data.certificatesEarned
              : 0,
          countriesSaved:
            typeof data?.countriesSaved === "number"
              ? data.countriesSaved
              : 0,
          profileCompleted:
            typeof data?.profileCompleted === "boolean"
              ? data.profileCompleted
              : false,
          courseLessonsCompleted:
            typeof data?.courseLessonsCompleted === "number"
              ? data.courseLessonsCompleted
              : 0,
          referrals: typeof data?.referrals === "number" ? data.referrals : 0,
        });
      } catch (error) {
        console.error("Could not load public profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPublicProfile();
  }, [params]);

  const game = calculateGamification(stats);

  return (
    <PageContainer
      title="Public Global Profile"
      subtitle="A public view of progress and growth inside the TGPI ecosystem."
    >
      {loading ? (
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-slate-300">Loading profile...</p>
        </section>
      ) : (
        <>
          <section className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
              <div className="flex items-center gap-6">
                {userData.photoURL ? (
                  <img
                    src={userData.photoURL}
                    alt="Public avatar"
                    className="h-24 w-24 rounded-full border border-slate-700 object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500 text-2xl font-bold text-black">
                    {(userData.fullName || "TG")
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}

                <div>
                  <p className="text-sm text-slate-400">TGPI Member</p>
                  <h2 className="text-3xl font-bold text-yellow-400">
                    {userData.fullName || "TGPI User"}
                  </h2>
                  <p className="mt-1 text-slate-300">
                    Level {game.level} • {game.rankTitle}
                  </p>
                </div>
              </div>

              <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-yellow-500"
                  style={{ width: `${game.progressPercent}%` }}
                />
              </div>

              <p className="mt-3 text-sm text-slate-400">{game.xp} XP</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="text-2xl font-bold text-yellow-400">Snapshot</h2>

              <div className="mt-6 grid gap-4">
                <InfoCard
                  label="Countries explored"
                  value={String(stats.countriesExplored)}
                />
                <InfoCard
                  label="Lessons completed"
                  value={String(stats.courseLessonsCompleted)}
                />
                <InfoCard
                  label="Certificates earned"
                  value={String(stats.certificatesEarned)}
                />
                <InfoCard label="Referrals" value={String(stats.referrals)} />
              </div>
            </div>
          </section>
        </>
      )}
    </PageContainer>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-white">{value}</p>
    </div>
  );
}