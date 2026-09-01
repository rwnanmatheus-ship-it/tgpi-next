import type { Metadata } from "next";
import HomeDecisionOS from "@/components/HomeDecisionOS";
import HomeAuthorityLayer from "@/components/home/HomeAuthorityLayer";
import HomeCountryCardsV2 from "@/components/home/HomeCountryCardsV2";
import HomeHeroV3 from "@/components/home/HomeHeroV3";
import HomeInstagramContinuity from "@/components/home/HomeInstagramContinuity";
import HomeLaunchClose from "@/components/home/HomeLaunchClose";
import HomeLearningPortal from "@/components/home/HomeLearningPortal";
import HomePortal from "@/components/home/HomePortal";
import HomeStructuredData from "@/components/home/HomeStructuredData";
import { buildMetadata } from "@/seo";

export const metadata: Metadata = buildMetadata({
  absoluteTitle: true,
  title: "TGPI — The Global Polymath Institute",
  description:
    "Global education and decision intelligence for comparing countries and choosing where to live, work, study and build an international life.",
  path: "/",
  keywords: [
    "compare countries",
    "best country to live",
    "study abroad planning",
    "international relocation planning",
    "country intelligence",
    "global readiness",
    "TGPI",
  ],
});

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <main className="overflow-hidden bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
        <HomeHeroV3 />
        <HomePortal />
        <HomeDecisionOS />
        <HomeCountryCardsV2 />
        <HomeLearningPortal />
        <HomeInstagramContinuity />
        <HomeAuthorityLayer />
        <HomeLaunchClose />
      </main>
    </>
  );
}
