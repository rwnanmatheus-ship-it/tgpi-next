"use client";

import { useParams } from "next/navigation";
import LiveChat from "@/components/LiveChat";
import SocialFeed from "@/components/SocialFeed";

export default function RoomPage() {
  const { slug } = useParams();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl text-yellow-400 font-bold capitalize">
        {slug} Room
      </h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <LiveChat />
        <SocialFeed />
      </div>
    </main>
  );
}