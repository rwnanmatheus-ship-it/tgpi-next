import 'server-only';

import {
  createFirestoreUpdateWrite,
  getFirestoreDocument,
  isLearningStorageConfigured,
  runFirestoreTransaction,
} from '@/lib/firestore-admin-rest.server';
import { emptyExecution, updatePlanExecution, type PlanExecution, type PlanExecutionMutation } from '@/lib/plan-execution';

const documentPath = (uid: string) => `tgpiLearningUsers/${uid}/workspace/personalPlanExecution`;

export async function loadPlanExecution(uid: string) {
  if (!isLearningStorageConfigured()) return null;
  try {
    const record = await getFirestoreDocument<PlanExecution>(documentPath(uid));
    return record?.data ?? emptyExecution();
  } catch {
    return null;
  }
}

export async function savePlanExecution(uid: string, mutation: PlanExecutionMutation) {
  const path = documentPath(uid);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const record = (await getDocuments<PlanExecution>([path])).get(path);
    const outcome = updatePlanExecution(record?.data ?? emptyExecution(), mutation);
    return {
      result: outcome,
      writes: outcome.result === 'saved'
        ? [createFirestoreUpdateWrite(path, outcome.state, record?.updateTime ? { updateTime: record.updateTime } : { exists: false })]
        : [],
    };
  });
}
