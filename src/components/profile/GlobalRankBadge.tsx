import Image from "next/image";
import type { GlobalRank, GlobalRankDefinition } from "@/lib/global-ranks";

const sizes = {
  large: { className: "h-28 w-28 sm:h-32 sm:w-32", pixels: 128 },
  medium: { className: "h-20 w-20", pixels: 80 },
  small: { className: "h-11 w-11", pixels: 44 },
} as const;

export default function GlobalRankBadge({
  rank,
  size = "medium",
}: {
  rank: GlobalRank | GlobalRankDefinition;
  size?: keyof typeof sizes;
}) {
  const config = sizes[size];

  return (
    <span
      aria-label={`${rank.name} TGPI rank emblem`}
      className={`relative block shrink-0 drop-shadow-[0_14px_24px_rgba(0,0,0,0.28)] ${config.className}`}
      role="img"
    >
      <Image
        alt=""
        className="h-full w-full object-contain"
        height={config.pixels}
        src={rank.image}
        width={config.pixels}
      />
    </span>
  );
}
