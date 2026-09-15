export default function TGPIPageShell({
  children,
  width = "default",
}: {
  children: React.ReactNode;
  width?: "capability" | "default";
}) {
  return (
    <main
      id="main-content"
      className="min-h-screen overflow-x-clip bg-[#F7F3EA] text-[#111827]"
    >
      <div
        className={
          width === "capability"
            ? "tgpi-capability-frame py-6 sm:py-8"
            : "mx-auto max-w-7xl px-6 py-8"
        }
      >
        {children}
      </div>
    </main>
  );
}
