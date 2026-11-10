import { auth } from "@clerk/nextjs/server";
import {
  getPushDevices,
  pushConfigured,
  registerPushDevice,
  removePushDevice,
  testPushDevice,
} from "@/lib/notifications/push.server";
import { reconcileNotifications } from "@/lib/notifications/reconcile.server";
const reply = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
export const runtime = "nodejs";
export async function GET() {
  const { userId } = await auth();
  if (!userId) return reply({ error: "Authentication required." }, 401);
  if (!pushConfigured())
    return reply({ configured: false, publicKey: null, devices: [] });
  try {
    return reply({
      configured: true,
      publicKey: process.env.TGPI_PUSH_VAPID_PUBLIC_KEY,
      devices: await getPushDevices(userId),
    });
  } catch {
    return reply({ error: "Unable to load notification devices." }, 503);
  }
}
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return reply({ error: "Authentication required." }, 401);
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return reply({ error: "Unverified origin." }, 403);
  if (!pushConfigured())
    return reply({ error: "Device notifications are not configured." }, 503);
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: "Invalid request." }, 400);
  let raw = "",
    size = 0;
  const decoder = new TextDecoder();
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) {
        await reader.cancel();
        return reply({ error: "Request is too large." }, 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    const input = JSON.parse(raw) as Record<string, unknown>;
    if (!input || typeof input !== "object" || Array.isArray(input))
      return reply({ error: "Invalid request." }, 400);
    if (input.action === "subscribe") {
      // Seed existing history before enabling push, so old activity cannot become a notification burst.
      if (input.enable === true) await reconcileNotifications(userId);
      const id = await registerPushDevice(
        userId,
        input,
        request.headers.get("user-agent") || "",
      );
      return reply({ ok: true, id });
    }
    if (input.action === "remove" && typeof input.id === "string")
      return reply({ ok: await removePushDevice(userId, input.id) });
    if (input.action === "test" && typeof input.id === "string")
      return reply(await testPushDevice(userId, input.id));
    return reply({ error: "Invalid action." }, 400);
  } catch (error) {
    return reply(
      {
        error:
          error instanceof Error &&
          !/(Firestore|credential|token|key|cipher)/i.test(error.message)
            ? error.message
            : "Unable to update device notifications.",
      },
      error instanceof SyntaxError ? 400 : 503,
    );
  } finally {
    reader.releaseLock();
  }
}
