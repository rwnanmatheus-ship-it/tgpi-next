import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "The Global Polymath Institute",
  description:
    "A premium global platform for learning, cultural integration, and international preparation across countries.",
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