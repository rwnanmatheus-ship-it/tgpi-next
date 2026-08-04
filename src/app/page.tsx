import type { Metadata } from "next";
import Link from "next/link";
import PremiumActionButton from "@/components/PremiumActionButton";
import TGPIEditorialVisual, {
  type TGPIVisualVariant,
} from "@/components/TGPIEditorialVisual";

export const metadata: Metadata = {
  title: "TGPI — Compare the World Before You Choose",
  description:
    "Compare 195 countries, understand cost, culture, career, education and mobility, and build a practical strategy for international life.",
  alternates: { canonical: "https://theglobalpolymath.com" },
  openGraph: {
    title: "TGPI — Compare the world before you choose",
    description:
      "A global decision system for people preparing to study, work, move or build life abroad.",
    url: "https://theglobalpolymath.com",
    siteName: "The Global Polymath Institute",
    type: "website",
  },
};

const decisionSignals = [
  ["Cost", "Budget, housing and purchasing power"],
  ["Career", "Income, opportunity and professional fit"],
  ["Education", "Institutions, access and learning leverage"],
  ["Culture", "Language, lifestyle and adaptation"],
  ["Mobility", "Entry pathways, documents and movement"],
] as const;

const featuredCountries: Array<{
  name: string;
  href: string;
  variant: TGPIVisualVariant;
  fit: string;
  pressure: string;
  score: string;
}> = [
  {
    name: "Portugal",
    href: "/countries/portugal",
    variant: "portugal",
    fit: "European access and easier cultural adaptation",
    pressure: "Rent-to-income balance",
    score: "82",
  },
  {
    name: "Canada",
    href: "/countries/canada",
    variant: "canada",
    fit: "Education, career pathways and long-term mobility",
    pressure: "Housing and entry planning",
    score: "86",
  },
  {
    name: "England",
    href: "/countries/united-kingdom",
    variant: "england",
    fit: "Academic leverage and global career exposure",
    pressure: "High cost and competition",
    score: "88",
  },
];

const journeySteps = [
  ["01", "Discover", "Start with your real objective, not with a famous destination."],
  ["02", "Compare", "Evaluate trade-offs through one consistent decision framework."],
  ["03", "Prepare", "Connect skills, budget, documents and timeline to your plan."],
  ["04", "Progress", "Build a repeatable international strategy inside your TGPI profile."],
] as const;

const intelligenceStories: Array<{
  category: string;
  title: string;
  description: string;
  href: string;
  variant: TGPIVisualVariant;
}> = [
  {
    category: "Country intelligence",
    title: "England is more than London.",
    description:
      "Evaluate education, cities, cost and opportunity beyond the capital.",
    href: "/countries/united-kingdom",
    variant: "england",
  },
  {
    category: "Decision comparison",
    title: "Portugal or Spain?",
    description:
      "Compare language, lifestyle, professional fit and monthly pressure.",
    href: "/compare?country=portugal&country=spain",
    variant: "spain",
  },
  {
    category: "Global preparation",
    title: "Documents are part of the strategy.",
    description:
      "Organize validation, translation and deadlines before they become blockers.",
    href: "/passport",
    variant: "documents",
  },
];

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-xs font-black uppercase tracking-[0.28em] ${
        light ? "text-[#F0D58C]" : "text-[var(--tgpi-gold-strong)]"
      }`}
    >
      {children}
    </p>
  );
}

function Heading({
  label,
  title,
  description,
  light = false,
  align = "center",
}: {
  label: string;
  title: string;
  description: string;
  light?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Label light={light}>{label}</Label>
      <h2
        className={`mt-5 font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-6xl ${
          light ? "text-white" : "text-[var(--tgpi-ink)]"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-6 text-base leading-8 md:text-lg ${
          light ? "text-[#DCE4EE]" : "text-[var(--tgpi-muted)]"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

export default function HomePage() {
  const billingEnabled = process.env.BILLING_ENABLED === "true";

  return (
    <main className="overflow-hidden bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
      <section className="relative px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(181,138,42,0.16),transparent_28%),radial-gradient(circle_at_90%_10%,rgba(11,31,58,0.13),transparent_30%),linear-gradient(180deg,#FFFDF8_0%,#F8F5EE_74%,#EFE8DB_100%)]" />
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[42px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[0_42px_120px_rgba(11,31,58,0.13)]">
          <div className="grid min-h-[730px] lg:grid-cols-[0.94fr_1.06fr]">
            <div className="flex flex-col justify-center px-7 py-14 sm:px-10 lg:px-14 lg:py-20">
              <div className="w-fit rounded-full border border-[#D6B45D] bg-[var(--tgpi-gold-soft)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#765009]">
                The Global Polymath Institute
              </div>
              <h1 className="mt-8 max-w-3xl font-serif text-6xl font-semibold leading-[0.91] tracking-[-0.068em] text-[var(--tgpi-ink)] sm:text-7xl lg:text-[5.8rem]">
                Compare the world before you <span className="text-[var(--tgpi-gold)]">choose.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--tgpi-muted)] md:text-xl">
                TGPI organizes countries, costs, careers, education, culture and mobility into one practical decision system for international life.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/countries" className="rounded-2xl bg-[var(--tgpi-navy)] px-7 py-4 text-center text-sm font-black text-white shadow-[0_18px_45px_rgba(11,31,58,0.24)] transition hover:-translate-y-0.5 hover:bg-[#16345D]">
                  Explore 195 countries
                </Link>
                <Link href="/compare" className="rounded-2xl border border-[var(--tgpi-gold)] bg-[var(--tgpi-gold-soft)] px-7 py-4 text-center text-sm font-black text-[#6F4908] transition hover:-translate-y-0.5 hover:bg-[#F4E2AC]">
                  Compare countries
                </Link>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#667080]">
                <span>Data</span><span className="text-[var(--tgpi-gold)]">•</span>
                <span>Education</span><span className="text-[var(--tgpi-gold)]">•</span>
                <span>Mobility</span><span className="text-[var(--tgpi-gold)]">•</span>
                <span>Decision</span>
              </div>
            </div>

            <div className="relative min-h-[590px] lg:min-h-full">
              <TGPIEditorialVisual variant="hero" id="home-hero-v2" ariaLabel="International traveler preparing for a strategic global decision" className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,58,0.02),rgba(11,31,58,0.58))]" />
              <div className="absolute right-6 top-6 rounded-full border border-white/30 bg-[#0B1F3A]/82 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#F0D58C] backdrop-blur-xl lg:right-8 lg:top-8">
                TGPI Decision System
              </div>
              <div className="absolute inset-x-6 bottom-6 grid gap-3 sm:grid-cols-2 lg:inset-x-8 lg:bottom-8">
                {[
                  ["Country fit", "84%", "Cost · Language · Mobility"],
                  ["Readiness", "67%", "Budget · Skills · Documents"],
                  ["Shortlist", "3 countries", "Portugal · Spain · England"],
                  ["Next move", "Compare", "Turn interest into evidence"],
                ].map(([label, value, note]) => (
                  <div key={label} className="rounded-[22px] border border-white/25 bg-[#FFFDF8]/94 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7B8290]">{label}</p>
                    <p className="mt-2 text-2xl font-black text-[var(--tgpi-navy)]">{value}</p>
                    <p className="mt-1 text-xs text-[#5C6675]">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid border-t border-[var(--tgpi-border)] bg-[#F2ECE0] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["195", "countries in one intelligence base"],
              ["5", "decision dimensions"],
              ["1", "connected global profile"],
              ["24/7", "self-guided exploration"],
            ].map(([value, label]) => (
              <div key={label} className="border-[var(--tgpi-border)] p-6 sm:border-r last:sm:border-r-0">
                <p className="font-serif text-4xl font-semibold text-[var(--tgpi-gold-strong)]">{value}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--tgpi-muted)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <Heading label="The TGPI decision framework" title="A country is not a dream. It is a system of trade-offs." description="TGPI gives every destination the same strategic lens, so attractive signals never hide practical pressure." />
        <div className="mx-auto mt-14 grid max-w-[1280px] gap-4 md:grid-cols-5">
          {decisionSignals.map(([title, description], index) => (
            <article key={title} className="rounded-[26px] border border-[var(--tgpi-border)] bg-white p-6 shadow-[var(--tgpi-shadow-soft)]">
              <span className="text-xs font-black text-[var(--tgpi-gold-strong)]">0{index + 1}</span>
              <h3 className="mt-5 font-serif text-2xl font-semibold text-[var(--tgpi-navy)]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--tgpi-muted)]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--tgpi-navy)] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <Heading label="Country intelligence" title="Move from inspiration to evidence." description="Explore a consistent base of country profiles, then narrow the world through your own priorities." light align="left" />
            <div className="grid gap-3 sm:grid-cols-3">
              {[["195", "country profiles"], ["100+", "decision signals"], ["3", "countries per comparison"]].map(([value, label]) => (
                <div key={label} className="rounded-[24px] border border-white/15 bg-white/5 p-5 backdrop-blur">
                  <p className="font-serif text-4xl font-semibold text-[#F0D58C]">{value}</p>
                  <p className="mt-2 text-sm text-[#DCE4EE]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {featuredCountries.map((country, index) => (
              <Link key={country.name} href={country.href} className="group overflow-hidden rounded-[30px] border border-white/15 bg-white/5 transition hover:-translate-y-1 hover:border-[#D6B45D]">
                <TGPIEditorialVisual variant={country.variant} id={`home-country-${index}`} ariaLabel={`${country.name} country intelligence`} className="aspect-[4/3] w-full" />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-serif text-3xl font-semibold">{country.name}</h3>
                    <span className="rounded-full border border-[#D6B45D]/50 bg-[#D6B45D]/10 px-3 py-1 text-xs font-black text-[#F0D58C]">TGPI {country.score}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#DCE4EE]">{country.fit}</p>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-[#F0D58C]">Pressure: {country.pressure}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/countries" className="rounded-2xl bg-[#F0D58C] px-6 py-4 text-center text-sm font-black text-[var(--tgpi-navy)] transition hover:bg-white">Explore all countries</Link>
            <Link href="/compare" className="rounded-2xl border border-white/25 px-6 py-4 text-center text-sm font-black text-white transition hover:border-[#F0D58C] hover:text-[#F0D58C]">Open comparison tool</Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[38px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-card)] lg:grid-cols-2">
          <TGPIEditorialVisual variant="compare" id="home-comparison" ariaLabel="World map used for country comparison" className="min-h-[460px] w-full" />
          <div className="p-7 sm:p-10 lg:p-14">
            <Label>See the trade-offs</Label>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1] tracking-[-0.05em] text-[var(--tgpi-ink)] md:text-6xl">High salary does not automatically mean a better life.</h2>
            <p className="mt-6 text-base leading-8 text-[var(--tgpi-muted)]">Compare countries side by side and expose the relationship between salary, cost, safety, language, quality of life and adaptation.</p>
            <div className="mt-8 space-y-3">
              {[["Portugal", "Lower adaptation pressure", "Lifestyle fit"], ["Canada", "Stronger career pathways", "Housing pressure"], ["England", "Academic and global leverage", "Premium cost"]].map(([country, strength, pressure]) => (
                <div key={country} className="grid gap-2 rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-paper)] p-4 sm:grid-cols-[0.6fr_1fr_1fr]">
                  <p className="font-black text-[var(--tgpi-navy)]">{country}</p>
                  <p className="text-sm text-[var(--tgpi-muted)]">{strength}</p>
                  <p className="text-sm font-semibold text-[var(--tgpi-gold-strong)]">{pressure}</p>
                </div>
              ))}
            </div>
            <Link href="/compare?country=portugal&country=canada&country=united-kingdom" className="mt-8 inline-flex rounded-2xl bg-[var(--tgpi-navy)] px-6 py-4 text-sm font-black text-white transition hover:bg-[#16345D]">Compare these countries</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--tgpi-border)] bg-[#F1EBDD] px-4 py-24 sm:px-6 lg:px-8">
        <Heading label="How TGPI works" title="A clear path from interest to action." description="The platform is designed to help you reduce uncertainty in a practical sequence." />
        <div className="mx-auto mt-14 grid max-w-[1280px] gap-5 lg:grid-cols-4">
          {journeySteps.map(([number, title, description]) => (
            <article key={number} className="rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-7 shadow-[var(--tgpi-shadow-soft)]">
              <p className="font-serif text-5xl font-semibold text-[#D5BE82]">{number}</p>
              <h3 className="mt-8 font-serif text-3xl font-semibold text-[var(--tgpi-navy)]">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--tgpi-muted)]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <Heading label="From the TGPI intelligence library" title="The same editorial identity. Now interactive." description="The ideas introduced on Instagram continue inside the platform as country reports, comparisons and action tools." />
        <div className="mx-auto mt-14 grid max-w-[1280px] gap-6 lg:grid-cols-3">
          {intelligenceStories.map((story, index) => (
            <Link key={story.title} href={story.href} className="group overflow-hidden rounded-[30px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--tgpi-shadow-card)]">
              <TGPIEditorialVisual variant={story.variant} id={`home-story-${index}`} ariaLabel={story.title} className="aspect-[4/3] w-full" />
              <div className="p-6">
                <Label>{story.category}</Label>
                <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[var(--tgpi-navy)]">{story.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--tgpi-muted)]">{story.description}</p>
                <span className="mt-5 inline-flex text-sm font-black text-[var(--tgpi-navy)] transition group-hover:text-[var(--tgpi-gold-strong)]">Open intelligence →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[40px] bg-[var(--tgpi-navy)] text-white shadow-[0_40px_110px_rgba(11,31,58,0.22)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <Label light>TGPI Premium</Label>
            <h2 className="mt-5 font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-7xl">Turn exploration into a personal global strategy.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#DCE4EE] md:text-lg">Premium connects your profile, readiness, country shortlist, recommendations and progress into one decision environment.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Personal country-fit recommendations", "Advanced country comparison", "Global readiness and progress tracking", "Priority access to new TGPI tools"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm font-semibold text-[#E9EEF5]">✓ {item}</div>
              ))}
            </div>
            <div className="mt-8 max-w-sm"><PremiumActionButton billingEnabled={billingEnabled} /></div>
            <p className="mt-4 text-xs text-[#AEBBCB]">Secure billing activates only when the official launch configuration is enabled.</p>
          </div>
          <TGPIEditorialVisual variant="premium" id="home-premium" ariaLabel="Professional workspace for international planning" className="min-h-[520px] w-full" />
        </div>
      </section>

      <footer className="border-t border-[var(--tgpi-border)] bg-[#EEE7D9] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr]">
          <div>
            <p className="font-serif text-3xl font-semibold text-[var(--tgpi-navy)]">The Global Polymath Institute</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--tgpi-muted)]">Global education for people building life abroad. Compare countries with strategy, prepare with clarity and act with evidence.</p>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[var(--tgpi-gold-strong)]">Data · Education · Mobility · Decision</p>
          </div>
          <FooterColumn title="Explore" links={[["Countries", "/countries"], ["Compare", "/compare"], ["Ranking", "/ranking"]]} />
          <FooterColumn title="Build" links={[["Dashboard", "/dashboard"], ["Passport", "/passport"], ["Courses", "/courses"]]} />
          <FooterColumn title="Company" links={[["About", "/about"], ["Why TGPI", "/why"], ["Pricing", "/pricing"]]} />
        </div>
        <div className="mx-auto mt-12 flex max-w-[1280px] flex-col gap-3 border-t border-[var(--tgpi-border)] pt-6 text-xs text-[#737B87] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TGPI — The Global Polymath Institute.</p>
          <p>Educational intelligence. Validate official sources before legal, tax, financial or immigration decisions.</p>
        </div>
      </footer>
    </main>
  );
}

function FooterColumn({ title, links }: { title: string; links: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--tgpi-navy)]">{title}</p>
      <div className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="block text-sm text-[var(--tgpi-muted)] transition hover:text-[var(--tgpi-gold-strong)]">{label}</Link>
        ))}
      </div>
    </div>
  );
}
