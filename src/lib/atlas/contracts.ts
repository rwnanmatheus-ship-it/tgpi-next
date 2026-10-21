import { z } from 'zod';

export const scopeSchema = z.enum(['destinations', 'languages', 'career', 'budget']);
export type AtlasScope = z.infer<typeof scopeSchema>;
export const idSchema = z.string().uuid();
export const chatSchema = z.object({
  conversationId: idSchema,
  requestId: idSchema,
  text: z.string().trim().min(1).max(4000),
  scopes: z.array(scopeSchema).max(4).default([]),
  temporary: z.boolean().default(false),
  history: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().max(8000) }).strict()).max(12).default([]),
}).strict();
export type AtlasInput = z.infer<typeof chatSchema>;
export type AtlasMessage = {
  id: string; role: 'user' | 'assistant'; content: string; createdAt: string;
  requestId: string; status: 'complete' | 'interrupted' | 'failed';
  factors?: string[]; feedback?: 'up' | 'down';
};
export type AtlasConversation = {
  id: string; title: string; messages: AtlasMessage[]; createdAt: string;
  updatedAt: string; expiresAt: string;
  active: { token: string; requestId: string; until: number } | null;
};
export type AtlasSummary = Pick<AtlasConversation, 'id' | 'title' | 'updatedAt'>;
export type AtlasEvent =
  | { type: 'context'; factors: string[] }
  | { type: 'delta'; text: string }
  | { type: 'done'; conversation: AtlasConversation | null; status: AtlasMessage['status'] }
  | { type: 'error'; message: string };

export class AtlasError extends Error {
  status: number;
  constructor(message: string, status = 400) { super(message); this.status = status; }
}

export function ownedPath(userId: string, conversationId: string) {
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(userId) || !idSchema.safeParse(conversationId).success) throw new AtlasError('Invalid conversation.', 400);
  return `tgpiLearningUsers/${userId}/atlasConversations/${conversationId}`;
}

/** Bound the complete provider input by UTF-8 bytes (conservative token upper bound). */
export function boundedHistory(messages: { role: 'user' | 'assistant'; content: string }[], limit = 16000) {
  const chosen: typeof messages = [];
  let size = 0;
  for (const message of [...messages].reverse()) {
    size += new TextEncoder().encode(message.content).length + 64;
    if (size > limit) break;
    chosen.unshift({ role: message.role, content: message.content });
  }
  while (chosen[0]?.role === 'assistant') chosen.shift();
  if (!chosen.length) throw new AtlasError('Message is too long. Please shorten it.', 413);
  return chosen;
}

export function safeAtlasLink(href: string) {
  // This increment has an approved internal catalogue, not live web research.
  if (!href.startsWith('/') || href.startsWith('//') || /[\\\u0000-\u0020]/.test(href)) return '';
  try {
    const url = new URL(href, 'https://theglobalpolymath.com');
    const path = decodeURIComponent(url.pathname);
    if (url.origin !== 'https://theglobalpolymath.com' || path.includes('..') || path.includes('\\')) return '';
    return /^\/(?:countries|compare|country-fit|courses|passport|profile|plan|community|intelligence|privacy|terms)(?:\/|$)/.test(path) ? url.pathname + url.search + url.hash : '';
  } catch { return ''; }
}
