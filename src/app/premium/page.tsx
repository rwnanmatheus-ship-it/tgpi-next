"use client";

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl text-center">

        {/* HEADER */}
        <h1 className="text-5xl font-bold text-yellow-400">
          Live Anywhere in the World 🌍
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          The Global Polymath Institute prepares you to live, work and succeed
          in any country — with real knowledge most people don’t have.
        </p>

        {/* BENEFITS */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-xl font-bold text-yellow-300">
              🌎 Countries Intelligence
            </h3>
            <p className="mt-2 text-slate-400">
              Visa, cost of living, culture and real strategies.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-xl font-bold text-yellow-300">
              🎓 Courses & Preparation
            </h3>
            <p className="mt-2 text-slate-400">
              Learn how to move, adapt and succeed globally.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-xl font-bold text-yellow-300">
              🧠 Global Strategy
            </h3>
            <p className="mt-2 text-slate-400">
              Build your international life with a clear roadmap.
            </p>
          </div>

        </div>

        {/* PRICING */}
        <div className="mt-14 rounded-3xl bg-slate-900 p-10">

          <p className="text-4xl font-bold text-yellow-400">
            $7.90 / month
          </p>

          <p className="mt-3 text-slate-400">
            Cancel anytime. Instant access.
          </p>

          <ul className="mt-6 space-y-2 text-slate-300">
            <li>✔ Full country access</li>
            <li>✔ Premium courses</li>
            <li>✔ Global planning system</li>
            <li>✔ Certifications</li>
          </ul>

          {/* BOTÃO WHATSAPP COM SEU NÚMERO */}
          <a
            href="https://wa.me/17039963146?text=Hello%20I%20want%20to%20subscribe%20to%20TGPI%20Premium"
            target="_blank"
            className="mt-8 block w-full rounded-xl bg-yellow-500 px-6 py-4 text-lg font-bold text-black hover:bg-yellow-400"
          >
            Start Global Access
          </a>

        </div>

      </div>
    </main>
  );
}