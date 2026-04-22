"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import CommandCenterNav from "@/components/CommandCenterNav";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileAvatarUploader from "@/components/ProfileAvatarUploader";
import SaveStatusCard from "@/components/SaveStatusCard";
import ShareProfile from "@/components/ShareProfile";
import ProfileCompletion from "@/components/ProfileCompletion";
import SmartAdvisor from "@/components/SmartAdvisor";
import QuickStart from "@/components/QuickStart";
import OnlineNow from "@/components/OnlineNow";
import {
  buildSafeProfileDefaults,
  loadCommandCenterProfile,
  saveCommandCenterProfile,
  CommandCenterProfile,
} from "@/lib/profile-command-center";

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
  profilePublic: boolean;
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
  profilePublic: true,
  favoriteCountries: [],
  countryGoals: [],
  recentConversions: [],
  activity: [],
  lastVisitedCountry: "",
};

function formatDate(date?: string) {
  if (!date) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
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
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 shadow-[0_0_35px_rgba(250,204,21,0.03)] backdrop-blur-sm">
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
  const [avatar, setAvatar] = useState("");

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
        setAvatar(safe.photoURL || "");
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
          profilePublic: safe.profilePublic,
          favoriteCountries: safe.favoriteCountries,
          countryGoals: safe.countryGoals,
          recentConversions: safe.recentConversions,
          activity: safe.activity,
          lastVisitedCountry: safe.lastVisitedCountry,
        });
      } catch (error) {
        console.error("Failed to load ultra profile:", error);
      }
    });

    return () => unsubscribe();
  }, []);

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

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSaveProfile() {
    if (!currentUser) {
      setSaveType("error");
      setSaveMessage("You must be logged in to save changes.");
      setSaveVisible(true);
      return;
    }

    setSaving(true);
    setSaveVisible(false);

    try {
      const payload: Partial<CommandCenterProfile> = {
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
        profilePublic: form.profilePublic,
      };

      await saveCommandCenterProfile(payload);

      const refreshed = await loadCommandCenterProfile();
      const safe = buildSafeProfileDefaults(refreshed);

      setProfile(refreshed);
      setForm((prev) => ({
        ...prev,
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
        profilePublic: safe.profilePublic,
        favoriteCountries: safe.favoriteCountries,
        countryGoals: safe.countryGoals,
        recentConversions: safe.recentConversions,
        activity: safe.activity,
        lastVisitedCountry: safe.lastVisitedCountry,
      }));

      setSaveType("success");
      setSaveMessage("Your profile, settings, and preferences were saved successfully.");
      setSaveVisible(true);
      setTimeout(() => setSaveVisible(false), 3200);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSaveType("error");
      setSaveMessage("We could not save your changes. Please try again.");
      setSaveVisible(true);
    } finally {
      setSaving(false);
    }
  }

  async function persistAvatar(url: string) {
    try {
      await saveCommandCenterProfile({ photoURL: url });
      const refreshed = await loadCommandCenterProfile();
      setProfile(refreshed);
      setAvatar(url);
      setSaveType("success");
      setSaveMessage("Your new profile photo was saved successfully.");
      setSaveVisible(true);
      setTimeout(() => setSaveVisible(false), 3200);
    } catch (error) {
      console.error("Failed to persist avatar:", error);
      setSaveType("error");
      setSaveMessage("Your photo preview changed, but saving failed.");
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
          <div className="grid gap-8 xl:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
                {mode === "profile" ? "Ultra Intelligent Profile" : "Ultra Intelligent Dashboard"}
              </p>

              <h1 className="text-4xl font-bold text-white md:text-5xl">{displayName}</h1>
              <p className="mt-2 text-slate-300">@{username}</p>
              {currentUser.email ? (
                <p className="mt-1 text-sm text-slate-400">{currentUser.email}</p>
              ) : null}

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
                {form.bio ||
                  "Your TGPI command center now prioritizes identity, readiness, configuration, and action in a single premium environment."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Readiness" value={`${readiness}/100`} hint={tier} />
                <StatCard label="Favorites" value={form.favoriteCountries.length} hint="Saved countries" />
                <StatCard label="Goals" value={form.countryGoals.length} hint="Strategic goals" />
                <StatCard label="Conversions" value={form.recentConversions.length} hint="Financial signals" />
              </div>
            </div>

            <div className="space-y-5">
              <ProfileAvatarUploader
                currentAvatar={avatar}
                displayName={displayName}
                onAvatarSaved={persistAvatar}
              />

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_25px_rgba(250,204,21,0.03)]">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Account Overview
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3">
                    <span className="text-slate-400">Plan</span>
                    <span className="font-semibold text-white">{profile?.plan || "FREE"}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3">
                    <span className="text-slate-400">XP</span>
                    <span className="font-semibold text-white">{profile?.xp ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3">
                    <span className="text-slate-400">Level</span>
                    <span className="font-semibold text-white">{profile?.level ?? 1}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-3">
                    <span className="text-slate-400">Streak</span>
                    <span className="font-semibold text-white">{profile?.streak ?? 0} days</span>
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
            {activeTab === "overview" && (
              <>
                <Section
                  title="Vision Overview"
                  subtitle="The most important information first: identity, location, direction and readiness."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Display Name</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.displayName || "Not defined"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Username</p>
                      <p className="mt-3 text-lg font-semibold text-white">@{username}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Location</p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {[form.city, form.country].filter(Boolean).join(", ") || "Not defined"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Preferred Currency</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.preferredCurrency}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Main Goal</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.goal || "Not defined"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Continent Interest</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.continentInterest || "Not defined"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Bio</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {form.bio || "No bio defined yet."}
                      </p>
                    </div>
                  </div>
                </Section>

                <Section
                  title="Signals and Strategic Context"
                  subtitle="Real signals that make the profile useful instead of decorative."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Favorite Countries</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {form.favoriteCountries.length ? (
                          form.favoriteCountries.map((country) => (
                            <span
                              key={country}
                              className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200"
                            >
                              {country}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">No favorites yet</span>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Country Goals</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {form.countryGoals.length ? (
                          form.countryGoals.map((goal) => (
                            <span
                              key={goal}
                              className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white"
                            >
                              {goal}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">No goals yet</span>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Last Visited Country</p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {form.lastVisitedCountry || "Not defined"}
                      </p>
                    </div>
                  </div>
                </Section>
              </>
            )}

            {activeTab === "edit" && (
              <Section
                title="Edit Full Profile"
                subtitle="A more complete and premium editing layer, organized by importance."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Display Name</label>
                    <input
                      value={form.displayName}
                      onChange={(e) => updateField("displayName", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Username</label>
                    <input
                      value={form.username}
                      onChange={(e) => updateField("username", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-slate-300">Bio</label>
                    <textarea
                      rows={4}
                      value={form.bio}
                      onChange={(e) => updateField("bio", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">City</label>
                    <input
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Country</label>
                    <input
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Website</label>
                    <input
                      value={form.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Instagram</label>
                    <input
                      value={form.instagram}
                      onChange={(e) => updateField("instagram", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">LinkedIn</label>
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
                title="Goals and Intelligence Preferences"
                subtitle="The profile becomes truly smart when these preference fields are completed well."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Preferred Currency</label>
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
                    <label className="mb-2 block text-sm text-slate-300">Main Goal</label>
                    <select
                      value={form.goal}
                      onChange={(e) => updateField("goal", e.target.value as FormState["goal"])}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    >
                      <option value="">Select</option>
                      <option value="work">Work Abroad</option>
                      <option value="study">Study Abroad</option>
                      <option value="live">Live Abroad</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">English Level</label>
                    <select
                      value={form.englishLevel}
                      onChange={(e) =>
                        updateField("englishLevel", e.target.value as FormState["englishLevel"])
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    >
                      <option value="">Select</option>
                      <option value="basic">Basic</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Budget Level</label>
                    <select
                      value={form.budget}
                      onChange={(e) => updateField("budget", e.target.value as FormState["budget"])}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                    >
                      <option value="">Select</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-slate-300">Continent of Interest</label>
                    <input
                      value={form.continentInterest}
                      onChange={(e) => updateField("continentInterest", e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                      placeholder="Europe, Asia, North America..."
                    />
                  </div>
                </div>
              </Section>
            )}

            {activeTab === "activity" && (
              <Section
                title="Activity Timeline"
                subtitle="A stronger and more useful operational history with the newest actions first."
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
                      No activity tracked yet.
                    </div>
                  )}
                </div>
              </Section>
            )}

            {activeTab === "settings" && (
              <Section
                title="Settings and Controls"
                subtitle="A more complete and real settings layer inspired by top-tier products."
              >
                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-slate-300">Timezone</label>
                      <input
                        value={form.timezone}
                        onChange={(e) => updateField("timezone", e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-yellow-500/40"
                        placeholder="America/Sao_Paulo"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-slate-300">Language Preference</label>
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
                    label="Email Notifications"
                    description="Receive important updates and account communications by email."
                  />

                  <SettingToggle
                    checked={form.notificationsPush}
                    onChange={(value) => updateField("notificationsPush", value)}
                    label="Platform Notifications"
                    description="Receive alerts and activity prompts inside the TGPI experience."
                  />

                  <SettingToggle
                    checked={form.profilePublic}
                    onChange={(value) => updateField("profilePublic", value)}
                    label="Public Profile"
                    description="Allow your profile to appear more openly in social and discovery features."
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
                {saving ? "Saving..." : "Save All Changes"}
              </button>

              <Link
                href="/countries"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 font-semibold text-white transition hover:border-yellow-500/30 hover:text-yellow-300"
              >
                Explore Countries
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <ProfileCompletion />
            <SmartAdvisor />
            <QuickStart />
            <OnlineNow />

            <Section
              title="Fast Actions"
              subtitle="Strategically positioned shortcuts for both desktop and mobile."
            >
              <div className="space-y-3">
                <Link
                  href="/premium"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-500/30"
                >
                  <p className="font-semibold text-white">Upgrade Plan</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Unlock stronger premium value and advanced intelligence.
                  </p>
                </Link>

                <Link
                  href="/ranking"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-500/30"
                >
                  <p className="font-semibold text-white">Check Ranking</p>
                  <p className="mt-1 text-sm text-slate-400">
                    View your position inside TGPI progression.
                  </p>
                </Link>

                <Link
                  href="/community"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-yellow-500/30"
                >
                  <p className="font-semibold text-white">Open Community</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Connect your identity to the social layer of the platform.
                  </p>
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}