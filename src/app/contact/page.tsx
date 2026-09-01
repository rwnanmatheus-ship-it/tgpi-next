import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import TGPIPageShell from "@/components/TGPIPageShell";
import { buildMetadata, TGPI_CONTACT_EMAIL } from "@/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact TGPI",
  description:
    "Contact TGPI — The Global Polymath Institute about the platform, research corrections, partnerships or support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <TGPIPageShell>
      <Breadcrumbs
        items={[
          { name: "TGPI", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <section className="mt-6 grid overflow-hidden rounded-[40px] border border-[#D8D2C4] bg-white shadow-[0_34px_100px_rgba(11,31,58,0.12)] lg:grid-cols-[1.05fr_.95fr]">
        <div className="p-8 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9A6A12]">Contact TGPI</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#0B1F3A] md:text-7xl">
            Start with a clear subject.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#566070]">
            Contact The Global Polymath Institute for platform support, research corrections, institutional partnerships or business enquiries.
          </p>
          <a
            href={`mailto:${TGPI_CONTACT_EMAIL}`}
            className="mt-8 inline-flex rounded-2xl bg-[#0B1F3A] px-6 py-4 text-sm font-black text-white"
          >
            {TGPI_CONTACT_EMAIL}
          </a>
        </div>
        <div className="bg-[#0B1F3A] p-8 text-white md:p-12">
          <h2 className="font-serif text-3xl font-semibold">Include these details</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-[#D7DFEA]">
            <li>• Your name and the purpose of the message.</li>
            <li>• The relevant TGPI page or account area.</li>
            <li>• Supporting source links for research corrections.</li>
            <li>• Company and proposal context for partnerships.</li>
          </ul>
        </div>
      </section>
    </TGPIPageShell>
  );
}
