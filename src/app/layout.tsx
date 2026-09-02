import "./globals.css";
import "./mobile.css";
import "./intelligence.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import GlobalFooter from "@/components/GlobalFooter";
import { ClerkProvider } from "@clerk/nextjs";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";
import MobileNavigation from "@/components/mobile/MobileNavigation";
import MobileContentFrame from "@/components/mobile/MobileContentFrame";

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
  description: "Prepare, compare and move globally with strategic clarity using TGPI — a premium education and decision system for international life.",
  keywords: ["move abroad", "global mobility", "international life", "country comparison", "cost of living", "learn languages", "global education", "international planning", "TGPI", "The Global Polymath Institute"],
  icons: {
    icon: "/brand/tgpi-crest-v2-256.png",
    shortcut: "/brand/tgpi-crest-v2-256.png",
    apple: "/brand/tgpi-crest-v2-256.png",
  },
  openGraph: {
    title: "TGPI — Build Your Global Identity",
    description: "Compare countries, build practical skills and prepare a global life with clarity.",
    url: "https://theglobalpolymath.com",
    siteName: "TGPI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TGPI — Build Your Global Identity",
    description: "Compare countries, build practical skills and prepare a global life with clarity.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${interfaceFont.variable}`}>
      <body>
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/"
          appearance={tgpiClerkAppearance}
        >
          <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-xl bg-[var(--tgpi-gold)] px-4 py-3 text-sm font-extrabold text-[var(--tgpi-navy-deep)] shadow-lg transition focus:not-sr-only">Skip to content</a>
          <Navbar />
          <MobileNavigation />
          <MobileContentFrame>{children}</MobileContentFrame>
          <GlobalFooter />
        </ClerkProvider>
      </body>
    </html>
  );
}
