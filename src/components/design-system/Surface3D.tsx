import type { HTMLAttributes, ReactNode } from "react";

export type Surface3DTone = "paper" | "white" | "navy" | "gold" | "glass";
export type Surface3DDepth = "subtle" | "raised" | "floating" | "hero";

type Surface3DProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "aside" | "div" | "section";
  children: ReactNode;
  depth?: Surface3DDepth;
  interactive?: boolean;
  tone?: Surface3DTone;
};

export function Surface3D({
  as: Component = "div",
  children,
  className = "",
  depth = "raised",
  interactive = false,
  tone = "paper",
  ...props
}: Surface3DProps) {
  return (
    <Component
      className={`tgpi-card-3d ${className}`.trim()}
      data-tgpi-depth={depth}
      data-tgpi-interactive={interactive || undefined}
      data-tgpi-tone={tone}
      {...props}
    >
      {children}
    </Component>
  );
}
