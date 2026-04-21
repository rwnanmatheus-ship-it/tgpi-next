"use client";

export default function InviteCard({ username }: { username: string }) {
  const link = `https://theglobalpolymath.com/user/${username}`;

  function copy() {
    navigator.clipboard.writeText(link);
    alert("Invite link copied!");
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <h2 className="text-yellow-400 font-bold">
        Invite Friends
      </h2>

      <p className="text-sm text-slate-400 mt-2">
        Grow your global network.
      </p>

      <button onClick={copy} className="mt-4 bg-yellow-500 px-4 py-2 rounded text-black">
        Copy Invite Link
      </button>
    </div>
  );
}