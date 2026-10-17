"use client";
import { QRCodeSVG } from "qrcode.react";
export default function CertificateQr({
  url,
  id,
}: {
  url: string;
  id: string;
}) {
  return (
    <QRCodeSVG
      value={url}
      size={148}
      bgColor="#FFFFFF"
      fgColor="#0B1F3A"
      level="M"
      marginSize={4}
      title={`Verify ${id}`}
    />
  );
}
