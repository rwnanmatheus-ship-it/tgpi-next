"use client";

import { useState } from "react";

export default function NotificationCenter() {
  const [notifications] = useState([
    "You earned XP today",
    "New country added",
    "You moved up in ranking",
  ]);

  return (
    <div className="rounded-xl border border-slate-800 p-6 bg-slate-900">
      <h2 className="text-xl font-bold text-yellow-400">
        Notifications
      </h2>

      <div className="mt-4 space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className="text-sm text-slate-300">
            🔔 {n}
          </div>
        ))}
      </div>
    </div>
  );
}