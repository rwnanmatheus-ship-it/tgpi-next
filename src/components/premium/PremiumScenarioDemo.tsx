'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLocale , LocalizedText } from '@/components/localization/LocaleProvider';
import { ScenarioComparison } from './PremiumScenarioLab';
import { emptyWorksheet } from '@/lib/intelligence/research-plan';
import type { SavedPremiumScenario } from '@/lib/premium-scenarios';
import styles from './PremiumScenarioLab.module.css';

const example = (id:string,country:string,iso2:string,currency:'EUR'|'CAD',months:number,housing:number|null):SavedPremiumScenario => ({
  id,slot:id.slice(-1),countryName:country,iso2,updatedAt:null,
  worksheet:{...emptyWorksheet(country,currency),months,monthly:{housing,food:200,transport:50,health:50,other:100},tuition:0,arrival:500,bufferPercent:10,sourceNote:'',quoteDate:''},
});
const examples=[example('sample-1','portugal','PT','EUR',12,600),example('sample-2','spain','ES','EUR',12,700),example('sample-3','canada','CA','CAD',12,900),example('sample-4','portugal','PT','EUR',6,600),example('sample-5','spain','ES','EUR',12,null)];
const labels=['Same currency and duration','Same currency and duration','Different currency','Different duration','Missing cost'];

export default function PremiumScenarioDemo() {
  const {locale,t}=useLocale();
  const [selected,setSelected]=useState(['sample-1','sample-2']);
  const names=new Intl.DisplayNames([locale],{type:'region'});
  return <main className="min-h-screen bg-[#F5F1E8] px-2 py-8 text-[#10233b] sm:px-6">
    <section className={styles.lab} aria-labelledby="scenario-demo-title">
      <p className={styles.eyebrow}>{t('Premium · Interactive example')}</p>
      <div className={styles.heading}><div><h1 id="scenario-demo-title" className="text-3xl font-semibold">{t('Try the scenario comparison')}</h1><p>{t('Explore how the comparison handles currencies, durations and missing costs before using your own research.')}</p></div><Link className={styles.secondary} href="/premium">{t('Open my Premium workspace')} ↗</Link></div>
      <p className={styles.notice}>{t('Illustrative examples only. These amounts are fictional and are not saved to your account.')}</p>
      <fieldset className={styles.picker}><legend>{t('Select up to three examples')}</legend>{examples.map((s,index)=><label className={styles.option} key={s.id}><input type="checkbox" checked={selected.includes(s.id)} disabled={!selected.includes(s.id)&&selected.length>=3} onChange={event=>setSelected(current=>event.target.checked?[...current,s.id].slice(0,3):current.filter(id=>id!==s.id))}/><span><strong>{t('Example {number}',{number:index+1})} · {names.of(s.iso2)}</strong><small>{t(labels[index])} · <LocalizedText text={s.worksheet.currency} /> · {t('{count} months',{count:s.worksheet.months})}</small></span></label>)}</fieldset>
      <ScenarioComparison scenarios={selected.flatMap(id=>examples.filter(s=>s.id===id))} example />
      <div className={styles.export}><Link className={styles.primary} href="/country-fit#research-workbench">{t('Start with my own research')} ↗</Link><Link className={styles.secondary} href="/pricing">{t('Compare plans')} ↗</Link></div>
    </section>
  </main>;
}
