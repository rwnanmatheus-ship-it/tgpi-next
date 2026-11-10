import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
function load(path, imports = {}) {
  const code = ts.transpileModule(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, URLSearchParams, require: id => { if (!(id in imports)) throw Error(id); return imports[id]; } });
  return exports;
}
const catalog = load("src/lib/comparison-catalog.ts");
const comparison = load("src/lib/comparison-state.ts", { "./comparison-catalog.ts": catalog });
const activation = load("src/lib/activation-progress.ts", { "./comparison-catalog.ts": catalog, "./comparison-state.ts": comparison });
const review = load("src/lib/document-review.ts", { "./activation-progress.ts": activation });
const { buildDocumentsMemberModel: build, documentsHref, resolveDocumentGoal, documentWindowDays } = load("src/lib/documents-os.ts", { "@/lib/document-review": review });
const countries = Array.from({length:8}, (_,i) => ({ slug:`country-${i}`, name:`Country ${i}`, emoji:"" }));
const onboarding = { completed:true, primaryGoal:"work", targetCountries:countries.map(c=>c.slug), timeHorizon:"6-months", budgetRange:"1500-3000" };
const empty = () => activation.createEmptyActivationProgress();
test("keeps all destinations and excludes unknown country records", () => {
  const progress = empty(); progress.savedCountries = ["unknown"];
  assert.equal(build(onboarding, progress, countries, true, 0).countries.length, 8);
});
test("one completed destination does not complete all document research", () => {
  const progress = empty(); progress.documentReviews["country-0"] = {completedItemIds:review.documentReviewItems.map(item => item.id), totalItems:4};
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
test("stale checkpoints do not inflate progress on the current checklist", () => {
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

test("a new checkpoint is saved even when all legacy slots were marked", () => {
  const previous = { completedItemIds: ["legacy-a", "legacy-b", "legacy-c", "legacy-d"], totalItems: 4, updatedAt: "2026-10-15T00:00:00.000Z" };
  const current = review.updateDocumentReview(previous, review.documentReviewItems[0].id, true, "2026-11-10T00:00:00.000Z");
  const progress = empty();
  progress.documentReviews["country-0"] = current;
  const restored = activation.normalizeActivationProgress(JSON.parse(JSON.stringify(activation.serializeActivationProgressForStorage(progress))));
  assert.equal(restored.documentReviews["country-0"].legacyCompletedItemIds.length, 4);
  assert.equal(build(onboarding, restored, countries, true).countries[0].percentage, 25);
  assert.equal(restored.documentReviews["country-0"].completedItemIds[0], review.documentReviewItems[0].id);
});

test("document date calculator uses calendar dates across timezone boundaries and rejects invalid days", () => {
  assert.equal(documentWindowDays("2028-03-01", "2028-02-28"), 2);
  assert.equal(documentWindowDays("2026-11-09", "2026-11-10"), -1);
  assert.equal(documentWindowDays("2026-11-10", "2026-11-10"), 0);
  assert.equal(documentWindowDays("2026-02-30", "2026-02-20"), null);
  assert.equal(documentWindowDays("", "2026-02-20"), null);
});

test("document research links retain destination and a recognized goal", () => {
  assert.equal(documentsHref(), "/passport");
  assert.equal(documentsHref({ country: "portugal", goal: resolveDocumentGoal("study") }), "/passport?country=portugal&goal=study");
  assert.equal(resolveDocumentGoal(["study"]), undefined);
});
