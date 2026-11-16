import { createHash } from "node:crypto";
import { z } from "zod";
import { PREMIUM_OFFER } from "@/lib/commercial-offer";
import { createFirestoreUpdateWrite, runFirestoreTransaction } from "@/lib/firestore-admin-rest.server";

const waitlistInput = z.object({
  name: z.string().trim().min(1).max(160),
  email: z.string().trim().toLowerCase().max(254).email(),
  currentCountry: z.string().trim().max(120),
  targetCountry: z.string().trim().max(120),
  goal: z.enum(["move", "work", "study", "remote", "documents"]),
  timeline: z.enum(["0-3-months", "3-6-months", "6-12-months", "12-plus-months", "researching"]),
  website: z.string().max(256),
});

const maxBodyBytes = 4096;
const headers = { "Cache-Control": "private, no-store" };

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ error: "Request origin is not allowed." }, { status: 403, headers });
  }

  if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") {
    return Response.json({ error: "Expected JSON." }, { status: 415, headers });
  }

  const reader = request.body?.getReader();
  if (!reader) return Response.json({ error: "Missing submission." }, { status: 400, headers });

  try {
    const decoder = new TextDecoder("utf-8", { fatal: true });
    let body = "";
    let length = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBodyBytes) {
        await reader.cancel();
        return Response.json({ error: "Submission is too large." }, { status: 413, headers });
      }
      body += decoder.decode(value, { stream: true });
    }

    const result = waitlistInput.safeParse(JSON.parse(body + decoder.decode()));
    if (!result.success) {
      return Response.json({ error: "Invalid waitlist submission." }, { status: 400, headers });
    }
    const entry = result.data;
    if (!entry.website) {
      const id = createHash("sha256").update(entry.email).digest("hex");
      const path = "premiumWaitlist/" + id;
      await runFirestoreTransaction(async ({ getDocuments }) => {
        const existing = await getDocuments([path]);
        if (existing.get(path)) return { result: null, writes: [] };

        return {
          result: null,
          writes: [createFirestoreUpdateWrite(path, {
            name: entry.name,
            email: entry.email,
            currentCountry: entry.currentCountry,
            targetCountry: entry.targetCountry,
            primaryGoal: entry.goal,
            expectedTimeline: entry.timeline,
            publishedPriceUsd: (PREMIUM_OFFER.unitAmount / 100).toFixed(2),
            pricingVersion: "tgpi-premium-v3",
            source: "pricing",
            status: "interested",
            userUid: null,
            emailOptIn: true,
          }, { exists: false }, ["createdAt", "updatedAt"])],
        };
      });
    }

    return Response.json({ saved: true }, { headers });
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof TypeError) {
      return Response.json({ error: "Invalid waitlist submission." }, { status: 400, headers });
    }
    console.error("TGPI waitlist submission could not be saved");
    return Response.json({ error: "Waitlist storage unavailable." }, { status: 503, headers });
  } finally {
    reader.releaseLock();
  }
}
