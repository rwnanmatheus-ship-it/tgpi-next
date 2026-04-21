"use client";

import { useMemo } from "react";
import RealTimeChat from "@/components/RealTimeChat";

export default function RoomDetailPage({ params }: any) {
  const roomSlug = String(params?.slug || "global");
  const roomTitle = useMemo(() => {
    const map: Record<string, string> = {
      canada: "Canada Room",
      portugal: "Portugal Room",
      usa: "United States Room",
      germany: "Germany Room",
    };

    return map[roomSlug] || "Global Room";
  }, [roomSlug]);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-10">
          <h1 className="text-4xl font-bold text-yellow-400">{roomTitle}</h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            Talk with users focused on the same destination. This room can be
            used for readiness, questions, networking, and transition support.
          </p>
        </section>

        <RealTimeChat chatId={`room_${roomSlug}`} />
      </div>
    </main>
  );
}