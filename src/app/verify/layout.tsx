import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Verify TGPI credentials",
  description: "Check the authenticity and status of a TGPI credential using its verification code.",
  alternates: { canonical: "/verify" },
};

export default function VerifyLayout({ children }: { children: ReactNode }) {
  return children;
}
