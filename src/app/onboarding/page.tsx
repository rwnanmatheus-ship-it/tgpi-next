import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { getAllCountries } from "@/lib/countries";
import { normalizeOnboardingData } from "@/lib/onboarding";
import type { OnboardingCountry } from "@/types/onboarding";

export const metadata: Metadata = {
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

export default async function OnboardingPage() {
  const user = await currentUser();
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

  return (
    <OnboardingFlow
      countries={countries}
      initialData={initialData}
      firstName={user?.firstName || "global explorer"}
    />
  );
}
