import 'server-only';
import { randomUUID } from 'node:crypto';
import { createFirestoreDeleteWrite, createFirestoreUpdateWrite, getFirestoreDocument, listFirestoreDocumentPage, runFirestoreTransaction, type JsonValue } from '@/lib/firestore-admin-rest.server';
import { AtlasError, boundedHistory, ownedPath, type AtlasConversation, type AtlasInput, type AtlasMessage } from './contracts';

type Usage = { count: number; reservedUsd: number; lastAt: number; requests: string[]; expiresAt: string };
const day = () => new Date().toISOString().slice(0, 10);
const expiry = (days: number) => new Date(Date.now() + days * 86400000).toISOString();
function write<T extends object & { expiresAt?: string }>(path: string, value: T) {
  const result = createFirestoreUpdateWrite(path, JSON.parse(JSON.stringify(value)) as Record<string, JsonValue>);
  if ('update' in result && value.expiresAt) result.update.fields = { ...result.update.fields, expiresAt: { timestampValue: value.expiresAt } };
  return result;
}
const live = (value: AtlasConversation | undefined) => value && Date.parse(value.expiresAt) > Date.now() ? value : undefined;
export async function getConversation(userId: string, id: string) {
  const value = live((await getFirestoreDocument<AtlasConversation>(ownedPath(userId, id)))?.data);
  if (!value) throw new AtlasError('Conversation not found or expired.', 404);
  return value;
}
export async function listConversations(userId: string, cursor?: string) {
  ownedPath(userId, '00000000-0000-4000-8000-000000000000');
  const page = await listFirestoreDocumentPage<AtlasConversation>(`tgpiLearningUsers/${userId}`, 'atlasConversations', cursor);
  return { items: page.items.filter(x => live(x.data)).map(({ data }) => ({ id: data.id, title: data.title, updatedAt: data.updatedAt })), cursor: page.nextPageToken };
}

/** One transaction serializes per-account rate limits, the global budget and conversation ownership. */
export async function beginTurn(userId: string, input: AtlasInput, budget: number) {
  const path = ownedPath(userId, input.conversationId);
  const usagePath = `tgpiLearningUsers/${userId}/atlasUsage/${day()}`;
  const globalPath = `tgpiLearningUsers/_atlasBudget/atlasUsage/${day()}`;
  const token = randomUUID();
  return runFirestoreTransaction<{ replay: AtlasConversation | null; token: string; history: { role: 'user' | 'assistant'; content: string }[] }>(async ({ getDocuments }) => {
    const docs = await getDocuments<AtlasConversation | Usage>([path, usagePath, globalPath]);
    const stored = docs.get(path)?.data as AtlasConversation | undefined;
    if (input.temporary && stored) throw new AtlasError('Start a new temporary conversation.');
    if (stored && !live(stored)) throw new AtlasError('Conversation expired. Start a new one.', 410);
    const current = input.temporary ? undefined : stored;
    const completed = current?.messages.find(x => x.role === 'assistant' && x.requestId === input.requestId && x.status === 'complete');
    if (completed) return { result: { replay: current!, token, history: [] }, writes: [] };
    if (current?.active && current.active.until > Date.now()) throw new AtlasError('A reply is already in progress. Wait briefly and reload the conversation.', 409);
    const usage = docs.get(usagePath)?.data as Usage | undefined;
    const global = docs.get(globalPath)?.data as Usage | undefined;
    if (input.temporary && usage?.requests.includes(input.requestId)) throw new AtlasError('This temporary request was already accepted. Start a new request to avoid duplicate billing.', 409);
    if ((usage?.count || 0) >= 10 || Date.now() - (usage?.lastAt || 0) < 4000) throw new AtlasError('Atlas request limit reached. Up to 10 requests per UTC day are available during validation.', 429);
    if ((global?.reservedUsd || 0) + 0.5 > budget) throw new AtlasError('Atlas daily spending limit reached. Please return tomorrow.', 429);
    const now = new Date().toISOString();
    let messages = current?.messages || [];
    const previous = messages.findIndex(x => x.role === 'user' && x.requestId === input.requestId);
    if (previous >= 0) {
      if (messages[previous].content !== input.text || messages.slice(previous + 1).some(x => x.role === 'user')) throw new AtlasError('This request cannot replace an earlier turn.', 409);
      messages = messages.slice(0, previous); // Explicit retry of the last failed/interrupted turn only.
    }
    if (messages.length >= 40) throw new AtlasError('Conversation limit reached. Start a new conversation.', 409);
    const question: AtlasMessage = { id: input.requestId, requestId: input.requestId, role: 'user', content: input.text, createdAt: now, status: 'complete' };
    const history = boundedHistory(input.temporary ? [...input.history, { role: 'user', content: input.text }] : [...messages.filter(x => x.status === 'complete'), question]);
    const conversation: AtlasConversation = { id: input.conversationId, title: current?.title || input.text.slice(0, 70), messages: [...messages, question], createdAt: current?.createdAt || now, updatedAt: now, expiresAt: current?.expiresAt || expiry(30), active: { token, requestId: input.requestId, until: Date.now() + 120000 } };
    return { result: { replay: null, token, history }, writes: [
      write(usagePath, { count: (usage?.count || 0) + 1, reservedUsd: (usage?.reservedUsd || 0) + 0.5, lastAt: Date.now(), requests: [...(usage?.requests || []), input.requestId], expiresAt: expiry(2) }),
      write(globalPath, { count: (global?.count || 0) + 1, reservedUsd: (global?.reservedUsd || 0) + 0.5, lastAt: Date.now(), requests: [], expiresAt: expiry(2) }),
      ...(!input.temporary ? [write(path, conversation)] : []),
    ] };
  });
}

export async function finishTurn(userId: string, input: AtlasInput, token: string, content: string, status: AtlasMessage['status'], factors: string[]) {
  if (input.temporary) return null;
  const path = ownedPath(userId, input.conversationId);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const current = live((await getDocuments<AtlasConversation>([path])).get(path)?.data);
    // Deletion while streaming must never resurrect content; stale writers cannot replace a newer turn.
    if (!current || current.active?.token !== token) return { result: null, writes: [] };
    const now = new Date().toISOString();
    const message: AtlasMessage = { id: randomUUID(), requestId: input.requestId, role: 'assistant', content: content.slice(0, 16000), createdAt: now, status, factors };
    const result: AtlasConversation = { ...current, active: null, updatedAt: now, messages: [...current.messages, message] };
    return { result, writes: [write(path, result)] };
  });
}

export async function changeConversation(userId: string, id: string, change: { title: string } | { messageId: string; feedback: 'up' | 'down' } | 'delete') {
  const path = ownedPath(userId, id);
  return runFirestoreTransaction(async ({ getDocuments }) => {
    const current = (await getDocuments<AtlasConversation>([path])).get(path)?.data;
    if (!current) throw new AtlasError('Conversation not found.', 404);
    if (change === 'delete') return { result: null, writes: [createFirestoreDeleteWrite(path)] };
    if (!live(current)) throw new AtlasError('Conversation expired.', 410);
    let next = current;
    if ('title' in change) next = { ...current, title: change.title };
    else {
      if (!current.messages.some(x => x.id === change.messageId && x.role === 'assistant')) throw new AtlasError('Reply not found.', 404);
      next = { ...current, messages: current.messages.map(x => x.id === change.messageId ? { ...x, feedback: change.feedback } : x) };
    }
    return { result: next, writes: [write(path, next)] };
  });
}
