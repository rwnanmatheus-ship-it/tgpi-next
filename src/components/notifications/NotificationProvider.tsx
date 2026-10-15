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
import { defaultPreferences } from "@/lib/notifications/model";

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
  savePreferences: (value: NotificationPreferences) => Promise<void>;
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
  const generation = useRef(0);
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
        setPreferences(data.preferences);
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
      try {
        await fetch("/api/notifications/sync", { method: "POST" });
      } catch {
        /* GET exposes availability. */
      }
      if (!stopped) await load();
    }
    void sync();
    const refresh = () => {
      if (document.visibilityState === "visible") void sync();
    };
    const timer = window.setInterval(refresh, 120_000);
    window.addEventListener("focus", refresh);
    return () => {
      stopped = true;
      generation.current += 1;
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, [uid, isLoaded, load]);
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
  async function savePreferences(value: NotificationPreferences) {
    setPending(true);
    const requestGeneration = generation.current;
    try {
      const data = await patch({ action: "preferences", preferences: value });
      if (requestGeneration === generation.current) {
        setPreferences(data.preferences);
        setError("");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save preferences.",
      );
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
      }}
    >
      {children}
    </Context.Provider>
  );
}
