import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import ts from "typescript";
import { professionalEligibility, professionalReleaseBlockers, scoreProfessionalProject, scoreProfessionalQuiz } from "../src/lib/learning/professional-policy.ts";

const cache = new Map();
function load(path) {
  const direct = resolve(path.endsWith(".ts") ? path : path + ".ts");
  const file = existsSync(direct) ? direct : resolve(path, "index.ts");
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const source = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  new Function("require", "exports", source)(id => {
    if (!id.startsWith(".")) throw Error("Unexpected dependency: " + id);
    return load(resolve(dirname(file), id));
  }, exports);
  return exports;
}
const { professionalCourseDrafts: courses } = load("src/data/courses/professional/index.ts");
const course = courses[0];
const review = () => ({
  courseVersion: course.version, rubricVersion: course.approval.rubricVersion,
  submissionId: "submission-1", reviewerUid: "reviewer", reviewedAt: "2026-10-29T18:00:00Z",
  scores: Object.fromEntries(course.project.rubric.map(item => [item.id, 85])),
  feedback: "A revisão verificou as evidências de cada critério, os testes documentados, a proteção de dados e os limites declarados do fluxo.",
});
const questions = Array.from({ length: 10 }, (_, index) => ({
  id: "q" + index, options: [{ id: "a", label: "A" }, { id: "b", label: "B" }],
  correctOptionId: "a", essential: index === 0, explanation: "Justificativa do caso sintético.",
}));
const answers = () => questions.map(item => ({ questionId: item.id, optionId: "a" }));

test("all ten drafts retain eight distinct module lessons, projects and Portuguese instruction", () => {
  assert.equal(courses.length, 10);
  const ids = new Set();
  const explanations = new Set();
  for (const item of courses) {
    assert.ok(!ids.has(item.id)); ids.add(item.id);
    assert.equal(item.modules.length, 8);
    assert.equal(item.instructionLanguage, "pt-BR");
    assert.equal(item.project.reviewMode, "human");
    assert.equal(item.project.rubric.reduce((sum, criterion) => sum + criterion.weight, 0), 100);
    assert.ok(item.project.rubric.some(criterion => criterion.essential));
    for (const lesson of item.modules.flatMap(module => module.lessons)) {
      assert.ok(!ids.has(lesson.id)); ids.add(lesson.id);
      assert.ok(!explanations.has(lesson.explanation)); explanations.add(lesson.explanation);
      for (const field of ["objective", "explanation", "workedExample", "guidedPractice", "independentPractice", "recovery"]) assert.ok(lesson[field].trim());
      assert.ok(lesson.successCriteria.length && lesson.commonErrors.length);
    }
  }
  // Structural coverage is not editorial, subject or learning-outcome approval.
  assert.equal(explanations.size, 80);
});

test("drafts cannot be released on a build or an absent/stale approval", () => {
  for (const item of courses) {
    assert.deepEqual(professionalReleaseBlockers(item), ["curriculum_not_ready", "access_policy_unresolved", "release_evidence_missing_or_stale"]);
  }
  const evidence = { courseId: course.id, courseVersion: "old", artworkIntegrated: true };
  assert.ok(professionalReleaseBlockers(course, evidence).includes("release_evidence_missing_or_stale"));
  const nominallyReady = { ...course, status: "ready", access: "free" };
  const incompleteEvidence = { courseId: course.id, courseVersion: course.version, artworkIntegrated: true };
  const missing = professionalReleaseBlockers(nominallyReady, incompleteEvidence);
  assert.ok(missing.includes("crossUserIsolationTested"));
  assert.ok(missing.includes("questionBankTested"));
  assert.equal(missing.includes("artworkIntegrated"), false);
  const source = readFileSync("src/data/courses.ts", "utf8") + readFileSync("src/data/courses-overview.ts", "utf8");
  assert.doesNotMatch(source, /professionalCourseDrafts/);
});

test("quiz score never compensates for an essential safety failure", () => {
  const input = answers(); input[0].optionId = "b";
  const result = scoreProfessionalQuiz(questions, input);
  assert.equal(result.score, 90); assert.equal(result.passed, false);
  assert.equal(scoreProfessionalQuiz(questions, answers()).passed, true);
});

test("quiz rejects missing, duplicate, foreign and invalid answers and malformed banks", () => {
  assert.throws(() => scoreProfessionalQuiz(questions, answers().slice(1)));
  const duplicate = answers(); duplicate[1] = duplicate[0];
  assert.throws(() => scoreProfessionalQuiz(questions, duplicate));
  const foreign = answers(); foreign[0].questionId = "foreign";
  assert.throws(() => scoreProfessionalQuiz(questions, foreign));
  const invalid = answers(); invalid[0].optionId = "unknown";
  assert.throws(() => scoreProfessionalQuiz(questions, invalid));
  assert.throws(() => scoreProfessionalQuiz([], []));
  assert.throws(() => scoreProfessionalQuiz(questions, answers(), NaN));
});

test("project requires independent review of the exact curriculum and rubric", () => {
  assert.equal(scoreProfessionalProject(course, "learner", review()).passed, true);
  assert.throws(() => scoreProfessionalProject(course, "reviewer", review()));
  assert.throws(() => scoreProfessionalProject(course, "learner", { ...review(), courseVersion: "old" }));
  assert.throws(() => scoreProfessionalProject(course, "learner", { ...review(), rubricVersion: "old" }));
  assert.throws(() => scoreProfessionalProject(course, "learner", { ...review(), feedback: "approved" }));
});

test("project rejects nonfinite, foreign or missing scores and essential failures", () => {
  const essential = course.project.rubric.find(item => item.essential);
  const input = review(); input.scores[essential.id] = 69;
  assert.ok(scoreProfessionalProject(course, "learner", input).score > 70);
  assert.equal(scoreProfessionalProject(course, "learner", input).passed, false);
  for (const invalid of [NaN, Infinity, -1, 101]) {
    assert.throws(() => scoreProfessionalProject(course, "learner", { ...review(), scores: { ...review().scores, [essential.id]: invalid } }));
  }
  assert.throws(() => scoreProfessionalProject(course, "learner", { ...review(), scores: { ...review().scores, foreign: 100 } }));
});

test("eligibility cannot be obtained by file presence or lesson completion alone", () => {
  const input = {
    course, ownerUid: "learner", requiredActivityIds: ["activity-1"], completedActivityIds: ["activity-1"],
    requiredAssessmentIds: ["gate-1"], attempts: [{ assessmentId: "gate-1", courseVersion: course.version, score: 85, passed: true, submittedAt: "2026-10-29T18:00:00Z" }],
    review: review(), verifiedIdentity: true, publicSharingConsent: true,
  };
  assert.equal(professionalEligibility(input).eligible, true);
  for (const change of [{ review: undefined }, { verifiedIdentity: false }, { publicSharingConsent: false }, { completedActivityIds: [] }, { attempts: [] }, { requiredAssessmentIds: [] }, { requiredActivityIds: [] }]) {
    assert.equal(professionalEligibility({ ...input, ...change }).eligible, false);
  }
  assert.equal(professionalEligibility({ ...input, attempts: [{ ...input.attempts[0], courseVersion: "old" }] }).eligible, false);
});
