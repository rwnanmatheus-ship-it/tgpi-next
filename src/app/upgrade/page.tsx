export default function UpgradePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold text-yellow-400">
          Upgrade to TGPI Premium
        </h1>

        <p className="mt-4 text-slate-300">
          Access advanced country insights, premium courses and global
          preparation tools.
        </p>

        <div className="mt-8 text-3xl font-bold text-yellow-300">
          R$29/month
        </div>

        <button className="mt-6 bg-yellow-500 px-6 py-3 rounded-xl text-black">
          Upgrade Now
        </button>
      </div>
    </main>
  );
}