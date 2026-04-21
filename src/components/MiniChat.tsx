"use client";

import { useState } from "react";

export default function MiniChat({
  targetName,
}: {
  targetName: string;
}) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function send() {
    if (!input) return;
    setMessages([...messages, input]);
    setInput("");
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Chat with {targetName}
      </h2>

      <div className="mt-4 h-40 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <p key={i} className="text-sm text-slate-300">
            {m}
          </p>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded bg-slate-800 px-3 py-2 text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={send}
          className="bg-yellow-500 px-4 py-2 text-black rounded"
        >
          Send
        </button>
      </div>
    </section>
  );
}