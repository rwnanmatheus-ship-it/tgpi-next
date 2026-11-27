import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { selectPublishedCourses, directoryPageCount, directoryHref, parseDirectoryPage, pageCourses, relatedPublishedCourses, courseListSchema, courseRss, catalogVariantNeedsNoindex, structuredDataJson } from '../src/lib/seo/course-directory.ts';
import { publicSitemapUrls, changedPublicUrls } from './indexnow-plan.mjs';
import { previousProductionSha, comparisonSourcePlan } from './production-source-plan.mjs';
import { rotatingUrls } from './seo-audit.mjs';
const course=(id,extra={})=>({id,title:id,href:`/courses/${id}`,status:'available',goal:'future-of-work',desc:'A < B & C',category:'Skills',...extra});
test('public directory excludes draft, unsafe and noncanonical records and deduplicates deterministically',()=>{
 const items=selectPublishedCourses([course('b'),course('a'),course('b',{title:'duplicate'}),course('planned',{status:'planned'}),course('alias',{href:'/courses/canonical'}),course('draft',{learningPolicy:{publicationStatus:'early_access'}}),course('bad?x'),course('directory')]);
 assert.deepEqual(items.map(c=>c.id),['a','b']);
});
test('pagination covers the catalogue once and rejects invalid or out-of-range pages',()=>{
 const courses=Array.from({length:123},(_,i)=>course(`course-${i}`));
 assert.equal(directoryPageCount(courses.length),4);
 const traversed=Array.from({length:4},(_,i)=>pageCourses(courses,i+1)).flat();
 assert.equal(traversed.length,123);assert.equal(new Set(traversed.map(c=>c.id)).size,123);
 for(const value of ['0','-1','01','1.5','2?q=x','5','999999999'])assert.equal(parseDirectoryPage(value,123),undefined);
 assert.equal(parseDirectoryPage('4',123),4);assert.equal(directoryHref(1),'/courses/directory');assert.equal(directoryHref(2),'/courses/directory/2');
 const schema=courseListSchema(pageCourses(courses,2),2,123);
 assert.equal(schema.itemListElement[0].position,41);assert.equal(schema.itemListElement.length,40);
});
test('related courses share a goal, omit self and keep a strict result limit',()=>{
 const records=[course('a'),course('b'),course('c',{goal:'global-mobility'}),course('d')];
 assert.deepEqual(relatedPublishedCourses(records,'a',1).map(c=>c.id),['b']);
 assert.deepEqual(relatedPublishedCourses(records,'unknown'),[]);
});
test('course feed escapes XML without fabricating dates',()=>{
 const xml=courseRss([course('a',{title:'A & B <skills>'})]);
 assert.ok(xml.includes('A &amp; B &lt;skills&gt;'));assert.ok(xml.includes('A &lt; B &amp; C'));assert.ok(!xml.includes('<pubDate>'));assert.ok(!xml.includes('<lastBuildDate>'));
});
test('IndexNow consumes only canonical sitemap URLs and maps actual public source changes',()=>{
 const origin='https://www.theglobalpolymath.com';
 const xml=['/','/courses','/courses/a','/courses/directory','/countries','/countries/portugal','/profile','/courses/a/study','/account','/courses?q=x'].map(p=>`<loc>${origin}${p}</loc>`).join('')+'<loc>https://evil.test/x</loc>';
 const urls=publicSitemapUrls(xml);
 assert.equal(urls.length,6);assert.ok(!urls.some(u=>u.includes('profile')||u.includes('?')||u.includes('evil')));
 assert.deepEqual(changedPublicUrls(['docs/readme.md'],urls),[]);
 assert.deepEqual(changedPublicUrls(['src/components/home/v4/InstitutionalHome.tsx'],urls),[origin+'/']);
 assert.deepEqual(changedPublicUrls(['src/lib/home-content.ts'],urls),[origin+'/']);
 assert.deepEqual(changedPublicUrls(['src/components/courses/Card.tsx'],urls),urls.filter(u=>u.includes('/courses')));
 assert.deepEqual(changedPublicUrls(['src/app/layout.tsx'],urls),urls);
 assert.deepEqual(changedPublicUrls(['src/app/courses/[id]/page.tsx'],urls),urls.filter(u=>u.includes('/courses')));
 assert.deepEqual(changedPublicUrls(['src/data/countries.ts'],urls),urls.filter(u=>u.includes('/countries')));
 assert.deepEqual(changedPublicUrls(['src/app/countries/page.tsx'],urls),[origin+'/countries']);
});
test('worksheet content changes notify its canonical landing page', () => {
 const origin = 'https://www.theglobalpolymath.com';
 const urls = [origin + '/guides', origin + '/guia-paises'];
 for (const file of ['src/app/guia-paises/copy.ts', 'public/guias/ficha-comparar-paises.pdf']) {
  assert.deepEqual(changedPublicUrls([file], urls), [origin + '/guia-paises']);
 }
});
test('rotating course audits cover all courses without hitting the entire catalogue each day',()=>{
 const urls=Array.from({length:1200},(_,i)=>`/courses/${i}`);
 const seen=new Set(Array.from({length:30},(_,day)=>rotatingUrls(urls,day,40)).flat());
 assert.equal(seen.size,1200);assert.equal(rotatingUrls(urls,5,40).length,40);assert.deepEqual(rotatingUrls([],1,40),[]);
});
test('sitemap crest is an existing asset and directory is linked from public surfaces',()=>{
 const sitemap=readFileSync('src/app/sitemap.ts','utf8');
 assert.ok(sitemap.includes('tgpi-crest-metal-v3-256.png'));assert.ok(existsSync('public/brand/tgpi-crest-metal-v3-256.png'));
 assert.ok(readFileSync('src/components/GlobalFooter.tsx','utf8').includes('/courses/directory'));
 assert.ok(readFileSync('src/components/courses/academy/AcademyOverview.tsx','utf8').includes('<CourseDiscoveryLinks currentId={course.id} locale={locale} />'));
});

test('filtered catalogue variants are excluded from indexing without excluding clean or campaign URLs',()=>{
 assert.equal(catalogVariantNeedsNoindex({}),false);
 assert.equal(catalogVariantNeedsNoindex({utm_source:'partner'}),false);
 assert.equal(catalogVariantNeedsNoindex({q:'english'}),true);
 assert.equal(catalogVariantNeedsNoindex({goal:'global-mobility',access:'free_account'}),true);
});

test('related links distribute visibility across a topic and preserve the chosen target language',()=>{
 const group=Array.from({length:12},(_,i)=>course(`item-${i}`,{targetLanguage:'en'}));
 const otherLanguage=course('french',{targetLanguage:'fr'});
 const counts=new Map(group.map(c=>[c.id,0]));
 for(const current of group){
  const links=relatedPublishedCourses([...group,otherLanguage],current.id);
  assert.equal(links.length,4);assert.ok(!links.some(c=>c.id===current.id||c.targetLanguage!=='en'));
  for(const linked of links)counts.set(linked.id,counts.get(linked.id)+1);
 }
 assert.ok([...counts.values()].every(count=>count===4));
});

test('structured data escapes script delimiters while preserving the original JSON value',()=>{
 const value={name:'</script><script>alert(1)</script>'};
 const json=structuredDataJson(value);
 assert.ok(!json.includes('<'));assert.ok(json.includes('\\u003c'));assert.deepEqual(JSON.parse(json),value);
});

test('production comparison chooses the last successful publication and safely handles missing or truncated history',()=>{
 const a='a'.repeat(40),b='b'.repeat(40),c='c'.repeat(40);
 const deployments=[{id:1,sha:a,environment:'Production'},{id:2,sha:b,environment:'Preview'},{id:3,sha:c,environment:'Production'}];
 const statuses={1:[{state:'success',created_at:'2026-11-23T10:00:00Z'}],2:[{state:'success',created_at:'2026-11-23T11:00:00Z'}],3:[{state:'success',created_at:'2026-11-23T12:00:00Z'}]};
 assert.equal(previousProductionSha(deployments,statuses,3,'2026-11-23T12:00:00Z'),a);
 assert.equal(previousProductionSha([],{},3,'2026-11-23T12:00:00Z'),undefined);
 assert.equal(comparisonSourcePlan({status:'behind',files:[]}).mode,'full');
 assert.equal(comparisonSourcePlan({status:'ahead',files:Array.from({length:300},()=>({filename:'x'}))}).mode,'full');
 assert.deepEqual(comparisonSourcePlan({status:'ahead',files:[{filename:'src/app/courses/page.tsx'},{filename:'docs/readme.md'}]}).paths,['src/app/courses/page.tsx','docs/readme.md']);
 assert.deepEqual(comparisonSourcePlan({status:'identical'}),{mode:'changed',paths:[]});
});

test('IndexNow selects only changed international study editions and their indexes for editorial corrections', () => {
  const root = 'https://www.theglobalpolymath.com';
  const paths = ['/guides/study/pt', '/guides/study/en', '/guides/study/es/japan', '/guides/study/pt/japan', '/guides/study/pt/canada', '/countries/japan'];
  const urls = paths.map(path => root + path);
  assert.deepEqual(changedPublicUrls(['src/data/study-guides/japan.ts'], urls), urls.slice(0, 4));
  assert.deepEqual(changedPublicUrls(['src/app/guides/study/study.module.css'], urls), urls.slice(0, 5));
});
