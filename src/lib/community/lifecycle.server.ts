import "server-only";
import { randomUUID } from "node:crypto";
import { clerkClient } from "@clerk/nextjs/server";
import {
  createFirestoreUpdateWrite as write,
  createFirestoreDeleteWrite as remove,
  getFirestoreDocument as get,
  listFirestoreChildCollections as collections,
  runFirestoreQuery as query,
  runFirestoreTransaction as transaction,
  type FirestoreWrite,
  type JsonValue,
} from "@/lib/firestore-admin-rest.server";
import {
  CommunityError,
  defaultRules,
  identifier,
  type Community,
  type Membership,
} from "./model";
import {
  communityRoot as root,
  privacyKey,
  privacyPath,
  type PrivacyFlag,
} from "./privacy.server";
import { googleStorage } from "./google.server";
type Data = Record<string, JsonValue | undefined>;
type Mode = "membership-index" | "content" | "own-tree" | "retention" | "purge";
type Frame = {
  parent: string;
  collection: string;
  after: string;
  mode: Mode;
  field?: string;
  value?: string;
};
type Job = PrivacyFlag & {
  targetUid: string;
  requestedAt: string;
  updatedAt: string;
  processed: number;
  stack: Frame[];
  lease: string;
  leaseUntil: number;
  nextAttemptAt: number;
  attempts: number;
  owned: string[];
  finishedAt?: string;
  expiresAt?: string;
  lastError?: string;
};
const day = 86400000,
  policy = {
    orphanMediaDays: 1,
    removedThreadsDays: 30,
    closedReportsDays: 90,
    expiredInvitesDays: 30,
    eventsDays: 90,
    inactiveDraftDays: 30,
    receiptDays: 90,
  };
export const communityRetentionPolicy = policy;
function ready() {
  if (process.env.TGPI_LEARNING_SECURITY_RULES_CONFIRMED !== "true")
    throw new CommunityError("Community privacy storage is unavailable.", 503);
}
function uidValue(uid: string) {
  if (!/^user_[a-zA-Z0-9]+$/.test(uid))
    throw new CommunityError("Invalid member.");
  return uid;
}
const frame = (
  parent: string,
  collection: string,
  mode: Mode,
  field?: string,
  value?: string,
): Frame => ({
  parent,
  collection,
  after: "",
  mode,
  ...(field ? { field, value } : {}),
});
async function rows(f: Frame, limit = 1) {
  return query<Data>(
    {
      from: [{ collectionId: f.collection }],
      ...(f.field
        ? {
            where: {
              fieldFilter: {
                field: { fieldPath: f.field },
                op: "EQUAL",
                value: { stringValue: f.value },
              },
            },
          }
        : {}),
      orderBy: [{ field: { fieldPath: "__name__" }, direction: "ASCENDING" }],
      ...(f.after
        ? {
            startAt: {
              before: false,
              values: [
                {
                  referenceValue: `projects/${process.env.TGPI_FIREBASE_PROJECT_ID || "tgpi-next"}/databases/(default)/documents/${f.parent ? f.parent + "/" : ""}${f.collection}/${f.after}`,
                },
              ],
            },
          }
        : {}),
      limit,
    },
    f.parent,
  );
}
async function owned(uid: string) {
  return (
    await rows(frame(root, "communities", "content", "owner", uid), 6)
  ).map((x) => x.data as unknown as Community);
}
function safeJob(job: Job | null) {
  return job
    ? {
        state: job.state,
        processed: job.processed,
        requestedAt: job.requestedAt,
        updatedAt: job.updatedAt,
        finishedAt: job.finishedAt || null,
        retrying: Boolean(job.lastError),
        accountDeleted: job.accountDeleted,
      }
    : null;
}
export async function privacyStatus(uid: string) {
  ready();
  uidValue(uid);
  const record = await get<Job>(privacyPath(uid));
  return {
    job: safeJob(record?.data || null),
    ownedActive:
      record?.data.state && record.data.state !== "complete"
        ? []
        : (await owned(uid))
            .filter((c) => !c.archived)
            .map((c) => ({ id: c.id, name: c.name })),
    policy,
  };
}
export async function requestCommunityErasure(
  uid: string,
  accountDeleted = false,
) {
  ready();
  uidValue(uid);
  const path = privacyPath(uid),
    now = new Date().toISOString();
  return transaction(async ({ getDocuments }) => {
    // Reading the privacy gate before discovery serializes ownership changes: all
    // ownership mutations read this gate, and this transaction writes it.
    await getDocuments<Job>([path]);
    const communities = await owned(uid);
    const docs = await getDocuments<Job & Community>([
        path,
        ...communities.map((c) => `${root}/communities/${c.id}`),
      ]),
      previous = docs.get(path)?.data;
    if (previous && previous.state !== "complete")
      return {
        result: safeJob(previous),
        writes:
          accountDeleted && !previous.accountDeleted
            ? [
                write(path, {
                  ...previous,
                  accountDeleted: true,
                  updatedAt: now,
                }),
              ]
            : [],
      };
    if (previous?.accountDeleted && previous.state === "complete")
      return { result: safeJob(previous), writes: [] };
    const current = communities
      .map((c) => docs.get(`${root}/communities/${c.id}`)?.data)
      .filter((c) => c && c.owner === uid);
    if (!accountDeleted && current.some((c) => !c!.archived))
      throw new CommunityError(
        "Transfer ownership or archive every community you own before removing your community data.",
        409,
      );
    const ownedIds = current.map((c) => c!.id);
    const stack: Frame[] = [
      frame(`${root}/people/${uid}`, "memberships", "membership-index"),
    ];
    // LIFO: direct personal roots are processed after community content and membership links.
    for (const parent of [`${root}/people/${uid}`, `${root}/saved/${uid}`])
      for (const collection of await collections(parent))
        stack.unshift(frame(parent, collection, "own-tree"));
    stack.unshift(
      frame(root, "events", "content", "actor", uid),
      frame(root, "reports", "content", "reporter", uid),
      frame(root, "reports", "content", "target", uid),
      frame("", "tgpiNotificationInbox", "content", "uid", uid),
    );
    for (const id of ownedIds)
      stack.push(...communityFrames(`${root}/communities/${id}`, uid));
    const job: Job = {
      state: "queued",
      accountDeleted,
      targetUid: uid,
      requestedAt: now,
      updatedAt: now,
      processed: 0,
      stack,
      lease: "",
      leaseUntil: 0,
      nextAttemptAt: 0,
      attempts: 0,
      owned: ownedIds,
    };
    const writes: FirestoreWrite[] = [write(path, job as unknown as Data)];
    if (accountDeleted)
      for (const c of current)
        if (c && !c.archived)
          writes.push(
            write(`${root}/communities/${c.id}`, {
              ...c,
              archived: true,
              transferTo: "",
              updatedAt: now,
            }),
          );
    return { result: safeJob(job), writes };
  });
}
function communityFrames(path: string, uid: string): Frame[] {
  return [
    frame(path, "sessions", "content"),
    frame(path, "audit", "content", "target", uid),
    frame(path, "audit", "content", "actor", uid),
    frame(path, "reports", "content", "target", uid),
    frame(path, "reports", "content", "reporter", uid),
    frame(path, "appeals", "content", "uid", uid),
    frame(path, "playbooks", "content", "editor", uid),
    frame(path, "assets", "content", "owner", uid),
    frame(path, "posts", "content"),
  ];
}
async function deleteExternal(asset: Data) {
  if (
    !asset.ciphertext &&
    process.env.TGPI_COMMUNITY_STORAGE_BUCKET &&
    typeof asset.objectName === "string" &&
    /^tgpi-community\/v1\/[a-f0-9-]+\.bin$/.test(asset.objectName)
  ) {
    try {
      await googleStorage(
        `/storage/v1/b/${encodeURIComponent(process.env.TGPI_COMMUNITY_STORAGE_BUCKET)}/o/${encodeURIComponent(asset.objectName)}`,
        { method: "DELETE" },
      );
    } catch (e) {
      if (e instanceof CommunityError && e.status === 404) return;
      throw e;
    }
  }
}
const older = (value: unknown, days: number) =>
  typeof value === "string" &&
  Number.isFinite(Date.parse(value)) &&
  Date.parse(value) < Date.now() - days * day;
async function claim(path: string) {
  const lease = randomUUID();
  const job = await transaction(async ({ getDocuments }) => {
    const j = (await getDocuments<Job>([path])).get(path)?.data;
    if (
      !j ||
      j.state === "complete" ||
      j.leaseUntil > Date.now() ||
      j.nextAttemptAt > Date.now()
    )
      return { result: null, writes: [] };
    const next = {
      ...j,
      state: "processing" as const,
      lease,
      leaseUntil: Date.now() + 330000,
      attempts: j.attempts + 1,
    };
    return { result: next, writes: [write(path, next as unknown as Data)] };
  });
  return { job, lease };
}
async function membershipWrites(
  uid: string,
  id: string,
  getDocuments: <T>(
    paths: string[],
  ) => Promise<Map<string, { data: T } | null>>,
) {
  const cp = `${root}/communities/${id}`,
    mp = `${cp}/members/${uid}`,
    docs = await getDocuments<Community & Membership>([cp, mp]),
    c = docs.get(cp)?.data,
    m = docs.get(mp)?.data,
    writes: FirestoreWrite[] = [];
  if (c) {
    let next: Community = { ...c };
    if (m?.state === "active")
      next = { ...next, memberCount: Math.max(0, c.memberCount - 1) };
    if (c.owner === uid)
      next = {
        ...next,
        owner: "deleted",
        archived: true,
        visibility: "hidden",
        admission: "invite",
        name: "Archived community",
        description: "Archived after removal of its owner’s community data.",
        about: "",
        destination: "",
        language: "",
        theme: "",
        journey: "",
        courseId: "",
        searchIndex: [],
        entryQuestion: "",
        welcome: "",
        rules: defaultRules,
      };
    if (c.transferTo === uid) next.transferTo = "";
    if (JSON.stringify(next) !== JSON.stringify(c))
      writes.push(write(cp, { ...next, updatedAt: new Date().toISOString() }));
  }
  if (m) {
    if (["banned", "suspended"].includes(m.state))
      writes.push(
        write(`${cp}/restrictions/${privacyKey(uid)}`, {
          state: m.state,
          createdAt: new Date().toISOString(),
        }),
      );
    writes.push(remove(mp));
  }
  return writes;
}
export async function runErasureJob(key: string, budget = 30) {
  ready();
  if (!/^[a-f0-9]{64}$/.test(key))
    throw new CommunityError("Invalid privacy job.");
  const path = `${root}/erasureJobs/${key}`,
    claimed = await claim(path);
  if (!claimed.job) return { processed: 0, claimed: false };
  let job: Job = claimed.job;
  let processed = 0;
  try {
    while (processed < Math.min(budget, 250) && job.stack.length) {
      const stack = structuredClone(job.stack),
        f = stack.at(-1)!,
        record = (await rows(f))[0];
      if (!record) {
        stack.pop();
        await checkpoint(stack, []);
        continue;
      }
      const docPath = record.name.split("/documents/")[1],
        id = docPath.split("/").at(-1)!;
      f.after = id;
      if (f.mode === "own-tree" || f.mode === "purge")
        for (const collection of await collections(docPath))
          stack.push(frame(docPath, collection, f.mode));
      if (f.mode === "membership-index") {
        const community = identifier(record.data.community);
        if (!job.owned.includes(community))
          stack.push(
            ...communityFrames(
              `${root}/communities/${community}`,
              job.targetUid,
            ),
          );
      }
      if (f.collection === "posts" && f.mode === "content") {
        stack.push(
          frame(docPath, "comments", "content", "author", job.targetUid),
        );
      }
      if (f.collection === "assets") await deleteExternal(record.data);
      await transaction(async ({ getDocuments }) => {
        const current = (await getDocuments<Job & Data>([path, docPath])).get(
          path,
        )?.data;
        if (current?.lease !== claimed.lease)
          throw new CommunityError("Privacy processing lease changed.", 409);
        const latest = (await getDocuments<Data>([docPath])).get(docPath)?.data,
          writes: FirestoreWrite[] = [];
        if (latest)
          await scrub(docPath, id, latest, f, stack, writes, getDocuments);
        const next = {
          ...current,
          stack,
          processed: current.processed + 1,
          updatedAt: new Date().toISOString(),
        };
        writes.push(write(path, next as unknown as Data));
        job = next as Job;
        return { result: null, writes };
      });
      processed++;
    }
    if (!job.stack.length) {
      await transaction(async ({ getDocuments }) => {
        const docs = await getDocuments<Job & { count: number }>([
            path,
            `${root}/creation/${job.targetUid}`,
            `${root}/trust/${key}`,
          ]),
          current = docs.get(path)?.data;
        if (current?.lease !== claimed.lease)
          throw new CommunityError("Privacy processing lease changed.", 409);
        const count = Math.max(
          docs.get(`${root}/creation/${job.targetUid}`)?.data.count || 0,
          docs.get(`${root}/trust/${key}`)?.data.count || 0,
        );
        return {
          result: null,
          writes: [
            ...(count ? [write(`${root}/trust/${key}`, { count })] : []),
            ...["people", "saved", "creation", "limits", "drafts"].map((c) =>
              remove(`${root}/${c}/${job.targetUid}`),
            ),
            write(path, {
              ...current,
              state: "complete",
              targetUid: "",
              stack: [],
              owned: [],
              lease: "",
              leaseUntil: 0,
              lastError: "",
              finishedAt: new Date().toISOString(),
              expiresAt: new Date(Date.now() + 90 * day).toISOString(),
            }),
          ],
        };
      });
    } else await release("");
    return { processed, claimed: true, complete: !job.stack.length };
    async function checkpoint(stack: Frame[], writes: FirestoreWrite[]) {
      await transaction(async ({ getDocuments }) => {
        const current = (await getDocuments<Job>([path])).get(path)?.data;
        if (current?.lease !== claimed.lease)
          throw new CommunityError("Privacy processing lease changed.", 409);
        job = { ...current, stack, updatedAt: new Date().toISOString() };
        return {
          result: null,
          writes: [...writes, write(path, job as unknown as Data)],
        };
      });
    }
    async function scrub(
      p: string,
      id: string,
      d: Data,
      f: Frame,
      stack: Frame[],
      writes: FirestoreWrite[],
      getDocuments: <T>(
        paths: string[],
      ) => Promise<Map<string, { data: T } | null>>,
    ) {
      const uid = job.targetUid,
        cp = p.split("/").slice(0, 4).join("/"),
        pseudo = `retained-${key.slice(0, 24)}`;
      if (f.mode === "own-tree" || f.mode === "purge") {
        writes.push(remove(p));
        return;
      }
      if (f.mode === "membership-index") {
        writes.push(
          ...(await membershipWrites(
            uid,
            identifier(d.community),
            getDocuments,
          )),
        );
        return;
      }
      if (f.collection === "assets") {
        const c = (await getDocuments<Data>([cp])).get(cp)?.data;
        if (c && (c.avatarId === id || c.coverId === id))
          writes.push(
            write(cp, {
              ...c,
              ...(c.avatarId === id ? { avatarId: "" } : {}),
              ...(c.coverId === id ? { coverId: "" } : {}),
            }),
          );
        writes.push(remove(p));
        return;
      }
      if (f.collection === "posts") {
        if (d.author === uid)
          writes.push(
            write(p, {
              ...d,
              author: "deleted",
              authorName: "Deleted member",
              handle: "",
              title: "Removed publication",
              body: "",
              destination: "",
              context: "",
              source: "",
              attachments: [],
              accepted: "",
              removed: true,
              updatedAt: new Date().toISOString(),
            }),
          );
        const reaction = `${p}/reactions/${uid}`,
          r = (await getDocuments<Data>([reaction])).get(reaction)?.data;
        if (r) {
          writes.push(remove(reaction));
          if (d.author !== uid && r.helpful === true)
            writes.push(
              write(p, {
                ...d,
                helpfulCount: Math.max(0, Number(d.helpfulCount || 0) - 1),
              }),
            );
        }
        return;
      }
      if (f.collection === "comments") {
        const postPath = p.split("/").slice(0, -2).join("/"),
          post = (await getDocuments<Data>([postPath])).get(postPath)?.data;
        if (post?.accepted === id)
          writes.push(
            write(postPath, {
              ...post,
              accepted: "",
              updatedAt: new Date().toISOString(),
            }),
          );
        writes.push(
          write(p, {
            ...d,
            author: "deleted",
            authorName: "Deleted member",
            body: "",
            removed: true,
            updatedAt: new Date().toISOString(),
          }),
        );
        return;
      }
      if (f.collection === "sessions") {
        const ap = `${p}/attendees/${uid}`,
          attendee = (await getDocuments<Data>([ap])).get(ap)?.data;
        if (attendee) writes.push(remove(ap));
        if (attendee || d.createdBy === uid)
          writes.push(
            write(p, {
              ...d,
              ...(attendee?.attending
                ? {
                    attendeeCount: Math.max(
                      0,
                      Number(d.attendeeCount || 0) - 1,
                    ),
                  }
                : {}),
              ...(d.createdBy === uid
                ? {
                    createdBy: "deleted",
                    title: "Cancelled session",
                    description: "",
                    url: "",
                    cancelled: true,
                  }
                : {}),
            }),
          );
        return;
      }
      if (
        f.collection === "playbooks" ||
        f.collection === "appeals" ||
        f.collection === "events"
      ) {
        writes.push(remove(p));
        return;
      }
      if (f.collection === "audit") {
        if (
          d.actor === uid &&
          d.action === "create-event" &&
          typeof d.target === "string"
        ) {
          const ep = `${cp}/sessions/${identifier(d.target)}`,
            event = (await getDocuments<Data>([ep])).get(ep)?.data;
          if (event)
            writes.push(
              write(ep, {
                ...event,
                createdBy: "deleted",
                title: "Cancelled session",
                description: "",
                url: "",
                cancelled: true,
              }),
            );
        }
        writes.push(
          write(p, {
            ...d,
            ...(d.actor === uid ? { actor: pseudo } : {}),
            ...(d.target === uid ? { target: pseudo } : {}),
            reason: "",
          }),
        );
        return;
      }
      if (f.collection === "reports") {
        writes.push(
          write(p, {
            ...d,
            ...(d.reporter === uid
              ? { reporter: pseudo, reason: "Removed by reporter" }
              : {}),
            ...(d.target === uid ? { target: pseudo } : {}),
            decision: "",
          }),
        );
        return;
      }
      if (
        f.collection === "tgpiNotificationInbox" &&
        typeof d.key === "string" &&
        d.key.startsWith("community:")
      ) {
        writes.push(remove(p));
        return;
      }
    }
  } catch (e) {
    await release(
      "A storage or identity service is temporarily unavailable. Processing will retry.",
    );
    throw e;
  }
  async function release(error: string) {
    await transaction(async ({ getDocuments }) => {
      const j = (await getDocuments<Job>([path])).get(path)?.data;
      if (!j || j.lease !== claimed.lease) return { result: null, writes: [] };
      return {
        result: null,
        writes: [
          write(path, {
            ...j,
            state: "queued",
            lease: "",
            leaseUntil: 0,
            lastError: error,
            nextAttemptAt: error
              ? Date.now() +
                Math.min(3600000, 30000 * 2 ** Math.min(j.attempts, 6))
              : 0,
          }),
        ],
      };
    });
  }
}

type Maintenance = {
  stack: Frame[];
  lease: string;
  leaseUntil: number;
  lastRunAt: string;
  lastCompletedAt?: string;
  lastError: string;
  processed: number;
  deleted: number;
  identityErrors: number;
};
const maintenancePath = `${root}/maintenance/current`;
function retentionRoots() {
  return [
    frame(root, "identityChecks", "retention"),
    frame(root, "erasureJobs", "retention"),
    frame(root, "drafts", "retention"),
    frame(root, "events", "retention"),
    frame(root, "reports", "retention"),
    frame(root, "communities", "retention"),
  ];
}
export async function lifecycleOperations() {
  ready();
  const state = (await get<Maintenance>(maintenancePath))?.data;
  const jobs = await query<Job>(
    {
      from: [{ collectionId: "erasureJobs" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "state" },
          op: "IN",
          value: {
            arrayValue: {
              values: [
                { stringValue: "queued" },
                { stringValue: "processing" },
              ],
            },
          },
        },
      },
      limit: 10,
    },
    root,
  );
  return {
    policy,
    schedulerConfigured: Boolean(process.env.CRON_SECRET),
    lastRunAt: state?.lastRunAt || null,
    lastCompletedAt: state?.lastCompletedAt || null,
    processed: state?.processed || 0,
    deleted: state?.deleted || 0,
    retrying: Boolean(state?.lastError),
    identityErrors: state?.identityErrors || 0,
    pendingSample: jobs.map((x) => safeJob(x.data)),
  };
}
export async function runCommunityMaintenance(budget = 60) {
  ready();
  const lease = randomUUID();
  let state = await transaction(async ({ getDocuments }) => {
    const previous = (await getDocuments<Maintenance>([maintenancePath])).get(
      maintenancePath,
    )?.data;
    if (previous && previous.leaseUntil > Date.now())
      return { result: null, writes: [] };
    const next: Maintenance = {
      stack: previous?.stack?.length ? previous.stack : retentionRoots(),
      lease,
      leaseUntil: Date.now() + 330000,
      lastRunAt: new Date().toISOString(),
      lastCompletedAt: previous?.lastCompletedAt || "",
      lastError: "",
      processed: previous?.processed || 0,
      deleted: previous?.deleted || 0,
      identityErrors: previous?.identityErrors || 0,
    };
    return {
      result: next,
      writes: [write(maintenancePath, next as unknown as Data)],
    };
  });
  if (!state) return { busy: true, processed: 0 };
  let processed = 0,
    erasureProcessed = 0;
  try {
    const jobs = await query<Job>(
      {
        from: [{ collectionId: "erasureJobs" }],
        where: {
          fieldFilter: {
            field: { fieldPath: "state" },
            op: "IN",
            value: {
              arrayValue: {
                values: [
                  { stringValue: "queued" },
                  { stringValue: "processing" },
                ],
              },
            },
          },
        },
        limit: 3,
      },
      root,
    );
    for (const row of jobs) {
      const key = row.name.split("/").at(-1)!;
      try {
        const result = await runErasureJob(key, Math.min(60, budget));
        erasureProcessed += result.processed;
      } catch {
        /* Durable retry is recorded on the job itself. */
      }
    }
    while (processed < Math.min(budget, 250) && state.stack.length) {
      const stack = structuredClone(state.stack),
        f = stack.at(-1)!,
        row = (await rows(f))[0];
      if (!row) {
        stack.pop();
        await save(stack, []);
        continue;
      }
      const path = row.name.split("/documents/")[1],
        id = path.split("/").at(-1)!;
      f.after = id;
      const data = row.data;
      // Removed content has a stable tombstone: descendants can be purged safely after 30 days.
      const purge =
        f.mode === "purge" ||
        ((f.collection === "posts" || f.collection === "comments") &&
          data.removed === true &&
          older(data.updatedAt, policy.removedThreadsDays));
      if (purge)
        for (const collection of await collections(path))
          stack.push(frame(path, collection, "purge"));
      else if (f.collection === "communities") {
        for (const collection of [
          "posts",
          "assets",
          "sessions",
          "invites",
          "audit",
          "reports",
          "appeals",
          "members",
        ])
          stack.push(frame(path, collection, "retention"));
      } else if (f.collection === "posts")
        stack.push(frame(path, "comments", "retention"));
      if (
        f.collection === "members" &&
        typeof data.uid === "string" &&
        /^user_[a-zA-Z0-9]+$/.test(data.uid)
      ) {
        const checked = await reconcileDeletedIdentity(data.uid);
        if (!checked) state.identityErrors++;
        stack.push(frame(`${root}/people/${data.uid}`, "updates", "retention"));
      }
      if (
        f.collection === "assets" &&
        !data.ciphertext &&
        (await orphanAsset(path, data))
      ) {
        await transaction(async ({ getDocuments }) => {
          const current = (await getDocuments<Data>([path])).get(path)?.data;
          if (!current) return { result: null, writes: [] };
          if (!(await orphanAssetInTransaction(path, current, getDocuments)))
            return { result: null, writes: [] };
          return {
            result: null,
            writes: [write(path, { ...current, deleting: true })],
          };
        });
        const marked = (await get<Data>(path))?.data;
        if (marked?.deleting) await deleteExternal(marked);
      }
      await transaction(async ({ getDocuments }) => {
        const docs = await getDocuments<Maintenance & Data>([
            maintenancePath,
            path,
          ]),
          current = docs.get(maintenancePath)?.data,
          d = docs.get(path)?.data;
        if (current?.lease !== lease)
          throw new CommunityError("Maintenance lease changed.", 409);
        const writes: FirestoreWrite[] = [];
        if (d) {
          let expired = purge;
          if (f.collection === "assets")
            expired = await orphanAssetInTransaction(path, d, getDocuments);
          if (f.collection === "invites")
            expired = older(d.expiresAt, policy.expiredInvitesDays);
          if (["audit", "events", "updates"].includes(f.collection))
            expired = older(d.createdAt, policy.eventsDays);
          if (f.collection === "drafts")
            expired = older(d.updatedAt, policy.inactiveDraftDays);
          if (f.collection === "reports")
            expired =
              d.status === "reviewed" &&
              older(d.reviewedAt || d.createdAt, policy.closedReportsDays);
          if (f.collection === "appeals")
            expired =
              d.state === "reviewed" &&
              older(d.updatedAt, policy.closedReportsDays);
          if (f.collection === "erasureJobs")
            expired = d.state === "complete" && older(d.expiresAt, 0);
          if (f.collection === "identityChecks")
            expired = older(d.checkedAt, 90);
          if (expired) writes.push(remove(path));
        }
        const next = {
          ...current,
          stack,
          processed: current.processed + 1,
          deleted: current.deleted + writes.length,
          identityErrors: state!.identityErrors,
        };
        writes.push(write(maintenancePath, next as unknown as Data));
        state = next as Maintenance;
        return { result: null, writes };
      });
      processed++;
    }
    await finish("");
    return {
      busy: false,
      processed,
      erasureProcessed,
      deleted: state.deleted,
      cycleComplete: !state.stack.length,
    };
    async function save(stack: Frame[], writes: FirestoreWrite[]) {
      await transaction(async ({ getDocuments }) => {
        const current = (
          await getDocuments<Maintenance>([maintenancePath])
        ).get(maintenancePath)?.data;
        if (current?.lease !== lease)
          throw new CommunityError("Maintenance lease changed.", 409);
        state = { ...current, stack };
        return {
          result: null,
          writes: [...writes, write(maintenancePath, state as unknown as Data)],
        };
      });
    }
  } catch (e) {
    await finish("Maintenance will retry from its last checkpoint.");
    throw e;
  }
  async function finish(error: string) {
    await transaction(async ({ getDocuments }) => {
      const current = (await getDocuments<Maintenance>([maintenancePath])).get(
        maintenancePath,
      )?.data;
      if (current?.lease !== lease) return { result: null, writes: [] };
      return {
        result: null,
        writes: [
          write(maintenancePath, {
            ...current,
            lease: "",
            leaseUntil: 0,
            lastError: error,
            ...(!error && !current.stack.length
              ? { lastCompletedAt: new Date().toISOString() }
              : {}),
          }),
        ],
      };
    });
  }
}
async function orphanAsset(path: string, asset: Data) {
  return orphanAssetInTransaction(
    path,
    asset,
    async <T>(paths: string[]) =>
      new Map(
        await Promise.all(
          paths.map(async (p) => [p, await get<T>(p)] as const),
        ),
      ),
  );
}
async function orphanAssetInTransaction(
  path: string,
  asset: Data,
  getDocuments: <T>(
    paths: string[],
  ) => Promise<Map<string, { data: T } | null>>,
) {
  if (!older(asset.createdAt, policy.orphanMediaDays)) return false;
  const cp = path.split("/").slice(0, 4).join("/"),
    pid =
      typeof asset.post === "string" && asset.post
        ? `${cp}/posts/${identifier(asset.post)}`
        : "",
    docs = await getDocuments<Data>([cp, ...(pid ? [pid] : [])]),
    c = docs.get(cp)?.data,
    p = pid ? docs.get(pid)?.data : null,
    id = path.split("/").at(-1);
  if (asset.kind === "avatar") return c?.avatarId !== id;
  if (asset.kind === "cover") return c?.coverId !== id;
  return (
    !p ||
    p.removed === true ||
    !Array.isArray(p.attachments) ||
    !p.attachments.some(
      (x) => x && typeof x === "object" && !Array.isArray(x) && x.id === id,
    )
  );
}
async function reconcileDeletedIdentity(uid: string) {
  const key = privacyKey(uid),
    path = `${root}/identityChecks/${key}`,
    previous = (await get<Data>(path))?.data;
  if (
    previous &&
    typeof previous.checkedAt === "string" &&
    Date.now() - Date.parse(previous.checkedAt) < day
  )
    return true;
  try {
    const client = await clerkClient();
    await client.users.getUser(uid);
    await transaction(async () => ({
      result: null,
      writes: [write(path, { checkedAt: new Date().toISOString() })],
    }));
    return true;
  } catch (e) {
    if (e && typeof e === "object" && "status" in e && e.status === 404) {
      await requestCommunityErasure(uid, true);
      return true;
    }
    return false;
  }
}
