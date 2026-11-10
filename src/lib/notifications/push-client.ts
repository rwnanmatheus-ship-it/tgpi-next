"use client";
export function pushSupported() {
  return (
    typeof window !== "undefined" &&
    window.isSecureContext &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}
export async function pushRequest(body: object) {
  const response = await fetch("/api/notifications/push", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || "Unable to update device notifications.");
  return data as { id?: string; accepted?: boolean; ok?: boolean };
}
export async function currentPushSubscription() {
  if (!pushSupported()) return null;
  const registration = await navigator.serviceWorker.getRegistration("/");
  return (await registration?.pushManager.getSubscription()) || null;
}
export async function connectPush(publicKey: string) {
  const registration = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
    updateViaCache: "none",
  });
  await Promise.race([
    navigator.serviceWorker.ready,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Service worker unavailable.")), 15000),
    ),
  ]);
  if (registration.waiting)
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
  const bytes = Uint8Array.from(
    atob(
      publicKey.replace(/-/g, "+").replace(/_/g, "/") +
        "=".repeat((4 - (publicKey.length % 4)) % 4),
    ),
    (c) => c.charCodeAt(0),
  );
  let subscription = await registration.pushManager.getSubscription();
  const existingKey = subscription?.options.applicationServerKey;
  if (
    existingKey &&
    (new Uint8Array(existingKey).length !== bytes.length ||
      new Uint8Array(existingKey).some(
        (value, index) => value !== bytes[index],
      ))
  ) {
    await subscription!.unsubscribe();
    subscription = null;
  }
  return (
    subscription ||
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: bytes,
    }))
  );
}
export async function clearLocalPush() {
  const subscription = await currentPushSubscription();
  if (subscription) await subscription.unsubscribe();
  const registration = await navigator.serviceWorker?.getRegistration("/");
  for (const notification of (await registration?.getNotifications()) || [])
    notification.close();
  registration?.active?.postMessage({ type: "TGPI_BADGE", count: 0 });
}
export async function pushDeviceId(subscription: PushSubscription) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(subscription.endpoint),
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
