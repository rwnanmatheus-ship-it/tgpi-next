import GlobalMetricsStrip from "@/components/GlobalMetricsStrip";
import PremiumComparisonMatrix from "@/components/PremiumComparisonMatrix";
import PublicProofWall from "@/components/PublicProofWall";

export default function AuthorityPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-10">
        <h1 className="text-5xl font-bold text-yellow-400">
          TGPI Authority Layer
        </h1>

        <GlobalMetricsStrip />
        <PublicProofWall />
        <PremiumComparisonMatrix />
      </div>
    </main>
  );
}