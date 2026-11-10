"use client";

import Link from "next/link";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import type { GlobalKeyVerification } from "@/lib/global-key";
import IntegritySeal from "./IntegritySeal";
import styles from "./GlobalKeyCenter.module.css";

const verificationCopy = {
  verified: ["Live integrity confirmed", "This TGPI Global ID is active.", "The proof matches the current signed identity record."],
  historical: ["Authentic historical proof", "This proof has been rotated.", "This exact revision is in the signed history. Request the current proof from its owner."],
  invalid: ["Proof not verified", "This proof could not be verified.", "Check the link with the TGPI member who shared it."],
  unavailable: ["Verification temporarily unavailable", "Verification could not be completed.", "Try this same link again shortly."],
  expired: ["Expired", "This verification link has expired.", "Ask the member for a new link."],
  revoked: ["Revoked", "The member revoked this verification link.", "Ask the member for a new link."],
  superseded: ["Superseded", "This link refers to an older revision.", "Ask the member for a new link."],
} as const;

export default function GlobalKeyVerificationResult({
  result,
}: {
  result: GlobalKeyVerification | "checking" | null;
}) {
  const { locale } = useLocale();
  const copy = result && result !== "checking" ? verificationCopy[result.status] : null;
  const valid = result && result !== "checking" && "keyId" in result ? result : null;
  const anchor = valid?.anchor;

  return (
    <main className={styles.verification}>
      <div className={styles.verifyShell}>
        <Link href="/verify" className={styles.backLink}>← <LocalizedText text="Public verification" /></Link>
        <section className={styles.verifyCard} data-status={valid?.status ?? "neutral"} aria-busy={result === "checking"}>
          <div className={styles.verifyHeading}>
            <div>
              <p className={styles.eyebrow}><LocalizedText text="TGPI Integrity Chain" /></p>
              {copy && <p className={styles.statusBadge} role="status"><LocalizedText text={copy[0]} /></p>}
              <h1><LocalizedText text={copy?.[1] ?? (result === "checking" ? "Checking verification link…" : "Verify a TGPI Global ID")} /></h1>
              <p className={styles.muted}><LocalizedText text={copy?.[2] ?? "Use an official link or enter the proof code in the registry."} /></p>
            </div>
            <IntegritySeal />
          </div>

          {valid && (
            <>
              <dl className={styles.verifyFields}>
                <div><dt><LocalizedText text="TGPI Global ID" /></dt><dd><code>{valid.keyId}</code></dd></div>
                <div><dt><LocalizedText text="Proof revision" /></dt><dd>{valid.revision}{valid.status === "historical" && <> · <LocalizedText text="Current revision" /> {valid.currentRevision}</>}</dd></div>
                <div><dt><LocalizedText text="Issued" /></dt><dd>{new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(valid.issuedAt))}</dd></div>
                <div><dt><LocalizedText text="Cryptographic fingerprint" /></dt><dd><code>{valid.fingerprint}</code></dd></div>
              </dl>
              <div className={styles.verifyReceipt}>
                <p className={styles.eyebrow}><LocalizedText text="Base Mainnet" /></p>
                {anchor?.status === "confirmed" ? (
                  <>
                    <h2><LocalizedText text="Public anchor confirmed" /></h2>
                    <a className={styles.textLink} href={anchor.explorerUrl} target="_blank" rel="noreferrer"><LocalizedText text="Open Base receipt ↗" /></a>
                    <details className={styles.proofDetails}>
                      <summary><LocalizedText text="Inspect Merkle evidence" /></summary>
                      <dl className={styles.verifyFields}>
                        <div><dt><LocalizedText text="Base block" /></dt><dd>#{anchor.blockNumber}</dd></div>
                        <div><dt><LocalizedText text="Batch" /></dt><dd><code>{anchor.batchId}</code></dd></div>
                        <div><dt><LocalizedText text="Merkle root" /></dt><dd><code>{anchor.root}</code></dd></div>
                        <div><dt><LocalizedText text="Merkle leaf" /></dt><dd><code>{anchor.leaf}</code></dd></div>
                      </dl>
                      {anchor.merkleProof.length > 0 && (
                        <ol className={styles.merkleSteps}>
                          {anchor.merkleProof.map(({ hash }, index) => <li key={index}><code>{hash}</code></li>)}
                        </ol>
                      )}
                    </details>
                  </>
                ) : (
                  <p className={styles.muted}><LocalizedText text={anchor?.status === "invalid"
                    ? "The external receipt did not pass verification."
                    : anchor?.status === "unavailable"
                      ? "The external receipt is temporarily unavailable."
                      : "No external receipt is available for this revision."} /></p>
                )}
              </div>
            </>
          )}
          <footer className={styles.verifyFooter}>
            <p><LocalizedText text="Verification covers the TGPI issuer record and the exact proof revision." /></p>
            <Link className={styles.textLink} href="/verify"><LocalizedText text="Verify another record" /> ↗</Link>
          </footer>
        </section>
      </div>
    </main>
  );
}
