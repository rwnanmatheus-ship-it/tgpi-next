"use client";

import TgpiAccountMenu from "@/components/profile/TgpiAccountMenu";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function TGPIHeader() {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#050b18] p-4">
      <input
        placeholder="Buscar países, cursos..."
        className="w-1/3 rounded-xl border border-white/10 bg-black px-4 py-2"
      />

      <div className="flex items-center gap-4">
        <Link href="/notifications" className="grid h-10 w-10 place-items-center rounded-full border border-white/10" aria-label="Open notifications">◌</Link>

        <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
          <TgpiAccountMenu />
          <div>
            <p className="text-sm">{user?.fullName || user?.firstName || "TGPI member"}</p>
            <p className="text-xs text-slate-400">{user?.username ? `@${user.username}` : "Create your @ID"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
