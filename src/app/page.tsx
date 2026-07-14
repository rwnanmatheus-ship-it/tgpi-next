import type { Metadata } from "next";
import Link from "next/link";
import PremiumActionButton from "@/components/PremiumActionButton";
import TGPIEditorialVisual, {
  type TGPIVisualVariant,
} from "@/components/TGPIEditorialVisual";

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

const countryOptions: Array<{
  name: string;
  variant: TGPIVisualVariant;
  bestFor: string;
  pressure: string;
  signal: string;
  href: string;
}> = [
  {
    name: "England",
    variant: "england",
    bestFor: "Education and global career",
    pressure: "High cost and competition",
    signal: "Academic leverage",
    href: "/countries/united-kingdom",
  },
  {
    name: "Portugal",
    variant: "portugal",
    bestFor: "European access and adaptation",
    pressure: "Income-to-rent balance",
    signal: "Lifestyle fit",
    href: "/countries/portugal",
  },
  {
    name: "Canada",
    variant: "canada",
    bestFor: "Career and education pathways",
    pressure: "Housing and entry planning",
    signal: "Mobility path",
    href: "/countries/canada",
  },
];

const services: Array<{
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  action: string;
  variant: TGPIVisualVariant;
}> = [
  {
    eyebrow: "Country Intelligence",
    title: "Compare places through the same strategic lens.",
    description:
      "Cost, safety, language, lifestyle, career, education and adaptation signals organized for clearer decisions.",
    href: "/countries",
    action: "Explore countries",
    variant: "england",
  },
  {
    eyebrow: "Global Readiness",
    title: "Understand what must be prepared before the move.",
    description:
      "Connect budget, language, documents, mobility, professional fit and timeline in one readiness system.",
    href: "/passport",
    action: "Build readiness",
    variant: "readiness",
  },
  {
    eyebrow: "Practical Learning",
    title: "Develop capabilities for international life.",
    description:
      "Learn country strategy, cost intelligence, language leverage, adaptation and execution through practical paths.",
    href: "/courses",
    action: "Explore learning",
    variant: "learning",
  },
  {
    eyebrow: "Global Documents",
    title: "Prepare official documents with more clarity.",
    description:
      "Document organization, sworn translation pathways and international preparation through a trusted service layer.",
    href: "/premium-waitlist",
    action: "Register interest",
    variant: "documents",
  },
];

const readinessSignals = [
  ["Language", "Communication and integration"],
  ["Career", "Income and professional fit"],
  ["Documents", "Official preparation"],
  ["Budget", "Real monthly capacity"],
  ["Mobility", "Entry and movement options"],
  ["Timeline", "Sequence and execution"],
] as const;

const intelligenceStories: Array<{
  category: string;
  title: string;
  description: string;
  variant: TGPIVisualVariant;
  href: string;
}> = [
  {
    category: "Country intelligence",
    title: "England Is More Than London",
    description: "Education, cities, culture and opportunity beyond the capital.",
    variant: "england",
    href: "/countries/united-kingdom",
  },
  {
    category: "Decision comparison",
    title: "Portugal or Spain?",
    description: "Compare language, cost, lifestyle and professional fit.",
    variant: "spain",
    href: "/compare",
  },
  {
    category: "Global perspective",
    title: "Egypt Is More Than Ancient History",
    description: "A modern society, strategic location and complex life decision.",
    variant: "egypt",
    href: "/countries/egypt",
  },
];

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
      <section className="relative px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_5%,rgba(181,138,42,0.16),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(11,31,58,0.12),transparent_30%),linear-gradient(180deg,#FFFDF8_0%,#F8F5EE_72%,#F1EBDD_100%)]" />

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_45px_120px_rgba(11,31,58,0.13)]">
          <div className="grid min-h-[720px] lg:grid-cols-[0.94fr_1.06fr]">
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

            <div className="relative min-h-[570px] lg:min-h-full">
              <TGPIEditorialVisual
                variant="hero"
                id="home-hero"
                ariaLabel="Authorial TGPI illustration of global education, mobility and strategic decision-making"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,58,0.02),rgba(11,31,58,0.52))]" />
              <div className="absolute inset-x-6 bottom-6 grid gap-3 sm:grid-cols-2 lg:inset-x-8 lg:bottom-8">
                {[
                  ["Country Fit", "84%", "Cost · Language · Mobility"],
                  ["Global Readiness", "67%", "Budget · Skills · Timeline"],
                  ["Decision Scope", "3 countries", "Portugal · Spain · England"],
                  ["Next Step", "Compare", "Turn interest into evidence"],
                ].map(([label, value, note]) => (
                  <div
                    key={label}
                    className="rounded-[22px] border border-white/25 bg-[#FFFDF8]/93 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl"
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
              ["0", "Charges while early access is active"],
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
          eyebrow="A complete international platform"
          title="One brand. Four connected service layers."
          description="TGPI helps people understand countries, prepare themselves, build practical knowledge and organize the documents required for international life."
        />

        <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-[32px] border border-[#D8D2C4] bg-white shadow-[0_24px_70px_rgba(11,31,58,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_90px_rgba(11,31,58,0.14)]"
            >
              <TGPIEditorialVisual
                variant={service.variant}
                id={`service-${index}`}
                ariaLabel={`${service.eyebrow} authorial TGPI illustration`}
                className="aspect-[16/9] w-full"
              />
              <div className="p-7 md:p-8">
                <Eyebrow>{service.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#0B1F3A] md:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#566070]">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex text-sm font-black text-[#0B1F3A] transition group-hover:text-[#B58A2A]"
                >
                  {service.action} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Country decisions"
          title="The world is not one-size-fits-all."
          description="A strong destination is not simply famous or affordable. It must fit your income, language, career, timing and preferred way of life."
        />

        <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
          {countryOptions.map((country, index) => (
            <Link
              href={country.href}
              key={country.name}
              className="group overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-white shadow-[0_24px_70px_rgba(11,31,58,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(11,31,58,0.14)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <TGPIEditorialVisual
                  variant={country.variant}
                  id={`country-card-${index}`}
                  ariaLabel={`${country.name} authorial TGPI country intelligence illustration`}
                  className="h-full w-full transition duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/78 via-transparent to-transparent" />
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
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 overflow-hidden rounded-[42px] bg-[#0B1F3A] p-7 shadow-[0_42px_110px_rgba(11,31,58,0.22)] md:p-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <TGPIEditorialVisual
            variant="compare"
            id="home-comparison"
            ariaLabel="TGPI authorial country comparison dashboard illustration"
            className="min-h-[520px] rounded-[32px] border border-white/15 shadow-[0_28px_80px_rgba(0,0,0,0.28)]"
          />

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
          <TGPIEditorialVisual
            variant="readiness"
            id="home-readiness"
            ariaLabel="TGPI authorial international readiness planning illustration"
            className="min-h-[600px] rounded-[38px] border border-[#D8D2C4] shadow-[0_32px_90px_rgba(11,31,58,0.13)]"
          />

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
          <TGPIEditorialVisual
            variant="documents"
            id="home-documents"
            ariaLabel="TGPI authorial global document preparation illustration"
            className="min-h-[540px]"
          />

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
              {[
                ["01", "Country Decision-Making", "Filter destinations through evidence and trade-offs."],
                ["02", "Cost of Living Intelligence", "Understand rent, income, transport and savings capacity."],
                ["03", "Language as Mobility", "Use language as infrastructure for work and integration."],
                ["04", "First 90 Days Abroad", "Prepare the practical sequence after arrival."],
              ].map(([number, title, description]) => (
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

          <TGPIEditorialVisual
            variant="learning"
            id="home-learning"
            ariaLabel="TGPI authorial practical global education illustration"
            className="min-h-[620px] rounded-[38px] border border-[#D8D2C4] shadow-[0_32px_90px_rgba(11,31,58,0.13)]"
          />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Editorial intelligence"
          title="See countries as decisions, not dreams."
          description="TGPI content introduces the questions behind real international choices and connects each insight to the platform."
        />

        <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
          {intelligenceStories.map((story, index) => (
            <Link
              key={story.title}
              href={story.href}
              className="group overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-white shadow-[0_24px_70px_rgba(11,31,58,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(11,31,58,0.14)]"
            >
              <TGPIEditorialVisual
                variant={story.variant}
                id={`story-${index}`}
                ariaLabel={`${story.title} authorial TGPI editorial illustration`}
                className="aspect-[16/10] w-full transition duration-700 group-hover:scale-[1.025]"
              />
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

          <TGPIEditorialVisual
            variant="premium"
            id="home-premium"
            ariaLabel="TGPI authorial premium decision dashboard illustration"
            className="min-h-[560px] rounded-[32px] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.28)]"
          />
        </div>
      </section>

      <section className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_38px_110px_rgba(11,31,58,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center bg-[#0B1F3A] p-8 text-white md:p-14">
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
              <Link href="/pricing" className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-center text-sm font-black text-white transition hover:bg-white/15">
                Explore Membership
              </Link>
            </div>
          </div>

          <TGPIEditorialVisual
            variant="hero"
            id="home-final"
            ariaLabel="TGPI authorial final global strategy illustration"
            className="min-h-[520px]"
          />
        </div>
      </section>
    </main>
  );
}
