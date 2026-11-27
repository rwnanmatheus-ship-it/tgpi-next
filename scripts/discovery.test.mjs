import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { discoveryContent, discoveryLocales, discoveryAlternates, isDiscoveryLocale, discoveryOrigin, discoveryTransitionRequiresRefresh, studyRequestLanguage, studyLanguageSwitch } from '../src/lib/discovery.ts';
import sharp from 'sharp';
const read = path => readFileSync(new URL('../'+path, import.meta.url),'utf8');
test('international variants have complete copy and reciprocal canonical alternates', () => {
 assert.equal(discoveryLocales.length,6);
 for(const locale of discoveryLocales){
  assert.equal(isDiscoveryLocale(locale),true);
  assert.equal(discoveryAlternates[locale],`${discoveryOrigin}/discover/${locale}`);
  for(const [key,value] of Object.entries(discoveryContent[locale])) assert.ok(value.trim().length>0,`${locale}:${key}`);
 }
 assert.equal(isDiscoveryLocale('xx'),false);
 assert.equal(isDiscoveryLocale('__proto__'),false);
 assert.equal(discoveryAlternates['x-default'],`${discoveryOrigin}/discover/en`);
});
test('localized campaign files exist at social preview size',async()=>{
 for(const locale of discoveryLocales){const m=await sharp(`public/banners/tgpi-${locale}.jpg`).metadata();assert.equal(m.width,1600);assert.equal(m.height,900);}
});
test('discovery handles invalid languages, keeps indexing signals and shares without automatic messages',()=>{
 const page=read('src/app/discover/[locale]/page.tsx');
 assert.ok(page.includes('notFound()'));
 assert.ok(page.includes('languages: discoveryAlternates'));
 assert.ok(page.includes('canonical: url'));
 assert.ok(page.includes('lang={locale}'));
 const sharing=read('src/components/discovery/DiscoveryShare.tsx');
 assert.ok(sharing.includes('navigator.share'));
 assert.ok(sharing.includes('navigator.clipboard.writeText'));
 assert.ok(sharing.includes('catch'));
 assert.ok(!sharing.includes('useEffect'));
});
test('request language is set only from valid URL and overwrites injected header',()=>{
 const proxy=read('src/proxy.ts');
 assert.ok(proxy.includes('headers.delete("x-tgpi-discovery-locale")'));
 assert.ok(proxy.includes('isDiscoveryLocale(match[1])'));
 const resolver=read('src/lib/localization/server.ts');
 assert.ok(resolver.indexOf("publicLocale") < resolver.indexOf('const selected'));
});
test('IndexNow verifies production ownership before notifying search engines',()=>{
 const source=read('scripts/indexnow-submit.mjs');
 const key=source.match(/const key = "([a-f0-9]+)"/)[1];
 assert.equal(read(`public/${key}.txt`),key);
 assert.ok(source.indexOf('Production ownership file')<source.indexOf('https://api.indexnow.org'));
 assert.ok(source.includes('result.status === 202'));
 assert.ok(source.includes('AbortSignal.timeout'));
 assert.ok(existsSync('.github/workflows/discovery-submit.yml'));
});

test('shared root refreshes on discovery transitions without looping or refreshing ordinary navigation', () => {
 assert.equal(discoveryTransitionRequiresRefresh(null, '/discover/en'), false);
 assert.equal(discoveryTransitionRequiresRefresh('/discover/en', '/discover/en'), false);
 assert.equal(discoveryTransitionRequiresRefresh('/discover/en', '/discover/fr'), true);
 assert.equal(discoveryTransitionRequiresRefresh('/discover/fr', '/courses'), true);
 assert.equal(discoveryTransitionRequiresRefresh('/courses', '/discover/de'), true);
 assert.equal(discoveryTransitionRequiresRefresh('/courses', '/countries'), false);
 assert.ok(read('src/app/layout.tsx').includes('<DiscoveryLocaleSync />'));
});

test('study edition URLs pin the reading language and preserve destinations when switching', () => {
  assert.equal(studyRequestLanguage('/guides/study/pt/japan'), 'pt-BR');
  assert.equal(studyRequestLanguage('/guides/study/es'), 'es');
  assert.equal(studyRequestLanguage('/guides/study/france'), null);
  assert.equal(studyRequestLanguage('/guides/study/es/canada/extra'), null);
  assert.equal(studyLanguageSwitch('/guides/study/en/japan', 'pt-BR'), '/guides/study/pt/japan');
  assert.equal(studyLanguageSwitch('/guides/study/pt', 'fr'), null);
  assert.equal(discoveryTransitionRequiresRefresh('/guides/study/pt/japan', '/guides/study/pt/canada'), false);
  assert.equal(discoveryTransitionRequiresRefresh('/guides/study/en/japan', '/guides/study/es/japan'), true);
  assert.equal(discoveryTransitionRequiresRefresh('/countries/japan', '/guides/study/pt/japan'), true);
});
