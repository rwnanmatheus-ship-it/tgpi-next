"use client";

export default function Avatar({
  name,
  photoURL,
}: {
  name?: string;
  photoURL?: string;
}) {
  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt="avatar"
        className="h-16 w-16 rounded-full object-cover border border-white/10"
      />
    );
  }

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "TG";

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-black font-bold text-lg">
      {initials}
    </div>
  );
}