"use client";

import { useUserData } from "@/hooks/useUserData";

export default function PassportPage() {
  const user = useUserData();

  if (!user) {
    return <div className="p-10 text-white">Loading passport...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-yellow-700/20 bg-slate-950 p-8">

        <h1 className="mb-6 text-4xl font-bold text-yellow-400">
          🌍 TGPI Global Passport
        </h1>

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm text-slate-400">TGPI ID</p>
            <p className="text-xl font-bold text-white">{user.tgpiId}</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Level</p>
            <p className="text-xl font-bold text-white">{user.level || 1}</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm text-slate-400">XP</p>
            <p className="text-xl font-bold text-white">{user.xp || 0}</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Status</p>
            <p className="text-xl font-bold text-yellow-400">
              {user.isVerified ? "Verified Global Learner" : "Standard"}
            </p>
          </div>

        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-yellow-400">
            Countries Explored
          </h2>

          <div className="flex flex-wrap gap-3">
            {(user.countriesExplored || []).map((c: string) => (
              <span
                key={c}
                className="rounded-xl bg-yellow-500/10 px-4 py-2 text-yellow-300"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}