"use client";

import { useEffect, useState } from "react";

export default function ScrollDepth({ children }: any) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ transform: `translateY(${offset * 0.05}px)` }}>
      {children}
    </div>
  );
}