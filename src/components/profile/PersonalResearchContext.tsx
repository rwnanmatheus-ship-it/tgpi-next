import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getAccountSalutation, mergeAccountProfileWithOnboarding, normalizeAccountIdentity } from "@/lib/account-profile";

export default async function PersonalResearchContext() {
  const user = await currentUser();
  if (!user) return null;
  const profile = mergeAccountProfileWithOnboarding(user.unsafeMetadata.tgpiAccountProfile, user.unsafeMetadata.tgpiOnboarding);
  const identity = normalizeAccountIdentity(user);
  const country = profile.nationality || "Not provided";
  return <section className="ig-section ig-panel" aria-label="Your saved personal research context">
    <p className="ig-eyebrow">Your connected profile</p><h2>{getAccountSalutation(identity, profile)}, research through your own context.</h2>
    <dl className="mt-5 grid gap-4 sm:grid-cols-3">{[
      ["Citizenship", country], ["Profession", profile.profession || "Not provided"], ["Professional experience", profile.yearsExperience ? profile.yearsExperience === "0" ? "Getting started" : `${profile.yearsExperience} years` : "Not provided"],
    ].map(([label, value]) => <div className="rounded-2xl border border-[#D8D2C4] bg-[#F8F5EE] p-4" key={label}><dt className="text-xs font-bold text-[#526174]">{label}</dt><dd className="mt-2 break-words text-base font-bold text-[#0B1F3A]">{value}</dd></div>)}</dl>
    <p className="ig-small">{profile.profession ? `For ${profile.profession}, compare local demand, language requirements, qualification recognition and work authorization separately.` : "Add your profession to frame career and qualification research."} {profile.nationality ? `Check destination entry and residence requirements using your declared citizenship (${profile.nationality}); residence alone does not determine nationality.` : "Add your citizenship to identify which document and residence requirements to investigate."} National statistics do not establish your eligibility or guarantee employment.</p>
    <Link className="ig-link" href="/profile/security#settings-identity">Update my personal information →</Link>
  </section>;
}
