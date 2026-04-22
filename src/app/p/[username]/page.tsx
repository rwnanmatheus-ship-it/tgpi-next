export default function PublicProfile({ params }: any) {
  const { username } = params;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          @{username}
        </h1>

        <p className="text-slate-400">
          Building a global identity with TGPI.
        </p>

        <div className="rounded-2xl border border-slate-800 p-6 bg-slate-900">
          <p className="text-sm text-slate-300">
            XP: 120 | Destination: Canada | Status: Active
          </p>
        </div>

        <button className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold">
          Join TGPI
        </button>
      </div>
    </main>
  );
}