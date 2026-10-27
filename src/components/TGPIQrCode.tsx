"use client";

import { QRCodeCanvas } from "qrcode.react";
import { LocalizedText } from "@/components/localization/LocaleProvider";


export default function TGPIQrCode({ tgpiId }: { tgpiId: string }) {
  const url = `https://theglobalpolymath.com/verify/${tgpiId}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeCanvas value={url} size={120} />
      <p className="text-xs text-slate-400 text-center"><LocalizedText text="Scan to verify" /></p>
    </div>
  );
}