import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ResponsivePreview from "@/components/mobile/ResponsivePreview";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "TGPI responsive verification", robots: { index: false, follow: false } };

export default function MobilePreviewPage() {
  if (process.env.NODE_ENV !== "development" && process.env.VERCEL_ENV !== "preview") notFound();
  return <ResponsivePreview />;
}
