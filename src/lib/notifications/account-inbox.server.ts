import "server-only";
import { createHash } from "node:crypto";
import { deflateSync, inflateSync } from "node:zlib";
import { clerkClient } from "@clerk/nextjs/server";
import { collectNotificationEvents } from "./reconcile.server";
import {
  parsePreferences,
  notificationMarks,
  type NotificationAction,
  type NotificationPreferences,
  type InboxNotification,
} from "./model";
const KEY = "tgpiInboxV2";
type State = {
  preferences?: NotificationPreferences;
  seen?: Record<string, string>;
  marks: Record<string, [string | null, string | null] | [string | null, string | null, string | null]>;
};
export function decodeAccountInboxState(value: unknown): State {
  try {
    if (typeof value !== "string" || value.length > 6000) return { marks: {} };
    const state = JSON.parse(
      inflateSync(Buffer.from(value, "base64url"), {
        maxOutputLength: 20000,
      }).toString(),
    ) as State;
    return {
      preferences: parsePreferences(state.preferences),
      marks: state.marks || {},
      seen: state.seen || {},
    };
  } catch {
    return { marks: {} };
  }
}
const idFor = (uid: string, key: string) =>
  createHash("sha256").update(`${uid}:${key}`).digest("hex");
const pendingWrites = new Map<string, Promise<unknown>>();

function withAccountWrite<T>(uid: string, work: () => Promise<T>) {
  const previous = pendingWrites.get(uid) ?? Promise.resolve();
  const request = previous.catch(() => {}).then(work);
  pendingWrites.set(uid, request);
  void request.finally(() => {
    if (pendingWrites.get(uid) === request) pendingWrites.delete(uid);
  }).catch(() => {});
  return request;
}

export function accountInbox(uid: string) {
  return withAccountWrite(uid, () => readAccountInbox(uid));
}

async function readAccountInbox(uid: string, persistSeen = true) {
  const { events, user } = await collectNotificationEvents(uid);
  const state = decodeAccountInboxState(user.privateMetadata[KEY]);
  state.seen ||= {};
  let changed = false;
  const now = new Date().toISOString();
  const items: InboxNotification[] = events.slice(-50).map((event) => {
    const id = idFor(uid, event.key);
    const short = id.slice(0, 24);
    const mark = state.marks[short];
    const eventTime =
      event.occurredAt && Number.isFinite(Date.parse(event.occurredAt))
        ? new Date(event.occurredAt).toISOString()
        : event.key === "account:welcome:v1"
          ? new Date(user.createdAt).toISOString()
          : undefined;
    if (!state.seen![short]) {
      state.seen![short] = eventTime || now;
      changed = true;
    }
    return {
      ...event,
      id,
      uid,
      important: Boolean(event.important),
      createdAt: eventTime || state.seen![short],
      timestampKind: eventTime ? "event" : "observed",
      readAt: mark?.[0] || null,
      archivedAt: mark?.[1] || null,
      savedAt: mark?.[2] || null,
    };
  });
  if (changed && persistSeen) await saveState(uid, state);
  items.sort(
    (a, b) =>
      Date.parse(b.createdAt) - Date.parse(a.createdAt) ||
      a.id.localeCompare(b.id),
  );
  return {
    items,
    preferences: parsePreferences(state.preferences),
    nextCursor: null,
    emailDelivery: "not_connected",
    mode: "account",
    state,
  };
}
export function updateAccountInbox(uid: string, input: Record<string, unknown>) {
  return withAccountWrite(uid, () => applyAccountUpdate(uid, input));
}

async function applyAccountUpdate(uid: string, input: Record<string, unknown>) {
  const inbox = await readAccountInbox(uid, false);
  if (input.action === "preferences")
    inbox.state.preferences = parsePreferences(input.preferences);
  else {
    const now = new Date().toISOString();
    const ids = Array.isArray(input.ids) ? new Set(input.ids) : null;
    const items = input.action === "read_all"
      ? inbox.items.filter((item) => !item.archivedAt && (!ids || ids.has(item.id)))
      : inbox.items.filter((item) => item.id === input.id);
    if (input.action !== "read_all" && !items.length) return false;
    const action = input.action === "read_all" ? "read" : input.action as NotificationAction;
    for (const item of items) {
      const mark = notificationMarks(item, action, now);
      const key = item.id.slice(0, 24);
      delete inbox.state.marks[key];
      inbox.state.marks[key] = [mark.readAt, mark.archivedAt, mark.savedAt];
    }
  }
  await saveState(uid, inbox.state);
  return true;
}
async function saveState(uid: string, state: State) {
  state.marks = Object.fromEntries(Object.entries(state.marks).slice(-50));
  state.seen = Object.fromEntries(Object.entries(state.seen || {}).slice(-50));
  const value = deflateSync(Buffer.from(JSON.stringify(state))).toString(
    "base64url",
  );
  if (value.length > 4000)
    throw new Error("Notification settings capacity reached.");
  const client = await clerkClient();
  await client.users.updateUserMetadata(uid, {
    privateMetadata: { [KEY]: value },
  });
}
