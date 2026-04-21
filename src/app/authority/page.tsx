import Link from "next/link";
import GlobalMetricsStrip from "@/components/GlobalMetricsStrip";
import PremiumComparisonMatrix from "@/components/PremiumComparisonMatrix";
import PublicProofWall from "@/components/PublicProofWall";

export default function AuthorityPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Authority Layer
          </p>

          <h1 className="text-5xl font-bold leading-tight text-yellow-400">
            Building the authority layer of global transition
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            TGPI is not only building a platform. It is building a visible,
            trusted, socially reinforced system for people who want to move
            beyond the borders they were born into.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/why"
              className="rounded-2xl bg-yellow-500 px-8 py-4 text-lg font-bold text-black"
            >
              Read the Vision
            </Link>

            <Link
              href="/startup"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-lg font-bold text-white"
            >
              View Startup Thesis
            </Link>
          </div>
        </section>

        <GlobalMetricsStrip />
        <PublicProofWall />
        <PremiumComparisonMatrix />
      </div>
    </main>
  );
}