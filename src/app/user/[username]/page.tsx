import { localizeMetadata } from "@/lib/localization/metadata.server";
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
const sourceMetadata: Metadata = { title: 'Member profile — TGPI', robots: { index: false, follow: false } };
export default async function LegacyUsernameProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  redirect(`/member/${encodeURIComponent(username.replace(/^@/, ''))}`);
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
