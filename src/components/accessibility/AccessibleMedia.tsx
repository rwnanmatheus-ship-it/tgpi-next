'use client';

import { useId, useRef, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { accessCopy } from '@/lib/localization/accessibility-center';
import type { AccessibleMediaAsset, MediaLanguage } from '@/lib/learning/accessible-media';
import styles from './accessibility-center.module.css';

function timestamp(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

export default function AccessibleMedia({ asset }: { asset: AccessibleMediaAsset }) {
  const { locale } = useLocale();
  const language: MediaLanguage = locale === 'pt-BR' ? 'pt-BR' : 'en';
  const [transcriptLanguage, setTranscriptLanguage] = useState<MediaLanguage>(language);
  const [error, setError] = useState(false);
  const title = accessCopy(locale, 'mediaTitle');
  const id = useId();
  const player = useRef<HTMLVideoElement>(null);

  function jump(seconds: number) {
    const video = player.current;
    if (!video || video.error) return;
    video.currentTime = seconds;
    video.focus({ preventScroll: true });
    video.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }

  return <figure className={styles.mediaPlayer} aria-labelledby={id}>
    <figcaption id={id}>{title}</figcaption>
    <p id={`${id}-info`}>{accessCopy(locale, 'mediaInfo')}</p>
    <video ref={player} src={asset.source} poster={asset.poster} controls playsInline preload="none"
      tabIndex={0} aria-labelledby={id} aria-describedby={`${id}-info`} onError={() => setError(true)} lang={asset.language}>
      <track kind="captions" srcLang="en" label={accessCopy(locale, 'english') + ' (CC)'} src={asset.captions.en} default={language === 'en'} />
      <track kind="subtitles" srcLang="pt-BR" label={accessCopy(locale, 'portuguese') + ' (Brasil)'} src={asset.captions['pt-BR']} default={language === 'pt-BR'} />
    </video>
    {error && <p role="status">{accessCopy(locale, 'playError')}</p>}
    <details open={error || undefined} className={styles.transcript}>
      <summary>{accessCopy(locale, 'transcript')}</summary>
      <div className={styles.languages} aria-label={accessCopy(locale, 'transcript')} role="group">
        <button type="button" lang="pt-BR" aria-pressed={transcriptLanguage === 'pt-BR'} onClick={() => setTranscriptLanguage('pt-BR')}>{accessCopy(locale, 'portuguese')}</button>
        <button type="button" lang="en" aria-pressed={transcriptLanguage === 'en'} onClick={() => setTranscriptLanguage('en')}>{accessCopy(locale, 'english')}</button>
      </div>
      <ol className={styles.cues}>
        {asset.transcript.map(cue => <li key={cue.seconds}>
          <button type="button" disabled={error} aria-label={`${accessCopy(locale, 'jump')} ${timestamp(cue.seconds)}`} onClick={() => jump(cue.seconds)}>{timestamp(cue.seconds)}</button>
          <p lang={transcriptLanguage}>{cue[transcriptLanguage]}</p>
        </li>)}
      </ol>
    </details>
  </figure>;
}
