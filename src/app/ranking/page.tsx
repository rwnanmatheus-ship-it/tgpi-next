import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import GlobalProgressPanel from "@/components/profile/GlobalProgressPanel";
import { requireUser } from "@/lib/auth/guards";
import { getAccountProfileCompletion, mergeAccountProfileWithOnboarding, normalizeAccountIdentity } from "@/lib/account-profile";
import { normalizeActivationProgress, TGPI_ACTIVATION_METADATA_KEY } from "@/lib/activation-progress";
import { getGlobalRankSignals } from "@/lib/global-rank-signals";
import { getGlobalRank } from "@/lib/global-ranks";
import { getAllCountries } from "@/lib/countries";
import { buildGlobalWorkspaceModel } from "@/lib/global-workspace";
import { normalizeOnboardingData } from "@/lib/onboarding";

export const metadata: Metadata = { title: "Progress & ranks — TGPI", robots: { index: false, follow: false } };
export default async function RankingPage() {
  await requireUser();
  const user = await currentUser();
  const onboarding = normalizeOnboardingData(user?.unsafeMetadata.tgpiOnboarding);
  const profile = mergeAccountProfileWithOnboarding(user?.unsafeMetadata.tgpiAccountProfile, onboarding);
  const identity = normalizeAccountIdentity({firstName:user?.firstName,lastName:user?.lastName,username:user?.username || ""});
  const activation = normalizeActivationProgress(user?.privateMetadata[TGPI_ACTIVATION_METADATA_KEY]);
  const model = buildGlobalWorkspaceModel(onboarding, getAllCountries(), activation);
  const rank = getGlobalRank({...getGlobalRankSignals(activation), activationCompletion:model.activationCompletion, planCompletion:model.completion, profileCompletion:getAccountProfileCompletion(identity,profile)});
  return <main className="min-h-screen bg-[#F8F5EE] px-4 py-8 sm:px-6 sm:py-12"><div className="mx-auto max-w-6xl"><nav aria-label="Progress navigation" className="mb-6 flex flex-wrap gap-3 text-sm font-bold text-[#0B1F3A]"><Link className="rounded-xl border border-[#D8D2C4] bg-white px-4 py-3" href="/profile">← Workspace</Link><Link className="rounded-xl border border-[#D8D2C4] bg-white px-4 py-3" href="/profile/security">Account settings</Link></nav><GlobalProgressPanel rank={rank}/></div></main>;
}
