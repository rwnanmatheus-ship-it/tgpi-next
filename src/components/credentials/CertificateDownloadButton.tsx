"use client";

import { useState } from "react";

export default function CertificateDownloadButton({
  credentialId,
  className,
  disabled = false,
}: {
  credentialId: string;
  className: string;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function download() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(
        `/api/credentials/${encodeURIComponent(credentialId)}/pdf`,
        { cache: "no-store", credentials: "same-origin" },
      );
      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(
          payload.error || "Unable to download this certificate.",
        );
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${credentialId}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Download failed. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="min-w-0 flex-1">
      <button
        type="button"
        disabled={disabled || busy}
        aria-busy={busy}
        onClick={() => void download()}
        className={
          className + " w-full disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {busy ? "Preparing PDF…" : "Download PDF"}
      </button>
      {error ? (
        <p role="alert" className="mt-3 text-sm leading-6">
          {error}
        </p>
      ) : null}
    </div>
  );
}
