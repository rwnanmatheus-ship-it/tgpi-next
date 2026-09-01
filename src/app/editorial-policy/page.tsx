import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import TGPIPageShell from "@/components/TGPIPageShell";
import { buildMetadata } from "@/seo";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy and Research Standards",
  description:
    "How TGPI researches, reviews, updates and communicates country intelligence, educational content and international decision guidance.",
  path: "/editorial-policy",
});

const standards = [
  {
    title: "Purpose before publication",
    text: "Every page must answer a real user question or support a useful product action. TGPI does not publish pages solely to increase search volume.",
  },
  {
    title: "Source transparency",
    text: "Facts that can materially affect a legal, financial, migration, education, safety or health decision should be connected to an identifiable and appropriate source whenever the data is published as current guidance.",
  },
  {
    title: "Dates and change",
    text: "International rules and local conditions change. Review dates describe a real editorial check; they are not automatically refreshed to create an appearance of freshness.",
  },
  {
    title: "Separation of fact and model",
    text: "Official facts, third-party estimates and TGPI scoring or decision models must be clearly distinguished. A TGPI score is an educational comparison signal, not an official national ranking.",
  },
  {
    title: "Corrections",
    text: "Material errors should be corrected promptly. Readers can report a concern through the TGPI contact channel with the affected URL and supporting source.",
  },
  {
    title: "Responsible limitations",
    text: "TGPI provides education and decision intelligence. It does not replace official authorities or qualified legal, financial, medical, tax or immigration professionals.",
  },
] as const;

export default function EditorialPolicyPage() {
  return (
    <TGPIPageShell>
      <Breadcrumbs
        items={[
          { name: "TGPI", path: "/" },
          { name: "Editorial policy", path: "/editorial-policy" },
        ]}
      />

      <header className="mt-6 rounded-[38px] bg-[#0B1F3A] p-8 text-white shadow-[0_34px_100px_rgba(11,31,58,0.2)] md:p-12">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F0D58C]">
          TGPI Research Standard
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
          Editorial policy and research standards.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D7DFEA]">
          TGPI is building a global knowledge system in which usefulness, traceability and clear limitations matter more than publishing volume.
        </p>
      </header>

      <section className="grid gap-5 py-12 md:grid-cols-2" aria-label="Editorial standards">
        {standards.map((standard, index) => (
          <article key={standard.title} className="rounded-[28px] border border-[#D8D2C4] bg-white p-7">
            <p className="text-xs font-black tracking-[0.2em] text-[#9A6A12]">
              STANDARD {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#0B1F3A]">
              {standard.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#566070]">{standard.text}</p>
          </article>
        ))}
      </section>

      <section className="mb-12 rounded-[30px] border border-[#D8D2C4] bg-[#FFF7DE] p-8">
        <h2 className="font-serif text-3xl font-semibold text-[#0B1F3A]">Report a correction</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#566070]">
          Send the page URL, the information you believe is incorrect and a reliable supporting source. TGPI will review the concern against the scope and evidence available.
        </p>
        <Link href="/contact" className="mt-6 inline-flex rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-black text-white">
          Contact TGPI
        </Link>
      </section>
    </TGPIPageShell>
  );
}
