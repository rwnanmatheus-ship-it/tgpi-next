import type { Metadata } from "next";
import Link from "next/link";
import TGPIEditorialVisual from "@/components/TGPIEditorialVisual";
import TGPIPageShell from "@/components/TGPIPageShell";
import WhyTGPIIsDifferent from "@/components/WhyTGPIIsDifferent";
import { buildMetadata } from "@/seo";

export const metadata: Metadata = buildMetadata({
  title: "Why TGPI — Evidence Before International Decisions",
  description:
    "Discover why TGPI connects country comparison, education, documents and readiness instead of treating international life as inspiration alone.",
  path: "/why",
});

export default function WhyPage() {
  return (
    <TGPIPageShell>
      <section className="overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_38px_100px_rgba(11,31,58,0.11)]">
        <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9A6A12]">
              Why TGPI
            </p>
            <h1 className="mt-5 max-w-2xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#0B0B0B] md:text-7xl">
              International decisions deserve more than inspiration.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#566070]">
              TGPI combines education, global intelligence, readiness and practical planning so people can understand trade-offs before choosing where and how to build an international life.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/compare"
                className="rounded-2xl bg-[#0B1F3A] px-6 py-4 text-center text-sm font-black text-white transition hover:bg-[#132B4C]"
              >
                Compare Countries
              </Link>
              <Link
                href="/about"
                className="rounded-2xl border border-[#B58A2A] bg-[#FFF7DE] px-6 py-4 text-center text-sm font-black text-[#6F4908] transition hover:bg-[#F7E8BA]"
              >
                About the Institute
              </Link>
            </div>
          </div>

          <TGPIEditorialVisual
            variant="compare"
            id="why-hero"
            ariaLabel="Authorial TGPI strategic comparison illustration"
            className="min-h-[540px]"
          />
        </div>
      </section>

      <section className="py-14">
        <WhyTGPIIsDifferent />
      </section>

      <section className="mb-16 grid overflow-hidden rounded-[38px] border border-[#D8D2C4] bg-[#0B1F3A] text-white shadow-[0_34px_100px_rgba(11,31,58,0.2)] lg:grid-cols-[1fr_0.92fr]">
        <div className="p-8 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F0D58C]">
            TGPI principle
          </p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Clarity comes from filtering, not following.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#D7DFEA]">
            The most popular destination may not fit your budget, language, profession, family structure, timeline or preferred way of life. TGPI makes those trade-offs visible.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex rounded-2xl bg-[#B58A2A] px-6 py-4 text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36]"
          >
            Explore TGPI Membership
          </Link>
        </div>

        <TGPIEditorialVisual
          variant="readiness"
          id="why-readiness"
          ariaLabel="Authorial TGPI readiness and planning illustration"
          className="min-h-[500px]"
        />
      </section>
    </TGPIPageShell>
  );
}
