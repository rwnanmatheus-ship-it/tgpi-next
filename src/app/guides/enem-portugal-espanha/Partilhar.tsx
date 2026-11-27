"use client";

import { useState } from "react";
import { enemGuidePath } from "@/app/guia-paises/campaign";

const canonical = "https://www.theglobalpolymath.com" + enemGuidePath;
const text = {
  heading: "Use este guia em uma orientação de estudos",
  activity: "Em dupla, escolham uma graduação em cada país. Cada pessoa consulta o edital de um curso e anota o requisito de ingresso, a anuidade aplicável e a fonte. Troquem as fichas e confiram se estão comparando o mesmo ano letivo e o mesmo perfil de estudante.",
  share: "Compartilhar guia",
  copy: "Copiar link",
  copied: "Link do guia copiado.",
  manual: "Selecione o endereço abaixo e copie o link.",
  urlLabel: "Endereço do guia",
  title: "Enem para estudar em Portugal ou na Espanha? | TGPI",
};

export default function Partilhar() {
  const [status, setStatus] = useState<"ready" | "copied" | "manual">("ready");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(canonical);
      setStatus("copied");
    } catch {
      setStatus("manual");
    }
  }

  async function share() {
    setStatus("ready");
    const data = { title: text.title, url: canonical };
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
        await navigator.share(data);
        return;
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
    }
    await copyLink();
  }

  const buttonClass = "min-h-11 rounded-lg border border-current px-4 py-2 text-sm font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <section id="compartilhar" className="guides-section" aria-labelledby="guia-atividade">
      <h2 id="guia-atividade">{text.heading}</h2>
      <p>{text.activity}</p>
      <div className="mt-4 flex flex-wrap gap-3 print:hidden">
        <button type="button" className={buttonClass} onClick={share}>{text.share}</button>
        <button type="button" className={buttonClass} onClick={copyLink}>{text.copy}</button>
      </div>
      <div role="status" className="mt-2 text-sm print:hidden">
        {status === "copied" && text.copied}
        {status === "manual" && text.manual}
      </div>
      {status === "manual" && (
        <input type="text" className="mt-2 w-full rounded-md border px-3 py-2 print:hidden"
          readOnly aria-label={text.urlLabel} value={canonical} onFocus={event => event.currentTarget.select()} />
      )}
    </section>
  );
}
