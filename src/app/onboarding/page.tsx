import { localizeMetadata } from "@/lib/localization/metadata.server";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/guards";
import { comparisonPlanPath } from "@/lib/comparison-state";
import { isComparisonGoal } from "@/lib/tgpi-comparison";
import { currentUser } from "@clerk/nextjs/server";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { getAllCountries } from "@/lib/countries";
import { normalizeOnboardingData } from "@/lib/onboarding";
import type { OnboardingCountry } from "@/types/onboarding";

const sourceMetadata: Metadata = {
  title: "Build your global plan — TGPI",
  description:
    "Personalize your TGPI experience with your goals, countries of interest, context, and global priorities.",
  robots: { index: false, follow: false },
};

function getFlagRegionCode(emoji: string) {
  const code = Array.from(emoji)
    .map((character) => {
      const codePoint = character.codePointAt(0);
      return codePoint ? String.fromCharCode(codePoint - 127397) : "";
    })
    .join("");

  return /^[A-Z]{2}$/.test(code) ? code : "";
}

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ source?: string | string[]; country?: string | string[]; goal?: string | string[] }> }) {
  const params = await searchParams;
  const requestedCountries = typeof params.country === "string" ? [params.country] : params.country ?? [];
  const fromComparison = params.source === "compare";
  const requestedGoal = typeof params.goal === "string" && isComparisonGoal(params.goal) && params.goal !== "overall" ? params.goal : undefined;
  const returnTo = fromComparison ? comparisonPlanPath(requestedCountries, requestedGoal ?? "overall") : "/onboarding";
  const [, user] = await Promise.all([requireUser(returnTo), currentUser()]);
  const displayNames = new Intl.DisplayNames(["en-US"], { type: "region" });
  const countries: OnboardingCountry[] = getAllCountries()
    .map((country) => {
      const regionCode = getFlagRegionCode(country.emoji);

      return {
        slug: country.slug,
        name: (regionCode && displayNames.of(regionCode)) || country.name,
        emoji: country.emoji,
        region: country.region,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "en-US"));
  const initialData = normalizeOnboardingData(
    user?.unsafeMetadata.tgpiOnboarding,
  );

  const knownCountries = new Set(countries.map(country => country.slug));
  const selected = [...new Set(requestedCountries)].filter(slug => knownCountries.has(slug)).slice(0, 5);
  const importComparison = fromComparison && selected.length >= 2;
  const draft = importComparison ? {
    ...initialData,
    primaryGoal: requestedGoal ?? initialData.primaryGoal,
    targetCountries: [...new Set([...selected, ...initialData.targetCountries])].slice(0, 5),
    currentStep: 1,
  } : initialData;

  return (
    <OnboardingFlow
      countries={countries}
      initialData={draft}
      explicitSave={importComparison}
      completionHref={importComparison ? "/plan" : "/profile?onboarding=completed"}
      firstName={user?.firstName || "global explorer"}
    />
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
