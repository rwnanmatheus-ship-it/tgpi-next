export default function ConnectionSuggestions({
  users,
}: {
  users: any[];
}) {
  const suggestions = users.slice(0, 5);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Suggested Connections
      </h2>

      <div className="mt-4 space-y-3">
        {suggestions.map((user, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-slate-800 p-4"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-slate-400">
                {user.targetCountry}
              </p>
            </div>

            <button className="rounded-lg bg-yellow-500 px-3 py-1 text-black text-sm font-bold">
              Connect
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}