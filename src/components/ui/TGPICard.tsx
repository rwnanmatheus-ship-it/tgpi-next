export default function TGPICard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`tgpi-card-3d rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg ${className}`.trim()}
      data-tgpi-depth="raised"
      data-tgpi-tone="glass"
    >
      {children}
    </div>
  );
}
