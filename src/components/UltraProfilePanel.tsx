"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getUserMemory, updateUserMemory } from "@/lib/user-memory";
import CommandCenterNav from "@/components/CommandCenterNav";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileAvatarUploader from "@/components/ProfileAvatarUploader";
import ShareProfile from "@/components/ShareProfile";
import ProfileCompletion from "@/components/ProfileCompletion";
import SmartAdvisor from "@/components/SmartAdvisor";
import QuickStart from "@/components/QuickStart";
import OnlineNow from "@/components/OnlineNow";

type TabKey = "overview" | "edit" | "goals" | "activity" | "settings";
type ViewMode = "profile" | "dashboard";

type UserDoc = {
  username?: string;
  displayName?: string;
  fullName?: string;
  bio?: string;
  photoURL?: string;
  city?: string;
  country?: string;
  preferredCurrency?: string;
  plan?: string;
  xp?: number;
  level?: number;
  streak?: number;
  phone?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  timezone?: string;
  languagePreference?: string;
  notificationsEmail?: boolean;
  notificationsPush?: boolean;
  profilePublic?: boolean;
};

type MemoryShape = {
  preferredCurrency?: string;
  favoriteCountries?: string[];
  lastVisitedCountry?: string;
  recentConversions?: {
    from: string;
    to: string;
    amount: number;
    result?: number;
    date: string;
  }[];
  countryGoals?: string[];
  activity?: { action: string; date: string }[];
  goal?: "work" | "study" | "live";
  englishLevel?: "basic" | "intermediate" | "advanced";
  budget?: "low" | "medium" | "high";
  continentInterest?: string;
};

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

function computeReadiness(memory: MemoryShape | null, profile: UserDoc | null) {
  let score = 10;

  if (profile?.displayName || profile?.fullName) score += 8;
  if (profile?.bio) score += 8;
  if (profile?.city) score += 6;
  if (profile?.country) score += 6;
  if (profile?.photoURL) score += 6;
  if (memory?.goal) score += 10;
  if (memory?.englishLevel) score += 10;
  if (memory?.budget) score += 10;
  if (memory?.continentInterest) score += 10;
  if (memory?.favoriteCountries?.length) score += 8;
  if (memory?.countryGoals?.length) score += 8;
  if (memory?.recentConversions?.length) score += 8;
  if (memory?.activity?.length) score += 8;

  return Math.min(score, 100);
}

function readinessTier(score: number) {
  if (score >= 90) return "Ultra Elite";
  if (score >= 75) return "Elite";
  if (score >= 55) return "Advanced";
  if (score >= 35) return "Growing";
  return "Starter";
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
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-400">{hint}</p> : null}
    </div>
  );
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
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-yellow-400">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {children}
    </section>
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
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
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
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [profile, setProfile] = useState<UserDoc | null>(null);
  const [memory, setMemory] = useState<MemoryShape | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    async function load() {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      setEmail(user.email || "");
      setUid(user.uid);

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const userData = snap.exists() ? (snap.data() as UserDoc) : null;
        setProfile(userData);
        setAvatar(userData?.photoURL || "");

        const memoryData = (await getUserMemory()) as MemoryShape | null;
        setMemory(memoryData);

        setForm({
          displayName: userData?.displayName || userData?.fullName || "",
          username: userData?.username || "",
          bio: userData?.bio || "",
          city: userData?.city || "",
          country: userData?.country || "",
          preferredCurrency:
            userData?.preferredCurrency || memoryData?.preferredCurrency || "USD",
          phone: userData?.phone || "",
          website: userData?.website || "",
          instagram: userData?.instagram || "",
          linkedin: userData?.linkedin || "",
          timezone: userData?.timezone || "",
          languagePreference: userData?.languagePreference || "English",
          goal: memoryData?.goal || "",
          englishLevel: memoryData?.englishLevel || "",
          budget: memoryData?.budget || "",
          continentInterest: memoryData?.continentInterest || "",
          notificationsEmail: userData?.notificationsEmail ?? true,
          notificationsPush: userData?.notificationsPush ?? true,
          profilePublic: userData?.profilePublic ?? true,
        });
      } catch (error) {
        console.error("Failed to load command center:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const displayName =
    form.displayName ||
    profile?.displayName ||
    profile?.fullName ||
    (email ? email.split("@")[0] : "Global Member");

  const username =
    form.username ||
    profile?.username ||
    displayName.toLowerCase().replace(/\s+/g, "") ||
    "globaluser";

  const readiness = useMemo(() => computeReadiness(memory, profile), [memory, profile]);
  const tier = useMemo(() => readinessTier(readiness), [readiness]);

  const favorites = memory?.favoriteCountries || [];
  const goals = memory?.countryGoals || [];
  const conversions = memory?.recentConversions || [];
  const activity = memory?.activity || [];

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSaveProfile() {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    setSaving(true);
    setSaveMessage("");

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          displayName: form.displayName,
          username: form.username,
          bio: form.bio,
          city: form.city,
          country: form.country,
          preferredCurrency: form.preferredCurrency,
          phone: form.phone,
          website: form.website,
          instagram: form.instagram,
          linkedin: form.linkedin,
          timezone: form.timezone,
          languagePreference: form.languagePreference,
          notificationsEmail: form.notificationsEmail,
          notificationsPush: form.notificationsPush,
          profilePublic: form.profilePublic,
        },
        { merge: true }
      );

      await updateUserMemory({
        preferredCurrency: form.preferredCurrency,
        goal: form.goal || undefined,
        englishLevel: form.englishLevel || undefined,
        budget: form.budget || undefined,
        continentInterest: form.continentInterest || undefined,
      });

      setProfile((prev) => ({
        ...(prev || {}),
        displayName: form.displayName,
        username: form.username,
        bio: form.bio,
        city: form.city,
        country: form.country,
        preferredCurrency: form.preferredCurrency,
        phone: form.phone,
        website: form.website,
        instagram: form.instagram,
        linkedin: form.linkedin,
        timezone: form.timezone,
        languagePreference: form.languagePreference,
        notificationsEmail: form.notificationsEmail,
        notificationsPush: form.notificationsPush,
        profilePublic: form.profilePublic,
      }));

      setMemory((prev) => ({
        ...(prev || {}),
        preferredCurrency: form.preferredCurrency,
        goal: form.goal || undefined,
        englishLevel: form.englishLevel || undefined,
        budget: form.budget || undefined,
        continentInterest: form.continentInterest || undefined,
      }));

      setSaveMessage("Profile saved successfully.");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSaveMessage("Could not save profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-10">
            <p className="text-lg text-slate-300">Loading ultra profile command center...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!auth.currentUser) {
    return (
      <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6 md:py-10">
        <div className="mx-auto max-w-4xl">
          <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-10">
            <p className="mb-3 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
              TGPI Identity Access
            </p>
            <h1 className="text-4xl font-bold text-yellow-400">
              Sign in to access your ultra profile
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Your profile is now a premium intelligence layer with editing, settings, goals, and global progress.
            </p>
            <div className="mt-8">
              <Link
                href="/login"
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
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

        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-950 p-6 md:p-8">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
                {mode === "profile"
                  ? "Ultra Intelligent Profile"
                  : "Ultra Intelligent Dashboard"}
              </p>

              <h1 className="text-4xl font-bold text-white md:text-5xl">{displayName}</h1>
              <p className="mt-2 text-slate-300">@{username}</p>
              {email ? <p className="mt-1 text-sm text-slate-400">{email}</p> : null}

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
                {form.bio ||
                  "This is your premium TGPI command layer: profile, strategy, progress, settings, and global readiness in one place."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Readiness" value={`${readiness}/100`} hint={tier} />
                <StatCard label="Favorites" value={favorites.length} hint="Saved countries" />
                <StatCard label="Goals" value={goals.length} hint="Country goals" />
                <StatCard label="Conversions" value={conversions.length} hint="Financial signals" />
              </div>
            </div>

            <div className="space-y-5">
              <ProfileAvatarUploader
                currentAvatar={avatar}
                displayName={displayName}
                onAvatarSaved={(url) => {
                  setAvatar(url);
                  setProfile((prev) => ({ ...(prev || {}), photoURL: url }));
                }}
              />

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-400">
                  Account Overview
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">Plan</span>
                    <span className="font-semibold text-white">{profile?.plan || "FREE"}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">XP</span>
                    <span className="font-semibold text-white">{profile?.xp ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">Level</span>
                    <span className="font-semibold text-white">{profile?.level ?? 1}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">Streak</span>
                    <span className="font-semibold text-white">{profile?.streak ?? 0} days</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <span className="text-slate-400">UID</span>
                    <span className="max-w-[180px] truncate font-mono text-xs text-slate-300">{uid}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ShareProfile username={username} />
        <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="grid gap-8 xl:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-8">
            {activeTab === "overview" && (
              <>
                <Section
                  title="Identity Snapshot"
                  subtitle="A full, useful view of the user's international identity layer."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Display Name</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.displayName || "Not defined"}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Username</p>
                      <p className="mt-3 text-lg font-semibold text-white">@{username}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Location</p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {[form.city, form.country].filter(Boolean).join(", ") || "Not defined"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Preferred Currency</p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {form.preferredCurrency || "Not defined"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Goal</p>
                      <p className="mt-3 text-lg font-semibold text-white">{form.goal || "Not defined"}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Continent Interest</p>
                      <p className="mt-3 text-lg font-semibold text-white">
                        {form.continentInterest || "Not defined"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Bio</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {form.bio || "No bio defined yet."}
                      </p>
                    </div>
                  </div>
                </Section>

                <Section
                  title="Global Signals"
                  subtitle="These are the signals that make TGPI smarter for the user."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Favorite Countries</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {favorites.length ? (
                          favorites.map((country) => (
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

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 md:col-span-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Country Goals</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {goals.length ? (
                          goals.map((goal) => (
                            <span
                              key={goal}
                              className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white"
                            >
                              {goal}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">No goals yet</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Section>
              </>
            )}

            {activeTab === "edit" && (
              <Section
                title="Edit Full Profile"
                subtitle="Everything important about the user in one premium editing experience."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Display Name</label>
                    <input
                      value={form.displayName}
                      onChange={(e) => updateField("displayName", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Username</label>
                    <input
                      value={form.username}
                      onChange={(e) => updateField("username", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-slate-300">Bio</label>
                    <textarea
                      rows={4}
                      value={form.bio}
                      onChange={(e) => updateField("bio", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">City</label>
                    <input
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Country</label>
                    <input
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Website</label>
                    <input
                      value={form.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Instagram</label>
                    <input
                      value={form.instagram}
                      onChange={(e) => updateField("instagram", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">LinkedIn</label>
                    <input
                      value={form.linkedin}
                      onChange={(e) => updateField("linkedin", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Timezone</label>
                    <input
                      value={form.timezone}
                      onChange={(e) => updateField("timezone", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                      placeholder="America/Sao_Paulo"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Language Preference</label>
                    <input
                      value={form.languagePreference}
                      onChange={(e) => updateField("languagePreference", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Preferred Currency</label>
                    <select
                      value={form.preferredCurrency}
                      onChange={(e) => updateField("preferredCurrency", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
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
                </div>
              </Section>
            )}

            {activeTab === "goals" && (
              <Section
                title="Goals and Readiness Settings"
                subtitle="Settings that help TGPI personalize recommendations and guidance."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Main Goal</label>
                    <select
                      value={form.goal}
                      onChange={(e) => updateField("goal", e.target.value as FormState["goal"])}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
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
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
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
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                    >
                      <option value="">Select</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Continent of Interest</label>
                    <input
                      value={form.continentInterest}
                      onChange={(e) => updateField("continentInterest", e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
                      placeholder="Europe, Asia, North America..."
                    />
                  </div>
                </div>
              </Section>
            )}

            {activeTab === "activity" && (
              <Section
                title="Activity Timeline"
                subtitle="An operational history of the user's movement inside TGPI."
              >
                <div className="space-y-3">
                  {activity.length ? (
                    activity
                      .slice()
                      .reverse()
                      .slice(0, 10)
                      .map((item, index) => (
                        <div
                          key={`${item.action}-${item.date}-${index}`}
                          className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
                        >
                          <p className="font-medium text-white">{item.action}</p>
                          <p className="mt-1 text-sm text-slate-400">{formatDate(item.date)}</p>
                        </div>
                      ))
                  ) : (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
                      No activity tracked yet.
                    </div>
                  )}
                </div>
              </Section>
            )}

            {activeTab === "settings" && (
              <Section
                title="Settings"
                subtitle="Preferences that control communication, privacy, and profile behavior."
              >
                <div className="space-y-4">
                  <SettingToggle
                    checked={form.notificationsEmail}
                    onChange={(value) => updateField("notificationsEmail", value)}
                    label="Email Notifications"
                    description="Receive updates and activity summaries by email."
                  />

                  <SettingToggle
                    checked={form.notificationsPush}
                    onChange={(value) => updateField("notificationsPush", value)}
                    label="Push-Style Notifications"
                    description="Keep the account ready for faster alerts and reminders."
                  />

                  <SettingToggle
                    checked={form.profilePublic}
                    onChange={(value) => updateField("profilePublic", value)}
                    label="Public Profile"
                    description="Allow your TGPI profile to be more visible in the ecosystem."
                  />
                </div>
              </Section>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                {saving ? "Saving..." : "Save All Changes"}
              </button>

              {saveMessage ? (
                <span className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white">
                  {saveMessage}
                </span>
              ) : null}
            </div>
          </div>

          <div className="space-y-8">
            <ProfileCompletion />
            <SmartAdvisor />
            <QuickStart />
            <OnlineNow />

            <Section
              title="Fast Actions"
              subtitle="Useful navigation shortcuts for users on both desktop and mobile."
            >
              <div className="space-y-3">
                <Link
                  href="/countries"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Explore Countries</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Expand profile signals and improve recommendations.
                  </p>
                </Link>

                <Link
                  href="/premium"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Upgrade Plan</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Unlock a stronger product experience and deeper intelligence.
                  </p>
                </Link>

                <Link
                  href="/ranking"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Check Ranking</p>
                  <p className="mt-1 text-sm text-slate-400">
                    View progression inside the TGPI ecosystem.
                  </p>
                </Link>

                <Link
                  href="/community"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Open Community</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Build interaction beyond solo usage.
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