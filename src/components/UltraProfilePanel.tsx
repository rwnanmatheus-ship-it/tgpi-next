"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

import CommandCenterNav from "@/components/CommandCenterNav";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileAvatarUploader from "@/components/ProfileAvatarUploader";
import SaveStatusCard from "@/components/SaveStatusCard";

import {
  buildSafeProfileDefaults,
  loadCommandCenterProfile,
  saveCommandCenterProfileWithRules,
} from "@/lib/profile-command-center";

import { createUserNotification } from "@/lib/user-notifications";
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
  const [saveVisible, setSaveVisible] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveType, setSaveType] = useState<"success" | "error">("success");

  // =========================
  // AUTH + LOAD
  // =========================
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (!u) {
        setLoading(false);
        return;
      }

      const data = await loadCommandCenterProfile();
      const safe = buildSafeProfileDefaults(data);

      setProfile(data);
      setName(safe.displayName || "");
      setUsername(safe.username || "");

      setLoading(false);
    });

    return () => unsub();
  }, []);

  // =========================
  // SAVE
  // =========================
  async function handleSave() {
    if (!user) return;

    try {
      setSaving(true);

      await saveCommandCenterProfileWithRules({
        displayName: name,
        username: username,
      });

      const updated = await loadCommandCenterProfile();
      setProfile(updated);

      await createUserNotification({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
        href: "/profile",
        unread: true,
        timeLabel: "Agora",
      });

      setSaveType("success");
      setSaveMessage("Salvo com sucesso");
      setSaveVisible(true);
      setTimeout(() => setSaveVisible(false), 3000);
    } catch (e: any) {
      setSaveType("error");
      setSaveMessage(e.message || "Erro ao salvar");
      setSaveVisible(true);
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // CERTIFICATE BUTTON
  // =========================
  async function handleCreateCertificate() {
    try {
      await createTestCertificate();

      await createUserNotification({
        title: "Certificado criado",
        description: "Seu certificado TGPI foi gerado com sucesso.",
        href: "/profile",
        unread: true,
        timeLabel: "Agora",
      });

      setSaveType("success");
      setSaveMessage("Certificado criado com sucesso");
      setSaveVisible(true);
      setTimeout(() => setSaveVisible(false), 3000);
    } catch (e) {
      setSaveType("error");
      setSaveMessage("Erro ao gerar certificado");
      setSaveVisible(true);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Faça login para acessar o perfil
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        <CommandCenterNav />

        <SaveStatusCard
          visible={saveVisible}
          message={saveMessage}
          type={saveType}
        />

        {/* HEADER */}
        <section className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#020617] to-[#111827]">

          <h1 className="text-4xl font-bold text-yellow-400">
            {name || "Seu Perfil"}
          </h1>

          <p className="text-slate-400 mt-2">
            @{username || "username"}
          </p>

          {/* TGPI ID */}
          <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-white/5">
            <p className="text-xs text-slate-400">TGPI ID</p>
            <p className="text-yellow-400 font-bold text-lg">
              {profile?.tgpiId || "Gerando..."}
            </p>
          </div>

        </section>

        <ProfileTabs activeTab={tab} onChange={(value) => setTab(value)} />

        {/* CONTENT */}
        <section className="space-y-6">

          {tab === "overview" && (
            <div className="grid md:grid-cols-2 gap-6">

              <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
                <p className="text-sm text-slate-400">Nome</p>
                <p className="text-xl font-bold">{name}</p>
              </div>

              <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
                <p className="text-sm text-slate-400">Username</p>
                <p className="text-xl font-bold">@{username}</p>
              </div>

            </div>
          )}

          {tab === "edit" && (
            <div className="space-y-4">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="w-full p-4 rounded-xl bg-black border border-white/20"
              />

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-4 rounded-xl bg-black border border-white/20"
              />

            </div>
          )}

        </section>

        {/* ACTIONS */}
        <div className="flex gap-4 flex-wrap">

          <button
            onClick={handleSave}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>

          <button
            onClick={handleCreateCertificate}
            className="bg-green-500 px-6 py-3 rounded-xl font-bold"
          >
            Gerar Certificado
          </button>

          <Link
            href="/verify"
            className="border border-white/20 px-6 py-3 rounded-xl"
          >
            Verificar Certificado
          </Link>

        </div>

      </div>
    </main>
  );
}