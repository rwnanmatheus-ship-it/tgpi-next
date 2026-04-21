export default function XPProgress({ xp }: { xp: number }) {
  const percent = Math.min((xp / 1000) * 100, 100);

  return (
    <div className="w-full bg-slate-800 rounded-full h-3">
      <div
        className="bg-yellow-500 h-3 rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}