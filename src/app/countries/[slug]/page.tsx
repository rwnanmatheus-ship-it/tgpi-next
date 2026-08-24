// src/app/countries/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import DocumentReviewChecklist from "@/components/activation/DocumentReviewChecklist";
import MonthlyCostPlanner from "@/components/activation/MonthlyCostPlanner";
import SavedCountryButton from "@/components/activation/SavedCountryButton";
import {
  formatCurrencyAmount,
  getAllCountrySlugs,
  getCountry,
  getCountryCostLabel,
  getCountryDecisionLabel,
  getCountryGoalLabel,
  getCountryImageAlt,
  getCountryImageUrl,
  getCountryPrimaryDecision,
  getCountryRiskLabel,
  getRelatedCountries,
  hasVerifiedCountryImage,
  type Country,
} from "@/lib/countries";

type CountryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ActionItem = {
  title: string;
  text: string;
};

export function generateStaticParams() {
  return getAllCountrySlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = getCountry(slug);

  if (!country) {
    return {
      title: "Country not found | TGPI",
    };
  }

  const imageUrl = getCountryImageUrl(country);
  const imageAlt = getCountryImageAlt(country);
  const title = `${country.name} Country Guide | TGPI`;
  const description = `${country.name} country guide: compare cost of living, safety, language, culture and documents for travel, study, work or relocation with TGPI.`;
  const canonicalUrl = `/countries/${country.slug}`;

  return {
    title,
    description,
    keywords: [
      country.name,
      `${country.name} country guide`,
      `${country.name} cost of living`,
      `${country.name} travel`,
      `${country.name} study abroad`,
      `${country.name} work abroad`,
      `${country.name} relocation`,
      country.capital,
      country.language,
      country.currencyCode,
      "TGPI country intelligence",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    category: "International education and country intelligence",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "TGPI",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 900,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = getCountry(slug);

  if (!country) notFound();

  const relatedCountries = getRelatedCountries(country, 3);
  const imageUrl = getCountryImageUrl(country);
  const imageAlt = getCountryImageAlt(country);
  const hasImage = hasVerifiedCountryImage(country);

  const budget = `${formatCurrencyAmount(
    country,
    country.intelligence.averageMonthlyBudget,
  )} ${country.currencyCode}`;

  const scoreSignals = [
    {
      label: "TGPI score",
      value: country.tgpiScore,
      description: getCountryDecisionLabel(country),
    },
    {
      label: "Quality of life",
      value: country.intelligence.qualityOfLifeScore,
      description: "Lifestyle, infrastructure and daily-life signal.",
    },
    {
      label: "Safety",
      value: country.intelligence.safetyScore,
      description: "Risk awareness and general stability signal.",
    },
    {
      label: "English access",
      value: country.intelligence.englishFriendliness,
      description: "Ease of navigation for English speakers.",
    },
  ];

  const snapshot = [
    { label: "Region", value: country.region },
    { label: "Capital", value: country.capital },
    { label: "Language", value: country.language },
    { label: "Currency", value: country.currency },
    { label: "Cost profile", value: getCountryCostLabel(country) },
    { label: "Adaptation", value: getCountryRiskLabel(country) },
  ];

  const countryPlan = getCountryActionPlan(country);
  const canonicalUrl = `https://theglobalpolymath.com/countries/${country.slug}`;
  const absoluteImageUrl = `https://theglobalpolymath.com${imageUrl}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${country.name}: Country Intelligence Report`,
        description: country.longDescription,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://theglobalpolymath.com/#website",
          name: "TGPI",
          url: "https://theglobalpolymath.com",
        },
        about: { "@id": `${canonicalUrl}#country` },
        primaryImageOfPage: { "@id": `${canonicalUrl}#hero-image` },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      },
      {
        "@type": "Country",
        "@id": `${canonicalUrl}#country`,
        name: country.name,
        description: country.intelligence.summary,
        containedInPlace: {
          "@type": "Place",
          name: country.region,
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Capital", value: country.capital },
          { "@type": "PropertyValue", name: "Language", value: country.language },
          { "@type": "PropertyValue", name: "Currency", value: country.currency },
          { "@type": "PropertyValue", name: "TGPI score", value: country.tgpiScore },
        ],
      },
      {
        "@type": "ImageObject",
        "@id": `${canonicalUrl}#hero-image`,
        contentUrl: absoluteImageUrl,
        url: absoluteImageUrl,
        width: 1600,
        height: 900,
        caption: imageAlt,
        representativeOfPage: true,
        creditText: "TGPI Cinematic Country Series",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Countries",
            item: "https://theglobalpolymath.com/countries",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: country.name,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <ActivationProgressProvider>
    <main className="min-h-screen bg-[#F6F1E7] text-[#071A32]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <Link
            href="/countries"
            className="inline-flex w-fit rounded-full border border-[#D8D0C0] bg-white px-4 py-2 text-sm font-bold text-[#102D50] shadow-sm transition hover:border-[#C59632] hover:bg-[#FFF9EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59632]"
          >
            ← Back to countries
          </Link>

          <div className="flex flex-wrap gap-2">
            <SavedCountryButton
              countryName={country.name}
              countrySlug={country.slug}
            />
            <Link
              href={`/compare?country=${country.slug}`}
              className="rounded-full border border-[#B8C9DF] bg-[#EEF5FF] px-4 py-2 text-sm font-bold text-[#123A6F] transition hover:border-[#315F98] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315F98]"
            >
              Compare country
            </Link>
            <Link
              href="/ranking"
              className="rounded-full border border-[#D9BD70] bg-[#FFF7DE] px-4 py-2 text-sm font-bold text-[#765009] transition hover:border-[#C59632] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59632]"
            >
              View rankings
            </Link>
          </div>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-[#D0B264]/70 bg-[#071A32] shadow-[0_30px_90px_rgba(7,26,50,0.22)]">
          <div className="relative grid min-h-[620px] lg:grid-cols-[1.08fr_0.92fr]">
            {hasImage ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-cover saturate-[1.08] contrast-[1.04]"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.22),transparent_36%),linear-gradient(135deg,#111118,#07111F_45%,#050505)]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-[#041426]/98 via-[#041426]/78 to-[#041426]/16" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041426]/72 via-transparent to-[#041426]/12" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.12),transparent_36%)]" />

            <div className="relative flex flex-col justify-end p-6 text-white md:p-10 lg:justify-center lg:p-12">
              <div className="mb-5 inline-flex w-fit rounded-full border border-[#F0D58C]/45 bg-[#071A32]/55 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#F7E8B9] backdrop-blur-xl">
                TGPI Country Intelligence Report
              </div>

              <div className="flex items-start gap-5">
                <span className="text-6xl drop-shadow-2xl md:text-8xl">
                  {country.emoji}
                </span>

                <div className="min-w-0">
                  <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
                    {country.name}
                  </h1>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-200 drop-shadow">
                    {country.region} • {country.capital}
                  </p>
                </div>
              </div>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-100 drop-shadow-lg">
                {country.longDescription}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <SignalCard label="Main goal" value={country.mainGoal} />
                <SignalCard label="Monthly budget" value={budget} />
                <SignalCard label="Currency" value={country.currencyCode} />
              </div>
            </div>

            <div className="relative flex flex-col justify-center border-t border-white/20 bg-white/[0.12] p-6 backdrop-blur-sm lg:border-l lg:border-t-0 md:p-10">
              <div className="rounded-[1.75rem] border border-white/70 bg-[rgba(255,253,248,0.94)] p-6 shadow-[0_24px_70px_rgba(4,20,38,0.28)] backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8A641F]">
                  TGPI Verdict
                </p>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-6xl font-black text-[#C59632]">
                      {country.tgpiScore}
                    </p>
                    <p className="mt-2 text-lg font-black text-[#071A32]">
                      {getCountryDecisionLabel(country)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#D8D0C0] bg-[#F8F4EB] px-4 py-3 text-right">
                    <p className="text-xs font-semibold text-[#5E6875]">Adaptation</p>
                    <p className="mt-1 font-black text-[#071A32]">
                      {country.difficulty}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-[#465366]">
                  {country.intelligence.summary}
                </p>
              </div>

              <div className="mt-4 grid gap-3">
                {scoreSignals.slice(1).map((signal) => (
                  <ScoreBar
                    key={signal.label}
                    label={signal.label}
                    value={signal.value}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[1.5rem] border border-[#D8D0C0] bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,26,50,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A641F]">
              Country snapshot
            </p>
            <h2 className="mt-2 text-2xl font-black">Core facts</h2>

            <div className="mt-6 space-y-3">
              {snapshot.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#E7E0D3] bg-[#FBF8F1] p-4"
                >
                  <p className="text-xs font-semibold text-[#5E6875]">{item.label}</p>
                  <p className="mt-1 text-sm font-black text-[#071A32]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#D8D0C0] bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,26,50,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A641F]">
              Score breakdown
            </p>
            <h2 className="mt-2 text-2xl font-black">Decision signals</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {scoreSignals.map((signal) => (
                <ScorePanel
                  key={signal.label}
                  label={signal.label}
                  value={signal.value}
                  description={signal.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="cost-of-living"
          className="mt-8 scroll-mt-28 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="rounded-[1.5rem] border border-[#D8D0C0] bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,26,50,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A641F]">
              Cost intelligence
            </p>
            <h2 className="mt-2 text-2xl font-black">Cost of life</h2>

            <p className="mt-2 text-sm leading-6 text-[#5E6875]">
              Local estimates in {country.currencyCode}. Values are educational
              and should be validated before financial decisions.
            </p>

            <div className="mt-6 space-y-4">
              {country.costOfLife.map((item) => (
                <CostRow
                  key={item.label}
                  label={item.label}
                  value={`${formatCurrencyAmount(country, item.amount)} ${
                    country.currencyCode
                  }`}
                  percentage={getCostPercentage(
                    item.amount,
                    country.intelligence.averageMonthlyBudget,
                  )}
                />
              ))}
            </div>

            <MonthlyCostPlanner
              baseline={country.intelligence.averageMonthlyBudget}
              countryName={country.name}
              countrySlug={country.slug}
              currency={country.currencyCode}
            />
          </div>

          <div className="grid gap-6">
            <InsightGrid
              title="Strengths"
              items={country.intelligence.strengths}
              tone="positive"
            />

            <InsightGrid
              title="Warnings"
              items={country.intelligence.warnings}
              tone="warning"
            />
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <DecisionFitPanel
            title={`Who should choose ${country.name}`}
            items={countryPlan.choose}
            tone="positive"
          />

          <DecisionFitPanel
            title={`Who should avoid ${country.name}`}
            items={countryPlan.avoid}
            tone="warning"
          />
        </section>

        <section
          id="documents-to-verify"
          className="mt-8 scroll-mt-28 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <ActionChecklist
            title="First 30 days checklist"
            subtitle={`A practical first layer for researching ${country.name}.`}
            items={countryPlan.firstThirtyDays}
          />

          <DocumentReviewChecklist
            countryName={country.name}
            countrySlug={country.slug}
            items={countryPlan.documents}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ActionChecklist
            title="Cities to research"
            subtitle="Start with these city categories before choosing a final destination."
            items={countryPlan.cities}
          />

          <ActionChecklist
            title="Decision questions"
            subtitle="Use these questions before treating this country as a serious option."
            items={countryPlan.questions}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <InsightGrid
            title="Best for"
            items={country.intelligence.bestFor}
            tone="blue"
          />

          <div className="rounded-[1.5rem] border border-[#D8D0C0] bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,26,50,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A641F]">
              Fit profile
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Ideal goals and tags
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {country.idealFor.map((goal) => (
                <Badge key={goal}>{getCountryGoalLabel(goal)}</Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {country.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D8D0C0] bg-[#FBF8F1] px-3 py-1 text-xs font-semibold text-[#465366]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#B8C9DF] bg-[#EEF5FF] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#315F98]">
                TGPI Decision Rule
              </p>
              <p className="mt-2 text-sm leading-7 text-[#334A64]">
                Do not choose {country.name} because it looks attractive. Choose
                it only if cost, language, safety, adaptation and long-term
                direction match your current profile.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-[#D8D0C0] bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,26,50,0.08)]">
          <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A641F]">
                Related countries
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Compare similar strategic environments.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#5E6875]">
                {getCountryPrimaryDecision(country)}
              </p>
            </div>

            <div className="grid gap-3">
              {relatedCountries.map((related) => (
                <RelatedCountryCard key={related.slug} country={related} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-[#D9BD70] bg-[#FFF7DE] p-6 shadow-[0_18px_55px_rgba(138,100,31,0.1)]">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#765009]">
                Strategic next step
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Compare {country.name} before making a decision.
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#465366]">
                A country profile gives context. A comparison reveals trade-offs.
                Use TGPI to compare this country against another destination by
                cost, safety, language and strategic fit.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href={`/compare?country=${country.slug}`}
                className="rounded-2xl bg-[#071A32] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#123A6F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315F98]"
              >
                Compare now
              </Link>

              <Link
                href="/countries"
                className="rounded-2xl border border-[#B99132] bg-white/65 px-5 py-3 text-center text-sm font-black text-[#765009] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59632]"
              >
                Explore more countries
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-[#D8D0C0] bg-[#ECE6DA] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#465366]">
            Data note
          </p>
          <p className="mt-2 text-sm leading-7 text-[#5E6875]">
            TGPI country intelligence is educational and strategic. Cost, safety,
            immigration, tax, salary and local conditions vary by city, source
            and time. Validate official sources before legal, financial or
            relocation decisions.
          </p>
        </section>
      </section>
    </main>
    </ActivationProgressProvider>
  );
}

function getCostPercentage(amount: number, total: number) {
  if (!total || total <= 0) return 0;
  return Math.min(Math.max(Math.round((amount / total) * 100), 4), 100);
}

function getCountryActionPlan(country: Country) {
  const safetyText =
    country.intelligence.safetyScore >= 80
      ? "You want a stronger safety baseline and lower daily-life uncertainty."
      : "You are comfortable validating safety carefully by city, neighborhood and routine.";

  const englishText =
    country.intelligence.englishFriendliness >= 70
      ? "You need easier English access while adapting locally."
      : "You are willing to learn the local language and operate with more friction.";

  const costText =
    country.costLevel === "low"
      ? "You are looking for lower cost pressure and more financial flexibility."
      : country.costLevel === "medium"
        ? "You want a balanced cost profile instead of the cheapest possible destination."
        : "You can handle a premium cost profile and want stronger infrastructure or global access.";

  return {
    choose: [
      {
        title: "Your goal matches the environment",
        text: `${country.name} is strongest when your main objective aligns with: ${country.mainGoal}.`,
      },
      {
        title: "The cost profile fits your planning",
        text: costText,
      },
      {
        title: "The adaptation level is realistic",
        text: getCountryRiskLabel(country),
      },
      {
        title: "The safety-language trade-off makes sense",
        text: `${safetyText} ${englishText}`,
      },
    ],
    avoid: [
      {
        title: "You have not validated legal requirements",
        text: "Do not rely on general content. Check visa, residence, tax and work authorization rules through official sources.",
      },
      {
        title: "You are choosing based on aesthetics",
        text: `${country.name} should be evaluated as a system: cost, safety, language, opportunities, documents and daily routine.`,
      },
      {
        title: "Your budget has no margin",
        text: `Estimated monthly budget is ${formatCurrencyAmount(
          country,
          country.intelligence.averageMonthlyBudget,
        )} ${country.currencyCode}. Add emergency margin before planning.`,
      },
      {
        title: "You are ignoring local language reality",
        text: `Primary language signal: ${country.language}. English friendliness is ${country.intelligence.englishFriendliness}/100.`,
      },
    ],
    firstThirtyDays: [
      {
        title: "Map the first city",
        text: `Start with ${country.capital}, then compare at least two alternative cities before deciding.`,
      },
      {
        title: "Validate monthly budget",
        text: `Use the TGPI estimate of ${formatCurrencyAmount(
          country,
          country.intelligence.averageMonthlyBudget,
        )} ${country.currencyCode} as a baseline, then validate housing, food, transport and insurance.`,
      },
      {
        title: "Check safety by neighborhood",
        text: "Do not use only national averages. Validate safety around housing, transport, nightlife and commute routes.",
      },
      {
        title: "Create a language plan",
        text: `Prepare basic local-language survival ability for ${country.language}, even if English works in some contexts.`,
      },
      {
        title: "Compare against alternatives",
        text: `Compare ${country.name} with at least two related countries before making a final decision.`,
      },
    ],
    documents: [
      {
        title: "Passport validity",
        text: "Check passport expiration rules, blank page requirements and entry conditions.",
      },
      {
        title: "Visa or residence route",
        text: "Validate the correct visa path for study, work, travel, business or relocation.",
      },
      {
        title: "Proof of funds",
        text: "Check whether bank statements, income proof or sponsor documents are required.",
      },
      {
        title: "Health insurance",
        text: "Confirm whether local, travel or international health coverage is required.",
      },
      {
        title: "Tax and work rules",
        text: "Verify whether remote work, employment, study or business activity is legally allowed.",
      },
    ],
    cities: [
      {
        title: country.capital,
        text: "Start with the capital for infrastructure, services, institutions and official access.",
      },
      {
        title: "Lower-cost city",
        text: "Research at least one smaller city with lower rent and calmer adaptation pressure.",
      },
      {
        title: "Opportunity city",
        text: "Identify where jobs, universities, communities or global networks are concentrated.",
      },
      {
        title: "Lifestyle city",
        text: "Compare climate, mobility, safety, housing and daily rhythm before choosing.",
      },
    ],
    questions: [
      {
        title: "Can I legally stay there for my goal?",
        text: "Your goal must match an official path: study, work, travel, residence or business.",
      },
      {
        title: "Can I afford three months there?",
        text: "Budget decisions should include emergency reserve, deposit, transport and unexpected costs.",
      },
      {
        title: "Can I function without full English access?",
        text: "Language determines housing, paperwork, social life, work options and confidence.",
      },
      {
        title: "Is this country a step or the final destination?",
        text: "Some countries are ideal as a first international step. Others require more preparation.",
      },
    ],
  } satisfies Record<string, ActionItem[]>;
}

type SignalCardProps = {
  label: string;
  value: string;
};

function SignalCard({ label, value }: SignalCardProps) {
  return (
    <div className="rounded-2xl border border-white/15 bg-[#05080F]/82 p-4 backdrop-blur">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 truncate font-black text-white">{value}</p>
    </div>
  );
}

type ScoreBarProps = {
  label: string;
  value: number;
};

function ScoreBar({ label, value }: ScoreBarProps) {
  return (
    <div className="rounded-2xl border border-white/70 bg-[rgba(255,253,248,0.94)] p-4 shadow-lg backdrop-blur">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#071A32]">{label}</p>
        <p className="text-sm font-black text-[#8A641F]">{value}/100</p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#E7E0D3]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C59632] to-[#315F98]"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

type ScorePanelProps = {
  label: string;
  value: number;
  description: string;
};

function ScorePanel({ label, value, description }: ScorePanelProps) {
  return (
    <div className="rounded-2xl border border-[#E7E0D3] bg-[#FBF8F1] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-black text-[#071A32]">{label}</p>
          <p className="mt-2 text-sm leading-6 text-[#5E6875]">
            {description}
          </p>
        </div>

        <p className="shrink-0 text-2xl font-black text-[#8A641F]">
          {value}
        </p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E7E0D3]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C59632] to-[#315F98]"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

type CostRowProps = {
  label: string;
  value: string;
  percentage: number;
};

function CostRow({ label, value, percentage }: CostRowProps) {
  return (
    <div className="rounded-2xl border border-[#E7E0D3] bg-[#FBF8F1] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-[#465366]">{label}</p>
        <p className="text-sm font-black text-[#071A32]">{value}</p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E7E0D3]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C59632] to-[#315F98]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

type BadgeProps = {
  children: React.ReactNode;
};

function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded-full border border-[#D9BD70] bg-[#FFF7DE] px-3 py-1 text-xs font-semibold text-[#765009]">
      {children}
    </span>
  );
}

type InsightGridProps = {
  title: string;
  items: string[];
  tone: "positive" | "warning" | "blue";
};

function InsightGrid({ title, items, tone }: InsightGridProps) {
  const toneClass =
    tone === "warning"
      ? "border-[#E7B8B0] bg-[#FFF1EF]"
      : tone === "blue"
        ? "border-[#B8C9DF] bg-[#EEF5FF]"
        : "border-[#D9BD70] bg-[#FFF7DE]";

  return (
    <div className={`rounded-[1.5rem] border p-6 ${toneClass}`}>
      <h2 className="text-2xl font-black text-[#071A32]">{title}</h2>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/80 bg-white/75 p-4 text-sm leading-6 text-[#465366] shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

type DecisionFitPanelProps = {
  title: string;
  items: ActionItem[];
  tone: "positive" | "warning";
};

function DecisionFitPanel({ title, items, tone }: DecisionFitPanelProps) {
  const toneClass =
    tone === "warning"
      ? "border-[#E7B8B0] bg-[#FFF1EF]"
      : "border-[#D9BD70] bg-[#FFF7DE]";

  return (
    <div className={`rounded-[1.5rem] border p-6 ${toneClass}`}>
      <h2 className="text-2xl font-black text-[#071A32]">{title}</h2>

      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <ActionItemCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

type ActionChecklistProps = {
  title: string;
  subtitle: string;
  items: ActionItem[];
};

function ActionChecklist({ title, subtitle, items }: ActionChecklistProps) {
  return (
    <div className="rounded-[1.5rem] border border-[#D8D0C0] bg-white/90 p-6 shadow-[0_18px_55px_rgba(7,26,50,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A641F]">
        Action layer
      </p>
      <h2 className="mt-2 text-2xl font-black text-[#071A32]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#5E6875]">{subtitle}</p>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="grid gap-3 rounded-2xl border border-[#E7E0D3] bg-[#FBF8F1] p-4 sm:grid-cols-[auto_1fr]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9BD70] bg-[#FFF7DE] text-xs font-black text-[#765009]">
              {index + 1}
            </div>

            <div>
              <p className="font-black text-[#071A32]">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-[#5E6875]">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type ActionItemCardProps = {
  item: ActionItem;
};

function ActionItemCard({ item }: ActionItemCardProps) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm">
      <p className="font-black text-[#071A32]">{item.title}</p>
      <p className="mt-1 text-sm leading-6 text-[#5E6875]">{item.text}</p>
    </div>
  );
}

type RelatedCountryCardProps = {
  country: Country;
};

function RelatedCountryCard({ country }: RelatedCountryCardProps) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-[#E7E0D3] bg-[#FBF8F1] p-4 transition hover:border-[#C59632] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59632]"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="text-3xl">{country.emoji}</span>

        <div className="min-w-0">
          <p className="truncate font-black text-[#071A32]">{country.name}</p>
          <p className="mt-1 truncate text-xs text-[#5E6875]">
            {country.region} • {country.capital}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-xs text-[#5E6875]">TGPI</p>
        <p className="text-lg font-black text-[#8A641F]">
          {country.tgpiScore}
        </p>
      </div>
    </Link>
  );
}
