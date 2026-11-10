'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import styles from './mascot.module.css';

export type AtlasPose = 'Idle' | 'Invite' | 'Focus';

const Scene = dynamic(() => import('./AtlasMascotScene'), { ssr: false });
const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeToMotion(change: () => void) {
  const media = matchMedia(motionQuery);
  media.addEventListener('change', change);
  return () => media.removeEventListener('change', change);
}

export default function AtlasMascot({ pose = 'Idle', animated = true, compact = false }: {
  pose?: AtlasPose; animated?: boolean; compact?: boolean;
}) {
  const host = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, () => matchMedia(motionQuery).matches, () => true);
  const showScene = animated && visible && !reducedMotion;

  useEffect(() => {
    if (!animated || reducedMotion || !host.current) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [animated, reducedMotion]);

  return <span ref={host} aria-hidden="true" className={styles.host} data-model-ready={showScene && ready}>
    <Image className={styles.poster} src={compact ? '/brand/atlas/avatar.webp' : '/brand/atlas/owl-poster.webp'}
      alt="" width={compact ? 48 : 480} height={compact ? 48 : 480} sizes={compact ? '48px' : '(max-width: 767px) 180px, 340px'} />
    {showScene && <Scene pose={pose} compact={compact} onReady={setReady} />}
  </span>;
}
