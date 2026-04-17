"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
    <div className="min-h-screen bg-[#0b0f19] px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-8 lg:p-12">
          <div className="mb-6 inline-block rounded-full border border-yellow-600/30 bg-yellow-500/5 px-4 py-2 text-sm text-yellow-200">
            The Global Polymath Institute
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
            Enter Your Global Learning Journey
          </h1>

          <p className="mb-10 max-w-2xl text-slate-300">
            Access a premium educational platform designed to help people live,
            work, and integrate anywhere in the world through language, culture,
            arts, and internationally oriented preparation.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <strong className="mb-1 block text-lg text-yellow-400">
                195 Countries
              </strong>
              <p className="text-sm text-slate-300">
                Country-based learning architecture for global readiness.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <strong className="mb-1 block text-lg text-yellow-400">
                Personalized Onboarding
              </strong>
              <p className="text-sm text-slate-300">
                Your profile, goals, and pathways shape the experience.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <strong className="mb-1 block text-lg text-yellow-400">
                Gamified Progress
              </strong>
              <p className="text-sm text-slate-300">
                XP, streaks, quests, and premium motivation systems.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <strong className="mb-1 block text-lg text-yellow-400">
                Global Design
              </strong>
              <p className="text-sm text-slate-300">
                A premium platform built for international scale.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-yellow-400">
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
              className={`flex-1 rounded-xl px-4 py-3 font-semibold ${
                !isRegister
                  ? "bg-yellow-500 text-black"
                  : "border border-slate-700 bg-slate-900 text-slate-300"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`flex-1 rounded-xl px-4 py-3 font-semibold ${
                isRegister
                  ? "bg-yellow-500 text-black"
                  : "border border-slate-700 bg-slate-900 text-slate-300"
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
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
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
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
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

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-400">
            Your account will connect your TGPI profile, country pathways,
            personalized recommendations, and premium platform experience.
          </div>

          {status ? (
            <p className="mt-4 text-sm text-yellow-300">{status}</p>
          ) : null}
        </section>
      </div>
    </div>
  );
}