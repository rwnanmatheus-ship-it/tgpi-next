"use client";

import { FormEvent, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type FormState = {
  name: string;
  email: string;
  currentCountry: string;
  targetCountry: string;
  goal: string;
  timeline: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  currentCountry: "",
  targetCountry: "",
  goal: "move",
  timeline: "6-12-months",
  website: "",
};

async function hashEmail(email: string) {
  const data = new TextEncoder().encode(email.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function PremiumWaitlistForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (form.website) {
      setStatus("success");
      return;
    }

    const normalizedEmail = form.email.trim().toLowerCase();
    if (!normalizedEmail || !form.name.trim()) {
      setStatus("error");
      setMessage("Enter your name and email to join the waitlist.");
      return;
    }

    setStatus("submitting");

    try {
      const waitlistId = await hashEmail(normalizedEmail);
      const user = auth.currentUser;

      await setDoc(
        doc(db, "premiumWaitlist", waitlistId),
        {
          name: form.name.trim(),
          email: normalizedEmail,
          currentCountry: form.currentCountry.trim(),
          targetCountry: form.targetCountry.trim(),
          primaryGoal: form.goal,
          expectedTimeline: form.timeline,
          publishedPriceUsd: "19.99",
          pricingVersion: "tgpi-premium-v2",
          source: "pricing",
          status: "interested",
          userUid: user?.uid ?? null,
          emailOptIn: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setStatus("success");
      setForm(initialState);
      setMessage("You are on the TGPI Premium early-access list.");
    } catch (error) {
      console.error("Premium waitlist submission failed:", error);
      setStatus("error");
      setMessage("We could not save your request. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[28px] border border-[#B58A2A] bg-[#FFF7DE] p-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8A5B09]">
          Early access confirmed
        </p>
        <h2 className="mt-4 font-serif text-3xl font-semibold text-[#0B0B0B]">
          Your place is registered.
        </h2>
        <p className="mt-4 leading-7 text-[#5A4A28]">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-[#D8D2C4] bg-white p-6 shadow-[0_24px_70px_rgba(11,31,58,0.08)] md:p-9"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-bold text-[#303846]">
          Full name
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#D8D2C4] bg-[#FFFDF8] px-4 py-3 font-normal outline-none transition focus:border-[#B58A2A]"
            placeholder="Your name"
          />
        </label>

        <label className="text-sm font-bold text-[#303846]">
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#D8D2C4] bg-[#FFFDF8] px-4 py-3 font-normal outline-none transition focus:border-[#B58A2A]"
            placeholder="you@example.com"
          />
        </label>

        <label className="text-sm font-bold text-[#303846]">
          Current country
          <input
            value={form.currentCountry}
            onChange={(event) => updateField("currentCountry", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#D8D2C4] bg-[#FFFDF8] px-4 py-3 font-normal outline-none transition focus:border-[#B58A2A]"
            placeholder="Brazil"
          />
        </label>

        <label className="text-sm font-bold text-[#303846]">
          Main target country
          <input
            value={form.targetCountry}
            onChange={(event) => updateField("targetCountry", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#D8D2C4] bg-[#FFFDF8] px-4 py-3 font-normal outline-none transition focus:border-[#B58A2A]"
            placeholder="England, Portugal, Canada..."
          />
        </label>

        <label className="text-sm font-bold text-[#303846]">
          Primary goal
          <select
            value={form.goal}
            onChange={(event) => updateField("goal", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#D8D2C4] bg-[#FFFDF8] px-4 py-3 font-normal outline-none transition focus:border-[#B58A2A]"
          >
            <option value="move">Move abroad</option>
            <option value="work">Work internationally</option>
            <option value="study">Study abroad</option>
            <option value="remote">Build a remote global life</option>
            <option value="documents">Prepare documents</option>
          </select>
        </label>

        <label className="text-sm font-bold text-[#303846]">
          Expected timeline
          <select
            value={form.timeline}
            onChange={(event) => updateField("timeline", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#D8D2C4] bg-[#FFFDF8] px-4 py-3 font-normal outline-none transition focus:border-[#B58A2A]"
          >
            <option value="0-3-months">Within 3 months</option>
            <option value="3-6-months">3 to 6 months</option>
            <option value="6-12-months">6 to 12 months</option>
            <option value="12-plus-months">More than 12 months</option>
            <option value="researching">Still researching</option>
          </select>
        </label>

      </div>

      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 w-full rounded-2xl bg-[#0B1F3A] px-6 py-4 text-sm font-black text-white transition hover:bg-[#132B4C] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Saving your place..." : "Join Premium Waitlist"}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-[#667085]">
        No payment is collected. You will receive launch information and early-access priority.
      </p>

      {message && status === "error" && (
        <p className="mt-4 text-center text-sm font-semibold text-[#8B1E1E]" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
