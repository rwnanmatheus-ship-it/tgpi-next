import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Member profile — TGPI', robots: { index: false, follow: false } };
export default async function LegacyUsernameProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  redirect(`/member/${encodeURIComponent(username.replace(/^@/, ''))}`);
}
