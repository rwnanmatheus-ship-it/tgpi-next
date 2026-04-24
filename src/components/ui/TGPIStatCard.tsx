export default function TGPIStatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-yellow-400">{value}</p>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
}