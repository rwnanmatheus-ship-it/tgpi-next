import { localizeMetadata } from "@/lib/localization/metadata.server";

import { LocalizedElement } from "@/components/localization/LocalizedElement";
import { courses } from "@/data/courses";
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
import { LocalizedText } from "@/components/localization/LocaleProvider";


const sourceMetadata: Metadata = { title: "Progress & ranks — TGPI", robots: { index: false, follow: false } };
export default async function RankingPage() {
  await requireUser();
  const user = await currentUser();
  const onboarding = normalizeOnboardingData(user?.unsafeMetadata.tgpiOnboarding);
  const profile = mergeAccountProfileWithOnboarding(user?.unsafeMetadata.tgpiAccountProfile, onboarding);
  const identity = normalizeAccountIdentity({firstName:user?.firstName,lastName:user?.lastName,username:user?.username || ""});
  const activation = normalizeActivationProgress(user?.privateMetadata[TGPI_ACTIVATION_METADATA_KEY]);
  const model = buildGlobalWorkspaceModel(onboarding, getAllCountries(), activation, courses);
  const rank = getGlobalRank({...getGlobalRankSignals(activation), activationCompletion:model.activationCompletion, planCompletion:model.completion, profileCompletion:getAccountProfileCompletion(identity,profile)});
  return <main className="min-h-screen bg-[var(--tgpi-canvas-alt)] px-4 py-8 sm:px-6 sm:py-12"><div className="mx-auto max-w-6xl"><LocalizedElement as="nav" aria-label="Progress navigation" className="mb-6 flex flex-wrap gap-3 text-sm font-bold text-[var(--tgpi-navy-raised)]"><Link className="rounded-xl border border-[var(--tgpi-border)] bg-white px-4 py-3" href="/profile"><LocalizedText text="← Workspace" /></Link><Link className="rounded-xl border border-[var(--tgpi-border)] bg-white px-4 py-3" href="/profile/security"><LocalizedText text="Account settings" /></Link></LocalizedElement><GlobalProgressPanel rank={rank}/></div></main>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
