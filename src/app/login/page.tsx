"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import TGPIEditorialVisual from "@/components/TGPIEditorialVisual";
import { auth, db } from "@/lib/firebase";
import { defaultUserProfile } from "@/lib/profile";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

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
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await ensureUserProfile(userCred.user.uid, email);
        setStatus("Account created successfully.");
        router.push("/onboarding");
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        await ensureUserProfile(userCred.user.uid, userCred.user.email || email);
        setStatus("Login successful.");
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      setStatus(getErrorMessage(error, "Something went wrong."));
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    if (!email) {
      setStatus("Enter your email first to receive a reset link.");
      return;
    }

    try {
      setSendingReset(true);
      setStatus("");
      await sendPasswordResetEmail(auth, email);
      setStatus("Password reset email sent successfully.");
    } catch (error: unknown) {
      setStatus(getErrorMessage(error, "Could not send reset email."));
    } finally {
      setSendingReset(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F5EE] px-4 py-8 text-[#0B0B0B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_45px_120px_rgba(11,31,58,0.14)]">
        <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
          <section className="relative min-h-[620px] lg:min-h-[820px]">
            <TGPIEditorialVisual
              variant="hero"
              id="login-visual"
              ariaLabel="Authorial TGPI global account access illustration"
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,58,0.04),rgba(11,31,58,0.88))]" />
            <div className="absolute inset-x-7 bottom-8 text-white md:inset-x-10 md:bottom-10">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#F0D58C]">
                TGPI Global Profile
              </p>
              <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-7xl">
                Build a global life without guessing.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#D7DFEA]">
                Connect country comparison, readiness, learning, saved destinations and your international action plan.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  ["Personal profile", "Goals, budget, languages and preferred lifestyle."],
                  ["Connected progress", "Countries, learning and readiness in one place."],
                ].map(([title, description]) => (
                  <div key={title} className="rounded-2xl border border-white/20 bg-[#0B1F3A]/68 p-4 backdrop-blur-xl">
                    <p className="font-serif text-xl font-semibold text-white">{title}</p>
                    <p className="mt-2 text-xs leading-6 text-[#D7DFEA]">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <Link href="/" className="mb-10 flex items-center gap-3 self-start">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#B58A2A] bg-[#0B1F3A] font-serif text-sm font-semibold tracking-[0.12em] text-[#F0D58C]">
                TGPI
              </span>
              <span>
                <span className="block text-xs font-black uppercase tracking-[0.19em] text-[#0B1F3A]">The Global Polymath</span>
                <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.23em] text-[#8A6A27]">Institute</span>
              </span>
            </Link>

            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-[#9A6A12]">
                {isRegister ? "Create your global profile" : "Return to your global plan"}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.04em] text-[#0B0B0B] md:text-5xl">
                {isRegister ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="mt-4 leading-7 text-[#566070]">
                {isRegister
                  ? "Start free and build your first country decision profile."
                  : "Sign in to continue your comparisons, readiness and learning."}
              </p>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-3 rounded-2xl border border-[#D8D2C4] bg-[#F3EEE3] p-2">
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                  !isRegister
                    ? "bg-[#0B1F3A] text-white shadow-sm"
                    : "text-[#566070] hover:bg-white"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                  isRegister
                    ? "bg-[#B58A2A] text-[#0B0B0B] shadow-sm"
                    : "text-[#566070] hover:bg-white"
                }`}
              >
                Create account
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-bold text-[#0B1F3A]">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-[#D8D2C4] bg-white px-4 py-3.5 text-[#0B0B0B] outline-none transition placeholder:text-[#98A0AA] focus:border-[#B58A2A] focus:ring-4 focus:ring-[#B58A2A]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#0B1F3A]">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-[#D8D2C4] bg-white px-4 py-3.5 text-[#0B0B0B] outline-none transition placeholder:text-[#98A0AA] focus:border-[#B58A2A] focus:ring-4 focus:ring-[#B58A2A]/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#0B1F3A] px-6 py-4 text-sm font-black text-white shadow-[0_16px_38px_rgba(11,31,58,0.2)] transition hover:bg-[#132B4C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Please wait..." : isRegister ? "Create Free Account" : "Access TGPI"}
              </button>
            </form>

            {!isRegister && (
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={sendingReset}
                className="mt-4 self-start text-sm font-bold text-[#9A6A12] transition hover:text-[#B58A2A] disabled:opacity-60"
              >
                {sendingReset ? "Sending reset email..." : "Forgot password?"}
              </button>
            )}

            {status && (
              <p className="mt-5 rounded-2xl border border-[#D8D2C4] bg-[#FFF7DE] p-4 text-sm leading-6 text-[#6E4706]">
                {status}
              </p>
            )}

            <p className="mt-8 border-t border-[#D8D2C4] pt-6 text-xs leading-6 text-[#667085]">
              Your free account connects your global profile, country goals, comparisons, progress and future Premium access. Creating an account does not create a charge.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
