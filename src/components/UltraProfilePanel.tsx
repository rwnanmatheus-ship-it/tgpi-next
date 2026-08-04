"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import TGPIIdentityCard from "@/components/TGPIIdentityCard";
import { auth } from "@/lib/firebase";
import {
  loadCommandCenterProfile,
  saveCommandCenterProfileWithRules,
} from "@/lib/profile-command-center";
import type { UserData } from "@/types";

type Tab = "overview" | "edit" | "goals" | "activity" | "settings";

type CommandCenterProfile = UserData & {
  country?: string;
  languagePreference?: string;
  goal?: string;
  streak?: number;
};

export default function UltraProfilePanel() {
  const [profile, setProfile] = useState<CommandCenterProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [form, setForm] = useState<Partial<CommandCenterProfile>>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setProfile(null);
        setForm({});
        setLoading(false);
        return;
      }

      const data = (await loadCommandCenterProfile()) as CommandCenterProfile | null;
      setProfile(data);
      setForm(data || {});
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function handleSave() {
    await saveCommandCenterProfileWithRules(form);
    const updated = (await loadCommandCenterProfile()) as CommandCenterProfile | null;
    setProfile(updated);
    alert("Saved successfully ✅");
  }

  function updateForm<K extends keyof CommandCenterProfile>(
    field: K,
    value: CommandCenterProfile[K]
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900 to-black p-6">
          <img
            src={profile?.photoURL || "/avatar.png"}
            alt="TGPI member avatar"
            className="h-20 w-20 rounded-full border-2 border-yellow-400 object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">
              {profile?.displayName || profile?.name || "TGPI Member"}
            </h1>
            <p className="text-slate-400">@{profile?.username || "username"}</p>
            <div className="mt-2 text-xs">
              TGPI ID:{" "}
              <span className="font-bold text-yellow-400">
                {profile?.tgpiId || "TGPI-ID"}
              </span>
            </div>
          </div>
        </div>

        <TGPIIdentityCard profile={profile} />

        <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-[#0a1a2f] to-black p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 text-sm">
              <p>🌎 Country: {profile?.country || profile?.currentCountry}</p>
              <p>🌐 Languages: {profile?.languagePreference}</p>
              <p>🎯 Goal: {profile?.goal || profile?.travelIntent}</p>
              <p>⭐ Plan: {profile?.plan}</p>
            </div>
            <div className="flex items-center justify-center text-6xl">🌍</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {(["overview", "edit", "goals", "activity", "settings"] as const).map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`rounded-xl px-4 py-2 ${
                  tab === item
                    ? "bg-yellow-500 text-black"
                    : "border border-white/10 bg-white/5"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        {tab === "overview" && (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-6">XP: {profile?.xp || 0}</div>
            <div className="rounded-2xl border border-white/10 p-6">Level: {profile?.level || 1}</div>
            <div className="rounded-2xl border border-white/10 p-6">Streak: {profile?.streak || 0}</div>
          </div>
        )}

        {tab === "edit" && (
          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={form.displayName || ""}
              onChange={(event) => updateForm("displayName", event.target.value)}
              placeholder="Name"
              className="rounded-xl border border-white/20 bg-black p-4"
            />
            <input
              value={form.username || ""}
              onChange={(event) => updateForm("username", event.target.value)}
              placeholder="Username"
              className="rounded-xl border border-white/20 bg-black p-4"
            />
            <input
              value={form.country || ""}
              onChange={(event) => updateForm("country", event.target.value)}
              placeholder="Country 🌎"
              className="rounded-xl border border-white/20 bg-black p-4"
            />
            <input
              value={form.languagePreference || ""}
              onChange={(event) => updateForm("languagePreference", event.target.value)}
              placeholder="Languages 🌐"
              className="rounded-xl border border-white/20 bg-black p-4"
            />
            <textarea
              value={form.bio || ""}
              onChange={(event) => updateForm("bio", event.target.value)}
              placeholder="Bio ✍🏼"
              className="rounded-xl border border-white/20 bg-black p-4 md:col-span-2"
            />
          </div>
        )}

        {tab === "goals" && (
          <div className="rounded-2xl border border-white/10 p-6">
            🎯 Strategic goals coming soon
          </div>
        )}
        {tab === "activity" && (
          <div className="rounded-2xl border border-white/10 p-6">
            📊 User activity coming soon
          </div>
        )}
        {tab === "settings" && (
          <div className="rounded-2xl border border-white/10 p-6">
            ⚙️ Settings coming soon
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
        >
          Save
        </button>
      </div>
    </div>
  );
}
