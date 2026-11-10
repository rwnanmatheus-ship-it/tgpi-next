"use client";
import { useLocale as useInterfaceLocale } from "@/components/localization/LocaleProvider";

import Link from "next/link";
import CertificateDownloadButton from "@/components/credentials/CertificateDownloadButton";
import { useState } from "react";
import { LocalizedText } from "@/components/localization/LocaleProvider";


type CredentialActionsProps = {
  canDownload?: boolean;
  owner?: boolean;
  sharingAllowed?: boolean;
  credentialId: string;
  courseTitle: string;
  downloadUrl: string;
  verificationUrl: string;
};

export default function CredentialActions({
  canDownload = true,
  owner = true,
  sharingAllowed = true,
  credentialId,
  courseTitle,
  downloadUrl,
  verificationUrl,
}: CredentialActionsProps) {
  const { t: localizeLabel } = useInterfaceLocale();

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
      text: localizeLabel("My TGPI learning certificate. View the current verification record."),
      title: courseTitle + " — TGPI",
      url: verificationUrl,
    };

    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      try {
        await navigator.share(shareData);
        setMessage("Credential shared.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await copyValue(verificationUrl, "Verification link copied for sharing.");
  }

  return (
    <section className="credential-actions" aria-label={localizeLabel("Certificate actions")}>
      <div className="credential-action-buttons print:hidden">
        {owner && (
          <CertificateDownloadButton
            credentialId={credentialId}
            disabled={!canDownload}
            label="Download latest PDF"
            className="credential-button primary"
          />
        )}
        {sharingAllowed && canDownload && (
          <button
            type="button"
            onClick={() => void shareCredential()}
            className="credential-button"
          ><LocalizedText text="Share certificate ↗" /></button>
        )}
        {owner && sharingAllowed && (
          <Link href={verificationUrl} className="credential-button"><LocalizedText text={"Open live verification"} /></Link>
        )}
      </div>
      <div className="credential-secondary-actions print:hidden">
        <button type="button" onClick={() => void copyValue(credentialId, "Certificate ID copied.")}>
          <LocalizedText text="Copy certificate ID" />
        </button>
        {sharingAllowed && (
          <button
            type="button"
            onClick={() => void copyValue(verificationUrl, "Verification link copied.")}
          ><LocalizedText text="Copy verification link" /></button>
        )}
        <a href={downloadUrl}><LocalizedText text={"Export evidence JSON"} /></a>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="credential-action-message print:hidden"
      >
        <LocalizedText text={message} />
      </p>
    </section>
  );
}
