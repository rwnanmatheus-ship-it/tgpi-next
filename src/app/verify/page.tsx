"use client";

import { useState } from "react";
import Link from "next/link";

export default function VerifyPage() {
  const [id, setId] = useState("");

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-[#07111f] to-black p-10">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-yellow-400">
            TGPI Verification System
          </p>

          <h1 className="text-4xl font-bold">Verificar Credencial TGPI</h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Consulte a autenticidade de IDs, certificados e identidades digitais TGPI.
          </p>

          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Digite o TGPI ID..."
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-yellow-500/40"
            />

            <Link
              href={id ? `/verify/${id}` : "/verify"}
              className="rounded-2xl bg-yellow-500 px-6 py-4 text-center font-bold text-black"
            >
              Verificar
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}