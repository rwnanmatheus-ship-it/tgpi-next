import type { Metadata } from "next";
import type { ReactNode } from "react";
import { localizeMetadata } from "@/lib/localization/metadata.server";

const sourceMetadata: Metadata = {
  title: "Verify TGPI credentials",
  description: "Check the authenticity and status of a TGPI credential using its verification code.",
  alternates: { canonical: "/verify" },
};

export async function generateMetadata() {
  return localizeMetadata(sourceMetadata);
}

export default function VerifyLayout({ children }: { children: ReactNode }) {
  return children;
}
