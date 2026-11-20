import type { PublicTgpiLearningCredential } from "../types/learning.ts";

type TrustSource = Pick<PublicTgpiLearningCredential,
  "status" | "integrityVerified" | "identityEvidence" | "portableProof">;

/** Identity anchoring is an issuance snapshot, separate from the certificate's live status. */
export function credentialTrustPresentation(credential: TrustSource) {
  const verified = credential.status === "active" && credential.integrityVerified;
  const anchor = credential.identityEvidence?.anchor;
  const confirmed = verified && anchor?.status === "confirmed"
    && anchor.chainId === 8453 && anchor.network === "base-mainnet"
    && /^0x[a-fA-F0-9]{64}$/.test(anchor.transactionHash)
    && /^[1-9][0-9]{0,19}$/.test(anchor.blockNumber)
    && Number.isFinite(Date.parse(anchor.anchoredAt));

  return {
    verified,
    portableProof: verified && credential.portableProof?.algorithm === "Ed25519",
    anchorLabel: !verified || (anchor?.status === "confirmed" && !confirmed)
      ? "Identity anchor not verified"
      : confirmed
        ? "Identity anchor confirmed"
        : anchor?.status === "awaiting_anchor"
          ? "Identity anchor awaiting confirmation"
          : "Identity activation pending",
    // Never use the stored explorer URL as a navigation target.
    anchorExplorerUrl: confirmed
      ? `https://basescan.org/tx/${anchor.transactionHash}`
      : undefined,
  };
}
