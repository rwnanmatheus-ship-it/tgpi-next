import 'server-only';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { isLearningStorageConfigured } from '@/lib/firestore-admin-rest.server';
import { AtlasError } from './contracts';

export const atlasJson = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });
export async function atlasUser(request: Request, mutate = false) {
  const { userId } = await auth();
  if (!userId) throw new AtlasError('Sign in to use Atlas.', 401);
  if (mutate && request.headers.get('origin') !== new URL(request.url).origin) throw new AtlasError('Request origin could not be verified.', 403);
  if (!isLearningStorageConfigured()) throw new AtlasError('Atlas storage is not configured yet.', 503);
  return userId;
}
export function requireAtlasGeneration(userId: string) {
  const allowed = (process.env.TGPI_ATLAS_ALLOWED_USER_IDS || '').split(',').map(x => x.trim()).filter(Boolean);
  if (process.env.TGPI_ATLAS_ENABLED !== 'true' || !allowed.includes(userId)) throw new AtlasError('Atlas is in a private validation phase. Access is not enabled for this account yet.', 503);
  if (!process.env.OPENAI_API_KEY || process.env.TGPI_ATLAS_RETENTION_CONFIRMED !== 'true') throw new AtlasError('Atlas configuration is awaiting validation.', 503);
  const budget = Number(process.env.TGPI_ATLAS_DAILY_BUDGET_USD);
  if (!Number.isFinite(budget) || budget < 0.5 || budget > 1000) throw new AtlasError('Atlas spending limit is not configured.', 503);
  // The reservation below was costed for this exact model. Changes require re-costing.
  if ((process.env.TGPI_ATLAS_MODEL || 'gpt-6-astra') !== 'gpt-6-astra') throw new AtlasError('The configured model needs cost validation.', 503);
  return budget;
}
export async function atlasBody<T>(request: Request, schema: z.ZodType<T>) {
  const reader = request.body?.getReader();
  if (!reader) throw new AtlasError('Missing request body.');
  const chunks: Uint8Array[] = []; let total = 0;
  for (;;) {
    const { value, done } = await reader.read(); if (done) break;
    total += value.length;
    if (total > 64000) { await reader.cancel(); throw new AtlasError('Request is too large.', 413); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { return schema.parse(JSON.parse(new TextDecoder().decode(bytes))); }
  catch { throw new AtlasError('Invalid request.'); }
}
export function atlasFailure(error: unknown) {
  return atlasJson({ error: error instanceof AtlasError ? error.message : 'Atlas is temporarily unavailable. Please retry.' }, error instanceof AtlasError ? error.status : 503);
}
