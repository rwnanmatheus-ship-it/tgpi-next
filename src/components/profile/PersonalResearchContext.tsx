
import { LocalizedElement } from "@/components/localization/LocalizedElement";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getAccountSalutation, mergeAccountProfileWithOnboarding, normalizeAccountIdentity } from "@/lib/account-profile";

export default async function PersonalResearchContext() {
  const user = await currentUser();
  if (!user) return null;
  const profile = mergeAccountProfileWithOnboarding(user.unsafeMetadata.tgpiAccountProfile, user.unsafeMetadata.tgpiOnboarding);
  const identity = normalizeAccountIdentity(user);
  const country = profile.nationality || "Not provided";
  return <LocalizedElement as="section" className="ig-section ig-panel" aria-label="Your saved personal research context">
    <p className="ig-eyebrow"><LocalizedText text={"Your connected profile"} /></p><h2>{getAccountSalutation(identity, profile)}<LocalizedText text={", research through your own context."} /></h2>
    <dl className="mt-5 grid gap-4 sm:grid-cols-3">{[
      ["Citizenship", country], ["Profession", profile.profession || "Not provided"], ["Professional experience", profile.yearsExperience ? profile.yearsExperience === "0" ? "Getting started" : `${profile.yearsExperience} years` : "Not provided"],
    ].map(([label, value]) => <div className="rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas-alt)] p-4" key={label}><dt className="text-xs font-bold text-[var(--tgpi-muted)]"><LocalizedText text={label} /></dt><dd className="mt-2 break-words text-base font-bold text-[var(--tgpi-navy-raised)]">{value}</dd></div>)}</dl>
    <p className="ig-small">{profile.profession ? <LocalizedText text={"For {value0}, compare local demand, language requirements, qualification recognition and work authorization separately."} values={{value0: String(profile.profession)}} /> : <LocalizedText text={"Add your profession to frame career and qualification research."} />} {profile.nationality ? <LocalizedText text={"Check destination entry and residence requirements using your declared citizenship ({value0}); residence alone does not determine nationality."} values={{value0: String(profile.nationality)}} /> : <LocalizedText text={"Add your citizenship to identify which document and residence requirements to investigate."} />}{" "}<LocalizedText text={"National statistics do not establish your eligibility or guarantee employment."} /></p>
    <Link className="ig-link" href="/profile/security#settings-identity"><LocalizedText text={"Update my personal information →"} /></Link>
  </LocalizedElement>;
}
