import CountryCard from "@/components/CountryCard";
import PrimaryButton from "@/components/PrimaryButton";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.16),transparent_28%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div className="relative z-10">
            <div className="mb-5 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
              Global Education • Cultural Integration • International Readiness
            </div>

            <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
              Become Global.
            </h1>

            <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
              The Global Polymath Institute is a global system designed to help
              people live, work, study, and integrate anywhere in the world
              through language, culture, arts, and internationally intelligent
              preparation.
            </p>

            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="/countries">Explore Countries</PrimaryButton>

              <a
                href="/dashboard"
                className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
              >
                My Journey
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="195"
                description="Countries in the long-term vision"
              />
              <StatCard
                title="Global"
                description="Integrated education model"
              />
              <StatCard
                title="Premium"
                description="Personalized platform experience"
              />
              <StatCard
                title="Real"
                description="Preparation for life abroad"
              />
            </div>
          </div>

          <div className="relative z-10">
            <div className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-8">
              <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-yellow-400">
                  TGPI Core Vision
                </p>
                <h2 className="mb-3 text-2xl font-bold text-white">
                  A system for global preparation
                </h2>
                <p className="text-sm leading-7 text-slate-300">
                  We are building a platform where language learning, cultural
                  intelligence, country readiness, recognition, and international
                  pathways come together in one premium ecosystem.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <strong className="mb-1 block text-yellow-400">Learn</strong>
                  <p className="text-sm text-slate-300">
                    Languages, arts, history, culture, and daily-life readiness.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <strong className="mb-1 block text-yellow-400">
                    Integrate
                  </strong>
                  <p className="text-sm text-slate-300">
                    Prepare for real interaction in new countries and systems.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <strong className="mb-1 block text-yellow-400">
                    Progress
                  </strong>
                  <p className="text-sm text-slate-300">
                    Track goals, countries, quests, and global development.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <strong className="mb-1 block text-yellow-400">Scale</strong>
                  <p className="text-sm text-slate-300">
                    Built to grow from a focused MVP to a global education company.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="What TGPI Is"
            description="TGPI is more than a language platform. It is a global readiness system for people who want to live, work, adapt, and grow across borders with more preparation and more confidence."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                Global Preparation
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                Prepare for the realities of moving through different countries,
                systems, cultures, and languages.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                One Unified Platform
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                Language, culture, history, arts, guidance, and personal
                progress in one premium ecosystem.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                Future-Ready Design
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                Built with a long-term vision for scale, subscriptions,
                certification, and global recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="Featured Country Pathways"
            description="Start with curated countries and build real-world readiness step by step."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <CountryCard
              emoji="🇯🇵"
              name="Japan"
              description="Language, etiquette, work culture, modern life, and intercultural readiness."
              href="/countries/japan"
            />
            <CountryCard
              emoji="🇧🇷"
              name="Brazil"
              description="Brazilian Portuguese, society, regional identity, and real-life integration."
              href="/countries/brazil"
            />
            <CountryCard
              emoji="🇪🇬"
              name="Egypt"
              description="Arabic foundations, heritage, civilization, and cultural learning at global depth."
              href="/countries/egypt"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl rounded-3xl border border-yellow-700/20 bg-gradient-to-b from-yellow-500/10 to-slate-950 p-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-yellow-400">
            Build Your Global Identity
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-slate-300">
            Join a new type of educational platform designed to help you move
            through the world with more language, more cultural intelligence,
            and more preparation.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <PrimaryButton href="/login">Join TGPI</PrimaryButton>
            <a
              href="/countries"
              className="rounded-xl border border-yellow-500/50 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
            >
              Explore Countries
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}