import type { Metadata } from "next";
import MobileHome from "@/components/mobile/MobileHome";
import HomeDecisionOS from "@/components/HomeDecisionOS";
import HomeAuthorityLayer from "@/components/home/HomeAuthorityLayer";
import HomeCountryCardsV2 from "@/components/home/HomeCountryCardsV2";
import HomeHeroV3 from "@/components/home/HomeHeroV3";
import HomeInstagramContinuity from "@/components/home/HomeInstagramContinuity";
import HomeLaunchClose from "@/components/home/HomeLaunchClose";
import HomeLearningPortal from "@/components/home/HomeLearningPortal";
import HomePortal from "@/components/home/HomePortal";
import HomeStructuredData from "@/components/home/HomeStructuredData";

export const metadata: Metadata = {
  title: "TGPI — Compare Countries and Build a Global Life With Evidence",
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
    title: "TGPI — Choose Where to Live, Work or Study With Evidence",
    description:
      "Country intelligence, transparent comparison, document preparation and practical learning in one connected global decision system.",
    url: "https://theglobalpolymath.com",
    siteName: "TGPI — The Global Polymath Institute",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TGPI — Choose Where to Live, Work or Study With Evidence",
    description:
      "Compare countries, understand trade-offs and turn international ambition into a structured plan.",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <main className="overflow-hidden bg-[var(--tgpi-canvas)] text-[var(--tgpi-ink)]">
        <MobileHome />
        <div className="mobile-desktop-home">
        <HomeHeroV3 />
        <HomePortal />
        <HomeDecisionOS />
        <HomeCountryCardsV2 />
        <HomeLearningPortal />
        <HomeInstagramContinuity />
        <HomeAuthorityLayer />
        <HomeLaunchClose />
        </div>
      </main>
    </>
  );
}
