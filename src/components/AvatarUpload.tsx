"use client";

import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { uploadAvatar } from "@/lib/storage";
import { auth } from "@/lib/firebase";

export default function AvatarUpload() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

      setMessage("Avatar updated successfully.");
    } catch (error) {
      console.error("Avatar upload error:", error);
      setMessage("Could not update avatar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <label className="mb-3 block text-sm font-medium text-slate-300">
        Upload profile photo
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-yellow-400"
      />

      {loading ? (
        <p className="mt-3 text-sm text-slate-400">Uploading...</p>
      ) : null}

      {message ? (
        <p className="mt-3 text-sm text-yellow-300">{message}</p>
      ) : null}
    </div>
  );
}