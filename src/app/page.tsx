import { localizeMetadata } from "@/lib/localization/metadata.server";
import type { Metadata } from "next";
import InstitutionalHome from "@/components/home/v4/InstitutionalHome";
import HomeStructuredData from "@/components/home/HomeStructuredData";
import { HOME_FAQ, HOME_HERO_DESCRIPTION } from "@/lib/home-content";
import { homeGoal } from "@/lib/home-journey";
import { homeProductArt } from "@/lib/home-showcase";

const sourceMetadata: Metadata = {
  title: "TGPI | The Global Polymath Institute",
  description: HOME_HERO_DESCRIPTION,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  keywords: [
    "compare countries",
    "best country to live",
    "study abroad planning",
    "international relocation planning",
    "country intelligence",
    "global readiness",
    "TGPI",
    "The Global Polymath Institute",
  ],
  alternates: { canonical: "https://www.theglobalpolymath.com" },
  openGraph: {
    title: "TGPI | The Global Polymath Institute",
    description: HOME_HERO_DESCRIPTION,
    url: "https://www.theglobalpolymath.com",
    siteName: "TGPI — The Global Polymath Institute",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: homeProductArt("hero"),
        width: 1536,
        height: 1024,
        alt: "TGPI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TGPI | The Global Polymath Institute",
    description: HOME_HERO_DESCRIPTION,
    images: [homeProductArt("hero")],
  },
};

export default async function HomePage({ searchParams }: { searchParams: Promise<{ goal?: string | string[] }> }) {
  const params = await searchParams;
  const goal = Array.isArray(params.goal) ? params.goal[0] : params.goal;
  return <><HomeStructuredData faq={HOME_FAQ} /><InstitutionalHome initialGoal={homeGoal(goal)} /></>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
