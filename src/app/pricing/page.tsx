import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PremiumActionButton from "@/components/PremiumActionButton";
import PricingOutcomeSelector from "@/components/pricing/PricingOutcomeSelector";
import TGPIPageShell from "@/components/TGPIPageShell";
import { TGPI_FREE_PLAN, TGPI_PREMIUM_PLAN } from "@/lib/subscription-plans";
import { LocalizedText } from "@/components/localization/LocaleProvider";


export const metadata: Metadata = {
  title: "TGPI Premium — Choose your country. Build your plan.",
  description:
    "Country research, personal planning and a protected Premium Command Center. TGPI Premium: US$ 19.90/month. Subscribe securely or access your membership.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "TGPI Premium — Your global next step, connected.",
    description:
      "Choose with evidence. Compare your options. Prepare your next move.",
    url: "/pricing",
    images: [
      {
        url: "/images/cinematic-2026/premium-library-1600.webp",
        width: 1536,
        height: 1024,
        alt: "TGPI global education and international decision intelligence",
      },
    ],
  },
};

const systems = [
  {
    number: "01",
    label: "COUNTRY FIT",
    title: "Find where you fit.",
    description:
      "Evaluate destinations around your priorities, budget and international goals. Build a shortlist you can explain.",
    href: "/country-fit",
    action: "Explore Country Fit",
  },
  {
    number: "02",
    label: "COMPARE",
    title: "See the trade-offs.",
    description:
      "Compare countries in one consistent framework. Save your decisions and return to the evidence behind them.",
    href: "/compare",
    action: "Explore comparisons",
  },
  {
    number: "03",
    label: "PERSONAL PLAN",
    title: "Know your next step.",
    description:
      "Connect readiness, destination documents and personal goals in a private workspace. Turn research into preparation.",
    href: "/plan",
    action: "Explore personal planning",
  },
  {
    number: "04",
    label: "LEARNING",
    title: "Build your capability.",
    description:
      "Develop practical international skills. Track learning progress and keep your TGPI completion records connected to your profile.",
    href: "/courses",
    action: "Explore learning",
  },
] as const;

const comparisons = [
  ["Scenario analysis", "Saved worksheets and individual reports", "Cross-scenario comparison and JSON export"],
  ["Country Fit research planning", "Available", "Available"],
  ["Country comparisons", "Up to 3 countries at a time", "Up to 3 countries at a time"],
  ["Countries of interest", "Up to 5", "Up to 5"],
  ["Documents", "Member preparation tools", "Member preparation tools"],
  ["Current courses", "Learning and progress with an account", "Learning and progress with an account"],
  ["Workspace", "Personal Workspace", "Personal Workspace + protected Premium Command Center"],
] as const;

const faqs = [
  [
    "What happens after I subscribe?",
    "After Stripe confirms your subscription, TGPI verifies the payment and activates Premium on your account. Your Premium Command Center connects country decisions, readiness and learning. If confirmation is still processing, the confirmation page shows the current status.",
  ],
  [
    "Can I cancel my subscription?",
    "Yes. Use Manage subscription to open the secure Stripe customer portal, update your payment method, view invoices or cancel. When cancellation is scheduled for the end of the billing period, your account shows the date through which access remains available.",
  ],
  [
    "How does billing work?",
    "TGPI Premium costs US$ 19.90 per month and renews monthly until cancelled. Stripe Checkout displays the payment amount and recurring terms before you confirm. Your bank may apply currency conversion or other fees.",
  ],
  [
    "I already have Premium. Do I need to pay again?",
    "No. Sign in with the account used for your subscription. This page checks your membership and shows Open Premium workspace when access is active. Billing management is a separate action.",
  ],
  [
    "Does TGPI guarantee a visa, admission or a job?",
    "No. TGPI supports research, education and preparation. Verify official requirements with the relevant authorities and consult qualified professionals when needed.",
  ],
  [
    "Are TGPI certificates externally accredited?",
    "TGPI records learning completion and evidence. TGPI certificates are not academic degrees, professional licences or a claim of external accreditation.",
  ],
] as const;

const eyebrow =
  "text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#956A13]";
const heading =
  "font-[var(--tgpi-font-display)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--tgpi-navy-raised)]";

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);

  const billingEnabled = process.env.BILLING_ENABLED === "true";
  const { canceled } = await searchParams;

  return (
    <TGPIPageShell>
      <div className="pb-8">
        {canceled === "1" && (
          <p
            role="status"
            className="mb-5 rounded-2xl border border-[var(--tgpi-border)] bg-white p-4 text-sm text-[var(--tgpi-navy-raised)]"
          ><LocalizedText text={"Checkout was closed. You can review the membership and try again when you are ready."} /></p>
        )}
        <section
          className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-10"
          aria-labelledby="premium-title"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/tgpi-crest-metal-v3-256.png"
                alt={t("TGPI crest")}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className={eyebrow}>The Global Polymath Institute</p>
                <p className="mt-1 text-xs font-semibold text-[var(--tgpi-navy-raised)]"><LocalizedText text={"Data · Education · Mobility · Decision"} /></p>
              </div>
            </div>
            <p className={`${eyebrow} mt-8`}><LocalizedText text={"TGPI Premium / Global decision intelligence"} /></p>
            <h1
              id="premium-title"
              className={`${heading} mt-4 max-w-2xl text-[clamp(2.8rem,5.6vw,5.4rem)]`}
            ><LocalizedText text={"Choose your country."} /><br />
              <span className="text-[#956A13]"><LocalizedText text={"Build your plan."} /></span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#596576]"><LocalizedText text={"Your next chapter deserves more than scattered research. Connect Country Fit, comparisons and personal preparation in one Premium workspace."} /></p>
            <a
              href="#membership"
              className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-[var(--tgpi-navy-raised)] underline decoration-[var(--tgpi-gold-hover)] underline-offset-8"
            ><LocalizedText text={"View membership options"} />{" "}<span aria-hidden="true">↓</span>
            </a>
            <div className="mt-4"><Link href="/premium/demo" className="inline-flex min-h-11 items-center rounded-xl border border-[var(--tgpi-gold-hover)] px-4 py-2 text-sm font-bold text-[var(--tgpi-navy-raised)]"><LocalizedText text="Try the scenario comparison" /> ↗</Link></div>
            <div className="relative mt-6 hidden aspect-[3/2] lg:block overflow-hidden rounded-[24px] bg-[var(--tgpi-navy-raised)]">
              <Image
                src="/images/cinematic-2026/premium-library-1600.webp"
                alt={t("International research library overlooking a waterfront city, with a brass globe and warm academic lighting")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06162A]/95 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 font-[var(--tgpi-font-display)] text-2xl font-semibold text-white sm:text-3xl"><LocalizedText text={"A global life. A clearer decision."} /></p>
            </div>
          </div>
          <aside
            id="membership"
            className="scroll-mt-28 overflow-hidden rounded-[28px] border border-[var(--tgpi-gold-hover)]/40 bg-[var(--tgpi-navy-raised)] text-white shadow-[0_24px_70px_rgba(11,31,58,0.16)] lg:sticky lg:top-28"
            aria-label={t("Premium membership")}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/15 px-6 py-4 sm:px-8">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]"><LocalizedText text={"One complete membership"} /></span>
              <span className="text-xs text-white/80"><LocalizedText text={"Monthly"} /></span>
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="font-[var(--tgpi-font-display)] text-4xl font-semibold">
                {TGPI_PREMIUM_PLAN.name}
              </h2>
              <div className="mt-5 flex flex-wrap items-baseline gap-2">
                <span className="text-[clamp(2.8rem,5vw,3.8rem)] font-extrabold tracking-[-0.05em]">
                  {TGPI_PREMIUM_PLAN.price}
                </span>
                <span className="text-sm text-white/80"><LocalizedText text={"/ month"} /></span>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/80"><LocalizedText text={"Billed in USD. Renews monthly until cancelled."} /></p>
              <div className="mt-6">
                <PremiumActionButton
                  billingEnabled={billingEnabled}
                  showMembershipStatus
                />
              </div>
              <p className="mt-4 text-center text-xs leading-6 text-white/80">
                {billingEnabled
                  ? <LocalizedText text={"Secure payment through Stripe. Cancel online."} />
                  : <LocalizedText text={"Payments are temporarily unavailable. Join the early-access list."} />}
              </p>
              <div className="mt-7 border-t border-white/15 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--tgpi-gold-light)]"><LocalizedText text={"Included in your membership"} /></p>
                <ul className="mt-4 space-y-3">
                  {TGPI_PREMIUM_PLAN.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm leading-6 text-white/90"
                    >
                      <span aria-hidden="true" className="text-[var(--tgpi-gold-light)]">
                        ✓
                      </span>
                      <span><LocalizedText text={feature} /></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5 text-xs text-white/80">
                <Link href="/terms" className="underline underline-offset-4"><LocalizedText text="Terms" /></Link>
                <Link href="/privacy" className="underline underline-offset-4"><LocalizedText text="Privacy" /></Link>
                <Link href="/refunds" className="underline underline-offset-4"><LocalizedText text={"Refund policy"} /></Link>
              </div>
            </div>
          </aside>
        </section>
        <section
          className="mt-10 grid gap-5 rounded-[24px] border border-[var(--tgpi-border)] bg-white p-6 sm:grid-cols-3 sm:p-8"
          aria-label={t("Your first steps")}
        >
          {[
            [
              "01",
              "Choose your focus",
              "Start with the country or international goal that matters to you.",
            ],
            [
              "02",
              "Compare your options",
              "Review the trade-offs and save the reasoning behind your choice.",
            ],
            [
              "03",
              "Prepare your next move",
              "Use your readiness, documents and learning to guide your next action.",
            ],
          ].map(([n, title, description]) => (
            <div key={n}>
              <p className={eyebrow}><LocalizedText text={"Start here /"} />{" "}{n}</p>
              <h2 className="mt-3 text-base font-bold text-[var(--tgpi-navy-raised)]">
                <LocalizedText text={title} />
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#596576]">
                <LocalizedText text={description} />
              </p>
            </div>
          ))}
        </section>
        <section id="premium-system" className="scroll-mt-28 py-16 sm:py-20">
          <p className={eyebrow}><LocalizedText text={"The connected TGPI system"} /></p>
          <h2 className={`${heading} mt-4 max-w-3xl text-4xl sm:text-6xl`}><LocalizedText text={"From “where should I go?”"} /><br /><LocalizedText text={"to “what do I do next?”"} /></h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {systems.map((system) => (
              <article
                key={system.number}
                className="rounded-[24px] border border-[var(--tgpi-border)] bg-white p-6 sm:p-8"
              >
                <div className="flex justify-between gap-4">
                  <p className={eyebrow}><LocalizedText text={system.label} /></p>
                  <span className="text-sm font-semibold text-[#956A13]">
                    {system.number}
                  </span>
                </div>
                <h3 className={`${heading} mt-4 text-3xl sm:text-4xl`}>
                  <LocalizedText text={system.title} />
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#596576]">
                  <LocalizedText text={system.description} />
                </p>
                <Link
                  href={system.href}
                  className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-[var(--tgpi-navy-raised)]"
                >
                  <LocalizedText text={system.action} />
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section
          className="grid overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-white md:grid-cols-2"
          aria-labelledby="preparation-title"
        >
          <div className="relative min-h-64 md:min-h-96">
            <Image
              src="/images/cinematic-2026/documents-preparation-1600.webp"
              alt={t("Sunlit international study space with a notebook and globe overlooking a European city")}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className={eyebrow}><LocalizedText text={"Research becomes preparation"} /></p>
            <h2
              id="preparation-title"
              className={`${heading} mt-4 text-4xl sm:text-5xl`}
            ><LocalizedText text={"Keep your next step in view."} /></h2>
            <p className="mt-5 text-sm leading-7 text-[#596576]"><LocalizedText text={"Your country shortlist is the beginning. Bring your comparisons, readiness and learning into one place, then return with a clearer sense of what to do next."} /></p>
            <a
              href="#membership"
              className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-[var(--tgpi-navy-raised)]"
            ><LocalizedText text={"View your membership options"} />{" "}<span aria-hidden="true">↑</span>
            </a>
          </div>
        </section>
        <PricingOutcomeSelector />
        <section className="py-10 sm:py-14" aria-labelledby="comparison-title">
          <p className={eyebrow}><LocalizedText text={"A clear upgrade"} /></p>
          <h2
            id="comparison-title"
            className={`${heading} mt-4 text-4xl sm:text-5xl`}
          ><LocalizedText text={"Explore free. Prepare with Premium."} /></h2>
          <div className="mt-8 overflow-hidden rounded-[24px] border border-[var(--tgpi-border)] bg-white">
            <div
              className="overflow-x-auto"
              role="region"
              aria-label={t("Free and Premium comparison")}
              tabIndex={0}
            >
              <table className="w-full min-w-[540px] text-left text-sm">
                <caption className="sr-only"><LocalizedText text={"TGPI Free and Premium membership features"} /></caption>
                <thead>
                  <tr className="bg-[#F1EBDD]">
                    <th scope="col" className="p-5"><LocalizedText text={"Capability"} /></th>
                    <th scope="col" className="p-5"><LocalizedText text="Free" /></th>
                    <th scope="col" className="bg-[var(--tgpi-navy-raised)] p-5 text-[var(--tgpi-gold-light)]">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map(([feature, free, premium]) => (
                    <tr key={feature} className="border-t border-[var(--tgpi-border)]">
                      <th
                        scope="row"
                        className="p-5 font-semibold text-[var(--tgpi-navy-raised)]"
                      >
                        <LocalizedText text={feature} />
                      </th>
                      <td className="p-5 text-[#596576]"><LocalizedText text={free} /></td>
                      <td className="bg-[var(--tgpi-navy-raised)] p-5 font-semibold text-white">
                        <LocalizedText text={premium} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-5 flex flex-col justify-between gap-4 rounded-2xl border border-[var(--tgpi-border)] p-5 sm:flex-row sm:items-center">
            <p className="text-sm leading-6 text-[#596576]"><LocalizedText text={"Still exploring?"} />{" "}<LocalizedText text={TGPI_FREE_PLAN.description} />
            </p>
            <Link
              href="/sign-up?next=%2Fpricing%23membership"
              className="inline-flex min-h-11 shrink-0 items-center font-bold text-[var(--tgpi-navy-raised)] underline underline-offset-4"
            ><LocalizedText text={"Create a free account →"} /></Link>
          </div>
        </section>
        <section
          className="grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]"
          aria-labelledby="faq-title"
        >
          <div>
            <p className={eyebrow}><LocalizedText text={"Before you subscribe"} /></p>
            <h2
              id="faq-title"
              className={`${heading} mt-4 text-4xl sm:text-5xl`}
            ><LocalizedText text={"Clear terms."} /><br /><LocalizedText text={"Confident next steps."} /></h2>
            <p className="mt-5 text-sm leading-7 text-[#596576]"><LocalizedText text={"Understand your access, billing and the role of TGPI before making your decision."} /></p>
          </div>
          <div className="divide-y divide-[var(--tgpi-border)] border-y border-[var(--tgpi-border)]">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-bold text-[var(--tgpi-navy-raised)]">
                  <LocalizedText text={question} />
                  <span
                    aria-hidden="true"
                    className="text-xl text-[#956A13] group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pt-4 text-sm leading-7 text-[#596576]">
                  <LocalizedText text={answer} />
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="rounded-[28px] bg-[var(--tgpi-navy-raised)] p-7 text-white sm:p-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_340px] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--tgpi-gold-light)]"><LocalizedText text={"Your next chapter starts with clarity"} /></p>
              <h2 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-tight sm:text-5xl"><LocalizedText text={"Make your next global decision count."} /></h2>
              <p className="mt-4 text-sm leading-7 text-white/80">
                <LocalizedText text="{price} per month. Country Fit, comparisons and personal preparation, connected." values={{ price: TGPI_PREMIUM_PLAN.price }} />
              </p>
            </div>
            <PremiumActionButton billingEnabled={billingEnabled} />
          </div>
        </section>
      </div>
    </TGPIPageShell>
  );
}
