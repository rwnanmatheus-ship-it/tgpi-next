import Link from "next/link";

export default function WhyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-20">
        <section className="text-center">
          <p className="mb-4 inline-flex rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            Why TGPI Exists
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-yellow-400">
            The world made global mobility desirable,
            <br />
            but never made it organized.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Millions of people want to leave their country, study abroad, work
            internationally, relocate, or build a global future. But their path
            is fragmented across random videos, social media, documents, forums,
            apps, and expensive services.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">The Problem</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              People don’t fail because they lack desire. They fail because the
              journey is confusing, lonely, disorganized, and full of low-trust
              information.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">The Gap</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              There is no single system that combines identity, preparation,
              proof of progress, country intelligence, social connection, and
              international positioning in one place.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">The Shift</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Global mobility is no longer a niche dream. It is becoming a mass
              life decision. The infrastructure for this transition still does
              not exist in a meaningful way.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <h2 className="text-4xl font-bold text-yellow-400">
            TGPI is building that infrastructure.
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <FeatureCard
              title="Global Identity"
              text="Users build a visible international profile that reflects readiness, progress, trust, and long-term positioning."
            />
            <FeatureCard
              title="Smart Preparation"
              text="Country intelligence, documents, pathways, and readiness layers help users organize their real-world move."
            />
            <FeatureCard
              title="Proof of Progress"
              text="Certificates, scores, momentum, ranks, and public signals turn learning into visible credibility."
            />
            <FeatureCard
              title="Network Effect"
              text="People connect with others moving toward the same destinations, goals, and global outcomes."
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold text-yellow-400">
              What makes TGPI different
            </h2>

            <div className="mt-6 space-y-4">
              <Point text="It is not just education." />
              <Point text="It is not just a social network." />
              <Point text="It is not just a travel tool." />
              <Point text="It is not just migration content." />
            </div>

            <p className="mt-8 text-sm leading-7 text-slate-300">
              TGPI combines identity, mobility, trust, progress, and community
              into one system. That is what gives it strategic power.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-3xl font-bold text-yellow-400">
              The long-term vision
            </h2>

            <p className="mt-6 text-sm leading-7 text-slate-300">
              We believe a person preparing to leave their country should have a
              better system than random content and fragmented tools. TGPI aims
              to become the operating system of international transition.
            </p>

            <p className="mt-6 text-sm leading-7 text-slate-300">
              The future is not only global work or global study. The future is
              global identity. TGPI exists to help users build that identity in
              a way that is measurable, social, trusted, and valuable.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold text-yellow-400">
            This is not a website.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            This is the beginning of a system for people who want to move across
            borders with more intelligence, more clarity, and more power.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/onboarding"
              className="rounded-2xl bg-yellow-500 px-8 py-4 text-lg font-bold text-black transition hover:bg-yellow-400"
            >
              Start Your Global Journey
            </Link>

            <Link
              href="/premium"
              className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-lg font-bold text-white transition hover:border-yellow-500"
            >
              View Premium
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-bold text-yellow-400">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
    </div>
  );
}

function Point({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-sm font-medium text-white">✔ {text}</p>
    </div>
  );
}