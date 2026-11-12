import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { RESEARCH_COUNTRIES, RESEARCH_SOURCES, RESEARCH_TOPICS, researchSourcesFor, researchCoverage, researchSourceUrl } from '../src/lib/intelligence/global-research.ts';
import { RESEARCH_CHAPTERS } from '../src/lib/intelligence/research-chapters.ts';
import { DEEP_INDICATORS, DEEP_INDICATOR_IDS, deepObservationState, parseDeepSeries } from '../src/lib/intelligence/deep-context.ts';
const data = JSON.parse(readFileSync(new URL('../src/data/intelligence/deep-context.json', import.meta.url), 'utf8'));
const identities = new Set(RESEARCH_COUNTRIES.map(c=>c.slug));
test('all 195 catalog countries have twelve sourced chapters, without inventing legal summaries', () => {
  assert.equal(RESEARCH_COUNTRIES.length,195);
  for(const country of RESEARCH_COUNTRIES){
    const coverage = researchCoverage(country.slug);
    assert.equal(coverage.chapters,12);
    const sources=researchSourcesFor(country.slug);
    for(const topic of RESEARCH_TOPICS){assert.ok(sources.some(s=>s.topics.includes(topic)),`${country.slug}: ${topic}`);assert.equal(RESEARCH_CHAPTERS[topic].checks.length,3);}
  }
  assert.equal(researchCoverage('vatican-city').summaries,0);
  for(const hostile of ['__proto__','constructor','https://localhost','unknown']){assert.equal(researchCoverage(hostile),null);assert.deepEqual(researchSourcesFor(hostile),[]);}
});
test('source counts represent distinct resources, with known publishers and provenance',()=>{
  assert.ok(RESEARCH_SOURCES.length>100);
  assert.equal(new Set(RESEARCH_SOURCES.map(s=>s.id)).size,RESEARCH_SOURCES.length);
  assert.equal(new Set(RESEARCH_SOURCES.map(s=>s.url.replace(/\/$/,''))).size,RESEARCH_SOURCES.length);
  for(const s of RESEARCH_SOURCES){
    for(const value of [s.url,s.authorityUrl]){const u=new URL(value);assert.equal(u.protocol,'https:');assert.equal(u.username,'');assert.equal(u.password,'');}
    assert.ok(s.publisher);assert.ok(s.scope);assert.ok(s.title.trim());assert.doesNotMatch(s.title,/^Access Denied$|^Just a moment|^ERROR:/i);assert.ok(!s.country||identities.has(s.country));
    if(s.access.status==='retrieved'){assert.equal(s.access.httpStatus,200);assert.match(s.access.responseSha256,/^[a-f0-9]{64}$/);}
    for(const topic of s.topics)assert.ok(RESEARCH_TOPICS.includes(topic));
    assert.doesNotMatch(s.url,/cnsee\.org|ssnbs\.org|znaki\.fm|isteebu\.bi|tlcafrica/);
  }
});
test('regional resources and country deep links preserve applicability and publisher identity',()=>{
  assert.ok(!researchSourcesFor('brazil').some(s=>s.id==='eu-immigration'));
  assert.ok(researchSourcesFor('portugal').some(s=>s.id==='eu-immigration'));
  assert.equal(RESEARCH_SOURCES.filter(s=>s.id==='spc-data').length,1);
  for(const c of RESEARCH_COUNTRIES)for(const s of researchSourcesFor(c.slug)){
    const u=new URL(researchSourceUrl(s,c.slug));
    assert.equal(u.protocol,'https:');assert.equal(u.hostname,new URL(s.url).hostname);
  }
});
test('additional series retain exact country, value, period and response provenance',()=>{
  assert.equal(data.series.length,12);assert.ok(data.observations.length>2000);
  const seen=new Set();
  for(const s of data.series){assert.ok(DEEP_INDICATOR_IDS.includes(s.indicator));assert.match(s.responseSha256,/^[a-f0-9]{64}$/);assert.equal(s.observations,data.observations.filter(o=>o.indicator===s.indicator).length);assert.ok(Number.isFinite(Date.parse(s.retrievedAt)));}
  for(const row of data.observations){const key=`${row.country}:${row.indicator}`;assert.ok(!seen.has(key));seen.add(key);assert.ok(identities.has(row.country));const def=DEEP_INDICATORS[row.indicator];assert.ok(Number.isFinite(row.value)&&row.value>=def.min&&row.value<=def.max);assert.ok(row.year>=2015&&row.year<=2026);}
  assert.equal(data.observations.filter(o=>o.country==='vatican-city').length,0);
});
const fixtures=RESEARCH_COUNTRIES.slice(0,60);
const id='SL.TLF.CACT.ZS';
const fixture=()=>[{page:1,pages:1,total:60,lastupdated:'2026-11-11'},fixtures.map(c=>({countryiso3code:c.iso3,indicator:{id},date:'2025',value:61.2}))];
const now=new Date('2026-11-12');
test('source parser rejects partial, wrong-indicator, duplicate, future and implausible data',()=>{
  assert.equal(parseDeepSeries(fixture(),id,fixtures,now).length,60);
  for(const mutate of [p=>p[0].pages=2,p=>p[0].total=61,p=>p[1][0].indicator.id='wrong',p=>p[1][1]=p[1][0],p=>p[1][0].date='2027',p=>p[1][0].value=101,p=>p[1][0].value='61',p=>p[0].lastupdated='2027-01-01']){const p=fixture();mutate(p);assert.throws(()=>parseDeepSeries(p,id,fixtures,now));}
});
test('missing, old and overdue observations are never silently current',()=>{
  assert.equal(deepObservationState(undefined,undefined,now),'missing');
  const row={country:'brazil',indicator:id,value:61,year:2025};
  assert.equal(deepObservationState(row,'2026-11-11',now),'current');
  assert.equal(deepObservationState({...row,year:2018},'2026-11-11',now),'historical');
  assert.equal(deepObservationState(row,'2026-01-01',now),'stale');
  assert.equal(deepObservationState(row,'invalid',now),'stale');
  const p=fixture();p[1][0].value=null;assert.equal(parseDeepSeries(p,id,fixtures,now).length,59);
});
