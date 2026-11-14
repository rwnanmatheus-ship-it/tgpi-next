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
  NotificationAction,
} from "@/lib/notifications/model";
import {
  defaultPreferences,
  notificationMarks,
  parsePreferences,
} from "@/lib/notifications/model";
import { useLocale } from "@/components/localization/LocaleProvider";
import dynamic from "next/dynamic";
import {
  clearLocalPush,
  currentPushSubscription,
  pushRequest,
  pushSupported,
} from "@/lib/notifications/push-client";
const NotificationDrawer = dynamic(() => import("./NotificationDrawer"), { ssr: false });

type InboxContext = {
  items: InboxNotification[];
  preferences: NotificationPreferences;
  loading: boolean;
  error: string;
  nextCursor: string | null;
  pending: boolean;
  fetching: boolean;
  drawerOpen: boolean;
  openDrawer: (trigger?: HTMLElement) => void;
  closeDrawer: () => void;
  drawerTrigger: React.RefObject<HTMLElement | null>;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  mutate: (id: string, action: NotificationAction) => Promise<void>;
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
  const writing = useRef(false);
  const fetching = useRef(false);
  const hasHistory = useRef(false);
  const drawerTrigger = useRef<HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState<InboxNotification[]>([]);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const load = useCallback(
    async (cursor?: string) => {
      if (!uid || writing.current || fetching.current) return;
      fetching.current = true;
      setIsFetching(true);
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
        const incoming = data.items as InboxNotification[];
        if (cursor) hasHistory.current = true;
        const mergeHead = !cursor && hasHistory.current && data.mode !== "account" && Boolean(data.nextCursor);
        const newIds = new Set(incoming.map((item) => item.id));
        const boundary = incoming.at(-1)?.createdAt;
        setItems((previous) => {
          if (cursor) return [...previous.filter((item) => !newIds.has(item.id)), ...incoming];
          if (!mergeHead || !boundary) return incoming;
          return [...incoming, ...previous.filter((item) => !newIds.has(item.id) && item.createdAt <= boundary)];
        });
        setPreferences(parsePreferences(data.preferences));
        if (!mergeHead) {
          setNextCursor(data.nextCursor);
          if (!cursor) hasHistory.current = false;
        }
        setError("");
      } catch (err) {
        if (generation.current === requestGeneration)
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load notifications.",
          );
      } finally {
        fetching.current = false;
        setIsFetching(false);
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
    let syncing = false;
    async function sync() {
      if (syncing) return;
      syncing = true;
      try {
        await fetch("/api/notifications/sync", { method: "POST" });
      } catch {
        /* GET exposes availability. */
      }
      if (!stopped) await load();
      syncing = false;
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
  async function write(operation: () => Promise<void>) {
    if (writing.current) return false;
    writing.current = true;
    generation.current += 1;
    setPending(true);
    try {
      await operation();
      setError("");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save.");
      return false;
    } finally {
      writing.current = false;
      setPending(false);
    }
  }
  async function mutate(id: string, action: NotificationAction) {
    await write(async () => {
      await patch({ id, action });
      const now = new Date().toISOString();
      setItems((previous) => previous.map((item) =>
        item.id === id ? { ...item, ...notificationMarks(item, action, now) } : item,
      ));
    });
  }
  async function markAllRead() {
    await write(async () => {
      const ids = items.filter((item) => !item.readAt && !item.archivedAt).slice(0, 50).map((item) => item.id);
      if (!ids.length) return;
      await patch({ action: "read_all", ids });
      const now = new Date().toISOString();
      const updated = new Set(ids);
      setItems((previous) => previous.map((item) =>
        updated.has(item.id) ? { ...item, readAt: item.readAt || now } : item,
      ));
    });
  }
  function savePreferences(value: NotificationPreferences) {
    return write(async () => {
      const data = await patch({ action: "preferences", preferences: value });
      setPreferences(parsePreferences(data.preferences));
    });
  }
  return (
    <Context.Provider
      value={{
        items,
        preferences,
        nextCursor,
        loading,
        pending,
        fetching: isFetching,
        drawerOpen,
        drawerTrigger,
        openDrawer: (trigger) => {
          if (!uid) return;
          drawerTrigger.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
          setDrawerOpen(true);
        },
        closeDrawer: () => setDrawerOpen(false),
        error,
        refresh: () => load(),
        loadMore: async () => { if (nextCursor) await load(nextCursor); },
        mutate,
        savePreferences,
        markAllRead,
      }}
    >
      {children}
      {drawerOpen && <NotificationDrawer />}
    </Context.Provider>
  );
}
