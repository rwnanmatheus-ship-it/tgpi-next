"use client";

import { ChangeEvent, useRef, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function ProfileAvatarUploader({
  currentAvatar = "",
  displayName = "User",
  onAvatarSaved,
}: {
  currentAvatar?: string;
  displayName?: string;
  onAvatarSaved?: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(currentAvatar);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Use a file up to 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const base64 = String(reader.result || "");
      setPreview(base64);
      setLoading(true);

      try {
        const user = auth.currentUser;
        if (!user) {
          alert("You must be logged in.");
          setLoading(false);
          return;
        }

        await setDoc(
          doc(db, "users", user.uid),
          { photoURL: base64 },
          { merge: true }
        );

        onAvatarSaved?.(base64);
      } catch (error) {
        console.error("Failed to save avatar:", error);
        alert("Could not save profile photo.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 p-5 shadow-[0_0_40px_rgba(255,215,0,0.04)]">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">
        Profile Photo
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-yellow-500/20 bg-black text-3xl font-bold text-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.08)]">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{displayName?.slice(0, 1)?.toUpperCase() || "U"}</span>
          )}
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-400 px-5 py-3 font-semibold text-black transition hover:brightness-105"
          >
            {loading ? "Saving..." : "Upload New Photo"}
          </button>

          <p className="text-sm text-slate-400">
            Premium recommendation: square image, clear face/logo, max 2MB.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </section>
  );
}