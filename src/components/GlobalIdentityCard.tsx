"use client";

import { useUser } from "@clerk/nextjs";

export default function GlobalIdentityCard() {
  const { user } = useUser();

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-[#0a1a3a] to-[#020617] p-6">
      <h2 className="mb-3 font-bold text-yellow-400">TGPI GLOBAL IDENTITY</h2>
      <p className="text-lg font-semibold">{user?.fullName || user?.firstName || "TGPI member"}</p>
      <p className="text-sm text-slate-400">{user?.primaryEmailAddress?.emailAddress}</p>
      <p className="mt-2 text-xs text-yellow-400">
        {user ? "Identity managed by TGPI Global Key" : "Identity not available"}
      </p>
    </div>
  );
}
