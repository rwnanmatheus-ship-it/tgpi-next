import type { HTMLAttributes, ReactNode } from "react";

type Grid3DDensity = "compact" | "comfortable" | "generous";

type Grid3DProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  density?: Grid3DDensity;
};

export function Grid3D({
  children,
  className = "",
  density = "comfortable",
  ...props
}: Grid3DProps) {
  return (
    <div
      className={`tgpi-grid-3d ${className}`.trim()}
      data-tgpi-density={density}
      {...props}
    >
      {children}
    </div>
  );
}
