"use client";
import { useState } from "react";
import Image from "next/image";
import { discoveryContent, discoveryOrigin, type DiscoveryLocale } from "@/lib/discovery";
export default function DiscoveryShare({ locale }: { locale: DiscoveryLocale }) {
  const c = discoveryContent[locale];
  const [status, setStatus] = useState("");
  const url = `${discoveryOrigin}/discover/${locale}`;
  const banner = `${discoveryOrigin}/banners/tgpi-${locale}.jpg`;
  async function copy(value: string) { try { await navigator.clipboard.writeText(value); setStatus(c.copied); } catch { setStatus(c.error); } }
  async function share() { try { if (navigator.share) await navigator.share({ title: c.title, text: c.description, url }); else await copy(url); } catch (error) { if (!(error instanceof DOMException && error.name === "AbortError")) setStatus(c.error); } }
  return <div><Image src={`/banners/tgpi-${locale}.jpg`} alt={c.title} width={1600} height={900} style={{ width: "100%", maxWidth: 800, height: "auto", borderRadius: 16 }} />
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
      <button type="button" onClick={share}>{c.share}</button><button type="button" onClick={() => copy(url)}>{c.copy}</button>
      <a href={`/banners/tgpi-${locale}.jpg`} download={`TGPI-${locale}.jpg`}>{c.download}</a>
      <button type="button" onClick={() => copy(`<a href="${url}"><img src="${banner}" alt="${c.title}" width="800" style="max-width:100%;height:auto" loading="lazy"></a>`)}>{c.embed}</button>
    </div><p role="status" aria-live="polite">{status}</p>
  </div>;
}
