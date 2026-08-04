import type { ElementType, ReactNode } from "react";

type EditorialHeadingProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "ink" | "navy" | "light";
};

const sizeClasses = {
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-6xl lg:text-7xl",
  xl: "text-5xl md:text-7xl lg:text-[5.5rem]",
};

const toneClasses = {
  ink: "text-[var(--tgpi-ink)]",
  navy: "text-[var(--tgpi-navy)]",
  light: "text-white",
};

export function EditorialHeading({
  as: Component = "h2",
  children,
  className = "",
  size = "lg",
  tone = "ink",
}: EditorialHeadingProps) {
  return (
    <Component
      className={`tgpi-display font-semibold leading-[0.94] tracking-[-0.045em] ${sizeClasses[size]} ${toneClasses[tone]} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
