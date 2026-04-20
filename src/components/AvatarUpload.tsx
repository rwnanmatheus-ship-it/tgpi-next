"use client";

import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { uploadAvatar } from "@/lib/storage";

export default function AvatarUpload() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setPhotoURL(auth.currentUser.photoURL || "");
      setDisplayName(auth.currentUser.displayName || auth.currentUser.email || "TGPI");
    }
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;

    try {
      setLoading(true);
      setMessage("");

      const url = await uploadAvatar(file, auth.currentUser.uid);

      await updateProfile(auth.currentUser, {
        photoURL: url,
      });

      setPhotoURL(url);
      setMessage("Avatar updated successfully.");
    } catch (error) {
      console.error("Avatar upload error:", error);
      setMessage("Could not update avatar.");
    } finally {
      setLoading(false);
    }
  }

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <div className="flex items-center gap-4">
        {photoURL ? (
          <img
            src={photoURL}
            alt="Profile avatar"
            className="h-20 w-20 rounded-full border border-slate-700 object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500 text-xl font-bold text-black">
            {initials || "TG"}
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-slate-300">Profile photo</p>
          <p className="mt-1 text-xs text-slate-400">
            Personalize your TGPI identity.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-yellow-400"
        />
      </div>

      {loading ? (
        <p className="mt-3 text-sm text-slate-400">Uploading...</p>
      ) : null}

      {message ? (
        <p className="mt-3 text-sm text-yellow-300">{message}</p>
      ) : null}
    </div>
  );
}