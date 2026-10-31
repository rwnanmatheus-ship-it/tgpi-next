import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";
import { clerkClient } from "@clerk/nextjs/server";
import { getProfessionalCourse, professionalCourseEnabled } from "./professional-runtime";
import { professionalMutationSchema, professionalProjectSchema, professionalRecordPath, professionalReviewSchema, type ProfessionalRecord } from "./professional-model";
import { estimateProfessionalMinutes, scoreProfessionalProject, scoreProfessionalQuiz } from "./professional-policy";
import { professionalQuestionBank } from "@/data/courses/professional/assessment-bank.server";
import { createFirestoreUpdateWrite as write, getFirestoreDocument as get, isLearningStorageConfigured, runFirestoreQuery, runFirestoreTransaction as transaction, type JsonValue } from "@/lib/firestore-admin-rest.server";
import { createCredentialId, isCredentialSigningConfigured, signLearningCredential, verifyLearningCredentialIntegrity, TGPI_CREDENTIAL_KEY_ID } from "@/lib/credential-signing.server";
import { getOrCreateGlobalKey } from "@/lib/global-key.server";
import { tryPublishNotification } from "@/lib/notifications/store.server";
import type { TgpiLearningCredential } from "@/types/learning";
import { z } from "zod";

type Identity = { uid: string; publicName: string; emailVerified: boolean };
export class ProfessionalLearningError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}
const json = (value: unknown) => JSON.parse(JSON.stringify(value)) as Record<string, JsonValue>;
const queue = (path: string) => `tgpiLearningUsers/_professionalReviewQueue/items/${createHash("sha256").update(path).digest("hex")}`;
const audioPath = (uid: string, id: string) => { professionalRecordPath(uid, "audio", id); return `tgpiLearningUsers/${uid}/professionalAudio/${id}`; };
function courseFor(id: string) {
  const course = getProfessionalCourse(id);
  if (!course || !professionalCourseEnabled(id, process.env.VERCEL_ENV || process.env.NODE_ENV)) throw new ProfessionalLearningError("Este curso ainda não está liberado.", 404);
  if (!isLearningStorageConfigured()) throw new ProfessionalLearningError("O armazenamento seguro de aprendizagem está indisponível. Tente novamente.", 503);
  return course;
}
function expectedRevision(record: ProfessionalRecord, revision: number) {
  if (record.revision !== revision) throw new ProfessionalLearningError("Seu trabalho mudou em outra sessão. Recarregue antes de salvar.", 409);
}
function allActivities(course: NonNullable<ReturnType<typeof getProfessionalCourse>>, record: ProfessionalRecord) {
  return course.modules.flatMap(module => module.lessons).every(lesson => (record.activities[lesson.id]?.trim().length ?? 0) >= 80);
}
export async function getProfessionalRecord(uid: string, id: string) {
  const course = courseFor(id);
  return (await get<ProfessionalRecord>(professionalRecordPath(uid, id, course.version)))?.data ?? null;
}

export async function mutateProfessionalRecord(identity: Identity, id: string, raw: unknown) {
  const parsed = professionalMutationSchema.safeParse(raw);
  if (!parsed.success) throw new ProfessionalLearningError("Confira os campos e seus limites antes de enviar.");
  const input = parsed.data, course = courseFor(id), path = professionalRecordPath(identity.uid, id, course.version);
  if (input.version !== course.version) throw new ProfessionalLearningError("A versão do curso mudou. Seu histórico foi preservado; recarregue a página.", 409);
  if (input.action === "issue") return issueProfessionalCredential(identity, id, input.sharing);
  if (input.action === "sharing") return setProfessionalSharing(identity.uid, id, input.sharing);
  const result = await transaction<{ record: ProfessionalRecord; feedback?: Array<{ questionId: string; correct: boolean; explanation: string }> }>(async ({ getDocuments }) => {
    const document = (await getDocuments<ProfessionalRecord>([path])).get(path);
    const now = new Date().toISOString();
    let record = document?.data;
    if (input.action === "enrol") {
      if (record) return { result: { record }, writes: [] };
      record = { uid: identity.uid, courseId: id, version: course.version, revision: 0, enrolledAt: now, updatedAt: now, diagnostic: input.diagnostic, activities: {}, state: "studying" };
    } else {
      if (!record || record.uid !== identity.uid || record.version !== course.version) throw new ProfessionalLearningError("Matricule-se nesta versão antes de iniciar.", 409);
      if ("revision" in input) expectedRevision(record, input.revision);
      if (input.action === "appeal") {
        if (!record.review || record.state === "submitted" || record.state === "appealed" || record.credentialId) throw new ProfessionalLearningError("Não há uma devolutiva elegível para contestação.", 409);
        record = { ...record, state: "appealed", appeal: { text: input.text, submittedAt: now } };
      } else {
        if (["submitted", "approved", "appealed"].includes(record.state)) throw new ProfessionalLearningError("Esta versão está em revisão ou aprovada. Aguarde a devolutiva.", 409);
        if (input.action === "activity") {
          if (!course.modules.some(module => module.lessons.some(lesson => lesson.id === input.lessonId))) throw new ProfessionalLearningError("Atividade não encontrada.", 404);
          record = { ...record, activities: { ...record.activities, [input.lessonId]: input.text }, lastLessonId: input.lessonId };
        }
        if (input.action === "draft") {
          const allowed = new Set(course.modules.flatMap(module => module.lessons.map(lesson => lesson.id)));
          if (Object.keys(input.evidence).some(key => !allowed.has(key))) throw new ProfessionalLearningError("Referência de evidência inválida.");
          record = { ...record, draft: { project: input.project, transfer: input.transfer, evidence: input.evidence, aiDisclosure: input.aiDisclosure, ...(input.audioId ? { audioId: input.audioId } : {}), ...(input.files ? { files: input.files } : {}) } };
        }
        if (input.action === "quiz") {
          if (!allActivities(course, record)) throw new ProfessionalLearningError("Salve a prática de todas as aulas antes do questionário.", 409);
          if (record.quiz && Date.now() - Date.parse(record.quiz.submittedAt) < 30_000) throw new ProfessionalLearningError("Aguarde 30 segundos antes de uma nova tentativa.", 429);
          const scored = scoreProfessionalQuiz(professionalQuestionBank(id), input.answers, course.approval.quizMinimum);
          const quiz = { score: scored.score, passed: scored.passed, attempt: (record.quiz?.attempt ?? 0) + 1, submittedAt: now };
          record = { ...record, quiz };
          const next = { ...record, revision: record.revision + 1, updatedAt: now };
          return { result: { record: next, feedback: scored.feedback.map(({ questionId, correct, explanation }) => ({ questionId, correct, explanation })) }, writes: [
            write(path, json(next), { updateTime: document!.updateTime }),
            write(`${path}/history/quiz-${quiz.attempt}`, json({ quiz, answers: input.answers }), { exists: false }),
          ] };
        }
        if (input.action === "submit") {
          if (!allActivities(course, record) || !record.quiz?.passed) throw new ProfessionalLearningError("Conclua as práticas e seja aprovado no questionário antes do projeto.", 409);
          const project = professionalProjectSchema.safeParse(record.draft);
          if (!project.success) throw new ProfessionalLearningError("Complete o projeto, a transferência, as evidências e a declaração de IA.");
          const lessons = course.modules.flatMap(module => module.lessons);
          if (Object.keys(project.data.evidence).length !== lessons.length || lessons.some(lesson => !project.data.evidence[lesson.id])) throw new ProfessionalLearningError("Apresente evidência para todas as competências das aulas.");
          const attachments = await Promise.all((project.data.files || []).map(fileId => get<ProfessionalFile>(professionalFilePath(identity.uid, fileId))));
          if (attachments.some(file => !file || file.data.courseId !== id || file.data.version !== course.version || file.data.uid !== identity.uid)) throw new ProfessionalLearningError("Um arquivo não pertence a esta conta e versão do curso.");
          const requiredExtension = ({ "planilhas-decisoes-profissionais": ".xlsx", "analise-dados-power-bi-ia": ".pbix", "python-automacao-profissionais": ".py" } as Record<string, string>)[id];
          if (requiredExtension && !attachments.some(file => file?.data.name.toLowerCase().endsWith(requiredExtension))) throw new ProfessionalLearningError(`Este projeto exige um arquivo ${requiredExtension} editável para revisão.`);
          if (id === "ingles-carreira-internacional") {
            const audio = project.data.audioId ? await get<AudioRecord>(audioPath(identity.uid, project.data.audioId)) : null;
            if (!audio || audio.data.courseId !== id || audio.data.version !== course.version || !audio.data.consent) throw new ProfessionalLearningError("Envie uma amostra oral privada com consentimento antes de submeter este projeto.");
          }
          record = { ...record, state: "submitted", submission: { ...project.data, id: randomUUID(), submittedAt: now }, review: undefined, appeal: undefined };
        }
      }
    }
    const next: ProfessionalRecord = { ...record, revision: record.revision + 1, updatedAt: now };
    return { result: { record: next }, writes: [
      write(path, json(next), document?.updateTime ? { updateTime: document.updateTime } : { exists: false }),
      write(`${path}/history/${input.action}-${next.revision}`, json(next), { exists: false }),
      ...(["submit", "appeal"].includes(input.action) ? [write(queue(path), json({ uid: identity.uid, courseId: id, version: course.version, state: next.state, updatedAt: now }))] : []),
    ] };
  });
  if (input.action === "enrol" || input.action === "submit") await tryPublishNotification(identity.uid, {
    key: `professional:${id}:${input.action}:${result.record.revision}`, category: "learning", title: input.action === "enrol" ? "Matrícula recebida" : "Projeto enviado para revisão", body: "Acompanhe os próximos passos na área privada do curso.", href: `/courses/${id}/study`, actionLabel: "Abrir curso", important: false,
  });
  return result;
}

async function assertReviewer(uid: string) {
  const user = await (await clerkClient()).users.getUser(uid);
  if (user.privateMetadata.role !== "admin") throw new ProfessionalLearningError("Permissão de avaliação necessária.", 403);
}
export async function reviewProfessionalProject(reviewerUid: string, raw: unknown) {
  await assertReviewer(reviewerUid);
  const parsed = professionalReviewSchema.safeParse(raw);
  if (!parsed.success) throw new ProfessionalLearningError("Avalie todos os critérios, explique a devolutiva e confirme competência para revisar este trabalho.");
  const input = parsed.data, course = courseFor(input.courseId), path = professionalRecordPath(input.uid, input.courseId, input.version);
  if (input.courseId === "ingles-carreira-internacional" && !input.oralEvidenceReviewed) throw new ProfessionalLearningError("A avaliação de inglês exige revisão da evidência oral.");
  if (input.uid === reviewerUid || input.version !== course.version) throw new ProfessionalLearningError("Não é permitido avaliar o próprio trabalho ou outra versão.", 403);
  const result = await transaction(async ({ getDocuments }) => {
    const document = (await getDocuments<ProfessionalRecord>([path])).get(path), record = document?.data;
    if (!record?.submission || !["submitted", "appealed"].includes(record.state)) throw new ProfessionalLearningError("Submissão indisponível para avaliação.", 409);
    expectedRevision(record, input.revision);
    const now = new Date().toISOString();
    const review = { courseVersion: course.version, rubricVersion: course.approval.rubricVersion, submissionId: record.submission.id, reviewerUid, reviewedAt: now, scores: input.scores, feedback: input.feedback };
    const scored = scoreProfessionalProject(course, input.uid, review);
    const next: ProfessionalRecord = { ...record, state: scored.passed ? "approved" : "revision_requested", review, revision: record.revision + 1, completedAt: scored.passed ? now : undefined, updatedAt: now };
    return { result: next, writes: [write(path, json(next), { updateTime: document!.updateTime }), write(`${path}/history/review-${next.revision}`, json({ review, scored, expertiseAttestation: true }), { exists: false }), write(queue(path), json({ uid: input.uid, courseId: input.courseId, version: input.version, state: next.state, updatedAt: now }))] };
  });
  await tryPublishNotification(input.uid, { key: `professional-review:${input.courseId}:${result.revision}`, category: "learning", title: result.state === "approved" ? "Projeto aprovado" : "Seu projeto recebeu uma devolutiva", body: "Consulte os critérios avaliados e os próximos passos na área privada do curso.", href: `/courses/${input.courseId}/study`, actionLabel: "Ver devolutiva", important: true });
  return result;
}
export async function listProfessionalReviews(reviewerUid: string) {
  await assertReviewer(reviewerUid);
  if (!isLearningStorageConfigured()) throw new ProfessionalLearningError("Armazenamento seguro indisponível.", 503);
  const queueItems = await runFirestoreQuery<{ uid: string; courseId: string; version: string; state: string }>({ from: [{ collectionId: "items" }], where: { fieldFilter: { field: { fieldPath: "state" }, op: "IN", value: { arrayValue: { values: [{ stringValue: "submitted" }, { stringValue: "appealed" }] } } } }, limit: 50 }, "tgpiLearningUsers/_professionalReviewQueue");
  const records = await Promise.all(queueItems.map(item => get<ProfessionalRecord>(professionalRecordPath(item.data.uid, item.data.courseId, item.data.version))));
  return records.flatMap(item => item ? [item.data] : []);
}

async function issueProfessionalCredential(identity: Identity, id: string, sharing: boolean) {
  const course = courseFor(id);
  if (!identity.emailVerified || identity.publicName.trim().length < 2 || identity.publicName === "TGPI Member") throw new ProfessionalLearningError("Confirme seu e-mail e nome de certificado na conta.", 409);
  if (!isCredentialSigningConfigured()) throw new ProfessionalLearningError("Emissão segura indisponível.", 503);
  const key = await getOrCreateGlobalKey(identity.uid), path = professionalRecordPath(identity.uid, id, course.version);
  return transaction(async ({ getDocuments }) => {
    const document = (await getDocuments<ProfessionalRecord>([path])).get(path), record = document?.data;
    if (!record || !allActivities(course, record) || !record.quiz?.passed || record.state !== "approved" || !record.review || !record.completedAt || !scoreProfessionalProject(course, identity.uid, record.review).passed || record.review.submissionId !== record.submission?.id) throw new ProfessionalLearningError("A emissão exige práticas, questionário, projeto aprovado e todos os critérios essenciais.", 409);
    if (record.credentialId) return { result: { credentialId: record.credentialId }, writes: [] };
    const now = new Date().toISOString(), credentialId = createCredentialId(id);
    const unsigned: Omit<TgpiLearningCredential, "verificationHash"> = {
      achievementType: "Professional Certificate", assessmentScore: Math.round(scoreProfessionalProject(course, identity.uid, record.review).score),
      competencyIds: course.project.rubric.map(item => item.id), courseId: id, courseTitle: course.title, courseVersion: course.version,
      credentialProfile: "TGPI Verified Learning Credential", credentialSchemaVersion: 2, credentialStandardVersion: course.approval.rubricVersion,
      criteriaUrl: `/courses/${id}`, evidenceSummary: ["Atividades de todos os módulos registradas.", `Questionário ≥ ${course.approval.quizMinimum}%; projeto ≥ ${course.approval.projectMinimum}% e critérios essenciais atendidos.`, "Projeto e tarefa de transferência avaliados por revisor autorizado.", "Curso livre; sem equivalência a diploma, licença ou certificação externa."],
      id: credentialId, identityEvidence: { anchor: key.anchor, fingerprint: key.fingerprint, globalKeyId: key.keyId, revision: key.revision },
      issuedAt: now, completedAt: record.completedAt, documentNature: "Certificado de conclusão com avaliação de competências — TGPI",
      issuer: "TGPI — The Global Polymath Institute", keyId: TGPI_CREDENTIAL_KEY_ID,
      learningHours: estimateProfessionalMinutes(course) / 60, masteryThreshold: course.approval.projectMinimum, ownerUid: identity.uid, publicName: identity.publicName.slice(0, 120),
      skills: course.project.rubric.map(item => ({ id: item.id, level: "applied", name: item.title })), standardsAlignment: [], status: "active",
      professionalEvidence: { sharing, instructionLanguage: course.instructionLanguage, certificateLanguage: course.certificateLanguage, rubricVersion: course.approval.rubricVersion },
    };
    const credential = { ...unsigned, verificationHash: signLearningCredential(unsigned) }, next = { ...record, credentialId, updatedAt: now, revision: record.revision + 1 };
    return { result: { credentialId }, writes: [write(`tgpiLearningCredentials/${credentialId}`, json(credential), { exists: false }), write(`tgpiLearningUsers/${identity.uid}/credentials/${credentialId}`, json(credential), { exists: false }), write(path, json(next), { updateTime: document!.updateTime }), write(`${path}/history/issue-${next.revision}`, json({ credentialId, issuedAt: now }), { exists: false })] };
  });
}
async function setProfessionalSharing(uid: string, id: string, sharing: boolean) {
  const course = courseFor(id), path = professionalRecordPath(uid, id, course.version);
  return transaction(async ({ getDocuments }) => {
    const document = (await getDocuments<ProfessionalRecord>([path])).get(path), record = document?.data;
    if (!record?.credentialId) throw new ProfessionalLearningError("Certificado não encontrado.", 404);
    const publicPath = `tgpiLearningCredentials/${record.credentialId}`, ownerPath = `tgpiLearningUsers/${uid}/credentials/${record.credentialId}`;
    const credentials = await getDocuments<TgpiLearningCredential>([publicPath, ownerPath]), credential = credentials.get(publicPath)?.data;
    if (!credential || credential.ownerUid !== uid || !credential.professionalEvidence) throw new ProfessionalLearningError("Certificado indisponível.", 404);
    if (!verifyLearningCredentialIntegrity(credential)) throw new ProfessionalLearningError("Integridade do certificado requer revisão.", 409);
    const { verificationHash: _signature, ...unsigned } = credential; void _signature;
    unsigned.professionalEvidence = { ...credential.professionalEvidence, sharing };
    const updated = { ...unsigned, verificationHash: signLearningCredential(unsigned) }, auditId = randomUUID();
    return { result: { sharing }, writes: [write(publicPath, json(updated), { updateTime: credentials.get(publicPath)!.updateTime }), write(ownerPath, json(updated), { updateTime: credentials.get(ownerPath)!.updateTime }), write(`${path}/history/sharing-${auditId}`, json({ sharing, changedAt: new Date().toISOString() }), { exists: false })] };
  });
}

type AudioRecord = { uid: string; courseId: string; version: string; consent: true; type: string; ciphertext: string; createdAt: string };
function audioKey() {
  if (!isLearningStorageConfigured() || !isCredentialSigningConfigured()) throw new ProfessionalLearningError("Armazenamento de áudio privado indisponível.", 503);
  return createHash("sha256").update("tgpi-professional-audio-v1:" + process.env.TGPI_CREDENTIAL_SIGNING_SECRET).digest();
}
export async function uploadProfessionalAudio(uid: string, id: string, bytes: Uint8Array, type: string, consent: boolean) {
  const course = courseFor(id);
  if (id !== "ingles-carreira-internacional" || !consent || !bytes.length || bytes.length > 600_000) throw new ProfessionalLearningError("Envie áudio consentido de até 600 KB.", 413);
  const buffer = Buffer.from(bytes);
  if (!(type === "audio/webm" && buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))) && !(type === "audio/wav" && buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WAVE")) throw new ProfessionalLearningError("Use arquivo WebM ou WAV válido.");
  const audioId = randomUUID(), nonce = randomBytes(12), cipher = createCipheriv("aes-256-gcm", audioKey(), nonce);
  cipher.setAAD(Buffer.from(`${uid}:${id}:${course.version}:${audioId}`));
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const record: AudioRecord = { uid, courseId: id, version: course.version, consent: true, type, ciphertext: Buffer.concat([nonce, cipher.getAuthTag(), encrypted]).toString("base64"), createdAt: new Date().toISOString() };
  const path = professionalRecordPath(uid, id, course.version), limitPath = `tgpiLearningUsers/${uid}/professionalAudioLimits/current`;
  await transaction(async ({ getDocuments }) => {
    const docs = await getDocuments<ProfessionalRecord & { day: string; count: number }>([path, limitPath]), enrolment = docs.get(path), previous = docs.get(limitPath)?.data;
    if (!enrolment || enrolment.data.state === "approved") throw new ProfessionalLearningError("Matricule-se e mantenha um projeto em preparação para enviar áudio.", 409);
    const day = record.createdAt.slice(0, 10), count = previous?.day === day ? previous.count : 0;
    if (count >= 5) throw new ProfessionalLearningError("Limite de cinco amostras diárias atingido.", 429);
    return { result: null, writes: [write(audioPath(uid, audioId), json(record), { exists: false }), write(limitPath, { day, count: count + 1 })] };
  });
  return { audioId };
}
export async function readProfessionalAudio(viewerUid: string, ownerUid: string, id: string) {
  if (viewerUid !== ownerUid) await assertReviewer(viewerUid);
  const record = (await get<AudioRecord>(audioPath(ownerUid, id)))?.data;
  if (!record || record.uid !== ownerUid) throw new ProfessionalLearningError("Áudio não encontrado.", 404);
  courseFor(record.courseId);
  const data = Buffer.from(record.ciphertext, "base64"), decipher = createDecipheriv("aes-256-gcm", audioKey(), data.subarray(0, 12));
  decipher.setAuthTag(data.subarray(12, 28)); decipher.setAAD(Buffer.from(`${ownerUid}:${record.courseId}:${record.version}:${id}`));
  return { bytes: Buffer.concat([decipher.update(data.subarray(28)), decipher.final()]), type: record.type };
}

const lifecycleSchema = z.object({ operation: z.enum(["revoke", "replace"]), credentialId: z.string().regex(/^TGPI-[A-Z0-9_-]{8,90}$/), reason: z.string().trim().min(30).max(2000) }).strict();
export async function changeProfessionalCredential(reviewerUid: string, raw: unknown) {
  await assertReviewer(reviewerUid);
  const input = lifecycleSchema.safeParse(raw);
  if (!input.success) throw new ProfessionalLearningError("Informe certificado, operação e justificativa de pelo menos 30 caracteres.");
  if (!isLearningStorageConfigured() || !isCredentialSigningConfigured()) throw new ProfessionalLearningError("Serviço seguro de certificados indisponível.", 503);
  return transaction(async ({ getDocuments }) => {
    const publicPath = `tgpiLearningCredentials/${input.data.credentialId}`;
    const doc = (await getDocuments<TgpiLearningCredential>([publicPath])).get(publicPath), credential = doc?.data;
    if (!credential?.professionalEvidence) throw new ProfessionalLearningError("Esta operação é exclusiva dos certificados dos novos percursos profissionais.", 404);
    if (!verifyLearningCredentialIntegrity(credential)) throw new ProfessionalLearningError("Integridade do certificado requer revisão.", 409);
    if (credential.ownerUid === reviewerUid) throw new ProfessionalLearningError("Operações no próprio certificado exigem outro administrador autorizado.", 403);
    if (credential.status !== "active") throw new ProfessionalLearningError("O certificado não está ativo; consulte seu histórico antes de continuar.", 409);
    const ownerPath = `tgpiLearningUsers/${credential.ownerUid}/credentials/${credential.id}`;
    const coursePath = professionalRecordPath(credential.ownerUid, credential.courseId, credential.courseVersion);
    const records = await getDocuments<ProfessionalRecord & TgpiLearningCredential>([ownerPath, coursePath]);
    if (!records.get(ownerPath) || records.get(coursePath)?.data.credentialId !== credential.id) throw new ProfessionalLearningError("Os registros do certificado não correspondem.", 409);
    const { verificationHash: oldHash, ...unsigned } = credential; void oldHash;
    const replacementId = input.data.operation === "replace" ? createCredentialId(credential.courseId) : undefined;
    const now = new Date().toISOString();
    const previous = { ...unsigned, status: replacementId ? "replaced" as const : "revoked" as const, ...(replacementId ? { replacedBy: replacementId } : {}) };
    const updated = { ...previous, verificationHash: signLearningCredential(previous) };
    const writes = [write(publicPath, json(updated), { updateTime: doc!.updateTime }), write(ownerPath, json(updated), { updateTime: records.get(ownerPath)!.updateTime }), write(`${coursePath}/history/lifecycle-${randomUUID()}`, json({ operation: input.data.operation, reason: input.data.reason, reviewerUid, credentialId: credential.id, replacementId, changedAt: now }), { exists: false })];
    if (replacementId) {
      const replacement = { ...unsigned, id: replacementId, issuedAt: now, replaces: credential.id, status: "active" as const };
      const signed = { ...replacement, verificationHash: signLearningCredential(replacement) };
      writes.push(write(`tgpiLearningCredentials/${replacementId}`, json(signed), { exists: false }), write(`tgpiLearningUsers/${credential.ownerUid}/credentials/${replacementId}`, json(signed), { exists: false }), write(coursePath, json({ ...records.get(coursePath)!.data, credentialId: replacementId, updatedAt: now, revision: records.get(coursePath)!.data.revision + 1 }), { updateTime: records.get(coursePath)!.updateTime }));
    }
    return { result: { status: updated.status, replacementId }, writes };
  });
}

type ProfessionalFile = { uid: string; courseId: string; version: string; name: string; size: number; parts: number; hash: string; createdAt: string };
function professionalFilePath(uid: string, id: string) { professionalRecordPath(uid, "file", id); return `tgpiLearningUsers/${uid}/professionalFiles/${id}`; }
function fileKey() {
  if (!isLearningStorageConfigured() || !isCredentialSigningConfigured()) throw new ProfessionalLearningError("Armazenamento de arquivos privado indisponível.", 503);
  return createHash("sha256").update("tgpi-professional-file-v1:" + process.env.TGPI_CREDENTIAL_SIGNING_SECRET).digest();
}
export async function uploadProfessionalFile(uid: string, id: string, input: Uint8Array, rawName: string) {
  const course = courseFor(id), name = rawName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100), extension = name.toLowerCase().split(".").pop() || "";
  if (!["xlsx", "pbix", "pdf", "csv", "json", "py", "txt", "md"].includes(extension) || input.length < 1 || input.length > 3_000_000) throw new ProfessionalLearningError("Use XLSX, PBIX, PDF, CSV, JSON, PY, TXT ou MD de até 3 MB.", 413);
  const bytes = Buffer.from(input);
  if (["xlsx", "pbix"].includes(extension) && !bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]))) throw new ProfessionalLearningError("Formato do arquivo não corresponde à extensão.");
  if (extension === "pdf" && bytes.subarray(0, 5).toString() !== "%PDF-") throw new ProfessionalLearningError("PDF inválido.");
  if (["csv", "json", "py", "txt", "md"].includes(extension)) {
    try { new TextDecoder("utf-8", { fatal: true }).decode(bytes); } catch { throw new ProfessionalLearningError("Use texto UTF-8 válido."); }
    if (bytes.includes(0)) throw new ProfessionalLearningError("O arquivo de texto contém conteúdo binário.");
  }
  const fileId = randomUUID(), nonce = randomBytes(12), cipher = createCipheriv("aes-256-gcm", fileKey(), nonce);
  cipher.setAAD(Buffer.from(`${uid}:${id}:${course.version}:${fileId}`));
  const encrypted = Buffer.concat([cipher.update(bytes), cipher.final()]);
  const payload = Buffer.concat([nonce, cipher.getAuthTag(), encrypted]).toString("base64");
  const chunks = Array.from({ length: Math.ceil(payload.length / 600_000) }, (_, index) => payload.slice(index * 600_000, (index + 1) * 600_000));
  const file: ProfessionalFile = { uid, courseId: id, version: course.version, name, size: bytes.length, parts: chunks.length, hash: createHash("sha256").update(bytes).digest("hex"), createdAt: new Date().toISOString() };
  const path = professionalFilePath(uid, fileId), enrolPath = professionalRecordPath(uid, id, course.version), limitPath = `tgpiLearningUsers/${uid}/professionalFileLimits/current`;
  await transaction(async ({ getDocuments }) => {
    const docs = await getDocuments<ProfessionalRecord & { day: string; count: number }>([enrolPath, limitPath]), enrolment = docs.get(enrolPath)?.data, previous = docs.get(limitPath)?.data;
    if (!enrolment || ["approved", "submitted", "appealed"].includes(enrolment.state)) throw new ProfessionalLearningError("Mantenha um projeto em preparação antes de enviar arquivos.", 409);
    const day = file.createdAt.slice(0, 10), count = previous?.day === day ? previous.count : 0;
    if (count >= 10) throw new ProfessionalLearningError("Limite diário de dez arquivos atingido.", 429);
    return { result: null, writes: [write(path, json(file), { exists: false }), ...chunks.map((ciphertext, index) => write(`${path}/parts/${index}`, { ciphertext }, { exists: false })), write(limitPath, { day, count: count + 1 })] };
  });
  return { fileId, name, size: bytes.length };
}
export async function readProfessionalFile(viewerUid: string, ownerUid: string, fileId: string) {
  if (viewerUid !== ownerUid) await assertReviewer(viewerUid);
  const path = professionalFilePath(ownerUid, fileId), file = (await get<ProfessionalFile>(path))?.data;
  if (!file || file.uid !== ownerUid || !Number.isInteger(file.parts) || file.parts < 1 || file.parts > 8 || file.size > 3_000_000) throw new ProfessionalLearningError("Arquivo não encontrado.", 404);
  courseFor(file.courseId);
  const chunks = await Promise.all(Array.from({ length: file.parts }, (_, index) => get<{ ciphertext: string }>(`${path}/parts/${index}`)));
  if (chunks.some(chunk => !chunk)) throw new ProfessionalLearningError("Arquivo incompleto. Tente novamente.", 503);
  const payload = Buffer.from(chunks.map(chunk => chunk!.data.ciphertext).join(""), "base64"), decipher = createDecipheriv("aes-256-gcm", fileKey(), payload.subarray(0, 12));
  decipher.setAuthTag(payload.subarray(12, 28)); decipher.setAAD(Buffer.from(`${ownerUid}:${file.courseId}:${file.version}:${fileId}`));
  const bytes = Buffer.concat([decipher.update(payload.subarray(28)), decipher.final()]);
  if (bytes.length !== file.size || createHash("sha256").update(bytes).digest("hex") !== file.hash) throw new ProfessionalLearningError("Integridade do arquivo requer revisão.", 409);
  return { bytes, name: file.name };
}
