import Link from "next/link";
import TGPIEditorialVisual from "@/components/TGPIEditorialVisual";

export default function WorldMapCard() {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_18px_55px_rgba(11,31,58,0.08)]">
      <div className="flex items-center justify-between gap-4 p-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9A6A12]">
            Country intelligence
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0B1F3A]">
            Global Decision Map
          </h2>
        </div>

        <Link
          href="/countries"
          className="rounded-xl border border-[#B58A2A] bg-[#FFF7DE] px-4 py-2 text-sm font-black text-[#6F4908] transition hover:bg-[#F7E8BA]"
        >
          Explore
        </Link>
      </div>

      <div className="relative mx-6 mb-6 overflow-hidden rounded-[26px] border border-[#D8D2C4]">
        <TGPIEditorialVisual
          variant="hero"
          id="dashboard-world-map"
          ariaLabel="Authorial TGPI global decision map illustration"
          className="h-80 w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-[#0B1F3A]/5 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-[#0B1F3A]/78 px-6 py-4 text-center text-white backdrop-blur-xl">
          <p className="font-serif text-2xl font-semibold">Compare countries through evidence.</p>
          <p className="mt-2 text-sm text-[#D7DFEA]">
            Cost, safety, language, readiness and opportunity in one system.
          </p>
        </div>
      </div>
    </section>
  );
}
