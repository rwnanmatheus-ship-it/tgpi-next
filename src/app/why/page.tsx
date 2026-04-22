import WhyTGPIIsDifferent from "@/components/WhyTGPIIsDifferent";

export default function WhyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">Why TGPI</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            TGPI combines education, global intelligence, and premium product
            design into a single international platform.
          </p>
        </section>

        <WhyTGPIIsDifferent />
      </div>
    </main>
  );
}