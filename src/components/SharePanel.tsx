"use client";

type Props = {
  text: string;
};

export default function SharePanel({ text }: Props) {
  const encoded = encodeURIComponent(text);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-yellow-400">Share Progress</h2>
      <p className="mt-3 text-slate-400">
        Show your growth, badges, and global progress to others.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=https://theglobalpolymath.com`}
          target="_blank"
          className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-500"
        >
          Share on LinkedIn
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encoded}`}
          target="_blank"
          className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-500"
        >
          Share on X
        </a>

        <a
          href={`https://wa.me/?text=${encoded}`}
          target="_blank"
          className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400"
        >
          Share on WhatsApp
        </a>
      </div>
    </div>
  );
}