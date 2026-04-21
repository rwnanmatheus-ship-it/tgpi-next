"use client";

import { useState } from "react";

export default function LiveChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function send() {
    if (!input) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-yellow-400 font-bold">Live Chat</h2>

      <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
        {messages.map((m, i) => (
          <p key={i} className="text-sm text-slate-300">
            • {m}
          </p>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-950 p-2 rounded-xl"
        />
        <button
          onClick={send}
          className="bg-yellow-500 text-black px-4 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}