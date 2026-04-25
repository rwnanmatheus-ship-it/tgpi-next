export default function DashboardWorldMap() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Mapa Mundial</h2>
        <button className="rounded-xl border border-yellow-500/30 px-4 py-2 text-sm text-yellow-300">
          Explorar mapa
        </button>
      </div>

      <div className="flex h-[330px] items-center justify-center rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(245,185,66,0.22),transparent_45%),linear-gradient(135deg,#07111f,#020617)]">
        <div className="text-center">
          <div className="text-7xl">🌍</div>
          <p className="mt-4 text-lg font-semibold text-yellow-400">
            Global Intelligence Map
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Base pronta para mapa interativo com países, favoritos e progresso.
          </p>
        </div>
      </div>
    </section>
  );
}