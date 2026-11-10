import type { AtlasEvent, AtlasInput } from './contracts';

export async function streamSponsoredAtlas(
  input: AtlasInput, signal: AbortSignal, onEvent: (event: AtlasEvent) => void,
) {
  const response = await fetch('/api/atlas/chat', {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
    signal,
  });
  if (!response.ok || !response.body || !response.headers.get('content-type')?.includes('application/x-ndjson')) {
    return 'failed';
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    for (;;) {
      const part = await reader.read();
      buffer += decoder.decode(part.value, { stream: !part.done });
      const lines = buffer.split('\n');
      buffer = part.done ? '' : lines.pop() ?? '';
      for (const line of lines) {
        if (!line.trim()) continue;
        const event: AtlasEvent = JSON.parse(line);
        onEvent(event);
        if (event.type === 'done') return event.status;
      }
      if (part.done) return 'interrupted';
    }
  } finally {
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
