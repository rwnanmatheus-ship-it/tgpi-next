import type { ReactNode } from "react";

type EditorialCardTone = "paper" | "white" | "navy";

type EditorialCardProps = {
  children: ReactNode;
  className?: string;
  tone?: EditorialCardTone;
};

const toneClasses: Record<EditorialCardTone, string> = {
  paper:
    "border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] text-[var(--tgpi-ink)]",
  white:
    "border-[var(--tgpi-border-soft)] bg-white text-[var(--tgpi-ink)]",
  navy: "border-white/10 bg-[var(--tgpi-navy)] text-white",
};

export function EditorialCard({
  children,
  className = "",
  tone = "paper",
}: EditorialCardProps) {
  return (
    <article
      className={`rounded-[var(--tgpi-radius-lg)] border p-5 shadow-[var(--tgpi-shadow-soft)] md:p-7 ${toneClasses[tone]} ${className}`.trim()}
    >
      {children}
    </article>
  );
}
