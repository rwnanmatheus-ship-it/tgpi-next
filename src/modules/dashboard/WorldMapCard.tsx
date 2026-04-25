import { tgpiImages } from "@/data/tgpi-images";

export default function WorldMapCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#07111f]">
      <div className="flex items-center justify-between p-6">
        <h2 className="text-lg font-bold text-yellow-400">World Map</h2>

        <button className="rounded-xl border border-yellow-500/30 px-4 py-2 text-sm text-yellow-300">
          Explore
        </button>
      </div>

      <div
        className="mx-6 mb-6 flex h-80 items-center justify-center rounded-3xl bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(2,6,23,.2), rgba(2,6,23,.75)), url(${tgpiImages.globe})` }}
      >
        <div className="rounded-2xl border border-yellow-500/20 bg-black/50 px-6 py-4 text-center backdrop-blur">
          <p className="text-2xl font-bold text-yellow-400">Global Intelligence Map</p>
          <p className="mt-2 text-sm text-slate-300">
            Explore countries, progress, and opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}