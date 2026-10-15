import "server-only";
import { createHash } from "node:crypto";
import { deflateSync, inflateSync } from "node:zlib";
import { clerkClient } from "@clerk/nextjs/server";
import { collectNotificationEvents } from "./reconcile.server";
import { parsePreferences, type NotificationPreferences, type InboxNotification } from "./model";
const KEY = "tgpiInboxV2";
type State = { preferences?: NotificationPreferences; marks: Record<string, [string | null, string | null]> };
function decode(value: unknown): State {
  try {
    if (typeof value !== "string" || value.length > 6000) return { marks: {} };
    const state = JSON.parse(inflateSync(Buffer.from(value, "base64url"), { maxOutputLength: 20000 }).toString()) as State;
    return { preferences: parsePreferences(state.preferences), marks: state.marks || {} };
  } catch { return { marks: {} }; }
}
const idFor = (uid: string, key: string) => createHash("sha256").update(`${uid}:${key}`).digest("hex");
export async function accountInbox(uid: string) {
  const { events, user } = await collectNotificationEvents(uid);
  const state = decode(user.privateMetadata[KEY]);
  const items: InboxNotification[] = events.slice(-50).map(event => {
    const id = idFor(uid, event.key);
    const mark = state.marks[id.slice(0, 24)];
    return { ...event, id, uid, important: Boolean(event.important), createdAt: new Date(user.createdAt).toISOString(), readAt: mark?.[0] || null, archivedAt: mark?.[1] || null };
  });
  return { items, preferences: parsePreferences(state.preferences), nextCursor: null, emailDelivery: "not_connected", mode: "account", state };
}
export async function updateAccountInbox(uid: string, input: Record<string, unknown>) {
  const inbox = await accountInbox(uid);
  if (input.action === "preferences") inbox.state.preferences = parsePreferences(input.preferences);
  else {
    const item = inbox.items.find(item => item.id === input.id);
    if (!item) return false;
    const now = new Date().toISOString();
    inbox.state.marks[item.id.slice(0, 24)] = input.action === "archive" ? [item.readAt || now, now] : [input.action === "read" ? now : null, item.archivedAt];
  }
  inbox.state.marks = Object.fromEntries(Object.entries(inbox.state.marks).slice(-50));
  const value = deflateSync(Buffer.from(JSON.stringify(inbox.state))).toString("base64url");
  if (value.length > 4000) throw new Error("Notification settings capacity reached.");
  const client = await clerkClient();
  await client.users.updateUserMetadata(uid, { privateMetadata: { [KEY]: value } });
  return true;
}
