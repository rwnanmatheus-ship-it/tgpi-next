import assert from 'node:assert/strict';
import test from 'node:test';
import { buildWorkspaceResources, workspaceHistory, parseWorkspacePreferences, normalizeWorkspacePreferences, parseWorkspaceHistoryPage } from '../src/lib/workspace-control.ts';
const empty = () => ({ version: 1, savedCountries: [], comparisons: [], documentReviews: {}, costEstimates: {}, courseProgress: {}, activities: [] });
const course = { id: 'global-english-2026', title: 'Global English', version: '2', modules: [{ lessons: [{id:'one'}, {id:'two'}] }] };
const record = { courseVersion: '2', completedLessonIds: ['one','one','invalid'], lastLessonId:'two', updatedAt:'2026-10-19T10:00:00Z' };
test('library resumes valid lesson and excludes invalid checkpoint IDs', () => {
 const rows = buildWorkspaceResources({...empty(),courseProgress:{[course.id]:record}},[course],[]);
 assert.equal(rows[0].href, '/courses/global-english-2026/lessons/two');
 assert.match(rows[0].detail,/1 \/ 2 lessons/);
});
test('new edition does not advertise exact resume or stale completion', () => {
 const rows = buildWorkspaceResources({...empty(),courseProgress:{[course.id]:{...record,courseVersion:'1'}}},[course],[]);
 assert.equal(rows[0].href,'/courses/global-english-2026');
 assert.match(rows[0].detail,/New edition/);
});
test('removed courses and invalid countries cannot create broken library links', () => {
 assert.deepEqual(buildWorkspaceResources({...empty(),savedCountries:['missing'],courseProgress:{removed:record}},[],[]),[]);
});
test('canonical course wins over legacy alias without duplicate cards', () => {
 const rows=buildWorkspaceResources({...empty(),courseProgress:{'english-abroad':record,[course.id]:record}},[course],[]);
 assert.equal(rows.length,1);
});
test('history orders and deduplicates only verifiable source events', () => {
 const event={id:'a',title:'Saved',type:'saved_country',href:'/countries/spain',occurredAt:'2026-10-18T12:00:00Z'};
 const result=workspaceHistory({...empty(),activities:[event,event,{...event,id:'unsafe',href:'//other.example'},{...event,id:'bad',occurredAt:'unknown'},{...event,id:'b',occurredAt:'2026-10-19T12:00:00Z'}]});
 assert.deepEqual(result.map(e=>e.id),['b','a']);
 assert.deepEqual(workspaceHistory(empty()),[]);
});
test('preference input rejects unexpected modules and unbounded payloads', () => {
 assert.equal(parseWorkspacePreferences({version:1,density:'compact',hidden:['admin'],dismissed:[]}),null);
 assert.equal(parseWorkspacePreferences({version:1,density:'compact',hidden:[],dismissed:Array(9).fill('learning')}),null);
 assert.equal(parseWorkspacePreferences({version:2,density:'compact',hidden:[],dismissed:[]}),null);
 assert.deepEqual(parseWorkspacePreferences({version:1,density:'compact',hidden:['history'],dismissed:['learning']}),{version:1,density:'compact',hidden:['history'],dismissed:['learning']});
 assert.equal(normalizeWorkspacePreferences(null).density,'comfortable');
});

test('history pages reject malformed records, unsafe links and excessive page sizes', () => {
 const event = {id:'one',title:'Saved Spain',type:'saved_country',href:'/countries/spain',occurredAt:'2026-10-19T12:00:00Z'};
 assert.deepEqual(parseWorkspaceHistoryPage({events:[event],cursor:null}),{events:[event],cursor:null});
 assert.equal(parseWorkspaceHistoryPage({events:[{...event,href:'//other.example'}],cursor:null}),null);
 assert.equal(parseWorkspaceHistoryPage({events:[{...event,occurredAt:'invalid'}],cursor:null}),null);
 assert.equal(parseWorkspaceHistoryPage({events:Array(13).fill(event),cursor:null}),null);
 assert.equal(parseWorkspaceHistoryPage({events:[],cursor:42}),null);
});
