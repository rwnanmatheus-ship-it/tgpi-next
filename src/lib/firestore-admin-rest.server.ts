import "server-only";

import { createSign } from "node:crypto";

type JsonPrimitive = boolean | number | string | null;
export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue | undefined };

type FirestoreValue = {
  arrayValue?: { values?: FirestoreValue[] };
  booleanValue?: boolean;
  doubleValue?: number;
  integerValue?: string;
  mapValue?: { fields?: Record<string, FirestoreValue> };
  nullValue?: null;
  stringValue?: string;
  timestampValue?: string;
};

type FirestoreDocument = {
  createTime?: string;
  fields?: Record<string, FirestoreValue>;
  name: string;
  updateTime?: string;
};

export type FirestoreDecodedDocument<T> = {
  createTime?: string;
  data: T;
  name: string;
  updateTime?: string;
};

export type FirestoreWrite = {
  currentDocument?: { exists?: boolean; updateTime?: string };
  update: FirestoreDocument;
};

type TransactionContext = {
  getDocuments: <T>(
    documentPaths: string[],
  ) => Promise<Map<string, FirestoreDecodedDocument<T> | null>>;
};

type TransactionPlan<T> = {
  result: T;
  writes: FirestoreWrite[];
};

const FIRESTORE_AUDIENCE = "https://firestore.googleapis.com/";
const MAX_TRANSACTION_ATTEMPTS = 3;

let cachedJwt: { expiresAt: number; token: string } | null = null;

export class FirestoreAdminError extends Error {
  readonly code?: string;
  readonly status: number;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.code = code;
    this.name = "FirestoreAdminError";
    this.status = status;
  }
}

function getConfig() {
  return {
    clientEmail: process.env.TGPI_FIREBASE_CLIENT_EMAIL?.trim() || "",
    privateKey:
      process.env.TGPI_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n").trim() ||
      "",
    projectId: process.env.TGPI_FIREBASE_PROJECT_ID?.trim() || "tgpi-next",
  };
}

export function isLearningStorageConfigured() {
  const config = getConfig();
  return Boolean(
    config.clientEmail &&
      config.privateKey &&
      config.projectId &&
      process.env.TGPI_LEARNING_SECURITY_RULES_CONFIRMED === "true",
  );
}

function base64Url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function getServiceAccountJwt() {
  if (cachedJwt && cachedJwt.expiresAt > Date.now() + 60_000) {
    return cachedJwt.token;
  }

  const config = getConfig();
  if (!config.clientEmail || !config.privateKey) {
    throw new FirestoreAdminError(
      "TGPI learning storage is not configured.",
      503,
      "STORAGE_NOT_CONFIGURED",
    );
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + 50 * 60;
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      aud: FIRESTORE_AUDIENCE,
      exp: expiresAt,
      iat: issuedAt,
      iss: config.clientEmail,
      sub: config.clientEmail,
    }),
  );
  const unsignedToken = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(config.privateKey).toString("base64url");
  const token = `${unsignedToken}.${signature}`;

  cachedJwt = { expiresAt: expiresAt * 1000, token };
  return token;
}

function databaseName() {
  return `projects/${getConfig().projectId}/databases/(default)`;
}

function apiUrl(path: string) {
  return `https://firestore.googleapis.com/v1/${databaseName()}${path}`;
}

function safeDocumentPath(path: string) {
  const segments = path.split("/").filter(Boolean);
  if (!segments.length || segments.some((segment) => segment === "." || segment === "..")) {
    throw new FirestoreAdminError("Firestore document path is invalid.", 500);
  }
  return segments.map(encodeURIComponent).join("/");
}

export function firestoreDocumentName(path: string) {
  return `${databaseName()}/documents/${safeDocumentPath(path)}`;
}

function encodeValue(value: JsonValue | undefined): FirestoreValue | undefined {
  if (value === undefined) return undefined;
  if (value === null) return { nullValue: null };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new FirestoreAdminError("Firestore numbers must be finite.", 500);
    }
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (typeof value === "string") return { stringValue: value };
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value
          .map((item) => encodeValue(item))
          .filter((item): item is FirestoreValue => Boolean(item)),
      },
    };
  }

  return {
    mapValue: {
      fields: encodeFirestoreFields(value),
    },
  };
}

function decodeValue(value: FirestoreValue): JsonValue {
  if ("nullValue" in value) return null;
  if (typeof value.booleanValue === "boolean") return value.booleanValue;
  if (typeof value.integerValue === "string") return Number(value.integerValue);
  if (typeof value.doubleValue === "number") return value.doubleValue;
  if (typeof value.stringValue === "string") return value.stringValue;
  if (typeof value.timestampValue === "string") return value.timestampValue;
  if (value.arrayValue) {
    return (value.arrayValue.values || []).map(decodeValue);
  }
  if (value.mapValue) return decodeFirestoreFields(value.mapValue.fields || {});
  return null;
}

export function encodeFirestoreFields(
  data: { [key: string]: JsonValue | undefined },
) {
  return Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [key, encodeValue(value)] as const)
      .filter((entry): entry is readonly [string, FirestoreValue] =>
        Boolean(entry[1]),
      ),
  );
}

function decodeFirestoreFields(fields: Record<string, FirestoreValue>) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]),
  ) as { [key: string]: JsonValue };
}

function decodeDocument<T>(document: FirestoreDocument) {
  return {
    createTime: document.createTime,
    data: decodeFirestoreFields(document.fields || {}) as T,
    name: document.name,
    updateTime: document.updateTime,
  } satisfies FirestoreDecodedDocument<T>;
}

async function firestoreFetch(path: string, init: RequestInit = {}) {
  const response = await fetch(apiUrl(path), {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getServiceAccountJwt()}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  if (response.ok) return response;

  let message = `Firestore request failed with status ${response.status}.`;
  let code: string | undefined;
  try {
    const payload = (await response.json()) as {
      error?: { message?: string; status?: string };
    };
    message = payload.error?.message || message;
    code = payload.error?.status;
  } catch {
    // Preserve the safe fallback message when the response is not JSON.
  }

  throw new FirestoreAdminError(message, response.status, code);
}

export function createFirestoreUpdateWrite(
  path: string,
  data: { [key: string]: JsonValue | undefined },
  currentDocument?: { exists?: boolean; updateTime?: string },
): FirestoreWrite {
  return {
    currentDocument,
    update: {
      fields: encodeFirestoreFields(data),
      name: firestoreDocumentName(path),
    },
  };
}

export async function getFirestoreDocument<T>(path: string) {
  try {
    const response = await firestoreFetch(
      `/documents/${safeDocumentPath(path)}`,
    );
    return decodeDocument<T>((await response.json()) as FirestoreDocument);
  } catch (error) {
    if (error instanceof FirestoreAdminError && error.status === 404) return null;
    throw error;
  }
}

export async function listFirestoreDocuments<T>(
  parentPath: string,
  collectionId: string,
  pageSize = 50,
) {
  const parent = parentPath ? `/${safeDocumentPath(parentPath)}` : "";
  const response = await firestoreFetch(
    `/documents${parent}/${encodeURIComponent(collectionId)}?pageSize=${Math.min(Math.max(pageSize, 1), 100)}`,
  );
  const payload = (await response.json()) as {
    documents?: FirestoreDocument[];
  };
  return (payload.documents || []).map(decodeDocument<T>);
}

export async function runFirestoreQuery<T>(structuredQuery: object) {
  const response = await firestoreFetch("/documents:runQuery", {
    body: JSON.stringify({ structuredQuery }),
    method: "POST",
  });
  const payload = (await response.json()) as Array<{
    document?: FirestoreDocument;
  }>;
  return payload
    .filter(
      (item): item is { document: FirestoreDocument } => Boolean(item.document),
    )
    .map((item) => decodeDocument<T>(item.document));
}

async function beginTransaction() {
  const response = await firestoreFetch("/documents:beginTransaction", {
    body: JSON.stringify({ options: { readWrite: {} } }),
    method: "POST",
  });
  const payload = (await response.json()) as { transaction: string };
  return payload.transaction;
}

async function getDocumentsInTransaction<T>(
  documentPaths: string[],
  transaction: string,
) {
  const response = await firestoreFetch("/documents:batchGet", {
    body: JSON.stringify({
      documents: documentPaths.map(firestoreDocumentName),
      transaction,
    }),
    method: "POST",
  });
  const payload = (await response.json()) as Array<{
    found?: FirestoreDocument;
    missing?: string;
  }>;
  const result = new Map<string, FirestoreDecodedDocument<T> | null>();

  documentPaths.forEach((path) => result.set(path, null));
  payload.forEach((item) => {
    const name = item.found?.name || item.missing;
    if (!name) return;
    const path = documentPaths.find(
      (candidate) => firestoreDocumentName(candidate) === name,
    );
    if (!path) return;
    result.set(path, item.found ? decodeDocument<T>(item.found) : null);
  });
  return result;
}

async function commitTransaction(transaction: string, writes: FirestoreWrite[]) {
  await firestoreFetch("/documents:commit", {
    body: JSON.stringify({ transaction, writes }),
    method: "POST",
  });
}

async function rollbackTransaction(transaction: string) {
  try {
    await firestoreFetch("/documents:rollback", {
      body: JSON.stringify({ transaction }),
      method: "POST",
    });
  } catch {
    // A rollback is best-effort after the original transaction has failed.
  }
}

export async function runFirestoreTransaction<T>(
  buildPlan: (context: TransactionContext) => Promise<TransactionPlan<T>>,
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_TRANSACTION_ATTEMPTS; attempt += 1) {
    const transaction = await beginTransaction();
    try {
      const plan = await buildPlan({
        getDocuments: <TDocument>(paths: string[]) =>
          getDocumentsInTransaction<TDocument>(paths, transaction),
      });
      await commitTransaction(transaction, plan.writes);
      return plan.result;
    } catch (error) {
      lastError = error;
      await rollbackTransaction(transaction);
      const retryable =
        error instanceof FirestoreAdminError && error.code === "ABORTED";
      if (!retryable || attempt === MAX_TRANSACTION_ATTEMPTS) throw error;
    }
  }

  throw lastError;
}
