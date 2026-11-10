"use client";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import Image from "@/components/localization/LocalizedImage";
import { useState, useEffect } from "react";
import s from "./Community.module.css";
export default function CommunityImageUpload({
  community,
  kind,
  post = "",
  comment = "",
  onUpload,
  onBusyChange,
}: {
  community: string;
  kind: "avatar" | "cover" | "post" | "comment";
  comment?: string;
  post?: string;
  onBusyChange?: (busy: boolean) => void;
  onUpload: (image: { id: string; alt: string }) => void;
}) {
  const [alt, setAlt] = useState(""),
    [file, setFile] = useState<File | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return (
    <div className={s.reply}>
      <label>
        {["post", "comment"].includes(kind)
          ? <LocalizedText text={"Attach a photo"} />
          : <LocalizedText text={"Community {value0}"} values={{value0: String(kind)}} />}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={busy}
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setError("");
          }}
        />
      </label>
      {preview && (
        <Image
          unoptimized
          width={240}
          height={180}
          src={preview}
          alt="Selected image preview"
          className={s.uploadPreview}
        />
      )}
      <label><LocalizedText text={"Image description (alternative text)"} /><input
          value={alt}
          maxLength={250}
          onChange={(e) => setAlt(e.target.value)}
        />
      </label>
      <p className={s.notice}><LocalizedText text={"JPEG, PNG or WebP · under 3 MB. Do not upload personal documents."} /></p>
      <button
        type="button"
        className={s.secondary}
        disabled={busy || !file || !alt.trim()}
        onClick={async () => {
          if (!file) return;
          setBusy(true);
          onBusyChange?.(true);
          setError("");
          try {
            if (file.size > 3_000_000)
              throw new Error("Use an image under 3 MB.");
            const r = await fetch(
                `/api/community/assets?${new URLSearchParams({ community, kind, post, comment, alt })}`,
                { method: "POST", body: file, cache: "no-store" },
              ),
              data = await r.json();
            if (!r.ok) throw new Error(data.error);
            onUpload(data);
            setFile(null);
            setAlt("");
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
            onBusyChange?.(false);
          }
        }}
      >
        {busy ? <LocalizedText text={"Uploading…"} /> : <LocalizedText text={"Upload image"} />}
      </button>
      {error && (
        <p className={s.error} role="alert">
          <LocalizedText text={error} />
        </p>
      )}
    </div>
  );
}
