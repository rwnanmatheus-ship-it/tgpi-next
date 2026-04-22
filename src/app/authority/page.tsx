export default function AuthorityPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-8">
          <h1 className="text-4xl font-bold text-yellow-400">
            TGPI Authority Layer
          </h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            TGPI is being shaped as a premium global platform where education,
            intelligence, and international readiness work together.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Premium Perception
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Design and structure increase trust and perceived value.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Strategic Product
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              The product evolves beyond content into a global operational tool.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Investor Appeal
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              TGPI becomes easier to position as a high-value global company.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}