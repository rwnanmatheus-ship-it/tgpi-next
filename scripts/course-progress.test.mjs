import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { createEmptyActivationProgress, normalizeActivationProgress } from "../src/lib/activation-progress.ts";
import * as activation from "../src/lib/activation-progress.ts";

// Exercise the real server reducer and parser, replacing only infrastructure/data imports.
const fixture = { id: "english-abroad", version: "1.0.0", title: "Global English", modules: [{ lessons: [{ id: "arrival", checkpoint: { correctOptionId: "a" } }, { id: "housing", checkpoint: { correctOptionId: "b" } }] }] };
const exports = {};
const compiled = ts.transpileModule(readFileSync(new URL("../src/lib/activation-store.server.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
new Function("require", "exports", compiled)((id) => {
  if (id === "server-only") return {};
  if (id === "@/lib/activation-progress") return activation;
  if (id === "@/data/courses") return { courses: [fixture] };
  if (id === "@/lib/countries") return { getCountry: () => undefined };
  if (id === "@/lib/tgpi-comparison") return { isComparisonGoal: () => false };
  if (id === "@clerk/nextjs/server") return {};
  throw new Error(`Unexpected import ${id}`);
}, exports);
const { applyActivationMutation, parseActivationMutation } = exports;
const mutate = (progress, input) => applyActivationMutation(progress, parseActivationMutation(input), "2026-10-14T12:00:00Z");

test("visiting a lesson remembers position without manufacturing completion", () => {
  const progress = mutate(createEmptyActivationProgress(), { type: "visit_lesson", courseId: fixture.id, lessonId: "housing" });
  const restored = normalizeActivationProgress(JSON.parse(JSON.stringify(progress)));
  assert.equal(restored.courseProgress[fixture.id].lastLessonId, "housing");
  assert.deepEqual(restored.courseProgress[fixture.id].completedLessonIds, []);
  assert.equal(restored.courseProgress[fixture.id].completedAt, undefined);
});
test("checkpoint completion persists, is idempotent and survives navigation", () => {
  let progress = createEmptyActivationProgress();
  const input = { type: "complete_lesson", courseId: fixture.id, lessonId: "arrival", checkpointOptionId: "a" };
  progress = mutate(mutate(progress, input), input);
  progress = mutate(progress, { type: "visit_lesson", courseId: fixture.id, lessonId: "housing" });
  assert.deepEqual(progress.courseProgress[fixture.id].completedLessonIds, ["arrival"]);
  progress = mutate(progress, { type: "complete_lesson", courseId: fixture.id, lessonId: "housing", checkpointOptionId: "b" });
  assert.equal(progress.courseProgress[fixture.id].completedLessonIds.length, 2);
  assert.ok(progress.courseProgress[fixture.id].completedAt);
});
test("server rejects incorrect checkpoints and lessons outside the course", () => {
  assert.throws(() => parseActivationMutation({ type: "complete_lesson", courseId: fixture.id, lessonId: "arrival", checkpointOptionId: "b" }), /Pass the lesson checkpoint/);
  assert.throws(() => parseActivationMutation({ type: "visit_lesson", courseId: fixture.id, lessonId: "made-up" }), /not found/);
});
test("opening and starting a completed course preserves earned completion", () => {
  let progress = createEmptyActivationProgress();
  for (const [lessonId, checkpointOptionId] of [["arrival", "a"], ["housing", "b"]]) progress = mutate(progress, { type: "complete_lesson", courseId: fixture.id, lessonId, checkpointOptionId });
  const completedAt = progress.courseProgress[fixture.id].completedAt;
  progress = mutate(progress, { type: "visit_lesson", courseId: fixture.id, lessonId: "arrival" });
  progress = mutate(progress, { type: "start_course", courseId: fixture.id });
  assert.equal(progress.courseProgress[fixture.id].completedAt, completedAt);
  assert.equal(progress.courseProgress[fixture.id].lastLessonId, "arrival");
});
