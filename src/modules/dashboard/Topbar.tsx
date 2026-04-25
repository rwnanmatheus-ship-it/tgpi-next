export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 p-5">
      <input
        placeholder="Search countries, courses..."
        className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-4 py-2"
      />

      <div className="flex items-center gap-4">
        <span className="text-yellow-400">🔔</span>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-yellow-400" />
          <span className="text-sm">Renan</span>
        </div>
      </div>
    </header>
  );
}