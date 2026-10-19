"use client";

import { useState } from "react";

export default function PublicProfileShareButton({
  label = "Share profile",
  title,
  url,
}: {
  label?: string;
  title: string;
  url: string;
}) {
  const [message, setMessage] = useState("");

  async function shareProfile() {
    const absoluteUrl = new URL(url, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title, url: absoluteUrl });
        setMessage("Profile shared.");
        return;
      }
      await navigator.clipboard.writeText(absoluteUrl);
      setMessage("Profile link copied.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Unable to share automatically. Copy the URL from your browser.");
    }
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(new URL(url, window.location.origin).toString()); setMessage("Profile link copied."); }
    catch { setMessage("Unable to copy automatically. Open the profile and copy its address."); }
  }
  return (
    <div>
      <button
        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#E5B94B] px-5 text-xs font-extrabold text-[#07182D] shadow-[0_10px_26px_rgba(229,185,75,0.18)] transition hover:-translate-y-0.5 hover:bg-[#F0C95F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0D58C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07182D]"
        onClick={shareProfile}
        type="button"
      >
        {label}
      </button>
      <button className="ml-3 inline-flex min-h-11 items-center rounded-xl border border-current/30 px-4 text-sm font-bold" type="button" onClick={copyLink}>Copy link</button>
      <p aria-live="polite" className="mt-2 text-[11px] font-bold text-[#9FD5BD]" role="status">{message}</p>
    </div>
  );
}
