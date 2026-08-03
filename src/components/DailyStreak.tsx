"use client";

import { useEffect, useState } from "react";

function readAndUpdateStreak() {
  const lastVisit = localStorage.getItem("tgpi-last-visit");
  const today = new Date().toDateString();
  const currentStreak = Number(localStorage.getItem("tgpi-streak") || 1);

  if (lastVisit === today) {
    return currentStreak;
  }

  const nextStreak = currentStreak + 1;
  localStorage.setItem("tgpi-streak", String(nextStreak));
  localStorage.setItem("tgpi-last-visit", today);
  return nextStreak;
}

export default function DailyStreak() {
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setStreak(readAndUpdateStreak());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
      <p className="text-sm text-yellow-300">Daily Momentum</p>
      <p className="text-xl font-bold text-white">{streak} day streak</p>
    </div>
  );
}
