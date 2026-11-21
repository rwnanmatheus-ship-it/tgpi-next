import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { resolve } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { academyLocalizationFixture } from './helpers/academy-localization.mjs';

const h=academyLocalizationFixture();
const {languageProfiles}=h.load(resolve('src/data/courses/academy/languages/profiles.ts'));
const {languageCatalog}=h.load(resolve('src/data/courses/academy/languages/catalog.ts'));
const {languageOverview}=h.load(resolve('src/data/courses/academy/languages/listing.ts'));
const {targetLanguageOptions}=h.load(resolve('src/lib/learning/language-options.ts'));
const {parseCatalogFilters,catalogFilterParams,defaultCatalogFilters}=h.load(resolve('src/lib/learning/catalog-filters.ts'));
const {courseArtwork}=h.load(resolve('src/lib/cinematic-art.ts'));
const {localizeAcademyCourse}=h.load(resolve('src/lib/localization/academy-content.ts'));
const languages=h.academyCourses.filter(course=>course.targetLanguage);

test('200 language laboratories retain the 1000 existing academy courses and correct language identities',()=>{
  assert.equal(languageProfiles.length,20);assert.equal(targetLanguageOptions.length,20);
  assert.equal(languageCatalog.length,200);assert.equal(languageOverview.length,200);assert.equal(languages.length,200);
  assert.equal(h.academyCourses.filter(course=>!course.targetLanguage).length,1000);
  assert.equal(new Set(h.academyCourses.map(course=>course.id)).size,1200);
  assert.equal(new Set(languageCatalog.map(course=>course.title)).size,200);
  for(const profile of languageProfiles){
    assert.equal(languageCatalog.filter(course=>course.targetCode===profile.code).length,10);
    assert.equal(profile.phrases.length,10);
    for(const phrases of profile.phrases){assert.equal(phrases.length,6);assert.equal(new Set([...phrases,...profile.repair]).size,8);}
    assert.ok(new Intl.Locale(profile.speech));
    assert.equal(profile.direction,profile.code==='ar'?'rtl':'ltr');
  }
});

test('all lessons have native-language text, matched workload and a protected assessment with all eight intents',()=>{
  for(const course of languages){
    assert.equal(course.lessons.length,8);assert.equal(course.minutes,360);
    assert.equal(course.minutes,course.lessons.reduce((sum,lesson)=>sum+lesson.minutes,course.portfolioMinutes+course.assessmentMinutes));
    assert.equal(course.language,'pt-BR');assert.equal(course.languagePractice.length,14);
    assert.ok(course.scopeNotice.includes('Não constitui curso completo'));
    const bank=h.academyQuestions(course.id);
    assert.equal(bank.length,24);assert.equal(new Set(bank.map(question=>question.id)).size,24);
    const essentials=bank.filter(question=>question.essential);
    assert.equal(essentials.length,8);
    assert.equal(new Set(essentials.map(question=>question.options.find(option=>option.id===question.correctOptionId).label)).size,8);
    for(const question of bank){
      assert.equal(new Set(question.options.map(option=>option.label)).size,3);
      assert.equal(question.options.filter(option=>option.id===question.correctOptionId).length,1);
      assert.ok(question.options.every(option=>option.language));
    }
    for(const lesson of course.lessons){
      const targetSections=lesson.sections.filter(section=>section.textLanguage);
      assert.ok(targetSections.length>=2);
      assert.ok(targetSections.every(section=>section.textLanguage===course.targetLanguage.speech&&section.direction===course.targetLanguage.direction&&section.preserveBody));
      assert.equal(bank.filter(question=>question.lessonId===lesson.id).length,3);
      assert.ok(lesson.references.every(url=>new URL(url).protocol==='https:'));
      assert.ok(lesson.sections.reduce((sum,section)=>sum+section.body.length,0)>2000);
    }
    assert.ok(!JSON.stringify(course).includes('correctOptionId'));
    assert.equal(h.getAcademyCourse(course.id,h.BASELINE_ACADEMY_VERSION),undefined);
    for(const locale of h.locales){const translated=localizeAcademyCourse(course,locale);assert.deepEqual(translated.languagePractice,course.languagePractice);assert.deepEqual(translated.lessons,course.lessons);}
  }
});

test('target-language filtering is independent of instruction language and round-trips in catalog URLs',()=>{
  for(const [code] of targetLanguageOptions){
    const value=parseCatalogFilters(new URLSearchParams({target:code,language:'pt-BR'}));
    assert.equal(value.target,code);assert.equal(value.language,'pt-BR');
    assert.equal(catalogFilterParams(value).get('target'),code);
  }
  assert.equal(parseCatalogFilters(new URLSearchParams('target=any')).target,'any');
  assert.equal(parseCatalogFilters(new URLSearchParams('target=not-a-language')).target,'all');
  assert.equal(catalogFilterParams(defaultCatalogFilters).has('target'),false);
});

test('all twenty target languages are discoverable by English and native names',()=>{
  const {courseSearchScore}=h.load(resolve('src/lib/learning/catalog-search.ts'));
  const english=['English','Spanish','French','German','Japanese','Korean','Mandarin','Italian','Portuguese','Arabic','Hindi','Swahili','Indonesian','Turkish','Russian','Dutch','Swedish','Polish','Vietnamese','Thai'];
  languageProfiles.forEach((profile,index)=>{
    const listing=languageOverview.find(course=>course.targetLanguage===profile.code);
    assert.ok(courseSearchScore(listing,english[index])>0,english[index]);
    assert.ok(courseSearchScore(listing,profile.native)>0,profile.native);
  });
});

test('every language course has its own high resolution WebP without exact or normalized-image duplicates',async()=>{
  const files=new Set(),hashes=new Set(),normalized=new Set();
  const existingHashes=new Set(h.academyCourses.filter(course=>!course.targetLanguage).map(course=>createHash('sha256').update(readFileSync(resolve('public'+course.image))).digest('hex')));
  for(const course of languages){
    const image=courseArtwork(course.id);
    assert.equal(image,course.image);assert.ok(!files.has(image));files.add(image);
    const path=resolve('public'+image);assert.ok(existsSync(path),`Missing cover: ${course.id}`);
    const bytes=readFileSync(path),meta=await sharp(bytes).metadata();
    assert.equal(meta.format,'webp');assert.ok(meta.width>=1600);assert.ok(meta.height>=890);
    const digest=createHash('sha256').update(bytes).digest('hex');assert.ok(!hashes.has(digest),`Duplicate cover: ${course.id}`);assert.ok(!existingHashes.has(digest),`Reused earlier cover: ${course.id}`);hashes.add(digest);
    const pixels=await sharp(bytes).resize(48,27,{fit:'fill'}).removeAlpha().raw().toBuffer();
    const small=createHash('sha256').update(pixels).digest('hex');assert.ok(!normalized.has(small));normalized.add(small);
  }
});

test('study UI preserves target direction and correct speech tag while speech practice cannot assign grades',()=>{
  const study=readFileSync('src/components/courses/academy/AcademyStudy.tsx','utf8');
  const practice=readFileSync('src/components/courses/academy/LanguagePractice.tsx','utf8');
  const service=readFileSync('src/lib/learning/academy/service.server.ts','utf8');
  assert.ok(study.includes('section.textLanguage'));assert.ok(study.includes('dir={section.direction}'));
  assert.ok(practice.includes('next.lang=target.speech'));assert.ok(practice.includes('item.localService'));
  assert.ok(!practice.includes('fetch('));assert.ok(!practice.includes('SpeechRecognition'));
  assert.ok(service.includes('academyAssessmentRequirements(course).requiresCalculation'));
  assert.ok(service.includes('academyAssessmentRequirements(course).evidence'));
  assert.ok(service.includes('bank.filter(question => question.essential)'));
});

test('speech selects only local compatible varieties and does not confuse Mandarin with Cantonese',()=>{
  const {selectLocalSpeechVoice}=h.load(resolve('src/lib/learning/speech-voice.ts'));
  const voice=(lang,localService=true)=>({lang,localService});
  assert.equal(selectLocalSpeechVoice([voice('zh-HK')],'zh-CN'),undefined);
  assert.equal(selectLocalSpeechVoice([voice('yue-HK')],'zh-CN'),undefined);
  assert.equal(selectLocalSpeechVoice([voice('zh-TW')],'zh-CN').lang,'zh-TW');
  assert.equal(selectLocalSpeechVoice([voice('zh-Hans-CN')],'zh-CN').lang,'zh-Hans-CN');
  assert.equal(selectLocalSpeechVoice([voice('en-US',false)],'en-US'),undefined);
  assert.equal(selectLocalSpeechVoice([voice('pt-PT')],'pt-BR'),undefined);
  assert.equal(selectLocalSpeechVoice([voice('pt-BR')],'pt-BR').lang,'pt-BR');
  assert.equal(selectLocalSpeechVoice([voice('en-GB'),voice('en-US')],'en-US').lang,'en-US');
});

test('language laboratory controls cover all six interface locales without translating target-language text',()=>{
  const {languageLabMessages,languageLabCopy}=h.load(resolve('src/lib/localization/language-lab-copy.ts'));
  for(const values of Object.values(languageLabMessages))for(const locale of h.locales)assert.ok(values[locale]?.trim());
  assert.equal(languageLabCopy('pt-BR','Language to learn'),'Idioma que quero aprender');
  assert.equal(languageLabCopy('fr','Language to learn'),'Langue à apprendre');
  assert.ok(languageLabCopy('de','Session practice status',{done:3,total:14}).includes('3 von 14'));
});

test('assessment generation, visible criteria and credential evidence share the language-only policy',()=>{
  const {academyAssessmentRequirements}=h.load(resolve('src/lib/learning/academy/assessment-policy.ts'));
  const numeric=academyAssessmentRequirements(h.getAcademyCourse('country-fit'));
  assert.equal(numeric.requiresCalculation,true);assert.match(numeric.evidence,/fresh numerical case/);
  const dictionaries=Object.fromEntries(h.locales.map(locale=>[locale,JSON.parse(readFileSync(`public/locales/${locale}.json`,'utf8'))]));
  for(const course of languages){
    const policy=academyAssessmentRequirements(course);
    assert.equal(policy.requiresCalculation,false);
    for(const field of ['journey','minimum','explanation','evidence']){
      assert.ok(!policy[field].includes('numerical'));
      for(const locale of h.locales)assert.ok(dictionaries[locale][policy[field]]?.trim());
    }
  }
});

test('public previews render native language tags and Arabic RTL without advertising arithmetic',async()=>{
  const preview=academyLocalizationFixture({
    '@/lib/localization/server':{getLocale:async()=> 'en'},
    '@/components/localization/LocaleProvider':{useLocale:()=>({locale:'en',t:text=>text})},
    'next/image':{__esModule:true,default:({src,alt})=>React.createElement('img',{src,alt})},
    'next/link':{__esModule:true,default:({href,children,...props})=>React.createElement('a',{href,...props},children)},
  });
  const Overview=preview.load(resolve('src/components/courses/academy/AcademyOverview.tsx')).default;
  for(const code of ['ar','ja','es']){
    const course=preview.getAcademyCourse(`idiomas-${code}-primeiras-conversas`);
    const html=renderToStaticMarkup(await Overview({course}));
    assert.ok(html.includes(`lang="${course.targetLanguage.speech}" dir="${course.targetLanguage.direction}"`));
    assert.ok(html.includes(course.languagePractice[0].text));
    assert.ok(!html.includes('numerical case'));
    assert.ok(html.includes('all essential language checks correct'));
  }
});
