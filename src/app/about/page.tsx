export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            About The Global Polymath Institute
          </h1>

          <p className="mt-6 text-sm leading-8 text-slate-300">
            TGPI exists to help people prepare for global movement with more
            clarity, more trust, and more strategic identity. The platform is
            being built as an infrastructure layer for international transition.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Institutional Vision
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The world has globalized aspiration, but not the process of
              becoming internationally ready. TGPI exists to solve that gap.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Builder Mindset
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              TGPI is being built with long-term ambition: identity, readiness,
              proof, connection, and social mobility inside one strategic system.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}