"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import {
  loadCommandCenterProfile,
  saveCommandCenterProfileWithRules,
} from "@/lib/profile-command-center";

export default function UltraProfilePanel() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [goal, setGoal] = useState("");
  const [languages, setLanguages] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const data = await loadCommandCenterProfile();
      setProfile(data);

      setName(data?.displayName || "");
      setUsername(data?.username || "");
      setCountry(data?.country || "");
      setGoal(data?.goal || "");
      setLanguages(data?.languagePreference || "");

      setLoading(false);
    });

    return () => unsub();
  }, []);

  async function handleSave() {
    setSaving(true);

    await saveCommandCenterProfileWithRules({
      displayName: name,
      username,
      country,
      goal,
      languagePreference: languages,
    });

    const updated = await loadCommandCenterProfile();
    setProfile(updated);

    setSaving(false);
    alert("Perfil salvo com sucesso");
  }

  if (loading) return <div className="p-10 text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900 to-black p-8 rounded-3xl border border-white/10">
          <h1 className="text-4xl font-bold text-yellow-400">
            {name || "Seu Nome"}
          </h1>

          <p className="text-slate-400">@{username}</p>

          <div className="mt-4 text-sm text-slate-400">
            ID TGPI:{" "}
            <span className="text-yellow-400 font-bold">
              {profile?.tgpiId}
            </span>
          </div>
        </div>

        {/* TGPI CARD */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-[#0a1a2f] to-black border border-yellow-500/20 shadow-xl">

          <div className="grid md:grid-cols-2 gap-6">

            {/* LEFT */}
            <div>
              <h2 className="text-xl text-yellow-400 font-bold mb-4">
                TGPI GLOBAL IDENTITY
              </h2>

              <div className="space-y-2 text-sm">
                <p><strong>Nome:</strong> {name}</p>
                <p><strong>Username:</strong> @{username}</p>
                <p><strong>País:</strong> 🌎 {country || "Não definido"}</p>
                <p><strong>Idiomas:</strong> 🌐 {languages || "Não definido"}</p>
                <p><strong>Objetivo:</strong> 🎯 {goal || "Não definido"}</p>
                <p><strong>Status:</strong> ⭐ ELITE</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-yellow-400 text-6xl mb-4">🌍</div>

              <div className="text-xs text-slate-400 text-center">
                TGPI DIGITAL ID  
                <br />
                Global Identity Verified
              </div>
            </div>

          </div>

        </div>

        {/* EDIT */}
        <div className="grid md:grid-cols-2 gap-6">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded-xl bg-black border border-white/20"
            placeholder="Nome completo"
          />

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 rounded-xl bg-black border border-white/20"
            placeholder="Username"
          />

          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="p-4 rounded-xl bg-black border border-white/20"
            placeholder="País 🌎"
          />

          <input
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            className="p-4 rounded-xl bg-black border border-white/20"
            placeholder="Idiomas 🌐"
          />

          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="p-4 rounded-xl bg-black border border-white/20 md:col-span-2"
            placeholder="Objetivo 🎯"
          />

        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">

          <button
            onClick={handleSave}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>

          <a
            href="/verify"
            className="border border-white/20 px-6 py-3 rounded-xl"
          >
            Verificar identidade
          </a>

        </div>

      </div>
    </div>
  );
}