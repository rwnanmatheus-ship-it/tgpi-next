import Link from "next/link";
import TGPIEditorialVisual from "@/components/TGPIEditorialVisual";
import TGPIPageShell from "@/components/TGPIPageShell";

const pillars = [
  ["Data", "Organize relevant signals before a major international decision."],
  ["Education", "Transform information into practical understanding and capability."],
  ["Mobility", "Connect countries, readiness, documents and international pathways."],
  ["Decision", "Help users compare trade-offs instead of following popularity alone."],
] as const;

export default function AboutPage() {
  return (
    <TGPIPageShell>
      <section className="overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_38px_100px_rgba(11,31,58,0.11)]">
        <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9A6A12]">
              About TGPI
            </p>
            <h1 className="mt-5 max-w-2xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#0B0B0B] md:text-7xl">
              Practical intelligence for a global life.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#566070]">
              The Global Polymath Institute is being built as an education and decision platform for people who want to compare countries, develop practical capabilities and prepare international moves with greater clarity.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/countries"
                className="rounded-2xl bg-[#0B1F3A] px-6 py-4 text-center text-sm font-black text-white transition hover:bg-[#132B4C]"
              >
                Explore Countries
              </Link>
              <Link
                href="/pricing"
                className="rounded-2xl border border-[#B58A2A] bg-[#FFF7DE] px-6 py-4 text-center text-sm font-black text-[#6F4908] transition hover:bg-[#F7E8BA]"
              >
                Explore Membership
              </Link>
            </div>
          </div>

          <TGPIEditorialVisual
            variant="hero"
            id="about-hero"
            ariaLabel="Authorial TGPI institute and global intelligence illustration"
            className="min-h-[560px]"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9A6A12]">
            The institutional model
          </p>
          <h2 className="mt-5 font-serif text-4xl font-semibold tracking-[-0.04em] text-[#0B0B0B] md:text-6xl">
            More than content. A connected decision system.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#566070]">
            TGPI combines country intelligence, readiness, practical learning, personal planning and document preparation under one consistent global framework.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(([title, description]) => (
            <article
              key={title}
              className="rounded-[28px] border border-[#D8D2C4] bg-white p-6 shadow-[0_18px_55px_rgba(11,31,58,0.06)]"
            >
              <p className="font-serif text-3xl font-semibold text-[#0B1F3A]">{title}</p>
              <p className="mt-4 text-sm leading-7 text-[#566070]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16 grid overflow-hidden rounded-[38px] border border-[#D8D2C4] bg-[#0B1F3A] text-white shadow-[0_34px_100px_rgba(11,31,58,0.2)] lg:grid-cols-[1fr_0.92fr]">
        <div className="p-8 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F0D58C]">
            Brand posture
          </p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Calm authority instead of aggressive promises.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#D7DFEA]">
            TGPI does not promise perfect countries, guaranteed visas, guaranteed jobs or effortless relocation. It organizes evidence, trade-offs and preparation so users can make more informed decisions.
          </p>
          <Link
            href="/why"
            className="mt-8 inline-flex rounded-2xl bg-[#B58A2A] px-6 py-4 text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36]"
          >
            Why TGPI Is Different
          </Link>
        </div>

        <TGPIEditorialVisual
          variant="learning"
          id="about-institute"
          ariaLabel="Authorial TGPI academic institute illustration"
          className="min-h-[500px]"
        />
      </section>
    </TGPIPageShell>
  );
}
