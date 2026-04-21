import Link from "next/link";

type MatchUser = {
  uid?: string;
  name?: string;
  username?: string;
  targetCountry?: string;
  travelIntent?: string;
  level?: number;
};

export default function SmartMatchingPlus({
  currentUser,
  users,
}: {
  currentUser: any;
  users: MatchUser[];
}) {
  const target = String(currentUser?.targetCountry || "").toLowerCase();
  const intent = String(currentUser?.travelIntent || "").toLowerCase();
  const level = Number(currentUser?.level || 1);

  const matches = users
    .filter((user) => user.uid && user.uid !== currentUser?.uid)
    .map((user) => {
      let score = 0;

      if (
        target &&
        String(user.targetCountry || "").toLowerCase() === target
      ) {
        score += 50;
      }

      if (
        intent &&
        String(user.travelIntent || "").toLowerCase() === intent
      ) {
        score += 30;
      }

      if (Math.abs(Number(user.level || 1) - level) <= 2) {
        score += 20;
      }

      return {
        ...user,
        score,
      };
    })
    .filter((user) => user.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-yellow-400">
        Smart Matching 2.0
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        TGPI compares destination, intent, and progression level to suggest
        stronger international connections.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {matches.length ? (
          matches.map((match) => (
            <div
              key={match.uid}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
            >
              <p className="text-lg font-bold text-white">
                {match.name || match.username || "TGPI Member"}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                {match.targetCountry || "No target country"} •{" "}
                {match.travelIntent || "No intent"}
              </p>
              <p className="mt-2 text-sm text-yellow-300">
                Match score: {match.score}
              </p>

              {match.username ? (
                <Link
                  href={`/user/${match.username}`}
                  className="mt-4 inline-block rounded-xl bg-yellow-500 px-4 py-2 text-sm font-bold text-black"
                >
                  Open Profile
                </Link>
              ) : null}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-300">
            Better matches will appear as more users define their target country
            and travel intent.
          </p>
        )}
      </div>
    </section>
  );
}