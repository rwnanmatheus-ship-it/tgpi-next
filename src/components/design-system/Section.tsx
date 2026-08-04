import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionTone = "canvas" | "surface" | "navy";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  tone?: SectionTone;
};

const toneClasses: Record<SectionTone, string> = {
  canvas: "bg-transparent text-[var(--tgpi-ink)]",
  surface: "bg-[var(--tgpi-surface)] text-[var(--tgpi-ink)]",
  navy: "bg-[var(--tgpi-navy)] text-white",
};

export function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  tone = "canvas",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`tgpi-section ${toneClasses[tone]} ${className}`.trim()}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
