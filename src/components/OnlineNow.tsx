"use client";


import { LocalizedText } from "@/components/localization/LocaleProvider";
import { useEffect, useState } from "react";
import { getOnlineUsers } from "@/lib/online-users";

export default function OnlineNow() {
  const [count, setCount] = useState(() => getOnlineUsers());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCount(getOnlineUsers());
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="text-sm text-green-400">
      ● {count}{" "}<LocalizedText text={"users online"} /></div>
  );
}
