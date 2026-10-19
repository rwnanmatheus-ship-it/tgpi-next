import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
function load(path, imports = {}) {
  const code = ts.transpileModule(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: id => { if (!(id in imports)) throw Error(id); return imports[id]; } });
  return exports;
}
const activation = load("src/lib/activation-progress.ts");
const { buildDocumentsMemberModel: build } = load("src/lib/documents-os.ts", { "@/lib/activation-progress": activation });
const countries = Array.from({length:8}, (_,i) => ({ slug:`country-${i}`, name:`Country ${i}`, emoji:"" }));
const onboarding = { completed:true, primaryGoal:"work", targetCountries:countries.map(c=>c.slug), timeHorizon:"6-months", budgetRange:"1500-3000" };
const empty = () => activation.createEmptyActivationProgress();
test("keeps all destinations and excludes unknown country records", () => {
  const progress = empty(); progress.savedCountries = ["unknown"];
  assert.equal(build(onboarding, progress, countries, true, 0).countries.length, 8);
});
test("one completed destination does not complete all document research", () => {
  const progress = empty(); progress.documentReviews["country-0"] = {completedItemIds:["passport"], totalItems:1};
  const model = build(onboarding, progress, countries, true, 0);
  assert.equal(model.layers[3].status,"in_progress");
  assert.equal(model.readinessScore,85);
  assert.equal(model.signals.reduce((sum,s)=>sum+s.weight,0),100);
});
test("shows issued certificates separately from unavailable records", () => {
  assert.equal(build(onboarding,empty(),countries,true,2).layers[5].status,"completed");
  assert.equal(build(onboarding,empty(),countries,true,0).layers[5].status,"not_started");
  assert.equal(build(onboarding,empty(),countries,true,null).layers[5].status,"needs_attention");
});
test("undecided budget cannot earn a confirmed planning signal", () => {
  const model = build({...onboarding,budgetRange:"undecided"},empty(),countries,true,0);
  assert.equal(model.signals.find(s=>s.label === "Timeline and budget").achieved,false);
});
test("zero-item checklists cannot become completed and counts remain bounded", () => {
  const progress = empty(); progress.documentReviews["country-0"] = {completedItemIds:["stale"],totalItems:0};
  const model = build(onboarding,progress,countries,true,0);
  assert.equal(model.countries[0].status,"not_started");
  assert.equal(model.completedItems,0);
});
test("completed learning is connected without implying an issued credential", () => {
  const progress = empty(); progress.courseProgress.test = {completedAt:"2026-10-19",completedLessonIds:["a"],totalLessons:1};
  const model = build(onboarding,progress,countries,true,0);
  assert.equal(model.completedCourses,1);
  assert.equal(model.layers[4].status,"completed");
  assert.equal(model.credentialCount,0);
});
