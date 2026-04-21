"use client";

import { useState } from "react";

export default function Missions() {
  const [score, setScore] = useState(0);

  function answer(correct: boolean) {
    if (correct) setScore((s) => s + 10);
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-yellow-400 font-bold text-xl">
        🧠 Global Missions
      </h2>

      <p className="text-sm text-slate-400 mt-2">
        Test your readiness and gain XP.
      </p>

      <div className="mt-4 space-y-3">
        <p className="text-white">
          Do you need a visa to move abroad?
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => answer(true)}
            className="bg-green-500 px-4 py-2 rounded text-black"
          >
            Yes
          </button>

          <button
            onClick={() => answer(false)}
            className="bg-red-500 px-4 py-2 rounded text-black"
          >
            No
          </button>
        </div>

        <p className="text-yellow-400 font-bold mt-2">
          XP: {score}
        </p>
      </div>
    </section>
  );
}