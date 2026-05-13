export default function TGPIPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#111827]">
      <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
    </main>
  );
}
