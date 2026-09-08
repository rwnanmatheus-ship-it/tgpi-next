export const TGPI_GLOBAL_KEY_METADATA_KEY = "tgpiGlobalKey";
export const TGPI_GLOBAL_KEY_ANCHOR_METADATA_KEY = "tgpiGlobalKeyAnchor";
export const TGPI_GLOBAL_KEY_SCHEMA_VERSION = 1 as const;
export const TGPI_GLOBAL_KEY_ANCHOR_SCHEMA_VERSION = 1 as const;

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

export type TgpiGlobalKeyAnchorProofStep = {
  hash: string;
};

export type TgpiGlobalKeyAnchorRecord = {
  anchoredAt: string;
  batchId: string;
  blockNumber: string;
  chainId: 8453;
  eventHash: string;
  leaf: string;
  memberCount: number;
  merkleProof: TgpiGlobalKeyAnchorProofStep[];
  network: "base-mainnet";
  revision: number;
  root: string;
  schemaVersion: typeof TGPI_GLOBAL_KEY_ANCHOR_SCHEMA_VERSION;
  signerAddress: string;
  status: "confirmed";
  transactionHash: string;
};

export type TgpiGlobalKeyAnchorView =
  | {
      status: "activation_pending" | "awaiting_anchor";
    }
  | {
      anchoredAt: string;
      batchId: string;
      blockNumber: string;
      chainId: 8453;
      explorerUrl: string;
      leaf: string;
      memberCount: number;
      merkleProof: TgpiGlobalKeyAnchorProofStep[];
      network: "base-mainnet";
      root: string;
      signerAddress: string;
      status: "confirmed";
      transactionHash: string;
    };

export type TgpiGlobalKeyView = {
  anchor: TgpiGlobalKeyAnchorView;
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
      anchor:
        | TgpiGlobalKeyAnchorView
        | { status: "invalid" | "unavailable" };
      fingerprint: string;
      issuedAt: string;
      keyId: string;
      revision: number;
      status: "verified" | "historical";
    }
  | { status: "invalid" | "unavailable" };
