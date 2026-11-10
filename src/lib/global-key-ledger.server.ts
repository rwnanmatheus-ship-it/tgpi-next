import "server-only";

import {
  createFirestoreUpdateWrite,
  getFirestoreDocument,
  getFirestoreDocuments,
  isLearningStorageConfigured,
  runFirestoreTransaction,
} from "@/lib/firestore-admin-rest.server";
import { normalizeGlobalKeyAnchorRecord } from "@/lib/global-key-anchor";
import { GlobalKeyIntegrityError, normalizeGlobalKeyRecord } from "@/lib/global-key-crypto";
import {
  TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY,
  TGPI_GLOBAL_KEY_METADATA_KEY,
  type TgpiGlobalKeyAnchorRecord,
  type TgpiGlobalKeyRecord,
} from "@/lib/global-key";

export type GlobalKeyLedger = {
  record: TgpiGlobalKeyRecord;
  anchor: TgpiGlobalKeyAnchorRecord | null;
};

type StoredLedger = { record?: unknown; anchor?: unknown };

export function canMutateGlobalKey() {
  return process.env.VERCEL_ENV !== "preview" && isLearningStorageConfigured();
}

function requireIdentityStorage() {
  if (!isLearningStorageConfigured()) {
    throw new GlobalKeyIntegrityError("Identity storage is temporarily unavailable.");
  }
}

export function globalKeyLedgerPath(uid: string) {
  return `tgpiLearningUsers/${uid}/globalIdentity/ledger`;
}

function receiptPath(uid: string, revision: number) {
  return `tgpiLearningUsers/${uid}/globalIdentityReceipts/${revision}`;
}

function readLedger(
  metadata: Record<string, unknown>,
  stored?: StoredLedger,
): GlobalKeyLedger | null {
  const value = stored ? stored.record : metadata[TGPI_GLOBAL_KEY_METADATA_KEY];
  if (!stored && value === undefined) return null;
  const record = normalizeGlobalKeyRecord(value);
  if (!record) {
    throw new GlobalKeyIntegrityError("The existing Global Key record requires an integrity review.");
  }
  const anchor = normalizeGlobalKeyAnchorRecord(
    stored ? stored.anchor : metadata[TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY],
  );
  return { record, anchor };
}

export async function loadGlobalKeyLedger(uid: string, metadata: Record<string, unknown>) {
  requireIdentityStorage();
  const stored = await getFirestoreDocument<StoredLedger>(globalKeyLedgerPath(uid));
  return readLedger(metadata, stored?.data);
}

/** One bounded Firestore batch read per page of Clerk accounts. */
export async function loadGlobalKeyLedgerPage(uids: string[]) {
  const stored = isLearningStorageConfigured()
    ? await getFirestoreDocuments<StoredLedger>(uids.map(globalKeyLedgerPath))
    : null;
  return (uid: string, metadata: Record<string, unknown>) =>
    readLedger(metadata, stored?.get(globalKeyLedgerPath(uid))?.data);
}

export async function loadGlobalKeyReceipt(uid: string, revision: number) {
  if (!isLearningStorageConfigured()) return null;
  const stored = await getFirestoreDocument<unknown>(receiptPath(uid, revision));
  return normalizeGlobalKeyAnchorRecord(stored?.data);
}

/** A missing document can import Clerk V1. A failed read must never fall back. */
export async function updateGlobalKeyLedger<T>(
  uid: string,
  metadata: Record<string, unknown>,
  update: (ledger: GlobalKeyLedger | null) => { next?: GlobalKeyLedger; historicalReceipt?: TgpiGlobalKeyAnchorRecord; result: T },
) {
  if (!canMutateGlobalKey()) {
    throw new GlobalKeyIntegrityError("Identity storage is temporarily unavailable.");
  }
  const path = globalKeyLedgerPath(uid);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const stored = (await getDocuments<StoredLedger>([path])).get(path);
    const ledger = readLedger(metadata, stored?.data);
    const { next, historicalReceipt, result } = update(ledger);
    if (!next) {
      if (!historicalReceipt) return { result, writes: [] };
      const archive = receiptPath(uid, historicalReceipt.revision);
      const receipts = await getDocuments<unknown>([archive]);
      return {
        result,
        writes: receipts.get(archive) ? [] : [createFirestoreUpdateWrite(archive, historicalReceipt, { exists: false })],
      };
    }

    const writes = [createFirestoreUpdateWrite(path, next)];
    const previousReceipt = !stored ? ledger?.anchor : null;
    if (previousReceipt && previousReceipt.revision !== next.anchor?.revision) {
      writes.push(createFirestoreUpdateWrite(receiptPath(uid, previousReceipt.revision), previousReceipt));
    }
    if (next.anchor && (!stored || next.anchor !== ledger?.anchor)) {
      writes.push(createFirestoreUpdateWrite(receiptPath(uid, next.anchor.revision), next.anchor));
    }
    return { result, writes };
  });
}
