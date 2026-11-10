import 'server-only';
import { randomUUID } from 'node:crypto';
import { createFirestoreUpdateWrite, runFirestoreTransaction } from '@/lib/firestore-admin-rest.server';
import { PROVIDER_RESERVE_MICRO_USD } from '@/lib/wallet/policy';
import { AtlasError, sponsoredUnavailable, boundedHistory, ownedPath, type AtlasInput } from './contracts';

export const isSponsoredAtlas = () => process.env.TGPI_ATLAS_ACCESS_MODE === 'sponsored';

/** A verified, expiring grant; never mint wallet credits or assume a future renewal. */
export function sponsoredConfig(now = Date.now()) {
  const grant = process.env.TGPI_ATLAS_SPONSORED_GRANT || '';
  const cents = Number(process.env.TGPI_ATLAS_SPONSORED_CENTS);
  const expiresAt = Date.parse(process.env.TGPI_ATLAS_SPONSORED_EXPIRES_AT || '');
  if (!isSponsoredAtlas() || process.env.VERCEL_ENV !== 'production' ||
    process.env.TGPI_ATLAS_SPONSORED_POLICY_CONFIRMED !== 'true' ||
    !/^[a-zA-Z0-9_-]{1,80}$/.test(grant) || !Number.isSafeInteger(cents) || cents < 2 || cents > 100_000 ||
    !Number.isFinite(expiresAt) || expiresAt <= now) {
    throw new AtlasError(sponsoredUnavailable, 503);
  }
  return { grant, limitMicroUsd: cents * 10_000, expiresAt };
}

type MemberUsage = { day: string; count: number; lastAt: number; requests: string[] };
type GlobalUsage = { day: string; dailyMicroUsd: number; grants: Record<string, number> };
const GLOBAL_PATH = 'tgpiLearningUsers/_atlasSponsored/atlasBudget/current';

/** Fixed-size metadata only. Questions, answers and profile data never enter Firestore. */
export async function beginSponsoredTurn(userId: string, input: AtlasInput, dailyBudgetUsd: number) {
  ownedPath(userId, input.conversationId);
  if (userId.startsWith('_')) throw new AtlasError('Invalid account.', 400);
  if (!input.temporary) throw new AtlasError('Free access uses temporary conversations. Reload Atlas and try again.', 409);
  const history = boundedHistory([...input.history, { role: 'user', content: input.text }]);
  const memberPath = `tgpiLearningUsers/${userId}/atlasSponsored/current`;
  const token = randomUUID();
  return runFirestoreTransaction(async ({ getDocuments }) => {
    // Recheck expiry inside each transaction attempt, before reserving provider capacity.
    const now = Date.now();
    const config = sponsoredConfig(now);
    const day = new Date(now).toISOString().slice(0, 10);
    const dailyLimit = Math.floor(dailyBudgetUsd * 1_000_000);
    if (!Number.isSafeInteger(dailyLimit) || dailyLimit < PROVIDER_RESERVE_MICRO_USD) throw new AtlasError('Atlas spending limit is not configured.', 503);
    const docs = await getDocuments<MemberUsage | GlobalUsage>([memberPath, GLOBAL_PATH]);
    const oldMember = docs.get(memberPath)?.data as MemberUsage | undefined;
    const global = docs.get(GLOBAL_PATH)?.data as GlobalUsage | undefined;
    const member = oldMember?.day === day ? oldMember : { day, count: 0, lastAt: 0, requests: [] };
    const reserved = global?.grants?.[config.grant] ?? 0;
    const daily = global?.day === day ? global.dailyMicroUsd : 0;
    if (![member.count, member.lastAt, reserved, daily].every(value => Number.isSafeInteger(value) && value >= 0) || !Array.isArray(member.requests)) throw new AtlasError('Atlas usage accounting is unavailable.', 503);
    if (member.requests.includes(input.requestId)) throw new AtlasError('This request was already accepted. Start a new request.', 409);
    if (member.count >= 10 || now - member.lastAt < 4000) throw new AtlasError('Atlas request limit reached. Up to 10 requests per UTC day are available during validation.', 429);
    if (daily + PROVIDER_RESERVE_MICRO_USD > dailyLimit || reserved + PROVIDER_RESERVE_MICRO_USD > config.limitMicroUsd) throw new AtlasError('Atlas free allowance is currently exhausted. No credits were charged.', 429);
    const grants = { ...global?.grants, [config.grant]: reserved + PROVIDER_RESERVE_MICRO_USD };
    // Retain grant totals to prevent accidental reuse of an old grant resetting its cap.
    if (Object.keys(grants).length > 120) throw new AtlasError('Atlas grant accounting requires maintenance.', 503);
    return { result: { replay: null, token, history }, writes: [
      createFirestoreUpdateWrite(memberPath, { day, count: member.count + 1, lastAt: now, requests: [...member.requests, input.requestId] }),
      createFirestoreUpdateWrite(GLOBAL_PATH, { day, dailyMicroUsd: daily + PROVIDER_RESERVE_MICRO_USD, grants }),
    ] };
  });
}
