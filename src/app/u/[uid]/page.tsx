import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Member profile — TGPI', robots: { index: false, follow: false } };
// Legacy entry point uses the same server-side visibility policy. Never read a
// complete Firebase users document into a public browser component.
export default async function LegacyProfile({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  redirect(`/member/${encodeURIComponent(uid)}`);
}
