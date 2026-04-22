import ProductValueStrip from "@/components/ProductValueStrip";
import WhyTGPIIsDifferent from "@/components/WhyTGPIIsDifferent";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-10">
          <p className="mb-4 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
            The Global Polymath Institute
          </p>

          <h1 className="max-w-4xl text-5xl font-bold text-yellow-400">
            Where global education meets intelligent international readiness
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Explore countries, prepare for global life, build readiness, and
            unlock a more strategic path through TGPI.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/countries"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
            >
              Explore Countries
            </Link>

            <Link
              href="/premium"
              className="rounded-xl border border-yellow-500/40 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 hover:bg-yellow-500/10"
            >
              View Premium
            </Link>
          </div>
        </section>

        <ProductValueStrip />
        <WhyTGPIIsDifferent />
      </div>
    </main>
  );
}