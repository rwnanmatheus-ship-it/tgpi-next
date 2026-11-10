'use client';

import { LocalizedText } from "@/components/localization/LocaleProvider";
import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
export function Field({ label, hint, error, id, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; hint?: string; error?: string }) {
  const generated = useId();
  const inputId = id ?? generated;
  const description = [props['aria-describedby'], hint ? `${inputId}-hint` : '', error ? `${inputId}-error` : ''].filter(Boolean).join(' ') || undefined;
  return <div className="ds-field"><label htmlFor={inputId}><LocalizedText text={label} /></label><input {...props} id={inputId} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={description} />{hint ? <small id={`${inputId}-hint`}><LocalizedText text={hint} /></small> : null}{error ? <small id={`${inputId}-error`} role="alert"><LocalizedText text={error} /></small> : null}</div>;
}
