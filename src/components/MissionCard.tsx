export default function MissionCard({
  title,
  xp,
}: {
  title: string;
  xp: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-white font-semibold">{title}</p>
      <p className="text-sm text-yellow-400 mt-2">+{xp} XP</p>
    </div>
  );
}