'use client';

import Image, { getImageProps } from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import NavigationIcon from '@/components/navigation/NavigationIcon';
import type { CountryPhoto } from '@/lib/countries/editorial-photography';
import type { CountryLearningCourse } from '@/lib/country-learning';
import styles from './CountryPresentation.module.css';

type Props = {
  slug: string;
  name: string;
  region: string;
  capital: string;
  language: string;
  currency: string;
  photos: readonly CountryPhoto[];
  course?: Pick<CountryLearningCourse, 'title' | 'duration' | 'href' | 'image'>;
};

const chapters = ['destination', 'facts', 'arrival', 'budget'] as const;
const imageSizes = '(min-aspect-ratio: 11/10) 61vw, 100vw';

export default function CountryPresentation({ slug, name, region, capital, language, currency, photos, course }: Props) {
  const { t } = useLocale();
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const chapter = chapters[index];
  const isCourse = chapter === 'arrival' && Boolean(course);
  const scene = photos[index % Math.max(1, photos.length)];
  const src = isCourse && course ? course.image : scene?.src ?? `/images/countries/identity/${slug}.webp`;
  const nextChapter = chapters[index + 1];
  const upcomingSrc = nextChapter === 'arrival' && course ? course.image
    : photos[(index + 1) % Math.max(1, photos.length)]?.src ?? `/images/countries/identity/${slug}.webp`;

  useEffect(() => {
    if (!open || !nextChapter || upcomingSrc === src) return;
    // Warm the same responsive variant that the following chapter will display.
    const { props } = getImageProps({ src: upcomingSrc, alt: '', fill: true, sizes: imageSizes, quality: 88 });
    const image = new window.Image();
    image.fetchPriority = 'low';
    image.sizes = props.sizes ?? imageSizes;
    if (props.srcSet) image.srcset = props.srcSet;
    image.src = props.src;
  }, [open, nextChapter, src, upcomingSrc]);

  const title = chapter === 'destination' ? t(name)
    : chapter === 'facts' ? t('At a glance')
    : chapter === 'arrival' ? t('Prepare for arrival')
    : t('Build your relocation budget');

  function start() {
    setIndex(0);
    setOpen(true);
    dialog.current?.showModal();
  }

  function step(delta: number) {
    setIndex(previous => Math.max(0, Math.min(chapters.length - 1, previous + delta)));
  }

  function onKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  function finishSwipe(event: TouchEvent<HTMLElement>) {
    const start = touch.current;
    touch.current = null;
    const end = event.changedTouches[0];
    if (!start || !end) return;
    const dx = end.clientX - start.x;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(end.clientY - start.y) * 1.6) step(dx < 0 ? 1 : -1);
  }

  const facts = [['Capital', capital], ['Language', language], ['Currency', currency]].filter(([, value]) => Boolean(value));
  return <>
    <button type="button" className={styles.trigger} aria-haspopup="dialog" onClick={start}>
      <NavigationIcon name="media" width={17} height={17} />{t('Presentation mode')}
    </button>
    <dialog ref={dialog} className={styles.viewer} aria-labelledby={titleId} onKeyDown={onKey} onClose={() => setOpen(false)}>
      {open && <div className={styles.layout}>
        <div className={styles.timeline} aria-hidden="true">
          {chapters.map((item, position) => <span key={item} data-lit={position <= index} />)}
        </div>
        <header className={styles.bar}>
          <span className={styles.brand}>TGPI</span><span className={styles.rule} /><span>{t('Country dossier')}</span>
          <button type="button" className={styles.exit} aria-label={t('Close presentation')} onClick={() => dialog.current?.close()}>
            <NavigationIcon name="close" width={20} height={20} />
          </button>
        </header>
        <div className={styles.stage}
          onTouchStart={event => { const first = event.touches[0]; touch.current = first && event.touches.length === 1 ? { x: first.clientX, y: first.clientY } : null; }}
          onTouchCancel={() => { touch.current = null; }} onTouchEnd={finishSwipe}>
          <div className={styles.photograph}>
            <Image key={src} src={src} alt={isCourse ? '' : t(scene?.alt ?? '')} fill sizes={imageSizes}
              quality={88} loading="eager" style={{ objectFit: 'cover', objectPosition: isCourse ? 'center' : scene?.position ?? 'center' }} />
            {!isCourse && scene && <a href={scene.creditUrl} target="_blank" rel="noreferrer" className={styles.credit}>
              {t(scene.location)} · {scene.photographer} ↗
            </a>}
          </div>
          <div className={styles.content} aria-live="polite" aria-atomic="true">
            <p className={styles.kicker}>{chapter === 'destination' ? t(region) : t(name)}</p>
            <h2 id={titleId}>{title}</h2>
            {chapter === 'facts' && <dl className={styles.facts}>{facts.map(([key, value]) =>
              <div key={key}><dt>{t(key)}</dt><dd>{t(value)}</dd></div>
            )}</dl>}
            {chapter === 'arrival' && (course ? <>
              <p className={styles.detail}>{t(course.title)} <span>· {t(course.duration)}</span></p>
              <Link href={course.href} className={styles.action} onClick={() => dialog.current?.close()}>{t('Open course')} ↗</Link>
            </> : <a href="#country-learning" className={styles.action} onClick={() => dialog.current?.close()}>{t('Explore language courses')} ↓</a>)}
            {chapter === 'budget' && <>
              <p className={styles.detail}>{t('Price a month of housing, transport and everyday expenses in the city you are considering.')}</p>
              <a href="#research-workbench" className={styles.action} onClick={() => dialog.current?.close()}>{t('Open the budget planner')} ↓</a>
            </>}
          </div>
        </div>
        <footer className={styles.controls}>
          <span>{t('Chapter {current} of {total}', { current: index + 1, total: chapters.length })}</span>
          <button type="button" disabled={index === 0} aria-label={t('Previous chapter')} onClick={() => step(-1)}>
            <NavigationIcon className={styles.previous} name="arrow" width={20} height={20} />
          </button>
          <button type="button" disabled={index === chapters.length - 1} aria-label={t('Next chapter')} onClick={() => step(1)}>
            <NavigationIcon name="arrow" width={20} height={20} />
          </button>
        </footer>
      </div>}
    </dialog>
  </>;
}
