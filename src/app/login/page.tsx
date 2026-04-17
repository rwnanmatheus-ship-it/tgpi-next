"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile } from "@/lib/profile";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function ensureUserProfile(uid: string, userEmail: string) {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const baseProfile = defaultUserProfile(userEmail);

      await setDoc(ref, {
        ...baseProfile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setStatus("Please fill in email and password.");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      if (isRegister) {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await ensureUserProfile(userCred.user.uid, email);
        setStatus("Account created successfully.");
        router.push("/profile");
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);

        await ensureUserProfile(userCred.user.uid, userCred.user.email || email);
        setStatus("Login successful.");
        router.push("/dashboard");
      }
    } catch (error: any) {
      setStatus(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0f19] px-6 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <section className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-white/5 p-8 lg:p-12">
          <div className="mb-5 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
            TGPI Access
          </div>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
            Enter Your Global Journey
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-8 text-slate-300">
            Access a premium platform designed to help people prepare for life,
            work, study, and integration across countries through language,
            culture, and global readiness.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                Personalized
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                Your profile, goals, preferred country, and learning direction
                shape the experience.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                Global
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                Country-based pathways connect preparation, language, and
                practical international readiness.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                Premium
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                A refined platform experience built for long-term expansion and
                serious positioning.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-xl font-semibold text-yellow-400">
                Real
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                More than education—an ecosystem for meaningful global
                preparation.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-white">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-slate-400">
              {isRegister
                ? "Start your premium global journey."
                : "Log in to continue your personalized global journey."}
            </p>
          </div>

          <div className="mb-8 flex gap-3">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`flex-1 rounded-xl px-4 py-3 font-semibold transition ${
                !isRegister
                  ? "bg-yellow-500 text-black"
                  : "border border-white/10 bg-white/5 text-slate-300"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`flex-1 rounded-xl px-4 py-3 font-semibold transition ${
                isRegister
                  ? "bg-yellow-500 text-black"
                  : "border border-white/10 bg-white/5 text-slate-300"
              }`}
            >
              Create Account
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : isRegister
                ? "Create Account"
                : "Access Platform"}
            </button>
          </form>

          {status ? (
            <p className="mt-5 text-sm text-yellow-300">{status}</p>
          ) : null}

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/10 p-5">
            <p className="text-sm leading-7 text-slate-300">
              Your account connects your global profile, country goals,
              personalized progress, favorites, and premium platform actions.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}