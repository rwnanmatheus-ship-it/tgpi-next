import type { Metadata } from "next";
import UpgradeStatusClient from "./UpgradeStatusClient";

export const metadata: Metadata = {
  title: "Checkout status — TGPI",
  robots: { index: false, follow: false },
};

type UpgradeSuccessPageProps = {
  searchParams: Promise<{ session_id?: string | string[] }>;
};

export default async function UpgradeSuccessPage({ searchParams }: UpgradeSuccessPageProps) {
  const params = await searchParams;
  const sessionId = Array.isArray(params.session_id) ? params.session_id[0] : params.session_id;
  return <UpgradeStatusClient sessionId={sessionId?.trim() || ""} />;
}
