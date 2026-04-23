"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

import {
  loadCommandCenterProfile,
  saveCommandCenterProfileWithRules,
} from "@/lib/profile-command-center";

import { createTestCertificate } from "@/lib/test-create-cert";

type TabKey = "overview" | "edit" | "goals" | "activity" | "settings";

export default function UltraProfilePanel() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState<TabKey>("overview");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [saving, setSaving] = useState(false);

  // LOAD
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (!u) {
        setLoading(false);
        return;
      }

      const data = await loadCommandCenterProfile();
      setProfile(data);

      setName(data?.displayName || "");
      setUsername(data?.username || "");

      setLoading(false);
    });

    return () => unsub();
  }, []);

  // SAVE
  async function handleSave() {
    try {
      setSaving(true);

      await saveCommandCenterProfileWithRules({
        displayName: name,
        username: username,
      });

      const updated = await loadCommandCenterProfile();
      setProfile(updated);

      alert("Salvo com sucesso");
    } catch (e: any) {
      alert(e.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateCert() {
    try {
      await createTestCertificate();
      alert("Certificado criado");
    } catch {
      alert("Erro ao criar certificado");
    }
  }

  if (loading) return <div className="p-10 text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-black border border-white/10">
          <h1 className="text-4xl font-bold text-yellow-400">
            {name || "Seu Perfil"}
          </h1>

          <p className="text-slate-400">@{username}</p>

          <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10">
            <p className="text-xs text-slate-400">ID TGPI</p>
            <p className="text-yellow-400 font-bold">
              {profile?.tgpiId || "Gerando..."}
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-3 flex-wrap">
          {["overview", "edit", "goals", "activity", "settings"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as TabKey)}
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
        <div className="grid md:grid-cols-2 gap-6">

          {tab === "overview" && (
            <>
              <div className="p-6 border border-white/10 rounded-2xl">
                <p className="text-slate-400">Nome</p>
                <p className="text-xl">{name}</p>
              </div>

              <div className="p-6 border border-white/10 rounded-2xl">
                <p className="text-slate-400">Username</p>
                <p className="text-xl">@{username}</p>
              </div>
            </>
          )}

          {tab === "edit" && (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-4 rounded-xl bg-black border border-white/20"
                placeholder="Nome"
              />

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-4 rounded-xl bg-black border border-white/20"
                placeholder="Username"
              />
            </>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>

          <button
            onClick={handleCreateCert}
            className="bg-green-500 px-6 py-3 rounded-xl font-bold"
          >
            Gerar
          </button>

          <a
            href="/verify"
            className="border border-white/20 px-6 py-3 rounded-xl"
          >
            Verificar
          </a>
        </div>

      </div>
    </div>
  );
}