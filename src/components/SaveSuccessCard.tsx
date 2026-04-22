"use client";

export default function SaveSuccessCard({
  message,
  visible,
}: {
  message: string;
  visible: boolean;
}) {
  if (!visible) return null;

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-[0_0_30px_rgba(16,185,129,0.12)]">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-black">
          ✓
        </div>

        <div>
          <p className="font-semibold text-emerald-300">Saved successfully</p>
          <p className="mt-1 text-sm text-emerald-100/90">{message}</p>
        </div>
      </div>
    </div>
  );
}