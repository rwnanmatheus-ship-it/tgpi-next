"use client";
import { useLocale as useInterfaceLocale } from "@/components/localization/LocaleProvider";

import Link from "next/link";
import { updateAcademyCredentialSharing } from "@/lib/learning/academy/credential-actions";
import { useRouter } from "next/navigation";
import CertificateDownloadButton from "@/components/credentials/CertificateDownloadButton";
import { useState } from "react";
import { certificateBadgePath } from "@/lib/certificate-presentation";
import { CertificateIssueDate } from "./CertificatePresentationText";
import { LocalizedText } from "@/components/localization/LocaleProvider";


type CredentialActionsProps = {
  canDownload?: boolean;
  owner?: boolean;
  sharingAllowed?: boolean;
  credentialId: string;
  courseTitle: string;
  issuedAt: string;
  canManageAcademySharing?: boolean;
  professionalSharing?: { courseId: string; version: string };
  downloadUrl: string;
  verificationUrl: string;
};

export default function CredentialActions({
  canDownload = true,
  owner = true,
  sharingAllowed = true,
  credentialId,
  courseTitle,
  issuedAt,
  canManageAcademySharing = false,
  professionalSharing,
  downloadUrl,
  verificationUrl,
}: CredentialActionsProps) {
  const { t: localizeLabel } = useInterfaceLocale();

  const router = useRouter();
  const [message, setMessage] = useState("");
  const [updatingSharing, setUpdatingSharing] = useState(false);
  const canShareOnLinkedIn = owner && sharingAllowed && canDownload;
  const issuer = "TGPI — The Global Polymath Institute";
  const badgeDownloadUrl = certificateBadgePath(credentialId) + "?download=1";
  const linkedInFeedUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(verificationUrl);

  async function updateSharing() {
    if (!owner || updatingSharing) return;
    setUpdatingSharing(true);
    try {
      const sharing = !sharingAllowed;
      if (canManageAcademySharing) {
        const { ok } = await updateAcademyCredentialSharing(credentialId, sharing);
        if (!ok) throw new Error("Unable to update certificate sharing.");
      } else if (professionalSharing) {
        const response = await fetch(`/api/learning/professional/${encodeURIComponent(professionalSharing.courseId)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "sharing", version: professionalSharing.version, sharing }),
        });
        if (!response.ok) throw new Error("Unable to update certificate sharing.");
      } else {
        return;
      }
      setMessage(sharingAllowed ? "The certificate is private." : "Public verification enabled.");
      router.refresh();
    } catch {
      setMessage("Unable to update certificate sharing.");
    } finally {
      setUpdatingSharing(false);
    }
  }

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
        {owner && sharingAllowed && canDownload && (
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
      {canShareOnLinkedIn && (
        <section className="credential-linkedin print:hidden" aria-labelledby="credential-linkedin-heading">
          <h2 id="credential-linkedin-heading"><LocalizedText text="LinkedIn certification" /></h2>
          <p><LocalizedText text="Add these details under Licenses & certifications and select the TGPI Page as the issuer." /></p>
          <dl>
            <div><dt><LocalizedText text="Course" /></dt><dd>{courseTitle} <button type="button" onClick={() => void copyValue(courseTitle, "Course name copied.")}><LocalizedText text="Copy course name" /></button></dd></div>
            <div><dt><LocalizedText text="Issuer" /></dt><dd>{issuer}</dd></div>
            <div><dt><LocalizedText text="Issued" /></dt><dd><CertificateIssueDate value={issuedAt} /></dd></div>
          </dl>
          <div className="credential-action-buttons">
            <a className="credential-button linkedin" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME" target="_blank" rel="noopener noreferrer" data-funnel-event="credential_linkedin_opened">
              <LocalizedText text="Add to LinkedIn" />
            </a>
            <a className="credential-button" href={linkedInFeedUrl} target="_blank" rel="noopener noreferrer"><LocalizedText text="Share on LinkedIn" /></a>
            <a className="credential-button" href={badgeDownloadUrl} download><LocalizedText text="Download course badge" /></a>
          </div>
        </section>
      )}
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
        {owner && (canManageAcademySharing || (professionalSharing && canDownload)) && (
          <button type="button" disabled={updatingSharing} onClick={() => void updateSharing()}>
            <LocalizedText text={sharingAllowed ? "Make certificate private" : "Enable public verification"} />
          </button>
        )}
        {!owner && sharingAllowed && canDownload && (
          <a href={badgeDownloadUrl} download><LocalizedText text="Download course badge" /></a>
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
