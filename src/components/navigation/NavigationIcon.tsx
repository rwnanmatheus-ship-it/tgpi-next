import type { SVGProps } from "react";
import type { NavigationIconName } from "@/lib/navigation-system";

const paths: Record<NavigationIconName, readonly string[]> = {
  apps: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M4 14h6v6H4z", "M14 14h6v6h-6z"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9", "M10 21h4"],
  book: ["M12 5v16", "M3 3h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z"],
  certificate: ["M7 3h10v12H7z", "m9 15-1 6 4-2 4 2-1-6", "M9.5 8.5 11 10l3.5-3.5"],
  check: ["m5 12 4 4L19 6"],
  chevron: ["m9 5 7 7-7 7"],
  close: ["m6 6 12 12", "M6 18 18 6"],
  compare: ["M5 4v16", "M19 4v16", "M2 8h6", "M16 16h6", "M9 4h6", "M9 20h6"],
  compass: ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", "m15 9-2 4-4 2 2-4z"],
  file: ["M14 2H5v20h14V7Z", "M14 2v5h5", "M8 12h8", "M8 16h6"],
  globe: ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", "M3 12h18", "M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"],
  graph: ["M4 19V9", "M10 19V5", "M16 19v-7", "M22 19H2"],
  home: ["m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"],
  key: ["M15 3a6 6 0 1 1-4 10L3 21H1v-4l8-8a6 6 0 0 1 6-6Z", "M16 7h.01"],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  search: ["m21 21-5-5", "M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Z"],
  settings: ["M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z", "M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 2.46-.08-.02a1.7 1.7 0 0 0-1.8.34l-.46.27a1.7 1.7 0 0 0-.86 1.7V22h-2.84v-.09a1.7 1.7 0 0 0-.86-1.7l-.46-.27a1.7 1.7 0 0 0-1.8-.34l-.08.02-1.42-2.46.06-.06A1.7 1.7 0 0 0 4.6 15v-.54a1.7 1.7 0 0 0-1.2-1.54L3.32 13v-2.84l.08-.02A1.7 1.7 0 0 0 4.6 8.6v-.54a1.7 1.7 0 0 0-.34-1.8L4.2 6.2l1.42-2.46.08.02a1.7 1.7 0 0 0 1.8-.34l.46-.27a1.7 1.7 0 0 0 .86-1.7V1.4h2.84v.09a1.7 1.7 0 0 0 .86 1.7l.46.27a1.7 1.7 0 0 0 1.8.34l.08-.02 1.42 2.46-.06.06a1.7 1.7 0 0 0-.34 1.8v.54a1.7 1.7 0 0 0 1.2 1.54l.08.02V13l-.08.02a1.7 1.7 0 0 0-1.2 1.54Z"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "m9 12 2 2 4-5"],
  spark: ["m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"],
  target: ["M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", "M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z", "M12 12h.01"],
};

export default function NavigationIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: NavigationIconName }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name].map((path) => <path d={path} key={path} />)}
    </svg>
  );
}
