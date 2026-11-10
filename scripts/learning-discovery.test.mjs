import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
function moduleAt(path) { const result = {}; new Function('exports', ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(result); return result; }
const { courseSearchScore, normalizeCourseSearch, courseMinutes, studyWeeks } = moduleAt('src/lib/learning/catalog-search.ts');
const make = (title, desc='') => ({title,desc,category:'Learning',goalLabel:'Practice',benefits:[]});
test('course search handles accents, prefixes, translations and small spelling errors', () => {
 assert.equal(normalizeCourseSearch(' INGLÊS / AÇÃO '),'ingles acao');
 assert.ok(courseSearchScore(make('Global English'),'ingles')>0);
 assert.ok(courseSearchScore(make('Python automation'),'pythn')>0);
 assert.ok(courseSearchScore(make('Career abroad'),'carr',text=>text==='Career abroad'?'Carreira internacional':text)>0);
 assert.ok(courseSearchScore(make('Career abroad'),'career')>courseSearchScore(make('Other course','Build your career'),'career'));
 assert.equal(courseSearchScore(make('Career abroad'),'python'),0);
});
test('short AI aliases cannot match arbitrary syllables and every query token must match', () => {
 assert.equal(courseSearchScore(make('Carreira internacional'),'ia'),0);
 assert.ok(courseSearchScore(make('AI workflow'),'ia')>0);
 assert.equal(courseSearchScore(make('English for work'),'english python'),0);
 assert.ok(courseSearchScore(make('Budget planning'),'orcamento')>0);
});
test('study estimates use workload minutes without promising a completion date', () => {
 assert.equal(courseMinutes('11h 40m'),700);
 assert.equal(courseMinutes('6h 15m'),375);
 assert.equal(studyWeeks(700,120),6);
 assert.equal(studyWeeks(700,300),3);
 assert.equal(studyWeeks(0,0),1);
});
test('all 27 registered course covers are unique and resolve to real assets', () => {
 const {courseArtworkKeys,courseArtwork,distinctCourseArtwork}=moduleAt('src/lib/cinematic-art.ts');
 const paths=Object.keys(courseArtworkKeys).map(id=>courseArtwork(id));
 assert.equal(paths.length,27); assert.equal(new Set(paths).size,27);
 for(const path of paths) assert.ok(existsSync('public'+path),path);
 assert.equal(distinctCourseArtwork.length,8);
});
