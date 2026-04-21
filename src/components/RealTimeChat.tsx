"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function RealTimeChat({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((doc) => doc.data()));
    });

    return () => unsub();
  }, [chatId]);

  async function send() {
    if (!input || !auth.currentUser) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: input,
      sender: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    setInput("");
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-yellow-400 font-bold">Live Chat</h2>

      <div className="mt-4 h-48 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <p key={i} className="text-sm text-slate-300">
            {m.text}
          </p>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-800 px-3 py-2 rounded text-white"
        />
        <button onClick={send} className="bg-yellow-500 px-4 py-2 rounded text-black">
          Send
        </button>
      </div>
    </section>
  );
}