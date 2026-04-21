"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PublicProfilePage from "@/app/u/[uid]/page";

export default function UsernameProfile({ params }: any) {
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    async function findUser() {
      const q = query(
        collection(db, "users"),
        where("usernameLower", "==", params.username.toLowerCase())
      );

      const snap = await getDocs(q);
      if (!snap.empty) {
        setUid(snap.docs[0].id);
      }
    }

    findUser();
  }, [params.username]);

  if (!uid) {
    return <div className="p-10 text-white">Loading profile...</div>;
  }

  return <PublicProfilePage params={{ uid }} />;
}