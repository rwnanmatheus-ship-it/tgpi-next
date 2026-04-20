"use client";

export default function XPBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-yellow-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}