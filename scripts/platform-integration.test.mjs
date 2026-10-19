import { explorerFiltersFromSearch, explorerFiltersToSearch, normalizeExplorerFilters } from "../src/lib/explorer-filters.ts";
import test from "node:test";
import assert from "node:assert/strict";
import { getJourneyStage, isImmersiveLearningRoute } from "../src/lib/platform-journey.ts";
import { getLearningContinuation } from "../src/lib/learning-continuity.ts";
import { SUPER_APP_MODULES, isSuperAppRouteActive } from "../src/lib/super-app.ts";

const catalogue = [
  { id: "global-english-2026", version: "2", modules: [{ lessons: [{ id: "arrival" }, { id: "work" }] }] },
  { id: "global-budget", version: "1", modules: [{ lessons: [{ id: "costs" }, { id: "reserve" }] }] },
];
const record = (overrides = {}) => ({ courseVersion: "1", completedLessonIds: [], totalLessons: 2, startedAt: "2026-10-01", updatedAt: "2026-10-19", ...overrides });

test("journey supports nested routes and rejects similar unrelated paths", () => {
  assert.equal(getJourneyStage("/courses/global-budget/lessons/costs")?.id, "learn");
  assert.equal(getJourneyStage("/passport")?.id, "plan");
  assert.equal(getJourneyStage("/profile/security")?.id, "advance");
  assert.equal(getJourneyStage("/courses-archive"), undefined);
  assert.equal(getJourneyStage("/sign-in"), undefined);
});

test("only one launcher module is active for overlapping route prefixes", () => {
  for (const [route, expected] of [["/profile/security", "settings"], ["/verify/global-key/abc", "global-key"], ["/profile", "workspace"]]) {
    assert.deepEqual(SUPER_APP_MODULES.filter(module => isSuperAppRouteActive(route, module)).map(module => module.id), [expected]);
  }
});

test("continuation resumes the actual incomplete course and skips completed lessons", () => {
  const next = getLearningContinuation(catalogue, {
    "global-budget": record({ completedLessonIds: ["costs"], lastLessonId: "costs" }),
    "global-english-2026": record({ courseVersion: "2", completedLessonIds: ["arrival", "work"], updatedAt: "2026-10-20" }),
  });
  assert.equal(next.href, "/courses/global-budget/lessons/reserve");
  assert.equal(next.complete, false);
});

test("version changes return to the overview rather than a stale lesson", () => {
  const next = getLearningContinuation(catalogue, { "english-abroad": record({ lastLessonId: "removed-lesson" }) });
  assert.equal(next.href, "/courses/global-english-2026");
});

test("unknown courses never create a broken continuation link", () => {
  assert.equal(getLearningContinuation(catalogue, { deleted: record() }), undefined);
  assert.equal(getLearningContinuation(catalogue, {}), undefined);
});

test("legacy editions cannot override current course continuity", () => {
  const next = getLearningContinuation(catalogue, {
    "english-abroad": record({ updatedAt: "2026-10-21" }),
    "global-english-2026": record({courseVersion:"2",completedLessonIds:["arrival","work"]}),
  });
  assert.equal(next.complete, true);
  assert.equal(next.href, "/courses/global-english-2026");
});

test("lessons and certification keep focused navigation without hiding the catalogue", () => {
  assert.equal(isImmersiveLearningRoute("/courses/global-budget/lessons/costs"), true);
  assert.equal(isImmersiveLearningRoute("/courses/global-english-2026/certification/final"), true);
  assert.equal(isImmersiveLearningRoute("/courses/global-budget"), false);
});

test("country filters accept repeated query keys without invalid client state", () => {
  const countries=[{slug:"portugal",region:"Europe"},{slug:"canada",region:"Americas"}];
  const filters=normalizeExplorerFilters({q:["Portugal","Canada"],region:["invalid","Europe"],selected:["unknown","portugal","portugal","canada"],limit:["not-a-number","195"]},countries);
  assert.equal(filters.query,"Portugal");
  assert.equal(filters.region,"all");
  assert.deepEqual(filters.selection,["portugal","canada"]);
  assert.equal(filters.limit,24);
});

test("explorer restoration derives selection and query from the current history URL", () => {
  const countries=[{slug:"portugal",region:"Europe"},{slug:"canada",region:"Americas"}];
  const current="?q=Portugal&selected=canada&selected=portugal";
  const restored=normalizeExplorerFilters(explorerFiltersFromSearch(current),countries);
  assert.equal(restored.query,"Portugal");
  assert.deepEqual(restored.selection,["canada","portugal"]);
  const roundtrip=explorerFiltersToSearch(explorerFiltersFromSearch(current));
  assert.deepEqual(normalizeExplorerFilters(explorerFiltersFromSearch(roundtrip),countries),restored);
});
