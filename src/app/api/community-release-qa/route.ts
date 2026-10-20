// TEMPORARY PREVIEW-ONLY HARNESS. Remove this entire route before production.
import { timingSafeEqual, randomUUID } from "node:crypto";
import { clerkClient } from "@clerk/nextjs/server";
import {
  googleAccessToken,
  googleStorage,
} from "@/lib/community/google.server";
import {
  getFirestoreDocument as get,
  runFirestoreTransaction,
  createFirestoreUpdateWrite as write,
} from "@/lib/firestore-admin-rest.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
const root = "tgpiLearningUsers/_community",
  headers = { "Cache-Control": "private, no-store" };
function gate(request: Request) {
  const supplied = Buffer.from(request.headers.get("x-tgpi-qa") || ""),
    key = Buffer.from(process.env.TGPI_COMMUNITY_QA_TOKEN || "");
  return (
    process.env.VERCEL_ENV === "preview" &&
    process.env.VERCEL_GIT_COMMIT_REF === "feat/tgpi-global-community" &&
    process.env.CLERK_SECRET_KEY?.startsWith("sk_test_") &&
    key.length >= 32 &&
    key.length === supplied.length &&
    timingSafeEqual(key, supplied)
  );
}
async function cloud(url: string, method = "GET", body?: unknown) {
  const token = await googleAccessToken(
    "https://www.googleapis.com/auth/cloud-platform",
  );
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    cache: "no-store",
  });
  if (!response.ok)
    throw new Error(`Cloud ${new URL(url).hostname} ${response.status}`);
  return response.status === 204 ? {} : response.json();
}
async function metadata() {
  const project = process.env.TGPI_FIREBASE_PROJECT_ID || "tgpi-next";
  const result: Record<string, unknown> = { project };
  for (const [key, url] of Object.entries({
    database: `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)`,
    buckets: `https://storage.googleapis.com/storage/v1/b?project=${project}`,
    rules: `https://firebaserules.googleapis.com/v1/projects/${project}/releases/cloud.firestore`,
  }))
    try {
      const r = await cloud(url);
      if (key === "rules") {
        const rules = await cloud(
          `https://firebaserules.googleapis.com/v1/${r.rulesetName}`,
        );
        result.rules = rules.source?.files;
      } else
        result[key] =
          key === "database"
            ? {
                edition: r.databaseEdition,
                type: r.type,
                location: r.locationId,
              }
            : r.items?.map((b: { name: string; location: string }) => ({
                name: b.name,
                location: b.location,
              }));
    } catch (e) {
      result[key] = { error: (e as Error).message };
    }
  return result;
}
export async function GET(request: Request) {
  if (!gate(request)) return new Response(null, { status: 404, headers });
  try {
    return Response.json(await metadata(), { headers });
  } catch (e) {
    return Response.json(
      { error: (e as Error).message },
      { status: 503, headers },
    );
  }
}
export async function POST(request: Request) {
  if (!gate(request)) return new Response(null, { status: 404, headers });
  try {
    const input = await request.json(),
      client = await clerkClient();
    if (input.action === "bootstrap") {
      const run = `qa-${randomUUID()}`,
        users: string[] = [];
      for (const role of ["owner", "member"]) {
        const user = await client.users.createUser({
          emailAddress: [`${run}-${role}@example.com`],
          firstName: `QA ${role}`,
          lastName: "Synthetic fixture",
          skipPasswordRequirement: true,
          privateMetadata: { tgpiCommunityQaRun: run },
        });
        users.push(user.id);
        await runFirestoreTransaction(async () => ({
          result: null,
          writes: [write(`${root}/qaRuns/${run}`, { run, users })],
        }));
      }
      const tickets = await Promise.all(
        users.map((userId) =>
          client.signInTokens.createSignInToken({
            userId,
            expiresInSeconds: 3600,
          }),
        ),
      );
      return Response.json(
        { run, users, tickets: tickets.map((t) => t.token) },
        { headers },
      );
    }
    const run = String(input.run || "");
    if (!/^qa-[a-f0-9-]{36}$/.test(run)) throw new Error("Invalid run");
    const fixture = await get<{ users: string[] }>(`${root}/qaRuns/${run}`);
    if (!fixture) throw new Error("Fixture missing");
    for (const uid of fixture.data.users) {
      const user = await client.users.getUser(uid);
      if (user.privateMetadata.tgpiCommunityQaRun !== run)
        throw new Error("Fixture mismatch");
    }
    if (input.action === "tickets") {
      return Response.json(
        {
          tickets: await Promise.all(
            fixture.data.users.map(
              async (userId) =>
                (
                  await client.signInTokens.createSignInToken({
                    userId,
                    expiresInSeconds: 3600,
                  })
                ).token,
            ),
          ),
        },
        { headers },
      );
    }
    if (input.action === "cleanup") {
      const project = process.env.TGPI_FIREBASE_PROJECT_ID || "tgpi-next",
        base = `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents`,
        deletes: string[] = [];
      async function erase(path: string) {
        const result = await cloud(
          `${base}/${path}:listCollectionIds`,
          "POST",
          { pageSize: 100 },
        );
        for (const cid of result.collectionIds || []) {
          let page = "";
          do {
            const list = await cloud(
              `${base}/${path}/${cid}?${new URLSearchParams({ pageSize: "100", showMissing: "true", ...(page ? { pageToken: page } : {}) })}`,
            );
            for (const doc of list.documents || []) {
              if (cid === "assets") {
                const objectName = doc.fields?.objectName?.stringValue;
                if (objectName)
                  await googleStorage(
                    `/storage/v1/b/${encodeURIComponent(process.env.TGPI_COMMUNITY_STORAGE_BUCKET || `${project}-community`)}/o/${encodeURIComponent(objectName)}`,
                    { method: "DELETE" },
                  ).catch(() => {});
              }
              await erase(doc.name.split("/documents/")[1]);
            }
            page = list.nextPageToken || "";
          } while (page);
        }
        deletes.push(
          `projects/${project}/databases/(default)/documents/${path}`,
        );
      }
      for (const id of [`${run}-public`, `${run}-private`, `${run}-hidden`])
        await erase(`${root}/communities/${id}`);
      for (const uid of fixture.data.users) {
        for (const path of [
          `${root}/people/${uid}`,
          `${root}/saved/${uid}`,
          `${root}/limits/${uid}`,
          `${root}/creation/${uid}`,
          `${root}/drafts/${uid}`,
        ])
          await erase(path);
        await erase(`tgpiLearningUsers/${uid}`);
        for (const coll of ["events", "reports"]) {
          const result = await cloud(`${base}/${root}:runQuery`, "POST", {
            structuredQuery: {
              from: [{ collectionId: coll }],
              where: {
                fieldFilter: {
                  field: {
                    fieldPath: coll === "events" ? "actor" : "reporter",
                  },
                  op: "EQUAL",
                  value: { stringValue: uid },
                },
              },
              limit: 100,
            },
          });
          for (const row of result)
            if (row.document) deletes.push(row.document.name);
        }
        const notifications = await cloud(`${base}:runQuery`, "POST", {
          structuredQuery: {
            from: [{ collectionId: "tgpiNotificationInbox" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "uid" },
                op: "EQUAL",
                value: { stringValue: uid },
              },
            },
            limit: 100,
          },
        });
        for (const row of notifications)
          if (row.document) deletes.push(row.document.name);
        await client.users.deleteUser(uid);
      }
      deletes.push(
        `projects/${project}/databases/(default)/documents/${root}/qaRuns/${run}`,
      );
      for (let i = 0; i < deletes.length; i += 200)
        await cloud(`${base}:commit`, "POST", {
          writes: [...new Set(deletes.slice(i, i + 200))].map((name) => ({
            delete: name,
          })),
        });
      return Response.json(
        { cleaned: true, documents: deletes.length },
        { headers },
      );
    }
    throw new Error("Unknown action");
  } catch (e) {
    return Response.json(
      { error: (e as Error).message },
      { status: 503, headers },
    );
  }
}
