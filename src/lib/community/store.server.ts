import {
  authorAvailable,
  privacyBlocked,
  privacyKey,
  privacyPath,
  type PrivacyFlag,
} from "./privacy.server";
import { getCourse } from "@/data/courses";
import "server-only";
import {
  searchTokens,
  searchQuery,
  moderatorSettings,
  attachments,
  journeyStages,
  type Playbook,
  type ParticipationAppeal,
  type CommunityAsset,
} from "./features";
import { resolveMember } from "@/lib/members/identity.server";
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
  postVisible,
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
  image?: string;
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
    if (value.length > 16000 || !/^[a-zA-Z0-9_-]+$/.test(value))
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
async function children<T>(
  parent: string,
  collection: string,
  after = "",
  filter?: { field: string; term: string },
) {
  const chronological =
      collection === "posts" ||
      collection === "comments" ||
      collection === "updates",
    scope = `${parent}/${collection}${filter ? `:${filter.field}:${filter.term}` : ""}`,
    cursor = after ? openCursor(scope, after) : null;
  if (
    cursor &&
    chronological &&
    (typeof cursor.date !== "string" ||
      !Number.isFinite(Date.parse(cursor.date)))
  )
    throw new CommunityError("Invalid cursor.");
  const reference = `projects/${process.env.TGPI_FIREBASE_PROJECT_ID || "tgpi-next"}/databases/(default)/documents/${parent}/${collection}/${cursor?.id || ""}`;
  const rows = await query<T>(
    {
      from: [{ collectionId: collection }],
      ...(filter
        ? {
            where: {
              fieldFilter: {
                field: { fieldPath: filter.field },
                op: "ARRAY_CONTAINS",
                value: { stringValue: filter.term },
              },
            },
          }
        : {}),
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
  about: c.visibility === "public" ? c.about : "",
});
async function allowedPost(
  p: Post,
  m: Membership | null | undefined,
  uid: string,
) {
  if (!postVisible(p, m, uid) || !(await authorAvailable(p.author)))
    return false;
  if (!uid || p.author === uid) return true;
  const paths = [
    `${root}/people/${uid}/blocks/${p.author}`,
    `${root}/people/${p.author}/blocks/${uid}`,
  ];
  const records = await Promise.all(
    paths.map((path) => get<{ blocked: boolean }>(path)),
  );
  return !records.some((x) => x?.data.blocked);
}
async function enrichPost(p: Post, uid: string) {
  const [bookmark, reaction] = uid
    ? await Promise.all([
        get<{ saved: boolean }>(
          `${root}/saved/${uid}/items/${p.community}--${p.id}`,
        ),
        get<{ helpful: boolean }>(`${pp(p.community, p.id)}/reactions/${uid}`),
      ])
    : [null, null];
  return {
    ...p,
    saved: Boolean(bookmark?.data.saved),
    reacted: Boolean(reaction?.data.helpful),
  };
}
export async function playbooks(id: string, uid: string, after = "") {
  const a = await access(id, uid);
  if (!canRead(a.community, a.membership))
    throw new CommunityError("Membership required.", 403);
  const page = await children<Playbook>(cp(id), "playbooks", after);
  return {
    ...page,
    items: await Promise.all(
      page.items.map(async (book) => {
        const posts = await Promise.all(
          book.posts.slice(0, 20).map(async (pid) => {
            const p = await get<Post>(pp(id, pid));
            return p && (await allowedPost(p.data, a.membership, uid))
              ? {
                  id: p.data.id,
                  title: p.data.title,
                  authorName: p.data.authorName,
                  source: p.data.source,
                  updatedAt: p.data.updatedAt,
                }
              : null;
          }),
        );
        return { ...book, sources: posts.filter((x) => x !== null) };
      }),
    ),
  };
}
export async function pendingPosts(
  id: string,
  uid: string,
  after = "",
  globalAdmin = false,
) {
  const a = globalAdmin
    ? { community: (await get<Community>(cp(id)))?.data, membership: null }
    : await access(id, uid);
  if (!a.community) throw new CommunityError("Community unavailable.", 404);
  if (!manages(a.membership) && !globalAdmin)
    throw new CommunityError("Management permission required.", 403);
  const rows = await children<Post>(cp(id), "posts", after);
  return {
    ...rows,
    items: rows.items.filter((p) => !p.removed && p.state === "pending"),
  };
}
export async function globalReports(uid: string, admin: boolean, after = "") {
  ready();
  if (!admin)
    throw new CommunityError("Administrator permission required.", 403);
  return children<Report & { community: string }>(root, "reports", after);
}
export async function personalFeed(uid: string, cursor = "") {
  if (!uid) throw new CommunityError("Sign in to see your feed.", 401);
  const scope = `${root}/people/${uid}/feed`,
    prefs = await preferences(uid),
    groups = (await mine(uid)).items
      .filter((c) => active(c.membership) && !prefs.muted.includes(c.id))
      .slice(0, 8);
  let positions: Record<string, string> = {};
  if (cursor) {
    try {
      positions = JSON.parse(openCursor(scope, cursor).date);
    } catch {
      throw new CommunityError("Invalid cursor.");
    }
  }
  const pages = await Promise.all(
    groups.map(async (c) => ({
      community: c,
      ...(await children<Post>(
        cp(c.id),
        "posts",
        typeof positions[c.id] === "string" ? positions[c.id] : "",
      )),
    })),
  );
  const candidates = (
    await Promise.all(
      pages.flatMap((page) =>
        page.items.map(async (p) =>
          (await allowedPost(p, page.community.membership, uid))
            ? {
                ...(await enrichPost(p, uid)),
                communityName: page.community.name,
                membership: page.community.membership,
              }
            : null,
        ),
      ),
    )
  )
    .filter((p) => p !== null)
    .sort(
      (a, b) =>
        b.createdAt.localeCompare(a.createdAt) ||
        b.community.localeCompare(a.community) ||
        b.id.localeCompare(a.id),
    );
  const items = candidates.slice(0, 25);
  for (const page of pages) {
    if (
      !candidates.some((p) => p.community === page.community.id) &&
      page.items.length
    ) {
      const last = page.items.at(-1)!;
      positions[page.community.id] = sealCursor(
        `${cp(page.community.id)}/posts`,
        last.id,
        last.createdAt,
      );
    }
  }
  for (const p of items)
    positions[p.community] = sealCursor(
      `${cp(p.community)}/posts`,
      p.id,
      p.createdAt,
    );
  return {
    items,
    communitiesConsidered: groups.length,
    next:
      candidates.length > 25 || pages.some((p) => p.next)
        ? sealCursor(scope, "feed", JSON.stringify(positions))
        : null,
  };
}
export async function blocks(uid: string, after = "") {
  ready();
  if (!uid) throw new CommunityError("Sign in.", 401);
  const page = await children<{ uid: string; blocked: boolean }>(
    `${root}/people/${uid}`,
    "blocks",
    after,
  );
  return { ...page, items: page.items.filter((x) => x.blocked) };
}
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
export async function discover(uid: string, after = "", search = "") {
  ready();
  const q = searchQuery(search);
  const result = await children<Community>(
    root,
    "communities",
    after,
    q.length >= 2 ? { field: "searchIndex", term: q } : undefined,
  );
  const prefs = uid ? await preferences(uid) : parseCommunityPreferences(null);
  const items = await Promise.all(
    result.items.map(async (c) => {
      const m = uid ? (await get<Membership>(mp(c.id, uid)))?.data : null;
      if (
        c.visibility === "hidden" ||
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
  const checked = await Promise.all(
    rows.items.map(async (p) =>
      (await allowedPost(p, a.membership, uid)) ? enrichPost(p, uid) : null,
    ),
  );
  const posts = checked.filter((p) => p !== null);
  return { ...a, posts, next: rows.next };
}
export async function publication(id: string, pid: string, uid: string) {
  const a = await access(id, uid);
  if (!canRead(a.community, a.membership))
    throw new CommunityError("Membership required.", 403);
  const post = await get<Post>(pp(id, pid));
  if (!post || !(await allowedPost(post.data, a.membership, uid)))
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
    posts: [{ ...(await enrichPost(post.data, uid)), saved }],
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
  if (!p || !(await allowedPost(p.data, a.membership, uid)))
    throw new CommunityError("Publication unavailable.", 404);
  const rows = await children<Comment>(pp(id, pid), "comments", after);
  const checked = await Promise.all(
    rows.items.map(async (x) =>
      !x.removed &&
      (await allowedPost({ ...p.data, author: x.author }, a.membership, uid))
        ? x
        : null,
    ),
  );
  return { ...rows, items: checked.filter((x) => x !== null) };
}
export async function management(
  id: string,
  uid: string,
  section = "members",
  after = "",
  globalAdmin = false,
) {
  const a = globalAdmin
    ? {
        community: (await get<Community>(cp(id)))?.data,
        membership: (await get<Membership>(mp(id, uid)))?.data,
      }
    : await access(id, uid);
  if (!a.community) throw new CommunityError("Community unavailable.", 404);
  if (!manages(a.membership) && !globalAdmin)
    throw new CommunityError("Management permission required.", 403);
  if (section === "context") return { community: a.community };
  if (!["members", "reports", "invites", "audit", "appeals"].includes(section))
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
          return p && (await allowedPost(p.data, a.membership, uid))
            ? p.data
            : null;
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
    id = ["draft", "preferences", "unblock"].includes(action)
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
      >([path, memberPath, `${root}/limits/${uid}`, privacyPath(uid)]);
      if (
        privacyBlocked(
          docs.get(privacyPath(uid))?.data as unknown as PrivacyFlag,
        )
      )
        throw new CommunityError("Community data removal is in progress.", 423);
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
      const notificationsPlanned = new Set<string>();
      const notify = async (target: string, key: string) => {
        if (notificationsPlanned.has(target)) return;
        const blockPath = `${root}/people/${target}/blocks/${uid}`;
        if (
          (await getDocuments<{ blocked: boolean }>([blockPath])).get(blockPath)
            ?.data.blocked
        )
          return;
        const preferencePath = `${root}/people/${target}/preferences/current`;
        const prefs = (
          await getDocuments<Record<string, JsonValue>>([preferencePath])
        ).get(preferencePath)?.data;
        const settings = parseCommunityPreferences(prefs);
        if (settings.muted.includes(id)) return;
        const mode = settings.communityNotifications?.[id] || "all";
        if (
          mode === "none" ||
          (mode === "mentions" && !key.startsWith("mention:"))
        )
          return;
        const windowPath = `${root}/people/${target}/notificationWindows/${id}`;
        const previous = (
          await getDocuments<{ time: number; count: number }>([windowPath])
        ).get(windowPath)?.data;
        const frequency =
          previous && Date.now() - previous.time < 3600000
            ? previous
            : { time: Date.now(), count: 0 };
        if (frequency.count >= 10) return;
        put(windowPath, { time: frequency.time, count: frequency.count + 1 });
        notificationsPlanned.add(target);
        const eventKey = `community:${hash(id)}:${hash(key)}`,
          nid = hash(`${target}:${eventKey}`);
        const event = {
          key: eventKey,
          category: "product",
          title: "Community participation update",
          body: "There is an update to your TGPI community participation. Open Community to review your current access.",
          href: "/community",
          actionLabel: "Open Community",
          important: false,
          occurredAt: now,
          createdAt: now,
        };
        put(`${root}/people/${target}/updates/${nid}`, event);
        if (process.env.TGPI_NOTIFICATIONS_SECURITY_RULES_CONFIRMED === "true")
          put(`tgpiNotificationInbox/${nid}`, {
            ...event,
            id: nid,
            uid: target,
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
        if (!manages(m) && !actor.admin)
          throw new CommunityError("Management permission required.", 403);
      };
      const owner = () => {
        if (!active(m) || m?.role !== "owner")
          throw new CommunityError("Owner permission required.", 403);
      };
      const mention = async (body: string, key: string) => {
        const handles = [
          ...new Set(
            [...body.matchAll(/(?:^|\s)@([a-z][a-z0-9_]{2,29})/g)].map(
              (x) => x[1],
            ),
          ),
        ].slice(0, 5);
        for (const handle of handles) {
          const target = await resolveMember("handles", handle);
          if (!target || target === uid) continue;
          const member = (await getDocuments<Membership>([mp(id, target)])).get(
            mp(id, target),
          )?.data;
          if (active(member)) await notify(target, `mention:${key}:${target}`);
        }
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
      if (action === "unblock") {
        const target = text(input.target, 150, true);
        if (!/^user_[a-zA-Z0-9]+$/.test(target))
          throw new CommunityError("Invalid member.");
        put(`${root}/people/${uid}/blocks/${target}`, {
          uid: target,
          blocked: false,
          updatedAt: now,
        });
        return { result: { id }, writes };
      }
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
          journey: text(input.journey, 100),
          courseId: text(input.courseId, 100),
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
          lp = `${root}/creation/${uid}`,
          trustPath = `${root}/trust/${privacyKey(uid)}`;
        const count = Math.max(
          ...[
            ...(
              await getDocuments<{ count: number }>([lp, trustPath])
            ).values(),
          ].map((x) => x?.data.count || 0),
          0,
        );
        if (count >= 5)
          throw new CommunityError(
            "Community creation limit reached. Contact TGPI support.",
            429,
          );
        const journey = text(input.journey, 100),
          courseId = text(input.courseId, 100);
        if (
          journey &&
          !journeyStages.includes(journey as (typeof journeyStages)[number])
        )
          throw new CommunityError("Choose a valid journey stage.");
        if (courseId && !getCourse(courseId))
          throw new CommunityError("Choose an available TGPI course.");
        const community: Community = {
          journey,
          courseId,
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
          ...moderatorSettings(input),
          searchIndex: searchTokens(
            String(input.name || ""),
            String(input.description || ""),
            String(input.destination || ""),
            String(input.theme || ""),
            String(input.language || ""),
          ),
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
      if (
        !c ||
        (!canDiscover(c, m) &&
          action !== "redeem" &&
          !(action === "appeal" && m) &&
          !actor.admin)
      )
        throw new CommunityError("Community unavailable.", 404);
      if (action === "join" || action === "redeem") {
        if (c.archived || ["banned", "suspended"].includes(m?.state || ""))
          throw new CommunityError("Participation unavailable.", 403);
        if (active(m)) return { result: { id }, writes: [] };
        const restriction = (
          await getDocuments<{ state: string }>([
            `${path}/restrictions/${privacyKey(uid)}`,
          ])
        ).get(`${path}/restrictions/${privacyKey(uid)}`)?.data;
        if (restriction && ["banned", "suspended"].includes(restriction.state))
          throw new CommunityError(
            "Participation restricted. Contact moderation to request review.",
            403,
          );
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
        if (!accepted)
          await notify(c.owner, `request:${uid}:${m?.updatedAt || "initial"}`);
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
        const targetPrivacy = (
          await getDocuments<PrivacyFlag>([privacyPath(target)])
        ).get(privacyPath(target))?.data;
        if (privacyBlocked(targetPrivacy))
          throw new CommunityError("Member unavailable.", 409);
        const tm = (await getDocuments<Membership>([mp(id, target)])).get(
          mp(id, target),
        )?.data;
        if (!tm || (tm.role === "owner" && !actor.admin) || target === uid)
          throw new CommunityError("This member cannot be changed.", 403);
        if (["promote", "demote", "transfer"].includes(action)) {
          if (
            !(
              actor.admin &&
              action === "transfer" &&
              c.archived &&
              c.owner === "deleted"
            )
          )
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
          if ((tm.role === "moderator" || action === "restore") && !actor.admin)
            owner();
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
        if (
          (!old || old.role !== "owner") &&
          !(c.owner === "deleted" && c.archived)
        )
          throw new CommunityError("Ownership changed.", 409);
        if (old)
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
        if (input.id === "community-chat") manage();
        const pid = identifier(input.id),
          postPath = pp(id, pid),
          previous = (await getDocuments<Post>([postPath])).get(postPath);
        if (previous) {
          if (previous.data.author !== uid && pid !== "community-chat")
            throw new CommunityError("Publication ID unavailable.", 409);
          return { result: { id }, writes: [] };
        }
        if (
          c.slowModeSeconds &&
          m?.lastPublishedAt &&
          Date.now() - Date.parse(m.lastPublishedAt) < c.slowModeSeconds * 1000
        )
          throw new CommunityError(
            "Slow mode is active. Wait before your next publication.",
            429,
          );
        const images = attachments(input.attachments);
        if (images.length) {
          const records = await getDocuments<CommunityAsset>(
            images.map((x) => `${path}/assets/${x.id}`),
          );
          if (
            images.some((x) => {
              const a = records.get(`${path}/assets/${x.id}`)?.data;
              return (
                !a ||
                (a as CommunityAsset & { deleting?: boolean }).deleting ||
                a.owner !== uid ||
                a.kind !== "post" ||
                a.post !== pid
              );
            })
          )
            throw new CommunityError(
              "Choose images uploaded for this publication.",
            );
        }
        put(postPath, {
          attachments: images,
          id: pid,
          community: id,
          author: uid,
          authorName: actor.name,
          authorImage: actor.image || "",
          handle: actor.handle,
          kind: input.kind,
          state: c.postApproval && !manages(m) ? "pending" : "published",
          helpfulCount: 0,
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
        put(memberPath, { ...m!, lastPublishedAt: now });
        if (!c.postApproval || manages(m))
          await mention(text(input.body, 16000, true), `post:${pid}`);
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
        if (!canRead(c, m) && !actor.admin)
          throw new CommunityError("Membership required.", 403);
        const pid = identifier(input.post),
          postPath = pp(id, pid),
          p = (await getDocuments<Post>([postPath])).get(postPath)?.data;
        const authorGate = p?.author.startsWith("user_")
          ? (await getDocuments<PrivacyFlag>([privacyPath(p.author)])).get(
              privacyPath(p.author),
            )?.data
          : null;
        if (
          !p ||
          privacyBlocked(authorGate) ||
          (!postVisible(p, m, uid) && !actor.admin)
        )
          throw new CommunityError("Publication unavailable.", 404);
        if (
          ["comment", "accept", "edit-comment"].includes(action) &&
          p.author !== uid &&
          !manages(m)
        ) {
          const paths = [
              `${root}/people/${uid}/blocks/${p.author}`,
              `${root}/people/${p.author}/blocks/${uid}`,
            ],
            records = await getDocuments<{ blocked: boolean }>(paths);
          if (paths.some((path) => records.get(path)?.data.blocked))
            throw new CommunityError("This interaction is unavailable.", 403);
        }
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
          const report = {
            id: rid,
            community: id,
            kind: action,
            post: pid,
            comment: cid,
            reporter: uid,
            reason: text(input.reason, 1000, true),
            status: "pending",
            decision: "",
            createdAt: now,
          };
          put(`${path}/reports/${rid}`, report);
          put(`${root}/reports/${hash(id + rid)}`, {
            ...report,
            id: hash(id + rid),
            localId: rid,
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
          if (
            c.slowModeSeconds &&
            m?.lastPublishedAt &&
            Date.now() - Date.parse(m.lastPublishedAt) <
              c.slowModeSeconds * 1000
          )
            throw new CommunityError(
              "Slow mode is active. Wait before your next message.",
              429,
            );
          const images = attachments(input.attachments);
          if (images.length) {
            const records = await getDocuments<CommunityAsset>(
              images.map((x) => `${path}/assets/${x.id}`),
            );
            if (
              images.some((x) => {
                const asset = records.get(`${path}/assets/${x.id}`)?.data;
                return (
                  !asset ||
                  (asset as CommunityAsset & { deleting?: boolean }).deleting ||
                  asset.owner !== uid ||
                  asset.kind !== "comment" ||
                  asset.post !== pid ||
                  asset.comment !== cid
                );
              })
            )
              throw new CommunityError(
                "Choose images uploaded for this message.",
              );
          }
          const messageBody = text(input.body, 6000, !images.length);
          put(commentPath, {
            attachments: images,
            handle: actor.handle,
            id: cid,
            post: pid,
            author: uid,
            authorName: actor.name,
            authorImage: actor.image || "",
            body: messageBody,
            removed: false,
            createdAt: now,
            updatedAt: now,
          });
          put(memberPath, { ...m!, lastPublishedAt: now });
          if (p.author !== uid) await notify(p.author, `reply:${pid}:${cid}`);
          await mention(messageBody, `comment:${pid}:${cid}`);
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
          if (!actor.admin) participate();
          if (p.author !== uid && !manages(m) && !actor.admin)
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
              state:
                c.postApproval && !manages(m)
                  ? "pending"
                  : p.state || "published",
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
        const centralId =
          (r as Report & { kind?: string }).kind?.startsWith("report-") &&
          ["report-community", "report-member"].includes(
            (r as Report & { kind: string }).kind,
          )
            ? rid
            : hash(id + rid);
        const central = (
          await getDocuments<Report>([`${root}/reports/${centralId}`])
        ).get(`${root}/reports/${centralId}`)?.data;
        if (central)
          put(`${root}/reports/${centralId}`, {
            ...central,
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
          createdBy: uid,
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
      } else if (action === "reaction") {
        participate();
        const pid = identifier(input.post),
          postPath = pp(id, pid),
          rp = `${postPath}/reactions/${uid}`,
          records = await getDocuments<Post & { helpful: boolean }>([
            postPath,
            rp,
          ]),
          p = records.get(postPath)?.data;
        if (!p || !(await allowedPost(p, m, uid)) || p.state === "pending")
          throw new CommunityError("Publication unavailable.", 404);
        const helpful = input.helpful === true,
          previous = records.get(rp)?.data.helpful === true;
        put(rp, { uid, helpful, updatedAt: now });
        put(postPath, {
          ...p,
          helpfulCount: Math.max(
            0,
            (p.helpfulCount || 0) + (helpful ? 1 : 0) - (previous ? 1 : 0),
          ),
        });
      } else if (action === "settings") {
        owner();
        put(path, { ...c, ...moderatorSettings(input), updatedAt: now });
        audit(id);
      } else if (action === "approve-post") {
        manage();
        const pid = identifier(input.post),
          postPath = pp(id, pid),
          p = (await getDocuments<Post>([postPath])).get(postPath)?.data;
        if (!p || p.removed)
          throw new CommunityError("Publication unavailable.", 404);
        put(postPath, { ...p, state: "published", updatedAt: now });
        audit(pid);
      } else if (action === "block") {
        const target = text(input.target, 150, true);
        if (!/^user_[a-zA-Z0-9]+$/.test(target) || target === uid)
          throw new CommunityError("Choose another member.");
        put(`${root}/people/${uid}/blocks/${target}`, {
          uid: target,
          blocked: input.blocked === true,
          updatedAt: now,
        });
      } else if (action === "appeal") {
        if (!m || !["banned", "suspended", "declined"].includes(m.state))
          throw new CommunityError("No decision available for appeal.", 403);
        put(`${path}/appeals/${uid}`, {
          id: uid,
          uid,
          body: text(input.body, 3000, true),
          state: "pending",
          decision: "",
          updatedAt: now,
        });
        audit(uid);
      } else if (action === "appeal-decision") {
        manage();
        const target = text(input.target, 150, true);
        if (!/^user_[a-zA-Z0-9]+$/.test(target))
          throw new CommunityError("Invalid member.");
        const ap = `${path}/appeals/${target}`,
          records = await getDocuments<ParticipationAppeal & Membership>([
            ap,
            mp(id, target),
          ]),
          appeal = records.get(ap)?.data,
          tm = records.get(mp(id, target))?.data;
        if (!appeal || !tm)
          throw new CommunityError("Appeal unavailable.", 404);
        if (tm.role === "owner" && !actor.admin)
          throw new CommunityError("Global review required.", 403);
        const decision = text(input.reason, 1000, true);
        put(ap, { ...appeal, state: "reviewed", decision, updatedAt: now });
        if (input.restore === true) {
          membership(
            target,
            "active",
            tm.role,
            tm.answers,
            decision,
            tm.acceptedVersion,
          );
          put(path, {
            ...c,
            memberCount: c.memberCount + (active(tm) ? 0 : 1),
            updatedAt: now,
          });
        }
        audit(target, decision);
        await notify(target, operation);
      } else if (action === "report-community" || action === "report-member") {
        if (!active(m))
          throw new CommunityError("Active membership required.", 403);
        const target =
          action === "report-member" ? text(input.target, 150, true) : id;
        if (action === "report-member" && !/^user_[a-zA-Z0-9]+$/.test(target))
          throw new CommunityError("Invalid member.");
        const rid = hash(`${uid}:${id}:${action}:${target}`),
          report = {
            id: rid,
            community: id,
            kind: action,
            target,
            reporter: uid,
            reason: text(input.reason, 1000, true),
            status: "pending",
            decision: "",
            createdAt: now,
          };
        put(`${root}/reports/${rid}`, report);
        put(`${path}/reports/${rid}`, report);
      } else if (action === "playbook") {
        manage();
        const bid = identifier(input.id);
        if (
          !Array.isArray(input.posts) ||
          input.posts.length < 1 ||
          input.posts.length > 20
        )
          throw new CommunityError("Choose 1–20 source publications.");
        const ids = [...new Set(input.posts.map(identifier))],
          records = await getDocuments<Post>(ids.map((pid) => pp(id, pid)));
        if (
          ids.some((pid) => {
            const p = records.get(pp(id, pid))?.data;
            return !p || p.removed || p.state === "pending";
          })
        )
          throw new CommunityError("Choose published, available sources.");
        put(`${path}/playbooks/${bid}`, {
          id: bid,
          title: text(input.title, 180, true),
          description: text(input.description, 2000),
          posts: ids,
          editor: uid,
          updatedAt: now,
        });
        audit(bid);
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
        if (!actor.admin) owner();
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

export async function upcomingSessions(uid: string) {
  if (!uid) throw new CommunityError("Sign in to view sessions.", 401);
  const groups = (await mine(uid)).items
    .filter((c) => active(c.membership))
    .slice(0, 8);
  const pages = await Promise.all(
    groups.map(async (c) => ({ community: c, ...(await sessions(c.id, uid)) })),
  );
  return {
    items: pages
      .flatMap((p) =>
        p.items
          .filter((e) => !e.cancelled && Date.parse(e.startsAt) > Date.now())
          .map((e) => ({
            ...e,
            community: p.community.id,
            communityName: p.community.name,
          })),
      )
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
      .slice(0, 25),
    next: null,
  };
}

export async function communityNotificationEvents(uid: string) {
  if (!configured()) return [];
  if (!uid) throw new CommunityError("Sign in.", 401);
  const page = await children<
    import("@/lib/notifications/model").NotificationEvent & {
      createdAt: string;
    }
  >(`${root}/people/${uid}`, "updates");
  return page.items.map((e) => ({
    key: e.key,
    category: e.category,
    title: e.title,
    body: e.body,
    href: e.href,
    actionLabel: e.actionLabel,
    important: e.important,
    occurredAt: e.occurredAt,
  }));
}
