import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import GlobalFooter from "@/components/GlobalFooter";
import HomeDecisionOS from "@/components/HomeDecisionOS";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-tgpi-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const interfaceFont = Manrope({
  subsets: ["latin"],
  variable: "--font-tgpi-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theglobalpolymath.com"),
  title: "TGPI — Build Your Global Identity",
  description:
    "Prepare, compare and move globally with strategic clarity using TGPI — a premium education and decision system for international life.",
  keywords: [
    "move abroad",
    "global mobility",
    "international life",
    "country comparison",
    "cost of living",
    "learn languages",
    "global education",
    "international planning",
    "TGPI",
    "The Global Polymath Institute",
  ],
  icons: {
    icon: "/brand/tgpi-crest.svg",
    shortcut: "/brand/tgpi-crest.svg",
    apple: "/brand/tgpi-crest.svg",
  },
  openGraph: {
    title: "TGPI — Build Your Global Identity",
    description:
      "Compare countries, build practical skills and prepare a global life with clarity.",
    url: "https://theglobalpolymath.com",
    siteName: "TGPI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${interfaceFont.variable}`}>
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-[var(--tgpi-gold)] px-4 py-3 text-sm font-extrabold text-[var(--tgpi-navy-deep)] shadow-lg transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="main-content">{children}</div>
        <HomeDecisionOS />
        <GlobalFooter />
      </body>
    </html>
  );
}
