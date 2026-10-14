import "server-only";
import { TGPI_PREMIUM_PRICE_ID } from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import {
  normalizeActivationProgress,
  TGPI_ACTIVATION_METADATA_KEY,
} from "@/lib/activation-progress";
import {
  normalizeSubscriptionRecord,
  TGPI_BILLING_METADATA_KEY,
} from "@/lib/billing";
import { listUserLearningCredentials } from "@/lib/learning-records.server";
import { billingEvent, welcomeEvent, type NotificationEvent } from "./model";
import {
  publishNotification,
  notificationId,
  mutateNotification,
  listNotifications,
} from "./store.server";

export async function reconcileNotifications(uid: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(uid);
  const progress = normalizeActivationProgress(
    user.privateMetadata[TGPI_ACTIVATION_METADATA_KEY],
  );
  const billing = normalizeSubscriptionRecord(
    user.privateMetadata[TGPI_BILLING_METADATA_KEY],
    uid,
  );
  const { items: existingItems } = await listNotifications(uid);
  const existingKeys = new Set(existingItems.map((item) => item.key));
  const events: NotificationEvent[] = [welcomeEvent];
  const onboarding = user.unsafeMetadata.tgpiOnboarding as
    | { completed?: boolean }
    | undefined;
  if (!onboarding?.completed)
    events.push({
      key: "next:onboarding:v1",
      category: "planning",
      title: "Give your global plan a direction",
      body: "Choose your goals and priorities so your workspace can guide your next decision.",
      href: "/onboarding",
      actionLabel: "Set my priorities",
    });
  else if (!progress.savedCountries.length)
    events.push({
      key: "next:shortlist:v1",
      category: "planning",
      title: "Build your country shortlist",
      body: "Save countries that fit your priorities, then compare the trade-offs before choosing.",
      href: "/countries",
      actionLabel: "Explore countries",
    });
  else if (!progress.comparisons.length)
    events.push({
      key: "next:compare:v1",
      category: "planning",
      title: "Your shortlist is ready for comparison",
      body: "Compare cost, lifestyle and practical requirements to narrow your options.",
      href: "/compare",
      actionLabel: "Compare my options",
    });
  for (const [id, course] of Object.entries(progress.courseProgress)) {
    if (course.completedAt)
      events.push({
        key: `course:complete:${id}`,
        category: "learning",
        title: "Course checkpoints completed",
        body: "Review the assessment and identity requirements for your verified credential.",
        href: `/courses/${id}/certification`,
        actionLabel: "View certification requirements",
      });
    else
      events.push({
        key: `course:start:${id}`,
        category: "learning",
        title: "Your learning journey has started",
        body: "Your progress is saved. Continue your next lesson in your learning workspace.",
        href: `/courses/${id}`,
        actionLabel: "Continue learning",
      });
  }
  if (
    billing.stripeSubscriptionId &&
    TGPI_PREMIUM_PRICE_ID &&
    billing.stripePriceId === TGPI_PREMIUM_PRICE_ID
  )
    events.push(
      billingEvent(
        billing.stripeSubscriptionId,
        billing.status,
        billing.cancelAtPeriodEnd,
        billing.currentPeriodEnd,
      ),
    );
  const credentials = await listUserLearningCredentials(uid);
  for (const credential of credentials)
    events.push({
      key: `credential:${credential.id}`,
      category: "learning",
      title: "Your verified credential is ready",
      body: `${credential.courseTitle}: your issued credential is available in your private certificate workspace.`,
      href: "/certificates",
      actionLabel: "View my credential",
      important: true,
    });
  if (onboarding?.completed)
    events.push({
      key: "onboarding:complete:v1",
      category: "planning",
      title: "Your global priorities are saved",
      body: "Use your priorities to research countries and build your shortlist.",
      href: "/countries",
      actionLabel: "Explore my options",
    });
  for (const [slug, review] of Object.entries(progress.documentReviews)) {
    if (
      review.totalItems > 0 &&
      review.completedItemIds.length >= review.totalItems
    )
      events.push({
        key: `documents:complete:${slug}`,
        category: "planning",
        title: "Your document checklist is complete",
        body: "Your checklist is marked complete. Confirm requirements with official authorities before you travel or apply.",
        href: `/countries/${slug}`,
        actionLabel: "Review official sources",
      });
  }
  for (const event of events) {
    if (!existingKeys.has(event.key)) await publishNotification(uid, event);
  }
  const relevantKeys = new Set(events.map((event) => event.key));
  for (const key of [
    "next:onboarding:v1",
    "next:shortlist:v1",
    "next:compare:v1",
  ]) {
    if (
      !relevantKeys.has(key) &&
      existingItems.some((item) => item.key === key && !item.archivedAt)
    )
      await mutateNotification(uid, notificationId(uid, key), "archive");
  }
}
