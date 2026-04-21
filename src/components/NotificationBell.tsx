"use client";

import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "notifications"),
      where("toUid", "==", auth.currentUser.uid),
      where("read", "==", false)
    );

    const unsub = onSnapshot(q, (snap) => {
      setCount(snap.size);
    });

    return () => unsub();
  }, []);

  return (
    <div className="relative">
      <span className="text-white">🔔</span>

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}