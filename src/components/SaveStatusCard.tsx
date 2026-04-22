"use client";

type StatusType = "success" | "error";

export default function SaveStatusCard({
  message,
  visible,
  type,
}: {
  message: string;
  visible: boolean;
  type: StatusType;
}) {
  if (!visible) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`rounded-3xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.08)] ${
        isSuccess
          ? "border border-emerald-500/30 bg-emerald-500/10"
          : "border border-red-500/30 bg-red-500/10"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
            isSuccess ? "bg-emerald-500 text-black" : "bg-red-500 text-white"
          }`}
        >
          {isSuccess ? "✓" : "!"}
        </div>

        <div>
          <p
            className={`font-semibold ${
              isSuccess ? "text-emerald-300" : "text-red-300"
            }`}
          >
            {isSuccess ? "Saved successfully" : "Save failed"}
          </p>
          <p
            className={`mt-1 text-sm ${
              isSuccess ? "text-emerald-100/90" : "text-red-100/90"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}