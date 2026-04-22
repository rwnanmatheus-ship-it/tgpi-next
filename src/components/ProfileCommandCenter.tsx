"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getUserMemory } from "@/lib/user-memory";
import ShareProfile from "@/components/ShareProfile";
import ProfileCompletion from "@/components/ProfileCompletion";
import SmartAdvisor from "@/components/SmartAdvisor";
import QuickStart from "@/components/QuickStart";
import OnlineNow from "@/components/OnlineNow";
import CommandCenterNav from "@/components/CommandCenterNav";
import ProfileAvatarUploader from "@/components/ProfileAvatarUploader";
import ProfileDetailsForm from "@/components/ProfileDetailsForm";

type ViewMode = "profile" | "dashboard";

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

type ProfileDoc = {
  username?: string;
  displayName?: string;
  fullName?: string;
  bio?: string;
  photoURL?: string;
  photoUrl?: string;
  avatar?: string;
  preferredCurrency?: string;
  country?: string;
  city?: string;
  plan?: string;
  xp?: number;
  level?: number;
  streak?: number;
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

function computeReadiness(memory: MemoryShape | null, profile: ProfileDoc | null) {
  let score = 10;

  if (profile?.displayName || profile?.fullName) score += 10;
  if (profile?.bio) score += 10;
  if (memory?.goal) score += 10;
  if (memory?.englishLevel) score += 10;
  if (memory?.budget) score += 10;
  if (memory?.continentInterest) score += 10;
  if (memory?.favoriteCountries?.length) score += 10;
  if (memory?.countryGoals?.length) score += 10;
  if (memory?.recentConversions?.length) score += 10;
  if (memory?.activity?.length) score += 10;

  return Math.min(score, 100);
}

function readinessTier(score: number) {
  if (score >= 85) return "Elite";
  if (score >= 65) return "Advanced";
  if (score >= 40) return "Growing";
  return "Starter";
}

function Block({
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

function Stat({
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

export default function ProfileCommandCenter({ mode }: { mode: ViewMode }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileDoc | null>(null);
  const [memory, setMemory] = useState<MemoryShape | null>(null);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [avatarOverride, setAvatarOverride] = useState("");

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
        if (snap.exists()) {
          const data = snap.data() as ProfileDoc;
          setProfile(data);
          setAvatarOverride(data?.photoURL || data?.photoUrl || data?.avatar || "");
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }

      try {
        const memoryData = await getUserMemory();
        setMemory(memoryData as MemoryShape | null);
      } catch (error) {
        console.error("Failed to load memory:", error);
      }

      setLoading(false);
    }

    load();
  }, []);

  const displayName =
    profile?.displayName ||
    profile?.fullName ||
    (email ? email.split("@")[0] : "Global Member");

  const username =
    profile?.username || displayName?.toLowerCase().replace(/\s+/g, "") || "globaluser";

  const avatar = avatarOverride || profile?.photoURL || profile?.photoUrl || profile?.avatar || "";

  const readiness = useMemo(() => computeReadiness(memory, profile), [memory, profile]);
  const tier = useMemo(() => readinessTier(readiness), [readiness]);

  const favorites = memory?.favoriteCountries || [];
  const goals = memory?.countryGoals || [];
  const conversions = memory?.recentConversions || [];
  const activity = memory?.activity || [];

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-10">
            <p className="text-lg text-slate-300">Loading your TGPI command center...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!auth.currentUser) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-10">
            <p className="mb-3 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
              TGPI Access
            </p>
            <h1 className="text-4xl font-bold text-yellow-400">
              Sign in to access your command center
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Your profile and dashboard are becoming one intelligent, editable, and strategic environment.
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

        <section className="overflow-hidden rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-950 p-6 md:p-8">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
                {mode === "profile" ? "TGPI Profile Command Center" : "TGPI Dashboard Command Center"}
              </p>

              <h1 className="text-4xl font-bold text-white md:text-5xl">{displayName}</h1>
              <p className="mt-2 text-slate-300">@{username}</p>
              {email ? <p className="mt-1 text-sm text-slate-400">{email}</p> : null}

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
                {profile?.bio ||
                  "Your TGPI command center connects identity, progress, decisions, memory, and global planning in one premium environment."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Stat label="Readiness" value={`${readiness}/100`} hint={`${tier} tier`} />
                <Stat label="Favorites" value={favorites.length} hint="Saved countries" />
                <Stat label="Goals" value={goals.length} hint="Strategic country goals" />
                <Stat label="Conversions" value={conversions.length} hint="Recent currency usage" />
              </div>
            </div>

            <div className="space-y-5">
              <ProfileAvatarUploader
                currentAvatar={avatar}
                displayName={displayName}
                onAvatarSaved={(url) => setAvatarOverride(url)}
              />

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-slate-400">
                  Account Layer
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
                    <span className="max-w-[180px] truncate font-mono text-xs text-slate-300">
                      {uid}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ShareProfile username={username} />

        <div className="grid gap-8 xl:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-8">
            <ProfileDetailsForm />

            <Block
              title="Recent Activity"
              subtitle="Behavioral signals that make TGPI more personalized and intelligent."
            >
              <div className="space-y-3">
                {activity.length ? (
                  activity
                    .slice()
                    .reverse()
                    .slice(0, 8)
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
            </Block>

            <Block
              title="Recent Currency Conversions"
              subtitle="Useful financial signals for relocation, travel, and international planning."
            >
              <div className="space-y-3">
                {conversions.length ? (
                  conversions.slice(0, 6).map((item, index) => (
                    <div
                      key={`${item.from}-${item.to}-${item.amount}-${index}`}
                      className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-medium text-white">
                          {item.amount} {item.from} → {item.to}
                        </p>
                        <p className="text-sm text-slate-400">{formatDate(item.date)}</p>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">
                        {typeof item.result === "number"
                          ? `Result: ${item.result.toFixed(2)} ${item.to}`
                          : "Result value not stored"}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
                    No conversions saved yet.
                  </div>
                )}
              </div>
            </Block>
          </div>

          <div className="space-y-8">
            <ProfileCompletion />
            <SmartAdvisor />
            <QuickStart />
            <OnlineNow />

            <Block
              title="Navigation Shortcuts"
              subtitle="Actions that keep the user moving through the TGPI ecosystem."
            >
              <div className="space-y-3">
                <Link
                  href="/countries"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Explore Countries</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Compare destinations and strengthen your decision signals.
                  </p>
                </Link>

                <Link
                  href="/premium"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Upgrade Plan</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Unlock deeper product value and premium intelligence.
                  </p>
                </Link>

                <Link
                  href="/ranking"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">View Ranking</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Understand your position inside TGPI progression.
                  </p>
                </Link>

                <Link
                  href="/community"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Open Community</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Move from solo exploration to networked global discovery.
                  </p>
                </Link>
              </div>
            </Block>
          </div>
        </div>
      </div>
    </main>
  );
}