type CountryCardProps = {
  emoji: string;
  name: string;
  description: string;
  href: string;
};

export default function CountryCard({
  emoji,
  name,
  description,
  href,
}: CountryCardProps) {
  return (
    <a
      href={href}
      className="group rounded-3xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-1 hover:border-yellow-600/50"
    >
      <div className="mb-4 text-4xl">{emoji}</div>
      <h3 className="mb-3 text-2xl font-bold text-yellow-400">{name}</h3>
      <p className="mb-5 text-sm leading-7 text-slate-300">{description}</p>
      <span className="text-sm font-semibold text-yellow-300">
        Open Pathway →
      </span>
    </a>
  );
}