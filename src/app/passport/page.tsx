import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import DocumentsGuestExperience from "@/components/documents/DocumentsGuestExperience";
import DocumentsMemberExperience from "@/components/documents/DocumentsMemberExperience";
import {
  normalizeActivationProgress,
  TGPI_ACTIVATION_METADATA_KEY,
} from "@/lib/activation-progress";
import { formatTgpiGlobalId } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { buildDocumentsMemberModel } from "@/lib/documents-os";
import { normalizeOnboardingData } from "@/lib/onboarding";
import { buildMetadata } from "@/seo";

export const metadata: Metadata = buildMetadata({
  title: "International Documents and Moving Checklist",
  description:
    "Build a country-aware document readiness strategy for moving, studying or working abroad with TGPI Documents OS.",
  path: "/passport",
  image: {
    url: "/images/documents/tgpi-documents-hero-v2.webp",
    alt: "TGPI international documents and global readiness system",
  },
});

export default async function PassportPage() {
  const countries = getAllCountries();
  const session = await auth();

  if (!session.userId) {
    return <DocumentsGuestExperience countryCount={countries.length} />;
  }

  const user = await currentUser();
  const onboarding = normalizeOnboardingData(
    user?.unsafeMetadata.tgpiOnboarding,
  );
  const activation = normalizeActivationProgress(
    user?.privateMetadata[TGPI_ACTIVATION_METADATA_KEY],
  );
  const emailVerified =
    user?.primaryEmailAddress?.verification?.status === "verified";
  const model = buildDocumentsMemberModel(
    onboarding,
    activation,
    countries,
    emailVerified,
  );

  return (
    <DocumentsMemberExperience
      firstName={user?.firstName || user?.fullName || "Global explorer"}
      globalId={formatTgpiGlobalId(session.userId)}
      model={model}
    />
  );
}
