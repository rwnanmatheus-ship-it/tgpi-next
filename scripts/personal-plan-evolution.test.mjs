import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { planCopy, planActivityCopy } from '../src/components/plan/plan-copy.ts';
import { translate, registerSupplementalMessages } from '../src/lib/localization/messages.ts';
import { buildGlobalWorkspaceModel } from '../src/lib/global-workspace.ts';
import { fitContextSignals, fitRoadmap, prioritizePlanActions } from '../src/lib/personal-plan.ts';
const countries = ['portugal','spain','canada','france','germany'].map(slug => ({slug,name:slug,emoji:''}));
const profile = {schemaVersion:1,completed:true,currentStep:5,primaryGoal:'work',targetCountries:countries.map(c=>c.slug),timeHorizon:'6-months',budgetRange:'1500-3000',languages:['English'],profession:'Engineer',educationLevel:'',internationalExperience:'short-trips',priorities:['safety','cost','career']};
test('personal plan comparison preserves all five shortlisted destinations',()=>{
 const model = buildGlobalWorkspaceModel(profile,countries);
 const url = new URL(model.compareHref,'https://tgpi.test');
 assert.deepEqual(url.searchParams.getAll('country'),profile.targetCountries);
 assert.equal(url.searchParams.get('goal'),'work');
});
test('exploring and unknown budgets cannot claim a complete plan despite old completion metadata',()=>{
 for(const patch of [{timeHorizon:'exploring'},{budgetRange:'undecided'},{targetCountries:['invalid']}]){
  const model=buildGlobalWorkspaceModel({...profile,...patch},countries);
  assert.ok(model.completion < 100);
  assert.notEqual(model.actions.find(a=>a.id==='profile').status,'completed');
 }
});
test('missing context is first; urgent legal review precedes other remaining actions',()=>{
 const missing=buildGlobalWorkspaceModel({...profile,budgetRange:'undecided'},countries);
 assert.equal(prioritizePlanActions(missing,'now')[0].id,'profile');
 const complete=buildGlobalWorkspaceModel(profile,countries);
 assert.equal(prioritizePlanActions(complete,'now')[0].id,'documents');
 assert.equal(prioritizePlanActions(complete,'6-months')[0].id,'cost');
 assert.equal(prioritizePlanActions(complete,'now').at(-1).id,'profile');
});
test('context coverage rejects empty languages and undecided timeline and budget',()=>{
 const signals=fitContextSignals({...profile,languages:[' '],budgetRange:'undecided',timeHorizon:'exploring',priorities:[]});
 assert.equal(signals.filter(s=>s.complete).length,1);
});
test('roadmap changes practical pathway for each goal and uses a live course route',()=>{
 assert.match(fitRoadmap({...profile,primaryGoal:'study'})[2].title,/institution/);
 assert.match(fitRoadmap(profile)[2].detail,/work authorization/);
 assert.match(fitRoadmap({...profile,primaryGoal:'travel'})[2].detail,/itinerary/);
 assert.match(fitRoadmap({...profile,primaryGoal:'live'})[2].detail,/housing/);
 assert.equal(fitRoadmap({...profile,primaryGoal:'learn'})[2].href,'/courses');
 assert.equal(fitRoadmap(profile)[3].href,'/courses');
 assert.equal(fitRoadmap(profile)[1].href,'#research-workbench');
});

test('plan resumes current academy progress instead of a stale legacy lesson',async()=>{
 const {connectPlanLearning}=await import('../src/lib/personal-plan.ts');
 const model=buildGlobalWorkspaceModel(profile,countries);
 const summary={items:[{courseId:'country-fit',title:'Country Fit',kind:'academy',href:'/courses/country-fit/study',status:'review_due',completed:4,total:5,updatedAt:'2026-11-09'}],unavailable:[]};
 const connected=connectPlanLearning(model,summary);
 assert.equal(connected.actions.find(a=>a.id==='learning').href,'/courses/country-fit/study');
 assert.equal(connected.actions.find(a=>a.id==='learning').status,'in_progress');
 assert.equal(connected.journey.find(s=>s.id==='develop').progress,80);
 assert.equal(connectPlanLearning(model,{...summary,items:[{...summary.items[0],status:'edition_changed'}]}).journey.find(s=>s.id==='develop').progress,0);
 assert.notEqual(connectPlanLearning(model,{items:[{...summary.items[0],status:'completed'}],unavailable:['professional']}).actions.find(a=>a.id==='learning').status,'completed');
});

test('budget numbers follow the selected locale without changing the amount',async()=>{
 const {formatMoney}=await import('../src/lib/intelligence/dossiers.ts');
 assert.match(formatMoney(2640,'EUR','pt-BR'),/2\.640/);
 assert.match(formatMoney(2640,'EUR','en'),/2,640/);
});

test('dynamic plan text translates full budget sentences and historical course titles',()=>{
 const dictionary=JSON.parse(readFileSync(new URL('../public/locales/pt-BR.json',import.meta.url),'utf8'));
 registerSupplementalMessages('pt-BR',dictionary);
 const t=(key,values)=>translate('pt-BR',key,values);
 assert.equal(planCopy('Review the local monthly budget reference and cost breakdown for United States.',t,'pt-BR'),'Revise o orçamento local e os custos detalhados para Estados Unidos.');
 assert.equal(planCopy('Review United States',t,'pt-BR'),'Revisar Estados Unidos');
 const title='Global English: Live, Work & Belong Abroad';
 assert.equal(planActivityCopy(`${title} completed`,t,'pt-BR'),`${t(title)} · Concluído`);
 assert.equal(planActivityCopy('Portugal vs Spain comparison completed',t,'pt-BR'),'Portugal e Espanha · Comparação concluída');
 assert.equal(planActivityCopy('5 countries compared',t,'pt-BR'),'5 países comparados');
});
