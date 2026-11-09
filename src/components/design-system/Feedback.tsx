import type { HTMLAttributes, ReactNode } from 'react';

export function Badge({ tone = 'neutral', className = '', ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'success' | 'warning' | 'error' | 'premium' }) {
  return <span {...props} className={`ds-badge ${className}`} data-tone={tone} />;
}
export function StatePanel({ title, description, action, tone = 'empty', ...props }: Omit<HTMLAttributes<HTMLElement>, 'title'> & { title: string; description: string; action?: ReactNode; tone?: 'empty' | 'error' | 'loading' | 'success' | 'locked' }) {
  return <section {...props} className={`ds-state ${props.className ?? ''}`} data-tone={tone} role={tone === 'error' ? 'alert' : tone === 'loading' || tone === 'success' ? 'status' : undefined} aria-busy={tone === 'loading' || undefined}>
    <h2>{title}</h2><p>{description}</p>{tone === 'loading' ? <div className="ds-skeleton" aria-hidden="true" /> : null}{action}
  </section>;
}
export function TableFrame({ children, label, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode; label: string }) {
  return <div {...props} className={`ds-table ${props.className ?? ''}`} role="region" aria-label={label} tabIndex={0}>{children}</div>;
}
