import { CLIENT_FUNNEL_EVENTS, type ClientFunnelEvent } from "@/lib/funnel";
import { recordFunnelEvent, requestFunnelConsent } from "@/lib/funnel.server";
export async function POST(request: Request) {
  if (process.env.TGPI_FUNNEL_ANALYTICS_ENABLED !== "true" || !requestFunnelConsent(request)) return new Response(null, { status: 204 });
  if (request.headers.get("origin") !== new URL(request.url).origin) return new Response(null, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return new Response(null, { status: 415 });
  const reader = request.body?.getReader();
  if (!reader) return new Response(null, { status: 400 });
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > 128) { await reader.cancel(); return new Response(null, { status: 413 }); } chunks.push(value); }
    const body: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    const event = body && typeof body === "object" && "event" in body ? body.event : null;
    if (typeof event !== "string" || !CLIENT_FUNNEL_EVENTS.includes(event as ClientFunnelEvent)) return new Response(null, { status: 400 });
    recordFunnelEvent(event as ClientFunnelEvent, true);
    return new Response(null, { status: 204 });
  } catch { return new Response(null, { status: 400 }); }
  finally { reader.releaseLock(); }
}
