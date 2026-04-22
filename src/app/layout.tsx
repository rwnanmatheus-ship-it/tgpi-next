import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TGPI — Build Your Global Identity",
  description:
    "Prepare, connect and move across countries with intelligence using TGPI. Explore destinations, build your global identity and join a worldwide community.",
  keywords: [
    "move abroad",
    "live abroad",
    "study abroad",
    "work abroad",
    "global mobility",
    "immigration preparation",
    "countries guide",
    "international life",
    "expat platform",
    "global identity",
  ],
  openGraph: {
    title: "TGPI — Build Your Global Identity",
    description:
      "Explore countries, prepare your move and build your global identity.",
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
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}