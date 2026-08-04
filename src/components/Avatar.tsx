"use client";

import Image from "next/image";

export default function Avatar({
  name,
  photoURL,
}: {
  name?: string;
  photoURL?: string;
}) {
  if (photoURL) {
    return (
      <Image
        src={photoURL}
        alt={name ? `${name} avatar` : "TGPI member avatar"}
        width={64}
        height={64}
        unoptimized
        className="h-16 w-16 rounded-full border border-white/10 object-cover"
      />
    );
  }

  const initials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "TG";

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-black">
      {initials}
    </div>
  );
}
