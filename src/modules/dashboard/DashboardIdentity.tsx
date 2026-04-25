"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loadCommandCenterProfile } from "@/lib/profile-command-center";

export default function DashboardIdentity() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const data = await loadCommandCenterProfile();
      setProfile(data);
    });
  }, []);

  return (
    <section className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-[#07111f] to-black p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-white">Seu Perfil Global</h2>
        <a href="/profile" className="text-xs text-yellow-400">
          Ver completo
        </a>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={profile?.photoURL || "/avatar.png"}
          alt="Avatar"
          className="h-20 w-20 rounded-full border-2 border-yellow-400 object-cover"
        />

        <div>
          <p className="text-xl font-bold text-white">
            {profile?.displayName || "TGPI Member"}
          </p>
          <p className="text-sm text-slate-400">@{profile?.username || "username"}</p>
          <p className="mt-2 text-xs text-yellow-400">
            {profile?.tgpiId || "TGPI-ID"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 text-center">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-lg font-bold">24</p>
          <p className="text-xs text-slate-400">Países</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-lg font-bold">8</p>
          <p className="text-xs text-slate-400">Cursos</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-lg font-bold">17</p>
          <p className="text-xs text-slate-400">Conquistas</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-lg font-bold">184h</p>
          <p className="text-xs text-slate-400">Horas</p>
        </div>
      </div>
    </section>
  );
}