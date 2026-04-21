"use client";

import { useState } from "react";

export default function PrivacySettings() {
  const [showDocument, setShowDocument] = useState(true);

  return (
    <div className="mt-8 border border-slate-800 p-6 rounded-xl">
      <h2 className="text-lg font-bold text-yellow-400">
        Privacy Settings
      </h2>

      <label className="flex items-center gap-3 mt-4">
        <input
          type="checkbox"
          checked={showDocument}
          onChange={() => setShowDocument(!showDocument)}
        />
        Show document verification publicly
      </label>
    </div>
  );
}