import FollowButton from "./FollowButton";

export default function UserCard({ name }: { name: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="font-bold text-white">{name}</p>
      <div className="mt-3">
        <FollowButton />
      </div>
    </div>
  );
}