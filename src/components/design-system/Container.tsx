import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={`tgpi-container ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
