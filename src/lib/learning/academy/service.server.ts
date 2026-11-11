import 'server-only';
import { randomInt, randomUUID } from 'node:crypto';
import { academyCourses, getAcademyCourse, academyQuestions, academyCase, ACADEMY_VERSION, PREVIOUS_ACADEMY_VERSION, ACADEMY_PASS_SCORE, ACADEMY_REVIEW_DELAY_MS } from '@/data/courses/academy/catalog.server';
import { academyMutation, academyRecordPath, numericAnswer } from './model';
import type { AcademyChallenge, AcademyCourse, AcademyPrivateQuestion, AcademyRecord, AcademyResult } from './types';
import { createFirestoreUpdateWrite as write, getFirestoreDocument as get, isLearningStorageConfigured, runFirestoreTransaction as transaction, type JsonValue } from '@/lib/firestore-admin-rest.server';
import { createCredentialId, isCredentialSigningConfigured, signLearningCredential, verifyLearningCredentialIntegrity, TGPI_CREDENTIAL_KEY_ID } from '@/lib/credential-signing.server';
import { isCertificateName } from '@/lib/account-profile';
import { getOrCreateGlobalKey } from '@/lib/global-key.server';
import { getUserActivationProgress } from '@/lib/activation-store.server';
import { getProfessionalCourse } from '@/lib/learning/professional-runtime';
import { professionalRecordPath, type ProfessionalRecord } from '@/lib/learning/professional-model';
import { tryPublishNotification } from '@/lib/notifications/store.server';
import type { TgpiLearningCredential } from '@/types/learning';

type Identity = { uid: string; publicName: string; emailVerified: boolean };
type StoredChallenge = { public: AcademyChallenge; questions: AcademyPrivateQuestion[]; calculation?: { expected: number; explanation: string }; result?: AcademyResult; evidenceSnapshot?: { practice: string; diagnostic: string } };
type ActiveState = { challengeId: string };
const json = (value: unknown) => JSON.parse(JSON.stringify(value)) as Record<string, JsonValue>;
export class AcademyError extends Error { constructor(message: string, readonly status = 400) { super(message); } }
function courseFor(id: string, version = ACADEMY_VERSION) {
  const course = getAcademyCourse(id, version);
  if (!course || course.id !== id) throw new AcademyError('Course not found.', 404);
  if (!isLearningStorageConfigured()) throw new AcademyError('Secure learning storage is unavailable. Please try again.', 503);
  return course;
}
function assertRecord(record: AcademyRecord | undefined, identity: Identity, course: AcademyCourse): asserts record is AcademyRecord {
  if (!record || record.uid !== identity.uid || record.courseId !== course.id || record.version !== course.version) throw new AcademyError('Start this course edition before continuing.', 409);
}
function allLessons(course: AcademyCourse, record: AcademyRecord) { return course.lessons.every(l => record.completed[l.id]?.score === 100); }
function allowedTarget(course: AcademyCourse, record: AcademyRecord, target: string, now: number) {
  if (target === 'final' || target === 'retention') {
    if (!allLessons(course, record) || record.portfolio.trim().length < 200) throw new AcademyError('Complete all lesson checks and save your practice portfolio first.', 409);
    if (target === 'retention' && (!record.final || !record.reviewAvailableAt || now < Date.parse(record.reviewAvailableAt))) throw new AcademyError('Your spaced review opens 24 hours after passing the final assessment.', 409);
    return;
  }
  const index = course.lessons.findIndex(l => l.id === target);
  if (index < 0) throw new AcademyError('Lesson not found.', 404);
  if (course.lessons.slice(0, index).some(l => !record.completed[l.id])) throw new AcademyError('Complete the previous lesson checks before advancing.', 409);
  if ((record.notes[target]?.trim().length ?? 0) < 80) throw new AcademyError('Save your practice evidence before opening this lesson check.', 409);
}
function shuffled<T>(items: readonly T[]): T[] {
  const output = [...items];
  for (let i = output.length - 1; i > 0; i--) { const j = randomInt(i + 1); [output[i], output[j]] = [output[j], output[i]]; }
  return output;
}
function makeChallenge(course: AcademyCourse, target: string): StoredChallenge {
  const bank = academyQuestions(course.id, course.version);
  let selected: AcademyPrivateQuestion[];
  if (target === 'final' || target === 'retention') {
    // Cover every advanced laboratory, then sample foundation skills. Each item uses opaque per-attempt IDs.
    const advancedIds = new Set(course.lessons.filter(l => !l.foundation).map(l => l.id));
    const advanced = shuffled(bank.filter(q => advancedIds.has(q.lessonId)));
    // Preserve every required item while keeping final assessments within the request schema.
    const essential = advanced.filter(question => question.essential);
    const practice = advanced.filter(question => !question.essential);
    const foundation = shuffled(bank.filter(q => !advancedIds.has(q.lessonId)));
    selected = [...essential, ...practice.slice(0, Math.max(0, 32 - essential.length)),
      ...foundation.slice(0, Math.max(3, 12 - advanced.length))];
  } else selected = bank.filter(q => q.lessonId === target);
  if (!selected.length) throw new AcademyError('Assessment content is unavailable.', 503);
  const questions = shuffled(selected).map(q => {
    const options = shuffled(q.options).map(o => ({ ...o, originalId: o.id, id: randomUUID() }));
    return { ...q, id: randomUUID(), correctOptionId: options.find(o => o.originalId === q.correctOptionId)!.id, options: options.map(({ id, label }) => ({ id, label })) };
  });
  const challenge: StoredChallenge = { public: { id: randomUUID(), target, createdAt: new Date().toISOString(), questions: questions.map(({ correctOptionId: _key, explanation: _reason, ...q }) => { void _key; void _reason; return q; }) }, questions };
  if (target === 'final' || target === 'retention') {
    const spec = academyCase(course.id), a = randomInt(70, 151), b = randomInt(12, 41), c = randomInt(3, 10);
    const expected = spec.operation === 'remaining' ? (a - b) / c : spec.operation === 'sum' ? a - b - c : spec.operation === 'ratio' ? a / c : b / a * 100;
    challenge.public.calculation = { prompt: spec.prompt.replaceAll('{a}', String(a)).replaceAll('{b}', String(b)).replaceAll('{c}', String(c)), unit: spec.unit };
    challenge.calculation = { expected: Math.round(expected * 100) / 100, explanation: spec.explanation };
  }
  return challenge;
}
async function priorLearning(uid: string, course: AcademyCourse): Promise<Pick<AcademyRecord, 'notes' | 'legacy'>> {
  const historical = (await get<AcademyRecord>(academyRecordPath(uid, course.id, PREVIOUS_ACADEMY_VERSION)))?.data;
  if (historical?.uid === uid && historical.courseId === course.id && historical.version === PREVIOUS_ACADEMY_VERSION) {
    const lessonIds = new Set(course.lessons.map(lesson => lesson.id));
    return {
      notes: Object.fromEntries(Object.entries(historical.notes).filter(([id]) => lessonIds.has(id))),
      legacy: { version: historical.version, completed: Object.keys(historical.completed).length,
        ...(historical.credentialId ? { credentialId: historical.credentialId } : {}) },
    };
  }
  const pro = getProfessionalCourse(course.id);
  if (pro) {
    const previous = (await get<ProfessionalRecord>(professionalRecordPath(uid, course.id, pro.version)))?.data;
    if (!previous || previous.uid !== uid) return { notes: {} };
    const ids = new Set(course.lessons.map(l => l.id));
    return { notes: Object.fromEntries(Object.entries(previous.activities).filter(([id]) => ids.has(id))), legacy: { version: previous.version, completed: Object.keys(previous.activities).length, state: previous.state, ...(previous.credentialId ? { credentialId: previous.credentialId } : {}) } };
  }
  const progress = await getUserActivationProgress(uid), previous = progress.courseProgress[course.id] ?? (course.id === 'global-english-2026' ? progress.courseProgress['english-abroad'] : undefined);
  return { notes: {}, ...(previous ? { legacy: { version: previous.courseVersion, completed: previous.completedLessonIds.length } } : {}) };
}
export async function academyStudyCourse(uid: string, course: AcademyCourse, preferCurrent = false, preferredVersion?: string) {
  if (preferCurrent || !isLearningStorageConfigured()) return course;
  const previous = getAcademyCourse(course.id, PREVIOUS_ACADEMY_VERSION);
  if (!previous) return course;
  const [current, historical] = await Promise.all([
    preferredVersion === previous.version ? null : get<AcademyRecord>(academyRecordPath(uid, course.id, course.version)),
    get<AcademyRecord>(academyRecordPath(uid, course.id, previous.version)),
  ]);
  if (current?.data.uid === uid && current.data.courseId === course.id && current.data.version === course.version) return course;
  return historical?.data.uid === uid && historical.data.courseId === course.id && historical.data.version === previous.version ? previous : course;
}

export async function academyStatus(identity: Identity, id: string, version?: string) {
  const latest = courseFor(id);
  if (version && !getAcademyCourse(id, version)) throw new AcademyError('The course edition changed. Reload; your previous records are preserved.', 409);
  const course = version ? courseFor(id, version) : await academyStudyCourse(identity.uid, latest);
  const path = academyRecordPath(identity.uid, id, course.version);
  const [document, active] = await Promise.all([get<AcademyRecord>(path), get<ActiveState>(`${path}/state/active`)]);
  if (document) assertRecord(document.data, identity, course);
  const stored = active?.data.challengeId ? (await get<StoredChallenge>(`${path}/attempts/${active.data.challengeId}`))?.data : null;
  return { record: document?.data ?? null, publicName: identity.publicName, emailVerified: identity.emailVerified, signingReady: isCredentialSigningConfigured(), challenge: stored && !stored.result ? stored.public : null, lastResult: stored?.result ?? null };
}
export async function mutateAcademy(identity: Identity, id: string, raw: unknown) {
  const parsed = academyMutation.safeParse(raw);
  if (!parsed.success) throw new AcademyError('Check the fields and their limits before sending.');
  const input = parsed.data;
  courseFor(id);
  if (!getAcademyCourse(id, input.version)) throw new AcademyError('The course edition changed. Reload; your previous records are preserved.', 409);
  const course = courseFor(id, input.version), path = academyRecordPath(identity.uid, id, course.version);
  if (input.action === 'issue') { await issueAcademyCredential(identity, course, input.confirmedName); return academyStatus(identity, id, course.version); }
  if (input.action === 'sharing') { await academySharing(identity, course, input.sharing); return academyStatus(identity, id, course.version); }
  const prior = input.action === 'enrol' && course.version === ACADEMY_VERSION ? await priorLearning(identity.uid, course) : null;
  await transaction(async ({ getDocuments }) => {
    const doc = (await getDocuments<AcademyRecord>([path])).get(path), now = new Date().toISOString();
    let record = doc?.data;
    if (input.action === 'enrol') {
      if (record) { assertRecord(record, identity, course); return { result: null, writes: [] }; }
      if (course.version !== ACADEMY_VERSION) throw new AcademyError('The course edition changed. Reload; your previous records are preserved.', 409);
      if (!isCertificateName(identity.publicName)) throw new AcademyError('Set your certificate name in your account before starting.', 409);
      record = { uid: identity.uid, courseId: id, version: course.version, revision: 1, enrolledAt: now, updatedAt: now, consent: { publicName: identity.publicName, acceptedAt: now }, diagnostic: input.diagnostic, ...(input.plan ? { plan: input.plan } : {}), notes: prior?.notes ?? {}, completed: {}, portfolio: '', sharing: false, attemptLimits: {}, ...(prior?.legacy ? { legacy: prior.legacy } : {}) };
      return { result: null, writes: [write(path, json(record), { exists: false })] };
    }
    assertRecord(record, identity, course);
    if ('revision' in input && input.revision !== record.revision) throw new AcademyError('Your work changed in another session. Reload before saving; keep your local draft.', 409);
    if (input.action === 'save') {
      if (!course.lessons.some(l => l.id === input.lessonId)) throw new AcademyError('Lesson not found.', 404);
      record = { ...record, notes: { ...record.notes, [input.lessonId]: input.text } };
    }
    if (input.action === 'portfolio') record = { ...record, portfolio: input.text };
    if (input.action === 'begin') {
      allowedTarget(course, record, input.target, Date.now());
      if (record.completed[input.target] || (input.target === 'final' && record.final) || (input.target === 'retention' && record.retention)) throw new AcademyError('This assessment is already passed.', 409);
      const activePath = `${path}/state/active`, active = (await getDocuments<ActiveState>([activePath])).get(activePath);
      if (active?.data.challengeId) {
        const previousPath = `${path}/attempts/${active.data.challengeId}`, previous = (await getDocuments<StoredChallenge>([previousPath])).get(previousPath)?.data;
        if (previous && !previous.result) {
          if (previous.public.target === input.target) return { result: null, writes: [] };
          throw new AcademyError('Finish your current assessment before opening another.', 409);
        }
      }
      const limit = record.attemptLimits[input.target], day = now.slice(0, 10), count = limit?.day === day ? limit.count : 0;
      const total = record.attemptLimits._daily, totalCount = total?.day === day ? total.count : 0;
      if (count >= 5 || totalCount >= 60) throw new AcademyError('Daily assessment limit reached. Review the feedback and return tomorrow.', 429);
      const cooldown = ['final', 'retention'].includes(input.target) ? 5 * 60_000 : 30_000;
      if (limit && Date.now() - Date.parse(limit.lastAt) < cooldown) throw new AcademyError('Review the feedback before retrying: 30 seconds for lessons, 5 minutes for final reviews.', 429);
      const challenge = makeChallenge(course, input.target);
      record = { ...record, updatedAt: now, revision: record.revision + 1, attemptLimits: { ...record.attemptLimits, [input.target]: { day, count: count + 1, lastAt: now }, _daily: { day, count: totalCount + 1, lastAt: now } } };
      return { result: null, writes: [write(path, json(record), { updateTime: doc!.updateTime }), write(`${path}/attempts/${challenge.public.id}`, json(challenge), { exists: false }), write(activePath, { challengeId: challenge.public.id })] };
    }
    if (input.action === 'submit') {
      const attemptPath = `${path}/attempts/${input.challengeId}`, attempt = (await getDocuments<StoredChallenge>([attemptPath])).get(attemptPath), stored = attempt?.data;
      if (!stored) throw new AcademyError('Assessment not found for this account and course.', 404);
      if (stored.result) return { result: null, writes: [] }; // Replay returns the persisted result, never a second grade.
      const activePath = `${path}/state/active`, active = (await getDocuments<ActiveState>([activePath])).get(activePath)?.data;
      if (active?.challengeId !== input.challengeId) throw new AcademyError('This assessment is no longer active.', 409);
      allowedTarget(course, record, stored.public.target, Date.now());
      const answers = new Map(input.answers.map(a => [a.questionId, a.optionId]));
      if (answers.size !== input.answers.length || answers.size !== stored.questions.length || stored.questions.some(q => !q.options.some(o => o.id === answers.get(q.id)))) throw new AcademyError('Answer each question exactly once using its available options.');
      const feedback = stored.questions.map(q => ({ questionId: q.id, lessonId: q.lessonId, correct: answers.get(q.id) === q.correctOptionId, explanation: q.explanation }));
      if (stored.calculation) {
        const answer = numericAnswer(input.calculation);
        feedback.push({ questionId: 'calculation', lessonId: stored.public.target, correct: answer !== null && answer === stored.calculation.expected, explanation: stored.calculation.explanation });
      } else if (input.calculation !== undefined) throw new AcademyError('This assessment does not contain a calculation.');
      const score = Math.round(feedback.filter(f => f.correct).length / feedback.length * 100), finalStage = ['final', 'retention'].includes(stored.public.target);
      const essentialsPassed = stored.questions.every(q => !q.essential || answers.get(q.id) === q.correctOptionId) && (!stored.calculation || feedback.at(-1)!.correct);
      const passed = finalStage ? score >= ACADEMY_PASS_SCORE && essentialsPassed : score === 100;
      const result: AcademyResult = { challengeId: input.challengeId, target: stored.public.target, score, passed, feedback, submittedAt: now };
      if (passed) {
        if (result.target === 'final') record = { ...record, final: { score, at: now }, reviewAvailableAt: new Date(Date.now() + ACADEMY_REVIEW_DELAY_MS).toISOString() };
        else if (result.target === 'retention') record = { ...record, retention: { score, at: now }, completedAt: now };
        else record = { ...record, completed: { ...record.completed, [result.target]: { score, at: now, challengeId: input.challengeId } } };
      }
      record = { ...record, updatedAt: now, revision: record.revision + 1 };
      return { result: null, writes: [write(path, json(record), { updateTime: doc!.updateTime }), write(attemptPath, json({ ...stored, result, evidenceSnapshot: { practice: finalStage ? record.portfolio : record.notes[result.target], diagnostic: record.diagnostic } }), { updateTime: attempt!.updateTime })] };
    }
    record = { ...record, updatedAt: now, revision: record.revision + 1 };
    return { result: null, writes: [write(path, json(record), { updateTime: doc!.updateTime })] };
  });
  const status = await academyStatus(identity, id, course.version);
  if (status.record?.completedAt && !status.record.credentialId && identity.emailVerified && isCredentialSigningConfigured() &&
      isCertificateName(identity.publicName) && status.record.consent.publicName === identity.publicName) {
    await issueAcademyCredential(identity, course);
    return academyStatus(identity, id, course.version);
  }
  return status;
}
async function issueAcademyCredential(identity: Identity, course: AcademyCourse, confirmedName?: string) {
  if (!identity.emailVerified) throw new AcademyError('Verify your account email before certificate issuance.', 409);
  if (!isCredentialSigningConfigured()) throw new AcademyError('Secure certificate issuance is temporarily unavailable. Your completion is saved.', 503);
  const key = await getOrCreateGlobalKey(identity.uid), path = academyRecordPath(identity.uid, course.id, course.version);
  const credentialId = await transaction(async ({ getDocuments }) => {
    const doc = (await getDocuments<AcademyRecord>([path])).get(path), record = doc?.data;
    assertRecord(record, identity, course);
    if (record.credentialId) return { result: record.credentialId, writes: [] };
    if (!allLessons(course, record) || !record.final || record.final.score < 80 || !record.retention || record.retention.score < 80 || !record.completedAt || !record.reviewAvailableAt || Date.parse(record.retention.at) < Date.parse(record.reviewAvailableAt) || record.portfolio.trim().length < 200 || !record.consent.acceptedAt) throw new AcademyError('Complete all required practice, final assessment and spaced review before certification.', 409);
    if (!isCertificateName(identity.publicName)) throw new AcademyError('Enter your complete real name for certificates.', 409);
    const acceptedName = confirmedName ?? record.consent.publicName;
    if (acceptedName !== identity.publicName) {
      throw new AcademyError('Confirm the public credential name before issuance.', 409);
    }
    const id = createCredentialId(course.id), now = new Date().toISOString();
    const consent = confirmedName === undefined ? record.consent : { publicName: identity.publicName, acceptedAt: now };
    const unsigned: Omit<TgpiLearningCredential, 'verificationHash'> = {
      id, achievementType: 'Professional Certificate', assessmentScore: Math.min(record.final.score, record.retention.score), competencyIds: course.lessons.map(l => l.id), courseId: course.id, courseTitle: course.title, courseVersion: course.version,
      credentialProfile: 'TGPI Verified Learning Credential', credentialSchemaVersion: 2, credentialStandardVersion: 'tgpi-autonomous-1.0', criteriaUrl: `/courses/${course.id}#certification`,
      evidenceSummary: ['Lesson checks passed with practice records.', 'Final assessment and spaced review: at least 80%, including all essential checks and a fresh numerical case.', 'Objective responses were scored automatically. Open practice artifacts, oral performance and professional competence were not independently evaluated.', 'Estimated workload includes study, practice and assessment; it is not monitored attendance. Non-degree course; no external accreditation or license is implied.'],
      identityEvidence: { anchor: key.anchor, fingerprint: key.fingerprint, globalKeyId: key.keyId, revision: key.revision }, issuedAt: now, completedAt: record.completedAt,
      documentNature: 'Certificado de conclusão — práticas e avaliações automáticas', issuer: 'TGPI — The Global Polymath Institute', keyId: TGPI_CREDENTIAL_KEY_ID,
      learningHours: Math.round(course.minutes / 60 * 100) / 100, masteryThreshold: 80, ownerUid: identity.uid, publicName: consent.publicName,
      skills: course.lessons.filter(l => !l.foundation).map(l => ({ id: l.id, level: 'foundation', name: l.title })), standardsAlignment: [], status: 'active',
      professionalEvidence: { sharing: record.sharing, instructionLanguage: course.language, certificateLanguage: 'pt-BR', rubricVersion: 'tgpi-autonomous-1.0' },
      automatedEvidence: { method: 'objective-assessment', finalScore: record.final.score, retentionScore: record.retention.score, lessonChecks: course.lessons.length, humanReviewed: false, workloadMinutes: course.minutes },
    };
    const credential = { ...unsigned, verificationHash: signLearningCredential(unsigned) };
    return { result: id, writes: [write(`tgpiLearningCredentials/${id}`, json(credential), { exists: false }), write(`tgpiLearningUsers/${identity.uid}/credentials/${id}`, json(credential), { exists: false }), write(path, json({ ...record, consent, credentialId: id, updatedAt: now, revision: record.revision + 1 }), { updateTime: doc!.updateTime })] };
  });
  await tryPublishNotification(identity.uid, { key: `credential:${credentialId}`, category: 'learning', title: 'Your verified credential is ready', body: 'Your issued credential is available in your private certificate workspace.', href: '/certificates', actionLabel: 'View my credential', important: true });
  return credentialId;
}
async function academySharing(identity: Identity, course: AcademyCourse, sharing: boolean) {
  const path = academyRecordPath(identity.uid, course.id, course.version);
  return transaction(async ({ getDocuments }) => {
    const doc = (await getDocuments<AcademyRecord>([path])).get(path), record = doc?.data;
    assertRecord(record, identity, course);
    if (!record.credentialId) throw new AcademyError('Certificate not found.', 404);
    const publicPath = `tgpiLearningCredentials/${record.credentialId}`, ownerPath = `tgpiLearningUsers/${identity.uid}/credentials/${record.credentialId}`;
    const docs = await getDocuments<TgpiLearningCredential>([publicPath, ownerPath]), credential = docs.get(publicPath)?.data;
    if (!credential || credential.ownerUid !== identity.uid || !credential.automatedEvidence || !verifyLearningCredentialIntegrity(credential) || !docs.get(ownerPath)) throw new AcademyError('Certificate integrity could not be verified.', 409);
    const { verificationHash: _old, ...unsigned } = credential; void _old;
    unsigned.professionalEvidence = { ...credential.professionalEvidence!, sharing };
    const updated = { ...unsigned, verificationHash: signLearningCredential(unsigned) };
    return { result: null, writes: [write(publicPath, json(updated), { updateTime: docs.get(publicPath)!.updateTime }), write(ownerPath, json(updated), { updateTime: docs.get(ownerPath)!.updateTime }), write(path, json({ ...record, sharing, revision: record.revision + 1 }), { updateTime: doc!.updateTime }), write(`${path}/history/sharing-${randomUUID()}`, { sharing, at: new Date().toISOString() }, { exists: false })] };
  });
}
export function academyCatalogSize() { return academyCourses.length; }
