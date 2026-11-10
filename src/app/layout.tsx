import { localizeMetadata } from "@/lib/localization/metadata.server";
import { getSupplementalMessages } from "@/lib/localization/catalog.server";
import "./localization.css";
import { getLocale } from "@/lib/localization/server";
import { LocaleProvider, AccountLocaleSync, LocalizedText } from "@/components/localization/LocaleProvider";
import { enUS, ptBR, esES, frFR, deDE, itIT } from "@clerk/localizations";
import FunnelTelemetry from "@/components/analytics/FunnelTelemetry";
import GlobalProgressSync from "@/components/profile/GlobalProgressSync";
import "./globals.css";
import "./member-system.css";
import "./spatial-surfaces.css";
import "./capability-system.css";
import "./mobile.css";
import "./intelligence.css";
import "./navigation-system.css";
import "./app-system.css";
import "./institutional-navigation.css";
import "leaflet/dist/leaflet.css";
import "./country-studio.css";
import "./product-system.css";
import "./design-tokens.css";
import "./design-system.css";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import NotificationProvider from "@/components/notifications/NotificationProvider";
import Navbar from "@/components/Navbar";
import GlobalFooter from "@/components/GlobalFooter";
import { ClerkProvider } from "@clerk/nextjs";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";
import MobileNavigation from "@/components/mobile/MobileNavigation";
import MobileContentFrame from "@/components/mobile/MobileContentFrame";
import SuperAppLauncher from "@/components/super-app/SuperAppLauncher";
import TgpiAppRuntime from "@/components/app-runtime/TgpiAppRuntime";
import AccessAwareChrome from "@/components/auth/AccessAwareChrome";
import AtlasWidget from "@/components/atlas/AtlasWidget";

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

const sourceMetadata: Metadata = {
  metadataBase: new URL("https://www.theglobalpolymath.com"),
  applicationName: "TGPI",
  title: "TGPI | The Global Polymath Institute",
  description: "Prepare, compare and move globally with strategic clarity using TGPI — a premium education and decision system for international life.",
  keywords: ["move abroad", "global mobility", "international life", "country comparison", "cost of living", "learn languages", "global education", "international planning", "TGPI", "The Global Polymath Institute"],
  icons: {
    icon: { url: "/pwa/icon-512.png", sizes: "512x512", type: "image/png" },
    shortcut: "/pwa/icon-512.png",
    apple: "/pwa/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TGPI",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  openGraph: {
    title: "TGPI | The Global Polymath Institute",
    description: "Compare countries, build practical skills and prepare a global life with clarity.",
    url: "https://www.theglobalpolymath.com",
    siteName: "TGPI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TGPI | The Global Polymath Institute",
    description: "Compare countries, build practical skills and prepare a global life with clarity.",
  },
};

export async function generateMetadata(): Promise<Metadata> { return localizeMetadata(sourceMetadata); }

export const viewport: Viewport = {
  themeColor: "#061B33",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const clerkLocales = { en: enUS, "pt-BR": ptBR, es: esES, fr: frFR, de: deDE, it: itIT };
  return (
    <html lang={locale} translate="no" className={`${displayFont.variable} ${interfaceFont.variable}`}>
      <body>
        <LocaleProvider locale={locale} messages={await getSupplementalMessages(locale)}>
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/"
          localization={{
            ...clerkLocales[locale],
            signIn: { ...clerkLocales[locale].signIn, start: {
              ...clerkLocales[locale].signIn?.start,
              title: clerkLocales[locale].signIn?.start?.title?.replaceAll('{{applicationName}}', 'TGPI'),
              titleCombined: clerkLocales[locale].signIn?.start?.titleCombined?.replaceAll('{{applicationName}}', 'TGPI'),
              subtitle: clerkLocales[locale].signIn?.start?.subtitle?.replaceAll('{{applicationName}}', 'TGPI'),
            } },
            signUp: { ...clerkLocales[locale].signUp, start: {
              ...clerkLocales[locale].signUp?.start,
              subtitle: clerkLocales[locale].signUp?.start?.subtitle?.replaceAll('{{applicationName}}', 'TGPI'),
              subtitleCombined: clerkLocales[locale].signUp?.start?.subtitleCombined?.replaceAll('{{applicationName}}', 'TGPI'),
            } },
          }}
          appearance={tgpiClerkAppearance}
        >
          <AccountLocaleSync />
          <NotificationProvider>
          <GlobalProgressSync />
          {process.env.TGPI_FUNNEL_ANALYTICS_ENABLED === "true" ? <FunnelTelemetry /> : null}
          <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-xl bg-[var(--tgpi-gold)] px-4 py-3 text-sm font-extrabold text-[var(--tgpi-navy-deep)] shadow-lg transition focus:not-sr-only"><LocalizedText text="Skip to content" /></a>
          <AccessAwareChrome
            navigation={<><Navbar /><MobileNavigation /><SuperAppLauncher /></>}
            footer={<GlobalFooter />}
            runtime={<TgpiAppRuntime />}
          >
            <MobileContentFrame>{children}</MobileContentFrame>
          </AccessAwareChrome>
          <AtlasWidget />
          </NotificationProvider>
        </ClerkProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
