import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  getNotificationPreferences,
  listNotifications,
  mutateNotification,
  notificationsConfigured,
  saveNotificationPreferences,
} from "@/lib/notifications/store.server";

const json = (data: unknown, status = 200) =>
  NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) return json({ error: "Sign in to view notifications." }, 401);
  if (!notificationsConfigured())
    return json(
      {
        error:
          "Your notification service is being configured. Please try again later.",
      },
      503,
    );
  try {
    const cursor = new URL(request.url).searchParams.get("cursor") || undefined;
    if (cursor && (!/^[A-Za-z0-9_-]+$/.test(cursor) || cursor.length > 700))
      return json({ error: "Invalid page cursor." }, 400);
    const [page, preferences] = await Promise.all([
      listNotifications(userId, cursor),
      getNotificationPreferences(userId),
    ]);
    return json({ ...page, preferences, emailDelivery: "not_connected" });
  } catch {
    return json({ error: "Unable to load notifications. Please retry." }, 503);
  }
}
export async function PATCH(request: Request) {
  const { userId } = await auth();
  if (!userId) return json({ error: "Sign in to update notifications." }, 401);
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return json({ error: "Unverified request origin." }, 403);
  if (!notificationsConfigured())
    return json({ error: "Notification service is unavailable." }, 503);
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 4096)
      return json({ error: "Request is too large." }, 413);
    const input = JSON.parse(raw) as Record<string, unknown>;
    if (input.action === "preferences")
      return json({
        preferences: await saveNotificationPreferences(
          userId,
          input.preferences,
        ),
      });
    if (
      typeof input.id !== "string" ||
      !/^[a-f0-9]{64}$/.test(input.id) ||
      !["read", "unread", "archive"].includes(String(input.action))
    )
      return json({ error: "Invalid notification action." }, 400);
    const found = await mutateNotification(
      userId,
      input.id,
      input.action as "read" | "unread" | "archive",
    );
    return found
      ? json({ ok: true })
      : json({ error: "Notification not found." }, 404);
  } catch (error) {
    return json(
      {
        error:
          error instanceof SyntaxError
            ? "Invalid JSON."
            : "Unable to save changes. Please retry.",
      },
      error instanceof SyntaxError ? 400 : 503,
    );
  }
}
