import OpenAI from 'openai';
import { buildLearningTutorContext, learningTutorInstructions } from '@/lib/learning/tutor-context.server';
import { clerkClient } from '@clerk/nextjs/server';
import { atlasBody, atlasFailure, atlasUser, requireAtlasGeneration } from '@/lib/atlas/http.server';
import { AtlasError, chatSchema, type AtlasEvent, type AtlasMessage } from '@/lib/atlas/contracts';
import { atlasInstructions, selectAtlasContext } from '@/lib/atlas/context';
import { beginTurn, finishTurn } from '@/lib/atlas/store.server';

export const runtime = 'nodejs';
export const maxDuration = 120;
export async function POST(request: Request) {
  try {
    const userId = await atlasUser(request, true);
    const budget = requireAtlasGeneration(userId);
    const input = await atlasBody(request, chatSchema);
    let selected = selectAtlasContext({}, []);
    if (input.scopes.length) {
      const user = await (await clerkClient()).users.getUser(userId);
      selected = selectAtlasContext(user.unsafeMetadata, input.scopes);
    }
    const learning = input.learningContext ? buildLearningTutorContext(input.learningContext.courseId, input.learningContext.lessonId) : null;
    if (learning) selected.factors.push(`Course material: ${learning.courseTitle} v${learning.curriculumVersion}`);
    const instructions = `${atlasInstructions}\n${learning ? learningTutorInstructions : ''}\nUSER_PROFILE_DATA: ${JSON.stringify(selected.data)}${learning ? `\nTGPI_LEARNING_CONTEXT: ${JSON.stringify(learning)}` : ''}`;
    if (new TextEncoder().encode(instructions).length > 12000) throw new AtlasError('Profile context exceeds the allowed size.', 413);
    const turn = await beginTurn(userId, input, budget);
    const encoder = new TextEncoder();
    const abort = new AbortController();
    const onAbort = () => abort.abort();
    request.signal.addEventListener('abort', onAbort, { once: true });
    if (request.signal.aborted) abort.abort();
    const started = Date.now();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let connected = true;
        const send = (event: AtlasEvent) => { if (connected) { try { controller.enqueue(encoder.encode(JSON.stringify(event) + '\n')); } catch { connected = false; abort.abort(); } } };
        const timeout = setTimeout(() => abort.abort(), 80000);
        let content = ''; let status: AtlasMessage['status'] = 'failed';
        let usage: { input_tokens: number; output_tokens: number } | undefined;
        try {
          if (turn.replay) { send({ type: 'done', conversation: turn.replay, status: 'complete' }); return; }
          send({ type: 'context', factors: selected.factors });
          const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 85000, maxRetries: 0 });
          const response = await client.responses.create({
            model: process.env.TGPI_ATLAS_MODEL || 'gpt-6-astra', instructions, input: turn.history,
            max_output_tokens: 1500, reasoning: { effort: 'low' }, store: false, stream: true,
          }, { signal: abort.signal });
          for await (const event of response) {
            if (event.type === 'response.output_text.delta' || event.type === 'response.refusal.delta') {
              content += event.delta; send({ type: 'delta', text: event.delta });
            }
            if (event.type === 'response.completed') { status = 'complete'; usage = event.response.usage; }
            if (event.type === 'response.incomplete') { status = 'interrupted'; usage = event.response.usage; }
            if (event.type === 'response.failed' || event.type === 'error') throw new Error('provider_failure');
          }
          if (status === 'failed') throw new Error('missing_completion');
        } catch {
          status = abort.signal.aborted ? 'interrupted' : 'failed';
          send({ type: 'error', message: status === 'interrupted' ? 'Reply interrupted. You can retry the last question.' : 'The AI provider could not complete this reply. Please try again later.' });
        } finally {
          clearTimeout(timeout);
          request.signal.removeEventListener('abort', onAbort);
          if (!turn.replay) {
            try {
              const conversation = await finishTurn(userId, input, turn.token, content, status, selected.factors);
              send({ type: 'done', conversation, status });
            } catch { send({ type: 'error', message: 'The reply could not be saved. Reload before retrying.' }); }
            // No prompts, answer text, identity, credentials or raw provider errors in logs.
            console.info('atlas_request', { status, latencyMs: Date.now() - started, inputTokens: usage?.input_tokens, outputTokens: usage?.output_tokens, estimatedUsd: usage ? usage.input_tokens * 0.00001 + usage.output_tokens * 0.00005 : undefined });
          }
          if (connected) { try { controller.close(); } catch { /* disconnected */ } }
        }
      },
      cancel() { abort.abort(); },
    });
    return new Response(stream, { headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'private, no-store', 'X-Accel-Buffering': 'no' } });
  } catch (error) { return atlasFailure(error); }
}
