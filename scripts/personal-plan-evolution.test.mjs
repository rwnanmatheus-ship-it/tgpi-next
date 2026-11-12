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

test('old destinations and comparison goals cannot complete the current plan', async () => {
  const { buildPersonalPlan } = await import('../src/lib/personal-plan.ts');
  const { createEmptyActivationProgress } = await import('../src/lib/activation-progress.ts');
  const { documentReviewItems } = await import('../src/lib/document-review.ts');
  const updatedAt = '2026-11-10T00:00:00.000Z';
  const review = { totalItems: documentReviewItems.length, completedItemIds: documentReviewItems.map(item => item.id), updatedAt };
  const onboarding = { ...profile, targetCountries: ['portugal', 'spain'], timeHorizon: 'now' };
  const activation = { ...createEmptyActivationProgress(),
    comparisons: [
      { id: 'wrong-goal', countrySlugs: ['spain', 'portugal'], goal: 'study', updatedAt },
      { id: 'wrong-countries', countrySlugs: ['portugal', 'canada'], goal: 'work', updatedAt },
    ],
    documentReviews: { canada: review, portugal: review, spain: { ...review, completedItemIds: ['old-id'] } },
    costEstimates: { canada: { amount: 1000, currency: 'CAD', updatedAt } },
  };
  const { model, preparation } = buildPersonalPlan(onboarding, countries, activation, { items: [], unavailable: [] }, [], { portugal: { status: 'complete', slot: '2' }, spain: { status: 'partial', slot: '3' } }, false);
  assert.equal(model.actions[0].id, 'documents');
  assert.equal(model.currentStageId, 'prepare');
  assert.equal(model.actions[0].href, '/countries/spain#documents-to-verify');
  assert.equal(model.actions[0].status, 'in_progress');
  assert.equal(model.journey.find(stage => stage.id === 'prepare').progress, 50);
  assert.equal(model.actions.find(action => action.id === 'compare').status, 'not_started');
  assert.equal(model.actions.find(action => action.id === 'cost').href, '/plan?country=spain&scenario=3#budget');
  assert.deepEqual(preparation.map(item => item.budget), ['ready', 'partial']);
  activation.comparisons.push({ id: 'match', countrySlugs: ['spain', 'portugal'], goal: 'work', updatedAt });
  const matched = buildPersonalPlan(onboarding, countries, activation, { items: [], unavailable: [] }, [], {}, false);
  assert.equal(matched.model.actions.find(action => action.id === 'compare').status, 'completed');
  const single = buildPersonalPlan({ ...onboarding, targetCountries: ['portugal'] }, countries, activation, { items: [], unavailable: [] }, [], { portugal: { status: 'complete', slot: '2' } }, false);
  assert.equal(single.model.actions.some(action => action.id === 'compare'), false);
  assert.equal(single.model.journey.find(stage => stage.id === 'decide').status, 'completed');
});

test('learning-only goals can start immediately and unrelated courses stay outside the goal milestone', async () => {
  const { buildPersonalPlan } = await import('../src/lib/personal-plan.ts');
  const { createEmptyActivationProgress } = await import('../src/lib/activation-progress.ts');
  const onboarding = { ...profile, primaryGoal: 'learn', targetCountries: [], priorities: [], timeHorizon: 'exploring' };
  const completed = { courseId: 'arrival-playbook', kind: 'academy', status: 'completed', completed: 6, total: 6, href: '/courses/arrival-playbook/study' };
  const catalogue = [{ id: 'evidence-literacy', title: 'Evidence literacy' }, { id: 'country-fit', title: 'Country Fit' }];
  const build = (items, unavailable = []) => buildPersonalPlan(onboarding, countries, createEmptyActivationProgress(), { items, unavailable }, catalogue, {}, false);
  const { model } = build([completed]);
  assert.deepEqual(model.actions.map(action => action.id), ['learning', 'profile']);
  assert.equal(model.actions[0].href, '/courses/evidence-literacy');
  assert.equal(model.actions[0].status, 'not_started');
  const review = { ...completed, courseId: 'country-fit', status: 'review_due', completed: 4, href: '/courses/country-fit/study' };
  assert.equal(build([review]).model.actions[0].href, review.href);
  assert.equal(build([review]).model.actions[0].action, 'Open course review');
  assert.equal(build([review]).model.journey.find(stage => stage.id === 'develop').progress, 33);
  assert.equal(build([], ['academy']).model.actions.find(action => action.id === 'learning').status, 'needs_attention');
});
