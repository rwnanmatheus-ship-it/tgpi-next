import { auth, clerkClient } from '@clerk/nextjs/server';
import { claimMemberIdentity, ensureMemberNumber, MemberInputError } from '@/lib/members/identity.server';
import { isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
const headers = { 'Cache-Control': 'private, no-store' };
export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Sign in to manage your identity.' }, { status: 401, headers });
  try { return Response.json({ identity: await ensureMemberNumber(userId), available: isLearningStorageConfigured() }, { headers }); }
  catch { return Response.json({ error: 'Unable to load your member identity.' }, { status: 503, headers }); }
}
export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Sign in to manage your identity.' }, { status: 401, headers });
  if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) return Response.json({ error: 'Request not allowed.' }, { status: 403, headers });
  try {
    const text = await request.text();
    if (text.length > 500) return Response.json({ error: 'Identity request is too large.' }, { status: 413, headers });
    const body: unknown = JSON.parse(text);
    const handle = body && typeof body === 'object' && 'handle' in body ? body.handle : null;
    const { normalizeHandle, handleError } = await import('@/lib/members/identity');
    const normalized = normalizeHandle(handle);
    const validation = handleError(normalized);
    if (validation) return Response.json({ error: validation }, { status: 400, headers });
    const client = await clerkClient();
    const [owner, existing] = await Promise.all([client.users.getUser(userId), client.users.getUserList({ username: [normalized], limit: 1 })]);
    if (existing.data.some(user => user.id !== userId)) return Response.json({ error: 'This ID is already associated with a TGPI member.' }, { status: 409, headers });
    return Response.json({ identity: await claimMemberIdentity(userId, normalized, owner.username) }, { headers });
  } catch (error) {
    return Response.json({ error: error instanceof MemberInputError ? error.message : 'Unable to save your ID. Please retry.' }, { status: error instanceof MemberInputError ? error.status : error instanceof SyntaxError ? 400 : 503, headers });
  }
}
