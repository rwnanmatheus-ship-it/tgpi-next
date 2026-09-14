export default function PremiumCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`tgpi-card-3d relative rounded-3xl border border-slate-800 bg-gradient-to-b from-[#111827] to-[#090B10] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${className}`.trim()}
      data-tgpi-depth="floating"
      data-tgpi-tone="navy"
    >
      <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />
      {children}
    </div>
  );
}
