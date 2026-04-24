"use client";

export default function AICard() {
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
      <h2 className="text-lg font-bold mb-4">IA Conselheira</h2>

      <div className="space-y-2 text-sm">
        <button className="block w-full text-left hover:text-yellow-400">
          Qual país combina comigo?
        </button>

        <button className="block w-full text-left hover:text-yellow-400">
          Quanto custa viver no Japão?
        </button>

        <button className="block w-full text-left hover:text-yellow-400">
          Melhor visto para Europa?
        </button>
      </div>
    </div>
  );
}