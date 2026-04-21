"use client";

import ShareActions from "@/components/ShareActions";

export default function PassportPage() {
  return (
    <div className="p-10 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Your Global Passport</h1>

      <p className="text-slate-400 mt-2">
        Your international identity across the TGPI ecosystem
      </p>

      <div className="mt-8 border border-white/10 p-6 rounded-xl">
        <p className="text-lg">Status: Active</p>
        <p className="text-lg">Global Access: Enabled</p>
      </div>

      <div className="mt-6">
        <ShareActions
          title="My TGPI Global Passport"
          text="Explore my TGPI Global Passport and international progression."
          urlPath="/passport"
        />
      </div>
    </div>
  );
}