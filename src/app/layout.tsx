import BrandSeal from "@/components/BrandSeal";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Global Polymath Institute",
    template: "%s | The Global Polymath Institute",
  },
  description:
    "A premium global platform for learning, cultural integration, country readiness, and international preparation across the world.",
  applicationName: "The Global Polymath Institute",
  keywords: [
    "global education",
    "country readiness",
    "international preparation",
    "travel learning",
    "culture",
    "language",
    "premium learning platform",
    "TGPI",
  ],
  authors: [{ name: "The Global Polymath Institute" }],
  creator: "The Global Polymath Institute",
  publisher: "The Global Polymath Institute",
  metadataBase: new URL("https://theglobalpolymath.com"),
  openGraph: {
    title: "The Global Polymath Institute",
    description:
      "A premium global platform for learning, cultural integration, and international preparation across countries.",
    url: "https://theglobalpolymath.com",
    siteName: "The Global Polymath Institute",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Global Polymath Institute",
    description:
      "A premium global platform for learning, cultural integration, and international preparation across countries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0b0f19] text-white antialiased">
        <Navbar />

        {children}

        <footer className="mt-20 border-t border-white/10 bg-[#0b0f19]">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
              <div>
                <p className="text-lg font-semibold text-white">
                  The Global Polymath Institute
                </p>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                  A premium global platform for language readiness, cultural
                  integration, country exploration, and international preparation.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    Home
                  </Link>

                  <Link
                    href="/countries"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    Countries
                  </Link>

                  <Link
                    href="/courses"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    Courses
                  </Link>

                  <Link
                    href="/dashboard"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/ranking"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    Ranking
                  </Link>

                  <Link
                    href="/profile"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    Profile
                  </Link>

                  <Link
                    href="/premium"
                    className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
                  >
                    Go Premium
                  </Link>
                </div>
              </div>

              <div className="flex justify-start lg:justify-end">
                <BrandSeal />
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}