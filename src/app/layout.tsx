import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Global Polymath Institute",
  description:
    "A global system to live, work, and integrate anywhere in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0b0f19] text-white antialiased">
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-yellow-500/30 bg-yellow-500/10 text-lg text-yellow-400">
                🌍
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
                  TGPI
                </div>
                <div className="text-sm text-white/90">
                  The Global Polymath Institute
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              <a href="/" className="text-sm text-slate-300 transition hover:text-yellow-400">
                Home
              </a>
              <a href="/countries" className="text-sm text-slate-300 transition hover:text-yellow-400">
                Countries
              </a>
              <a href="/dashboard" className="text-sm text-slate-300 transition hover:text-yellow-400">
                Dashboard
              </a>
              <a href="/profile" className="text-sm text-slate-300 transition hover:text-yellow-400">
                Profile
              </a>
              <a href="/login" className="text-sm text-slate-300 transition hover:text-yellow-400">
                Login
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="/countries"
                className="hidden rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/10 md:inline-flex"
              >
                Explore
              </a>
              <a
                href="/login"
                className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
              >
                Start Now
              </a>
            </div>
          </div>
        </header>

        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}