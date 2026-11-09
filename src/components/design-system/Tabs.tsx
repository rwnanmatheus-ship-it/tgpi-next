'use client';
import { useId, useState, type ReactNode } from 'react';
export function Tabs({ label, items }: { label: string; items: readonly { id: string; label: string; content: ReactNode }[] }) {
  const prefix = useId();
  const [selected, setSelected] = useState(items[0]?.id);
  if (!items.length) return null;
  const active = items.some(item => item.id === selected) ? selected : items[0].id;
  return <div><div className="ds-tabs" role="tablist" aria-label={label}>{items.map((item, index) => <button key={item.id} type="button" role="tab" id={`${prefix}-${item.id}`} aria-controls={`${prefix}-${item.id}-panel`} aria-selected={active === item.id} tabIndex={active === item.id ? 0 : -1} onClick={() => setSelected(item.id)} onKeyDown={event => {
    const next = event.key === 'ArrowRight' ? (index + 1) % items.length : event.key === 'ArrowLeft' ? (index - 1 + items.length) % items.length : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault(); setSelected(items[next].id); document.getElementById(`${prefix}-${items[next].id}`)?.focus();
  }}>{item.label}</button>)}</div>{items.map(item => <div key={item.id} role="tabpanel" id={`${prefix}-${item.id}-panel`} aria-labelledby={`${prefix}-${item.id}`} hidden={active !== item.id} tabIndex={0}>{item.content}</div>)}</div>;
}
