'use client';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/components/localization/LocaleProvider';
import { languageLabCopy } from '@/lib/localization/language-lab-copy';
import { selectLocalSpeechVoice } from '@/lib/learning/speech-voice';
import type { AcademyCourse } from '@/lib/learning/academy/types';
import styles from './language-practice.module.css';

type Props={target:NonNullable<AcademyCourse['targetLanguage']>;phrases:NonNullable<AcademyCourse['languagePractice']>};
export default function LanguagePractice({target,phrases}:Props) {
  const {locale}=useLocale();
  const copy=(key:string,values:Record<string,string|number>={})=>languageLabCopy(locale,key,values);
  const [index,setIndex]=useState(0),[revealed,setRevealed]=useState(false),[mode,setMode]=useState<'read'|'recall'|'listen'>('read');
  const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]),[rate,setRate]=useState(0.8),[speaking,setSpeaking]=useState(false),[error,setError]=useState('');
  const [reviewed,setReviewed]=useState<number[]>([]);
  const utterance=useRef<SpeechSynthesisUtterance|null>(null);
  const phrase=phrases[index];
  const voice=selectLocalSpeechVoice(voices,target.speech);
  useEffect(()=>{
    const synth=window.speechSynthesis;
    if(!synth)return;
    const update=()=>setVoices(synth.getVoices().filter(item=>item.localService));
    update();synth.addEventListener('voiceschanged',update);
    return()=>{synth.removeEventListener('voiceschanged',update);if(utterance.current){utterance.current.onend=utterance.current.onerror=null;synth.cancel();utterance.current=null;}};
  },[]);
  function stop(){if(utterance.current){utterance.current.onend=utterance.current.onerror=null;window.speechSynthesis?.cancel();utterance.current=null;}setSpeaking(false);}
  function play(){
    stop();setError('');
    if(!voice||!window.speechSynthesis||typeof SpeechSynthesisUtterance==='undefined'){setError('No local voice');return;}
    const next=new SpeechSynthesisUtterance(phrase.text);next.lang=target.speech;next.voice=voice;next.rate=rate;
    next.onend=()=>{utterance.current=null;setSpeaking(false);};
    next.onerror=()=>{utterance.current=null;setSpeaking(false);setError('Playback failed');};
    utterance.current=next;setSpeaking(true);window.speechSynthesis.speak(next);
  }
  function change(next:number){stop();setIndex((next+phrases.length)%phrases.length);setRevealed(false);setError('');}
  return <section className={styles.panel} lang={locale} aria-label={`${copy('Language laboratory')}: ${target.name}`}>
    <div className={styles.heading}><div><p className={styles.kicker}>{copy('Language laboratory')}</p><h3><span lang="pt-BR">{target.name}</span> <span lang={target.speech} dir={target.direction}>{target.native}</span></h3></div><span className={styles.count}>{index+1} / {phrases.length}</span></div>
    <div className={styles.controls} role="group" aria-label={copy('Practice mode')}>{([['read','Read and understand'],['recall','Recall without notes'],['listen','Listen without reading']] as const).map(([value,label])=><button type="button" key={value} aria-pressed={mode===value} onClick={()=>{stop();setMode(value);setRevealed(false);}}>{copy(label)}</button>)}</div>
    <div className={styles.card} aria-live="polite">
      {mode==='recall'?<><p className={styles.prompt}>{copy('How would you express this?')}</p><p lang="pt-BR">{phrase.meaning}</p>{revealed&&<p className={styles.expression} lang={target.speech} dir={target.direction}>{phrase.text}</p>}</>:<>{(mode==='read'||revealed)&&<p className={styles.expression} lang={target.speech} dir={target.direction}>{phrase.text}</p>}{mode==='listen'&&!revealed&&<p>{copy('Listen before revealing the meaning.')}</p>}{revealed&&<p lang="pt-BR">{phrase.meaning}</p>}</>}
      <div className={styles.controls}><button type="button" onClick={speaking?stop:play} disabled={!voice}>{copy(speaking?'Stop audio':'Listen to item')}</button><label>{copy('Speed')}<select value={rate} onChange={event=>{stop();setRate(Number(event.target.value));}}><option value={0.65}>{copy('Slow')}</option><option value={0.8}>{copy('Moderate')}</option><option value={1}>{copy('Natural')}</option></select></label><button type="button" onClick={()=>setRevealed(value=>!value)}>{copy(revealed?'Hide answer':'Reveal and check')}</button></div>
      {error&&<p role="status">{copy(error)}</p>}
      {!voice&&<p className={styles.note}>{copy('No local voice')}</p>}
    </div>
    <div className={styles.controls}><button type="button" onClick={()=>change(index-1)}>{copy('Previous item')}</button><button type="button" onClick={()=>{setReviewed(previous=>previous.includes(index)?previous:[...previous,index]);change(index+1);}}>{copy('Practiced · next')}</button><button type="button" onClick={()=>change(index+3)}>{copy('Vary order')}</button></div>
    <p className={styles.note} role="status">{copy('Session practice status',{done:reviewed.length,total:phrases.length})}</p>
    <p className={styles.note}>{copy('Device speech scope')}</p>
  </section>;
}
