"use client";

import { useEffect, useState, type ReactNode } from "react";

type ScrollDepthProps = {
  children: ReactNode;
};

export default function ScrollDepth({ children }: ScrollDepthProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ transform: `translateY(${offset * 0.05}px)` }}>
      {children}
    </div>
  );
}
