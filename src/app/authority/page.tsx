import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import TGPIPageShell from "@/components/TGPIPageShell";
import { buildMetadata } from "@/seo";

export const metadata: Metadata = buildMetadata({
  title: "TGPI Methodology — How Country Intelligence Is Built",
  description:
    "Understand the TGPI methodology for comparing countries, interpreting decision signals, documenting sources and communicating uncertainty responsibly.",
  path: "/authority",
});

const methodologyLayers = [
  {
    code: "01",
    title: "Identity and context",
    text: "Start with the country, region, language, currency and the practical context in which a person intends to live, work, study or move.",
  },
  {
    code: "02",
    title: "Comparable signals",
    text: "Organize recurring dimensions such as cost profile, safety, language access, quality of life, education, work and adaptation friction.",
  },
  {
    code: "03",
    title: "Trade-offs",
    text: "A strong score in one dimension does not erase weaknesses in another. TGPI surfaces the conflict instead of producing a universal best country.",
  },
  {
    code: "04",
    title: "Personal fit",
    text: "The same country can be a strong or weak option depending on budget, profession, language, family structure, timeline and risk tolerance.",
  },
  {
    code: "05",
    title: "Evidence and review",
    text: "Changeable facts should be verified against appropriate sources. Review dates and source notes must describe real editorial work.",
  },
  {
    code: "06",
    title: "Action path",
    text: "Research should lead to a useful next step: compare, validate documents, build a capability, save a shortlist or seek qualified advice.",
  },
] as const;

export default function AuthorityPage() {
  return (
    <TGPIPageShell>
      <Breadcrumbs
        items={[
          { name: "TGPI", path: "/" },
          { name: "Methodology", path: "/authority" },
        ]}
      />

      <header className="mt-6 overflow-hidden rounded-[40px] bg-[#071A32] p-8 text-white shadow-[0_34px_100px_rgba(11,31,58,0.22)] md:p-12">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-[#F0D58C]">
          TGPI Decision Methodology
        </p>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.045em] md:text-7xl">
          A country is a system of trade-offs—not a universal ranking.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D7DFEA]">
          TGPI organizes international information into a consistent decision framework. The objective is not to choose for the user, but to make evidence, uncertainty and personal fit easier to examine.
        </p>
      </header>

      <section className="grid gap-5 py-12 md:grid-cols-2 lg:grid-cols-3" aria-label="TGPI methodology layers">
        {methodologyLayers.map((layer) => (
          <article key={layer.code} className="rounded-[28px] border border-[#D8D2C4] bg-white p-7 shadow-[0_20px_55px_rgba(11,31,58,0.07)]">
            <p className="text-xs font-black tracking-[0.22em] text-[#9A6A12]">{layer.code}</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#0B1F3A]">{layer.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#566070]">{layer.text}</p>
          </article>
        ))}
      </section>

      <section className="mb-12 grid overflow-hidden rounded-[34px] border border-[#D8D2C4] bg-[#FFFDF8] lg:grid-cols-[1.1fr_.9fr]">
        <div className="p-8 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9A6A12]">Interpretation standard</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-[#0B1F3A]">What a TGPI score means</h2>
          <p className="mt-4 text-sm leading-7 text-[#566070]">
            TGPI scores are internal educational comparison signals derived from the platform model. They are not official government statistics, legal determinations or predictions of personal success. Individual dimensions and underlying assumptions matter more than a single total.
          </p>
        </div>
        <div className="bg-[#FFF7DE] p-8 md:p-10">
          <h2 className="font-serif text-3xl font-semibold text-[#0B1F3A]">Research responsibility</h2>
          <p className="mt-4 text-sm leading-7 text-[#566070]">
            Immigration, tax, salary, safety, health and legal information can change quickly. Confirm material decisions with official authorities or qualified professionals.
          </p>
          <Link href="/editorial-policy" className="mt-6 inline-flex rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-black text-white">
            Read the editorial policy
          </Link>
        </div>
      </section>
    </TGPIPageShell>
  );
}
