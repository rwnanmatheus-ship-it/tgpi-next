"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getAvatarCrop } from "@/lib/avatar-crop";
import { announceProgressSaved } from "@/lib/progress-sync";
import { LocalizedText } from "@/components/localization/LocaleProvider";


const ACCEPTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
export default function TgpiAvatarEditor({ displayName, initialImageUrl, initials }: {
  displayName: string; initialImageUrl: string; initials: string;
}) {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const savedImage = user?.hasImage === false ? "" : user?.imageUrl || initialImageUrl;

  useEffect(() => {
    if (!file) return;
    let active = true;
    let decoded: ImageBitmap | undefined;
    createImageBitmap(file).then(image => {
      decoded = image;
      if (!active) { image.close(); return; }
      if (image.width * image.height > 40_000_000 || Math.min(image.width, image.height) < 128) {
        image.close(); setFile(null); setError(true); setMessage("Choose an image at least 128 × 128, up to 40 megapixels."); return;
      }
      setBitmap(image);
    }).catch(() => { if (active) { setFile(null); setError(true); setMessage("This image could not be decoded. Choose another JPG, PNG or WebP."); } });
    return () => { active = false; decoded?.close(); };
  }, [file]);

  useEffect(() => {
    if (!bitmap || !file || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const crop = getAvatarCrop(bitmap.width, bitmap.height, zoom, x, y);
    context.fillStyle = "#F8F5EE";
    context.fillRect(0, 0, 320, 320);
    context.drawImage(bitmap, crop.left, crop.top, crop.size, crop.size, 0, 0, 320, 320);
    setPreview(canvas.toDataURL("image/jpeg", .9));
  }, [bitmap, file, zoom, x, y]);

  function cancel() { setFile(null); setBitmap(null); setPreview(""); if (inputRef.current) inputRef.current.value = ""; }
  function selectFile(selected?: File) {
    if (!selected) return;
    setError(false); setMessage("");
    if (!ACCEPTED_IMAGE_TYPES.has(selected.type) || selected.size > 5 * 1024 * 1024) {
      setError(true); setMessage("Choose a JPG, PNG or WebP image up to 5 MB."); if (inputRef.current) inputRef.current.value = ""; return;
    }
    setBitmap(null); setPreview(""); setFile(selected); setZoom(1); setX(50); setY(50);
  }
  async function save() {
    if (!user || !bitmap || busy) return;
    setBusy(true); setError(false); setMessage("Saving your cropped photo…");
    try {
      const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1024;
      const context = canvas.getContext("2d"); if (!context) throw new Error("Image editing is unavailable in this browser.");
      const crop = getAvatarCrop(bitmap.width, bitmap.height, zoom, x, y);
      context.fillStyle = "#F8F5EE"; context.fillRect(0, 0, 1024, 1024);
      context.drawImage(bitmap, crop.left, crop.top, crop.size, crop.size, 0, 0, 1024, 1024);
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("Unable to prepare photo.")), "image/jpeg", .92));
      await user.setProfileImage({ file: new File([blob], "tgpi-profile.jpg", { type: "image/jpeg" }) });
      cancel(); setMessage("Your cropped photo is saved across TGPI."); announceProgressSaved(); router.refresh();
    } catch { setError(true); setMessage("Unable to save the photo. Your crop is preserved; please try again."); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (!user || busy) return;
    setBusy(true); setError(false);
    try { await user.setProfileImage({ file: null }); cancel(); setMessage("Photo removed."); announceProgressSaved(); router.refresh(); }
    catch { setError(true); setMessage("Unable to remove your photo. Please try again."); }
    finally { setBusy(false); }
  }
  const photo = file ? preview : savedImage;
  return <section aria-labelledby="profile-photo-title" className="tgpi-account-tile rounded-[24px] border border-[#DDD7CB] bg-white p-5 sm:p-7">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="flex shrink-0 items-end gap-3" aria-label="Profile photo preview">
        <div role="img" aria-label={`${displayName}, circular preview`} className="grid h-28 w-28 place-items-center rounded-full border-4 border-[#F4E7BE] bg-[#0B1F3A] bg-cover bg-center text-3xl font-bold text-[#F0D58C] shadow-[0_12px_28px_#0b1f3a26]" style={photo ? { backgroundImage: `url(${photo})` } : undefined}>{!photo ? initials : null}</div>
        <div role="img" aria-label={`${displayName}, card preview`} className="grid h-16 w-16 place-items-center rounded-2xl border border-[#D8D2C4] bg-[#0B1F3A] bg-cover bg-center font-bold text-[#F0D58C]" style={photo ? { backgroundImage: `url(${photo})` } : undefined}>{!photo ? initials : null}</div>
      </div>
      <div className="min-w-0 flex-1"><h3 id="profile-photo-title" className="text-lg font-extrabold text-[#0B1F3A]">Your profile photo</h3><p className="mt-1 text-sm leading-6 text-[#526174]">Choose, frame and preview before saving. JPG, PNG or WebP up to 5 MB. The same crop appears in navigation and profile cards.</p>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={!isLoaded || busy} onChange={event => selectFile(event.target.files?.[0])} />
        <div className="mt-4 flex flex-wrap gap-3"><button className="min-h-11 rounded-xl bg-[#0B1F3A] px-4 text-sm font-bold text-white disabled:opacity-50" disabled={!isLoaded || busy} onClick={() => inputRef.current?.click()} type="button">Choose photo</button>{!file && photo ? <button className="min-h-11 rounded-xl border border-[#D8D2C4] px-4 text-sm font-bold text-[#863D35] disabled:opacity-50" disabled={!isLoaded || busy} onClick={remove} type="button">Remove photo</button> : null}</div>
      </div>
    </div>
    {file ? <fieldset disabled={busy} className="mt-6 grid gap-6 border-t border-[#DDD7CB] pt-6 md:grid-cols-[minmax(0,320px)_1fr]"><legend className="sr-only">Frame your photo</legend>
      <div className="relative mx-auto aspect-square w-full max-w-80 overflow-hidden rounded-2xl bg-[#0B1F3A]"><canvas ref={canvasRef} width={320} height={320} aria-label="Cropped photo preview" className="h-full w-full" /><div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#F0D58C] shadow-[0_0_0_50px_#07182d88]" /></div>
      <div className="flex flex-col justify-center gap-5">{[
        { label: "Zoom", value: zoom, set: setZoom, min: 1, max: 3, step: .01 },
        { label: "Horizontal position", value: x, set: setX, min: 0, max: 100, step: 1 },
        { label: "Vertical position", value: y, set: setY, min: 0, max: 100, step: 1 },
      ].map(control => <label key={control.label} className="block text-sm font-bold text-[#0B1F3A]">{control.label}<input type="range" min={control.min} max={control.max} step={control.step} value={control.value} onChange={event => control.set(Number(event.target.value))} className="mt-3 block w-full accent-[#0B1F3A]" /></label>)}
        <div className="flex flex-wrap gap-3"><button type="button" disabled={!bitmap || busy} onClick={save} className="min-h-11 rounded-xl bg-[#0B1F3A] px-5 text-sm font-bold text-white disabled:opacity-50">{busy ? "Saving…" : "Save cropped photo"}</button><button type="button" disabled={busy} onClick={cancel} className="min-h-11 rounded-xl border border-[#D8D2C4] bg-white px-4 text-sm font-bold text-[#0B1F3A]"><LocalizedText text="Cancel" /></button></div>
      </div>
    </fieldset> : null}
    <p aria-live="polite" role="status" className={`mt-3 text-sm font-bold ${error ? "text-[#A32626]" : "text-[#277352]"}`}>{message}</p>
  </section>;
}
