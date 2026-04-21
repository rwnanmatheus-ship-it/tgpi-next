export default function UserOnline({ online }: { online: boolean }) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full ${
        online ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-300"
      }`}
    >
      {online ? "Online" : "Offline"}
    </span>
  );
}