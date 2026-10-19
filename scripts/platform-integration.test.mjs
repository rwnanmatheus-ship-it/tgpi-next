import test from "node:test";
import assert from "node:assert/strict";
import { getJourneyStage } from "../src/lib/platform-journey.ts";
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
