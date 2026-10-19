import type { Metadata } from "next";
import InstitutionalHome from "@/components/home/v4/InstitutionalHome";
import HomeStructuredData from "@/components/home/HomeStructuredData";
import { HOME_FAQ } from "@/lib/home-content";

export const metadata: Metadata = {
  title: "TGPI — Compare Countries. Prepare Your Next Chapter.",
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
    title: "TGPI — Compare Countries. Prepare Your Next Chapter.",
    description:
      "Country intelligence, transparent comparison, document preparation and practical learning in one connected global decision system.",
    url: "https://theglobalpolymath.com",
    siteName: "TGPI — The Global Polymath Institute",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/home/editorial-v4/hero-desktop.webp",
        width: 1536,
        height: 1024,
        alt: "Planning an international next chapter with TGPI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TGPI — Compare Countries. Prepare Your Next Chapter.",
    description:
      "Compare countries, understand trade-offs and turn international ambition into a structured plan.",
  },
};

export default function HomePage() {
  return <><HomeStructuredData faq={HOME_FAQ} /><InstitutionalHome /></>;
}
