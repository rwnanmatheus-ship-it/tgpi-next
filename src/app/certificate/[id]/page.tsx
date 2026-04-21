"use client";

import { useParams } from "next/navigation";

export default function CertificatePage() {
  const params = useParams<{ id: string }>();

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center p-10">
      <div className="w-[900px] border-4 border-yellow-500 p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">
          The Global Polymath Institute
        </h1>

        <p className="text-lg mb-4">This certifies that</p>

        <h2 className="text-3xl font-bold mb-4">
          TGPI Student
        </h2>

        <p className="text-lg mb-6">
          has successfully completed the course
        </p>

        <h3 className="text-2xl font-semibold mb-8">
          {params.id}
        </h3>

        <p className="text-sm text-gray-600">
          Issued by TGPI • Global Certification System
        </p>

        <button
          onClick={() => window.print()}
          className="mt-8 bg-yellow-500 px-6 py-3 font-bold"
        >
          Download PDF
        </button>
      </div>
    </main>
  );
}