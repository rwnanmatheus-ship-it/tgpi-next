import { localizeMetadata } from "@/lib/localization/metadata.server";
import PlanHero from "@/components/plan/PlanHero";
import "@/components/plan/plan.css";
import PersonalResearchContext from "@/components/profile/PersonalResearchContext";
import Link from "next/link";
import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { normalizeOnboardingData } from "@/lib/onboarding";
import CountryFitWorkspace from "@/components/intelligence/CountryFitWorkspace";
import { GraphStatus } from "@/components/intelligence/Evidence";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { getAllCountries } from "@/lib/countries";
import { LocalizedText } from "@/components/localization/LocaleProvider";


export const dynamic = "force-dynamic";
export const maxDuration = 60;
const sourceMetadata: Metadata = { title: "Country Fit & Personal Research Plan | TGPI", description: "Connect your goals, budget, languages and timeline to country evidence and a practical research plan.", robots: { index: false, follow: true } };
export default async function CountryFitPage({ searchParams }: { searchParams: Promise<{ country?: string; goal?: string }> }) {
  const session = await auth();
  const member = session.userId ? await currentUser() : null;
  const savedContext = member ? normalizeOnboardingData(member.unsafeMetadata.tgpiOnboarding) : null;
  const [state, params] = await Promise.all([getIntelligence(), searchParams]);
  const requestedGoal = ["work", "study", "live", "travel", "learn"].includes(params.goal ?? "") ? params.goal : undefined;
  const context = { ...(savedContext ?? { primaryGoal: "study", budgetRange: "undecided", timeHorizon: "exploring", languages: [], profession: "", priorities: [] }), ...(requestedGoal ? { primaryGoal: requestedGoal } : {}) };
  const aliases = new Map(getAllCountries().map(c => [c.slug, c.name]));
  const countries = identities.map(c => ({ ...c, name: aliases.get(c.slug) ?? c.name })).sort((a, b) => a.name.localeCompare(b.name));
  return <main className="plan-shell"><div className="plan-container">
    <PlanHero eyebrow="TGPI / Country Fit" title="Your ambition." accent="A practical next step." description="Connect your goals to evidence, compare possibilities and build a practical plan for your next chapter." asset="country-research" framing="learning" imagePosition="50% 35%" imageScale={1}><div className="plan-actions"><a className="plan-button primary" href="#context"><LocalizedText text="Refine Country Fit" /> ↓</a><Link className="plan-button" href="/plan"><LocalizedText text="Open my connected plan" /> ↗</Link></div></PlanHero>
    <CountryFitWorkspace countries={countries} snapshot={state.snapshot} initialCountry={params.country ?? savedContext?.targetCountries[0]} initialContext={context} ownerId={member?.id ?? "guest"} shortlist={savedContext?.targetCountries ?? []} />
    {member && <details className="plan-panel plan-disclosure"><summary><LocalizedText text="Your connected profile" /></summary><PersonalResearchContext /></details>}
    <details className="plan-panel plan-disclosure"><summary><LocalizedText text="Sources & methodology" /></summary><GraphStatus state={state} /></details>
    <section className="plan-panel" style={{ marginTop: 20 }}><p className="plan-kicker"><LocalizedText text="Global Community" /></p><h2><LocalizedText text="Give your research a human perspective." /></h2><p><LocalizedText text="Explore experiences from people navigating international life. Your private budget, documents and questionnaire answers are never published to the community." /></p><div className="plan-links"><Link className="plan-button" href="/community"><LocalizedText text="Explore Global Community →" /></Link><Link className="plan-button" href="/atlas"><LocalizedText text="Ask Atlas" /> ↗</Link></div></section>
  </div></main>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
