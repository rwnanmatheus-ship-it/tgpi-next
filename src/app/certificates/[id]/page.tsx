// (mantive toda lógica anterior + apenas upgrade visual)
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { maskDocumentNumber } from "@/lib/identity";

export default function CertificatePage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const ref = doc(db, "certificates", params.id as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const cert = snap.data();

        const userRef = doc(db, "users", cert.ownerUid);
        const userSnap = await getDoc(userRef);

        setData({
          cert,
          user: userSnap.exists() ? userSnap.data() : {},
        });
      }
    }

    load();
  }, [params.id]);

  if (!data) return <div className="p-10 text-white">Loading...</div>;

  const name = data.user.legalName || data.user.name;
  const masked = maskDocumentNumber(
    data.user.documentType,
    data.user.documentNumber
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] p-6">
      <div className="w-full max-w-4xl rounded-3xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-10 text-center shadow-2xl">

        <h1 className="text-5xl font-bold text-yellow-400">
          Certificate of Completion
        </h1>

        <p className="mt-6 text-slate-300">
          This certifies that
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white">
          {name}
        </h2>

        <p className="mt-4 text-slate-400">
          has successfully completed a verified TGPI learning path
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card label="TGPI ID" value={data.user.tgpiId} />
          <Card label="Certificate ID" value={params.id as string} />
          <Card label="Document" value={masked} />
          <Card label="Issued" value={new Date().toDateString()} />
        </div>

        <p className="mt-10 text-green-400 font-semibold">
          ✔ Verified by TGPI System
        </p>
      </div>
    </div>
  );
}

function Card({ label, value }: any) {
  return (
    <div className="border border-slate-800 rounded-xl p-4 bg-slate-900">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-white font-bold">{value}</p>
    </div>
  );
}