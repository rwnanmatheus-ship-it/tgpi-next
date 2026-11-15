import { auth } from '@clerk/nextjs/server';
import { getAllCountries } from '@/lib/countries';
import { loadPlanExecution, savePlanExecution } from '@/lib/plan-execution.server';
import { parsePlanExecutionMutation } from '@/lib/plan-execution';

const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', Vary: 'Cookie' };
const json = (body: unknown, status = 200) => Response.json(body, { status, headers });

export async function GET() {
  const { userId, sessionId } = await auth();
  if (!userId || !sessionId) return json({ error: 'authentication' }, 401);
  const state = await loadPlanExecution(userId);
  return state ? json({ state }) : json({ error: 'storage' }, 503);
}

export async function PATCH(request: Request) {
  const { userId, sessionId } = await auth();
  if (!userId || !sessionId) return json({ error: 'authentication' }, 401);
  if (request.headers.get('origin') !== new URL(request.url).origin) return json({ error: 'origin' }, 403);

  if (request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') {
    return json({ error: 'input' }, 415);
  }
  const reader = request.body?.getReader();
  if (!reader) return json({ error: 'input' }, 400);
  const bytes = new Uint8Array(4096);
  let length = 0;
  let raw: unknown;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (length + value.length > bytes.length) {
        await reader.cancel();
        return json({ error: 'input' }, 413);
      }
      bytes.set(value, length);
      length += value.length;
    }
    raw = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes.subarray(0, length)));
  } catch { return json({ error: 'input' }, 400); }
  const mutation = parsePlanExecutionMutation(raw);
  if (!mutation) return json({ error: 'input' }, 400);
  const destination = mutation.type === 'reserve' ? mutation.reserve?.country : mutation.type === 'milestone' ? mutation.milestone.country : undefined;
  if (destination && !getAllCountries().some(country => country.slug === destination)) return json({ error: 'input' }, 400);

  try {
    const outcome = await savePlanExecution(userId, mutation);
    if (outcome.result === 'conflict') return json({ error: 'conflict', state: outcome.state }, 409);
    if (outcome.result === 'limit') return json({ error: 'limit' }, 422);
    return json({ state: outcome.state });
  } catch {
    return json({ error: 'storage' }, 503);
  }
}
