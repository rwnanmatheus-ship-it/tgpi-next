import Image from "next/image";

export type TGPIVisualVariant =
  | "hero"
  | "england"
  | "portugal"
  | "canada"
  | "spain"
  | "egypt"
  | "readiness"
  | "documents"
  | "learning"
  | "premium"
  | "compare";

type TGPIEditorialVisualProps = {
  variant: TGPIVisualVariant;
  id: string;
  className?: string;
  ariaLabel?: string;
  showContext?: boolean;
};

type VisualConfig = {
  src: string;
  alt: string;
  objectPosition: string;
  context: string;
  pressure: string;
};

const visualConfig: Record<TGPIVisualVariant, VisualConfig> = {
  hero: {
    src: "https://images.unsplash.com/photo-1680664841163-ce9936f231a5?auto=format&fit=crop&w=2200&q=88",
    alt: "International traveler preparing luggage inside a real airport terminal",
    objectPosition: "50% 42%",
    context: "International life is built before departure",
    pressure: "Country · Cost · Career · Documents",
  },
  england: {
    src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=88",
    alt: "London skyline and historic English architecture",
    objectPosition: "center",
    context: "Opportunity comes with pressure",
    pressure: "Education · Cost · Competition",
  },
  portugal: {
    src: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1800&q=88",
    alt: "Historic Lisbon street and Portuguese architecture",
    objectPosition: "center",
    context: "Lifestyle fit needs income reality",
    pressure: "Rent · Income · Adaptation",
  },
  canada: {
    src: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1800&q=88",
    alt: "Toronto skyline representing Canadian international opportunity",
    objectPosition: "center",
    context: "Career access needs housing strategy",
    pressure: "Work · Housing · Entry path",
  },
  spain: {
    src: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1800&q=88",
    alt: "Spanish urban architecture and public life",
    objectPosition: "center",
    context: "The right city changes the decision",
    pressure: "Language · Cost · Lifestyle",
  },
  egypt: {
    src: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1800&q=88",
    alt: "Egyptian landscape and architecture representing a modern international life decision",
    objectPosition: "center",
    context: "A country is more than its postcard",
    pressure: "Culture · Infrastructure · Fit",
  },
  readiness: {
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=88",
    alt: "Real planning desk with documents, calculator and financial preparation",
    objectPosition: "center",
    context: "Unprepared details become expensive delays",
    pressure: "Budget · Timeline · Evidence",
  },
  documents: {
    src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1800&q=88",
    alt: "Official documents and financial paperwork prepared for review",
    objectPosition: "center",
    context: "One missing document can stop the process",
    pressure: "Translation · Validation · Deadline",
  },
  learning: {
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1800&q=88",
    alt: "Real library environment representing practical international learning",
    objectPosition: "center",
    context: "Preparation reduces avoidable mistakes",
    pressure: "Knowledge · Skills · Execution",
  },
  premium: {
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1800&q=88",
    alt: "Professional workspace used to plan an international future",
    objectPosition: "center",
    context: "Turn uncertainty into an executable plan",
    pressure: "Compare · Prepare · Progress",
  },
  compare: {
    src: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1800&q=88",
    alt: "World map used to compare international destinations and trade-offs",
    objectPosition: "center",
    context: "Do not choose a country from one attractive signal",
    pressure: "Cost · Culture · Career · Mobility",
  },
};

export default function TGPIEditorialVisual({
  variant,
  id,
  className = "",
  ariaLabel,
  showContext = true,
}: TGPIEditorialVisualProps) {
  const visual = visualConfig[variant];
  const accessibleLabel = ariaLabel?.toLowerCase().includes("authorial")
    ? visual.alt
    : ariaLabel ?? visual.alt;

  return (
    <div
      className={`group relative isolate overflow-hidden bg-[#0B1F3A] ${className}`}
      role="img"
      aria-label={accessibleLabel}
      data-visual-id={id}
    >
      <Image
        src={visual.src}
        alt=""
        fill
        priority={variant === "hero"}
        quality={88}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"
        className="object-cover saturate-[0.82] contrast-[1.06] brightness-[0.93] transition duration-700 ease-out group-hover:scale-[1.025] group-hover:saturate-[0.92]"
        style={{ objectPosition: visual.objectPosition }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,58,0.05)_0%,rgba(11,31,58,0.14)_45%,rgba(7,20,38,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,255,255,0.2),transparent_34%)]" />

      {variant !== "hero" && showContext && (
        <div className="absolute inset-x-5 bottom-5 z-10 rounded-[22px] border border-white/18 bg-[#071426]/72 px-5 py-4 text-white shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-md md:inset-x-6 md:bottom-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F0D58C]">
            Real-world decision pressure
          </p>
          <p className="mt-2 font-serif text-xl font-semibold leading-tight md:text-2xl">
            {visual.context}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.15em] text-[#D8E0EA]">
            {visual.pressure}
          </p>
        </div>
      )}
    </div>
  );
}
