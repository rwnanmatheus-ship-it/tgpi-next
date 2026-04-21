type User = {
  name?: string;
  targetCountry?: string;
  travelIntent?: string;
};

export default function SmartMatchingEngine({
  currentUser,
  users,
}: {
  currentUser: User;
  users: User[];
}) {
  const matches = users.filter(
    (u) =>
      u.targetCountry === currentUser.targetCountry &&
      u !== currentUser
  );

  return (
    <section className="rounded-3xl border border-yellow-700/20 bg-slate-900 p-6">
      <h2 className="text-xl font-bold text-yellow-400">
        People Moving To {currentUser.targetCountry || "Your Destination"}
      </h2>

      <div className="mt-4 space-y-3">
        {matches.length === 0 ? (
          <p className="text-slate-400">
            You are early. This is your chance to lead.
          </p>
        ) : (
          matches.map((user, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-800 p-4"
            >
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-slate-400">
                {user.travelIntent}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}