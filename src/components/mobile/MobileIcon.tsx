import type { SVGProps } from "react";

const paths = {
  home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z",
  compare: "M5 4v16m14-16v16M2 8h6m8 8h6M9 4h6m-6 16h6",
  book: "M12 5v16M3 3h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z",
  key: "M15 3a6 6 0 1 1-4 10L3 21H1v-4l8-8a6 6 0 0 1 6-6ZM16 7h.01",
  search: "m21 21-5-5M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M6 18 18 6",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  file: "M14 2H5v20h14V7ZM14 2v5h5M8 12h8m-8 4h6",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z",
  check: "m5 12 4 4L19 6",
  chevron: "m9 5 7 7-7 7",
} as const;

export type MobileIconName = keyof typeof paths;

export default function MobileIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: MobileIconName }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
}
