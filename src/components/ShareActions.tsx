"use client";

import { useState } from "react";

type ShareActionsProps = {
  title: string;
  text: string;
  urlPath: string;
};

export default function ShareActions({
  title,
  text,
  urlPath,
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      const url = `${window.location.origin}${urlPath}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Could not copy link:", error);
    }
  }

  async function handleShare() {
    try {
      const url = `${window.location.origin}${urlPath}`;

      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Could not share:", error);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-2 text-xl font-semibold text-yellow-400">
        Share This Page
      </h3>
      <p className="mb-5 text-sm leading-7 text-slate-300">
        Share your TGPI progress, ranking, or passport to increase visibility
        and social proof.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleShare}
          className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Share
        </button>

        <button
          onClick={handleCopy}
          className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 font-semibold text-white transition hover:border-yellow-500"
        >
          {copied ? "Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}