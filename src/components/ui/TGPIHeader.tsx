"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function TGPIHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#050b18] p-4">
      <input
        placeholder="Buscar países, cursos..."
        className="w-1/3 rounded-xl border border-white/10 bg-black px-4 py-2"
      />

      <div className="flex items-center gap-4">
        <div className="relative">
          🔔
          <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-xs">
            3
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
          <img
            src={user?.photoURL || "/avatar.png"}
            alt="TGPI account avatar"
            className="h-8 w-8 rounded-full"
          />
          <div>
            <p className="text-sm">{user?.displayName || "User"}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
