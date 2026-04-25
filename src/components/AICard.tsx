"use client";

export default function AICard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="mb-4 text-lg font-bold">AI Advisor</h2>

      <div className="space-y-2 text-sm">
        <button className="block w-full text-left hover:text-yellow-400">
          Which country matches my profile?
        </button>

        <button className="block w-full text-left hover:text-yellow-400">
          How much does it cost to live in Japan?
        </button>

        <button className="block w-full text-left hover:text-yellow-400">
          What is the best visa path for Europe?
        </button>
      </div>
    </div>
  );
}