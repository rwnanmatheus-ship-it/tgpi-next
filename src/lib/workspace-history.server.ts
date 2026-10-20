import 'server-only';
import { createHash } from 'node:crypto';
import { createFirestoreUpdateWrite, getFirestoreDocument, isLearningStorageConfigured, listFirestoreDocumentPage, runFirestoreTransaction } from '@/lib/firestore-admin-rest.server';
import type { ActivationActivity, TgpiActivationProgress } from '@/lib/activation-progress';
import { workspaceHistory } from '@/lib/workspace-control';
export type ArchivedWorkspaceEvent = ActivationActivity & { version: 1; source: 'activation_v1'; archivedAt: string };
export type WorkspaceHistoryPage = { events: ActivationActivity[]; cursor: string | null; coverageStartedAt: string | null; available: boolean };
/** Only actual retained activation events are reconciled; current state is never fabricated into events. */
export async function archiveWorkspaceHistory(uid: string, progress: TgpiActivationProgress) {
  if (!isLearningStorageConfigured()) return;
  const events = workspaceHistory(progress);
  if (!events.length) return;
  const coveragePath = `tgpiLearningUsers/${uid}/workspace/historyCoverage`;
  const rows = events.map(event => {
    const digest = createHash('sha256').update(JSON.stringify([event.id,event.occurredAt,event.type,event.href,event.title])).digest('hex').slice(0,24);
    return { event, path: `tgpiLearningUsers/${uid}/workspaceHistory/${event.occurredAt.replace(/[^0-9]/g,'')}-${digest}` };
  });
  await runFirestoreTransaction(async ({ getDocuments }) => {
    const existing = await getDocuments([...rows.map(row => row.path), coveragePath]);
    const now = new Date().toISOString();
    const writes = rows.filter(row => !existing.get(row.path)).map(({event,path}) => createFirestoreUpdateWrite(path, { ...event, version: 1, source: 'activation_v1', archivedAt: now } satisfies ArchivedWorkspaceEvent));
    if (!existing.get(coveragePath)) writes.push(createFirestoreUpdateWrite(coveragePath, { version:1, startedAt: now }));
    return { result: null, writes };
  });
}
export async function loadWorkspaceHistory(uid: string, cursor?: string): Promise<WorkspaceHistoryPage> {
  if (!isLearningStorageConfigured()) return { events: [], cursor:null, coverageStartedAt:null, available:false };
  const [page,coverage] = await Promise.all([
    listFirestoreDocumentPage<ArchivedWorkspaceEvent>(`tgpiLearningUsers/${uid}`, 'workspaceHistory', cursor),
    getFirestoreDocument<{startedAt:string}>(`tgpiLearningUsers/${uid}/workspace/historyCoverage`),
  ]);
  return { events: page.items.map(item => item.data).filter(e => e.version === 1 && e.source === 'activation_v1'), cursor:page.nextPageToken, coverageStartedAt:coverage?.data.startedAt ?? null, available:true };
}
