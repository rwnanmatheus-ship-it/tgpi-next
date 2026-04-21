"use client";

import { useEffect, useState } from "react";

export default function DailyStreak() {
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const last = localStorage.getItem("tgpi-last-visit");
    const today = new Date().toDateString();

    if (last !== today) {
      const prev = Number(localStorage.getItem("tgpi-streak") || 1);
      const next = prev + 1;

      localStorage.setItem("tgpi-streak", String(next));
      localStorage.setItem("tgpi-last-visit", today);

      setStreak(next);
    } else {
      setStreak(Number(localStorage.getItem("tgpi-streak") || 1));
    }
  }, []);

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
      <p className="text-sm text-yellow-300">Daily Momentum</p>
      <p className="text-xl font-bold text-white">{streak} day streak</p>
    </div>
  );
}