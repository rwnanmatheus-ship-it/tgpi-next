import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PremiumActionButton from "@/components/PremiumActionButton";

export const metadata: Metadata = {
  title: "TGPI — Choose Countries With Strategy",
  description:
    "Compare countries, measure global readiness, build practical skills and prepare an international life with the TGPI global decision system.",
  alternates: {
    canonical: "https://theglobalpolymath.com",
  },
  openGraph: {
    title: "TGPI — Choose countries with strategy",
    description:
      "Cost. Culture. Career. Education. Mobility. Compare the world before deciding where to build your life.",
    url: "https://theglobalpolymath.com",
    siteName: "The Global Polymath Institute",
    type: "website",
  },
};

const editorialImages = {
  hero:
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1800&q=88",
  england:
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=86",
  portugal:
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1400&q=86",
  canada:
    "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1400&q=86",
  readiness:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=86",
  documents:
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=86",
  learning:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=86",
  egypt:
    "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1400&q=86",
  spain:
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1400&q=86",
  remote:
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=86",
} as const;

const countryOptions = [
  {
    name: "England",
    image: editorialImages.england,
    alt: "London skyline and historic English architecture",
    bestFor: "Education and global career",
    pressure: "High cost and competition",
    signal: "Academic leverage",
  },
  {
    name: "Portugal",
    image: editorialImages.portugal,
    alt: "Historic Lisbon street and Portuguese architecture",
    bestFor: "European access and adaptation",
    pressure: "Income-to-rent balance",
    signal: "Lifestyle fit",
  },
  {
    name: "Canada",
    image: editorialImages.canada,
    alt: "Toronto skyline representing Canadian international opportunity",
    bestFor: "Career and education pathways",
    pressure: "Housing and entry planning",
    signal: "Mobility path",
  },
] as const;

const readinessSignals = [
  ["Language", "Communication and integration"],
  ["Career", "Income and professional fit"],
  ["Documents", "Official preparation"],
  ["Budget", "Real monthly capacity"],
  ["Mobility", "Entry and movement options"],
  ["Timeline", "Sequence and execution"],
] as const;

const learningPaths = [
  ["01", "Country Decision-Making", "Filter destinations through evidence and trade-offs."],
  ["02", "Cost of Living Intelligence", "Understand rent, income, transport and savings capacity."],
  ["03", "Language as Mobility", "Use language as infrastructure for work and integration."],
  ["04", "First 90 Days Abroad", "Prepare the practical sequence after arrival."],
] as const;

const intelligenceStories = [
  {
    category: "Country intelligence",
    title: "England Is More Than London",
    description: "Education, cities, culture and opportunity beyond the capital.",
    image: editorialImages.england,
    alt: "London and English architecture",
    href: "/countries/united-kingdom",
  },
  {
    category: "Decision comparison",
    title: "Portugal or Spain?",
    description: "Compare language, cost, lifestyle and professional fit.",
    image: editorialImages.spain,
    alt: "Spanish urban architecture and public space",
    href: "/compare",
  },
  {
    category: "Global perspective",
    title: "Egypt Is More Than Ancient History",
    description: "A modern society, strategic location and complex life decision.",
    image: editorialImages.egypt,
    alt: "Egyptian pyramids and desert landscape",
    href: "/countries/egypt",
  },
] as const;

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-xs font-black uppercase tracking-[0.28em] ${
        light ? "text-[#F0D58C]" : "text-[#9A6A12]"
      }`}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-5 font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-6xl ${
          light ? "text-white" : "text-[#0B0B0B]"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-6 text-base leading-8 md:text-lg ${
          light ? "text-[#D6DFEA]" : "text-[#566070]"
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
    <main className="min-h-screen overflow-hidden bg-[#F8F5EE] text-[#0B0B0B]">
      <section className="relative px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_5%,rgba(181,138,42,0.18),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(11,31,58,0.12),transparent_30%),linear-gradient(180deg,#FFFDF8_0%,#F8F5EE_72%,#F1EBDD_100%)]" />

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_45px_120px_rgba(11,31,58,0.13)]">
          <div className="grid min-h-[760px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-center px-7 py-14 sm:px-10 lg:px-14 lg:py-20">
              <div className="w-fit rounded-full border border-[#D6B45D] bg-[#FFF7DE] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#7A5008]">
                The Global Polymath Institute
              </div>

              <h1 className="mt-8 max-w-3xl font-serif text-6xl font-semibold leading-[0.92] tracking-[-0.065em] text-[#0B0B0B] sm:text-7xl lg:text-[5.8rem]">
                Choose countries with <span className="text-[#B58A2A]">strategy.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-[#4E5968] md:text-xl">
                Compare cost, culture, career, education and mobility before deciding where to build your life.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/compare"
                  className="rounded-2xl bg-[#0B1F3A] px-7 py-4 text-center text-sm font-black text-white shadow-[0_18px_45px_rgba(11,31,58,0.25)] transition hover:-translate-y-0.5 hover:bg-[#132B4C]"
                >
                  Find Your Country Fit
                </Link>
                <Link
                  href="/countries"
                  className="rounded-2xl border border-[#B58A2A] bg-[#FFF7DE] px-7 py-4 text-center text-sm font-black text-[#6F4908] transition hover:-translate-y-0.5 hover:bg-[#F7E8BA]"
                >
                  Explore Countries
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs font-black uppercase tracking-[0.16em] text-[#657080]">
                <span>Data</span>
                <span className="text-[#B58A2A]">•</span>
                <span>Education</span>
                <span className="text-[#B58A2A]">•</span>
                <span>Mobility</span>
                <span className="text-[#B58A2A]">•</span>
                <span>Decision</span>
              </div>
            </div>

            <div className="relative min-h-[620px] overflow-hidden bg-[#0B1F3A] lg:min-h-full">
              <Image
                src={editorialImages.hero}
                alt="International university architecture representing education, mobility and global decision-making"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover object-center saturate-[0.78] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,58,0.08),rgba(11,31,58,0.72))]" />
              <div className="absolute inset-x-6 bottom-6 grid gap-3 sm:grid-cols-2 lg:inset-x-8 lg:bottom-8">
                {[
                  ["Country Fit", "84%", "Cost · Language · Mobility"],
                  ["Global Readiness", "67%", "Budget · Skills · Timeline"],
                  ["Decision Scope", "3 countries", "Portugal · Spain · England"],
                  ["Next Step", "Compare", "Turn interest into evidence"],
                ].map(([label, value, note]) => (
                  <div
                    key={label}
                    className="rounded-[22px] border border-white/25 bg-[#FFFDF8]/92 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7B8290]">
                      {label}
                    </p>
                    <p className="mt-2 text-2xl font-black text-[#0B1F3A]">{value}</p>
                    <p className="mt-1 text-xs text-[#5C6675]">{note}</p>
                  </div>
                ))}
              </div>
              <div className="absolute right-6 top-6 rounded-full border border-white/30 bg-[#0B1F3A]/78 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#F0D58C] backdrop-blur-xl lg:right-8 lg:top-8">
                TGPI Decision System
              </div>
            </div>
          </div>

          <div className="grid border-t border-[#D8D2C4] bg-[#F3EEE3] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["195", "Countries in the comparison base"],
              ["5", "Decision dimensions"],
              ["1", "Connected global profile"],
              ["0", "Payments while early access is active"],
            ].map(([value, label]) => (
              <div key={label} className="border-[#D8D2C4] p-6 sm:border-r last:sm:border-r-0">
                <p className="font-serif text-4xl font-semibold text-[#9A6A12]">{value}</p>
                <p className="mt-2 text-sm leading-6 text-[#5D6673]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Country decisions"
          title="The world is not one-size-fits-all."
          description="A strong destination is not simply famous or affordable. It must fit your income, language, career, timing and preferred way of life."
        />

        <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
          {countryOptions.map((country) => (
            <article
              key={country.name}
              className="group overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-white shadow-[0_24px_70px_rgba(11,31,58,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(11,31,58,0.14)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#D8D2C4]">
                <Image
                  src={country.image}
                  alt={country.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover saturate-[0.76] contrast-[1.04] transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/75 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                  <h3 className="font-serif text-4xl font-semibold">{country.name}</h3>
                  <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.17em] backdrop-blur-md">
                    {country.signal}
                  </span>
                </div>
              </div>
              <div className="grid divide-y divide-[#E4DED1] p-6 text-sm">
                <div className="grid grid-cols-[82px_1fr] gap-3 py-3 first:pt-0">
                  <span className="font-black text-[#9A6A12]">Best for</span>
                  <span className="text-[#4F5968]">{country.bestFor}</span>
                </div>
                <div className="grid grid-cols-[82px_1fr] gap-3 py-3 last:pb-0">
                  <span className="font-black text-[#0B1F3A]">Pressure</span>
                  <span className="text-[#4F5968]">{country.pressure}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/countries" className="text-sm font-black text-[#0B1F3A] transition hover:text-[#B58A2A]">
            Explore the complete country base →
          </Link>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 overflow-hidden rounded-[42px] bg-[#0B1F3A] p-7 shadow-[0_42px_110px_rgba(11,31,58,0.22)] md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative rounded-[32px] border border-white/15 bg-[#102947] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
            <div className="rounded-[26px] bg-[#F8F5EE] p-5 md:p-6">
              <div className="flex flex-col gap-4 border-b border-[#D8D2C4] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.23em] text-[#9A6A12]">
                    TGPI System
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-[#0B1F3A]">Global Decision Dashboard</h3>
                </div>
                <div className="w-fit rounded-full border border-[#D6B45D] bg-[#FFF7DE] px-3 py-1 text-xs font-black text-[#7A5008]">
                  Product preview
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  ["Country Fit", "84%"],
                  ["Readiness", "67%"],
                  ["Action Plan", "12 steps"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#D8D2C4] bg-white p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7A8290]">{label}</p>
                    <p className="mt-3 text-2xl font-black text-[#0B1F3A]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] border border-[#C8D7EF] bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-black text-[#0B1F3A]">Portugal vs Spain</p>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-[#9A6A12]">Active comparison</p>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    ["Cost fit", "72%", "66%"],
                    ["Language leverage", "86%", "91%"],
                    ["Career alignment", "68%", "74%"],
                    ["Lifestyle fit", "88%", "84%"],
                  ].map(([label, first, second]) => (
                    <div key={label} className="grid grid-cols-[1fr_52px_52px] items-center gap-3 text-xs">
                      <span className="font-bold text-[#566070]">{label}</span>
                      <span className="rounded-lg bg-[#EEF5FF] px-2 py-1 text-center font-black text-[#123A6F]">{first}</span>
                      <span className="rounded-lg bg-[#FFF7DE] px-2 py-1 text-center font-black text-[#8A5B09]">{second}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[#D6B45D] bg-[#FFF7DE] p-4 text-sm leading-6 text-[#5D461A]">
                <strong>Strategic insight:</strong> Spain improves language and career fit; Portugal improves cost predictability and adaptation.
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="How TGPI works"
              title="From scattered information to personal direction."
              description="TGPI connects your profile, country intelligence, readiness and learning into one decision path instead of leaving you with unrelated articles and lists."
              align="left"
              light
            />
            <div className="mt-9 space-y-5">
              {[
                ["01", "Build your profile", "Define goals, budget, languages, career and preferred lifestyle."],
                ["02", "Compare your options", "Use the same decision dimensions across countries and cities."],
                ["03", "Prepare your next move", "Turn the result into skills, documents, budget and a realistic timeline."],
              ].map(([number, title, description]) => (
                <div key={number} className="grid grid-cols-[48px_1fr] gap-4 border-t border-white/15 pt-5">
                  <span className="font-serif text-2xl font-semibold text-[#F0D58C]">{number}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#C7D1DE]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/compare"
              className="mt-9 inline-block rounded-2xl bg-[#B58A2A] px-6 py-4 text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36]"
            >
              Start a Comparison
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[600px] overflow-hidden rounded-[38px] border border-[#D8D2C4] bg-[#D8D2C4] shadow-[0_32px_90px_rgba(11,31,58,0.13)]">
            <Image
              src={editorialImages.readiness}
              alt="International planning with documents, notes and a laptop"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover saturate-[0.72] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(11,31,58,0.82)_100%)]" />
            <div className="absolute inset-x-6 bottom-6 rounded-[26px] border border-white/25 bg-[#0B1F3A]/78 p-6 text-white backdrop-blur-xl md:inset-x-8 md:bottom-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F0D58C]">Global Readiness</p>
              <div className="mt-4 flex items-end justify-between gap-6">
                <div>
                  <p className="font-serif text-4xl font-semibold">67%</p>
                  <p className="mt-2 text-sm text-[#D7E0EB]">Prepared, with three priority gaps.</p>
                </div>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[67%] rounded-full bg-[#D7B45D]" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Readiness before relocation"
              title="Choosing a country is only the beginning."
              description="International life becomes viable when language, career, documents, budget, mobility and timing work as one plan."
              align="left"
            />

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {readinessSignals.map(([title, description]) => (
                <div key={title} className="rounded-[22px] border border-[#D8D2C4] bg-white p-5 shadow-[0_16px_45px_rgba(11,31,58,0.05)]">
                  <h3 className="font-serif text-2xl font-semibold text-[#0B1F3A]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5D6673]">{description}</p>
                </div>
              ))}
            </div>

            <Link href="/passport" className="mt-8 inline-block text-sm font-black text-[#0B1F3A] transition hover:text-[#B58A2A]">
              Build your Global Passport →
            </Link>
          </div>
        </div>
      </section>

      <section id="global-documents" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_38px_100px_rgba(11,31,58,0.11)] lg:grid-cols-2">
          <div className="relative min-h-[520px] bg-[#D8D2C4]">
            <Image
              src={editorialImages.documents}
              alt="Professional document preparation for international education and mobility"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover saturate-[0.68] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-[#0B1F3A]/10 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 grid gap-3 sm:grid-cols-3 md:inset-x-8 md:bottom-8">
              {[
                ["01", "Organize"],
                ["02", "Translate"],
                ["03", "Prepare"],
              ].map(([number, label]) => (
                <div key={number} className="rounded-[20px] border border-white/25 bg-[#FFFDF8]/92 p-4 backdrop-blur-xl">
                  <p className="text-xs font-black text-[#B58A2A]">{number}</p>
                  <p className="mt-2 font-serif text-xl font-semibold text-[#0B1F3A]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <SectionHeading
              eyebrow="TGPI Global Documents"
              title="Prepare documents for a global life."
              description="A dedicated TGPI path for document organization, sworn translation and practical international preparation."
              align="left"
            />
            <div className="mt-8 space-y-4 text-sm leading-7 text-[#4F5968]">
              <p className="border-l-2 border-[#B58A2A] pl-4">
                Diplomas, transcripts, birth and marriage certificates, professional records and other official materials often require a clear sequence.
              </p>
              <p className="border-l-2 border-[#0B1F3A] pl-4">
                Translation and document services remain separate from the TGPI subscription because they involve professional work, scope validation and individual pricing.
              </p>
            </div>
            <Link
              href="/premium-waitlist"
              className="mt-9 w-fit rounded-2xl bg-[#0B1F3A] px-6 py-4 text-sm font-black text-white transition hover:bg-[#132B4C]"
            >
              Register Interest in Documents
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Practical global education"
              title="Learn what international life actually requires."
              description="TGPI learning paths connect education to decisions: country strategy, cost, language, adaptation, mobility and execution."
              align="left"
            />

            <div className="mt-9 divide-y divide-[#D8D2C4] border-y border-[#D8D2C4]">
              {learningPaths.map(([number, title, description]) => (
                <Link key={number} href="/courses" className="group grid grid-cols-[44px_1fr_auto] items-center gap-4 py-5">
                  <span className="font-serif text-xl font-semibold text-[#B58A2A]">{number}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#0B1F3A]">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#5D6673]">{description}</p>
                  </div>
                  <span className="text-xl font-black text-[#0B1F3A] transition group-hover:translate-x-1 group-hover:text-[#B58A2A]">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative min-h-[620px] overflow-hidden rounded-[38px] border border-[#D8D2C4] bg-[#D8D2C4] shadow-[0_32px_90px_rgba(11,31,58,0.13)]">
            <Image
              src={editorialImages.learning}
              alt="Library and books representing practical global education"
              fill
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover saturate-[0.7] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/82 via-transparent to-[#0B1F3A]/10" />
            <div className="absolute left-6 top-6 rounded-full border border-white/25 bg-[#FFFDF8]/90 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#0B1F3A] backdrop-blur-md md:left-8 md:top-8">
              TGPI Learning System
            </div>
            <div className="absolute inset-x-6 bottom-6 rounded-[28px] border border-white/25 bg-[#0B1F3A]/80 p-6 text-white backdrop-blur-xl md:inset-x-8 md:bottom-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F0D58C]">Learning outcome</p>
              <h3 className="mt-3 font-serif text-3xl font-semibold">Move from information to capability.</h3>
              <p className="mt-3 text-sm leading-7 text-[#D8E0EA]">Build the skills required to compare, prepare, adapt and act.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Editorial intelligence"
          title="See countries as decisions, not dreams."
          description="TGPI content introduces the questions behind real international choices and connects each insight to the platform."
        />

        <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
          {intelligenceStories.map((story) => (
            <Link
              key={story.title}
              href={story.href}
              className="group overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-white shadow-[0_24px_70px_rgba(11,31,58,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(11,31,58,0.14)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#D8D2C4]">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover saturate-[0.74] contrast-[1.04] transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/55 to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9A6A12]">{story.category}</p>
                <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#0B1F3A]">{story.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5D6673]">{story.description}</p>
                <p className="mt-5 text-sm font-black text-[#0B1F3A] transition group-hover:text-[#B58A2A]">Explore intelligence →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[42px] bg-[#0B1F3A] p-8 text-white shadow-[0_42px_120px_rgba(11,31,58,0.24)] md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow light>TGPI Premium</Eyebrow>
            <h2 className="mt-5 font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-7xl">
              Your global decision system.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#D6DFEA]">
              Complete comparisons, Country Fit, Global Readiness, planning, learning and document checklists in one membership.
            </p>
            <div className="mt-8 flex items-end gap-3">
              <span className="font-serif text-5xl font-semibold text-[#F0D58C]">US$ 9.99</span>
              <span className="pb-2 text-sm font-bold text-[#B8C4D2]">/month after launch</span>
            </div>
            <div className="mt-8 max-w-md">
              <PremiumActionButton billingEnabled={billingEnabled} />
            </div>
            {!billingEnabled && (
              <p className="mt-4 max-w-md text-xs leading-5 text-[#AEBBCB]">
                Payments are disabled. Joining early access does not create a charge.
              </p>
            )}
          </div>

          <div className="rounded-[32px] border border-white/15 bg-[#102947] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="rounded-[26px] bg-[#F8F5EE] p-5 text-[#0B0B0B] md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9A6A12]">Premium workspace</p>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-[#0B1F3A]">Your International Plan</h3>
                </div>
                <div className="rounded-full bg-[#0B1F3A] px-3 py-1 text-xs font-black text-white">68% ready</div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Saved countries", "8"],
                  ["Active comparisons", "3"],
                  ["Learning progress", "62%"],
                  ["Document tasks", "7 open"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#D8D2C4] bg-white p-4">
                    <p className="text-xs font-bold text-[#697381]">{label}</p>
                    <p className="mt-2 text-2xl font-black text-[#0B1F3A]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#D6B45D] bg-[#FFF7DE] p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8A5B09]">Next recommended action</p>
                <p className="mt-3 font-serif text-2xl font-semibold text-[#0B1F3A]">Complete the budget and language readiness modules.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_38px_110px_rgba(11,31,58,0.12)]">
          <div className="relative min-h-[520px]">
            <Image
              src={editorialImages.remote}
              alt="Professional planning an international and remote career"
              fill
              sizes="100vw"
              className="object-cover saturate-[0.68] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,58,0.94)_0%,rgba(11,31,58,0.82)_45%,rgba(11,31,58,0.28)_100%)]" />
            <div className="relative flex min-h-[520px] max-w-3xl flex-col justify-center p-8 text-white md:p-14">
              <Eyebrow light>Start with clarity</Eyebrow>
              <h2 className="mt-5 font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.045em] md:text-7xl">
                Countries are not dreams. They are decisions.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D7E0EB]">
                Build your global profile, compare your options and prepare the practical path before making the move.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href="/login" className="rounded-2xl bg-[#B58A2A] px-7 py-4 text-center text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36]">
                  Create Free Account
                </Link>
                <Link href="/pricing" className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-center text-sm font-black text-white backdrop-blur-md transition hover:bg-white/15">
                  Explore Membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
