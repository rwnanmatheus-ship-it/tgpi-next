import Image from "next/image";
import Link from "next/link";
import NavigationIcon from "@/components/navigation/NavigationIcon";

const pillars = [
  { number: "01", title: "Data", label: "Country Intelligence", copy: "Source-linked country context with visible reference years, gaps and limitations.", href: "/countries", icon: "graph", className: "lg:col-span-7" },
  { number: "02", title: "Education", label: "TGPI Learning", copy: "Practical paths that build the communication and decision capability global life requires.", href: "/courses", icon: "book", className: "lg:col-span-5" },
  { number: "03", title: "Mobility", label: "Documents OS", copy: "A preparation layer for evidence categories, verification questions and readiness gaps.", href: "/passport", icon: "file", className: "lg:col-span-5" },
  { number: "04", title: "Decision", label: "Country Fit + Compare", copy: "A transparent system for turning goals, priorities and trade-offs into the next action.", href: "/country-fit", icon: "compass", className: "lg:col-span-7" },
] as const;

export default function HomeEcosystem() {
  return (
    <section className="bg-[var(--tgpi-canvas)] px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="ecosystem-title">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl"><p className="text-[10px] font-extrabold uppercase tracking-[.24em] text-[var(--tgpi-gold-strong)]">One TGPI ecosystem</p><h2 id="ecosystem-title" className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5.5vw,5.1rem)] font-semibold leading-[.93] tracking-[-.05em] text-[var(--tgpi-ink)]">Four capabilities. One connected global life.</h2></div>
          <Link href="/why" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-2xl border border-[var(--tgpi-border)] bg-white px-5 text-sm font-extrabold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)]">Why TGPI exists <NavigationIcon name="arrow" width={17} height={17} /></Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {pillars.map((pillar) => (
            <Link key={pillar.title} href={pillar.href} className={`tgpi-card-3d group relative min-h-[270px] overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] sm:p-8 ${pillar.className}`} data-tgpi-depth="raised" data-tgpi-interactive="true" data-tgpi-tone={pillar.title === "Decision" ? "navy" : pillar.title === "Education" ? "gold" : "white"}>
              <div className="flex items-start justify-between gap-4"><span className="text-[10px] font-extrabold tracking-[.2em] text-[var(--tgpi-gold-strong)] group-data-[tgpi-tone=navy]:text-[var(--tgpi-gold-light)]">{pillar.number} / {pillar.label}</span><span className="grid h-11 w-11 place-items-center rounded-2xl border border-current/10 text-[var(--tgpi-gold-strong)] group-data-[tgpi-tone=navy]:text-[var(--tgpi-gold-light)]"><NavigationIcon name={pillar.icon} /></span></div>
              <h3 className="mt-12 font-[var(--tgpi-font-display)] text-4xl font-semibold text-[var(--tgpi-navy)] group-data-[tgpi-tone=navy]:text-white sm:text-5xl">{pillar.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--tgpi-muted)] group-data-[tgpi-tone=navy]:text-white/58">{pillar.copy}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--tgpi-navy)] group-data-[tgpi-tone=navy]:text-[var(--tgpi-gold-light)]">Enter this capability <NavigationIcon name="arrow" width={17} height={17} className="transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>

        <div className="mt-5 grid overflow-hidden rounded-[32px] border border-[var(--tgpi-border)] bg-white shadow-[var(--tgpi-shadow-premium)] lg:grid-cols-[.88fr_1.12fr]">
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
            <Image src="/images/home/tgpi-documents-story.webp" alt="TGPI documents and global identity preparation workspace" fill quality={86} sizes="(max-width:1023px) 100vw, 560px" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(3,20,38,.93))]" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#031426]/78 p-5 text-white backdrop-blur-xl sm:inset-x-7 sm:bottom-7">
              <p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[var(--tgpi-gold-light)]">Documents + identity continuity</p><p className="mt-2 font-[var(--tgpi-font-display)] text-3xl font-semibold">Preparation that stays connected.</p>
            </div>
          </div>
          <div className="p-6 sm:p-9 lg:p-12">
            <p className="text-[10px] font-extrabold uppercase tracking-[.24em] text-[var(--tgpi-gold-strong)]">Documents OS + Global Key</p>
            <h3 className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-[.96] text-[var(--tgpi-ink)] sm:text-5xl">From intention to evidence. From progress to proof.</h3>
            <p className="mt-5 text-base leading-8 text-[var(--tgpi-muted)]">Organize what needs verification, build capability around the gaps and carry your connected TGPI progress through one global identity.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[{ icon: "file" as const, title: "Documents OS", copy: "Preparation categories, readiness and official checks.", href: "/passport" }, { icon: "key" as const, title: "Global Key", copy: "Connected identity and verifiable progress continuity.", href: "/global-key" }, { icon: "certificate" as const, title: "Certificates", copy: "Credential evidence linked to completed capability.", href: "/certificates" }, { icon: "shield" as const, title: "Verification", copy: "Public routes for checking issued TGPI credentials.", href: "/verify" }].map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-2xl border border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] p-4 transition hover:border-[var(--tgpi-gold)] hover:bg-white"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--tgpi-navy)] text-[var(--tgpi-gold-light)]"><NavigationIcon name={item.icon} width={19} height={19} /></span><h4 className="mt-4 font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)]">{item.title}</h4><p className="mt-2 text-xs leading-6 text-[var(--tgpi-muted)]">{item.copy}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[var(--tgpi-navy)]">Open <NavigationIcon name="arrow" width={15} height={15} className="transition group-hover:translate-x-1" /></span></Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
