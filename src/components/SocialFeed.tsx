export default function SocialFeed() {
  const posts = [
    "User is planning move to Canada",
    "New profile created",
    "User reached 500 XP",
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-yellow-400 font-bold">Global Feed</h2>

      <div className="mt-4 space-y-3">
        {posts.map((p, i) => (
          <p key={i} className="text-sm text-slate-300">
            • {p}
          </p>
        ))}
      </div>
    </section>
  );
}