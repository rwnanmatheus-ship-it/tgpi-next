'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { studyCopy } from '@/lib/localization/study-accessibility';
import styles from './study-reader.module.css';

type Passage = { text: string; lang?: string };
export type ReadingSection = { title: string; titleLang?: string; passages: Passage[] };
type Preferences = { size: 100 | 125 | 150 | 200; rate: 0.75 | 1 | 1.25; spacing: boolean; contrast: boolean };
type Playback = 'idle' | 'playing' | 'paused';
const storageKey = 'tgpi.study-reader.v1';
const defaults: Preferences = { size: 100, rate: 1, spacing: false, contrast: false };

function preferences(): Preferences {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    return {
      size: saved?.size === 125 || saved?.size === 150 || saved?.size === 200 ? saved.size : 100,
      rate: saved?.rate === 0.75 || saved?.rate === 1.25 ? saved.rate : 1,
      spacing: saved?.spacing === true,
      contrast: saved?.contrast === true,
    };
  } catch {
    return defaults;
  }
}

function speechChunks(text: string) {
  return text.trim().match(/.{1,180}(?=\s|$)|\S{1,180}/gu) ?? [];
}

export default function StudyReader({ title, language, sections, atlas = false }: {
  title: string;
  language: string;
  sections: ReadingSection[];
  atlas?: boolean;
}) {
  const { locale } = useLocale();
  const label = (key: Parameters<typeof studyCopy>[1]) => studyCopy(locale, key);
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const [index, setIndex] = useState(0);
  const [settings, setSettings] = useState(defaults);
  const [playback, setPlayback] = useState<Playback>('idle');
  const [issue, setIssue] = useState<'voiceError' | 'voiceMissing' | null>(null);
  const section = sections[index];

  useEffect(() => () => {
    if (utterance.current) {
      utterance.current.onend = utterance.current.onerror = null;
      window.speechSynthesis.cancel();
      utterance.current = null;
    }
  }, []);

  function stop() {
    if (utterance.current) {
      utterance.current.onend = utterance.current.onerror = null;
      window.speechSynthesis.cancel();
      utterance.current = null;
    }
    setPlayback('idle');
  }

  function changeSection(next: number) {
    if (next < 0 || next >= sections.length) return;
    stop();
    setIssue(null);
    setIndex(next);
  }

  function update(next: Preferences) {
    setSettings(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Session controls still work. */ }
  }

  function speak() {
    if (!section) return;
    stop();
    setIssue(null);
    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') {
      setIssue('voiceMissing');
      return;
    }
    const voices = synth.getVoices().filter(voice => voice.localService);
    const queue = [{ text: section.title, lang: section.titleLang }, ...section.passages].flatMap(passage => {
      const lang = passage.lang ?? language;
      const base = lang.toLowerCase().split('-')[0];
      const voice = voices.find(item => item.lang.toLowerCase() === lang.toLowerCase())
        ?? voices.find(item => item.lang.toLowerCase().split('-')[0] === base);
      return speechChunks(passage.text).map(text => ({ text, voice }));
    });
    if (!queue.length || queue.some(item => !item.voice)) {
      setIssue('voiceMissing');
      return;
    }
    let position = 0;
    const play = () => {
      const item = queue[position++];
      if (!item?.voice) { stop(); return; }
      const speech = new SpeechSynthesisUtterance(item.text);
      speech.lang = item.voice.lang;
      speech.voice = item.voice;
      speech.rate = settings.rate;
      speech.onend = () => {
        if (utterance.current !== speech) return;
        try { play(); } catch { stop(); setIssue('voiceError'); }
      };
      speech.onerror = () => {
        if (utterance.current !== speech) return;
        stop();
        setIssue('voiceError');
      };
      utterance.current = speech;
      synth.speak(speech);
    };
    try {
      setPlayback('playing');
      play();
    } catch {
      stop();
      setIssue('voiceError');
    }
  }

  function download() {
    const text = [title, ...sections.map(part => [part.title, ...part.passages.map(passage => passage.text)].join('\n\n'))].join('\n\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TGPI.txt';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (!section) return null;

  return <>
    <button ref={trigger} className={styles.trigger} type="button" aria-haspopup="dialog" onClick={() => {
      setSettings(preferences());
      setIssue(null);
      dialog.current?.showModal();
    }}>{label('reader')}</button>
    <dialog ref={dialog} className={styles.panel} aria-labelledby={id} data-contrast={settings.contrast} onClose={() => {
      stop();
      trigger.current?.focus({ preventScroll: true });
    }}>
      <header>
        <div><h2 id={id}>{label('reader')}</h2><p lang={language}>{title}</p></div>
        <button type="button" onClick={() => dialog.current?.close()}>{label('close')}</button>
      </header>
      <div className={styles.controls}>
        <label className={styles.chapter}>{label('chapter')}
          <select value={index} onChange={event => changeSection(Number(event.target.value))}>
            {sections.map((item, position) => <option lang={item.titleLang ?? language} key={position} value={position}>{position + 1}. {item.title}</option>)}
          </select>
        </label>
        <button type="button" aria-disabled={index === 0} onClick={() => changeSection(index - 1)}>{label('previous')}</button>
        <button type="button" aria-disabled={index === sections.length - 1} onClick={() => changeSection(index + 1)}>{label('next')}</button>
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={() => {
          if (playback === 'idle') speak();
          else if (playback === 'playing') { window.speechSynthesis.pause(); setPlayback('paused'); }
          else { window.speechSynthesis.resume(); setPlayback('playing'); }
        }}>{label(playback === 'playing' ? 'pause' : playback === 'paused' ? 'resume' : 'listen')}</button>
        <button type="button" aria-disabled={playback === 'idle'} onClick={() => { if (playback !== 'idle') stop(); }}>{label('stop')}</button>
        <label>{label('speed')}
          <select value={settings.rate} onChange={event => { stop(); update({ ...settings, rate: Number(event.target.value) as Preferences['rate'] }); }}>
            {[0.75, 1, 1.25].map(rate => <option value={rate} key={rate}>{rate}×</option>)}
          </select>
        </label>
      </div>
      <p role="status">{issue ? label(issue) : ''}</p>
      <details>
        <summary>{label('settings')}</summary>
        <div className={styles.controls}>
          <label>{label('size')}
            <select value={settings.size} onChange={event => update({ ...settings, size: Number(event.target.value) as Preferences['size'] })}>
              {[100, 125, 150, 200].map(size => <option value={size} key={size}>{size}%</option>)}
            </select>
          </label>
          <label><input type="checkbox" checked={settings.spacing} onChange={event => update({ ...settings, spacing: event.target.checked })} />{label('spacing')}</label>
          <label><input type="checkbox" checked={settings.contrast} onChange={event => update({ ...settings, contrast: event.target.checked })} />{label('contrast')}</label>
        </div>
      </details>
      <section className={styles.reading} lang={language} aria-labelledby={`${id}-chapter`} data-spacing={settings.spacing} style={{ fontSize: `${settings.size}%` }}>
        <h3 id={`${id}-chapter`} lang={section.titleLang} aria-live="polite">{section.title}</h3>
        {section.passages.map((passage, position) => <p key={position} lang={passage.lang}>{passage.text}</p>)}
      </section>
      <div className={styles.controls}>
        <button type="button" onClick={download}>{label('download')}</button>
        {atlas && <Link href="/atlas?guide=learning&support=plain-language" target="_blank" rel="noopener noreferrer" aria-describedby={`${id}-atlas`}>{label('atlas')}</Link>}
      </div>
      {atlas && <p id={`${id}-atlas`}>{label('atlasHint')}</p>}
    </dialog>
  </>;
}
