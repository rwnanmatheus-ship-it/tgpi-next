import AreaHero from "@/components/ui/AreaHero";
import PersonalResearchContext from "@/components/profile/PersonalResearchContext";
import Link from "next/link";
import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { normalizeOnboardingData } from "@/lib/onboarding";
import CountryFitWorkspace from "@/components/intelligence/CountryFitWorkspace";
import { GraphStatus } from "@/components/intelligence/Evidence";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { getAllCountries } from "@/lib/countries";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const metadata: Metadata = { title: "Country Fit & Personal Research Plan | TGPI", description: "Connect your goals, budget, languages and timeline to country evidence and a practical research plan.", robots: { index: false, follow: true } };
export default async function CountryFitPage({ searchParams }: { searchParams: Promise<{ country?: string; goal?: string }> }) {
  const session = await auth();
  const member = session.userId ? await currentUser() : null;
  const savedContext = member ? normalizeOnboardingData(member.unsafeMetadata.tgpiOnboarding) : null;
  const [state, params] = await Promise.all([getIntelligence(), searchParams]);
  const requestedGoal = ["work", "study", "live", "travel", "learn"].includes(params.goal ?? "") ? params.goal : undefined;
  const context = { ...(savedContext ?? { primaryGoal: "study", budgetRange: "undecided", timeHorizon: "exploring", languages: [], profession: "", priorities: [] }), ...(requestedGoal ? { primaryGoal: requestedGoal } : {}) };
  const aliases = new Map(getAllCountries().map(c => [c.slug, c.name]));
  const countries = identities.map(c => ({ ...c, name: aliases.get(c.slug) ?? c.name })).sort((a, b) => a.name.localeCompare(b.name));
  return <main className="ig-shell"><div className="ig-container"><AreaHero id="country-fit-title" eyebrow="TGPI / Your personal research plan" title={<>Your ambition.<br />A practical next step.</>} description="Bring your goals, budget, languages and timeline into one research space. Understand the evidence, identify the gaps and prepare a plan you can act on." image="/images/about/global-perspective-v2.webp" /><GraphStatus state={state} /><PersonalResearchContext /><CountryFitWorkspace countries={countries} snapshot={state.snapshot} initialCountry={params.country ?? savedContext?.targetCountries[0]} initialContext={context} /><section className="ig-section ig-panel"><p className="ig-eyebrow">Global Community</p><h2>Give your research a human perspective.</h2><p className="ig-small">Explore experiences from people navigating international life. Your private budget, documents and questionnaire answers are never published to the community.</p><Link className="ig-link" href="/community">Explore Global Community →</Link></section></div></main>;
}
