"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type TgpiAvatarEditorProps = {
  displayName: string;
  initialImageUrl: string;
  initials: string;
};

const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function TgpiAvatarEditor({
  displayName,
  initialImageUrl,
  initials,
}: TgpiAvatarEditorProps) {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(initialImageUrl);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, initialImageUrl]);

  function selectFile(selectedFile?: File) {
    setMessage("");
    setIsError(false);
    if (!selectedFile) return;
    if (!ACCEPTED_IMAGE_TYPES.has(selectedFile.type)) {
      setIsError(true);
      setMessage("Choose a JPG, PNG or WebP image.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setIsError(true);
      setMessage("Choose an image smaller than 5 MB.");
      return;
    }
    setFile(selectedFile);
    setMessage("Preview ready. Save when you are happy with the crop.");
  }

  async function saveImage() {
    if (!user || !file || isSaving) return;
    setIsSaving(true);
    setIsError(false);
    setMessage("Uploading your profile image…");
    try {
      await user.setProfileImage({ file });
      await user.reload();
      setFile(null);
      setPreviewUrl(user.imageUrl);
      setMessage("Profile image updated across your TGPI account.");
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to update your image. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function removeImage() {
    if (!user || isSaving) return;
    setIsSaving(true);
    setIsError(false);
    setMessage("Removing your profile image…");
    try {
      await user.setProfileImage({ file: null });
      await user.reload();
      setFile(null);
      setPreviewUrl(user.imageUrl);
      setMessage("Profile image removed. TGPI will show your initials instead.");
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to remove your image. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  const hasImage = Boolean(previewUrl);

  return (
    <section aria-labelledby="profile-photo-title" className="rounded-[22px] border border-[#DDD7CB] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex shrink-0 items-end gap-3" aria-label="Profile image preview">
          <div
            aria-label={`${displayName} profile image in circular format`}
            className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#F4E7BE] bg-[#0B1F3A] bg-cover bg-center font-[var(--tgpi-font-display)] text-3xl font-semibold text-[#F0D58C] shadow-[0_16px_40px_rgba(11,31,58,0.18)]"
            role="img"
            style={hasImage ? { backgroundImage: `url(${previewUrl})` } : undefined}
          >
            {!hasImage ? initials : <span className="sr-only">{displayName}</span>}
          </div>
          <div
            aria-label={`${displayName} profile image in card format`}
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D9D2C5] bg-[#0B1F3A] bg-cover bg-center text-sm font-extrabold text-[#F0D58C] shadow-sm"
            role="img"
            style={hasImage ? { backgroundImage: `url(${previewUrl})` } : undefined}
          >
            {!hasImage ? initials : <span className="sr-only">{displayName}</span>}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p id="profile-photo-title" className="text-base font-extrabold text-[#0B1F3A]">Profile image</p>
          <p className="mt-1 max-w-xl text-xs leading-5 text-[#697386]">
            Preview the same image in profile cards and navigation before saving. JPG, PNG or WebP, up to 5 MB.
          </p>
          <input
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            disabled={!isLoaded || isSaving}
            onChange={(event) => selectFile(event.target.files?.[0])}
            ref={inputRef}
            type="file"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="min-h-10 rounded-xl bg-[#0B1F3A] px-4 text-xs font-extrabold text-white transition hover:bg-[#173554] disabled:opacity-50" disabled={!isLoaded || isSaving} onClick={() => inputRef.current?.click()} type="button">
              Choose image
            </button>
            {file ? (
              <>
                <button className="min-h-10 rounded-xl bg-[#B58A2A] px-4 text-xs font-extrabold text-white transition hover:bg-[#956A13] disabled:opacity-50" disabled={isSaving} onClick={saveImage} type="button">
                  {isSaving ? "Saving…" : "Save image"}
                </button>
                <button className="min-h-10 rounded-xl border border-[#D8D2C4] bg-white px-4 text-xs font-extrabold text-[#0B1F3A]" disabled={isSaving} onClick={() => setFile(null)} type="button">
                  Cancel preview
                </button>
              </>
            ) : hasImage ? (
              <button className="min-h-10 rounded-xl border border-[#D8D2C4] bg-white px-4 text-xs font-extrabold text-[#7A3C35] transition hover:border-[#B56A62] disabled:opacity-50" disabled={!isLoaded || isSaving} onClick={removeImage} type="button">
                {isSaving ? "Removing…" : "Remove image"}
              </button>
            ) : null}
          </div>
          <p aria-live="polite" className={`mt-3 text-xs font-bold ${isError ? "text-[#A32626]" : "text-[#277352]"}`} role="status">{message}</p>
        </div>
      </div>
    </section>
  );
}
