import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
              The Global Polymath Institute
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Become Global.
              <span className="block text-yellow-400">
                Learn, prepare, and integrate anywhere.
              </span>
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-300">
              TGPI is a premium global preparation platform designed to help
              people live, work, study, and integrate across countries through
              language, culture, country readiness, and international pathways.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/countries"
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Explore Countries
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Access Platform
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold text-yellow-400">195</div>
                <div className="text-sm text-slate-300">
                  Countries in long-term vision
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold text-yellow-400">Premium</div>
                <div className="text-sm text-slate-300">
                  Personalized platform experience
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold text-yellow-400">Real</div>
                <div className="text-sm text-slate-300">
                  Preparation for life abroad
                </div>
              </div>
            </div>
          </div>

          <div className="grid w-full max-w-xl gap-5">
            <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8">
              <h2 className="mb-4 text-2xl font-bold text-yellow-400">
                TGPI Core Vision
              </h2>
              <p className="leading-7 text-slate-300">
                A system for global preparation where language learning,
                cultural intelligence, country readiness, recognition, and
                international pathways come together in one premium ecosystem.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Learn
                </h3>
                <p className="text-sm leading-7 text-slate-300">
                  Languages, arts, history, culture, and daily-life readiness.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Integrate
                </h3>
                <p className="text-sm leading-7 text-slate-300">
                  Prepare for real interaction in new countries and systems.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Progress
                </h3>
                <p className="text-sm leading-7 text-slate-300">
                  Track goals, countries, quests, and global development.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Scale
                </h3>
                <p className="text-sm leading-7 text-slate-300">
                  Built to grow from a focused MVP to a global education company.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-yellow-400">
            What TGPI Is
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            A premium global preparation platform
          </h2>
          <p className="leading-8 text-slate-300">
            TGPI is more than a language platform. It is a global readiness
            system for people who want to live, work, study, and grow across
            borders with more preparation and more confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h3 className="mb-3 text-xl font-semibold text-yellow-400">
              Global Preparation
            </h3>
            <p className="text-sm leading-7 text-slate-300">
              Prepare for the realities of moving through different countries,
              systems, cultures, and languages.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h3 className="mb-3 text-xl font-semibold text-yellow-400">
              One Unified Platform
            </h3>
            <p className="text-sm leading-7 text-slate-300">
              Language, culture, history, arts, guidance, and personal progress
              in one premium ecosystem.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h3 className="mb-3 text-xl font-semibold text-yellow-400">
              Future-Ready Vision
            </h3>
            <p className="text-sm leading-7 text-slate-300">
              Built to evolve into a globally recognized platform for readiness,
              recognition, and international growth.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}