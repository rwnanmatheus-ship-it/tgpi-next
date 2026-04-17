type SectionHeaderProps = {
  title: string;
  description?: string;
};

export default function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-3 text-3xl font-bold text-yellow-400">{title}</h2>
      {description ? (
        <p className="max-w-4xl text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}