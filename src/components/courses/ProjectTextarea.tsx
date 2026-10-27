"use client";
import { useState, type TextareaHTMLAttributes } from "react";
/** Controlled state preserves the student's draft when a server action returns validation feedback. */
export default function ProjectTextarea({ initialValue, ...props }: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue" | "onChange"> & { initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  return <textarea {...props} value={value} onChange={event => setValue(event.target.value)} />;
}
