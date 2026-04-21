"use client";

export default function XPRace({ users }: any) {
  return (
    <div className="rounded-xl border border-slate-800 p-6 bg-slate-900">
      <h2 className="text-xl font-bold text-yellow-400">
        XP Race
      </h2>

      <div className="mt-4 space-y-3">
        {users?.slice(0, 5).map((u: any, i: number) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{u.name || "User"}</span>
            <span className="text-yellow-400">{u.xp || 0} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}