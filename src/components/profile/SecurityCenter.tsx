"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UserProfile, useClerk, useSession, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/localization/LocaleProvider";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";
import { securityCopy } from "@/lib/security-copy";
import styles from "./SecurityCenter.module.css";

type SessionList = Awaited<ReturnType<NonNullable<ReturnType<typeof useUser>["user"]>["getSessions"]>>;

function Shield() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z" /><path d="m8 12 3 3 5-6" /></svg>;
}

export default function SecurityCenter() {
  const { user, isLoaded } = useUser();
  const { session } = useSession();
  const clerk = useClerk();
  const pathname = usePathname();
  const { locale } = useLocale();
  const c = securityCopy[locale];
  const [sessions, setSessions] = useState<SessionList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notice, setNotice] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [revoking, setRevoking] = useState(false);
  const generation = useRef({ id: 0 });
  const dialog = useRef<HTMLDialogElement>(null);
  const refresh = useCallback(async () => {
    if (!user) return;
    const request = ++generation.current.id;
    setLoading(true); setError(false);
    try {
      const result = await user.getSessions();
      if (request === generation.current.id) setSessions(result.filter(item => item.status === "active").sort((a, b) => b.lastActiveAt.getTime() - a.lastActiveAt.getTime()));
    } catch { if (request === generation.current.id) setError(true); }
    finally { if (request === generation.current.id) setLoading(false); }
  }, [user]);
  useEffect(() => {
    const requests = generation.current;
    setSessions(null); setPending(null); setNotice(false);
    void refresh();
    const focus = () => { void refresh(); void user?.reload().catch(() => {}); };
    window.addEventListener("focus", focus);
    return () => { requests.id++; window.removeEventListener("focus", focus); };
  }, [refresh, user]);
  useEffect(() => { if (pending) dialog.current?.showModal(); else dialog.current?.close(); }, [pending]);

  const manage = (security = true) => clerk.openUserProfile({ appearance: tgpiClerkAppearance, __experimental_startPath: security ? "/security" : "/" });
  async function revoke() {
    const target = sessions?.find(item => item.id === pending);
    if (!target || !session?.id || target.id === session.id || revoking) return;
    setRevoking(true); setError(false); setNotice(false);
    try {
      await target.revoke();
      setSessions(previous => previous?.filter(item => item.id !== target.id) ?? null);
      setPending(null); setNotice(true); void refresh();
    } catch { setError(true); }
    finally { setRevoking(false); }
  }
  if (pathname.replace(/\/+$/, "") !== "/profile/security") return <UserProfile appearance={tgpiClerkAppearance} path="/profile/security" routing="path" />;
  if (!isLoaded || !user) return <div className={styles.loading} role="status">{c.loading}</div>;
  const verified = user.primaryEmailAddress?.verification.status === "verified";
  const checks = [verified, user.twoFactorEnabled, user.passkeys.length > 0];
  const completed = checks.filter(Boolean).length;
  const items = [
    { title: c.email, value: user.primaryEmailAddress?.emailAddress || c.unavailable, status: verified ? c.verified : c.review, ok: verified, action: c.manageEmail, security: false },
    { title: c.password, value: user.passwordEnabled ? c.passwordOn : c.passwordOff, status: user.passwordEnabled ? c.configured : c.provider, ok: user.passwordEnabled, action: c.managePassword, security: true },
    { title: c.mfa, value: c.mfaHelp, status: user.twoFactorEnabled ? c.enabled : c.recommended, ok: user.twoFactorEnabled, action: c.manageMfa, security: true },
    { title: c.passkeys, value: c.passkeyHelp, status: user.passkeys.length ? `${user.passkeys.length} · ${c.configured}` : c.optional, ok: user.passkeys.length > 0, action: c.managePasskeys, security: true },
  ];
  return <div className={styles.root}>
    <section className={styles.hero} aria-labelledby="security-overview">
      <div className={styles.heroIcon}><Shield /></div>
      <div className={styles.heroText}><span className={styles.eyebrow}>{c.privateCenter}</span><h2 id="security-overview">{c.title}</h2><p>{c.subtitle}</p><button type="button" className={styles.heroButton} onClick={() => manage()}>{c.reviewSecurity}</button></div>
      <div className={styles.checks}><strong>{completed}<span>/3</span></strong><p>{c.checks}</p><div className={styles.segments} aria-hidden="true">{checks.map((check, index) => <i key={index} data-complete={check} />)}</div><small>{c.checksHelp}</small></div>
    </section>
    <div className={styles.cards}>{items.map(item => <section key={item.title} className={styles.card}><div className={styles.cardTop}><Shield /><span className={styles.badge} data-ok={item.ok}>{item.status}</span></div><h3>{item.title}</h3><p>{item.value}</p><button type="button" className={styles.button} onClick={() => manage(item.security)}>{item.action}</button></section>)}</div>
    <section className={styles.panel} aria-labelledby="connected-accounts"><div className={styles.heading}><div><span className={styles.eyebrow}>{c.access}</span><h3 id="connected-accounts">{c.connected}</h3><p>{c.connectedHelp}</p></div><button type="button" className={styles.button} onClick={() => manage(false)}>{c.manageAccounts}</button></div><div className={styles.providers}>{user.externalAccounts.length ? user.externalAccounts.map(account => <div className={styles.provider} key={account.id}><span className={styles.providerIcon}>{account.provider.replace(/^oauth_/, "").slice(0, 1).toUpperCase()}</span><div><strong>{account.provider.replace(/^oauth_/, "").replaceAll("_", " ")}</strong><p>{account.emailAddress || c.connected}</p></div></div>) : <p>{c.noProviders}</p>}</div></section>
    <section className={styles.panel} aria-labelledby="security-sessions"><div className={styles.heading}><div><span className={styles.eyebrow}>{c.devices}</span><h3 id="security-sessions">{c.sessions}</h3><p>{c.sessionsHelp}</p></div><button type="button" className={styles.button} disabled={loading || revoking} onClick={() => { setNotice(false); void refresh(); }}>{loading ? c.loading : c.refresh}</button></div>
      {error && <p className={styles.error} role="alert">{c.error}</p>}{notice && <p className={styles.success} role="status">{c.revoked}</p>}
      {sessions === null ? <p role="status">{loading ? c.loading : c.unavailable}</p> : sessions.length === 0 ? <p>{c.emptySessions}</p> : <ul className={styles.sessionList}>{sessions.map(item => <li key={item.id}><div className={styles.deviceIcon} aria-hidden="true">{item.latestActivity.isMobile ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 18h4" /></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" /></svg>}</div><div className={styles.sessionText}><strong>{[item.latestActivity.browserName, item.latestActivity.deviceType].filter(Boolean).join(" · ") || c.device}</strong><p>{[item.latestActivity.city, item.latestActivity.country].filter(Boolean).join(", ") || c.locationUnknown}</p><small>{c.lastActive} · {new Intl.DateTimeFormat(locale, {dateStyle:"medium", timeStyle:"short"}).format(item.lastActiveAt)}</small></div>{item.id === session?.id ? <span className={styles.badge} data-ok="true">{c.current}</span> : <button type="button" className={styles.dangerButton} disabled={revoking || !session?.id} onClick={() => { setError(false); setPending(item.id); }}>{c.end}</button>}</li>)}</ul>}
      <div className={styles.note}>{c.locationHelp}</div>
    </section>
    <aside className={styles.advice}><Shield /><div><h3>{c.recovery}</h3><p>{user.backupCodeEnabled ? c.recoveryOn : c.recoveryHelp}</p><button type="button" className={styles.button} onClick={() => manage()}>{c.reviewRecovery}</button></div></aside>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="revoke-title" onCancel={event => { if (revoking) event.preventDefault(); else setPending(null); }} onClose={() => { if (!revoking) setPending(null); }}><h3 id="revoke-title">{c.confirmTitle}</h3><p>{c.confirmHelp}</p>{error && <p role="alert" className={styles.error}>{c.error}</p>}<div><button type="button" className={styles.button} disabled={revoking} onClick={() => setPending(null)}>{c.cancel}</button><button type="button" className={styles.dangerButton} disabled={revoking} onClick={() => void revoke()}>{revoking ? c.loading : c.end}</button></div></dialog>
  </div>;
}
