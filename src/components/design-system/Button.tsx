import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type LinkButtonProps = SharedProps & {
  href: string;
};

type NativeButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-[var(--tgpi-navy)] bg-[var(--tgpi-navy)] text-white hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-gold)] hover:text-[var(--tgpi-ink)]",
  secondary:
    "border-[var(--tgpi-gold)] bg-[var(--tgpi-surface)] text-[var(--tgpi-navy)] hover:bg-[var(--tgpi-gold-soft)]",
  ghost:
    "border-[var(--tgpi-border)] bg-transparent text-[var(--tgpi-navy)] hover:border-[var(--tgpi-gold)] hover:bg-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-3 text-sm",
  lg: "min-h-14 px-6 py-4 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-[var(--tgpi-radius-sm)] border font-black transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tgpi-gold)] disabled:cursor-not-allowed disabled:opacity-50";

export function Button(props: ButtonProps) {
  const {
    children,
    className = "",
    size = "md",
    variant = "primary",
  } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if ("href" in props && typeof props.href === "string") {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button
      className={classes}
      disabled={buttonProps.disabled}
      form={buttonProps.form}
      name={buttonProps.name}
      onClick={buttonProps.onClick}
      type={buttonProps.type ?? "button"}
      value={buttonProps.value}
    >
      {children}
    </button>
  );
}
