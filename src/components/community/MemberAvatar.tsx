"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import s from "./Community.module.css";
export default function MemberAvatar({
  uid,
  name,
  image,
  handle,
}: {
  uid: string;
  name: string;
  image?: string;
  handle?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Link
      className={s.memberIdentity}
      href={`/u/${uid}`}
      aria-label={`View ${name}'s profile`}
    >
      <span className={s.memberAvatar}>
        {image && !failed ? (
          <Image
            unoptimized
            src={image}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
          />
        ) : (
          name.replace(/^@/, "").slice(0, 2).toUpperCase()
        )}
      </span>
      <span>
        <strong>{name}</strong>
        {handle && <small>@{handle}</small>}
      </span>
    </Link>
  );
}
