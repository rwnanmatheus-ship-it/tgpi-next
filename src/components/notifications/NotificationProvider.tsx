"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUser } from "@clerk/nextjs";
import type {
  InboxNotification,
  NotificationPreferences,
} from "@/lib/notifications/model";
import {
  defaultPreferences,
  parsePreferences,
} from "@/lib/notifications/model";
import { useLocale } from "@/components/localization/LocaleProvider";
import {
  localizedNotification,
  notificationText,
} from "@/lib/notifications/text";
import {
  clearLocalPush,
  currentPushSubscription,
  pushRequest,
  pushSupported,
} from "@/lib/notifications/push-client";
import Link from "next/link";
import styles from "./NotificationInbox.module.css";

type InboxContext = {
  items: InboxNotification[];
  preferences: NotificationPreferences;
  loading: boolean;
  error: string;
  nextCursor: string | null;
  pending: boolean;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  mutate: (id: string, action: "read" | "unread" | "archive") => Promise<void>;
  markAllRead: () => Promise<void>;
  savePreferences: (value: NotificationPreferences) => Promise<boolean>;
};
const Context = createContext<InboxContext | null>(null);
export function useNotifications() {
  const context = useContext(Context);
  if (!context) throw new Error("Notification provider missing.");
  return context;
}
export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  return (
    <NotificationSession
      key={user?.id || "signed-out"}
      uid={user?.id}
      isLoaded={isLoaded}
    >
      {children}
    </NotificationSession>
  );
}
function NotificationSession({
  children,
  uid,
  isLoaded,
}: {
  children: React.ReactNode;
  uid?: string;
  isLoaded: boolean;
}) {
  const { locale } = useLocale();
  const generation = useRef(0);
  const initialIds = useRef<Set<string> | null>(null);
  const syncing = useRef(false);
  const [toast, setToast] = useState<InboxNotification | null>(null);
  const [items, setItems] = useState<InboxNotification[]>([]);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const load = useCallback(
    async (cursor?: string) => {
      if (!uid) return;
      const requestGeneration = generation.current;
      try {
        const response = await fetch(
          `/api/notifications${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`,
          { cache: "no-store" },
        );
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Unable to load notifications.");
        if (generation.current !== requestGeneration) return;
        if (!cursor) {
          const recent = (data.items as InboxNotification[]).find(
            (item) =>
              initialIds.current &&
              !initialIds.current.has(item.id) &&
              !item.readAt &&
              !item.archivedAt &&
              Date.now() - Date.parse(item.createdAt) < 300000,
          );
          if (recent && document.visibilityState === "visible")
            setToast(recent);
          initialIds.current = new Set(
            (data.items as InboxNotification[]).map((item) => item.id),
          );
        }
        setItems((previous) =>
          cursor
            ? Array.from(
                new Map(
                  [...previous, ...data.items].map(
                    (item: InboxNotification) => [item.id, item],
                  ),
                ).values(),
              )
            : data.items,
        );
        setPreferences(parsePreferences(data.preferences));
        setNextCursor(data.nextCursor);
        setError("");
      } catch (err) {
        if (generation.current === requestGeneration)
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load notifications.",
          );
      } finally {
        if (generation.current === requestGeneration) setLoading(false);
      }
    },
    [uid],
  );
  useEffect(() => {
    generation.current += 1;
    setItems([]);
    setPreferences(defaultPreferences);
    setNextCursor(null);
    setError("");
    if (!isLoaded || !uid) {
      setLoading(!isLoaded);
      return;
    }
    setLoading(true);
    let stopped = false;
    async function sync() {
      if (syncing.current) return;
      syncing.current = true;
      try {
        await fetch("/api/notifications/sync", { method: "POST" });
      } catch {
        /* GET exposes availability. */
      }
      if (!stopped) await load();
      syncing.current = false;
    }
    void sync();
    const refresh = () => {
      if (document.visibilityState === "visible") void sync();
    };
    const timer = window.setInterval(refresh, 60_000);
    const onPush = (event: MessageEvent) => {
      if (event.data?.type === "TGPI_NOTIFICATION_RECEIVED") void load();
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    navigator.serviceWorker?.addEventListener("message", onPush);
    return () => {
      stopped = true;
      generation.current += 1;
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
      navigator.serviceWorker?.removeEventListener("message", onPush);
    };
  }, [uid, isLoaded, load]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 9000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (!isLoaded || !pushSupported()) return;
    let stopped = false;
    async function bind() {
      let previousOwner: string | null = null;
      try {
        previousOwner = localStorage.getItem("tgpi.push.owner.v1");
      } catch {
        /* Storage is optional. */
      }
      if (!uid || (previousOwner && previousOwner !== uid)) {
        await clearLocalPush();
        try {
          localStorage.removeItem("tgpi.push.owner.v1");
        } catch {
          /* Optional. */
        }
        return;
      }
      if (!preferences.pushEnabled) return;
      const subscription = await currentPushSubscription();
      if (!subscription || stopped) return;
      await pushRequest({
        action: "subscribe",
        subscription: subscription.toJSON(),
        enable: false,
        locale,
        timezone: preferences.timezone,
      });
      try {
        localStorage.setItem("tgpi.push.owner.v1", uid!);
      } catch {
        /* Optional. */
      }
    }
    void bind().catch(() => {
      /* The device panel exposes retry; the inbox remains available. */
    });
    return () => {
      stopped = true;
    };
  }, [uid, isLoaded, preferences.pushEnabled, preferences.timezone, locale]);
  useEffect(() => {
    if (!("serviceWorker" in navigator) || loading) return;
    void navigator.serviceWorker
      .getRegistration("/")
      .then(async (registration) => {
        const unread = items.filter((item) => !item.readAt && !item.archivedAt);
        registration?.active?.postMessage({
          type: "TGPI_BADGE",
          count: unread.length,
        });
        const readIds = new Set(
          items
            .filter((item) => item.readAt || item.archivedAt)
            .map((item) => item.id),
        );
        for (const native of (await registration?.getNotifications()) || [])
          if (readIds.has(native.data?.id)) native.close();
      })
      .catch(() => {});
  }, [items, loading]);
  async function patch(body: object) {
    const response = await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to save.");
    return data;
  }
  async function mutate(id: string, action: "read" | "unread" | "archive") {
    setPending(true);
    const requestGeneration = generation.current;
    try {
      await patch({ id, action });
      if (requestGeneration === generation.current)
        setItems((previous) =>
          previous.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...(action === "archive"
                    ? {
                        archivedAt: new Date().toISOString(),
                        readAt: item.readAt || new Date().toISOString(),
                      }
                    : {
                        readAt:
                          action === "read" ? new Date().toISOString() : null,
                      }),
                }
              : item,
          ),
        );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save.");
    } finally {
      setPending(false);
    }
  }
  async function markAllRead() {
    setPending(true);
    const requestGeneration = generation.current;
    try {
      const ids = items
        .filter((item) => !item.readAt && !item.archivedAt)
        .slice(0, 50)
        .map((item) => item.id);
      await patch({ action: "read_all", ids });
      if (requestGeneration === generation.current) {
        const now = new Date().toISOString();
        setItems((previous) =>
          previous.map((item) =>
            !ids.includes(item.id)
              ? item
              : { ...item, readAt: item.readAt || now },
          ),
        );
        setError("");
      }
    } catch (err) {
      if (requestGeneration === generation.current)
        setError(err instanceof Error ? err.message : "Unable to save.");
    } finally {
      setPending(false);
    }
  }
  async function savePreferences(value: NotificationPreferences) {
    setPending(true);
    const requestGeneration = generation.current;
    try {
      const data = await patch({ action: "preferences", preferences: value });
      if (requestGeneration === generation.current) {
        setPreferences(parsePreferences(data.preferences));
        setError("");
      }
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save preferences.",
      );
      return false;
    } finally {
      setPending(false);
    }
  }
  return (
    <Context.Provider
      value={{
        items,
        preferences,
        nextCursor,
        loading,
        pending,
        error,
        refresh: () => load(),
        loadMore: () => load(nextCursor || undefined),
        mutate,
        savePreferences,
        markAllRead,
      }}
    >
      {children}
      {toast && (
        <div className={styles.toast} role="status" data-tgpi-localized="true">
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Close"
          >
            ×
          </button>
          <strong>{localizedNotification(toast, locale).title}</strong>
          <p>{localizedNotification(toast, locale).body}</p>
          <Link
            href={toast.href}
            onClick={() => {
              void mutate(toast.id, "read");
              setToast(null);
            }}
          >
            {notificationText(locale, "open")} →
          </Link>
        </div>
      )}
    </Context.Provider>
  );
}
