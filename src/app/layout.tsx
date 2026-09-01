import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import GlobalFooter from "@/components/GlobalFooter";
import { ClerkProvider } from "@clerk/nextjs";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";
import {
  absoluteUrl,
  publicRobots,
  TGPI_BRAND,
  TGPI_DEFAULT_TITLE,
  TGPI_DESCRIPTION,
  TGPI_SHORT_NAME,
  TGPI_SITE_NAME,
  TGPI_SITE_URL,
  TGPI_TITLE_TEMPLATE,
} from "@/seo";
import { founderName } from "@/seo/schemas/founder";

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
  metadataBase: new URL(TGPI_SITE_URL),
  title: {
    default: TGPI_DEFAULT_TITLE,
    template: TGPI_TITLE_TEMPLATE,
  },
  description: TGPI_DESCRIPTION,
  applicationName: TGPI_SITE_NAME,
  category: "education",
  creator: founderName,
  publisher: TGPI_SITE_NAME,
  authors: [{ name: founderName, url: absoluteUrl("/founder") }],
  robots: publicRobots,
  icons: {
    icon: TGPI_BRAND.crest,
    shortcut: TGPI_BRAND.crest,
    apple: TGPI_BRAND.crest,
  },
  openGraph: {
    title: TGPI_DEFAULT_TITLE,
    description: TGPI_DESCRIPTION,
    url: TGPI_SITE_URL,
    siteName: TGPI_SHORT_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl(TGPI_BRAND.defaultOgImage),
        width: 1200,
        height: 630,
        alt: "TGPI global education and country decision intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TGPI_DEFAULT_TITLE,
    description: TGPI_DESCRIPTION,
    images: [absoluteUrl(TGPI_BRAND.defaultOgImage)],
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
          <div id="main-content">{children}</div>
          <GlobalFooter />
        </ClerkProvider>
      </body>
    </html>
  );
}
