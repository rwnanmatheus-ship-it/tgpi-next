import type { Metadata } from "next";
import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import TGPIPageShell from "@/components/TGPIPageShell";
import { buildMetadata } from "@/seo";
import JsonLd from "@/seo/json-ld";
import { buildFounderSchema, founderName } from "@/seo/schemas/founder";

export const metadata: Metadata = buildMetadata({
  absoluteTitle: true,
  title: `${founderName} — Founder of TGPI`,
  description:
    "Meet Renan Matheus da Silva Fernandes, founder of TGPI — The Global Polymath Institute and builder of its global education and decision-intelligence platform.",
  path: "/founder",
});

const founderPrinciples = [
  {
    title: "Practical education",
    text: "Knowledge should improve a real decision, capability or next action.",
  },
  {
    title: "Global adaptability",
    text: "International life requires language, judgment, preparation and the ability to keep learning.",
  },
  {
    title: "Evidence before aspiration",
    text: "Countries and opportunities should be compared through visible trade-offs, not aesthetics or popularity alone.",
  },
] as const;

export default function FounderPage() {
  return (
    <TGPIPageShell>
      <JsonLd data={buildFounderSchema()} />
      <Breadcrumbs
        items={[
          { name: "TGPI", path: "/" },
          { name: "About", path: "/about" },
          { name: founderName, path: "/founder" },
        ]}
      />

      <section className="mt-6 overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_38px_100px_rgba(11,31,58,0.11)]">
        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="p-8 md:p-12 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9A6A12]">
              Founder · TGPI
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#0B0B0B] md:text-7xl">
              {founderName}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#566070]">
              Founder of TGPI — The Global Polymath Institute, an independent platform being built to connect country intelligence, practical education, international preparation and better global decisions.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#566070]">
              Renan leads the product direction, software architecture, brand system and educational vision of TGPI. The work is centered on turning fragmented international information into a connected system people can use to compare, prepare, learn and act with greater clarity.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className="rounded-2xl bg-[#0B1F3A] px-6 py-4 text-center text-sm font-black text-white transition hover:bg-[#132B4C]"
              >
                About the Institute
              </Link>
              <Link
                href="/countries"
                className="rounded-2xl border border-[#B58A2A] bg-[#FFF7DE] px-6 py-4 text-center text-sm font-black text-[#6F4908] transition hover:bg-[#F7E8BA]"
              >
                Explore TGPI Countries
              </Link>
            </div>
          </div>

          <div className="flex min-h-[420px] items-center justify-center bg-[radial-gradient(circle_at_50%_34%,rgba(197,150,50,0.22),transparent_34%),linear-gradient(145deg,#071A32,#0B2442)] p-12">
            <BrandCrest
              width={1041}
              height={1274}
              sizes="(max-width: 1024px) 48vw, 360px"
              className="h-auto w-full max-w-[360px] drop-shadow-[0_34px_70px_rgba(0,0,0,0.38)]"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 py-14 md:grid-cols-3" aria-label="Founder principles">
        {founderPrinciples.map((principle, index) => (
          <article
            key={principle.title}
            className="rounded-[28px] border border-[#D8D2C4] bg-white p-7 shadow-[0_20px_55px_rgba(11,31,58,0.07)]"
          >
            <p className="text-xs font-black tracking-[0.2em] text-[#9A6A12]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#0B1F3A]">
              {principle.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#566070]">
              {principle.text}
            </p>
          </article>
        ))}
      </section>
    </TGPIPageShell>
  );
}
