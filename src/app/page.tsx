import type { Metadata } from "next";
import HomeAuthorityLayer from "@/components/home/HomeAuthorityLayer";
import HomeCommandCenter from "@/components/home/HomeCommandCenter";
import HomeCountryCardsV2 from "@/components/home/HomeCountryCardsV2";
import HomeDecisionEntry from "@/components/home/HomeDecisionEntry";
import HomeDecisionLab from "@/components/home/HomeDecisionLab";
import HomeEcosystem from "@/components/home/HomeEcosystem";
import HomeHeroV3 from "@/components/home/HomeHeroV3";
import HomeInstagramContinuity from "@/components/home/HomeInstagramContinuity";
import HomeLaunchClose from "@/components/home/HomeLaunchClose";
import HomeLearningPortal from "@/components/home/HomeLearningPortal";
import HomePortal from "@/components/home/HomePortal";
import HomeStructuredData from "@/components/home/HomeStructuredData";

export const metadata: Metadata = {
  title: "TGPI — Find Where Your Life Fits With Evidence",
  description:
    "Compare 195 country profiles, understand cost, career, lifestyle and mobility trade-offs, prepare documents and build practical skills for international life with TGPI.",
  keywords: [
    "compare countries",
    "best country to live",
    "study abroad planning",
    "international relocation planning",
    "country intelligence",
    "global readiness",
    "TGPI",
  ],
  alternates: { canonical: "https://theglobalpolymath.com" },
  openGraph: {
    title: "TGPI — Find Where Your Life Fits",
    description:
      "Country intelligence, transparent comparison, document preparation and practical learning in one connected global decision system.",
    url: "https://theglobalpolymath.com",
    siteName: "TGPI — The Global Polymath Institute",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/home/tgpi-home-global-knowledge-meridian-v1.webp",
        width: 1672,
        height: 941,
        alt: "TGPI global decision intelligence system",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TGPI — Find Where Your Life Fits",
    description:
      "Compare countries, understand trade-offs and turn international ambition into a structured plan.",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <main className="overflow-hidden bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
        <HomeHeroV3 />
        <HomeDecisionEntry />
        <HomeDecisionLab />
        <HomePortal />
        <HomeCountryCardsV2 />
        <HomeEcosystem />
        <HomeLearningPortal />
        <HomeCommandCenter />
        <HomeInstagramContinuity />
        <HomeAuthorityLayer />
        <HomeLaunchClose />
      </main>
    </>
  );
}
