import 'server-only';
import { createFirestoreUpdateWrite, getFirestoreDocument, isLearningStorageConfigured, runFirestoreTransaction } from '@/lib/firestore-admin-rest.server';
import { formatTgpiGlobalId } from '@/lib/auth/guards';
import { HANDLE_CHANGE_INTERVAL, handleError, normalizeHandle, type MemberIdentity } from './identity';
// These paths inherit the existing recursive deny rule on tgpiLearningUsers.
const directory = 'tgpiLearningUsers/_memberDirectory';
const identityPath = (uid: string) => `tgpiLearningUsers/${uid}/memberIdentity/current`;
type Reservation = { uid: string };
export class MemberInputError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
export async function getMemberIdentity(uid: string): Promise<MemberIdentity | null> {
  if (!isLearningStorageConfigured()) return null;
  return (await getFirestoreDocument<MemberIdentity>(identityPath(uid)))?.data ?? null;
}
export async function resolveMember(kind: 'handles' | 'numbers', key: string) {
  if (!isLearningStorageConfigured()) throw new MemberInputError('Member discovery is temporarily unavailable.', 503);
  return (await getFirestoreDocument<Reservation>(`${directory}/${kind}/${key}`))?.data.uid ?? null;
}
export async function claimMemberIdentity(uid: string, value: unknown, legacyUsername?: string | null) {
  const handle = normalizeHandle(value);
  const error = handleError(handle);
  if (error) throw new MemberInputError(error);
  if (!isLearningStorageConfigured()) throw new MemberInputError('Identity storage is temporarily unavailable. Your other account settings can still be saved.', 503);
  const number = formatTgpiGlobalId(uid);
  const legacyHandle = normalizeHandle(legacyUsername);
  const legacyPath = legacyHandle && !handleError(legacyHandle) ? `${directory}/handles/${legacyHandle}` : null;
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const ownerPath = identityPath(uid);
    const handlePath = `${directory}/handles/${handle}`;
    const numberPath = `${directory}/numbers/${number}`;
    const docs = await getDocuments<MemberIdentity & Reservation>([ownerPath, handlePath, numberPath, ...(legacyPath ? [legacyPath] : [])]);
    const previous = docs.get(ownerPath)?.data;
    if (docs.get(handlePath)?.data.uid && docs.get(handlePath)?.data.uid !== uid) throw new MemberInputError('This @ID is taken or permanently reserved.', 409);
    if (docs.get(numberPath)?.data.uid && docs.get(numberPath)?.data.uid !== uid) throw new MemberInputError('This member reference requires support review.', 409);
    if (previous?.handle === handle) return { result: previous, writes: [] };
    if (previous?.handle && Date.now() - Date.parse(previous.changedAt) < HANDLE_CHANGE_INTERVAL) throw new MemberInputError('You can change your @ID once every 30 days. Previous IDs remain reserved to you.', 429);
    const result: MemberIdentity = { handle, number, changedAt: new Date().toISOString() };
    return { result, writes: [
      createFirestoreUpdateWrite(ownerPath, result),
      createFirestoreUpdateWrite(handlePath, { uid }),
      createFirestoreUpdateWrite(numberPath, { uid }),
      ...(legacyPath && legacyPath !== handlePath && (!docs.get(legacyPath) || docs.get(legacyPath)?.data.uid === uid) ? [createFirestoreUpdateWrite(legacyPath, { uid })] : []),
    ] };
  });
}
export async function consumeMemberLookup(uid: string) {
  if (!isLearningStorageConfigured()) throw new MemberInputError('Member discovery is temporarily unavailable.', 503);
  const path = `tgpiLearningUsers/${uid}/memberLimits/search`;
  await runFirestoreTransaction(async ({ getDocuments }) => {
    const previous = (await getDocuments<{ startedAt: number; count: number }>([path])).get(path)?.data;
    const now = Date.now();
    const current = previous && now - previous.startedAt < 60_000 ? previous : { startedAt: now, count: 0 };
    if (current.count >= 15) throw new MemberInputError('Search limit reached. Try again in one minute.', 429);
    return { result: null, writes: [createFirestoreUpdateWrite(path, { ...current, count: current.count + 1 })] };
  });
}

export async function ensureMemberNumber(uid: string): Promise<MemberIdentity | null> {
  if (!isLearningStorageConfigured()) return null;
  const number = formatTgpiGlobalId(uid);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const ownerPath = identityPath(uid);
    const numberPath = `${directory}/numbers/${number}`;
    const docs = await getDocuments<MemberIdentity & Reservation>([ownerPath, numberPath]);
    const previous = docs.get(ownerPath)?.data;
    const reservation = docs.get(numberPath)?.data;
    if (reservation && reservation.uid !== uid) throw new MemberInputError('Member reference requires support review.', 409);
    if (previous && reservation) return { result: previous, writes: [] };
    const result = previous ?? { number, handle: '', changedAt: '' };
    return { result, writes: [createFirestoreUpdateWrite(ownerPath, result), createFirestoreUpdateWrite(numberPath, { uid })] };
  });
}
