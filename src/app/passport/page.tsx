import { getUserActivationProgress } from "@/lib/activation-store.server";
import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import DocumentsExperience from "@/components/documents/DocumentsExperience";
import identityData from "@/data/intelligence/identities.json";
import { formatTgpiGlobalId } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { buildDocumentsMemberModel, resolveDocumentGoal } from "@/lib/documents-os";
import { isLearningStorageConfigured } from "@/lib/firestore-admin-rest.server";
import { listUserLearningCredentials } from "@/lib/learning-records.server";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { normalizeOnboardingData } from "@/lib/onboarding";
import "./documents.css";

const sourceMetadata: Metadata = {
  alternates: { canonical: "/passport" },
  title: "TGPI Global Documents | International Preparation",
  description: "Prepare documents for study, work, travel and relocation with destination checklists, research briefs and a date calculator.",
  robots: { index: true, follow: true },
};

const directory = identityData.countries.map(({ slug, name, iso2, iso3, region }) => ({ slug, name, iso2, iso3, region }));

export default async function PassportPage({ searchParams }: PageProps<"/passport">) {
  const [session, params] = await Promise.all([auth(), searchParams]);
  const goal = resolveDocumentGoal(params.goal);
  const initialCountry = directory.find(country => country.slug === params.country)?.slug;

  if (!session.userId) return <DocumentsExperience countries={directory} initialGoal={goal ?? "travel"} initialCountry={initialCountry} />;

  const [user, credentials] = await Promise.all([
    currentUser(),
    isLearningStorageConfigured()
      ? listUserLearningCredentials(session.userId).then(records => records.filter(record => record.status === "active").length, () => null)
      : null,
  ]);
  const model = buildDocumentsMemberModel(
    normalizeOnboardingData(user?.unsafeMetadata.tgpiOnboarding),
    await getUserActivationProgress(session.userId, user?.privateMetadata),
    getAllCountries(),
    user?.primaryEmailAddress?.verification?.status === "verified",
    credentials,
  );

  return <DocumentsExperience
    countries={directory}
    initialGoal={goal ?? model.goal}
    initialCountry={initialCountry}
    member={{ globalId: formatTgpiGlobalId(session.userId), model }}
  />;
}

export async function generateMetadata() {
  return localizeMetadata(sourceMetadata);
}
