"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function GlobalIdentityCard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0a1a3a] to-[#020617] border border-yellow-500/20">
      <h2 className="text-yellow-400 font-bold mb-3">
        TGPI GLOBAL IDENTITY
      </h2>

      <p className="text-lg font-semibold">
        {user?.displayName || "User"}
      </p>

      <p className="text-sm text-slate-400">
        {user?.email}
      </p>

      <p className="mt-2 text-xs text-yellow-400">
        ID: TGPI-{user?.uid?.slice(0, 6)}
      </p>
    </div>
  );
}