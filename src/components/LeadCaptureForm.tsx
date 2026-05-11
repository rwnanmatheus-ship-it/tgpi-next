"use client";

import { useState } from "react";

export default function LeadCaptureForm() {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: integrate with backend or marketing platform
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-yellow-500/30 bg-neutral-900 p-8 shadow-lg">
      {submitted ? (
        <div className="text-center">
          <h3 className="mb-2 text-xl font-semibold text-yellow-400">Obrigado!</h3>
          <p className="text-gray-300">Em breve você receberá novidades da TGPI.</p>
        </div>
      ) : (
        <>
          <h3 className="mb-4 text-2xl font-semibold text-white">Entre para o futuro global</h3>
          <p className="mb-6 text-gray-400">
            Inscreva-se para receber insights, conteúdos premium e atualizações da TGPI.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              required
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-neutral-800 p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="rounded-md bg-yellow-600 py-3 text-center font-semibold text-neutral-900 transition-colors hover:bg-yellow-500"
            >
              Inscrever-se
            </button>
          </form>
        </>
      )}
    </div>
  );
}
