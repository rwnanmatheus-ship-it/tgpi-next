export default function TGPICard({
  children,
  className = "",
  variant,
  tone,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "institutional" | "content" | "action" | "indicator";
  tone?: "white" | "navy" | "gold" | "glass";
  interactive?: boolean;
}) {
  const material = tone ?? (variant === "institutional" ? "navy" : variant ? "white" : "glass");
  return (
    <div
      className={`tgpi-card-3d rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg ${className}`.trim()}
      data-tgpi-depth="raised"
      data-tgpi-tone={material}
      data-tgpi-variant={variant}
      data-tgpi-interactive={interactive ? "true" : "false"}
    >
      {children}
    </div>
  );
}
