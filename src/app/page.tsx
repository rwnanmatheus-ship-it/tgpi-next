import { localizeMetadata } from "@/lib/localization/metadata.server";
import type { Metadata } from "next";
import InstitutionalHome from "@/components/home/v4/InstitutionalHome";
import HomeStructuredData from "@/components/home/HomeStructuredData";
import { HOME_FAQ } from "@/lib/home-content";

const sourceMetadata: Metadata = {
  title: "TGPI | The Global Polymath Institute",
  description:
    "The Global Polymath Institute (TGPI) connects practical education, country research and international preparation. Compare countries and plan life abroad.",
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
    description:
      "Country intelligence, transparent comparison, document preparation and practical learning in one connected global decision system.",
    url: "https://www.theglobalpolymath.com",
    siteName: "TGPI — The Global Polymath Institute",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/cinematic-2026/global-horizon-1600.webp",
        width: 1600,
        height: 900,
        alt: "TGPI conceptual editorial image: planning an international next chapter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TGPI | The Global Polymath Institute",
    description:
      "Practical education, country intelligence and preparation for international life.",
    images: ["/images/cinematic-2026/global-horizon-1600.webp"],
  },
};

export default function HomePage() {
  return <><HomeStructuredData faq={HOME_FAQ} /><InstitutionalHome /></>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
