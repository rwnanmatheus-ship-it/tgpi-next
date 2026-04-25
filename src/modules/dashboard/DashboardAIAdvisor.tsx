"use client";

import { useState } from "react";
import { tgpiBrain } from "@/core/ai/tgpi-brain";

export default function DashboardAIAdvisor() {
  const [answer, setAnswer] = useState("Olá, sou sua IA Conselheira TGPI.");

  function run(command: string) {
    const result = tgpiBrain(command);
    setAnswer(result.message);
  }

  return (
    <section className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-black p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">IA Conselheira</h2>
        <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
          CORE AI
        </span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-300">
        {answer}
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => run("upgrade-dashboard")}
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm hover:border-yellow-500/40"
        >
          Melhorar meu painel
        </button>

        <button
          onClick={() => run("show-identity")}
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm hover:border-yellow-500/40"
        >
          Mostrar identidade global
        </button>

        <button
          onClick={() => run("premium-mode")}
          className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm hover:border-yellow-500/40"
        >
          Ativar visão premium
        </button>
      </div>
    </section>
  );
}