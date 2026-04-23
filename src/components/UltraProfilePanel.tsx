"use client";

import TGPIIdentityCard from "@/components/TGPIIdentityCard";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  loadCommandCenterProfile,
  saveCommandCenterProfileWithRules,
} from "@/lib/profile-command-center";

type Tab = "overview" | "edit" | "goals" | "activity" | "settings";

export default function UltraProfilePanel() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const data = await loadCommandCenterProfile();
      setProfile(data);
      setForm(data || {});
      setLoading(false);
    });

    return () => unsub();
  }, []);

  async function handleSave() {
    await saveCommandCenterProfileWithRules(form);
    const updated = await loadCommandCenterProfile();
    setProfile(updated);
    alert("Salvo com sucesso ✅");
  }

  if (loading) return <div className="p-10 text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex items-center gap-6 bg-gradient-to-r from-blue-900 to-black p-6 rounded-3xl border border-white/10">

          <img
            src={profile?.photoURL || "/avatar.png"}
            className="w-20 h-20 rounded-full border-2 border-yellow-400 object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold text-yellow-400">
              {profile?.displayName}
            </h1>
            <p className="text-slate-400">@{profile?.username}</p>

            <div className="text-xs mt-2">
              ID TGPI:{" "}
              <span className="text-yellow-400 font-bold">
                {profile?.tgpiId}
              </span>
            </div>
          </div>

        </div>

        <TGPIIdentityCard profile={profile} />
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a1a2f] to-black border border-yellow-500/20">

          <div className="grid md:grid-cols-2 gap-6">

            <div className="space-y-2 text-sm">
              <p>🌎 País: {profile?.country}</p>
              <p>🌐 Idiomas: {profile?.languagePreference}</p>
              <p>🎯 Objetivo: {profile?.goal}</p>
              <p>⭐ Plano: {profile?.plan}</p>
            </div>

            <div className="flex items-center justify-center text-6xl">
              🌍
            </div>

          </div>

        </div>

        {/* TABS */}
        <div className="flex gap-3 flex-wrap">
          {["overview", "edit", "goals", "activity", "settings"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as Tab)}
              className={`px-4 py-2 rounded-xl ${
                tab === t
                  ? "bg-yellow-500 text-black"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {tab === "overview" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-white/10 rounded-2xl">
              XP: {profile?.xp || 0}
            </div>
            <div className="p-6 border border-white/10 rounded-2xl">
              Nível: {profile?.level || 1}
            </div>
            <div className="p-6 border border-white/10 rounded-2xl">
              Streak: {profile?.streak || 0}
            </div>
          </div>
        )}

        {tab === "edit" && (
          <div className="grid md:grid-cols-2 gap-4">

            <input
              value={form.displayName || ""}
              onChange={(e) =>
                setForm({ ...form, displayName: e.target.value })
              }
              placeholder="Nome"
              className="p-4 bg-black border border-white/20 rounded-xl"
            />

            <input
              value={form.username || ""}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              placeholder="Username"
              className="p-4 bg-black border border-white/20 rounded-xl"
            />

            <input
              value={form.country || ""}
              onChange={(e) =>
                setForm({ ...form, country: e.target.value })
              }
              placeholder="País 🌎"
              className="p-4 bg-black border border-white/20 rounded-xl"
            />

            <input
              value={form.languagePreference || ""}
              onChange={(e) =>
                setForm({ ...form, languagePreference: e.target.value })
              }
              placeholder="Idiomas 🌐"
              className="p-4 bg-black border border-white/20 rounded-xl"
            />

            <textarea
              value={form.bio || ""}
              onChange={(e) =>
                setForm({ ...form, bio: e.target.value })
              }
              placeholder="Biografia ✍️"
              className="p-4 bg-black border border-white/20 rounded-xl md:col-span-2"
            />

          </div>
        )}

        {tab === "goals" && (
          <div className="p-6 border border-white/10 rounded-2xl">
            🎯 Metas estratégicas em breve
          </div>
        )}

        {tab === "activity" && (
          <div className="p-6 border border-white/10 rounded-2xl">
            📊 Atividade do usuário em breve
          </div>
        )}

        {tab === "settings" && (
          <div className="p-6 border border-white/10 rounded-2xl">
            ⚙️ Configurações em breve
          </div>
        )}

        {/* ACTION */}
        <button
          onClick={handleSave}
          className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
        >
          Salvar
        </button>

      </div>
    </div>
  );
}