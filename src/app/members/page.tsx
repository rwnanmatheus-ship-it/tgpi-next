import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth/guards';
import MemberDirectory from '@/components/profile/MemberDirectory';
export const metadata: Metadata = { title: 'Find members — TGPI', robots: { index: false, follow: false } };
export default async function MembersPage() {
  await requireUser();
  return <main className="tgpi-member-shell"><div className="mx-auto max-w-3xl"><MemberDirectory /></div></main>;
}
