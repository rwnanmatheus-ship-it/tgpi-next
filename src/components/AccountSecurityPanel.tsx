"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

type Props = {
  email?: string;
  updatedAt?: string;
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

export default function AccountSecurityPanel({ email = "", updatedAt = "" }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to logout:", error);
      alert("Could not sign out.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-6 shadow-[0_0_35px_rgba(250,204,21,0.03)]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-yellow-400">Account & Security</h2>
        <p className="mt-2 text-sm text-slate-400">
          Core account information and essential controls for launch readiness.
        </p>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Primary Email</p>
          <p className="mt-2 text-white">{email || "Not available"}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Last Saved Update</p>
          <p className="mt-2 text-white">{formatDate(updatedAt)}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Password & Access</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Password changes and advanced account security can be connected to your login flow later, but this launch version already includes session control and account status visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-2xl border border-red-500/25 bg-red-500/10 px-5 py-3 font-semibold text-red-200 transition hover:bg-red-500/15"
        >
          {loading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </section>
  );
}