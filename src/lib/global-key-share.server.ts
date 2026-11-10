import "server-only";

import { createHash, randomBytes } from "node:crypto";
import {
  createFirestoreDeleteWrite,
  createFirestoreUpdateWrite,
  getFirestoreDocument,
  isLearningStorageConfigured,
  runFirestoreTransaction,
} from "@/lib/firestore-admin-rest.server";
import { isGlobalKeyProofReference } from "@/lib/certificate-reference";
import { GlobalKeyIntegrityError } from "@/lib/global-key-crypto";
import { canMutateGlobalKey, globalKeyLedgerPath } from "@/lib/global-key-ledger.server";
import {
  getGlobalKeyShareStatus,
  isGlobalKeyShareId,
  isGlobalKeyShareToken,
  type GlobalKeyShareDays,
  type GlobalKeyShareEntry,
} from "@/lib/global-key-share";
import { getOrCreateGlobalKey, verifyPublicGlobalKey } from "@/lib/global-key.server";
import type { GlobalKeyVerification } from "@/lib/global-key";

const MAX_ACTIVE_SHARES = 5;
const SHARE_HISTORY_LIMIT = 12;
const SHARE_COOLDOWN_MS = 30_000;

type ShareIndex = { entries: GlobalKeyShareEntry[] };
type ShareGrant = GlobalKeyShareEntry & { ownerUid: string; proof: string };

function ownerPath(uid: string) {
  return `tgpiLearningUsers/${uid}/globalIdentity/shares`;
}

function grantPath(id: string) {
  return `tgpiLearningUsers/_globalIdentity/verificationGrants/${id}`;
}

function tokenDigest(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function listGlobalKeyShares(uid: string) {
  const record = await getFirestoreDocument<ShareIndex>(ownerPath(uid));
  return record?.data.entries ?? [];
}

export async function createGlobalKeyShare(uid: string, days: GlobalKeyShareDays, expectedRevision: number) {
  if (!canMutateGlobalKey()) throw new GlobalKeyIntegrityError("Identity storage is temporarily unavailable.");
  const key = await getOrCreateGlobalKey(uid);
  if (key.revision !== expectedRevision) {
    throw new GlobalKeyIntegrityError("The identity revision changed. Refresh before creating a link.");
  }
  const token = `TGS1.${randomBytes(32).toString("base64url")}`;
  const id = tokenDigest(token);
  const indexPath = ownerPath(uid);
  const ledgerPath = globalKeyLedgerPath(uid);
  const entries = await runFirestoreTransaction(async ({ getDocuments }) => {
    const docs = await getDocuments<ShareIndex & { record?: { revision: number } }>([indexPath, ledgerPath]);
    const ledger = docs.get(ledgerPath);
    if (ledger && ledger.data.record?.revision !== key.revision) {
      throw new GlobalKeyIntegrityError("The identity revision changed. Refresh before creating a link.");
    }
    const previous = docs.get(indexPath)?.data.entries ?? [];
    const now = Date.now();
    if (previous[0] && now - Date.parse(previous[0].createdAt) < SHARE_COOLDOWN_MS) {
      throw new GlobalKeyIntegrityError("Wait 30 seconds before creating another link.");
    }
    const active = previous.filter(entry => getGlobalKeyShareStatus(entry, key.revision, now) === "active");
    if (active.length >= MAX_ACTIVE_SHARES) {
      throw new GlobalKeyIntegrityError("You can have up to five active verification links.");
    }
    const entry: GlobalKeyShareEntry = {
      id,
      revision: key.revision,
      createdAt: new Date(now).toISOString(),
      expiresAt: new Date(now + days * 86_400_000).toISOString(),
    };
    const inactive = previous.filter(entry => !active.includes(entry));
    const retained = inactive.slice(0, SHARE_HISTORY_LIMIT - active.length - 1);
    const next = [entry, ...active, ...retained].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return {
      result: next,
      writes: [
        createFirestoreUpdateWrite(indexPath, { entries: next }),
        createFirestoreUpdateWrite(grantPath(id), { ...entry, ownerUid: uid, proof: key.proof }, { exists: false }),
        ...inactive.slice(retained.length).map(item => createFirestoreDeleteWrite(grantPath(item.id))),
      ],
    };
  });
  return { id, token, entries };
}

export async function revokeGlobalKeyShare(uid: string, id: string) {
  if (!canMutateGlobalKey()) throw new GlobalKeyIntegrityError("Identity storage is temporarily unavailable.");
  if (!isGlobalKeyShareId(id)) throw new GlobalKeyIntegrityError("Invalid verification link.");
  const indexPath = ownerPath(uid);
  const path = grantPath(id);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const docs = await getDocuments<ShareIndex & ShareGrant>([indexPath, path]);
    const index = docs.get(indexPath)?.data.entries;
    const grant = docs.get(path)?.data;
    if (!index?.some(entry => entry.id === id) || grant?.ownerUid !== uid || grant.id !== id) {
      throw new GlobalKeyIntegrityError("Invalid verification link.");
    }
    if (grant.revokedAt) return { result: index, writes: [] };
    const revokedAt = new Date().toISOString();
    const entries = index.map(entry => entry.id === id ? { ...entry, revokedAt } : entry);
    return {
      result: entries,
      writes: [
        createFirestoreUpdateWrite(indexPath, { entries }),
        createFirestoreUpdateWrite(path, { ...grant, revokedAt }),
      ],
    };
  });
}

export async function verifyGlobalKeyShare(token: string): Promise<GlobalKeyVerification> {
  if (!isGlobalKeyShareToken(token)) return { status: "invalid" };
  if (!isLearningStorageConfigured()) return { status: "unavailable" };
  try {
    const id = tokenDigest(token);
    const grant = (await getFirestoreDocument<ShareGrant>(grantPath(id)))?.data;
    if (!grant || grant.id !== id || typeof grant.proof !== "string" || !isGlobalKeyProofReference(grant.proof)) {
      return { status: "invalid" };
    }
    const status = getGlobalKeyShareStatus(grant, grant.revision, Date.now());
    if (status !== "active") return { status };
    return await verifyPublicGlobalKey(grant.proof, "temporary");
  } catch (error) {
    console.error("Unable to verify a temporary Global ID link", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });
    return { status: "unavailable" };
  }
}
