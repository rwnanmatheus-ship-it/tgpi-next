import "server-only";
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";
import {
  createFirestoreUpdateWrite as write,
  getFirestoreDocument as get,
  runFirestoreQuery as query,
  runFirestoreTransaction as transaction,
  type JsonValue,
} from "@/lib/firestore-admin-rest.server";
import {
  active,
  parseCommunityPreferences,
  canDiscover,
  canRead,
  CommunityError,
  identifier,
  manages,
  sourceUrl,
  text,
  validateAccess,
  type Community,
  type Membership,
  type Post,
  type Comment,
  type GlobalSession,
  type Invite,
  type Report,
} from "./model";
const root = "tgpiLearningUsers/_community";
const cp = (id: string) => `${root}/communities/${identifier(id)}`;
const mp = (id: string, uid: string) => `${cp(id)}/members/${uid}`;
const pp = (id: string, pid: string) => `${cp(id)}/posts/${identifier(pid)}`;
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
const record = (v: object) => v as Record<string, JsonValue>;
export type Actor = {
  uid: string;
  name: string;
  handle: string;
  admin: boolean;
};
export function configured() {
  return Boolean(
    process.env.TGPI_FIREBASE_CLIENT_EMAIL &&
    process.env.TGPI_FIREBASE_PRIVATE_KEY &&
    process.env.TGPI_LEARNING_SECURITY_RULES_CONFIRMED === "true",
  );
}
function ready() {
  if (!configured())
    throw new CommunityError(
      "Community storage is temporarily unavailable.",
      503,
    );
}
function cursorKey() {
  return createHash("sha256")
    .update(`tgpi-community-cursor:${process.env.TGPI_FIREBASE_PRIVATE_KEY}`)
    .digest();
}
function sealCursor(scope: string, id: string, date = "") {
  const iv = randomBytes(12),
    cipher = createCipheriv("aes-256-gcm", cursorKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify({ scope, id, date }), "utf8"),
    cipher.final(),
  ]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString(
    "base64url",
  );
}
function openCursor(scope: string, value: string) {
  try {
    if (value.length > 1000 || !/^[a-zA-Z0-9_-]+$/.test(value))
      throw new Error();
    const bytes = Buffer.from(value, "base64url"),
      decipher = createDecipheriv(
        "aes-256-gcm",
        cursorKey(),
        bytes.subarray(0, 12),
      );
    decipher.setAuthTag(bytes.subarray(12, 28));
    const data = JSON.parse(
      Buffer.concat([
        decipher.update(bytes.subarray(28)),
        decipher.final(),
      ]).toString("utf8"),
    );
    if (
      data.scope !== scope ||
      typeof data.id !== "string" ||
      !/^[a-z0-9-]{3,150}$/.test(data.id)
    )
      throw new Error();
    return data as { id: string; date: string };
  } catch {
    throw new CommunityError("Invalid cursor.");
  }
}
async function children<T>(parent: string, collection: string, after = "") {
  const chronological = collection === "posts" || collection === "comments",
    scope = `${parent}/${collection}`,
    cursor = after ? openCursor(scope, after) : null;
  if (
    cursor &&
    chronological &&
    (typeof cursor.date !== "string" ||
      !Number.isFinite(Date.parse(cursor.date)))
  )
    throw new CommunityError("Invalid cursor.");
  const reference = `projects/${process.env.TGPI_FIREBASE_PROJECT_ID || "tgpi-next"}/databases/(default)/documents/${scope}/${cursor?.id || ""}`;
  const rows = await query<T>(
    {
      from: [{ collectionId: collection }],
      orderBy: [
        ...(chronological
          ? [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }]
          : []),
        {
          field: { fieldPath: "__name__" },
          direction: chronological ? "DESCENDING" : "ASCENDING",
        },
      ],
      ...(cursor
        ? {
            startAt: {
              values: [
                ...(chronological ? [{ stringValue: cursor.date }] : []),
                { referenceValue: reference },
              ],
              before: false,
            },
          }
        : {}),
      limit: 25,
    },
    parent,
  );
  const last = rows.at(-1),
    id = last?.name.split("/").at(-1);
  return {
    items: rows.map((x) => x.data),
    next:
      rows.length === 25 && id
        ? sealCursor(
            scope,
            id,
            chronological
              ? (last!.data as { createdAt: string }).createdAt
              : "",
          )
        : null,
  };
}
export async function access(id: string, uid: string) {
  ready();
  const [c, m] = await Promise.all([
    get<Community>(cp(id)),
    uid ? get<Membership>(mp(id, uid)) : null,
  ]);
  if (!c || !canDiscover(c.data, m?.data))
    throw new CommunityError("Community unavailable.", 404);
  return { community: c.data, membership: m?.data ?? null };
}
const publicCard = (c: Community) => ({
  ...c,
  owner: "",
  transferTo: "",
  welcome: "",
});
export async function preferences(uid: string) {
  ready();
  if (!uid) throw new CommunityError("Sign in to manage interests.", 401);
  return parseCommunityPreferences(
    (
      await get<Record<string, JsonValue>>(
        `${root}/people/${uid}/preferences/current`,
      )
    )?.data,
  );
}
export async function discover(uid: string, after = "") {
  ready();
  const result = await children<Community>(root, "communities", after);
  const prefs = uid ? await preferences(uid) : parseCommunityPreferences(null);
  const items = await Promise.all(
    result.items.map(async (c) => {
      const m = uid ? (await get<Membership>(mp(c.id, uid)))?.data : null;
      if (
        !canDiscover(c, m) ||
        prefs.hidden.includes(c.id) ||
        prefs.muted.includes(c.id)
      )
        return null;
      const matched = prefs.personalized
        ? prefs.interests.filter((i) =>
            `${c.name} ${c.destination} ${c.theme} ${c.language}`
              .toLowerCase()
              .includes(i.toLowerCase()),
          )
        : [];
      return {
        ...publicCard(c),
        membership: m ?? null,
        recommendation: matched.length
          ? `Matches your selected interests: ${matched.slice(0, 3).join(", ")}.`
          : "",
      };
    }),
  );
  return { ...result, items: items.filter((x) => x !== null) };
}
export async function mine(uid: string, after = "") {
  ready();
  if (!uid) throw new CommunityError("Sign in to see your communities.", 401);
  const rows = await children<{ community: string }>(
    `${root}/people/${uid}`,
    "memberships",
    after,
  );
  const items = await Promise.all(
    rows.items.map(async (x) => {
      try {
        const a = await access(x.community, uid);
        return { ...publicCard(a.community), membership: a.membership };
      } catch (e) {
        if (e instanceof CommunityError && e.status === 404) return null;
        throw e;
      }
    }),
  );
  return { ...rows, items: items.filter((x) => x !== null) };
}
async function invitation(id: string, token: string) {
  ready();
  if (!/^[a-f0-9]{64}$/.test(token))
    throw new CommunityError("Invitation unavailable.", 404);
  const i = await get<Invite>(`${cp(id)}/invites/${hash(token)}`);
  if (
    !i ||
    i.data.revoked ||
    Date.parse(i.data.expiresAt) <= Date.now() ||
    i.data.uses >= i.data.maxUses
  )
    throw new CommunityError("Invitation unavailable.", 404);
  return i;
}
export async function detail(id: string, uid: string, after = "", token = "") {
  let a: Awaited<ReturnType<typeof access>>;
  if (token) {
    ready();
    const [c, m] = await Promise.all([
      get<Community>(cp(id)),
      uid ? get<Membership>(mp(id, uid)) : null,
    ]);
    if (!c) throw new CommunityError("Invitation unavailable.", 404);
    if (!active(m?.data)) await invitation(id, token);
    a = { community: c.data, membership: m?.data ?? null };
  } else a = await access(id, uid);
  if (!active(a.membership)) a.community = publicCard(a.community);
  if (!canRead(a.community, a.membership))
    return { ...a, posts: [], next: null };
  const rows = await children<Post>(cp(id), "posts", after);
  const posts = await Promise.all(
    rows.items
      .filter((p) => !p.removed)
      .map(async (p) => ({
        ...p,
        saved: uid
          ? Boolean(
              (
                await get<{ saved: boolean }>(
                  `${root}/saved/${uid}/items/${id}--${p.id}`,
                )
              )?.data.saved,
            )
          : false,
      })),
  );
  return { ...a, posts, next: rows.next };
}
export async function publication(id: string, pid: string, uid: string) {
  const a = await access(id, uid);
  if (!canRead(a.community, a.membership))
    throw new CommunityError("Membership required.", 403);
  const post = await get<Post>(pp(id, pid));
  if (!post || post.data.removed)
    throw new CommunityError("Publication unavailable.", 404);
  const saved = uid
    ? Boolean(
        (
          await get<{ saved: boolean }>(
            `${root}/saved/${uid}/items/${id}--${pid}`,
          )
        )?.data.saved,
      )
    : false;
  return {
    ...a,
    community: active(a.membership) ? a.community : publicCard(a.community),
    posts: [{ ...post.data, saved }],
    next: null,
  };
}
export async function comments(
  id: string,
  pid: string,
  uid: string,
  after = "",
) {
  const a = await access(id, uid);
  if (!canRead(a.community, a.membership))
    throw new CommunityError("Membership required.", 403);
  const p = await get<Post>(pp(id, pid));
  if (!p || p.data.removed)
    throw new CommunityError("Publication unavailable.", 404);
  const rows = await children<Comment>(pp(id, pid), "comments", after);
  return { ...rows, items: rows.items.filter((x) => !x.removed) };
}
export async function management(
  id: string,
  uid: string,
  section = "members",
  after = "",
) {
  const a = await access(id, uid);
  if (!manages(a.membership))
    throw new CommunityError("Management permission required.", 403);
  if (!["members", "reports", "invites", "audit"].includes(section))
    throw new CommunityError("Invalid management section.");
  return children<Membership | Invite | Report>(cp(id), section, after);
}
export async function sessions(id: string, uid: string, after = "") {
  const a = await access(id, uid);
  if (!canRead(a.community, a.membership))
    throw new CommunityError("Membership required.", 403);
  const rows = await children<GlobalSession>(cp(id), "sessions", after);
  return {
    ...rows,
    items: await Promise.all(
      rows.items.map(async (e) => ({
        ...e,
        url: active(a.membership) ? e.url : "",
        attending: uid
          ? Boolean(
              (
                await get<{ attending: boolean }>(
                  `${cp(id)}/sessions/${e.id}/attendees/${uid}`,
                )
              )?.data.attending,
            )
          : false,
      })),
    ),
  };
}
export async function saved(uid: string, after = "") {
  ready();
  if (!uid) throw new CommunityError("Sign in to view saved posts.", 401);
  const rows = await children<{
    community: string;
    post: string;
    saved: boolean;
  }>(`${root}/saved/${uid}`, "items", after);
  const items = await Promise.all(
    rows.items
      .filter((x) => x.saved)
      .map(async (x) => {
        try {
          const a = await access(x.community, uid);
          if (!canRead(a.community, a.membership)) return null;
          const p = await get<Post>(pp(x.community, x.post));
          return p && !p.data.removed ? p.data : null;
        } catch (e) {
          if (e instanceof CommunityError && [403, 404].includes(e.status))
            return null;
          throw e;
        }
      }),
  );
  return { ...rows, items: items.filter((x) => x !== null) };
}
export async function draft(uid: string) {
  ready();
  if (!uid) throw new CommunityError("Sign in to use drafts.", 401);
  return (
    (await get<Record<string, JsonValue>>(`${root}/drafts/${uid}`))?.data ??
    null
  );
}
export async function mutate(actor: Actor, input: Record<string, unknown>) {
  ready();
  const action = text(input.action, 40, true),
    id = ["draft", "preferences"].includes(action)
      ? action
      : identifier(input.community),
    uid = actor.uid,
    path = cp(id),
    memberPath = mp(id, uid),
    now = new Date().toISOString(),
    operation = randomUUID(),
    token = randomBytes(32).toString("hex");
  return transaction<{ id: string; token?: string }>(
    async ({ getDocuments }) => {
      const docs = await getDocuments<
        Community & Membership & { time: number; count: number }
      >([path, memberPath, `${root}/limits/${uid}`]);
      const c = docs.get(path)?.data as Community | undefined,
        m = docs.get(memberPath)?.data as Membership | undefined,
        limit = docs.get(`${root}/limits/${uid}`)?.data;
      const window =
        limit && Date.now() - limit.time < 60000
          ? { time: limit.time, count: limit.count }
          : { time: Date.now(), count: 0 };
      if (window.count >= 30)
        throw new CommunityError(
          "Please wait a minute before trying again.",
          429,
        );
      const writes = [
        write(`${root}/limits/${uid}`, {
          time: window.time,
          count: window.count + 1,
        }),
      ];
      const put = (p: string, v: object) => writes.push(write(p, record(v)));
      const audit = (target: string, reason = "") =>
        put(`${path}/audit/${operation}`, {
          action,
          actor: uid,
          target,
          reason,
          createdAt: now,
        });
      const notify = async (target: string, key: string) => {
        const preferencePath = `${root}/people/${target}/preferences/current`;
        const prefs = (
          await getDocuments<Record<string, JsonValue>>([preferencePath])
        ).get(preferencePath)?.data;
        if (parseCommunityPreferences(prefs).muted.includes(id)) return;
        if (process.env.TGPI_NOTIFICATIONS_SECURITY_RULES_CONFIRMED !== "true")
          return;
        const nid = hash(`${target}:community:${id}:${key}`);
        put(`tgpiNotificationInbox/${nid}`, {
          id: nid,
          uid: target,
          key: `community:${id}:${key}`,
          category: "product",
          title: "Community participation update",
          body: "There is an update to your TGPI community participation. Open Community to review your current access.",
          href: "/community",
          actionLabel: "Open Community",
          important: false,
          createdAt: now,
          readAt: null,
          archivedAt: null,
        });
      };
      const membership = (
        target: string,
        state: Membership["state"],
        role: Membership["role"] = "member",
        answers = "",
        reason = "",
        acceptedVersion = c?.rulesVersion || 1,
      ) => {
        put(mp(id, target), {
          uid: target,
          state,
          role,
          answers,
          reason,
          acceptedVersion,
          updatedAt: now,
        });
        put(`${root}/people/${target}/memberships/${id}`, {
          community: id,
          state,
          updatedAt: now,
        });
      };
      const manage = () => {
        if (!manages(m))
          throw new CommunityError("Management permission required.", 403);
      };
      const owner = () => {
        if (!active(m) || m?.role !== "owner")
          throw new CommunityError("Owner permission required.", 403);
      };
      const participate = () => {
        if (!active(m) || c?.archived)
          throw new CommunityError("Active membership required.", 403);
        if (m?.acceptedVersion !== c?.rulesVersion)
          throw new CommunityError(
            "Accept the current rules before contributing.",
            403,
          );
      };
      if (action === "preferences") {
        put(
          `${root}/people/${uid}/preferences/current`,
          parseCommunityPreferences(input),
        );
        return { result: { id }, writes };
      }
      if (action === "draft") {
        put(`${root}/drafts/${uid}`, {
          name: text(input.name, 90),
          community: text(input.community, 60),
          description: text(input.description, 240),
          about: text(input.about, 4000),
          destination: text(input.destination, 100),
          language: text(input.language, 100),
          theme: text(input.theme, 100),
          rules: text(input.rules, 5000),
          entryQuestion: text(input.entryQuestion, 500),
          welcome: text(input.welcome, 1000),
          visibility: text(input.visibility, 20),
          admission: text(input.admission, 20),
          updatedAt: now,
        });
        return { result: { id }, writes };
      }
      if (action === "create") {
        if (c)
          throw new CommunityError("This identifier is already taken.", 409);
        const settings = validateAccess(input.visibility, input.admission),
          lp = `${root}/creation/${uid}`;
        const count =
          (await getDocuments<{ count: number }>([lp])).get(lp)?.data.count ||
          0;
        if (count >= 5)
          throw new CommunityError(
            "Community creation limit reached. Contact TGPI support.",
            429,
          );
        const community: Community = {
          id,
          name: text(input.name, 90, true),
          description: text(input.description, 240, true),
          about: text(input.about, 4000),
          destination: text(input.destination, 100),
          language: text(input.language, 100, true),
          theme: text(input.theme, 100, true),
          ...settings,
          rules: text(input.rules, 5000, true),
          entryQuestion: text(input.entryQuestion, 500),
          welcome: text(input.welcome, 1000),
          rulesVersion: 1,
          owner: uid,
          memberCount: 1,
          archived: false,
          createdAt: now,
          updatedAt: now,
          transferTo: "",
        };
        put(path, community);
        membership(uid, "active", "owner");
        put(lp, { count: count + 1 });
        audit(uid);
        return { result: { id }, writes };
      }
      if (!c || (!canDiscover(c, m) && action !== "redeem"))
        throw new CommunityError("Community unavailable.", 404);
      if (action === "join" || action === "redeem") {
        if (c.archived || ["banned", "suspended"].includes(m?.state || ""))
          throw new CommunityError("Participation unavailable.", 403);
        if (active(m)) return { result: { id }, writes: [] };
        if (input.acceptedVersion !== c.rulesVersion)
          throw new CommunityError("Read and accept the current rules.");
        let accepted = c.admission === "instant";
        if (action === "redeem") {
          const supplied = text(input.token, 64, true);
          if (!/^[a-f0-9]{64}$/.test(supplied))
            throw new CommunityError("Invitation unavailable.", 404);
          const ip = `${path}/invites/${hash(supplied)}`;
          const inv = (await getDocuments<Invite>([ip])).get(ip)?.data;
          if (
            !inv ||
            inv.revoked ||
            Date.parse(inv.expiresAt) <= Date.now() ||
            inv.uses >= inv.maxUses
          )
            throw new CommunityError("Invitation unavailable.", 404);
          put(ip, { ...inv, uses: inv.uses + 1 });
          accepted = true;
        } else if (c.admission === "invite")
          throw new CommunityError("Invitation required.", 403);
        const answers = text(input.answers, 2000, Boolean(c.entryQuestion));
        membership(uid, accepted ? "active" : "pending", "member", answers);
        if (accepted)
          put(path, { ...c, memberCount: c.memberCount + 1, updatedAt: now });
      } else if (action === "cancel" || action === "leave") {
        if (active(m) && m?.role === "owner")
          throw new CommunityError("Transfer ownership before leaving.");
        if (m?.state === "pending" || active(m)) {
          membership(uid, "left");
          if (active(m))
            put(path, {
              ...c,
              memberCount: Math.max(0, c.memberCount - 1),
              updatedAt: now,
            });
        }
      } else if (
        [
          "approve",
          "decline",
          "ban",
          "suspend",
          "remove",
          "restore",
          "promote",
          "demote",
          "transfer",
        ].includes(action)
      ) {
        manage();
        const target = text(input.target, 150, true);
        if (!/^user_[a-zA-Z0-9]+$/.test(target))
          throw new CommunityError("Invalid member.");
        const tm = (await getDocuments<Membership>([mp(id, target)])).get(
          mp(id, target),
        )?.data;
        if (!tm || tm.role === "owner" || target === uid)
          throw new CommunityError("This member cannot be changed.", 403);
        if (["promote", "demote", "transfer"].includes(action)) {
          owner();
          if (!active(tm)) throw new CommunityError("Choose an active member.");
          if (action === "transfer")
            put(path, { ...c, transferTo: target, updatedAt: now });
          else
            membership(
              target,
              "active",
              action === "promote" ? "moderator" : "member",
              tm.answers,
              "",
              tm.acceptedVersion,
            );
        } else {
          if (tm.role === "moderator" || action === "restore") owner();
          if (["approve", "decline"].includes(action) && tm.state !== "pending")
            throw new CommunityError("Request no longer pending.", 409);
          const state =
              action === "approve" || action === "restore"
                ? "active"
                : action === "decline"
                  ? "declined"
                  : action === "ban"
                    ? "banned"
                    : action === "suspend"
                      ? "suspended"
                      : "left",
            reason = text(
              input.reason,
              1000,
              ["ban", "suspend", "remove", "decline"].includes(action),
            );
          membership(
            target,
            state,
            tm.role,
            tm.answers,
            reason,
            tm.acceptedVersion,
          );
          put(path, {
            ...c,
            memberCount: Math.max(
              0,
              c.memberCount +
                (state === "active" ? 1 : 0) -
                (active(tm) ? 1 : 0),
            ),
            updatedAt: now,
          });
        }
        await notify(target, operation);
        audit(target, text(input.reason, 1000));
      } else if (action === "accept-transfer") {
        if (c.transferTo !== uid || !active(m))
          throw new CommunityError("No ownership offer.", 403);
        const old = (await getDocuments<Membership>([mp(id, c.owner)])).get(
          mp(id, c.owner),
        )?.data;
        if (!old || old.role !== "owner")
          throw new CommunityError("Ownership changed.", 409);
        membership(
          c.owner,
          "active",
          "member",
          old.answers,
          "",
          old.acceptedVersion,
        );
        membership(uid, "active", "owner", m!.answers, "", m!.acceptedVersion);
        put(path, { ...c, owner: uid, transferTo: "", updatedAt: now });
        audit(uid);
      } else if (action === "invite") {
        manage();
        const days = Number(input.days ?? 7),
          maxUses = Number(input.maxUses ?? 1);
        if (
          !Number.isInteger(days) ||
          days < 1 ||
          days > 30 ||
          !Number.isInteger(maxUses) ||
          maxUses < 1 ||
          maxUses > 100
        )
          throw new CommunityError("Use 1–30 days and 1–100 uses.");
        const iid = hash(token);
        put(`${path}/invites/${iid}`, {
          id: iid,
          expiresAt: new Date(Date.now() + days * 86400000).toISOString(),
          uses: 0,
          maxUses,
          revoked: false,
        });
        audit(iid);
        return { result: { id, token }, writes };
      } else if (action === "revoke") {
        manage();
        const iid = text(input.invite, 64, true);
        if (!/^[a-f0-9]{64}$/.test(iid))
          throw new CommunityError("Invalid invitation.");
        const ip = `${path}/invites/${iid}`;
        const inv = (await getDocuments<Invite>([ip])).get(ip)?.data;
        if (!inv) throw new CommunityError("Invitation unavailable.", 404);
        put(ip, { ...inv, revoked: true });
        audit(iid);
      } else if (action === "post") {
        participate();
        if (
          !["discussion", "question", "experience", "guide"].includes(
            String(input.kind),
          )
        )
          throw new CommunityError("Choose a publication format.");
        const pid = identifier(input.id),
          postPath = pp(id, pid),
          previous = (await getDocuments<Post>([postPath])).get(postPath);
        if (previous) {
          if (previous.data.author !== uid)
            throw new CommunityError("Publication ID unavailable.", 409);
          return { result: { id }, writes: [] };
        }
        put(postPath, {
          id: pid,
          community: id,
          author: uid,
          authorName: actor.name,
          handle: actor.handle,
          kind: input.kind,
          title: text(input.title, 180, true),
          body: text(input.body, 16000, true),
          destination: text(input.destination, 100),
          context: text(input.context, 1000),
          source: sourceUrl(input.source),
          accepted: "",
          pinned: false,
          removed: false,
          createdAt: now,
          updatedAt: now,
        });
      } else if (
        [
          "comment",
          "edit",
          "delete",
          "pin",
          "accept",
          "save",
          "report",
          "edit-comment",
          "delete-comment",
          "report-comment",
        ].includes(action)
      ) {
        if (!canRead(c, m))
          throw new CommunityError("Membership required.", 403);
        const pid = identifier(input.post),
          postPath = pp(id, pid),
          p = (await getDocuments<Post>([postPath])).get(postPath)?.data;
        if (!p || p.removed)
          throw new CommunityError("Publication unavailable.", 404);
        if (action === "save")
          put(`${root}/saved/${uid}/items/${id}--${pid}`, {
            community: id,
            post: pid,
            saved: input.saved === true,
            updatedAt: now,
          });
        else if (action === "report" || action === "report-comment") {
          const cid =
            action === "report-comment" ? identifier(input.comment) : "";
          if (cid) {
            const cm = (
              await getDocuments<Comment>([`${postPath}/comments/${cid}`])
            ).get(`${postPath}/comments/${cid}`);
            if (!cm || cm.data.removed)
              throw new CommunityError("Reply unavailable.", 404);
          }
          const rid = hash(`${uid}:${pid}:${cid}`);
          put(`${path}/reports/${rid}`, {
            id: rid,
            post: pid,
            comment: cid,
            reporter: uid,
            reason: text(input.reason, 1000, true),
            status: "pending",
            decision: "",
            createdAt: now,
          });
        } else if (action === "comment") {
          participate();
          const cid = identifier(input.id),
            commentPath = `${postPath}/comments/${cid}`,
            previous = (await getDocuments<Comment>([commentPath])).get(
              commentPath,
            );
          if (previous) {
            if (previous.data.author !== uid)
              throw new CommunityError("Reply ID unavailable.", 409);
            return { result: { id }, writes: [] };
          }
          put(commentPath, {
            id: cid,
            post: pid,
            author: uid,
            authorName: actor.name,
            body: text(input.body, 6000, true),
            removed: false,
            createdAt: now,
            updatedAt: now,
          });
          if (p.author !== uid) await notify(p.author, `reply:${pid}:${cid}`);
        } else if (
          ["edit-comment", "delete-comment", "accept"].includes(action)
        ) {
          participate();
          const cid = identifier(input.comment),
            commentPath = `${postPath}/comments/${cid}`,
            r = (await getDocuments<Comment>([commentPath])).get(
              commentPath,
            )?.data;
          if (!r || r.removed)
            throw new CommunityError("Reply unavailable.", 404);
          if (action === "accept") {
            if (p.author !== uid || p.kind !== "question")
              throw new CommunityError(
                "Only the question author can accept a reply.",
                403,
              );
            put(postPath, { ...p, accepted: cid, updatedAt: now });
          } else {
            if (r.author !== uid && !manages(m))
              throw new CommunityError("Reply permission required.", 403);
            if (action === "edit-comment" && r.author !== uid)
              throw new CommunityError("Only the author can edit.", 403);
            put(commentPath, {
              ...r,
              body:
                action === "delete-comment" ? "" : text(input.body, 6000, true),
              removed: action === "delete-comment",
              updatedAt: now,
            });
            if (action === "delete-comment") {
              if (p.accepted === cid)
                put(postPath, { ...p, accepted: "", updatedAt: now });
              audit(cid);
            }
          }
        } else {
          participate();
          if (p.author !== uid && !manages(m))
            throw new CommunityError("Publication permission required.", 403);
          if (action === "pin") {
            manage();
            put(postPath, { ...p, pinned: !p.pinned, updatedAt: now });
          } else if (action === "delete") {
            put(postPath, {
              ...p,
              title: "Removed publication",
              body: "",
              source: "",
              context: "",
              removed: true,
              updatedAt: now,
            });
            audit(pid);
          } else {
            if (p.author !== uid)
              throw new CommunityError("Only the author can edit.", 403);
            put(postPath, {
              ...p,
              title: text(input.title, 180, true),
              body: text(input.body, 16000, true),
              updatedAt: now,
            });
          }
        }
      } else if (action === "resolve-report") {
        manage();
        const rid = text(input.report, 64, true);
        if (!/^[a-f0-9]{64}$/.test(rid))
          throw new CommunityError("Invalid report.");
        const rp = `${path}/reports/${rid}`,
          r = (await getDocuments<Report>([rp])).get(rp)?.data;
        if (!r) throw new CommunityError("Report unavailable.", 404);
        const reason = text(input.reason, 1000, true);
        put(rp, {
          ...r,
          status: "reviewed",
          decision: reason,
          reviewer: uid,
          reviewedAt: now,
        });
        audit(rid, reason);
      } else if (action === "create-event") {
        manage();
        if (c.archived) throw new CommunityError("Community is archived.", 403);
        const eid = identifier(input.id),
          ep = `${path}/sessions/${eid}`,
          previous = (await getDocuments<GlobalSession>([ep])).get(ep);
        if (previous) return { result: { id }, writes: [] };
        const startsAt = text(input.startsAt, 50, true),
          timeZone = text(input.timeZone, 100, true),
          capacity = Number(input.capacity);
        if (
          !Number.isFinite(Date.parse(startsAt)) ||
          Date.parse(startsAt) <= Date.now() ||
          !Number.isInteger(capacity) ||
          capacity < 1 ||
          capacity > 1000
        )
          throw new CommunityError(
            "Use a future date and capacity from 1 to 1000.",
          );
        try {
          new Intl.DateTimeFormat("en", { timeZone });
        } catch {
          throw new CommunityError("Invalid timezone.");
        }
        put(ep, {
          id: eid,
          title: text(input.title, 180, true),
          description: text(input.description, 4000, true),
          startsAt: new Date(startsAt).toISOString(),
          timeZone,
          url: sourceUrl(input.url),
          capacity,
          attendeeCount: 0,
          cancelled: false,
          createdAt: now,
        });
        audit(eid);
      } else if (["rsvp", "cancel-event"].includes(action)) {
        participate();
        const eid = identifier(input.event),
          ep = `${path}/sessions/${eid}`,
          ap = `${ep}/attendees/${uid}`,
          records = await getDocuments<GlobalSession & { attending: boolean }>([
            ep,
            ap,
          ]),
          event = records.get(ep)?.data;
        if (!event) throw new CommunityError("Session unavailable.", 404);
        if (action === "cancel-event") {
          manage();
          put(ep, { ...event, cancelled: true });
          audit(eid);
        } else {
          const attending = input.attending === true,
            previous = records.get(ap)?.data.attending === true;
          if (
            attending &&
            (event.cancelled || Date.parse(event.startsAt) <= Date.now())
          )
            throw new CommunityError("Registration is closed.");
          if (attending && !previous && event.attendeeCount >= event.capacity)
            throw new CommunityError("This session is full.", 409);
          put(ap, { uid, attending, updatedAt: now });
          put(ep, {
            ...event,
            attendeeCount: Math.max(
              0,
              event.attendeeCount + (attending ? 1 : 0) - (previous ? 1 : 0),
            ),
          });
        }
      } else if (action === "rules") {
        owner();
        const rules = text(input.rules, 5000, true);
        put(path, {
          ...c,
          rules,
          rulesVersion: c.rulesVersion + (rules !== c.rules ? 1 : 0),
          updatedAt: now,
        });
        audit(id);
      } else if (action === "accept-rules") {
        if (!active(m) || input.acceptedVersion !== c.rulesVersion)
          throw new CommunityError("Read the current rules.");
        put(memberPath, {
          ...m,
          acceptedVersion: c.rulesVersion,
          updatedAt: now,
        });
      } else if (action === "archive") {
        owner();
        put(path, { ...c, archived: !c.archived, updatedAt: now });
        audit(id);
      } else throw new CommunityError("Unknown action.");
      put(`${root}/events/${operation}`, {
        action,
        actor: uid,
        community: id,
        createdAt: now,
      });
      return { result: { id }, writes };
    },
  );
}
