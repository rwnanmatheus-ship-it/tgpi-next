import { useId } from "react";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import type { NavigationIconName } from "@/lib/navigation-system";

/** Bespoke TGPI enamel miniatures, rendered sharply at every pixel density. */
export default function NavigationTileIcon({ name }: { name: NavigationIconName }) {
  const id = useId().replaceAll(":", "");
  const paint = `url(#${id})`;
  const art = name === "globe" ? <><circle cx="12" cy="12" r="9" fill={paint} /><path d="m5 7 4-2 2 4-3 3-3-1m10-5 4 3-1 4-4 1-2 5-3-2 1-5 4-2Z" fill="#76aeb7" stroke="#fff" strokeWidth=".6" /><ellipse cx="12" cy="12" rx="9" ry="3" stroke="#fff" opacity=".5" fill="none" /></>
    : name === "compass" ? <><circle cx="12" cy="12" r="9" fill={paint}/><circle cx="12" cy="12" r="6.5" fill="#fff9e9"/><path d="m16 6-2 8-6 4 2-8Z" fill="#b58a2a"/><path d="m16 6-6 4 4 4Z" fill="#173e60"/><circle cx="12" cy="12" r="1.4" fill="#fff"/></>
    : name === "compare" ? <><rect x="2" y="6" width="8" height="15" rx="2" fill={paint}/><rect x="14" y="3" width="8" height="18" rx="2" fill="#b58a2a"/><path d="M4 10h4m-4 4h4m8-7h4m-4 4h4m-4 4h4" stroke="#fff" strokeWidth="1.4"/><path d="m9 3 3-2 3 2M12 1v5" stroke="#173e60" fill="none"/></>
    : name === "file" ? <><path d="M5 2h10l5 5v15H5Z" fill="#d4b371"/><path d="M3 1h11l5 5v15H3Z" fill="#fffdf5" stroke="#9aafbd"/><path d="M14 1v6h5" fill="#c4d9e9"/><path d="M6 10h9m-9 3h6" stroke="#315b7b" strokeWidth="1.5"/><circle cx="16" cy="18" r="5" fill={paint}/><path d="m13.5 18 1.5 1.5 3-3" stroke="#fff" fill="none" strokeWidth="1.4"/></>
    : name === "book" ? <><path d="M2 4q5-2 10 1 5-3 10-1v15q-5-2-10 1-5-3-10-1Z" fill={paint}/><path d="M4 3q4-1 8 2 4-3 8-2v13q-4-1-8 2-4-3-8-2Z" fill="#fff8e6"/><path d="M12 5v13M6 7l4 1M6 10l4 1m4-3 4-1m-4 4 4-1" stroke="#b58a2a" strokeWidth="1"/></>
    : name === "apps" ? <>{[[3,3],[13,3],[3,13],[13,13]].map(([x,y],i)=><g key={i}><rect x={x} y={y+2} width="8" height="8" rx="2" fill="#0b1f3a" opacity=".4"/><rect x={x} y={y} width="8" height="8" rx="2" fill={i===1||i===2?"#c3a057":paint}/><path d={`M${x+2} ${y+2}h3`} stroke="#fff" opacity=".65"/></g>)}</>
    : name === "bell" ? <><ellipse cx="12" cy="21" rx="7" ry="1.5" fill="#173e60" opacity=".15"/><path d="M4 17q3-3 3-8a5 5 0 0 1 10 0q0 5 3 8Z" fill={paint}/><path d="M5 17h14" stroke="#80601f" strokeWidth="2"/><path d="M9 19q3 4 6 0" fill="#b58a2a"/><path d="M10 7q-2 2-2 6" stroke="#fff4cc" strokeWidth="1.5" fill="none"/><circle cx="18" cy="5" r="3" fill="#254d79" stroke="#fff"/></>
    : <NavigationIcon name={name} width={23} height={23}/>;
  return <span className="tgpi-nav-miniature" data-symbol={name} aria-hidden="true">
    <span className="tgpi-nav-miniature-plinth" />
    <span className="tgpi-nav-miniature-art"><svg width="25" height="25" viewBox="0 0 24 24" fill="none"><defs><linearGradient id={id} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor={name === "bell" ? "#f6db87" : "#5c91b5"}/><stop offset="1" stopColor={name === "bell" ? "#ae7d22" : "#102e50"}/></linearGradient></defs>{art}</svg></span>
    <span className="tgpi-nav-miniature-glint" />
  </span>;
}
