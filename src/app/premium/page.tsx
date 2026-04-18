"use client";

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-yellow-400">
          Go Global Premium
        </h1>

        <p className="mt-4 text-slate-400">
          Unlock full access to countries, courses and global intelligence.
        </p>

        <div className="mt-10 rounded-3xl bg-slate-900 p-8">
          <p className="text-3xl font-bold text-yellow-400">
            $9.90 / month
          </p>

          <ul className="mt-6 space-y-2 text-slate-300">
            <li>✔ Full country insights</li>
            <li>✔ Premium courses</li>
            <li>✔ Global roadmap</li>
            <li>✔ Certifications</li>
          </ul>

          <button className="mt-8 rounded-xl bg-yellow-500 px-6 py-3 text-black font-bold hover:bg-yellow-400">
            Upgrade Now
          </button>
        </div>
      </div>
    </main>
  );
}