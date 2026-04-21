"use client";

import { useState } from "react";

export default function ProfileShareCard({
  username,
}: {
  username?: string;
}) {
  const [copied, setCopied] = useState(false);
  const link = username
    ? `https://theglobalpolymath.com/user/${username}`
    : "https://theglobalpolymath.com";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Could not copy profile link:", error);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Share Your Global Profile
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        Turn your TGPI identity into a public signal. Share your profile with
        people, communities, and opportunities outside the platform.
      </p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <input
          value={link}
          readOnly
          className="w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-sm text-slate-300"
        />

        <button
          onClick={handleCopy}
          className="rounded-xl bg-yellow-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-400"
        >
          {copied ? "Copied" : "Copy Profile Link"}
        </button>
      </div>
    </section>
  );
}