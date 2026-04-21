"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type NotificationItem = {
  type?: string;
  message?: string;
  read?: boolean;
};

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "notifications"),
      where("toUid", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((doc) => doc.data() as NotificationItem));
    });

    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            Notification Center
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This is your live signal layer — follows, activity, and connection
            events that keep your TGPI journey active.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="space-y-4">
            {items.length ? (
              items.map((item, index) => (
                <div
                  key={`${item.message}-${index}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <p className="text-sm text-slate-400">{item.type || "activity"}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {item.message || "New TGPI activity"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-300">
                No notifications yet. As TGPI becomes more active, your live
                notification layer will grow.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}