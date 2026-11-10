"use client";

import CourseArrow from './CourseArrow';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import type { LearningSummary } from '@/lib/learning/unified-progress';
import { learningStatusLabels } from '@/lib/learning/unified-progress';
import { PROGRESS_SYNC_EVENT } from '@/lib/progress-sync';



export default function ContinueLearning({ initial, initialUid }: { initial?: LearningSummary; initialUid?: string } = {}) {
  const { userId, isLoaded } = useAuth();
  const { t } = useLocale();
  const [snapshot, setSnapshot] = useState<{ uid: string; data: LearningSummary } | null>(() => initial && initialUid ? { uid: initialUid, data: initial } : null);
  const [failed, setFailed] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [loadingUid, setLoadingUid] = useState<string | null>(null);
  useEffect(() => {
    if (!userId) return;
    const controller = new AbortController();
    let active = true;
    let sequence = 0;
    async function load() {
      const request = ++sequence;
      setLoadingUid(userId!);
      try {
        const response = await fetch('/api/learning/summary', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('Learning unavailable');
        const data = await response.json() as LearningSummary;
        if (!active || request !== sequence) return;
        setSnapshot({ uid: userId!, data }); setFailed(null);
      } catch {
        if (active && request === sequence) setFailed(userId!);
      } finally {
        if (active && request === sequence) setLoadingUid(null);
      }
    }
    void load();
    const onFocus = () => { if (document.visibilityState === 'visible') void load(); };
    window.addEventListener('focus', onFocus);
    window.addEventListener(PROGRESS_SYNC_EVENT, onFocus);
    return () => { active = false; controller.abort(); window.removeEventListener('focus', onFocus); window.removeEventListener(PROGRESS_SYNC_EVENT, onFocus); };
  }, [userId, refresh]);
  if (!isLoaded || !userId) return null;
  const data = snapshot?.uid === userId ? snapshot.data : null;
  const unavailable = failed === userId || Boolean(data?.unavailable.length);
  return <section className="product-learning" aria-labelledby="continue-learning-title" aria-busy={loadingUid === userId}>
    <header><div><p className="product-kicker">{t('Your learning space')}</p><h2 id="continue-learning-title">{t('One place to keep learning.')}</h2></div><button type="button" disabled={loadingUid === userId} onClick={() => setRefresh(value => value + 1)}>{t('Refresh learning')}</button></header>
    {!data && !unavailable && <p role="status">{t('Loading your learning record…')}</p>}
    {unavailable && <p role="status" className="product-notice">{t('Some learning records are temporarily unavailable. Your saved work is preserved.')}</p>}
    {data?.items.length ? <div className="product-learning-grid">{data.items.slice(0, 3).map(item => <Link href={item.href} key={item.courseId} className="product-learning-item">
      <span className="product-kicker">{t(learningStatusLabels[item.status])}</span><strong>{t(item.title)}</strong>
      <span>{t(item.kind === 'professional' ? '{done} of {total} practice records' : '{done} of {total} lesson checkpoints', { done: item.completed, total: item.total })}</span>
      {item.status !== 'edition_changed' && <progress max={Math.max(1, item.total)} value={item.completed} aria-label={t(item.title)} />}
      <span className="product-learning-action">{t(item.status === 'completed' ? 'Review course' : 'Continue learning')} <CourseArrow /></span>
    </Link>)}</div> : data && !unavailable ? <p>{t('Choose a practical course. Your completed lessons stay connected to your account.')}</p> : null}
  </section>;
}
