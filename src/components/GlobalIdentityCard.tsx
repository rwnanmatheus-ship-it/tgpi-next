"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function GlobalIdentityCard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-[#0a1a3a] to-[#020617] p-6">
      <h2 className="mb-3 font-bold text-yellow-400">TGPI GLOBAL IDENTITY</h2>
      <p className="text-lg font-semibold">{user?.displayName || "User"}</p>
      <p className="text-sm text-slate-400">{user?.email}</p>
      <p className="mt-2 text-xs text-yellow-400">
        ID: {user ? `TGPI-${user.uid.slice(0, 6)}` : "Not available"}
      </p>
    </div>
  );
}
