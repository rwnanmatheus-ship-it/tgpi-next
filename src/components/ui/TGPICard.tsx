export default function TGPICard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5 shadow-lg">
      {children}
    </div>
  );
}