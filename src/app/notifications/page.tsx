"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
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
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return "Agora";
  }
}

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setNotifications([]);
        setLoading(false);
        return;
      }

      const notificationsRef = collection(db, "users", user.uid, "notifications");
      const notificationsQuery = query(
        notificationsRef,
        orderBy("createdAt", "desc")
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
          setLoading(false);
        },
        (error) => {
          console.error("Failed to load notifications page:", error);
          setNotifications([]);
          setLoading(false);
        }
      );

      return unsubscribeSnapshot;
    });

    return () => unsubscribeAuth();
  }, []);

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

    if (item.href) {
      window.location.href = item.href;
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[32px] border border-yellow-500/15 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)] p-8 shadow-[0_0_60px_rgba(250,204,21,0.05)]">
          <p className="mb-3 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
            Central de notificações
          </p>

          <h1 className="text-4xl font-bold text-white">Notificações</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Veja as atualizações da sua conta, progresso, novas funções e sinais importantes da plataforma.
          </p>

          <div className="mt-6">
            <Link
              href="/profile"
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-500/30 hover:text-yellow-300"
            >
              Voltar ao perfil
            </Link>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 shadow-[0_0_35px_rgba(250,204,21,0.03)]">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-yellow-400">
              Histórico completo
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Todas as notificações da sua conta, em ordem da mais recente para a mais antiga.
            </p>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
                Carregando notificações...
              </div>
            ) : notifications.length ? (
              notifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNotificationClick(item)}
                  className="block w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-yellow-500/20"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 h-3 w-3 rounded-full ${
                        item.unread ? "bg-yellow-400" : "bg-slate-600"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-base font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatTime(item.createdAt, item.timeLabel)}
                        </p>
                      </div>

                      <p className="mt-2 text-sm leading-7 text-slate-400">
                        {item.description}
                      </p>

                      {item.href ? (
                        <p className="mt-3 text-xs font-semibold text-yellow-300">
                          Abrir conteúdo relacionado
                        </p>
                      ) : null}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
                Nenhuma notificação encontrada para esta conta.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}