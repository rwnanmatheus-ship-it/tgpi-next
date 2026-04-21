"use client";

import { useEffect, useState } from "react";
import { getOnlineUsers } from "@/lib/online-users";

export default function OnlineNow() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getOnlineUsers());
    const i = setInterval(() => {
      setCount(getOnlineUsers());
    }, 5000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="text-sm text-green-400">
      ● {count} users online
    </div>
  );
}