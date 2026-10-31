import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const nativeRequire = createRequire(import.meta.url);
function harness() {
  const documents = new Map(); const cache = new Map(); let counter = 0, tail = Promise.resolve();
  const backend = {
    isLearningStorageConfigured: () => true,
    getFirestoreDocument: async path => documents.get(path) ? structuredClone(documents.get(path)) : null,
    createFirestoreUpdateWrite: (path, data, condition) => ({ path, data: structuredClone(data), condition }),
    runFirestoreQuery: async () => [...documents.entries()].filter(([path, doc]) => path.startsWith("tgpiLearningUsers/_professionalReviewQueue/items/") && ["submitted", "appealed"].includes(doc.data.state)).map(([, doc]) => structuredClone(doc)),
    runFirestoreTransaction: async callback => {
      const work = tail.then(async () => {
        const plan = await callback({ getDocuments: async paths => new Map(paths.map(path => [path, documents.has(path) ? structuredClone(documents.get(path)) : null])) });
        for (const write of plan.writes) {
          const previous = documents.get(write.path);
          if (write.condition?.exists === false) assert.equal(previous, undefined, "create-only history cannot be overwritten");
          if (write.condition?.updateTime) assert.equal(previous?.updateTime, write.condition.updateTime, "optimistic precondition protects record");
        }
        for (const write of plan.writes) documents.set(write.path, { data: write.data, updateTime: `version-${++counter}` });
        return plan.result;
      });
      tail = work.catch(() => {}); return work;
    },
  };
  const overrides = {
    "server-only": {},
    "@/lib/firestore-admin-rest.server": backend,
    "@clerk/nextjs/server": { clerkClient: async () => ({ users: { getUser: async uid => ({ privateMetadata: { role: uid === "reviewer" ? "admin" : "member" } }) } }) },
    "@/lib/notifications/store.server": { tryPublishNotification: async () => {} },
    "@/lib/global-key.server": { getOrCreateGlobalKey: async () => ({ keyId: "TGPI-TEST-ONLY", fingerprint: "test-only", revision: 1, anchor: { status: "awaiting_anchor" } }) },
  };
  function load(input) {
    const direct = input.endsWith(".ts") ? input : input + ".ts";
    const file = existsSync(direct) ? direct : resolve(input, "index.ts");
    if (cache.has(file)) return cache.get(file);
    const output = {}; cache.set(file, output);
    const source = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    new Function("require", "exports", source)(id => {
      if (Object.hasOwn(overrides, id)) return overrides[id];
      if (id.startsWith("@/")) return load(resolve("src", id.slice(2)));
      if (id.startsWith(".")) return load(resolve(dirname(file), id));
      return nativeRequire(id);
    }, output);
    return output;
  }
  return { documents, load, service: load(resolve("src/lib/learning/professional-records.server.ts")), courses: load(resolve("src/data/courses/professional/index.ts")).professionalCourseDrafts, bank: load(resolve("src/data/courses/professional/assessment-bank.server.ts")) };
}
const oldEnvironment = process.env.VERCEL_ENV, oldSecret = process.env.TGPI_CREDENTIAL_SIGNING_SECRET;
process.env.VERCEL_ENV = "preview";
process.env.TGPI_CREDENTIAL_SIGNING_SECRET = "test-only-professional-signing-secret-not-production";
test.after(() => { if (oldEnvironment === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = oldEnvironment; if (oldSecret === undefined) delete process.env.TGPI_CREDENTIAL_SIGNING_SECRET; else process.env.TGPI_CREDENTIAL_SIGNING_SECRET = oldSecret; });
const alice = { uid: "alice", publicName: "Test Learner", emailVerified: true };
async function study(h, course) {
  const mutate = payload => h.service.mutateProfessionalRecord(alice, course.id, { ...payload, version: course.version });
  let { record } = await mutate({ action: "enrol", diagnostic: "Uma análise inicial do cenário com fatos, dúvidas, riscos e verificações necessárias antes de chegar a uma conclusão." });
  for (const lesson of course.modules.flatMap(module => module.lessons)) {
    ({ record } = await mutate({ action: "activity", revision: record.revision, lessonId: lesson.id, text: "Resultado de prática em cenário sintético, com justificativa da decisão, verificação do exemplo e um limite que deve ser considerado." }));
  }
  const answers = h.bank.professionalQuestionBank(course.id).map(question => ({ questionId: question.id, optionId: question.correctOptionId }));
  ({ record } = await mutate({ action: "quiz", answers }));
  return { record, mutate };
}
async function submit(h, course) {
  let { record, mutate } = await study(h, course);
  let audioId;
  if (course.id === "ingles-carreira-internacional") {
    const result = await h.service.uploadProfessionalAudio(alice.uid, course.id, new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, ...Array(50).fill(0)]), "audio/webm", true);
    audioId = result.audioId;
  }
  const extension = { "planilhas-decisoes-profissionais": "xlsx", "analise-dados-power-bi-ia": "pbix", "python-automacao-profissionais": "py" }[course.id];
  const files = extension ? [(await h.service.uploadProfessionalFile(alice.uid, course.id, extension === "py" ? new TextEncoder().encode("# synthetic fixture; never executed") : new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0]), `fixture.${extension}`)).fileId] : [];
  ({ record } = await mutate({ action: "draft", files, revision: record.revision, project: "Projeto sintético usado exclusivamente para testar a persistência, não representa evidência real de competência. ".repeat(4), transfer: "Resposta sintética de transferência para verificar que o registro e as condições de revisão preservam o trabalho. ".repeat(2), evidence: Object.fromEntries(course.modules.flatMap(module => module.lessons).map(lesson => [lesson.id, "Evidência sintética do teste de software; não deve gerar aprovação real nem ser apresentada como aprendizagem humana. ".repeat(2)])), aiDisclosure: "Fixture automatizada de teste; sem aluno ou avaliação real.", ...(audioId ? { audioId } : {}) }));
  ({ record } = await mutate({ action: "submit", revision: record.revision }));
  return { record, mutate };
}
function reviewInput(course, record, score = 85) {
  return { uid: record.uid, courseId: course.id, version: course.version, revision: record.revision, scores: Object.fromEntries(course.project.rubric.map(item => [item.id, score])), feedback: "Feedback sintético de teste, verificando a correspondência dos critérios, os requisitos essenciais e o histórico transacional; não é avaliação de um aluno real.", expertiseAttestation: true, oralEvidenceReviewed: true };
}

test("every proposed course completes the transactional fixture flow and issues exactly once", async () => {
  for (let index = 0; index < 10; index++) {
    const h = harness(), course = h.courses[index];
    const { record, mutate } = await submit(h, course);
    await assert.rejects(() => mutate({ action: "issue", nameConsent: true, sharing: false }), /emissão exige/i);
    await h.service.reviewProfessionalProject("reviewer", reviewInput(course, record));
    const [first, repeated] = await Promise.all([mutate({ action: "issue", nameConsent: true, sharing: false }), mutate({ action: "issue", nameConsent: true, sharing: false })]);
    assert.equal(first.credentialId, repeated.credentialId);
    const stored = h.documents.get(`tgpiLearningCredentials/${first.credentialId}`).data;
    assert.equal(stored.professionalEvidence.sharing, false);
    assert.equal(stored.courseVersion, course.version);
    assert.ok(stored.completedAt);
    assert.equal([...h.documents.keys()].filter(path => path.startsWith("tgpiLearningCredentials/")).length, 1);
    assert.ok(h.load(resolve("src/lib/credential-signing.server.ts")).verifyLearningCredentialIntegrity(stored));
  }
});

test("ownership, version, stale edits and client-injected grades cannot bypass the service", async () => {
  const h = harness(), course = h.courses[0], { record, mutate } = await study(h, course);
  assert.equal(await h.service.getProfessionalRecord("bob", course.id), null);
  await assert.rejects(() => mutate({ action: "activity", revision: 0, lessonId: course.modules[0].lessons[0].id, text: "test ".repeat(30) }), /outra sessão/);
  await assert.rejects(() => mutate({ action: "enrol", diagnostic: "test ".repeat(30), grade: 100 }), /campos/);
  await assert.rejects(() => h.service.mutateProfessionalRecord(alice, course.id, { action: "activity", version: "old", revision: record.revision, lessonId: course.modules[0].lessons[0].id, text: "test ".repeat(30) }), /versão/);
  await assert.rejects(() => h.service.reviewProfessionalProject("bob", reviewInput(course, record)), /Permissão/);
});

test("essential failures require recovery, preserve history and support contestation", async () => {
  const h = harness(), course = h.courses[0], { record, mutate } = await submit(h, course);
  const input = reviewInput(course, record, 100), essential = course.project.rubric.find(item => item.essential);
  input.scores[essential.id] = 69;
  const rejected = await h.service.reviewProfessionalProject("reviewer", input);
  assert.equal(rejected.state, "revision_requested");
  await assert.rejects(() => mutate({ action: "issue", nameConsent: true, sharing: true }), /emissão exige/i);
  const appealed = await mutate({ action: "appeal", revision: rejected.revision, text: "Contestação sintética que aponta um critério específico e a evidência que precisa ser reavaliada pelo responsável. ".repeat(2) });
  assert.equal(appealed.record.state, "appealed");
  const approved = await h.service.reviewProfessionalProject("reviewer", reviewInput(course, appealed.record));
  assert.equal(approved.state, "approved");
  assert.ok([...h.documents.keys()].filter(path => path.includes("/history/review-")).length === 2);
});

test("audio requires consent, limits and owner/reviewer authorization", async () => {
  const h = harness(), course = h.courses[1]; await study(h, course);
  const bytes = new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, ...Array(50).fill(0)]);
  await assert.rejects(() => h.service.uploadProfessionalAudio("alice", course.id, bytes, "audio/webm", false));
  await assert.rejects(() => h.service.uploadProfessionalAudio("alice", course.id, new Uint8Array(600001), "audio/webm", true));
  await assert.rejects(() => h.service.uploadProfessionalAudio("alice", course.id, bytes, "text/html", true));
  const { audioId } = await h.service.uploadProfessionalAudio("alice", course.id, bytes, "audio/webm", true);
  await assert.rejects(() => h.service.readProfessionalAudio("bob", "alice", audioId), /Permissão/);
  assert.deepEqual(new Uint8Array((await h.service.readProfessionalAudio("alice", "alice", audioId)).bytes), bytes);
  assert.deepEqual(new Uint8Array((await h.service.readProfessionalAudio("reviewer", "alice", audioId)).bytes), bytes);
});

test("new credential lifecycle preserves the previous evidence and denies revoked PDF trust", async () => {
  const h = harness(), course = h.courses[0], { record, mutate } = await submit(h, course);
  await h.service.reviewProfessionalProject("reviewer", reviewInput(course, record));
  const issued = await mutate({ action: "issue", nameConsent: true, sharing: true });
  const old = h.documents.get(`tgpiLearningCredentials/${issued.credentialId}`).data;
  const replaced = await h.service.changeProfessionalCredential("reviewer", { operation: "replace", credentialId: issued.credentialId, reason: "Substituição sintética para testar o histórico e a preservação das evidências originais." });
  assert.equal(h.documents.get(`tgpiLearningCredentials/${issued.credentialId}`).data.status, "replaced");
  const next = h.documents.get(`tgpiLearningCredentials/${replaced.replacementId}`).data;
  assert.equal(next.completedAt, old.completedAt); assert.equal(next.courseVersion, old.courseVersion);
  assert.deepEqual(next.skills, old.skills);
  await h.service.changeProfessionalCredential("reviewer", { operation: "revoke", credentialId: next.id, reason: "Revogação sintética de teste do estado público e do bloqueio de download ativo." });
  assert.equal(h.documents.get(`tgpiLearningCredentials/${next.id}`).data.status, "revoked");
  assert.equal(h.load(resolve("src/lib/credential-standard.ts")).getCredentialTrustState({ integrityVerified: true, status: "revoked" }), "revoked");
});

test("bank public projection never includes private answer keys or explanations", () => {
  const h = harness();
  for (const course of h.courses) {
    assert.equal(h.bank.professionalQuestionBank(course.id).length, course.modules.length);
    const publicQuestions = JSON.stringify(h.bank.publicProfessionalQuestions(course.id));
    assert.doesNotMatch(publicQuestions, /correctOptionId|explanation|essential/);
  }
});


test("project files are encrypted, bounded and private to owner and authorized reviewer", async () => {
  const h = harness(), course = h.courses[8]; await study(h, course);
  const bytes = new TextEncoder().encode("# private synthetic fixture; never executed");
  const { fileId } = await h.service.uploadProfessionalFile("alice", course.id, bytes, "example.py");
  await assert.rejects(() => h.service.readProfessionalFile("bob", "alice", fileId), /Permissão/);
  assert.deepEqual(new Uint8Array((await h.service.readProfessionalFile("alice", "alice", fileId)).bytes), bytes);
  assert.deepEqual(new Uint8Array((await h.service.readProfessionalFile("reviewer", "alice", fileId)).bytes), bytes);
  assert.doesNotMatch(JSON.stringify([...h.documents.values()]), /private synthetic fixture/);
  await assert.rejects(() => h.service.uploadProfessionalFile("alice", course.id, bytes, "example.html"));
  await assert.rejects(() => h.service.uploadProfessionalFile("alice", course.id, bytes, "example.xlsx"));
  await assert.rejects(() => h.service.uploadProfessionalFile("alice", course.id, new Uint8Array(3_000_001), "example.py"));
});
