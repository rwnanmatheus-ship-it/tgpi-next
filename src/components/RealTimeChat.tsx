"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

type ChatMessage = {
  id: string;
  text: string;
  sender: string;
  createdAt?: Timestamp | null;
};

export default function RealTimeChat({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!chatId) return;

    const messagesQuery = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const nextMessages = snapshot.docs.map((messageDocument): ChatMessage => {
        const data = messageDocument.data();

        return {
          id: messageDocument.id,
          text: typeof data.text === "string" ? data.text : "",
          sender: typeof data.sender === "string" ? data.sender : "",
          createdAt: data.createdAt instanceof Object ? (data.createdAt as Timestamp) : null,
        };
      });

      setMessages(nextMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  async function send() {
    const text = input.trim();
    if (!text || !auth.currentUser) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text,
      sender: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    setInput("");
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-yellow-400 font-bold">Live Chat</h2>

      <div className="mt-4 h-48 overflow-y-auto space-y-2">
        {messages.map((message) => (
          <p key={message.id} className="text-sm text-slate-300">
            {message.text}
          </p>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 bg-slate-800 px-3 py-2 rounded text-white"
        />
        <button onClick={send} className="bg-yellow-500 px-4 py-2 rounded text-black">
          Send
        </button>
      </div>
    </section>
  );
}
