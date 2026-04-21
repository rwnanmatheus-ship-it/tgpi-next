"use client";

import { useState } from "react";

export default function InviteSystem() {
  const [copied, setCopied] = useState(false);

  const inviteLink = "https://theglobalpolymath.com/invite";

  function handleCopy() {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">
        Invite People To Your Global Network
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        People who join TGPI early gain positioning, visibility, and advantage.
        Share your invite link and build your network before others.
      </p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <input
          value={inviteLink}
          readOnly
          className="w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-sm text-slate-300"
        />

        <button
          onClick={handleCopy}
          className="rounded-xl bg-yellow-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-400"
        >
          {copied ? "Copied" : "Copy Link"}
        </button>
      </div>

      <div className="mt-6 text-xs text-slate-500">
        Early users build stronger global positioning.
      </div>
    </section>
  );
}