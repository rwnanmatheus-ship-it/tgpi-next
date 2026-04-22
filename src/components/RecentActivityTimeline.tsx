"use client";

import { useEffect, useState } from "react";
import { getUserMemory, UserActivityItem } from "@/lib/user-memory";

function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export default function RecentActivityTimeline() {
  const [activities, setActivities] = useState<UserActivityItem[]>([]);

  useEffect(() => {
    async function load() {
      const memory = await getUserMemory();
      setActivities(memory?.activity || []);
    }

    load();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-yellow-400">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-sm text-slate-400">No recent activity yet.</p>
      ) : (
        <div className="space-y-3">
          {activities
            .slice()
            .reverse()
            .slice(0, 8)
            .map((item, index) => (
              <div
                key={`${item.action}-${item.date}-${index}`}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <p className="text-sm font-medium text-white">{item.action}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {formatDate(item.date)}
                </p>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}