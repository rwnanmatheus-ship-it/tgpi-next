"use client";

import { useUserData } from "@/hooks/useUserData";
import NotificationBell from "@/components/NotificationBell";
import UserConnections from "@/components/UserConnections";
import SmartFeed from "@/components/SmartFeed";
import RealTimeChat from "@/components/RealTimeChat";

export default function DashboardPage() {
  const user = useUserData();

  if (!user) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-yellow-400">
            Dashboard
          </h1>

          <NotificationBell />
        </div>

        <SmartFeed user={user} />

        <UserConnections
          followers={user.followers || []}
          following={user.following || []}
        />

        <RealTimeChat chatId={user.uid} />
      </div>
    </div>
  );
}