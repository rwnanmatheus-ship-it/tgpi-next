import { getRank } from "@/lib/rank-system";

export default function UserRank({ xp }: { xp: number }) {
  const rank = getRank(xp);

  return (
    <div className="rounded-xl bg-slate-800 p-4 text-center">
      <p className="text-xs text-slate-400">Your Rank</p>
      <p className="text-yellow-400 font-bold">{rank}</p>
    </div>
  );
}