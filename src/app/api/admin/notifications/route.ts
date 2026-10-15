import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { safeNotificationHref } from "@/lib/notifications/model";
import {
  publishNotification,
  notificationsConfigured,
} from "@/lib/notifications/store.server";
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return NextResponse.json({ error: "Unverified origin." }, { status: 403 });
  const client = await clerkClient();
  const admin = await client.users.getUser(userId);
  if (admin.privateMetadata.role !== "admin")
    return NextResponse.json(
      { error: "Administrator access required." },
      { status: 403 },
    );
  if (!notificationsConfigured())
    return NextResponse.json(
      { error: "Notification service unavailable." },
      { status: 503 },
    );
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 4096)
      return NextResponse.json(
        { error: "Request is too large." },
        { status: 413 },
      );
    const input = JSON.parse(raw) as Record<string, unknown>;
    if (
      typeof input.uid !== "string" ||
      !/^user_[A-Za-z0-9]+$/.test(input.uid) ||
      typeof input.key !== "string" ||
      !/^[a-z0-9-]{1,80}$/.test(input.key) ||
      typeof input.title !== "string" ||
      !input.title.trim() ||
      input.title.length > 160 ||
      typeof input.body !== "string" ||
      !input.body.trim() ||
      input.body.length > 1500 ||
      !safeNotificationHref(input.href)
    )
      return NextResponse.json(
        { error: "Invalid announcement." },
        { status: 400 },
      );
    await client.users.getUser(input.uid);
    const id = await publishNotification(input.uid, {
      key: `announcement:${input.key}`,
      category: "product",
      title: input.title.trim(),
      body: input.body.trim(),
      href: input.href,
      actionLabel: "Explore this update",
    });
    return NextResponse.json(
      { id },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to publish this announcement." },
      { status: 400 },
    );
  }
}
