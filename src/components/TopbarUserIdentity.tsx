"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  buildSafeProfileDefaults,
  loadCommandCenterProfileByUid,
} from "@/lib/profile-command-center";

export default function TopbarUserIdentity() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setName("");
        setEmail("");
        setAvatar("");
        return;
      }

      setEmail(user.email || "");

      const profile = await loadCommandCenterProfileByUid(user.uid);
      const safe = buildSafeProfileDefaults(profile);

      setName(
        safe.displayName ||
          user.displayName ||
          (user.email ? user.email.split("@")[0] : "User")
      );
      setAvatar(safe.photoURL || user.photoURL || "");
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-yellow-500/20 bg-[#02122d] px-3 py-2">
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-yellow-500/20 bg-black text-sm font-bold text-yellow-400">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span>{name?.slice(0, 1)?.toUpperCase() || "U"}</span>
        )}
      </div>

      <div className="max-w-[180px]">
        <p className="truncate text-sm font-semibold text-white">{name || "Usuário"}</p>
        <p className="truncate text-xs text-slate-400">{email}</p>
      </div>
    </div>
  );
}