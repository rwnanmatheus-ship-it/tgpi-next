"use client";

import { useState } from "react";

export default function ConnectButton() {
  const [connected, setConnected] = useState(false);

  return (
    <button
      onClick={() => setConnected(true)}
      className="mt-6 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
    >
      {connected ? "Connected ✓" : "Connect"}
    </button>
  );
}