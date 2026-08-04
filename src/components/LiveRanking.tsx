import type { UserData } from "@/types";

type LiveRankingUser = Pick<UserData, "uid" | "name" | "globalScore">;

type LiveRankingProps = {
  users: LiveRankingUser[];
};

export default function LiveRanking({ users }: LiveRankingProps) {
  const top = users.slice(0, 5);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">Live Ranking</h2>

      <div className="mt-4 space-y-3">
        {top.map((user, index) => (
          <div
            key={user.uid ?? `${user.name ?? "user"}-${index}`}
            className="flex justify-between rounded-xl border border-slate-800 p-3"
          >
            <span>{user.name ?? "TGPI Member"}</span>
            <span className="text-yellow-400">{user.globalScore ?? 0}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
