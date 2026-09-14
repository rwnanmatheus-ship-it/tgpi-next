"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type CredentialActionsProps = {
  credentialId: string;
  courseTitle: string;
  downloadUrl: string;
  verificationUrl: string;
};

export default function CredentialActions({
  credentialId,
  courseTitle,
  downloadUrl,
  verificationUrl,
}: CredentialActionsProps) {
  const [message, setMessage] = useState("");

  async function copyVerificationLink() {
    try {
      await navigator.clipboard.writeText(verificationUrl);
      setMessage("Verification link copied.");
    } catch {
      setMessage("Copy failed. Open the public record and copy its address.");
    }
  }

  async function shareCredential() {
    const shareData = {
      text:
        "Verified TGPI learning credential: " +
        courseTitle +
        " · " +
        credentialId,
      title: courseTitle + " — TGPI",
      url: verificationUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMessage("Credential shared.");
        return;
      }
      await navigator.clipboard.writeText(verificationUrl);
      setMessage("Verification link copied for sharing.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Sharing is unavailable on this device.");
    }
  }

  return (
    <section
      aria-labelledby="credential-actions-title"
      className="rounded-[26px] border border-white/10 bg-white/[0.055] p-6"
    >
      <p
        id="credential-actions-title"
        className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B]"
      >
        Shareable proof
      </p>
      <div className="mt-5 grid place-items-center rounded-2xl bg-white p-4">
        <QRCodeSVG
          value={verificationUrl}
          size={168}
          bgColor="#FFFFFF"
          fgColor="#0B1F3A"
          level="M"
          marginSize={1}
          title={"Verify " + credentialId}
        />
      </div>
      <p className="mt-4 break-all text-center text-[10px] font-bold leading-5 text-[#AAB5C4]">
        {credentialId}
      </p>
      <div className="mt-5 grid gap-3">
        <button
          type="button"
          onClick={() => void shareCredential()}
          className="min-h-12 rounded-xl bg-[#E5BF5A] px-5 text-sm font-extrabold text-[#0B1F3A] transition hover:bg-[#F0D58C]"
        >
          Share credential
        </button>
        <button
          type="button"
          onClick={() => void copyVerificationLink()}
          className="min-h-12 rounded-xl border border-white/15 px-5 text-sm font-extrabold text-white transition hover:bg-white/5"
        >
          Copy verification link
        </button>
        <a
          href={downloadUrl}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-extrabold text-white transition hover:bg-white/5"
        >
          Download evidence record
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-12 rounded-xl border border-white/15 px-5 text-sm font-extrabold text-white transition hover:bg-white/5"
        >
          Print certificate
        </button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs font-bold text-[#E8CC7B]">
        {message}
      </p>
    </section>
  );
}
