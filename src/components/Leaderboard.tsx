import { leaderboardUsers } from "@/lib/leaderboard";

export default function Leaderboard() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">
            Weekly Leaderboard
          </h2>
          <p className="mt-2 text-slate-400">
            See who is growing fastest inside TGPI.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {leaderboardUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-black">
                #{index + 1}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                <p className="text-sm text-slate-400">
                  Level {user.level} • {user.badge}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-yellow-400">{user.xp} XP</p>
              <p className="text-sm text-slate-400">This week</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}