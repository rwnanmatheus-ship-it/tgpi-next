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
  const aliases = new Map(getAllCountries().map(c => [c.slug, c.name]));
  const countries = identities.map(c => ({ ...c, name: aliases.get(c.slug) ?? c.name })).sort((a, b) => a.name.localeCompare(b.name));
  return <main className="ig-shell"><div className="ig-container"><header className="ig-hero"><p className="ig-eyebrow">TGPI / Country Fit + Personal plan</p><h1>Your ambition.<br />A clearer next step.</h1><p>Bring your context to the research. Understand what is supported, what is still unknown and what to do next — without an invented success score.</p></header><GraphStatus state={state} /><CountryFitWorkspace countries={countries} snapshot={state.snapshot} initialCountry={params.country ?? savedContext?.targetCountries[0]} initialContext={savedContext ?? { primaryGoal: ["work", "study", "live", "travel", "learn"].includes(params.goal ?? "") ? params.goal! : "study", budgetRange: "undecided", timeHorizon: "exploring", languages: [], profession: "", priorities: [] }} /></div></main>;
}
