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
  title: "TGPI — Build Your Global Life With Clarity",
  description:
    "The Global Polymath Institute is a premium global education and decision system for comparing countries, building practical skills, planning mobility and preparing a life without borders.",
  alternates: {
    canonical: "https://theglobalpolymath.com",
  },
  openGraph: {
    title: "TGPI — Build your global life with clarity",
    description:
      "Compare countries. Build practical skills. Learn strategically. Move with clarity.",
    url: "https://theglobalpolymath.com",
    siteName: "The Global Polymath Institute",
    type: "website",
  },
};

const proofStats = [
  { value: "195", label: "Countries for structured comparison" },
  { value: "6", label: "Global intelligence pillars" },
  { value: "4", label: "SaaS-ready decision modules" },
  { value: "1", label: "System for global life planning" },
];

const buildItems: CardItem[] = [
  {
    title: "Choose countries with evidence",
    description:
      "Compare cost, salary, language and mobility signals before turning a destination into a life decision.",
  },
  {
    title: "Build practical global skills",
    description:
      "Learn the frameworks behind adaptation, communication, planning and international opportunity.",
  },
  {
    title: "Move from curiosity to direction",
    description:
      "Replace scattered information with a structured path for learning, comparing, planning and executing.",
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
    meta: "Your operating base",
    description:
      "A future profile connecting your goals, constraints, saved countries and recommended next steps.",
  },
];

const journey: JourneyItem[] = [
  { step: "01", title: "Discover", description: "See the world as structured options, not random destinations." },
  { step: "02", title: "Compare", description: "Use cost, language, salary and mobility signals to reduce guessing." },
  { step: "03", title: "Learn", description: "Build the skills that make international life realistic." },
  { step: "04", title: "Plan", description: "Turn information into budget, timeline, documents and adaptation steps." },
  { step: "05", title: "Execute", description: "Move with clearer strategy and stronger long-term preparation." },
];

const featuredCountries = [
  { name: "Portugal", note: "Accessible European entry point", metric: "Cost strategy" },
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
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-[#9A6A12]">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-[-0.04em] text-[#111827] md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-[#5B6472] md:text-lg">{description}</p>
    </div>
  );
}

function PremiumCard({ item }: { item: CardItem }) {
  return (
    <article className="rounded-[28px] border border-[#E7E0D3] bg-white p-6 shadow-[0_24px_70px_rgba(17,24,39,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#C8A24A] hover:shadow-[0_30px_90px_rgba(17,24,39,0.12)]">
      {item.meta ? <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#123A6F]">{item.meta}</p> : null}
      <h3 className="text-xl font-black text-[#111827]">{item.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#5B6472]">{item.description}</p>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F3EA] text-[#111827]">
      <section className="relative isolate px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_6%,rgba(200,162,74,0.22),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(18,58,111,0.14),transparent_30%),linear-gradient(180deg,#FFFDF8_0%,#F7F3EA_60%,#EFE7D8_100%)]" />
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-[#E3D8C4] bg-[#FFFDF8]/90 shadow-[0_45px_120px_rgba(17,24,39,0.12)] backdrop-blur-xl">
          <div className="grid min-h-[720px] items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1fr_0.95fr] lg:px-14">
            <div>
              <div className="mb-8 inline-flex rounded-full border border-[#D9BD70] bg-[#FFF7DE] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#8A5B09]">
                The Global Polymath Institute
              </div>
              <h1 className="max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.065em] text-[#0D1321] md:text-7xl lg:text-8xl">
                Build a global life without guessing.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#475569] md:text-xl">
                TGPI is a premium education and decision system for people who want to compare countries, build practical skills and move through the world with strategic clarity.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/countries" className="rounded-2xl bg-[#111827] px-7 py-4 text-center text-base font-black text-white shadow-[0_18px_45px_rgba(17,24,39,0.22)] transition hover:bg-[#0B1220]">
                  Explore countries
                </Link>
                <Link href="/courses" className="rounded-2xl border border-[#C8A24A] bg-[#FFF7DE] px-7 py-4 text-center text-base font-black text-[#6E4706] transition hover:bg-[#F8E7B4]">
                  Start learning
                </Link>
              </div>
              <p className="mt-6 text-sm font-medium text-[#64748B]">Not just content. A practical operating system for international decisions.</p>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[44px] bg-gradient-to-br from-[#C8A24A]/24 via-[#123A6F]/10 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[34px] border border-[#DED3BF] bg-white p-5 shadow-[0_28px_80px_rgba(17,24,39,0.14)]">
                <div className="rounded-[26px] border border-[#E7E0D3] bg-[#FBF8F1] p-5">
                  <div className="flex items-center justify-between border-b border-[#E7E0D3] pb-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#9A6A12]">TGPI System</p>
                      <h2 className="mt-2 text-2xl font-black text-[#111827]">Global Decision Dashboard</h2>
                    </div>
                    <div className="rounded-full border border-[#D9BD70] bg-white px-3 py-1 text-xs font-black text-[#8A5B09]">Preview</div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {[
                      ["Country Fit", "84%", "Cost • Language • Mobility"],
                      ["Readiness", "67%", "Budget • Skills • Timeline"],
                      ["Learning Path", "4 modules", "Practical global skills"],
                      ["Next Step", "Compare", "Portugal vs Spain"],
                    ].map(([label, value, note]) => (
                      <div key={label} className="rounded-2xl border border-[#E7E0D3] bg-white p-4 shadow-sm">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7A8290]">{label}</p>
                        <p className="mt-3 text-2xl font-black text-[#111827]">{value}</p>
                        <p className="mt-2 text-xs text-[#64748B]">{note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#C8D7EF] bg-[#EEF5FF] p-5">
                    <p className="text-sm font-black text-[#123A6F]">Strategic insight</p>
                    <p className="mt-2 text-sm leading-6 text-[#42526A]">
                      The right country is not the famous one. It is the one where cost, income, language, timing and readiness work together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid border-t border-[#E7E0D3] bg-[#FBF8F1] md:grid-cols-4">
            {proofStats.map((item) => (
              <div key={item.label} className="border-[#E7E0D3] p-6 md:border-r last:md:border-r-0">
                <p className="text-4xl font-black text-[#9A6A12]">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-[#5B6472]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Outcome" title="What TGPI helps you build" description="TGPI turns international curiosity into structured progress: better comparison, better learning and better preparation for global life." />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {buildItems.map((item) => <PremiumCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Platform pillars" title="A global education system with product-level clarity." description="Each TGPI pillar is designed to become part of a larger decision platform: countries, courses, languages, cost, mobility and AI guidance." />
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link key={pillar.title} href={pillar.href} className="group rounded-[28px] border border-[#E7E0D3] bg-white p-6 shadow-[0_20px_70px_rgba(17,24,39,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#C8A24A] hover:shadow-[0_30px_90px_rgba(17,24,39,0.12)]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9A6A12]">{pillar.signal}</p>
              <h3 className="mt-5 text-2xl font-black text-[#111827]">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#5B6472]">{pillar.description}</p>
              <p className="mt-6 text-sm font-black text-[#123A6F] transition group-hover:text-[#9A6A12]">Explore layer →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[#E3D8C4] bg-[#FFFDF8] p-6 shadow-[0_35px_100px_rgba(17,24,39,0.1)] md:p-10">
          <SectionHeader eyebrow="Intelligent system" title="From global information to personal direction" description="TGPI is positioned as infrastructure for international planning: a system that connects data, learning, comparison and readiness." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {systemItems.map((item) => <PremiumCard key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-[#E7E0D3] bg-white p-7 shadow-[0_24px_70px_rgba(17,24,39,0.07)] md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#7A8290]">Normal content</p>
            <h2 className="mt-5 text-3xl font-black text-[#111827]">Information without direction.</h2>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-[#5B6472]">
              <li>• Random tips without a decision framework.</li>
              <li>• Beautiful destinations without cost reality.</li>
              <li>• Motivation without language, income or mobility planning.</li>
              <li>• Lists that do not help the user choose what to do next.</li>
            </ul>
          </div>
          <div className="rounded-[32px] border border-[#D9BD70] bg-[#FFF7DE] p-7 shadow-[0_24px_70px_rgba(154,106,18,0.12)] md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#9A6A12]">TGPI system</p>
            <h2 className="mt-5 text-3xl font-black text-[#111827]">Practical direction for global life.</h2>
            <ul className="mt-8 space-y-4 text-sm leading-7 text-[#4A3B1B]">
              <li>• Compare countries through useful decision signals.</li>
              <li>• Learn skills that improve mobility and adaptation.</li>
              <li>• Understand trade-offs before choosing a destination.</li>
              <li>• Turn global curiosity into a structured personal plan.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="User journey" title="A clearer path from discovery to execution" description="The experience shows how TGPI guides a user across the full international decision journey." />
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-5">
          {journey.map((item) => (
            <div key={item.step} className="rounded-[28px] border border-[#E7E0D3] bg-white p-6 shadow-[0_18px_60px_rgba(17,24,39,0.06)]">
              <p className="text-sm font-black text-[#9A6A12]">{item.step}</p>
              <h3 className="mt-5 text-xl font-black text-[#111827]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#5B6472]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[40px] border border-[#E3D8C4] bg-[#FFFDF8] p-7 shadow-[0_32px_90px_rgba(17,24,39,0.1)] md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#9A6A12]">Featured countries</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#111827] md:text-5xl">Start comparing where strategy becomes visible.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {featuredCountries.map((country) => (
                <Link href="/countries" key={country.name} className="rounded-2xl border border-[#E7E0D3] bg-white p-5 transition hover:border-[#123A6F]/40 hover:bg-[#EEF5FF]">
                  <p className="text-lg font-black text-[#111827]">{country.name}</p>
                  <p className="mt-2 text-sm text-[#5B6472]">{country.note}</p>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#123A6F]">{country.metric}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-[40px] border border-[#C8D7EF] bg-[#EEF5FF] p-7 shadow-[0_32px_90px_rgba(18,58,111,0.1)] md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#123A6F]">Featured learning paths</p>
            <h2 className="mt-4 text-3xl font-black text-[#111827]">Courses built around real global decisions.</h2>
            <div className="mt-8 space-y-4">
              {featuredCourses.map((course) => (
                <Link href="/courses" key={course} className="flex items-center justify-between rounded-2xl border border-[#C8D7EF] bg-white p-5 transition hover:border-[#C8A24A]">
                  <span className="font-black text-[#111827]">{course}</span>
                  <span className="font-black text-[#9A6A12]">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[#E3D8C4] bg-[linear-gradient(135deg,#FFFFFF,#FFF7DE,#EEF5FF)] p-7 text-center shadow-[0_35px_110px_rgba(17,24,39,0.1)] md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9A6A12]">Institutional authority</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-[-0.05em] text-[#111827] md:text-6xl">
            A global institute for practical intelligence, adaptability and strategic mobility.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#5B6472] md:text-lg">
            TGPI combines education, global data, decision frameworks and product thinking to help people prepare for a world where location, skill and adaptability define opportunity.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[40px] border border-[#D9BD70] bg-[#111827] p-8 text-center shadow-[0_40px_120px_rgba(17,24,39,0.2)] md:p-14">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F2D27A]">Start with clarity</p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">Compare countries. Build skills. Move with strategy.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#D5DBE5]">
            Your next country should be a decision, not a guess. Use TGPI to understand the systems behind better global choices.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/countries" className="rounded-2xl bg-[#F2D27A] px-8 py-4 text-base font-black text-[#111827] transition hover:bg-[#FFE49A]">Explore the world</Link>
            <Link href="/courses" className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-black text-white transition hover:bg-white/15">Build your path</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
