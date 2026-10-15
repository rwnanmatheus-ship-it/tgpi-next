import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse, type NextRequest } from "next/server";
import { welcomeEvent } from "@/lib/notifications/model";
import {
  notificationsConfigured,
  publishNotification,
} from "@/lib/notifications/store.server";
export async function POST(request: NextRequest) {
  if (!process.env.CLERK_WEBHOOK_SIGNING_SECRET || !notificationsConfigured())
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 503 },
    );
  let event;
  try {
    event = await verifyWebhook(request);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 400 },
    );
  }
  try {
    if (event.type === "user.created")
      await publishNotification(event.data.id, welcomeEvent);
    if (event.type === "session.created")
      await publishNotification(event.data.user_id, {
        key: `session:${event.data.id}`,
        category: "account",
        important: true,
        title: "A new sign-in to your TGPI account",
        body: "A new session was created. If this was not you, review your active sessions and secure your account.",
        href: "/profile/security",
        actionLabel: "Review account security",
      });
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { error: "Notification storage unavailable. Retry this event." },
      { status: 503 },
    );
  }
}
