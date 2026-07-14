import type { ReactNode } from "react";
import TGPIEditorialVisual from "@/components/TGPIEditorialVisual";

export default function CompareLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="bg-[#F8F5EE] px-5 pt-8 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-[#D8D2C4] bg-[#0B1F3A] shadow-[0_30px_90px_rgba(11,31,58,0.18)]">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="flex flex-col justify-center p-7 text-white md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.26em] text-[#F0D58C]">
                TGPI Country Comparator
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Compare trade-offs before committing to a destination.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#D7DFEA]">
                Cost, safety, language, lifestyle, adaptation and strategic fit belong in the same decision view.
              </p>
            </div>

            <TGPIEditorialVisual
              variant="compare"
              id="compare-route-banner"
              ariaLabel="Authorial TGPI country comparison illustration"
              className="min-h-[340px]"
            />
          </div>
        </div>
      </section>
      {children}
    </>
  );
}
