import type { Metadata } from 'next';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { cache } from 'react';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { canViewTgpiProfile, normalizeTgpiAccountProfile } from '@/lib/account-profile';
import { memberLookup } from '@/lib/members/identity';
import { resolveMember } from '@/lib/members/identity.server';
import { buildPublicMember } from '@/lib/members/public-profile.server';
import PublicMemberView from '@/components/profile/PublicMemberView';
import PublicProfileShareButton from '@/components/profile/PublicProfileShareButton';
export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ userId: string }>; searchParams: Promise<{ preview?: string }> };
const load = cache(async (key: string) => {
  const viewer = await auth();
  const lookup = memberLookup(key);
  let uid: string | null = null;
  try {
    // Preserve old links. Never serialize the internal UID in a new public link.
    uid = key.startsWith('user_') && /^user_[a-zA-Z0-9]+$/.test(key) ? key : lookup ? await resolveMember(lookup.kind, lookup.key) : null;
    if (!uid) return null;
    const client = await clerkClient(); const user = await client.users.getUser(uid);
    const profile = normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile);
    if (!canViewTgpiProfile({ ownerId: uid, viewerId: viewer.userId, visibility: profile.privacy.visibility })) return null;
    return { member: await buildPublicMember(user), owner: viewer.userId === uid };
  } catch { return null; }
});
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).userId);
  return { title: data ? `${data.member.name} — TGPI member` : 'Member profile — TGPI', description: data?.member.bio || 'A privacy-controlled TGPI member identity.', robots: { index: Boolean(data?.member.indexable), follow: Boolean(data?.member.indexable) } };
}
export default async function PublicProfilePage({ params, searchParams }: Props) {
  const [{ userId }, query] = await Promise.all([params, searchParams]);
  const data = await load(userId); if (!data) notFound();
  if (userId.startsWith('user_') && data.member.handle) redirect(data.member.path);
  return <main className="tgpi-member-shell"><div className="mx-auto max-w-6xl">{data.owner ? <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-blue-50 p-4 text-sm text-slate-800"><p>Owner preview · These are the selected public fields. {data.member.visibility === 'private' ? 'Your profile is currently private.' : 'Privacy applies to every visit.'}</p><Link className="font-bold underline" href="/profile/security#settings-privacy">Manage privacy</Link></div> : null}<PublicMemberView member={data.member} />{query.preview !== '1' && data.member.visibility !== 'private' ? <div className="mt-5"><PublicProfileShareButton title={`${data.member.name} — TGPI`} url={data.member.path} /></div> : null}</div></main>;
}
