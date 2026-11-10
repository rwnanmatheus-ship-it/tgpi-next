"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { QRCodeSVG } from "qrcode.react";
import { rotateGlobalKeyAction } from "@/app/global-key/actions";
import CapabilitySystemRail from "@/components/capability/CapabilitySystemRail";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import type { TgpiGlobalKeyView } from "@/lib/global-key";
import type { GlobalKeyShareEntry } from "@/lib/global-key-share";
import { learningStatusLabels, type LearningProgressItem } from "@/lib/learning/unified-progress";
import GlobalIdCredentials, { type GlobalIdCredential } from "./GlobalIdCredentials";
import GlobalIdSharing from "./GlobalIdSharing";
import IntegritySeal from "./IntegritySeal";
import styles from "./GlobalKeyCenter.module.css";

const anchorStatus = {
  activation_pending: "External anchoring inactive",
  awaiting_anchor: "Awaiting public anchor",
  confirmed: "External receipt recorded",
} as const;

const sections = [
  ["identity", "Identity"],
  ["credentials", "Learning credentials"],
  ["sharing", "Controlled sharing"],
  ["integrity", "Integrity history"],
] as const;

export default function GlobalKeyCenter({
  initialKey,
  memberName,
  verifyOrigin,
  canRotate,
  credentials,
  selection,
  nextLearning,
  initialShares,
  profilePreviewUrl,
}: {
  initialKey: TgpiGlobalKeyView;
  memberName: string;
  verifyOrigin: string;
  canRotate: boolean;
  credentials: GlobalIdCredential[] | null;
  selection: string[] | null;
  nextLearning: LearningProgressItem | null;
  initialShares: GlobalKeyShareEntry[] | null;
  profilePreviewUrl: string | null;
}) {
  const { locale, t } = useLocale();
  const [key, setKey] = useState(initialKey);
  const [showQr, setShowQr] = useState(false);
  const [confirmRotation, setConfirmRotation] = useState(false);
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState("");
  const verifyUrl = new URL(key.verifyPath, verifyOrigin).toString();
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" });
  const shareable = credentials?.some(item => item.shareable);
  const hasCredentials = Boolean(credentials?.length);
  const action = shareable ? "Share a credential" : hasCredentials ? "View my certificates" : nextLearning ? "Continue learning" : "Explore learning";
  const actionHref = hasCredentials ? "#credentials" : nextLearning?.href || "/courses";

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback("Copied to clipboard.");
    } catch {
      setFeedback("Copy is unavailable. Select the visible reference manually.");
    }
  }

  function rotate() {
    if (!confirmRotation) {
      setConfirmRotation(true);
      return;
    }
    startTransition(async () => {
      try {
        const result = await rotateGlobalKeyAction(key.revision);
        if (!result.ok) return setFeedback(result.error);
        setKey(result.value);
        setShowQr(false);
        setFeedback("New proof revision verified.");
      } catch {
        setFeedback("Connection interrupted. Refresh to check the current proof before retrying.");
      } finally {
        setConfirmRotation(false);
      }
    });
  }

  return (
    <main className={styles.center}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label={t("Workspace navigation")}>
          <Link href="/profile">← <LocalizedText text="Workspace" /></Link>
          <span aria-hidden="true">/</span><span aria-current="page"><LocalizedText text="TGPI Global ID" /></span>
        </nav>
        <header className={styles.hero}>
          <div className={styles.heroMedia}>
            <Image className={styles.heroArt} fill preload sizes="(max-width: 690px) 100vw, (max-width: 1450px) 72vw, 960px" src="/images/global-identity/integrity-observatory.webp" alt="" />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><LocalizedText text="TGPI Integrity Chain" /></p>
            <h1><LocalizedText text="TGPI Global ID" /></h1>
            <p><LocalizedText text="Your identity, verified credentials and control over what you share." /></p>
            <a className={styles.primaryButton} href={actionHref}><LocalizedText text={action} /> ↗</a>
          </div>
        </header>

        <nav className={styles.jump} aria-label={t("Global ID sections")}>
          {sections.map(([id, title], index) => (
            <a key={id} href={`#${id}`}><span aria-hidden="true">0{index + 1}</span><LocalizedText text={title} /></a>
          ))}
        </nav>

        <div className={styles.overview} id="identity">
          <section className={styles.identityCard} aria-labelledby="identity-heading">
            <div className={styles.identityTop}>
              <div>
                <p className={styles.eyebrow}><LocalizedText text="Member identity" /></p>
                <h2 id="identity-heading"><bdi>{memberName}</bdi></h2>
                <p className={styles.identityCode}><code>{key.keyId}</code></p>
              </div>
              <IntegritySeal />
            </div>
            <dl className={styles.identityFacts}>
              <div><dt><LocalizedText text="Status" /></dt><dd><span className={styles.verifiedDot} /> <LocalizedText text="Integrity verified" /></dd></div>
              <div><dt><LocalizedText text="Proof revision" /></dt><dd>{String(key.revision).padStart(2, "0")}</dd></div>
              <div><dt><LocalizedText text="Issued" /></dt><dd><time dateTime={key.issuedAt}>{date.format(new Date(key.issuedAt))}</time></dd></div>
            </dl>
            <div className={styles.inlineActions}>
              <button className={styles.secondaryButton} type="button" onClick={() => void copy(key.keyId)}><LocalizedText text="Copy Global ID" /></button>
              <a href="#sharing" className={styles.textLink}><LocalizedText text="Create temporary link" /> ↗</a>
            </div>
          </section>

          <aside className={styles.nextCard} aria-labelledby="global-next-heading">
            <p className={styles.eyebrow}><LocalizedText text="Recommended next" /></p>
            <h2 id="global-next-heading"><LocalizedText text={action} /></h2>
            {hasCredentials ? (
              <p className={styles.muted}><LocalizedText text="{count} verified credentials linked to your ID." values={{ count: credentials!.length }} /></p>
            ) : nextLearning ? (
              <>
                <p className={styles.nextTitle}>{t(nextLearning.title)}</p>
                <p className={styles.muted}><LocalizedText text={learningStatusLabels[nextLearning.status]} /></p>
              </>
            ) : (
              <p className={styles.muted}><LocalizedText text="Open the learning catalog to find a course with a certificate pathway." /></p>
            )}
            <a href={actionHref} className={styles.textLink}><LocalizedText text="Open next step" /> ↗</a>
            <p className={styles.anchorLabel}><span><LocalizedText text="Base Mainnet" /></span><LocalizedText text={anchorStatus[key.anchor.status]} /></p>
          </aside>
        </div>

        <div className={styles.workbench}>
          <GlobalIdCredentials credentials={credentials} selection={selection} profilePreviewUrl={profilePreviewUrl} copy={copy} />
          <GlobalIdSharing initialShares={initialShares} revision={key.revision} origin={verifyOrigin} copy={copy} />
        </div>

        <section className={styles.panel} id="integrity" aria-labelledby="integrity-heading">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}><LocalizedText text="TGPI Integrity Chain" /></p>
              <h2 id="integrity-heading"><LocalizedText text="Integrity history" /></h2>
            </div>
            <Link href="/profile/security" className={styles.textLink}><LocalizedText text="Account security" /> ↗</Link>
          </div>
          <div className={styles.integrityGrid}>
            <div className={styles.inset}>
              <p className={styles.smallLabel}><LocalizedText text="Cryptographic fingerprint" /></p>
              <p><code>{key.fingerprint}</code></p>
              <p className={styles.muted}><LocalizedText text="The public verifier checks this exact revision against the signed record." /></p>
              <a className={styles.textLink} href={verifyUrl} rel="noreferrer" target="_blank"><LocalizedText text="Verify proof ↗" /></a>
            </div>
            <div className={styles.inset}>
              <p className={styles.smallLabel}><LocalizedText text="Base Mainnet" /></p>
              <h3><LocalizedText text={anchorStatus[key.anchor.status]} /></h3>
              {key.anchor.status === "confirmed" ? (
                <>
                  <p className={styles.muted}><LocalizedText text="Base block" /> #{key.anchor.blockNumber}</p>
                  <a className={styles.textLink} href={key.anchor.explorerUrl} rel="noreferrer" target="_blank"><LocalizedText text="Open Base receipt ↗" /></a>
                </>
              ) : <p className={styles.muted}><LocalizedText text="TGPI can verify the signed identity before an external receipt is recorded." /></p>}
            </div>
            <div className={styles.inset}>
              <p className={styles.smallLabel}><LocalizedText text="Proof control" /></p>
              <h3><LocalizedText text="Rotate cryptographic proof" /></h3>
              <p className={styles.muted}><LocalizedText text="Rotation adds a signed revision and closes temporary links for the old proof." /></p>
              <div className={styles.inlineActions}>
                <button className={styles.secondaryButton} type="button" onClick={rotate} disabled={!canRotate || pending}>
                  <LocalizedText text={pending ? "Creating secure block…" : confirmRotation ? "Confirm proof rotation" : "Rotate proof"} />
                </button>
                {confirmRotation && <button className={styles.secondaryButton} type="button" onClick={() => setConfirmRotation(false)} disabled={pending}><LocalizedText text="Cancel" /></button>}
              </div>
            </div>
          </div>

          <details className={styles.proofDetails}>
            <summary><LocalizedText text="Signed block history" /> <span>{key.blocks.length}</span></summary>
            <ol className={styles.historyList}>
              {[...key.blocks].reverse().map(block => (
                <li key={block.hash}>
                  <span aria-hidden="true">{String(block.sequence).padStart(2, "0")}</span>
                  <div>
                    <p><LocalizedText text={block.type === "issued" ? "Global identity issued" : "Proof rotation"} /> · <time dateTime={block.timestamp}>{date.format(new Date(block.timestamp))}</time></p>
                    <code>{block.hash}</code>
                  </div>
                </li>
              ))}
            </ol>
          </details>

          <details className={styles.proofDetails}>
            <summary><LocalizedText text="Portable proof and QR" /></summary>
            <p className={styles.muted}><LocalizedText text="Portable proofs stay verifiable as historical records after rotation. Use a temporary link when you need expiry or revocation." /></p>
            <div className={styles.inlineActions}>
              <button className={styles.secondaryButton} type="button" onClick={() => void copy(verifyUrl)}><LocalizedText text="Copy verification link" /></button>
              <button className={styles.secondaryButton} type="button" onClick={() => void copy(key.proof)}><LocalizedText text="Copy proof code" /></button>
              <button className={styles.secondaryButton} type="button" aria-expanded={showQr} aria-controls="portable-global-id-qr" onClick={() => setShowQr(!showQr)}>
                <LocalizedText text={showQr ? "Hide verification QR" : "Show verification QR"} />
              </button>
            </div>
            <div id="portable-global-id-qr" hidden={!showQr} className={styles.qr}>
              {showQr && <QRCodeSVG value={verifyUrl} size={232} marginSize={4} level="M" title={t("TGPI Global ID verification")} />}
            </div>
          </details>
        </section>

        <CapabilitySystemRail active="global-key" theme="dark" />
        <p className={styles.toast} role="status" hidden={!feedback}>{feedback && t(feedback)}</p>
      </div>
    </main>
  );
}
