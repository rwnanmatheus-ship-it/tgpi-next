export default function UserConnections({
  followers,
  following,
}: {
  followers: string[];
  following: string[];
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-yellow-400 font-bold">Connections</h2>

      <p className="mt-3 text-sm text-slate-300">
        Followers: {followers?.length || 0}
      </p>

      <p className="text-sm text-slate-300">
        Following: {following?.length || 0}
      </p>
    </section>
  );
}