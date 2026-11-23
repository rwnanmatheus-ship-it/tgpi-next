import AppearanceProvider from "@/components/profile/AppearanceProvider";
import { appearanceBootstrap, themeColors } from "@/lib/appearance";
import DisplayPreferencesSync from "@/components/profile/DisplayPreferencesSync";
import { localizeMetadata } from "@/lib/localization/metadata.server";
import { getSupplementalMessages } from "@/lib/localization/catalog.server";
import "./localization.css";
import { getLocale } from "@/lib/localization/server";
import { LocaleProvider, AccountLocaleSync } from "@/components/localization/LocaleProvider";
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
import "./surface-system.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
import SkipToContent from "@/components/accessibility/SkipToContent";

const displayFont = localFont({
  src: "./fonts/instrument-sans-variable.woff2",
  variable: "--font-tgpi-display",
  weight: "400 700",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
  display: "swap",
});

const interfaceFont = localFont({
  src: "./fonts/geist-variable.woff2",
  variable: "--font-tgpi-sans",
  weight: "100 900",
  display: "swap",
});

const credentialFont = localFont({
  src: "./fonts/cormorant-garamond-variable.woff2",
  variable: "--font-tgpi-credential",
  weight: "500 700",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

const sourceMetadata: Metadata = {
  metadataBase: new URL("https://www.theglobalpolymath.com"),
  applicationName: "TGPI",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
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
  alternates: { types: { "application/rss+xml": "https://www.theglobalpolymath.com/feed.xml" } },
  other: {
    "mobile-web-app-capable": "yes",
  },
  openGraph: {
    title: "TGPI | The Global Polymath Institute",
    description: "Compare countries, build practical skills and prepare a global life with clarity.",
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
  themeColor: themeColors.light,
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const clerkLocales = { en: enUS, "pt-BR": ptBR, es: esES, fr: frFR, de: deDE, it: itIT };
  return (
    <html lang={locale} translate="no" suppressHydrationWarning className={`${displayFont.variable} ${interfaceFont.variable} ${credentialFont.variable}`}>
      <head>
        {/* Execute synchronously before any visible content is rendered. */}
        <script id="tgpi-appearance" dangerouslySetInnerHTML={{ __html: appearanceBootstrap }} />
      </head>
      <body>
        <LocaleProvider locale={locale} messages={await getSupplementalMessages(locale)}>
        <AppearanceProvider>
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/"
          localization={{
            ...clerkLocales[locale],
            formFieldInputPlaceholder__signUpPassword:
              clerkLocales[locale].formFieldInputPlaceholder__signUpPassword ?? {
                en: "Create a password",
                "pt-BR": "Crie uma senha",
                es: "Crea una contraseña",
                fr: "Créez un mot de passe",
                de: "Erstellen Sie ein Passwort",
                it: "Crea una password",
              }[locale],
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
          <DisplayPreferencesSync />
          <NotificationProvider>
          <GlobalProgressSync />
          {process.env.TGPI_FUNNEL_ANALYTICS_ENABLED === "true" ? <FunnelTelemetry /> : null}
          <SkipToContent />
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
        </AppearanceProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
