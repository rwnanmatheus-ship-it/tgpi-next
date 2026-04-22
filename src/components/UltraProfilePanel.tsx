"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import CommandCenterNav from "@/components/CommandCenterNav";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileAvatarUploader from "@/components/ProfileAvatarUploader";
import SaveStatusCard from "@/components/SaveStatusCard";
import ProfileCompletionEngine from "@/components/ProfileCompletionEngine";
import ProfilePublicPreview from "@/components/ProfilePublicPreview";
import ProfileSmartActions from "@/components/ProfileSmartActions";
import AccountSecurityPanel from "@/components/AccountSecurityPanel";
import LaunchReadyChecklist from "@/components/LaunchReadyChecklist";
import PlatformNotificationPanel from "@/components/PlatformNotificationPanel";
import ShareProfile from "@/components/ShareProfile";
import ProfileCompletion from "@/components/ProfileCompletion";
import SmartAdvisor from "@/components/SmartAdvisor";
import QuickStart from "@/components/QuickStart";
import OnlineNow from "@/components/OnlineNow";
import {
  buildSafeProfileDefaults,
  checkUsernameAvailability,
  CommandCenterProfile,
  loadCommandCenterProfile,
  saveCommandCenterProfileWithRules,
} from "@/lib/profile-command-center";
import {
  buildProfileCompletionItems,
  getCompletionScore,
} from "@/lib/profile-completion-engine";

type TabKey = "overview" | "edit" | "goals" | "activity" | "settings";
type ViewMode = "profile" | "dashboard";

type FormState = {
  displayName: string;
  username: string;
  bio: string;
  city: string;
  country: string;
  preferredCurrency: string;
  phone: string;
  website: string;
  instagram: string;
  linkedin: string;
  timezone: string;
  languagePreference: string;
  goal: "work" | "study" | "live" | "";
  englishLevel: "basic" | "intermediate" | "advanced" | "";
  budget: "low" | "medium" | "high" | "";
  continentInterest: string;
  notificationsEmail: boolean;
  notificationsPush: boolean;
  marketingEmails: boolean;
  profilePublic: boolean;
  showLocation: boolean;
  showProgress: boolean;
  showGoals: boolean;
  favoriteCountries: string[];
  countryGoals: string[];
  recentConversions: {
    from: string;
    to: string;
    amount: number;
    result?: number;
    date: string;
  }[];
  activity: { action: string; date: string }[];
  lastVisitedCountry: string;
  photoURL: string;
};

const initialForm: FormState = {
  displayName: "",
  username: "",
  bio: "",
  city: "",
  country: "",
  preferredCurrency: "USD",
  phone: "",
  website: "",
  instagram: "",
  linkedin: "",
  timezone: "",
  languagePreference: "English",
  goal: "",
  englishLevel: "",
  budget: "",
  continentInterest: "",
  notificationsEmail: true,
  notificationsPush: true,
  marketingEmails: false,
  profilePublic: true,
  showLocation: true,
  showProgress: true,
  showGoals: true,
  favoriteCountries: [],
  countryGoals: [],
  recentConversions: [],
  activity: [],
  lastVisitedCountry: "",
  photoURL: "",
};

function formatDate(date?: string) {
  if (!date) return "—";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function computeReadiness(profile: Partial<CommandCenterProfile> | null) {
  let score = 10;

  if (profile?.displayName || profile?.fullName) score += 8;
  if (profile?.bio) score += 8;
  if (profile?.city) score += 6;
  if (profile?.country) score += 6;
  if (profile?.photoURL) score += 6;
  if (profile?.goal) score += 10;
  if (profile?.englishLevel) score += 10;
  if (profile?.budget) score += 10;
  if (profile?.continentInterest) score += 10;
  if (profile?.favoriteCountries?.length) score += 8;
  if (profile?.countryGoals?.length) score += 8;
  if (profile?.recentConversions?.length) score += 8;
  if (profile?.activity?.length) score += 8;

  return Math.min(score, 100);
}

function readinessTier(score: number) {
  if (score >= 90) return "Ultra Elite";
  if (score >= 75) return "Elite";
  if (score >= 55) return "Advanced";
  if (score >= 35) return "Growing";
  return "Starter";
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 shadow-[0_0_35px_rgba(250,204,21,0.03)]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-yellow-400">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_20px_rgba(250,204,21,0.03)]">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-400">{hint}</p> : null}
    </div>
  );
}

function SettingToggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div>
        <p className="font-medium text-white">{label}</p>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-14 rounded-full transition ${
          checked ? "bg-yellow-500" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-8" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function UltraProfilePanel({ mode }: { mode: ViewMode }) {
  const [authReady, setAuthReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [profile, setProfile] = useState<CommandCenterProfile | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [saving, setSaving] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);
  const [saveType, setSaveType] = useState<"success" | "error">("success");
  const [saveMessage, setSaveMessage] = useState("");

  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "invalid"
  >("idle");
  const [usernameMessage, setUsernameMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthReady(true);

      if (!user) {
        setProfile(null);
        setForm(initialForm);
        return;
      }

      try {
        const loaded = await loadCommandCenterProfile();
        const safe = buildSafeProfileDefaults(loaded);

        setProfile(loaded);
        setForm({
          displayName: safe.displayName,
          username: safe.username,
          bio: safe.bio,
          city: safe.city,
          country: safe.country,
          preferredCurrency: safe.preferredCurrency,
          phone: safe.phone,
          website: safe.website,
          instagram: safe.instagram,
          linkedin: safe.linkedin,
          timezone: safe.timezone,
          languagePreference: safe.languagePreference,
          goal: safe.goal as FormState["goal"],
          englishLevel: safe.englishLevel as FormState["englishLevel"],
          budget: safe.budget as FormState["budget"],
          continentInterest: safe.continentInterest,
          notificationsEmail: safe.notificationsEmail,
          notificationsPush: safe.notificationsPush,
          marketingEmails: safe.marketingEmails,
          profilePublic: safe.profilePublic,
          showLocation: safe.showLocation,
          showProgress: safe.showProgress,
          showGoals: safe.showGoals,
          favoriteCountries: safe.favoriteCountries,
          countryGoals: safe.countryGoals,
          recentConversions: safe.recentConversions,
          activity: safe.activity,
          lastVisitedCountry: safe.lastVisitedCountry,
          photoURL: safe.photoURL,
        });
      } catch (error) {
        console.error("Failed to load ultra profile:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const timeout = setTimeout(async () => {
      if (!form.username.trim()) {
        setUsernameStatus("idle");
        setUsernameMessage("");
        return;
      }

      setUsernameStatus("checking");
      setUsernameMessage("Checking availability...");

      try {
        const result = await checkUsernameAvailability(
          form.username,
          currentUser.uid
        );

        if (result.available) {
          setUsernameStatus("available");
          const changesLeft = Math.max(
            0,
            2 - (profile?.usernameChangeCount ?? 0)
          );
          setUsernameMessage(`Username available • ${changesLeft} change(s) left`);
        } else {
          const invalid =
            result.reason?.includes("3–20") || result.reason?.includes("required");
          setUsernameStatus(invalid ? "invalid" : "taken");
          setUsernameMessage(result.reason || "Username unavailable");
        }
      } catch {
        setUsernameStatus("taken");
        setUsernameMessage("Could not verify username right now.");
      }
    }, 450);

    return () => clearTimeout(timeout);
  }, [form.username, currentUser, profile?.usernameChangeCount]);

  const displayName =
    form.displayName ||
    profile?.displayName ||
    profile?.fullName ||
    (currentUser?.email ? currentUser.email.split("@")[0] : "Global Member");

  const username =
    form.username ||
    profile?.username ||
    displayName.toLowerCase().replace(/\s+/g, "") ||
    "globaluser";

  const readiness = useMemo(() => computeReadiness(profile), [profile]);
  const tier = useMemo(() => readinessTier(readiness), [readiness]);

  const completionItems = buildProfileCompletionItems({
    ...profile,
    displayName: form.displayName,
    username: form.username,
    bio: form.bio,
    city: form.city,
    country: form.country,
    preferredCurrency: form.preferredCurrency,
    goal: form.goal || undefined,
    englishLevel: form.englishLevel || undefined,
    budget: form.budget || undefined,
    continentInterest: form.continentInterest || undefined,
    photoURL: form.photoURL || undefined,
  });
  const completionScore = getCompletionScore(completionItems);

  const notifications = [
    {
      id: "1",
      title: "Seu perfil está sincronizado",
      description: "As últimas alterações do perfil foram carregadas com sucesso.",
      time: profile?.updatedAt ? formatDate(profile.updatedAt) : "Agora",
      unread: false,
    },
    {
      id: "2",
      title: "Complete sua identidade TGPI",
      description: "Adicione bio, objetivo e fuso horário para melhorar as recomendações.",
      time: "Sugestão da plataforma",
      unread: true,
    },
    {
      id: "3",
      title: "Área de configurações ativada",
      description: "Agora você pode controlar privacidade, notificações e exibição pública.",
      time: "Atualização recente",
      unread: true,
    },
  ];

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function refreshFromDatabase() {
    const refreshed = await loadCommandCenterProfile();
    const safe = buildSafeProfileDefaults(refreshed);

    setProfile(refreshed);
    setForm({
      displayName: safe.displayName,
      username: safe.username,
      bio: safe.bio,
      city: safe.city,
      country: safe.country,
      preferredCurrency: safe.preferredCurrency,
      phone: safe.phone,
      website: safe.website,
      instagram: safe.instagram,
      linkedin: safe.linkedin,
      timezone: safe.timezone,
      languagePreference: safe.languagePreference,
      goal: safe.goal as FormState["goal"],
      englishLevel: safe.englishLevel as FormState["englishLevel"],
      budget: safe.budget as FormState["budget"],
      continentInterest: safe.continentInterest,
      notificationsEmail: safe.notificationsEmail,
      notificationsPush: safe.notificationsPush,
      marketingEmails: safe.marketingEmails,
      profilePublic: safe.profilePublic,
      showLocation: safe.showLocation,
      showProgress: safe.showProgress,
      showGoals: safe.showGoals,
      favoriteCountries: safe.favoriteCountries,
      countryGoals: safe.countryGoals,
      recentConversions: safe.recentConversions,
      activity: safe.activity,
      lastVisitedCountry: safe.lastVisitedCountry,
      photoURL: safe.photoURL,
    });
  }

  async function handleSaveProfile() {
    if (!currentUser) {
      setSaveType("error");
      setSaveMessage("You must be logged in to save changes.");
      setSaveVisible(true);
      return;
    }

    if (usernameStatus === "taken" || usernameStatus === "invalid") {
      setSaveType("error");
      setSaveMessage("Choose an available and valid username before saving.");
      setSaveVisible(true);
      return;
    }

    setSaving(true);
    setSaveVisible(false);

    try {
      await saveCommandCenterProfileWithRules({
        displayName: form.displayName.trim(),
        username: form.username.trim(),
        bio: form.bio.trim(),
        city: form.city.trim(),
        country: form.country.trim(),
        preferredCurrency: form.preferredCurrency,
        phone: form.phone.trim(),
        website: form.website.trim(),
        instagram: form.instagram.trim(),
        linkedin: form.linkedin.trim(),
        timezone: form.timezone.trim(),
        languagePreference: form.languagePreference.trim(),
        goal: form.goal || undefined,
        englishLevel: form.englishLevel || undefined,
        budget: form.budget || undefined,
        continentInterest: form.continentInterest.trim() || undefined,
        notificationsEmail: form.notificationsEmail,
        notificationsPush: form.notificationsPush,
        marketingEmails: form.marketingEmails,
        profilePublic: form.profilePublic,
        showLocation: form.showLocation,
        showProgress: form.showProgress,
        showGoals: form.showGoals,
        photoURL: form.photoURL || undefined,
      });

      await refreshFromDatabase();

      setSaveType("success");
      setSaveMessage("Your profile, settings, username, and preferences were saved successfully.");
      setSaveVisible(true);
      setTimeout(() => setSaveVisible(false), 3200);
    } catch (error: any) {
      console.error("Failed to save profile:", error);
      setSaveType("error");
      setSaveMessage(error?.message || "We could not save your changes. Please try again.");
      setSaveVisible(true);
    } finally {
      setSaving(false);
    }
  }

  async function persistAvatar(url: string) {
    updateField("photoURL", url);

    try {
      await saveCommandCenterProfileWithRules({ photoURL: url });
      await refreshFromDatabase();

      setSaveType("success");
      setSaveMessage("Your new profile photo was saved successfully.");
      setSaveVisible(true);
      setTimeout(() => setSaveVisible(false), 3200);
    } catch (error: any) {
      console.error("Failed to persist avatar:", error);
      setSaveType("error");
      setSaveMessage(error?.message || "Your photo preview changed, but saving failed.");
      setSaveVisible(true);
    }
  }

  if (!authReady) {
    return (
      <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)] p-10">
            <p className="text-lg text-slate-300">Loading your premium command center...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6 md:py-10">
        <div className="mx-auto max-w-4xl">
          <section className="rounded-[30px] border border-yellow-500/15 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)] p-10">
            <p className="mb-3 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
              TGPI Identity Access
            </p>
            <h1 className="text-4xl font-bold text-yellow-400">
              Sign in to access your ultra profile
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Your account was not found in the active session. Sign in to restore the full command center.
            </p>
            <div className="mt-8">
              <Link
                href="/login"
                className="rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-400 px-6 py-3 font-semibold text-black transition hover:brightness-105"
              >
                Go to Login
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <CommandCenterNav />

        <section className="rounded-[32px] border border-yellow-500/15 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)] p-6 shadow-[0_0_60px_rgba(250,204,21,0.05)] md:p-8">
          <div className="grid gap-8 xl:grid-cols-[1.24fr_.76fr]">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
                {mode === "profile" ? "Launch Profile Center" : "Launch Dashboard Center"}
              </p>

              <h1 className="text-4xl font-bold text-white md:text-5xl">{displayName}</h1>
              <p className="mt-2 text-slate-300">@{username}</p>
              {currentUser.email ? <p className="mt-1 text-sm text-slate-400">{currentUser.email}</p> : null}

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
                {form.bio ||
                  "Seu perfil TGPI agora está organizado para lançamento: identidade, prontidão, preferências, privacidade e ação em um único ambiente premium."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Prontidão" value={`${readiness}/100`} hint={tier} />
                <StatCard label="Favoritos" value={form.favoriteCountries.length} hint="Países salvos" />
                <StatCard label="Metas" value={form.countryGoals.length} hint="Objetivos estratégicos" />
                <StatCard label="Atualizado" value={profile?.updatedAt ? "Sincronizado" : "Pendente"} hint="Persistência" />
              </div>
            </div>

            <div className="space-y-5">
              <ProfileAvatarUploader
                currentAvatar={form.photoURL}
                displayName={displayName}
                loading={saving}
                onAvatarSelected={persistAvatar}
              />

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_25px_rgba(250,204,21,0.03)]">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Visão geral da conta
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3">
                    <span className="text-slate-400">Plano</span>
                    <span className="font-semibold text-white">{profile?.plan || "FREE"}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3">
                    <span className="text-slate-400">XP</span>
                    <span className="font-semibold text-white">{profile?.xp ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3">
                    <span className="text-slate-400">Nível</span>
                    <span className="font-semibold text-white">{profile?.level ?? 1}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3">
                    <span className="text-slate-400">Ondas</span>
                    <span className="font-semibold text-white">{profile?.streak ?? 0} dias</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3">
                    <span className="text-slate-400">Alterações de username</span>
                    <span className="font-semibold text-white">
                      {profile?.usernameChangeCount ?? 0}/2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SaveStatusCard message={saveMessage} visible={saveVisible} type={saveType} />

        <ShareProfile username={username} />
        <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="grid gap-8 xl:grid-cols-[1.24fr_.76fr]">
          <div className="space-y-8">
            <ProfileCompletionEngine
              profile={{
                ...profile,
                displayName: form.displayName,
                username: form.username,
                bio: form.bio,
                city: form.city,
                country: form.country,
                preferredCurrency: form.preferredCurrency,
                goal: form.goal || undefined,
                englishLevel: form.englishLevel || undefined,
                budget: form.budget || undefined,
                continentInterest: form.continentInterest || undefined,
                photoURL: form.photoURL || undefined,
              }}
              onOpenTab={(tab) => setActiveTab(tab)}
            />

            {activeTab === "overview" && (
              <>
                <Section
                  title="Visão geral"
                  subtitle="As informações mais importantes primeiro, com mais clareza e valor real."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">🪪 Nome de exibição</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.displayName || "Não definido"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">🔖 Username</p>
                      <p className="mt-3 text-lg font-semibold text-white">@{username}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">📍 Localização</p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {[form.city, form.country].filter(Boolean).join(", ") || "Não definida"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">💱 Moeda preferida</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.preferredCurrency}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">🎯 Objetivo principal</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.goal || "Não definido"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">🌍 Continente de interesse</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.continentInterest || "Não definido"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">📝 Bio</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{form.bio || "Nenhuma bio definida ainda."}</p>
                    </div>
                  </div>
                </Section>

                <ProfilePublicPreview
                  displayName={displayName}
                  username={username}
                  bio={form.bio}
                  avatar={form.photoURL}
                  city={form.city}
                  country={form.country}
                  showLocation={form.showLocation}
                  showProgress={form.showProgress}
                  showGoals={form.showGoals}
                  goal={form.goal || ""}
                  readinessLabel={tier}
                />
              </>
            )}

            {activeTab === "edit" && (
              <Section
                title="Editar perfil"
                subtitle="Os campos centrais da identidade do usuário em um único lugar."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">🪪 Nome completo / exibição</label>
                    <input
                      value={form.displayName}
                      onChange={(e) => updateField("displayName", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">🔖 Username</label>
                    <input
                      value={form.username}
                      onChange={(e) => updateField("username", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                    <p
                      className={`mt-2 text-xs ${
                        usernameStatus === "available"
                          ? "text-emerald-300"
                          : usernameStatus === "checking"
                          ? "text-yellow-300"
                          : usernameStatus === "taken" || usernameStatus === "invalid"
                          ? "text-red-300"
                          : "text-slate-400"
                      }`}
                    >
                      {usernameMessage || "Você pode alterar o username no máximo 2 vezes na vida."}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-slate-300">📝 Bio</label>
                    <textarea
                      rows={4}
                      value={form.bio}
                      onChange={(e) => updateField("bio", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">📍 Cidade</label>
                    <input
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">🌎 País</label>
                    <input
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">📞 Telefone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">🌐 Website</label>
                    <input
                      value={form.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">📸 Instagram</label>
                    <input
                      value={form.instagram}
                      onChange={(e) => updateField("instagram", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">💼 LinkedIn</label>
                    <input
                      value={form.linkedin}
                      onChange={(e) => updateField("linkedin", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>
                </div>
              </Section>
            )}

            {activeTab === "goals" && (
              <Section
                title="Metas e preferências"
                subtitle="Campos centrais que deixam a TGPI muito mais inteligente para o usuário."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">💱 Moeda preferida</label>
                    <select
                      value={form.preferredCurrency}
                      onChange={(e) => updateField("preferredCurrency", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    >
                      <option value="USD">USD</option>
                      <option value="BRL">BRL</option>
                      <option value="EUR">EUR</option>
                      <option value="JPY">JPY</option>
                      <option value="EGP">EGP</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">🎯 Objetivo principal</label>
                    <select
                      value={form.goal}
                      onChange={(e) => updateField("goal", e.target.value as FormState["goal"])}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    >
                      <option value="">Selecionar</option>
                      <option value="work">💼 Trabalhar fora</option>
                      <option value="study">🎓 Estudar fora</option>
                      <option value="live">🏡 Morar fora</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">🗣️ Nível de inglês</label>
                    <select
                      value={form.englishLevel}
                      onChange={(e) =>
                        updateField("englishLevel", e.target.value as FormState["englishLevel"])
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    >
                      <option value="">Selecionar</option>
                      <option value="basic">🟡 Basic</option>
                      <option value="intermediate">🟠 Intermediate</option>
                      <option value="advanced">🟢 Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">💸 Nível de orçamento</label>
                    <select
                      value={form.budget}
                      onChange={(e) => updateField("budget", e.target.value as FormState["budget"])}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    >
                      <option value="">Selecionar</option>
                      <option value="low">🔹 Low</option>
                      <option value="medium">🔸 Medium</option>
                      <option value="high">💎 High</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">🌍 Continente de interesse</label>
                    <input
                      value={form.continentInterest}
                      onChange={(e) => updateField("continentInterest", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                      placeholder="Europa, Ásia, América do Norte..."
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">🌐 Idioma da plataforma</label>
                    <select
                      value={form.languagePreference}
                      onChange={(e) => updateField("languagePreference", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    >
                      <option value="Português 🇧🇷">Português 🇧🇷</option>
                      <option value="English 🇺🇸">English 🇺🇸</option>
                      <option value="Español 🇪🇸">Español 🇪🇸</option>
                      <option value="Français 🇫🇷">Français 🇫🇷</option>
                      <option value="Deutsch 🇩🇪">Deutsch 🇩🇪</option>
                      <option value="Italiano 🇮🇹">Italiano 🇮🇹</option>
                      <option value="العربية 🇸🇦">العربية 🇸🇦</option>
                      <option value="日本語 🇯🇵">日本語 🇯🇵</option>
                      <option value="한국어 🇰🇷">한국어 🇰🇷</option>
                      <option value="中文 🇨🇳">中文 🇨🇳</option>
                      <option value="हिन्दी 🇮🇳">हिन्दी 🇮🇳</option>
                      <option value="Русский 🇷🇺">Русский 🇷🇺</option>
                    </select>
                  </div>
                </div>
              </Section>
            )}

            {activeTab === "activity" && (
              <Section
                title="Atividade"
                subtitle="Histórico operacional claro e pronto para uso real."
              >
                <div className="space-y-3">
                  {form.activity.length ? (
                    form.activity
                      .slice()
                      .reverse()
                      .slice(0, 10)
                      .map((item, index) => (
                        <div
                          key={`${item.action}-${item.date}-${index}`}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                        >
                          <p className="font-medium text-white">{item.action}</p>
                          <p className="mt-1 text-sm text-slate-400">{formatDate(item.date)}</p>
                        </div>
                      ))
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
                      Nenhuma atividade rastreada ainda.
                    </div>
                  )}
                </div>
              </Section>
            )}

            {activeTab === "settings" && (
              <Section
                title="Configurações e privacidade"
                subtitle="Controles reais para notificações, visibilidade e experiência da conta."
              >
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-slate-300">🕒 Fuso horário</label>
                      <input
                        value={form.timezone}
                        onChange={(e) => updateField("timezone", e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                        placeholder="America/Sao_Paulo"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-slate-300">🌐 Idioma preferido</label>
                      <input
                        value={form.languagePreference}
                        onChange={(e) => updateField("languagePreference", e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                      />
                    </div>
                  </div>

                  <SettingToggle
                    checked={form.notificationsEmail}
                    onChange={(value) => updateField("notificationsEmail", value)}
                    label="📧 Notificações por email"
                    description="Receba atualizações importantes da conta e da plataforma."
                  />
                  <SettingToggle
                    checked={form.notificationsPush}
                    onChange={(value) => updateField("notificationsPush", value)}
                    label="🔔 Notificações da plataforma"
                    description="Receba alertas e lembretes dentro da experiência TGPI."
                  />
                  <SettingToggle
                    checked={form.marketingEmails}
                    onChange={(value) => updateField("marketingEmails", value)}
                    label="📰 Novidades e lançamentos"
                    description="Receba atualizações sobre recursos, novidades e melhorias."
                  />
                  <SettingToggle
                    checked={form.profilePublic}
                    onChange={(value) => updateField("profilePublic", value)}
                    label="🌍 Perfil público"
                    description="Permite que seu perfil seja encontrado na TGPI."
                  />
                  <SettingToggle
                    checked={form.showLocation}
                    onChange={(value) => updateField("showLocation", value)}
                    label="📍 Mostrar localização"
                    description="Exibe sua cidade e país no perfil público."
                  />
                  <SettingToggle
                    checked={form.showProgress}
                    onChange={(value) => updateField("showProgress", value)}
                    label="📈 Mostrar progresso"
                    description="Exibe seu nível de prontidão no perfil público."
                  />
                  <SettingToggle
                    checked={form.showGoals}
                    onChange={(value) => updateField("showGoals", value)}
                    label="🎯 Mostrar metas"
                    description="Exibe objetivo principal no perfil público."
                  />
                </div>
              </Section>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-400 px-6 py-3 font-semibold text-black transition hover:brightness-105"
              >
                {saving ? "Salvando..." : "Salvar todas as alterações"}
              </button>

              <Link
                href="/countries"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:border-yellow-500/30 hover:text-yellow-300"
              >
                Explorar países
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <ProfileCompletion />
            <SmartAdvisor />
            <QuickStart />
            <OnlineNow />

            <PlatformNotificationPanel notifications={notifications} />

            <ProfileSmartActions
              hasAvatar={Boolean(form.photoURL)}
              hasGoal={Boolean(form.goal)}
              hasBio={Boolean(form.bio)}
              completionScore={completionScore}
            />

            <AccountSecurityPanel
              email={currentUser.email || ""}
              updatedAt={profile?.updatedAt || ""}
            />

            <LaunchReadyChecklist
              hasAvatar={Boolean(form.photoURL)}
              hasDisplayName={Boolean(form.displayName)}
              hasUsername={Boolean(form.username)}
              hasBio={Boolean(form.bio)}
              hasGoal={Boolean(form.goal)}
              hasCurrency={Boolean(form.preferredCurrency)}
              hasTimezone={Boolean(form.timezone)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}