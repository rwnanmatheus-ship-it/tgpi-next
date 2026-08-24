import type { Metadata } from "next";
import PremiumCommandCenterV2 from "@/components/premium/PremiumCommandCenterV2";
import { courses } from "@/data/courses";
import {
  normalizeActivationProgress,
  TGPI_ACTIVATION_METADATA_KEY,
} from "@/lib/activation-progress";
import { requirePremium } from "@/lib/auth/guards";
import { getAllCountries } from "@/lib/countries";
import { normalizeOnboardingData } from "@/lib/onboarding";
import { buildPremiumCommandCenterModel } from "@/lib/premium-command-center";

export const metadata: Metadata = {
  title: "Premium command center — TGPI",
  description:
    "Your protected TGPI workspace for connected country intelligence, comparisons, learning and global planning.",
  robots: { index: false, follow: false },
};

function formatStatus(status: string) {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatPeriodEnd(value: string) {
  if (!value) return "Managed securely through Stripe";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Managed securely through Stripe";

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(date);
}

export default async function PremiumPage() {
  const { accessMode, billing, user } = await requirePremium();
  const isFounderAccess = accessMode === "founder";
  const isPreviewAccess = accessMode === "preview";
  const onboarding = normalizeOnboardingData(
    user.unsafeMetadata.tgpiOnboarding,
  );
  const activation = normalizeActivationProgress(
    user.privateMetadata[TGPI_ACTIVATION_METADATA_KEY],
  );
  const model = buildPremiumCommandCenterModel(
    onboarding,
    activation,
    getAllCountries(),
    courses,
  );
  const name = user.firstName || user.fullName || "Global explorer";
  const periodLabel = isFounderAccess
    ? "Founder access authorized by TGPI. No payment or subscription was created."
    : isPreviewAccess
      ? "Temporary founder/test access for this Vercel Preview. No payment or subscription was created."
      : billing.cancelAtPeriodEnd
      ? `Access available until ${formatPeriodEnd(billing.currentPeriodEnd)}.`
      : billing.currentPeriodEnd
        ? `Next renewal: ${formatPeriodEnd(billing.currentPeriodEnd)}.`
        : "Managed securely through Stripe.";

  return (
    <PremiumCommandCenterV2
      accessMode={accessMode}
      firstName={name}
      membershipStatus={
        isFounderAccess
          ? "Founder"
          : isPreviewAccess
            ? "Preview"
            : formatStatus(billing.status)
      }
      model={model}
      periodLabel={periodLabel}
    />
  );
}
