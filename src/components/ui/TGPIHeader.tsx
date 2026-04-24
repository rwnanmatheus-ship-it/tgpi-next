"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function TGPIHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <header className="flex justify-between items-center p-4 border-b border-white/10 bg-[#050b18]">
      <input
        placeholder="Buscar países, cursos..."
        className="bg-black border border-white/10 px-4 py-2 rounded-xl w-1/3"
      />

      <div className="flex items-center gap-4">
        <div className="relative">
          🔔
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
            3
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl">
          <img
            src={user?.photoURL || "/avatar.png"}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm">{user?.displayName || "User"}</p>
            <p className="text-xs text-slate-400">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}