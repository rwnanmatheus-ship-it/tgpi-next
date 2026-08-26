import BrandCrest from "@/components/BrandCrest";

export default function BrandSeal() {
  return (
    <div className="flex flex-col items-center text-center opacity-90">
      <BrandCrest
        width={1041}
        height={1274}
        sizes="(max-width: 768px) 112px, 144px"
        className="mb-3 h-auto w-28 drop-shadow-[0_14px_32px_rgba(7,26,50,0.18)] md:w-36"
      />
      <p className="max-w-xs text-xs text-slate-400">
        Knowledge, decision and global capability — connected.
      </p>
    </div>
  );
}
