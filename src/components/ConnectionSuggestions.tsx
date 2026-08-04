import type { UserData } from "@/types";

type ConnectionSuggestion = Pick<UserData, "uid" | "name" | "targetCountry">;

type ConnectionSuggestionsProps = {
  users: ConnectionSuggestion[];
};

export default function ConnectionSuggestions({
  users,
}: ConnectionSuggestionsProps) {
  const suggestions = users.slice(0, 5);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        Suggested Connections
      </h2>

      <div className="mt-4 space-y-3">
        {suggestions.map((user, index) => (
          <div
            key={user.uid ?? `${user.name ?? "user"}-${index}`}
            className="flex items-center justify-between rounded-xl border border-slate-800 p-4"
          >
            <div>
              <p className="font-semibold">{user.name ?? "TGPI Member"}</p>
              <p className="text-sm text-slate-400">
                {user.targetCountry ?? "Target country not defined"}
              </p>
            </div>

            <button className="rounded-lg bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
              Connect
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
