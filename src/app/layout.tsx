import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
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
  openGraph: {
    title: "TGPI — Build Your Global Identity",
    description:
      "Compare countries, build practical skills and prepare a global life with clarity.",
    url: "https://theglobalpolymath.com",
    siteName: "TGPI",
    images: [
      {
        url: "https://theglobalpolymath.com/og-image.png",
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
    <html lang="en">
      <body className="bg-[#F7F3EA] text-[#111827] antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
