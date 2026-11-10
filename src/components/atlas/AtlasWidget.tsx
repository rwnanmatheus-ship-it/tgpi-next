'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { LocalizedText, useLocale } from '@/components/localization/LocaleProvider';
import { atlasNavigationContext } from '@/lib/atlas/navigation-context';
import { atlasCopy } from '@/lib/atlas/studio-copy';
import { containDialogFocus } from '@/lib/dialog-focus';
import { isStudyRoute } from '@/lib/product-navigation';
import styles from './widget.module.css';

const Studio = dynamic(() => import('./AtlasStudio'), {
  loading: () => <p className={styles.loading}><LocalizedText text="Loading Atlas…" /></p>,
  ssr: false,
});
const Mascot = dynamic(() => import('./AtlasMascot'), { ssr: false });

type Position = { side: 'left' | 'right'; height: number };
type Gesture = { id: number; x: number; y: number; left: number; top: number; moved: boolean };
const positionKey = 'tgpi:atlas:launcher:v1';
const invitationKey = 'tgpi:atlas:invited';
const initialPosition: Position = { side: 'right', height: 1 };

function readPosition(): Position {
  try {
    const value = JSON.parse(localStorage.getItem(positionKey) || 'null') as Position | null;
    if (value && ['left', 'right'].includes(value.side) && Number.isFinite(value.height)) {
      return { side: value.side, height: Math.max(0, Math.min(1, value.height)) };
    }
  } catch { /* Use the safe default position. */ }
  return initialPosition;
}

export default function AtlasWidget() {
  const { t, locale } = useLocale();
  const { userId, isLoaded } = useAuth();
  const pathname = usePathname();
  const context = atlasNavigationContext(pathname);
  const hidden = pathname === '/atlas' || /^\/(sign-in|sign-up)(\/|$)/.test(pathname);
  const inviteTopic = context?.topic;
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const dragged = useRef(false);
  const [position, setPosition] = useState(initialPosition);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [opened, setOpened] = useState(false);
  const [invite, setInvite] = useState(false);
  const [preview, setPreview] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [access, setAccess] = useState<{ userId: string; enabled: boolean } | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPosition(readPosition()));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!opened || hidden) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [opened, hidden]);

  useEffect(() => {
    if (!opened || hidden || !userId) return;
    const controller = new AbortController();
    void fetch('/api/atlas/status', { cache: 'no-store', signal: controller.signal })
      .then(async response => response.ok ? response.json() as Promise<{ enabled: boolean; sponsored?: boolean }> : null)
      .then(result => {
        if (!controller.signal.aborted) setAccess({ userId, enabled: result?.enabled === true && result.sponsored === true });
      })
      .catch(() => { /* The guide remains available. */ });
    return () => controller.abort();
  }, [opened, hidden, userId]);

  useEffect(() => {
    if (dialog.current?.open) dialog.current.close();
    if (!hidden) return;
    const frame = requestAnimationFrame(() => setOpened(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname, hidden]);

  useEffect(() => {
    if (hidden || isStudyRoute(pathname) || !userId || !inviteTopic || inviteTopic === 'premium' || opened) return;
    let end = 0;
    const timer = window.setTimeout(() => {
      if (document.visibilityState !== 'visible') return;
      try {
        if (sessionStorage.getItem(invitationKey)) return;
        sessionStorage.setItem(invitationKey, '1');
      } catch { return; }
      setInvite(true);
      end = window.setTimeout(() => setInvite(false), 6500);
    }, 9000);
    return () => { window.clearTimeout(timer); window.clearTimeout(end); setInvite(false); };
  }, [pathname, inviteTopic, hidden, opened, userId]);

  useEffect(() => {
    if (!preview || opened || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setAnimated(true), 230);
    return () => window.clearTimeout(timer);
  }, [preview, opened]);

  function dock(next: Position) {
    setPosition(next);
    try { localStorage.setItem(positionKey, JSON.stringify(next)); } catch { /* Remains movable in this session. */ }
  }

  function stopPreview() { setPreview(false); setAnimated(false); }

  function pointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top, moved: false };
    dragged.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (!start.moved && Math.hypot(x, y) < 8) return;
    start.moved = true;
    setInvite(false);
    stopPreview();
    setDrag({ x: start.left + x, y: start.top + y });
  }

  function pointerUp(event: PointerEvent<HTMLButtonElement>) {
    const start = gesture.current;
    gesture.current = null;
    setDrag(null);
    if (!start?.moved) return;
    dragged.current = true;
    const rect = event.currentTarget.getBoundingClientRect();
    dock({
      side: rect.left + rect.width / 2 < window.innerWidth / 2 ? 'left' : 'right',
      height: Math.max(0, Math.min(1, rect.top / Math.max(1, window.innerHeight))),
    });
  }

  if (hidden) return null;
  const launcherStyle = {
    '--atlas-y': position.height,
    '--atlas-drag-x': drag ? `${drag.x}px` : undefined,
    '--atlas-drag-y': drag ? `${drag.y}px` : undefined,
  } as CSSProperties;

  return <>
    <div className={styles.dock} style={launcherStyle} data-side={position.side} data-dragging={!!drag} data-invite={invite}>
      {invite && <span className={styles.invitation} aria-hidden="true">{atlasCopy(locale, 'invite')}</span>}
      <button type="button" ref={trigger} className={styles.trigger} aria-label={t('Ask TGPI Atlas AI')}
        aria-haspopup="dialog" aria-expanded={opened} aria-controls="tgpi-atlas-widget"
        onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp}
        onPointerCancel={() => { gesture.current = null; setDrag(null); }}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setPreview(true); }}
        onPointerLeave={stopPreview} onFocus={() => setPreview(true)} onBlur={stopPreview}
        onClick={event => {
          if (dragged.current && event.detail !== 0) { dragged.current = false; return; }
          setInvite(false);
          stopPreview();
          setAccess(null);
          dialog.current?.showModal();
          setOpened(true);
        }}>
        <span className={styles.avatar} aria-hidden="true">
          {animated && !drag && !opened ? <Mascot pose="Invite" compact /> : <Image src="/brand/atlas/avatar.webp" alt="" width={44} height={44} />}
        </span>
        <span className={styles.label}>{t('Ask Atlas')}</span>
      </button>
    </div>
    <dialog ref={dialog} id="tgpi-atlas-widget" className={styles.panel} data-side={position.side}
      aria-labelledby="atlas-widget-title" onKeyDown={containDialogFocus}
      onClose={() => { setOpened(false); trigger.current?.focus({ preventScroll: true }); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
      }}>
      <div className={styles.frame}>
        <header className={styles.heading}>
          <strong id="atlas-widget-title"><LocalizedText text={'TGPI Atlas AI'} /></strong>
          <Link href="/atlas" prefetch={false} onClick={() => dialog.current?.close()}>{t('Full page ↗')}</Link>
          <button type="button" aria-label={atlasCopy(locale, 'move')} onClick={() => dock({ side: position.side === 'right' ? 'left' : 'right', height: 1 })}>↔</button>
          <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label={t('Minimize Atlas')}>−</button>
        </header>
        <div className={styles.content}>
          {opened && (!isLoaded ? <p className={styles.loading}>{t('Loading your session…')}</p> : userId
            ? <Studio key={userId} userId={userId} onlineAvailable={access?.userId === userId && access.enabled} embedded context={context} />
            : <div className={styles.guest}>
              <Image src="/brand/atlas/welcome.webp" alt={t('Atlas, your global companion')} width={160} height={160} />
              <h2>{t('Intelligence for your global life.')}</h2>
              <p>{t('Explore destinations, learning and life abroad with Atlas. Sign in to access your private space.')}</p>
              <Link href="/sign-in?redirect_url=%2Fatlas" prefetch={false} onClick={() => dialog.current?.close()}>{t('Sign in to TGPI →')}</Link>
            </div>)}
        </div>
      </div>
    </dialog>
  </>;
}
