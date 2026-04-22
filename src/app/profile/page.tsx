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

function formatBudgetLabel(value?: string) {
  if (value === "low") return "Low budget";
  if (value === "medium") return "Medium budget";
  if (value === "high") return "High budget";
  return "Not defined";
}

function formatGoalLabel(value?: string) {
  if (value === "work") return "Work abroad";
  if (value === "study") return "Study abroad";
  if (value === "live") return "Live abroad";
  return "Not defined";
}

function formatEnglishLabel(value?: string) {
  if (value === "basic") return "Basic";
  if (value === "intermediate") return "Intermediate";
  if (value === "advanced") return "Advanced";
  return "Not defined";
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

function SectionCard({
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

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileDoc | null>(null);
  const [memory, setMemory] = useState<MemoryShape | null>(null);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

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
          setProfile(snap.data() as ProfileDoc);
        }
      } catch (error) {
        console.error("Failed to load profile document:", error);
      }

      try {
        const memoryData = await getUserMemory();
        setMemory(memoryData as MemoryShape | null);
      } catch (error) {
        console.error("Failed to load user memory:", error);
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

  const avatar =
    profile?.photoURL || profile?.photoUrl || profile?.avatar || "";

  const readiness = useMemo(() => computeReadiness(memory, profile), [memory, profile]);
  const tier = useMemo(() => readinessTier(readiness), [readiness]);

  const favorites = memory?.favoriteCountries || [];
  const goals = memory?.countryGoals || [];
  const conversions = memory?.recentConversions || [];
  const activity = memory?.activity || [];

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-10">
            <p className="text-lg text-slate-300">Loading your profile command center...</p>
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
              TGPI Profile Access
            </p>
            <h1 className="text-4xl font-bold text-yellow-400">Sign in to open your global profile</h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Your profile is becoming your identity hub, progress tracker, and international command center inside TGPI.
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
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-950 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
            <div>
              <p className="mb-4 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200">
                TGPI Identity + Command Center
              </p>

              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-yellow-500/20 bg-slate-900 text-2xl font-bold text-yellow-400">
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar} alt={displayName} className="h-full w-full object-cover" />
                  ) : (
                    <span>{displayName?.slice(0, 1)?.toUpperCase() || "G"}</span>
                  )}
                </div>

                <div>
                  <h1 className="text-4xl font-bold text-white md:text-5xl">{displayName}</h1>
                  <p className="mt-2 text-slate-300">@{username}</p>
                  {email ? <p className="mt-1 text-sm text-slate-400">{email}</p> : null}
                  {profile?.bio ? (
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{profile.bio}</p>
                  ) : (
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                      This profile is evolving into your global identity, planning layer, and readiness dashboard inside TGPI.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
                >
                  Open Dashboard
                </Link>
                <Link
                  href="/countries"
                  className="rounded-xl border border-yellow-500/40 bg-yellow-500/5 px-5 py-3 font-semibold text-yellow-300 transition hover:bg-yellow-500/10"
                >
                  Explore Countries
                </Link>
                <Link
                  href="/premium"
                  className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 font-semibold text-white transition hover:border-yellow-500/40"
                >
                  View Premium
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Profile Intelligence</p>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl font-bold text-yellow-400">{readiness}</span>
                <span className="pb-2 text-sm text-slate-400">/100</span>
              </div>

              <p className="mt-3 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-sm text-yellow-200">
                {tier} Readiness Tier
              </p>

              <div className="mt-6 space-y-3 text-sm">
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
                  <span className="max-w-[180px] truncate font-mono text-xs text-slate-300">{uid || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ShareProfile username={username} />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Favorite Countries" value={favorites.length} hint="Countries you saved for future decisions" />
          <StatCard label="Country Goals" value={goals.length} hint="Strategic directions you defined" />
          <StatCard label="Recent Conversions" value={conversions.length} hint="Practical currency exploration data" />
          <StatCard label="Activity Events" value={activity.length} hint="Signals that build your TGPI memory" />
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-8">
            <SectionCard
              title="Global Identity"
              subtitle="This block merges profile data with international intent, turning your account into a real readiness layer."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Primary Goal</p>
                  <p className="mt-3 text-lg font-semibold text-white">{formatGoalLabel(memory?.goal)}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">English Level</p>
                  <p className="mt-3 text-lg font-semibold text-white">{formatEnglishLabel(memory?.englishLevel)}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Budget Profile</p>
                  <p className="mt-3 text-lg font-semibold text-white">{formatBudgetLabel(memory?.budget)}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Continent of Interest</p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {memory?.continentInterest || "Not defined"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Preferred Currency</p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {memory?.preferredCurrency || profile?.preferredCurrency || "Not defined"}
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Global Signals"
              subtitle="These are the behaviors that make TGPI smarter for you over time."
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Last Visited Country</p>
                  <p className="mt-3 text-lg font-semibold text-white">{memory?.lastVisitedCountry || "None yet"}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Location</p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {[profile?.city, profile?.country].filter(Boolean).join(", ") || "Not defined"}
                  </p>
                </div>

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
                      <span className="text-sm text-slate-400">No country goals set yet</span>
                    )}
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Recent Activity"
              subtitle="A useful operational view of what your account has been doing."
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
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
                    No activity tracked yet.
                  </div>
                )}
              </div>
            </SectionCard>

            <SectionCard
              title="Recent Conversions"
              subtitle="Practical financial context that strengthens relocation and travel decisions."
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
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
                    No conversions saved yet.
                  </div>
                )}
              </div>
            </SectionCard>
          </div>

          <div className="space-y-8">
            <ProfileCompletion />
            <SmartAdvisor />
            <QuickStart />
            <OnlineNow />

            <SectionCard
              title="Strategic Next Moves"
              subtitle="Use your profile as a command center, not just an identity page."
            >
              <div className="space-y-3">
                <Link
                  href="/countries"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Explore more countries</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Expand your signals and improve recommendations.
                  </p>
                </Link>

                <Link
                  href="/premium"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Upgrade your plan</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Unlock deeper comparison, premium guidance, and stronger value.
                  </p>
                </Link>

                <Link
                  href="/ranking"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-yellow-500/40"
                >
                  <p className="font-semibold text-white">Check your ranking</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Position your progress inside the TGPI ecosystem.
                  </p>
                </Link>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </main>
  );
}