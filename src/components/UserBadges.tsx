export default function UserBadges() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge label="Explorer" />
      <Badge label="Active" />
      <Badge label="Global Ready" />
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="bg-yellow-500/10 text-yellow-300 px-3 py-1 rounded-full text-xs">
      {label}
    </span>
  );
}