import { safeReturnTo } from "@/lib/auth/return-to";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TGPIAuthShell from "@/components/auth/TGPIAuthShell";
import RegistrationProfile from "@/components/auth/RegistrationProfile";
import { normalizeTgpiAccountProfile } from "@/lib/account-profile";
import { registrationCountryCodes } from "@/lib/auth/registration";
export const metadata: Metadata = { title: "Complete your profile — TGPI", robots: { index: false, follow: false } };
export default async function WelcomePage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeReturnTo((await searchParams).next);
  const user = await currentUser();
  if (!user) redirect(`/sign-in?next=${encodeURIComponent(next)}`);
  const verified = user.emailAddresses.some(email => email.id === user.primaryEmailAddressId && email.verification?.status === "verified");
  if (!verified) return <TGPIAuthShell mode="welcome"><p>Verify your primary email in <a href="/settings">account settings</a> before completing registration.</p></TGPIAuthShell>;
  const profile = normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile);
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  const countries = registrationCountryCodes.map(code => ({ code, name: names.of(code) || code })).sort((a,b) => a.name.localeCompare(b.name, "en"));
  const country = countries.find(item => item.name === profile.currentCountry || item.code === profile.currentCountry)?.code || "";
  return <TGPIAuthShell mode="welcome"><RegistrationProfile returnTo={next} firstName={user.firstName || ""} lastName={user.lastName || ""} currentCountry={country} preferredLanguage={profile.preferredLanguage} countries={countries} /></TGPIAuthShell>;
}
