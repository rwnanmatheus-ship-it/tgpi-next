import { localizeMetadata } from "@/lib/localization/metadata.server";
import type { Metadata } from "next";
import CommunityApp from "@/components/community/CommunityApp";
const sourceMetadata: Metadata = {
  title: "Community | TGPI",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function CommunityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string; post?: string }>;
}) {
  const [{ slug }, { token, post }] = await Promise.all([params, searchParams]);
  return <CommunityApp id={slug} token={token || ""} post={post || ""} />;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
