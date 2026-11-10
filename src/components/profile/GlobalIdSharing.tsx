"use client";

import { useEffect, useState, useTransition } from "react";
import { QRCodeSVG } from "qrcode.react";
import { createGlobalKeyShareAction, revokeGlobalKeyShareAction } from "@/app/global-key/actions";
import { LocalizedText, useLocale } from "@/components/localization/LocaleProvider";
import { GLOBAL_KEY_SHARE_DAYS, getGlobalKeyShareStatus, type GlobalKeyShareEntry } from "@/lib/global-key-share";
import styles from "./GlobalKeyCenter.module.css";

const shareStatus = { active: "Active", expired: "Expired", revoked: "Revoked", superseded: "Superseded" } as const;

export default function GlobalIdSharing({
  initialShares,
  revision,
  origin,
  copy,
}: {
  initialShares: GlobalKeyShareEntry[] | null;
  revision: number;
  origin: string;
  copy: (value: string) => Promise<void>;
}) {
  const { locale, t } = useLocale();
  const [entries, setEntries] = useState(initialShares);
  const [freshLink, setFreshLink] = useState<{ id: string; url: string; revision: number } | null>(null);
  const [days, setDays] = useState<number>(7);
  const [revokeId, setRevokeId] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [feedback, setFeedback] = useState("");
  const [pending, startTransition] = useTransition();
  const link = freshLink?.revision === revision && entries?.some(entry =>
    entry.id === freshLink.id && getGlobalKeyShareStatus(entry, revision, now) === "active") ? freshLink : null;
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  function create() {
    setRevokeId(null);
    startTransition(async () => {
      try {
        const result = await createGlobalKeyShareAction(days, revision);
        if (!result.ok) return setFeedback(result.error);
        setEntries(result.value.entries);
        setNow(Date.now());
        setFreshLink({
          id: result.value.id,
          revision,
          url: new URL(`/verify/global-key#share=${result.value.token}`, origin).toString(),
        });
        setFeedback("Temporary link created.");
      } catch {
        setFeedback("The identity update could not be completed.");
      }
    });
  }

  function revoke(id: string) {
    if (revokeId !== id) {
      setRevokeId(id);
      setFeedback("Confirm to disable this link.");
      return;
    }
    startTransition(async () => {
      try {
        const result = await revokeGlobalKeyShareAction(id);
        if (!result.ok) return setFeedback(result.error);
        setEntries(result.value);
        if (freshLink?.id === id) setFreshLink(null);
        setFeedback("Verification link revoked.");
      } catch {
        setFeedback("The identity update could not be completed.");
      } finally {
        setRevokeId(null);
      }
    });
  }

  return (
    <section className={styles.panel} id="sharing" aria-labelledby="global-sharing-heading">
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.eyebrow}><LocalizedText text="Controlled sharing" /></p>
          <h2 id="global-sharing-heading"><LocalizedText text="Share your ID on your terms" /></h2>
        </div>
        <span className={styles.panelNumber} aria-hidden="true">02</span>
      </div>
      <p className={styles.muted}><LocalizedText text="Recipients see your Global ID, proof revision, issue date and integrity status." /></p>
      <p className={styles.muted}><LocalizedText text="Temporary links expire or can be revoked. Rotating your proof also closes links for the previous revision." /></p>
      {entries === null ? (
        <p className={styles.notice}><LocalizedText text="Temporary sharing is currently unavailable." /></p>
      ) : (
        <>
          <div className={styles.shareControls}>
            <label>
              <span><LocalizedText text="Link duration" /></span>
              <select disabled={pending} value={days} onChange={event => setDays(Number(event.target.value))}>
                {GLOBAL_KEY_SHARE_DAYS.map(day => <option value={day} key={day}>{t(day === 1 ? "24 hours" : "{days} days", { days: day })}</option>)}
              </select>
            </label>
            <button className={styles.primaryButton} type="button" disabled={pending} onClick={create}>
              <LocalizedText text="Create temporary link" />
            </button>
          </div>
          {link && (
            <div className={styles.freshLink}>
              <div>
                <label>
                  <span><LocalizedText text="Verification link" /></span>
                  <input readOnly value={link.url} onFocus={event => event.currentTarget.select()} />
                </label>
                <p className={styles.muted}><LocalizedText text="Copy this link now. The full address is only shown when it is created." /></p>
                <button className={styles.secondaryButton} type="button" onClick={() => void copy(link.url)}><LocalizedText text="Copy verification link" /></button>
              </div>
              <div className={styles.qr}><QRCodeSVG value={link.url} size={168} marginSize={4} level="M" title={t("TGPI Global ID verification")} /></div>
            </div>
          )}
          {entries.length > 0 && (
            <ul className={styles.shareList}>
              {entries.map(entry => {
                const status = getGlobalKeyShareStatus(entry, revision, now);
                return (
                  <li key={entry.id}>
                    <div>
                      <p className={styles.smallLabel}><LocalizedText text={shareStatus[status]} /> · <LocalizedText text="Revision" /> {entry.revision}</p>
                      <p className={styles.muted}><LocalizedText text="Expires" /> <time dateTime={entry.expiresAt}>{date.format(new Date(entry.expiresAt))}</time> <LocalizedText text="UTC" /></p>
                    </div>
                    {status === "active" && (
                      <div className={styles.inlineActions}>
                        <button className={styles.secondaryButton} type="button" disabled={pending} onClick={() => revoke(entry.id)}>
                          <LocalizedText text={revokeId === entry.id ? "Confirm revocation" : "Revoke link"} />
                        </button>
                        {revokeId === entry.id && <button className={styles.secondaryButton} type="button" disabled={pending} onClick={() => { setRevokeId(null); setFeedback(""); }}><LocalizedText text="Cancel" /></button>}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <p className={styles.feedbackLine} role="status">{feedback && t(feedback)}</p>
        </>
      )}
    </section>
  );
}
