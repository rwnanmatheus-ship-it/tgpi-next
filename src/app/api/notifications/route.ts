import { parsePreferences } from "@/lib/notifications/model";
import { accountInbox, updateAccountInbox } from "@/lib/notifications/account-inbox.server";
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
  if (!notificationsConfigured()) {
    try {
      const { state: _state, ...page } = await accountInbox(userId);
      void _state;
      return json(page);
    } catch { return json({ error: "Unable to load account updates. Please retry." }, 503); }
  }
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
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 4096)
      return json({ error: "Request is too large." }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return json({ error: "Invalid notification action." }, 400);
    const input = parsed as Record<string, unknown>;
    if (!notificationsConfigured()) {
      if (!["preferences", "read", "unread", "archive", "read_all"].includes(String(input.action)))
        return json({ error: "Invalid notification action." }, 400);
      const found = await updateAccountInbox(userId, input);
      return found ? json({ ok: true, ...(input.action === "preferences" ? { preferences: parsePreferences(input.preferences) } : {}) }) : json({ error: "Notification not found." }, 404);
    }
    if (input.action === "read_all") {
      const { items } = await listNotifications(userId);
      await Promise.all(items.filter(item => !item.readAt && !item.archivedAt).map(item => mutateNotification(userId, item.id, "read")));
      return json({ ok: true });
    }
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
