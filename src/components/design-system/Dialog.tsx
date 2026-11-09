'use client';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { containDialogFocus } from '@/lib/dialog-focus';
import { Button } from './Button';
export function Dialog({ open, onClose, title, closeLabel, children, placement = 'center' }: { open: boolean; onClose: () => void; title: string; closeLabel: string; children: ReactNode; placement?: 'center' | 'end' }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = overflow; active?.focus({ preventScroll: true }); };
  }, [open]);
  return <dialog ref={ref} className="ds-dialog" data-placement={placement} aria-labelledby={titleId} onKeyDown={containDialogFocus} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target !== event.currentTarget) return; const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); }}><header><h2 id={titleId}>{title}</h2><Button variant="ghost" onClick={onClose} aria-label={closeLabel}>×</Button></header>{children}</dialog>;
}
