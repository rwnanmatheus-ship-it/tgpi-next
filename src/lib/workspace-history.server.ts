import 'server-only';
import { createHash } from 'node:crypto';
import { createFirestoreDeleteWrite, createFirestoreUpdateWrite, getFirestoreDocument, isLearningStorageConfigured, listFirestoreDocumentPage, runFirestoreTransaction, type TransactionContext } from '@/lib/firestore-admin-rest.server';
import type { ActivationActivity, TgpiActivationProgress } from '@/lib/activation-progress';
import { workspaceHistory } from '@/lib/workspace-control';
export type ArchivedWorkspaceEvent = ActivationActivity & { version: 1; source: 'activation_v1'; archivedAt: string };
export type WorkspaceHistoryPage = { events: ActivationActivity[]; cursor: string | null; coverageStartedAt: string | null; available: boolean; reconciliationPending: boolean };
type PendingHistory = { version: 1; events: ActivationActivity[]; preparedAt: string };
const fingerprint = (event: ActivationActivity) => createHash('sha256').update(JSON.stringify([event.id,event.occurredAt,event.type,event.href,event.title])).digest('hex');
const eventPath = (uid: string, event: ActivationActivity) => `tgpiLearningUsers/${uid}/workspaceHistory/${event.occurredAt.replace(/[^0-9]/g,'')}-${fingerprint(event).slice(0,24)}`;
const pendingPath = (uid: string, id: string) => `tgpiLearningUsers/${uid}/workspaceHistoryPending/${id}`;
export class WorkspaceHistoryUnavailableError extends Error {
  readonly status = 503;
  constructor() { super('Your progress was not changed because history could not be secured. Please retry.'); }
}

/** Preserve observed committed events and journal the new ones before changing Clerk. */
export async function prepareWorkspaceHistory(uid: string, current: TgpiActivationProgress, next: TgpiActivationProgress): Promise<string | null> {
  const observed = workspaceHistory(current);
  const known = new Set(observed.map(fingerprint));
  const events = workspaceHistory(next).filter(event => !known.has(fingerprint(event)));
  if (!events.length) return null;
  if (!isLearningStorageConfigured()) throw new WorkspaceHistoryUnavailableError();
  const id = createHash('sha256').update(events.map(fingerprint).sort().join(':')).digest('hex');
  try {
    await runFirestoreTransaction(async ({ getDocuments }) => {
      const coveragePath = `tgpiLearningUsers/${uid}/workspace/historyCoverage`;
      const existing = await getDocuments([...observed.map(event => eventPath(uid,event)), pendingPath(uid,id), coveragePath]);
      const now = new Date().toISOString();
      const writes = observed.filter(event => !existing.get(eventPath(uid,event))).map(event => createFirestoreUpdateWrite(eventPath(uid,event), { ...event, version: 1, source: 'activation_v1', archivedAt: now }));
      if (observed.length && !existing.get(coveragePath)) writes.push(createFirestoreUpdateWrite(coveragePath,{version:1,startedAt:now}));
      if (!existing.get(pendingPath(uid,id))) writes.push(createFirestoreUpdateWrite(pendingPath(uid,id),{version:1,events,preparedAt:now}));
      return {result:null,writes};
    });
    return id;
  } catch { throw new WorkspaceHistoryUnavailableError(); }
}

/** Called only after Clerk acknowledged the write, or after matching retained source evidence. */
export async function commitWorkspaceHistory(uid: string, id: string) {
  if (!/^[a-f0-9]{64}$/.test(id)) throw new Error('Invalid history receipt.');
  await runFirestoreTransaction(async ({ getDocuments }) => {
    const path = pendingPath(uid,id);
    const receipt = (await getDocuments<PendingHistory>([path])).get(path)?.data;
    if (!receipt) return { result:null,writes:[] };
    const coveragePath = `tgpiLearningUsers/${uid}/workspace/historyCoverage`;
    const existing = await getDocuments([...receipt.events.map(event => eventPath(uid,event)),coveragePath]);
    const now = new Date().toISOString();
    const writes = receipt.events.filter(event => !existing.get(eventPath(uid,event))).map(event => createFirestoreUpdateWrite(eventPath(uid,event),{...event,version:1,source:'activation_v1',archivedAt:now}));
    if (!existing.get(coveragePath)) writes.push(createFirestoreUpdateWrite(coveragePath,{version:1,startedAt:now}));
    // Acknowledging the queue never removes a historical event.
    writes.push(createFirestoreDeleteWrite(path));
    return { result:null,writes };
  });
}

/** Never replay a mutation or infer success from the current country/course state. */
export async function reconcileWorkspaceHistory(uid: string, progress: TgpiActivationProgress) {
  if (!isLearningStorageConfigured()) return;
  await archiveWorkspaceHistory(uid, progress);
  const observed = new Set(workspaceHistory(progress).map(fingerprint));
  let cursor: string | undefined;
  for (let pageIndex = 0; pageIndex < 3; pageIndex++) {
    const page = await listFirestoreDocumentPage<PendingHistory>(`tgpiLearningUsers/${uid}`,'workspaceHistoryPending',cursor);
    for (const row of page.items) {
      const receipt = row.data;
      if (receipt.version !== 1 || !receipt.events.length) continue;
      const proofs = await Promise.all(receipt.events.map(async event => observed.has(fingerprint(event)) || Boolean(await getFirestoreDocument(eventPath(uid,event)))));
      if (proofs.every(Boolean)) await commitWorkspaceHistory(uid,createHash('sha256').update(receipt.events.map(fingerprint).sort().join(':')).digest('hex'));
    }
    if (!page.nextPageToken) break;
    cursor = page.nextPageToken;
  }
}
/** Build archive writes that can commit with the progress snapshot. */
export async function workspaceHistoryWrites(
  uid: string,
  events: ActivationActivity[],
  { getDocuments }: TransactionContext,
) {
  if (!events.length) return [];
  const coveragePath = `tgpiLearningUsers/${uid}/workspace/historyCoverage`;
  const validEvents = events.filter(event => !event.href.startsWith('//'));
  if (!validEvents.length) return [];
  const rows = new Map(validEvents.map(event => [eventPath(uid, event), event]));
  const existing = await getDocuments([...rows.keys(), coveragePath]);
  const now = new Date().toISOString();
  const writes = [...rows].filter(([path]) => !existing.get(path))
    .map(([path, event]) => createFirestoreUpdateWrite(path, { ...event, version: 1, source: 'activation_v1', archivedAt: now } satisfies ArchivedWorkspaceEvent));
  if (!existing.get(coveragePath)) writes.push(createFirestoreUpdateWrite(coveragePath, { version: 1, startedAt: now }));
  return writes;
}

/** Only actual retained activation events are reconciled; current state is never fabricated into events. */
export async function archiveWorkspaceHistory(uid: string, progress: TgpiActivationProgress) {
  if (!isLearningStorageConfigured() || !progress.activities.length) return;
  await runFirestoreTransaction(async context => ({
    result: null,
    writes: await workspaceHistoryWrites(uid, workspaceHistory(progress), context),
  }));
}
export async function loadWorkspaceHistory(uid: string, cursor?: string): Promise<WorkspaceHistoryPage> {
  if (!isLearningStorageConfigured()) return { events: [], cursor:null, coverageStartedAt:null, available:false, reconciliationPending:false };
  const [page,coverage,pending] = await Promise.all([
    listFirestoreDocumentPage<ArchivedWorkspaceEvent>(`tgpiLearningUsers/${uid}`, 'workspaceHistory', cursor),
    getFirestoreDocument<{startedAt:string}>(`tgpiLearningUsers/${uid}/workspace/historyCoverage`),
    listFirestoreDocumentPage<PendingHistory>(`tgpiLearningUsers/${uid}`,'workspaceHistoryPending'),
  ]);
  return { events: page.items.map(item => item.data).filter(e => e.version === 1 && e.source === 'activation_v1'), cursor:page.nextPageToken, coverageStartedAt:coverage?.data.startedAt ?? null, available:true, reconciliationPending:pending.items.length > 0 };
}
