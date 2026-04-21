import Link from "next/link";

export default function StartupPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-20">
        <section className="text-center">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            TGPI Startup Thesis
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-yellow-400">
            TGPI is building the operating system of international transition.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            We believe the next generation of global mobility will require more
            than content. It will require identity, proof, preparation,
            connection, and visibility in one coordinated system.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <ValueBox
            title="Massive market"
            text="Millions of people think about leaving their country for work, study, relocation, or global opportunity."
          />
          <ValueBox
            title="Fragmented problem"
            text="The current journey is spread across content, forums, random tools, and low-trust sources."
          />
          <ValueBox
            title="Integrated solution"
            text="TGPI combines readiness, identity, proof, and community into one scalable global layer."
          />
        </section>

        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <h2 className="text-4xl font-bold text-yellow-400">
            What makes this investable
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ValueBox
              title="Identity"
              text="Public profiles, passports, scores, trust signals, and certificates create durable user value."
            />
            <ValueBox
              title="Network effect"
              text="Every user, room, connection, and ranking layer makes the platform more useful for everyone else."
            />
            <ValueBox
              title="Monetization"
              text="Premium access unlocks visibility, access, trust, and positioning — not just more content."
            />
            <ValueBox
              title="Expansion"
              text="The system can grow into mobility, education, verification, community, and opportunity infrastructure."
            />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold text-yellow-400">
            TGPI is not trying to be another course platform.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            It is building the global readiness layer for people who want to
            move across borders with more intelligence, more trust, and more
            strategic identity.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/why"
              className="rounded-2xl bg-yellow-500 px-8 py-4 text-lg font-bold text-black"
            >
              Read the Vision
            </Link>

            <Link
              href="/premium"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-lg font-bold text-white"
            >
              View Premium Model
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function ValueBox({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h3 className="text-2xl font-bold text-yellow-400">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
    </section>
  );
}