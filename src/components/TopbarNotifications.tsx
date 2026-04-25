"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Profile updated",
    description: "Your latest changes were synchronized successfully.",
    time: "Just now",
    unread: true,
  },
  {
    id: "2",
    title: "Complete your readiness",
    description: "Fill in more profile fields to improve TGPI recommendations.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "3",
    title: "New feature available",
    description: "Your profile now includes public preview and smart actions.",
    time: "Today",
    unread: false,
  },
];

export default function TopbarNotifications() {
  const [open, setOpen] = useState(false);

  const unreadCount = useMemo(
    () => mockNotifications.filter((item) => item.unread).length,
    []
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#02122d] text-white transition hover:border-yellow-500/30 hover:text-yellow-300"
        aria-label="Open notifications"
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
              <p className="text-sm font-semibold text-white">Notifications</p>
              <p className="mt-1 text-xs text-slate-400">
                Quick updates from your account and the platform
              </p>
            </div>

            <span className="rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-1 text-[11px] font-semibold text-yellow-200">
              {unreadCount} new
            </span>
          </div>

          <div className="space-y-3">
            {mockNotifications.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${
                      item.unread ? "bg-yellow-400" : "bg-slate-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {item.description}
                    </p>
                    <p className="mt-2 text-[11px] text-slate-500">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-2xl border border-yellow-500/25 bg-yellow-500/10 px-4 py-3 text-center text-sm font-semibold text-yellow-200 transition hover:bg-yellow-500/15"
          >
            View all notifications
          </Link>
        </div>
      ) : null}
    </div>
  );
}