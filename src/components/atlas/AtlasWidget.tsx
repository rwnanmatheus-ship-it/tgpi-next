'use client';
import { useLocale } from "@/components/localization/LocaleProvider";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './widget.module.css';

const Chat = dynamic(() => import('./AtlasChat'), { loading: () => <p className={styles.loading}>Loading Atlas…</p>, ssr: false });

export default function AtlasWidget() {
  const { t } = useLocale();
  const { userId, isLoaded } = useAuth();
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [opened, setOpened] = useState(false);
  const [visited, setVisited] = useState(false);
  const [access, setAccess] = useState<{ userId: string; enabled: boolean } | null>(null);

  useEffect(() => {
    if (!opened || !userId) return;
    const controller = new AbortController();
    void fetch('/api/atlas/status', { cache: 'no-store', signal: controller.signal })
      .then(async response => response.ok ? response.json() as Promise<{ enabled: boolean }> : { enabled: false })
      .then(result => setAccess({ userId, enabled: result.enabled === true }))
      .catch(() => { /* Stay in preview when availability cannot be confirmed. */ });
    return () => controller.abort();
  }, [opened, userId]);

  useEffect(() => {
    if (pathname === '/atlas') { dialog.current?.close(); }
  }, [pathname]);

  function open() {
    if (pathname === '/atlas') {
      document.getElementById('atlas-main')?.focus();
      return;
    }
    setVisited(true);
    dialog.current?.showModal();
    setOpened(true);
  }

  return <>
    <button ref={trigger} className={styles.trigger} onClick={open} aria-label={t("Ask TGPI Atlas AI")} aria-haspopup="dialog" aria-expanded={opened} aria-controls="tgpi-atlas-widget">
      <Image src="/brand/atlas/avatar.webp" alt="" width={44} height={44} />
      <span>{t("Ask Atlas")}</span>
    </button>
    <dialog ref={dialog} id="tgpi-atlas-widget" className={styles.panel} aria-labelledby="atlas-widget-title" onClose={() => { setOpened(false); trigger.current?.focus(); }} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className={styles.frame}>
        <header className={styles.heading}><strong id="atlas-widget-title">TGPI Atlas AI</strong><Link href="/atlas" onClick={() => dialog.current?.close()}>{t("Full page ↗")}</Link><button autoFocus onClick={() => dialog.current?.close()} aria-label={t("Minimize Atlas")}>−</button></header>
        <div className={styles.content}>
          {!isLoaded ? <p className={styles.loading}>{t("Loading your session…")}</p> : userId && visited ? <Chat key={userId} userId={userId} enabled={access?.userId === userId && access.enabled} embedded /> : <div className={styles.guest}>
            <Image src="/brand/atlas/welcome.webp" alt={t("Atlas, your global companion")} width={160} height={160} />
            <h2>{t("Intelligence for your global life.")}</h2><p>{t("Explore destinations, learning and life abroad with Atlas. Sign in to access your private space.")}</p>
            <p>{t("Atlas is currently in preview. AI replies are not yet available.")}</p>
            <Link href="/sign-in?redirect_url=%2Fatlas" onClick={() => dialog.current?.close()}>{t("Sign in to TGPI →")}</Link>
          </div>}
        </div>
      </div>
    </dialog>
  </>;
}
