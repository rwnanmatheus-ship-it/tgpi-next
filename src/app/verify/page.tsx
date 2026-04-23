"use client";

import { useState } from "react";
import { getCredentialById } from "@/lib/tgpi-credentials";

export default function VerifyPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setLoading(true);
    const data = await getCredentialById(input);
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">

        <h1 className="text-4xl font-bold text-yellow-400">
          TGPI Credential Verification
        </h1>

        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter TGPI ID..."
            className="flex-1 rounded-xl px-4 py-3 bg-white/5 border border-white/10"
          />
          <button
            onClick={handleVerify}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            Verify
          </button>
        </div>

        {loading && <p>Checking...</p>}

        {result && (
          <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Program:</strong> {result.program}</p>
            <p><strong>Score:</strong> {result.score}/100</p>
            <p><strong>Level:</strong> {result.level}</p>
            <p><strong>Status:</strong> ✅ Verified</p>
          </div>
        )}

        {result === null && !loading && input && (
          <p className="text-red-400">Credential not found</p>
        )}

      </div>
    </main>
  );
}