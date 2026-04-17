import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TGPI",
  description: "The Global Polymath Institute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0b0f19] text-white antialiased">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f19]/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-wide text-white">
              TGPI
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link href="/" className="text-sm text-slate-300 transition hover:text-white">
                Home
              </Link>
              <Link
                href="/countries"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Countries
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                Profile
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/20"
              >
                Login
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-white/10 bg-[#0b0f19]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-white">
                The Global Polymath Institute
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                A premium platform for global preparation, language readiness,
                cultural integration, and international growth.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/countries"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Explore Countries
              </Link>
              <Link
                href="/login"
                className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
              >
                Access Platform
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}