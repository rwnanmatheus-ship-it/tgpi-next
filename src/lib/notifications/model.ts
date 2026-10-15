export const notificationCategories = [
  "account",
  "billing",
  "learning",
  "planning",
  "product",
] as const;
export type NotificationCategory = (typeof notificationCategories)[number];
export type NotificationPreferences = {
  emailImportant: boolean;
  emailLearning: boolean;
  emailPlanning: boolean;
  emailProduct: boolean;
};
export const defaultPreferences: NotificationPreferences = {
  emailImportant: true,
  emailLearning: false,
  emailPlanning: false,
  emailProduct: false,
};
export type NotificationEvent = {
  key: string;
  category: NotificationCategory;
  title: string;
  body: string;
  href: string;
  actionLabel: string;
  important?: boolean;
};
export type InboxNotification = NotificationEvent & {
  id: string;
  uid: string;
  createdAt: string;
  readAt: string | null;
  archivedAt: string | null;
};
export function safeNotificationHref(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\/(?!\/)/.test(value) &&
    !/[\\\u0000-\u0020\u007f]/.test(value) &&
    value.length <= 500
  );
}
export function parsePreferences(value: unknown): NotificationPreferences {
  const input =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};
  return Object.fromEntries(
    Object.entries(defaultPreferences).map(([key, fallback]) => [
      key,
      typeof input[key] === "boolean" ? input[key] : fallback,
    ]),
  ) as NotificationPreferences;
}
export function wantsEmail(
  event: NotificationEvent,
  prefs: NotificationPreferences,
) {
  if (event.category === "account" || event.category === "billing")
    return prefs.emailImportant;
  return prefs[
    event.category === "learning"
      ? "emailLearning"
      : event.category === "planning"
        ? "emailPlanning"
        : "emailProduct"
  ];
}
export const welcomeEvent: NotificationEvent = {
  key: "account:welcome:v1",
  category: "account",
  title: "Welcome to TGPI",
  body: "Your global workspace is ready. Set your goals to turn country research into a practical personal plan.",
  href: "/onboarding",
  actionLabel: "Build my plan",
  important: true,
};

export function billingEvent(
  subscriptionId: string,
  status: string,
  cancelAtPeriodEnd: boolean,
  periodEnd = "",
): NotificationEvent {
  const paymentIssue = status === "past_due" || status === "unpaid";
  const ended = status === "canceled" || status === "incomplete_expired";
  const active = status === "active" || status === "trialing";
  return {
    key: `billing:${subscriptionId}:${status}:${cancelAtPeriodEnd}:${periodEnd}`,
    category: "billing",
    important: true,
    title: paymentIssue
      ? "Your subscription needs attention"
      : ended
        ? "Your subscription has ended"
        : cancelAtPeriodEnd
          ? "Your cancellation is scheduled"
          : active
            ? "Your Premium subscription is active"
            : "Your subscription status changed",
    body: paymentIssue
      ? "Review your payment method to avoid an interruption to Premium access."
      : cancelAtPeriodEnd
        ? "Review your current access period and subscription options in your billing workspace."
        : active
          ? "Open your workspace to use your Premium tools and continue your global plan."
          : "Review your current subscription and available next steps in your account.",
    href: "/premium",
    actionLabel: paymentIssue ? "Review billing" : "View my membership",
  };
}
