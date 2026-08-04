import Image from "next/image";

export default function BrandSeal() {
  return (
    <div className="flex flex-col items-center text-center opacity-90">
      <Image
        src="/brand/logo.png"
        alt="TGPI Seal"
        width={144}
        height={144}
        className="mb-3 h-auto w-28 md:w-36"
      />
      <p className="max-w-xs text-xs text-slate-400">
        Where Knowledge Meets Global Recognition
      </p>
    </div>
  );
}
