type Props = {
  title: string;
  description: string;
};

export default function LockedFeatureCard({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-yellow-700/20 bg-gradient-to-br from-yellow-500/10 to-slate-950 p-6">
      <p className="mb-2 inline-block rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-200">
        Premium Locked
      </p>

      <h3 className="text-xl font-bold text-yellow-400">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}