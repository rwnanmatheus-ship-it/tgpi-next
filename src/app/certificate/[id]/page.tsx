"use client";

import { useParams } from "next/navigation";

export default function CertificatePage() {
  const params = useParams();

  return (
    <div className="p-10 text-white text-center">
      <h1 className="text-3xl font-bold">Certificate of Completion</h1>

      <p className="mt-4 text-slate-400">
        Certificate ID: {params.id}
      </p>

      <div className="mt-10 border border-white/10 p-6 rounded-xl">
        <p className="text-xl font-semibold">
          Verified by The Global Polymath Institute
        </p>

        <p className="text-green-400 mt-4 font-semibold">
          ✔ Blockchain-style Validation ID Active
        </p>
      </div>
    </div>
  );
}