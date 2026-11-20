import assert from "node:assert/strict";
import test from "node:test";
import { credentialTrustPresentation } from "../src/lib/credential-trust-presentation.ts";

const confirmedAnchor = {
  status: "confirmed",
  network: "base-mainnet",
  chainId: 8453,
  transactionHash: "0x" + "a".repeat(64),
  blockNumber: "38498230",
  anchoredAt: "2026-10-17T12:00:00Z",
  explorerUrl: "javascript:alert('untrusted stored URL')",
};
const credential = {
  status: "active",
  integrityVerified: true,
  identityEvidence: { anchor: confirmedAnchor },
  portableProof: { algorithm: "Ed25519", keyId: "tgpi-test" },
};

test("identity explorer navigation is derived from the validated Base transaction, never the stored URL", () => {
  const presentation = credentialTrustPresentation(credential);
  assert.equal(presentation.anchorLabel, "Identity anchor confirmed");
  assert.equal(presentation.anchorExplorerUrl, "https://basescan.org/tx/" + confirmedAnchor.transactionHash);
  for (const anchor of [
    { ...confirmedAnchor, chainId: 1 },
    { ...confirmedAnchor, transactionHash: "../unsafe" },
    { ...confirmedAnchor, blockNumber: "0" },
    { ...confirmedAnchor, anchoredAt: "invalid" },
  ]) {
    const value = credentialTrustPresentation({ ...credential, identityEvidence: { anchor } });
    assert.equal(value.anchorLabel, "Identity anchor not verified");
    assert.equal(value.anchorExplorerUrl, undefined);
  }
});

test("a historical identity anchor cannot promote revoked, replaced or integrity-review certificates", () => {
  for (const change of [{ status: "revoked" }, { status: "replaced" }, { integrityVerified: false }]) {
    const presentation = credentialTrustPresentation({ ...credential, ...change });
    assert.equal(presentation.verified, false);
    assert.equal(presentation.portableProof, false);
    assert.equal(presentation.anchorLabel, "Identity anchor not verified");
    assert.equal(presentation.anchorExplorerUrl, undefined);
  }
});

test("issuer-verified credentials remain valid while identity anchoring is pending", () => {
  for (const [status, label] of [
    ["activation_pending", "Identity activation pending"],
    ["awaiting_anchor", "Identity anchor awaiting confirmation"],
  ]) {
    const presentation = credentialTrustPresentation({ ...credential, identityEvidence: { anchor: { status } } });
    assert.equal(presentation.verified, true);
    assert.equal(presentation.portableProof, true);
    assert.equal(presentation.anchorLabel, label);
    assert.equal(presentation.anchorExplorerUrl, undefined);
  }
});
