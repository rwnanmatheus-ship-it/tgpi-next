export default function SocialProof() {
  const users = [
    "Moving to Canada",
    "Planning Portugal relocation",
    "Studying in USA",
  ];

  return (
    <section className="bg-slate-900 p-6 rounded-2xl">
      <h2 className="text-yellow-400 font-bold">
        Live Activity
      </h2>

      <div className="mt-4 space-y-2">
        {users.map((u, i) => (
          <p key={i} className="text-sm text-slate-300">
            • {u}
          </p>
        ))}
      </div>
    </section>
  );
}