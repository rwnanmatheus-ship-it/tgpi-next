import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { selectPublishedCourses, directoryPageCount, directoryHref, parseDirectoryPage, pageCourses, relatedPublishedCourses, courseListSchema, courseRss, catalogVariantNeedsNoindex } from '../src/lib/seo/course-directory.ts';
import { publicSitemapUrls, changedPublicUrls } from './indexnow-plan.mjs';
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
 assert.deepEqual(changedPublicUrls(['src/components/courses/Card.tsx'],urls),urls.filter(u=>u.includes('/courses')));
 assert.deepEqual(changedPublicUrls(['src/app/layout.tsx'],urls),urls);
 assert.deepEqual(changedPublicUrls(['src/app/courses/[id]/page.tsx'],urls),urls.filter(u=>u.includes('/courses')));
 assert.deepEqual(changedPublicUrls(['src/data/countries.ts'],urls),urls.filter(u=>u.includes('/countries')));
 assert.deepEqual(changedPublicUrls(['src/app/countries/page.tsx'],urls),[origin+'/countries']);
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
