"use client";

import Link from "next/link";
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

  async function copyValue(value: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(successMessage);
    } catch {
      setMessage("Copy is unavailable. Select the visible reference manually.");
    }
  }

  async function shareCredential() {
    const shareData = {
      text:
        "TGPI learning credential: " +
        courseTitle +
        " · verify the live record before relying on its status.",
      title: courseTitle + " — TGPI",
      url: verificationUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMessage("Credential shared.");
        return;
      }
      await copyValue(
        verificationUrl,
        "Verification link copied for sharing.",
      );
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Sharing is unavailable on this device.");
    }
  }

  return (
    <section
      aria-labelledby="credential-actions-title"
      className="rounded-[26px] border border-white/10 bg-white/[0.055] p-6 print:border-[#D8D2C4] print:bg-white print:p-4 print:text-[#0B1F3A]"
    >
      <p
        id="credential-actions-title"
        className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E8CC7B] print:text-[#79571D]"
      >
        Portable verification
      </p>
      <p className="mt-2 text-xs leading-6 text-[#9EABBC] print:text-[#59636F]">
        Scan to inspect the current issuer record, integrity and lifecycle
        status.
      </p>

      <Link
        href={verificationUrl}
        aria-label={"Open public verification for " + credentialId}
        className="mt-5 grid place-items-center rounded-2xl bg-white p-4 transition hover:-translate-y-0.5"
      >
        <QRCodeSVG
          value={verificationUrl}
          size={168}
          bgColor="#FFFFFF"
          fgColor="#0B1F3A"
          level="M"
          marginSize={1}
          title={"Verify " + credentialId}
        />
      </Link>

      <button
        type="button"
        onClick={() =>
          void copyValue(credentialId, "Credential ID copied.")
        }
        className="mt-4 min-h-11 w-full break-all rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-center font-mono text-[10px] font-bold leading-5 text-[#D5DDE7] transition hover:border-[#E5BF5A]/50 print:min-h-0 print:border-[#D8D2C4] print:bg-white print:text-[#0B1F3A]"
      >
        {credentialId}
      </button>

      <div className="mt-5 grid gap-3 print:hidden">
        <button
          type="button"
          onClick={() => void shareCredential()}
          className="min-h-12 rounded-xl bg-[#E5BF5A] px-5 text-sm font-extrabold text-[#0B1F3A] transition hover:-translate-y-0.5 hover:bg-[#F0D58C]"
        >
          Share credential
        </button>
        <Link
          href={verificationUrl}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-extrabold text-white transition hover:border-[#E5BF5A]/50 hover:bg-white/5"
        >
          Open live verification
        </Link>
        <button
          type="button"
          onClick={() =>
            void copyValue(
              verificationUrl,
              "Verification link copied.",
            )
          }
          className="min-h-12 rounded-xl border border-white/15 px-5 text-sm font-extrabold text-white transition hover:border-[#E5BF5A]/50 hover:bg-white/5"
        >
          Copy verification link
        </button>
        <a
          href={downloadUrl}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-extrabold text-white transition hover:border-[#E5BF5A]/50 hover:bg-white/5"
        >
          Download evidence JSON
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-12 rounded-xl border border-white/15 px-5 text-sm font-extrabold text-white transition hover:border-[#E5BF5A]/50 hover:bg-white/5"
        >
          Print credential record
        </button>
      </div>
      <p
        aria-live="polite"
        className="mt-3 min-h-5 text-center text-xs font-bold text-[#E8CC7B] print:hidden"
      >
        {message}
      </p>
    </section>
  );
}
