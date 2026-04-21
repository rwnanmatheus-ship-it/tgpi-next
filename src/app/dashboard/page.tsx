"use client";

import { useUserData } from "@/hooks/useUserData";
import NotificationBell from "@/components/NotificationBell";
import UserConnections from "@/components/UserConnections";
import SmartFeed from "@/components/SmartFeed";
import RealTimeChat from "@/components/RealTimeChat";
import GlobalRooms from "@/components/GlobalRooms";
import Missions from "@/components/Missions";
import UserRank from "@/components/UserRank";
import SocialProof from "@/components/SocialProof";
import InviteCard from "@/components/InviteCard";

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

        <UserRank xp={user.xp || 0} />

        <SmartFeed user={user} />

        <div className="grid gap-6 xl:grid-cols-2">
          <SocialProof />
          <InviteCard username={user.username || "user"} />
        </div>

        <GlobalRooms />

        <Missions />

        <UserConnections
          followers={user.followers || []}
          following={user.following || []}
        />

        <RealTimeChat chatId={user.uid} />
      </div>
    </div>
  );
}