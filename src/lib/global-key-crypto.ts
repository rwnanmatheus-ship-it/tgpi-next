import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  hkdfSync,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import {
  TGPI_GLOBAL_KEY_SCHEMA_VERSION,
  type GlobalKeyEventType,
  type GlobalKeySlot,
  type TgpiGlobalKeyEvent,
  type TgpiGlobalKeyRecord,
} from "./global-key.ts";

const CHAIN_CONTEXT = "tgpi-global-key-chain-v1";
const PROOF_CONTEXT = "tgpi-global-key-proof-v1";
const PROOF_PREFIX = "TGK1";
const MAX_EVENTS = 12;
const MIN_ROTATION_INTERVAL_MS = 60_000;
const SAFE_GLOBAL_ID = /^TGPI-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/;
const SAFE_HASH = /^[A-Za-z0-9_-]{43}$/;
const SAFE_NONCE = /^[A-Za-z0-9_-]{11}$/;

type ProofPayload = {
  currentHash: string;
  issuedAt: string;
  keyId: string;
  revision: number;
  schemaVersion: 1;
  userId: string;
};

export class GlobalKeyIntegrityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GlobalKeyIntegrityError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isIsoDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 40 &&
    !Number.isNaN(Date.parse(value))
  );
}

function deriveKey(secret: string, context: string) {
  if (secret.trim().length < 24) {
    throw new GlobalKeyIntegrityError("Global Key signing material is unavailable.");
  }

  return Buffer.from(
    hkdfSync(
      "sha256",
      Buffer.from(secret, "utf8"),
      Buffer.from("tgpi-global-key-v1", "utf8"),
      Buffer.from(context, "utf8"),
      32,
    ),
  );
}

function eventPayload({
  event,
  keyId,
  keySlot,
}: {
  event: Omit<TgpiGlobalKeyEvent, "hash">;
  keyId: string;
  keySlot: GlobalKeySlot;
}) {
  return [
    TGPI_GLOBAL_KEY_SCHEMA_VERSION,
    keySlot,
    keyId,
    event.sequence,
    event.type,
    event.timestamp,
    event.previousHash,
    event.nonce,
  ].join("|");
}

function signEvent({
  event,
  keyId,
  keySlot,
  secret,
}: {
  event: Omit<TgpiGlobalKeyEvent, "hash">;
  keyId: string;
  keySlot: GlobalKeySlot;
  secret: string;
}) {
  return createHmac("sha256", deriveKey(secret, CHAIN_CONTEXT))
    .update(eventPayload({ event, keyId, keySlot }))
    .digest("base64url");
}

function safeEqual(first: string, second: string) {
  const firstBuffer = Buffer.from(first, "utf8");
  const secondBuffer = Buffer.from(second, "utf8");
  return (
    firstBuffer.length === secondBuffer.length &&
    timingSafeEqual(firstBuffer, secondBuffer)
  );
}

function createEvent({
  keyId,
  keySlot,
  previousHash,
  secret,
  sequence,
  timestamp,
  type,
}: {
  keyId: string;
  keySlot: GlobalKeySlot;
  previousHash: string;
  secret: string;
  sequence: number;
  timestamp: string;
  type: GlobalKeyEventType;
}): TgpiGlobalKeyEvent {
  const unsignedEvent = {
    nonce: randomBytes(8).toString("base64url"),
    previousHash,
    sequence,
    timestamp,
    type,
  };

  return {
    ...unsignedEvent,
    hash: signEvent({ event: unsignedEvent, keyId, keySlot, secret }),
  };
}

export function normalizeGlobalKeyRecord(
  value: unknown,
): TgpiGlobalKeyRecord | null {
  if (!isRecord(value) || !Array.isArray(value.events)) return null;
  if (
    value.schemaVersion !== TGPI_GLOBAL_KEY_SCHEMA_VERSION ||
    value.status !== "active" ||
    (value.keySlot !== "a" && value.keySlot !== "b") ||
    typeof value.keyId !== "string" ||
    !SAFE_GLOBAL_ID.test(value.keyId) ||
    !isIsoDate(value.issuedAt) ||
    !Number.isInteger(value.revision) ||
    Number(value.revision) < 1 ||
    value.events.length < 1 ||
    value.events.length > MAX_EVENTS ||
    Number(value.revision) !== value.events.length
  ) {
    return null;
  }

  const events: TgpiGlobalKeyEvent[] = [];
  for (const [index, candidate] of value.events.entries()) {
    if (
      !isRecord(candidate) ||
      (candidate.type !== "issued" && candidate.type !== "rotated") ||
      candidate.sequence !== index + 1 ||
      (index === 0 && candidate.type !== "issued") ||
      (index > 0 && candidate.type !== "rotated") ||
      !isIsoDate(candidate.timestamp) ||
      typeof candidate.previousHash !== "string" ||
      (index === 0
        ? candidate.previousHash !== "GENESIS"
        : !SAFE_HASH.test(candidate.previousHash)) ||
      typeof candidate.hash !== "string" ||
      !SAFE_HASH.test(candidate.hash) ||
      typeof candidate.nonce !== "string" ||
      !SAFE_NONCE.test(candidate.nonce)
    ) {
      return null;
    }

    events.push({
      hash: candidate.hash,
      nonce: candidate.nonce,
      previousHash: candidate.previousHash,
      sequence: candidate.sequence,
      timestamp: candidate.timestamp,
      type: candidate.type,
    });
  }

  if (
    events[0]?.timestamp !== value.issuedAt ||
    events.some(
      (event, index) =>
        index > 0 &&
        Date.parse(event.timestamp) < Date.parse(events[index - 1].timestamp),
    )
  ) {
    return null;
  }

  return {
    events,
    issuedAt: value.issuedAt,
    keyId: value.keyId,
    keySlot: value.keySlot,
    revision: Number(value.revision),
    schemaVersion: TGPI_GLOBAL_KEY_SCHEMA_VERSION,
    status: "active",
  };
}

export function issueGlobalKey({
  keyId,
  keySlot,
  now = new Date().toISOString(),
  secret,
}: {
  keyId: string;
  keySlot: GlobalKeySlot;
  now?: string;
  secret: string;
}): TgpiGlobalKeyRecord {
  if (!SAFE_GLOBAL_ID.test(keyId) || !isIsoDate(now)) {
    throw new GlobalKeyIntegrityError("Global Key identity is not valid.");
  }

  return {
    events: [
      createEvent({
        keyId,
        keySlot,
        previousHash: "GENESIS",
        secret,
        sequence: 1,
        timestamp: now,
        type: "issued",
      }),
    ],
    issuedAt: now,
    keyId,
    keySlot,
    revision: 1,
    schemaVersion: TGPI_GLOBAL_KEY_SCHEMA_VERSION,
    status: "active",
  };
}

export function verifyGlobalKeyChain({
  expectedKeyId,
  record,
  secret,
}: {
  expectedKeyId: string;
  record: TgpiGlobalKeyRecord;
  secret: string;
}) {
  const normalized = normalizeGlobalKeyRecord(record);
  if (!normalized || normalized.keyId !== expectedKeyId) return false;

  return normalized.events.every((event, index) => {
    const expectedPreviousHash =
      index === 0 ? "GENESIS" : normalized.events[index - 1].hash;
    if (event.previousHash !== expectedPreviousHash) return false;

    const { hash, ...unsignedEvent } = event;
    const expectedHash = signEvent({
      event: unsignedEvent,
      keyId: normalized.keyId,
      keySlot: normalized.keySlot,
      secret,
    });
    return safeEqual(hash, expectedHash);
  });
}

export function rotateGlobalKey({
  now = new Date().toISOString(),
  record,
  secret,
}: {
  now?: string;
  record: TgpiGlobalKeyRecord;
  secret: string;
}) {
  if (!verifyGlobalKeyChain({ expectedKeyId: record.keyId, record, secret })) {
    throw new GlobalKeyIntegrityError(
      "The current integrity chain could not be verified.",
    );
  }
  if (record.events.length >= MAX_EVENTS) {
    throw new GlobalKeyIntegrityError(
      "This V1 chain has reached its safe rotation limit.",
    );
  }
  if (!isIsoDate(now)) {
    throw new GlobalKeyIntegrityError("Rotation time is not valid.");
  }

  const previousEvent = record.events.at(-1);
  if (!previousEvent) {
    throw new GlobalKeyIntegrityError("The current chain is incomplete.");
  }
  if (
    Date.parse(now) - Date.parse(previousEvent.timestamp) <
    MIN_ROTATION_INTERVAL_MS
  ) {
    throw new GlobalKeyIntegrityError(
      "Wait one minute before rotating the proof again.",
    );
  }

  const event = createEvent({
    keyId: record.keyId,
    keySlot: record.keySlot,
    previousHash: previousEvent.hash,
    secret,
    sequence: record.events.length + 1,
    timestamp: now,
    type: "rotated",
  });

  return {
    ...record,
    events: [...record.events, event],
    revision: record.revision + 1,
  } satisfies TgpiGlobalKeyRecord;
}

export function getGlobalKeyFingerprint(record: TgpiGlobalKeyRecord) {
  const currentHash = record.events.at(-1)?.hash || "";
  const digest = createHash("sha256")
    .update(`${record.keyId}|${record.revision}|${currentHash}`)
    .digest("hex")
    .slice(0, 32)
    .toUpperCase();
  return digest.match(/.{1,4}/g)?.join("-") || "UNAVAILABLE";
}

export function createGlobalKeyProof({
  record,
  secret,
  userId,
}: {
  record: TgpiGlobalKeyRecord;
  secret: string;
  userId: string;
}) {
  if (!verifyGlobalKeyChain({ expectedKeyId: record.keyId, record, secret })) {
    throw new GlobalKeyIntegrityError("The integrity chain cannot be signed.");
  }

  const currentHash = record.events.at(-1)?.hash;
  if (!currentHash) {
    throw new GlobalKeyIntegrityError("The integrity chain is incomplete.");
  }

  const payload: ProofPayload = {
    currentHash,
    issuedAt: record.issuedAt,
    keyId: record.keyId,
    revision: record.revision,
    schemaVersion: TGPI_GLOBAL_KEY_SCHEMA_VERSION,
    userId,
  };
  const iv = randomBytes(12);
  const cipher = createCipheriv(
    "aes-256-gcm",
    deriveKey(secret, PROOF_CONTEXT),
    iv,
  );
  cipher.setAAD(Buffer.from(PROOF_CONTEXT, "utf8"));
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const token = Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString(
    "base64url",
  );

  return `${PROOF_PREFIX}.${record.keySlot.toUpperCase()}.${token}`;
}

export function readGlobalKeyProof({
  proof,
  secret,
}: {
  proof: string;
  secret: string;
}): ProofPayload | null {
  if (proof.length > 2_048) return null;
  const [prefix, slot, encoded, extra] = proof.split(".");
  if (
    prefix !== PROOF_PREFIX ||
    (slot !== "A" && slot !== "B") ||
    !encoded ||
    extra
  ) {
    return null;
  }

  try {
    const packed = Buffer.from(encoded, "base64url");
    if (packed.length < 29) return null;
    const iv = packed.subarray(0, 12);
    const tag = packed.subarray(12, 28);
    const encrypted = packed.subarray(28);
    const decipher = createDecipheriv(
      "aes-256-gcm",
      deriveKey(secret, PROOF_CONTEXT),
      iv,
    );
    decipher.setAAD(Buffer.from(PROOF_CONTEXT, "utf8"));
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]).toString("utf8");
    const value: unknown = JSON.parse(decrypted);

    if (
      !isRecord(value) ||
      value.schemaVersion !== TGPI_GLOBAL_KEY_SCHEMA_VERSION ||
      typeof value.userId !== "string" ||
      value.userId.length < 3 ||
      value.userId.length > 128 ||
      typeof value.keyId !== "string" ||
      !SAFE_GLOBAL_ID.test(value.keyId) ||
      !Number.isInteger(value.revision) ||
      Number(value.revision) < 1 ||
      typeof value.currentHash !== "string" ||
      !SAFE_HASH.test(value.currentHash) ||
      !isIsoDate(value.issuedAt)
    ) {
      return null;
    }

    return {
      currentHash: value.currentHash,
      issuedAt: value.issuedAt,
      keyId: value.keyId,
      revision: Number(value.revision),
      schemaVersion: TGPI_GLOBAL_KEY_SCHEMA_VERSION,
      userId: value.userId,
    };
  } catch {
    return null;
  }
}

export function getGlobalKeySlotFromProof(proof: string): GlobalKeySlot | null {
  const slot = proof.split(".", 3)[1];
  return slot === "A" ? "a" : slot === "B" ? "b" : null;
}
