"use client";

import OnlineNow from "@/components/OnlineNow";
import ProfileCompletion from "@/components/ProfileCompletion";
import SmartAdvisor from "@/components/SmartAdvisor";
import QuickStart from "@/components/QuickStart";
import ShareProfile from "@/components/ShareProfile";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-yellow-400">
          Your Global Dashboard
        </h1>

        <ShareProfile username="globaluser" />

        <OnlineNow />
        <ProfileCompletion />
        <SmartAdvisor />
        <QuickStart />
      </div>
    </main>
  );
}