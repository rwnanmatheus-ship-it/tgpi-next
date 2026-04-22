"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timeLabel?: string;
  href?: string;
  unread?: boolean;
  createdAt?: string;
};

function formatTime(date?: string, fallback?: string) {
  if (fallback) return fallback;
  if (!date) return "Agora";

  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return "Agora";
  }
}

export default function TopbarNotifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setNotifications([]);
        return;
      }

      const notificationsRef = collection(db, "users", user.uid, "notifications");
      const notificationsQuery = query(
        notificationsRef,
        orderBy("createdAt", "desc"),
        limit(8)
      );

      const unsubscribeSnapshot = onSnapshot(
        notificationsQuery,
        (snapshot) => {
          const next = snapshot.docs.map((item) => {
            const data = item.data() as Omit<NotificationItem, "id">;
            return {
              id: item.id,
              ...data,
            };
          });

          setNotifications(next);
        },
        (error) => {
          console.error("Failed to load notifications:", error);
          setNotifications([]);
        }
      );

      return unsubscribeSnapshot;
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications]
  );

  async function markAsRead(notificationId: string) {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const notificationRef = doc(
        db,
        "users",
        user.uid,
        "notifications",
        notificationId
      );

      await updateDoc(notificationRef, {
        unread: false,
      });
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  }

  async function handleNotificationClick(item: NotificationItem) {
    if (item.unread) {
      await markAsRead(item.id);
    }

    setOpen(false);

    if (item.href) {
      window.location.href = item.href;
    } else {
      window.location.href = "/notifications";
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#02122d] text-white transition hover:border-yellow-500/30 hover:text-yellow-300"
        aria-label="Abrir notificações"
      >
        <span className="text-lg">🔔</span>

        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-14 z-50 w-[340px] rounded-3xl border border-white/10 bg-[#0b1220] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Notificações</p>
              <p className="mt-1 text-xs text-slate-400">
                Atualizações reais da sua conta e da plataforma
              </p>
            </div>

            <span className="rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-1 text-[11px] font-semibold text-yellow-200">
              {unreadCount} novas
            </span>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
            {notifications.length ? (
              notifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNotificationClick(item)}
                  className="block w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-yellow-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-3 w-3 rounded-full ${
                        item.unread ? "bg-yellow-400" : "bg-slate-600"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {item.description}
                      </p>
                      <p className="mt-2 text-[11px] text-slate-500">
                        {formatTime(item.createdAt, item.timeLabel)}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
                Nenhuma notificação encontrada.
              </div>
            )}
          </div>

          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-2xl border border-yellow-500/25 bg-yellow-500/10 px-4 py-3 text-center text-sm font-semibold text-yellow-200 transition hover:bg-yellow-500/15"
          >
            Ver todas as notificações
          </Link>
        </div>
      ) : null}
    </div>
  );
}