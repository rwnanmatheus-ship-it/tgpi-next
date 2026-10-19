import { auth, clerkClient } from '@clerk/nextjs/server';
import { normalizeTgpiAccountProfile, canViewTgpiProfile } from '@/lib/account-profile';
import { memberLookup } from '@/lib/members/identity';
import { consumeMemberLookup, getMemberIdentity, resolveMember, MemberInputError } from '@/lib/members/identity.server';
const headers = { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie' };
export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Sign in to search members.' }, { status: 401, headers });
  const lookup = memberLookup(new URL(request.url).searchParams.get('q') || '');
  if (!lookup) return Response.json({ error: 'Enter an exact @ID or full TGPI number.' }, { status: 400, headers });
  try {
    await consumeMemberLookup(userId);
    const uid = await resolveMember(lookup.kind, lookup.key);
    if (!uid) return Response.json({ members: [] }, { headers });
    const client = await clerkClient();
    let member;
    try { member = await client.users.getUser(uid); } catch { return Response.json({ members: [] }, { headers }); }
    const profile = normalizeTgpiAccountProfile(member.unsafeMetadata.tgpiAccountProfile);
    if (!profile.privacy.discoverable || !canViewTgpiProfile({ ownerId: uid, viewerId: userId, visibility: profile.privacy.visibility })) return Response.json({ members: [] }, { headers });
    const identity = await getMemberIdentity(uid);
    if (!identity) return Response.json({ members: [] }, { headers });
    return Response.json({ members: [{ name: profile.displayName || member.fullName || 'TGPI member', avatar: member.imageUrl, handle: identity.handle, number: identity.number, path: `/member/${identity.number}` }] }, { headers });
  } catch (error) {
    return Response.json({ error: error instanceof MemberInputError ? error.message : 'Member search is temporarily unavailable.' }, { status: error instanceof MemberInputError ? error.status : 503, headers });
  }
}
