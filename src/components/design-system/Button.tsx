import Link from 'next/link';
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';

type SharedProps = {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
};
type LinkButtonProps = SharedProps & Omit<ComponentProps<typeof Link>, keyof SharedProps>;
type NativeButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never; loading?: boolean };
export type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Native attributes (including aria-*, ref and form actions) are preserved. */
export function Button(props: ButtonProps) {
  if ('href' in props && props.href !== undefined) {
    const { children, className = '', size = 'md', variant = 'primary', ...rest } = props as LinkButtonProps;
    return <Link {...rest} className={`ds-button ${className}`} data-size={size} data-variant={variant}>{children}</Link>;
  }
  const { children, className = '', size = 'md', variant = 'primary', loading = false, disabled, type = 'button', ...rest } = props as NativeButtonProps;
  return <button {...rest} type={type} className={`ds-button ${className}`} data-size={size} data-variant={variant} disabled={disabled || loading} aria-busy={loading || undefined}>{loading ? <span className="ds-spinner" aria-hidden="true" /> : null}{children}</button>;
}
