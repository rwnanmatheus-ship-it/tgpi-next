import type { Metadata } from "next";
import Link from "next/link";
import TGPIEditorialVisual, {
  type TGPIVisualVariant,
} from "@/components/TGPIEditorialVisual";
import TGPIPageShell from "@/components/TGPIPageShell";
import { buildMetadata } from "@/seo";

export const metadata: Metadata = buildMetadata({
  title: "Global Mobility Guides and Resources",
  description:
    "Explore TGPI frameworks for comparing countries, building global capabilities, preparing documents and making stronger international decisions.",
  path: "/resources",
});

const resources: Array<{
  title: string;
  meta: string;
  description: string;
  variant: TGPIVisualVariant;
  href: string;
}> = [
  {
    title: "How to develop a global decision mindset",
    meta: "Framework · 8 min read",
    description: "Learn how to compare international choices without reducing them to popularity, aesthetics or isolated numbers.",
    variant: "compare",
    href: "/compare",
  },
  {
    title: "The capabilities international life requires",
    meta: "Learning guide · 11 min",
    description: "Understand the role of language, career, budget, adaptation, documents and timing in international readiness.",
    variant: "readiness",
    href: "/courses",
  },
  {
    title: "Documents, translation and international preparation",
    meta: "Practical guide · 14 min",
    description: "See how official documents, sworn translation and preparation fit into a broader international plan.",
    variant: "documents",
    href: "/premium-waitlist",
  },
];

export default function ResourcesPage() {
  return (
    <TGPIPageShell>
      <section className="overflow-hidden rounded-[42px] border border-[#D8D2C4] bg-[#FFFDF8] shadow-[0_38px_100px_rgba(11,31,58,0.11)]">
        <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9A6A12]">
              TGPI Resources
            </p>
            <h1 className="mt-5 max-w-2xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#0B0B0B] md:text-7xl">
              Intelligence designed to improve the next decision.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#566070]">
              Frameworks, guides and practical materials connecting country intelligence, global readiness, learning and document preparation.
            </p>
          </div>

          <TGPIEditorialVisual
            variant="learning"
            id="resources-hero"
            ariaLabel="Authorial TGPI global learning and resources illustration"
            className="min-h-[520px]"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <Link
              href={resource.href}
              key={resource.title}
              className="group overflow-hidden rounded-[30px] border border-[#D8D2C4] bg-white shadow-[0_24px_70px_rgba(11,31,58,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(11,31,58,0.14)]"
            >
              <TGPIEditorialVisual
                variant={resource.variant}
                id={`resource-${index}`}
                ariaLabel={`${resource.title} authorial TGPI illustration`}
                className="aspect-[16/10] w-full transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9A6A12]">
                  {resource.meta}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#0B1F3A]">
                  {resource.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#566070]">
                  {resource.description}
                </p>
                <p className="mt-5 text-sm font-black text-[#0B1F3A] transition group-hover:text-[#B58A2A]">
                  Explore resource →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16 grid overflow-hidden rounded-[38px] border border-[#D8D2C4] bg-[#0B1F3A] text-white shadow-[0_34px_100px_rgba(11,31,58,0.2)] lg:grid-cols-[1fr_0.92fr]">
        <div className="p-8 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F0D58C]">
            Apply what you learn
          </p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Move from reading to a structured international plan.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#D7DFEA]">
            Create a profile, compare countries and identify the readiness gaps that matter most for your objective.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-2xl bg-[#B58A2A] px-6 py-4 text-sm font-black text-[#0B0B0B] transition hover:bg-[#C79B36]"
          >
            Create Free Account
          </Link>
        </div>

        <TGPIEditorialVisual
          variant="premium"
          id="resources-cta"
          ariaLabel="Authorial TGPI action plan illustration"
          className="min-h-[480px]"
        />
      </section>
    </TGPIPageShell>
  );
}
