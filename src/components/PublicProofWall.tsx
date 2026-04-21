export default function PublicProofWall() {
  const items = [
    "Profiles are being activated for Canada and Portugal",
    "Users are earning TGPI certificates",
    "Global readiness scores are rising",
    "Community rooms are becoming active by destination",
    "More public identities are appearing inside TGPI",
  ];

  return (
    <section className="rounded-[2rem] border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 via-slate-950 to-slate-900 p-8">
      <h2 className="text-3xl font-bold text-yellow-400">
        Public Proof Wall
      </h2>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
        TGPI is not just a concept. It is becoming a living public layer of
        international preparation, identity, and proof.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm leading-7 text-slate-300">• {item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}