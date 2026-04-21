"use client";

import { useUserData } from "@/hooks/useUserData";
import NotificationCenter from "@/components/NotificationCenter";
import XPRace from "@/components/XPRace";

export default function DashboardPage() {
  const user = useUserData();

  if (!user) {
    return (
      <div className="p-10 text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* HEADER */}
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-300">
            Welcome back, {user.name || "Global User"}
          </p>
        </section>

        {/* USER STATS */}
        <section className="grid gap-4 md:grid-cols-3">
          <Card title="XP" value={user.xp || 0} />
          <Card title="Level" value={user.level || 1} />
          <Card title="Global Score" value={user.globalScore || 0} />
        </section>

        {/* NOTIFICATIONS */}
        <NotificationCenter />

        {/* XP RACE */}
        <XPRace users={[user]} />

      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="rounded-xl border border-slate-800 p-6 bg-slate-900">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-yellow-400">
        {value}
      </p>
    </div>
  );
}