import type { Metadata } from "next";
import Link from "next/link";

type CardItem = {
  title: string;
  description: string;
  meta?: string;
};

type PillarItem = CardItem & {
  href: string;
  signal: string;
};

type JourneyItem = {
  step: string;
  title: string;
  description: string;
};

export const metadata: Metadata = {
  title: "TGPI — Global Decision System for a Borderless Life",
  description:
    "The Global Polymath Institute helps you compare countries, build practical skills, understand cost of living, plan mobility and prepare a global life with strategic clarity.",
  alternates: {
    canonical: "https://theglobalpolymath.com",
  },
  openGraph: {
    title: "TGPI — Build your global life with clarity",
    description:
      "Compare countries. Build skills. Learn languages. Plan mobility. TGPI turns global information into practical direction.",
    url: "https://theglobalpolymath.com",
    siteName: "The Global Polymath Institute",
    type: "website",
  },
};

const proofStats = [
  { value: "195", label: "Countries structured for comparison" },
  { value: "6", label: "Core global intelligence pillars" },
  { value: "4", label: "Future SaaS decision modules" },
  { value: "1", label: "Operating system for global life" },
];

const buildItems: CardItem[] = [
  {
    title: "Decision clarity",
    description:
      "Understand countries through cost, language, mobility, learning and long-term fit before making life-changing choices.",
  },
  {
    title: "Practical intelligence",
    description:
      "Convert global data into useful actions: what to learn, where to compare, what to avoid and how to prepare.",
  },
  {
    title: "International readiness",
    description:
      "Build the skills, awareness and planning discipline required to study, work, live and adapt across borders.",
  },
];

const pillars: PillarItem[] = [
  {
    title: "Countries",
    description: "Explore country profiles through cost, region, language, salary and strategic fit.",
    signal: "195-country base",
    href: "/countries",
  },
  {
    title: "Courses",
    description: "Follow practical learning paths designed for global adaptability and real decisions.",
    signal: "Applied learning",
    href: "/courses",
  },
  {
    title: "Languages",
    description: "Treat language as infrastructure for mobility, integration, work and opportunity.",
    signal: "Access layer",
    href: "/languages",
  },
  {
    title: "Cost of Living",
    description: "Compare monthly realities before confusing high salaries with better lives.",
    signal: "Real-life economics",
    href: "/cost-of-living",
  },
  {
    title: "Global Mobility",
    description: "Prepare the sequence: destination, documents, income, adaptation and first 90 days.",
    signal: "Mobility planning",
    href: "/countries",
  },
  {
    title: "AI Guidance",
    description: "A future guidance layer for personalized country fit, learning paths and readiness signals.",
    signal: "SaaS direction",
    href: "/compare",
  },
];

const systemItems: CardItem[] = [
  {
    title: "Decision System",
    meta: "Compare before you choose",
    description:
      "A structured way to filter destinations by cost, salary, language, opportunity and personal timing.",
  },
  {
    title: "Readiness Score",
    meta: "Know what is missing",
    description:
      "A future assessment layer for budget, language, career, documentation and cultural adaptability.",
  },
  {
    title: "Learning Paths",
    meta: "Learn with direction",
    description:
      "Courses organized around practical outcomes: mobility, language strategy, global work and decision-making.",
  },
  {
    title: "Global Profile",
    meta: "Your international operating base",
    description:
      "A future profile that connects your goals, constraints, saved countries and recommended next steps.",
  },
];

const journey: JourneyItem[] = [
  {
    step: "01",
    title: "Discover",
    description: "See the world as a map of options, not a collection of random destinations.",
  },
  {
    step: "02",
    title: "Compare",
    description: "Use cost, language, salary and mobility signals to reduce emotional guessing.",
  },
  {
    step: "03",
    title: "Learn",
    description: "Build the skills that make a global life realistic: language, planning, culture and work.",
  },
  {
    step: "04",
    title: "Plan",
    description: "Turn information into a sequence: budget, destination, timeline, documents and adaptation.",
  },
  {
    step: "05",
    title: "Execute",
    description: "Move with a clearer strategy and a stronger foundation for long-term adaptation.",
  },
];

const featuredCountries = [
  { name: "Portugal", note: "Lower-cost European entry", metric: "Cost strategy" },
  { name: "Spain", note: "Language leverage and lifestyle", metric: "Adaptation fit" },
  { name: "Canada", note: "Career and education pathways", metric: "Mobility path" },
  { name: "Germany", note: "Skills, industry and structure", metric: "Work potential" },
];

const featuredCourses = [
  "Global Decision-Making",
  "Cost of Living Intelligence",
  "Language Strategy for Mobility",
  "First 90 Days Abroad",
];

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg">{description}</p>
    </div>
  );
}

function PremiumCard({ item }: { item: CardItem }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35 hover:bg-white/[0.07]">
      {item.meta ? <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">{item.meta}</p> : null}
      <h3 className="text-xl font-black text-white">{item.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02040A] text-white">
      <section className="relative isolate px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.18),transparent_30%),linear-gradient(180deg,#02040A_0%,#050816_58%,#02040A_100%)]" />
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-white/10 bg-black/35 shadow-[0_40px_140px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="grid min-h-[760px] items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-14">
            <div>
              <div className="mb-8 inline-flex rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-yellow-300">
                The Global Polymath Institute
              </div>
              <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
                Build your global life with clarity.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                TGPI turns global information into practical direction. Compare countries, build skills, learn languages and prepare a life without borders with a strategic decision system.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/countries" className="rounded-2xl bg-yellow-400 px-7 py-4 text-center text-base font-black text-black shadow-[0_0_42px_rgba(212,175,55,0.28)] transition hover:bg-yellow-300">
                  Explore countries
                </Link>
                <Link href="/compare" className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-center text-base font-black text-white backdrop-blur transition hover:border-sky-300/50 hover:bg-sky-400/10">
                  Compare strategically
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-400">Not just content. A decision system for a global life.</p>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-yellow-400/20 via-sky-500/10 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#070B16]/92 p-5 shadow-[0_28px_100px_rgba(0,0,0,0.55)]">
                <div className="rounded-[26px] border border-white/10 bg-black/35 p-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">TGPI System</p>
                      <h2 className="mt-2 text-2xl font-black">Global Decision Dashboard</h2>
                    </div>
                    <div className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-300">Live concept</div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      ["Country Fit", "84%", "Cost • Language • Mobility"],
                      ["Readiness", "67%", "Budget • Skills • Timeline"],
                      ["Learning Path", "4 modules", "Practical global skills"],
                      ["Next Step", "Compare", "Portugal vs Spain"],
                    ].map(([label, value, note]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
                        <p className="mt-3 text-2xl font-black text-white">{value}</p>
                        <p className="mt-2 text-xs text-slate-400">{note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-5">
                    <p className="text-sm font-bold text-sky-200">Strategic insight</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Compare countries like systems: cost, income, language, mobility and personal readiness must work together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid border-t border-white/10 md:grid-cols-4">
            {proofStats.map((item) => (
              <div key={item.label} className="border-white/10 p-6 md:border-r last:md:border-r-0">
                <p className="text-4xl font-black text-yellow-300">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Outcome" title="What TGPI helps you build" description="TGPI is designed to help people think, learn and move with structure. The goal is not inspiration. The goal is better global decisions." />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {buildItems.map((item) => <PremiumCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Platform pillars" title="One brand. Six global intelligence layers." description="The Home now communicates TGPI as a future SaaS ecosystem: content, data, education and decision tools connected in one premium experience." />
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link key={pillar.title} href={pillar.href} className="group rounded-[28px] border border-white/10 bg-[#070B16] p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-[#0B1020]">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">{pillar.signal}</p>
              <h3 className="mt-5 text-2xl font-black text-white">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{pillar.description}</p>
              <p className="mt-6 text-sm font-bold text-sky-300 transition group-hover:text-yellow-300">Explore layer →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-white/10 bg-gradient-to-br from-[#08111F] via-[#040814] to-black p-6 shadow-[0_32px_120px_rgba(0,0,0,0.42)] md:p-10">
          <SectionHeader eyebrow="Intelligent system" title="From global information to personal direction" description="TGPI is being positioned as infrastructure for international planning: a system that connects data, learning, comparison and readiness." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {systemItems.map((item) => <PremiumCard key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.035] p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Normal content</p>
            <h2 className="mt-5 text-3xl font-black">Information without direction.</h2>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
              <li>• Random tips without a decision framework.</li>
              <li>• Beautiful destinations without cost reality.</li>
              <li>• Motivation without language, income or mobility planning.</li>
              <li>• Lists that do not help the user choose what to do next.</li>
            </ul>
          </div>
          <div className="rounded-[32px] border border-yellow-400/25 bg-yellow-400/[0.08] p-7 shadow-[0_0_80px_rgba(212,175,55,0.08)] md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">TGPI system</p>
            <h2 className="mt-5 text-3xl font-black">Practical direction for global life.</h2>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-200">
              <li>• Compare countries through useful decision signals.</li>
              <li>• Learn skills that improve mobility and adaptation.</li>
              <li>• Understand trade-offs before choosing a destination.</li>
              <li>• Turn global curiosity into a structured personal plan.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="User journey" title="A clearer path from discovery to execution" description="The experience now shows how TGPI guides a user across the full international decision journey." />
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-5">
          {journey.map((item) => (
            <div key={item.step} className="rounded-[28px] border border-white/10 bg-[#070B16] p-6">
              <p className="text-sm font-black text-yellow-300">{item.step}</p>
              <h3 className="mt-5 text-xl font-black">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[36px] border border-white/10 bg-white/[0.035] p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">Featured countries</p>
            <h2 className="mt-4 text-3xl font-black md:text-5xl">Start comparing where strategy becomes visible.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {featuredCountries.map((country) => (
                <Link href="/countries" key={country.name} className="rounded-2xl border border-white/10 bg-black/25 p-5 transition hover:border-sky-300/35 hover:bg-sky-400/10">
                  <p className="text-lg font-black">{country.name}</p>
                  <p className="mt-2 text-sm text-slate-300">{country.note}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-sky-300">{country.metric}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-[36px] border border-white/10 bg-[#070B16] p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Featured learning paths</p>
            <h2 className="mt-4 text-3xl font-black">Courses built around real global decisions.</h2>
            <div className="mt-8 space-y-4">
              {featuredCourses.map((course) => (
                <Link href="/courses" key={course} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-yellow-400/35">
                  <span className="font-bold text-white">{course}</span>
                  <span className="text-yellow-300">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(212,175,55,0.12),rgba(37,99,235,0.1),rgba(255,255,255,0.03))] p-7 text-center md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-300">Institutional authority</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
            A global institute for practical intelligence, adaptability and strategic mobility.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            TGPI combines education, global data, decision frameworks and product thinking to help people prepare for a world where location, skill and adaptability define opportunity.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-yellow-400/25 bg-black p-8 text-center shadow-[0_0_120px_rgba(212,175,55,0.1)] md:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-300">Start with clarity</p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">Compare countries. Build skills. Move with strategy.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Your next country should be a decision, not a guess. Use TGPI to understand the systems behind better global choices.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/countries" className="rounded-2xl bg-yellow-400 px-8 py-4 text-base font-black text-black transition hover:bg-yellow-300">Explore the world</Link>
            <Link href="/courses" className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-black text-white transition hover:border-sky-300/45">Build your path</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
