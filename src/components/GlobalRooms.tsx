"use client";

import Link from "next/link";

const rooms = [
  { country: "Canada", slug: "canada" },
  { country: "Portugal", slug: "portugal" },
  { country: "United States", slug: "usa" },
  { country: "Germany", slug: "germany" },
];

export default function GlobalRooms() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-yellow-400 font-bold text-xl">
        🌍 Global Rooms
      </h2>

      <p className="text-sm text-slate-400 mt-2">
        Join live rooms with people moving to the same destination.
      </p>

      <div className="mt-4 space-y-3">
        {rooms.map((room) => (
          <Link
            key={room.slug}
            href={`/community?room=${room.slug}`}
            className="block rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition"
          >
            <p className="text-white font-semibold">
              {room.country}
            </p>
            <p className="text-xs text-slate-400">
              Live discussion & connections
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}