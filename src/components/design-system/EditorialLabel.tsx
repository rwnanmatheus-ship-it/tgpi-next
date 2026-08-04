import type { ReactNode } from "react";

type EditorialLabelProps = {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function EditorialLabel({
  children,
  className = "",
  tone = "light",
}: EditorialLabelProps) {
  const toneClass =
    tone === "dark"
      ? "border-white/20 bg-white/5 text-[var(--tgpi-gold-soft)]"
      : "border-[var(--tgpi-gold)]/55 bg-[var(--tgpi-surface)] text-[var(--tgpi-gold-strong)]";

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.28em] ${toneClass} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
