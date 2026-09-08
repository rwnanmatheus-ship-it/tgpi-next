export const TGPI_GLOBAL_KEY_METADATA_KEY = "tgpiGlobalKey";
export const TGPI_GLOBAL_KEY_SCHEMA_VERSION = 1 as const;

export type GlobalKeyEventType = "issued" | "rotated";
export type GlobalKeySlot = "a" | "b";

export type TgpiGlobalKeyEvent = {
  hash: string;
  nonce: string;
  previousHash: string;
  sequence: number;
  timestamp: string;
  type: GlobalKeyEventType;
};

export type TgpiGlobalKeyRecord = {
  events: TgpiGlobalKeyEvent[];
  issuedAt: string;
  keyId: string;
  keySlot: GlobalKeySlot;
  revision: number;
  schemaVersion: typeof TGPI_GLOBAL_KEY_SCHEMA_VERSION;
  status: "active";
};

export type TgpiGlobalKeyBlockView = {
  hash: string;
  previousHash: string;
  sequence: number;
  timestamp: string;
  type: GlobalKeyEventType;
};

export type TgpiGlobalKeyView = {
  blocks: TgpiGlobalKeyBlockView[];
  fingerprint: string;
  integrity: "verified";
  issuedAt: string;
  keyId: string;
  proof: string;
  revision: number;
  status: "active";
  verifyPath: string;
};

export type GlobalKeyVerification =
  | {
      fingerprint: string;
      issuedAt: string;
      keyId: string;
      revision: number;
      status: "verified" | "historical";
    }
  | { status: "invalid" | "unavailable" };
