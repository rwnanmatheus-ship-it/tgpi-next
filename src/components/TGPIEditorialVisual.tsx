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
};

const palette = {
  offWhite: "#F8F5EE",
  paper: "#FFFDF8",
  navy: "#0B1F3A",
  navySoft: "#173451",
  gold: "#B58A2A",
  goldLight: "#E6CF91",
  ink: "#0B0B0B",
  stone: "#D8D2C4",
  mist: "#E9E2D5",
  white: "#FFFFFF",
};

export default function TGPIEditorialVisual({
  variant,
  id,
  className = "",
  ariaLabel = "TGPI editorial illustration",
}: TGPIEditorialVisualProps) {
  const safeId = id.replace(/[^a-zA-Z0-9-_]/g, "");

  return (
    <div
      className={`relative overflow-hidden bg-[#0B1F3A] ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${safeId}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={palette.paper} />
            <stop offset="0.54" stopColor="#E9D8B6" />
            <stop offset="1" stopColor="#AC8751" />
          </linearGradient>
          <linearGradient id={`${safeId}-night`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#173451" />
            <stop offset="1" stopColor="#071426" />
          </linearGradient>
          <linearGradient id={`${safeId}-water`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8DA2B5" />
            <stop offset="1" stopColor="#23445F" />
          </linearGradient>
          <radialGradient id={`${safeId}-sun`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#FFF6D7" stopOpacity="1" />
            <stop offset="0.45" stopColor="#E7C574" stopOpacity="0.72" />
            <stop offset="1" stopColor="#E7C574" stopOpacity="0" />
          </radialGradient>
          <pattern id={`${safeId}-grid`} width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M42 0H0V42" fill="none" stroke={palette.goldLight} strokeOpacity="0.14" />
          </pattern>
          <filter id={`${safeId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#071426" floodOpacity="0.24" />
          </filter>
        </defs>

        {variant === "hero" && <HeroScene prefix={safeId} />}
        {variant === "england" && <EnglandScene prefix={safeId} />}
        {variant === "portugal" && <PortugalScene prefix={safeId} />}
        {variant === "canada" && <CanadaScene prefix={safeId} />}
        {variant === "spain" && <SpainScene prefix={safeId} />}
        {variant === "egypt" && <EgyptScene prefix={safeId} />}
        {variant === "readiness" && <ReadinessScene prefix={safeId} />}
        {variant === "documents" && <DocumentsScene prefix={safeId} />}
        {variant === "learning" && <LearningScene prefix={safeId} />}
        {variant === "premium" && <PremiumScene prefix={safeId} />}
        {variant === "compare" && <CompareScene prefix={safeId} />}
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(11,31,58,0.08))]" />
    </div>
  );
}

function HeroScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-sky)`} />
      <circle cx="250" cy="210" r="220" fill={`url(#${prefix}-sun)`} />
      <path d="M0 520C160 470 300 500 440 455C590 408 680 442 830 410C990 375 1080 395 1200 350V800H0Z" fill="#CBB68C" opacity="0.56" />
      <path d="M0 565C210 520 330 560 500 510C660 463 790 505 940 462C1045 433 1135 438 1200 430V800H0Z" fill={palette.navySoft} opacity="0.36" />
      <River prefix={prefix} y={575} />
      <CitySkyline y={505} tone="light" />
      <AcademicDome x={675} y={350} scale={1.15} />
      <Bridge x={260} y={555} width={430} />
      <ArchitectureFrame side="right" />
      <Person x={1035} y={520} scale={1.08} />
      <Globe x={1090} y={640} scale={0.9} />
      <Books x={965} y={692} scale={0.95} />
      <path d="M0 735H1200V800H0Z" fill={palette.navy} />
      <path d="M0 735H1200" stroke={palette.gold} strokeWidth="3" opacity="0.55" />
    </>
  );
}

function EnglandScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-sky)`} />
      <circle cx="930" cy="185" r="180" fill={`url(#${prefix}-sun)`} />
      <River prefix={prefix} y={560} />
      <Bridge x={350} y={542} width={520} />
      <CitySkyline y={490} tone="light" />
      <AcademicDome x={310} y={322} scale={1.4} />
      <ClockTower x={870} y={335} scale={1.2} />
      <path d="M0 640C220 600 420 630 610 596C800 560 1000 592 1200 548V800H0Z" fill={palette.navy} opacity="0.82" />
      <path d="M0 640C260 612 490 642 710 600C930 560 1080 580 1200 555" fill="none" stroke={palette.goldLight} strokeWidth="3" opacity="0.42" />
      <rect x="55" y="65" width="1090" height="670" rx="42" fill="none" stroke={palette.paper} strokeOpacity="0.18" strokeWidth="2" />
    </>
  );
}

function PortugalScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-sky)`} />
      <circle cx="910" cy="210" r="210" fill={`url(#${prefix}-sun)`} />
      <rect y="445" width="1200" height="355" fill={`url(#${prefix}-water)`} />
      <SuspensionBridge x={520} y={405} width={520} />
      <HillTown x={20} y={390} />
      <AcademicDome x={280} y={310} scale={0.95} />
      <path d="M0 690C215 642 420 670 610 628C830 580 1030 620 1200 560V800H0Z" fill={palette.navy} opacity="0.8" />
      <path d="M1050 0C1028 130 1038 220 1004 338C980 422 1000 520 964 800H1200V0Z" fill="#071426" opacity="0.78" />
      <g fill={palette.goldLight} opacity="0.66">
        <circle cx="1048" cy="130" r="26" />
        <circle cx="1098" cy="186" r="36" />
        <circle cx="1030" cy="246" r="32" />
        <circle cx="1125" cy="294" r="44" />
      </g>
    </>
  );
}

function CanadaScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-sky)`} />
      <circle cx="210" cy="210" r="220" fill={`url(#${prefix}-sun)`} />
      <rect y="470" width="1200" height="330" fill={`url(#${prefix}-water)`} />
      <CitySkyline y={430} tone="modern" />
      <CnTower x={455} y={190} scale={1.18} />
      <ellipse cx="340" cy="474" rx="115" ry="34" fill={palette.paper} opacity="0.7" />
      <path d="M0 645C170 620 350 660 520 635C740 602 960 635 1200 590V800H0Z" fill={palette.navy} opacity="0.86" />
      <g stroke={palette.goldLight} strokeOpacity="0.35">
        <path d="M110 510V710" />
        <path d="M255 500V710" />
        <path d="M400 490V710" />
      </g>
      <Person x={1010} y={525} scale={0.9} />
    </>
  );
}

function SpainScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-sky)`} />
      <circle cx="870" cy="185" r="195" fill={`url(#${prefix}-sun)`} />
      <path d="M0 520L1200 430V800H0Z" fill="#C8B18B" />
      <PlazaArchitecture x={75} y={300} />
      <ClockTower x={690} y={280} scale={1.05} />
      <path d="M0 670C250 635 470 675 690 628C920 580 1060 610 1200 575V800H0Z" fill={palette.navy} opacity="0.84" />
      <g fill={palette.gold} opacity="0.68">
        <rect x="180" y="475" width="12" height="110" rx="6" />
        <rect x="240" y="460" width="12" height="125" rx="6" />
        <rect x="300" y="490" width="12" height="95" rx="6" />
      </g>
      <Person x={990} y={510} scale={0.92} />
    </>
  );
}

function EgyptScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-sky)`} />
      <circle cx="225" cy="185" r="230" fill={`url(#${prefix}-sun)`} />
      <rect y="520" width="1200" height="280" fill={`url(#${prefix}-water)`} />
      <CitySkyline y={450} tone="light" />
      <Pyramid x={620} y={305} size={230} />
      <Pyramid x={790} y={350} size={170} />
      <Pyramid x={510} y={385} size={125} />
      <Minaret x={270} y={275} scale={1.08} />
      <path d="M0 655C240 610 450 665 650 628C870 588 1040 615 1200 570V800H0Z" fill={palette.navy} opacity="0.84" />
      <Person x={1035} y={520} scale={0.9} />
    </>
  );
}

function ReadinessScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-night)`} />
      <rect x="55" y="52" width="1090" height="696" rx="42" fill="#301F16" stroke={palette.gold} strokeOpacity="0.45" strokeWidth="2" />
      <rect x="82" y="80" width="1036" height="642" rx="28" fill="#4B3526" />
      <rect x="105" y="105" width="990" height="590" fill={`url(#${prefix}-grid)`} opacity="0.62" />
      <MapSheet x={115} y={125} />
      <Laptop x={720} y={115} />
      <Passport x={505} y={410} />
      <Planner x={255} y={420} />
      <ChartSheet x={700} y={455} />
      <Globe x={165} y={225} scale={0.72} />
      <Compass x={970} y={535} />
      <path d="M590 315C650 290 705 286 760 304" fill="none" stroke={palette.goldLight} strokeWidth="5" strokeLinecap="round" opacity="0.78" />
    </>
  );
}

function DocumentsScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-night)`} />
      <rect x="40" y="70" width="1120" height="670" rx="42" fill="#3D2A1F" />
      <rect x="75" y="105" width="1050" height="600" rx="28" fill="#523725" stroke={palette.gold} strokeOpacity="0.34" />
      <Document x={170} y={165} rotate={-4} />
      <Document x={430} y={130} rotate={3} />
      <Document x={670} y={200} rotate={-2} />
      <Folder x={120} y={500} />
      <Passport x={650} y={505} />
      <Stamp x={900} y={485} />
      <Globe x={1010} y={250} scale={0.72} />
      <g fill={palette.goldLight} opacity="0.42">
        <circle cx="225" cy="390" r="28" />
        <circle cx="500" cy="360" r="24" />
        <circle cx="750" cy="430" r="30" />
      </g>
    </>
  );
}

function LearningScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-night)`} />
      <rect x="0" y="0" width="1200" height="800" fill={`url(#${prefix}-grid)`} opacity="0.32" />
      <Bookshelf x={40} y={60} width={430} />
      <rect x="515" y="95" width="610" height="420" rx="16" fill={palette.paper} opacity="0.95" />
      <rect x="535" y="115" width="570" height="380" fill={`url(#${prefix}-sky)`} />
      <CitySkyline y={420} tone="light" />
      <AcademicDome x={800} y={290} scale={0.85} />
      <rect x="400" y="555" width="700" height="175" rx="24" fill="#2D2019" />
      <rect x="455" y="590" width="300" height="95" rx="12" fill={palette.paper} />
      <path d="M470 632C530 610 600 610 735 632" fill="none" stroke={palette.stone} strokeWidth="4" />
      <Books x={835} y={625} scale={1.25} />
      <Globe x={1035} y={585} scale={0.78} />
      <circle cx="480" cy="575" r="12" fill={palette.gold} />
    </>
  );
}

function PremiumScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-night)`} />
      <circle cx="1020" cy="90" r="260" fill={palette.gold} opacity="0.1" />
      <rect x="95" y="85" width="1010" height="630" rx="40" fill="#102947" stroke={palette.gold} strokeOpacity="0.46" strokeWidth="2" filter={`url(#${prefix}-shadow)`} />
      <rect x="130" y="125" width="940" height="75" rx="18" fill="#F8F5EE" />
      <circle cx="175" cy="162" r="18" fill={palette.gold} />
      <rect x="215" y="145" width="250" height="18" rx="9" fill={palette.navy} />
      <rect x="215" y="174" width="180" height="10" rx="5" fill={palette.stone} />
      <rect x="130" y="230" width="285" height="190" rx="24" fill={palette.paper} />
      <rect x="445" y="230" width="285" height="190" rx="24" fill={palette.paper} />
      <rect x="760" y="230" width="310" height="190" rx="24" fill={palette.paper} />
      <MetricCard x={160} y={265} labelWidth={90} valueWidth={160} progress={0.84} />
      <MetricCard x={475} y={265} labelWidth={120} valueWidth={120} progress={0.67} />
      <MetricCard x={790} y={265} labelWidth={110} valueWidth={180} progress={0.74} />
      <rect x="130" y="450" width="600" height="220" rx="24" fill={palette.paper} />
      <NetworkMap x={170} y={485} />
      <rect x="760" y="450" width="310" height="220" rx="24" fill="#FFF7DE" stroke={palette.gold} strokeOpacity="0.5" />
      <path d="M800 515H1030M800 555H990M800 595H1015" stroke={palette.navy} strokeWidth="14" strokeLinecap="round" opacity="0.78" />
      <circle cx="810" cy="640" r="11" fill={palette.gold} />
      <path d="M835 640H990" stroke={palette.gold} strokeWidth="8" strokeLinecap="round" />
    </>
  );
}

function CompareScene({ prefix }: { prefix: string }) {
  return (
    <>
      <rect width="1200" height="800" fill={`url(#${prefix}-night)`} />
      <rect width="1200" height="800" fill={`url(#${prefix}-grid)`} opacity="0.35" />
      <circle cx="1040" cy="140" r="260" fill={palette.gold} opacity="0.1" />
      <ComparisonPanel x={95} y={160} accent="#D5B15B" score="84" />
      <ComparisonPanel x={445} y={115} accent="#F8F5EE" score="78" />
      <ComparisonPanel x={795} y={175} accent="#A5BCD2" score="72" />
      <path d="M255 610C410 530 525 550 600 480C690 397 795 460 950 350" fill="none" stroke={palette.goldLight} strokeWidth="7" strokeLinecap="round" opacity="0.78" />
      <circle cx="255" cy="610" r="14" fill={palette.gold} />
      <circle cx="600" cy="480" r="14" fill={palette.gold} />
      <circle cx="950" cy="350" r="14" fill={palette.gold} />
    </>
  );
}

function River({ prefix, y }: { prefix: string; y: number }) {
  return <path d={`M0 ${y}C250 ${y - 35} 470 ${y + 32} 700 ${y - 4}C900 ${y - 36} 1040 ${y + 20} 1200 ${y - 12}V800H0Z`} fill={`url(#${prefix}-water)`} />;
}

function CitySkyline({ y, tone }: { y: number; tone: "light" | "modern" }) {
  const fill = tone === "modern" ? palette.navySoft : "#7C735F";
  return (
    <g fill={fill} opacity={tone === "modern" ? 0.92 : 0.72}>
      <rect x="85" y={y - 70} width="55" height="70" />
      <rect x="150" y={y - 110} width="70" height="110" />
      <rect x="230" y={y - 55} width="48" height="55" />
      <rect x="292" y={y - 145} width="66" height="145" />
      <rect x="370" y={y - 90} width="52" height="90" />
      <rect x="438" y={y - 190} width="78" height="190" />
      <rect x="530" y={y - 120} width="62" height="120" />
      <path d={`M615 ${y}V${y - 215}L650 ${y - 260}L685 ${y - 215}V${y}Z`} />
      <rect x="710" y={y - 155} width="70" height="155" />
      <rect x="795" y={y - 95} width="56" height="95" />
      <path d={`M875 ${y}V${y - 180}L910 ${y - 220}L945 ${y - 180}V${y}Z`} />
      <rect x="970" y={y - 130} width="70" height="130" />
      <rect x="1055" y={y - 75} width="55" height="75" />
    </g>
  );
}

function AcademicDome({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-82" y="86" width="164" height="118" fill="#B9A47B" />
      <path d="M-95 88H95L78 70H-78Z" fill={palette.paper} opacity="0.82" />
      <path d="M-66 68C-62 5 62 5 66 68Z" fill="#D6C7A7" />
      <path d="M-54 67C-48 18 48 18 54 67" fill="none" stroke={palette.gold} strokeWidth="5" opacity="0.7" />
      <rect x="-7" y="-24" width="14" height="40" fill={palette.navy} />
      <circle cx="0" cy="-30" r="8" fill={palette.gold} />
      {[-55, -20, 20, 55].map((column) => <rect key={column} x={column - 7} y="106" width="14" height="80" fill={palette.paper} opacity="0.7" />)}
    </g>
  );
}

function ClockTower({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-40" y="40" width="80" height="220" fill="#82745E" />
      <path d="M-50 45L0 -35L50 45Z" fill={palette.navy} />
      <circle cx="0" cy="92" r="25" fill={palette.paper} stroke={palette.gold} strokeWidth="5" />
      <path d="M0 92L0 76M0 92L14 99" stroke={palette.navy} strokeWidth="4" strokeLinecap="round" />
      <rect x="-17" y="145" width="34" height="65" fill={palette.navy} opacity="0.6" />
    </g>
  );
}

function Bridge({ x, y, width }: { x: number; y: number; width: number }) {
  return (
    <g stroke={palette.paper} strokeOpacity="0.48" fill="none">
      <path d={`M${x} ${y}H${x + width}`} strokeWidth="12" />
      <path d={`M${x + 20} ${y}Q${x + width / 2} ${y - 90} ${x + width - 20} ${y}`} strokeWidth="7" />
      {[0.12, 0.32, 0.52, 0.72, 0.9].map((ratio) => <path key={ratio} d={`M${x + width * ratio} ${y - 4}V${y + 45}`} strokeWidth="4" />)}
    </g>
  );
}

function SuspensionBridge({ x, y, width }: { x: number; y: number; width: number }) {
  return (
    <g fill="none" stroke={palette.navy} strokeOpacity="0.58">
      <path d={`M${x} ${y}H${x + width}`} strokeWidth="8" />
      <path d={`M${x + 70} ${y}V${y - 150}M${x + width - 70} ${y}V${y - 150}`} strokeWidth="11" />
      <path d={`M${x + 70} ${y - 145}C${x + width * 0.35} ${y - 30} ${x + width * 0.65} ${y - 30} ${x + width - 70} ${y - 145}`} strokeWidth="5" />
      {[0.18, 0.3, 0.42, 0.58, 0.7, 0.82].map((ratio) => <path key={ratio} d={`M${x + width * ratio} ${y - 5}V${y - 72}`} strokeWidth="3" />)}
    </g>
  );
}

function HillTown({ x, y }: { x: number; y: number }) {
  const houses = Array.from({ length: 26 }, (_, index) => index);
  return (
    <g transform={`translate(${x} ${y})`}>
      {houses.map((index) => {
        const column = index % 9;
        const row = Math.floor(index / 9);
        const houseX = column * 66 + row * 20;
        const houseY = row * 68 - column * 7;
        return (
          <g key={index} transform={`translate(${houseX} ${houseY})`}>
            <rect width="52" height="45" fill={index % 3 === 0 ? "#E9D6B1" : index % 3 === 1 ? "#C9B58F" : "#F1E7D3"} />
            <path d="M-4 0L26 -20L56 0Z" fill="#9A6035" />
            <rect x="10" y="17" width="8" height="12" fill={palette.navy} opacity="0.55" />
            <rect x="33" y="17" width="8" height="12" fill={palette.navy} opacity="0.55" />
          </g>
        );
      })}
    </g>
  );
}

function PlazaArchitecture({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="520" height="250" fill="#B9A47B" />
      <path d="M-25 0H545L510 -45H10Z" fill={palette.paper} opacity="0.8" />
      {Array.from({ length: 9 }, (_, index) => (
        <g key={index} transform={`translate(${25 + index * 56} 45)`}>
          <rect width="28" height="160" fill={palette.paper} opacity="0.72" />
          <path d="M-6 160H34L28 185H0Z" fill={palette.navy} opacity="0.35" />
        </g>
      ))}
    </g>
  );
}

function CnTower({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={palette.navy}>
      <path d="M-12 310L-5 40H5L12 310Z" />
      <rect x="-38" y="105" width="76" height="28" rx="14" />
      <rect x="-28" y="135" width="56" height="16" rx="8" />
      <rect x="-2" y="0" width="4" height="50" />
    </g>
  );
}

function Minaret({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-28" y="80" width="56" height="220" fill="#9C8864" />
      <rect x="-44" y="68" width="88" height="18" fill={palette.paper} opacity="0.7" />
      <path d="M-26 68L0 0L26 68Z" fill={palette.navy} />
      <circle cx="0" cy="-6" r="8" fill={palette.gold} />
      <rect x="-12" y="130" width="24" height="54" fill={palette.navy} opacity="0.55" />
    </g>
  );
}

function Pyramid({ x, y, size }: { x: number; y: number; size: number }) {
  return <path d={`M${x} ${y + size}L${x + size / 2} ${y}L${x + size} ${y + size}Z`} fill="#C8A66B" stroke={palette.paper} strokeOpacity="0.3" strokeWidth="3" />;
}

function Person({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={palette.navy}>
      <circle cx="0" cy="-72" r="28" />
      <path d="M-38 -35C-29 -58 29 -58 38 -35L30 98H-30Z" />
      <path d="M-26 86L-18 190H-2L4 90ZM26 86L18 190H2L-4 90Z" />
      <path d="M-38 -18L-72 88L-53 95L-18 0ZM38 -18L68 80L50 89L18 0Z" />
      <path d="M-30 -22L0 12L30 -22" fill="none" stroke={palette.goldLight} strokeWidth="4" opacity="0.65" />
    </g>
  );
}

function Globe({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="0" r="54" fill={palette.navy} stroke={palette.gold} strokeWidth="6" />
      <ellipse cx="0" cy="0" rx="27" ry="54" fill="none" stroke={palette.goldLight} strokeOpacity="0.75" strokeWidth="3" />
      <path d="M-48 -22H48M-52 0H52M-48 22H48" stroke={palette.goldLight} strokeOpacity="0.62" strokeWidth="3" />
      <path d="M0 54V86M-34 92H34" stroke={palette.gold} strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

function Books({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="100" height="20" rx="5" fill="#6C4427" />
      <rect x="12" y="-24" width="92" height="20" rx="5" fill={palette.navy} />
      <rect x="5" y="-48" width="96" height="20" rx="5" fill="#8A6A38" />
      <path d="M18 -38H86M25 -14H92M16 10H82" stroke={palette.goldLight} strokeWidth="3" opacity="0.62" />
    </g>
  );
}

function ArchitectureFrame({ side }: { side: "right" | "left" }) {
  const transform = side === "right" ? "translate(960 0)" : "translate(0 0)";
  return (
    <g transform={transform}>
      <rect width="240" height="800" fill="#8D7759" opacity="0.74" />
      {[20, 84, 148, 212].map((x) => <rect key={x} x={x} y="0" width="28" height="690" fill="#D7C6A4" opacity="0.72" />)}
      <path d="M0 690H240V800H0Z" fill="#6D5A43" />
      <path d="M0 80H240M0 680H240" stroke={palette.goldLight} strokeOpacity="0.48" strokeWidth="5" />
    </g>
  );
}

function MapSheet({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="520" height="260" rx="18" fill="#F1E7D3" transform="rotate(-3 260 130)" />
      <path d="M80 135C145 70 240 80 300 125C355 166 410 150 455 104" fill="none" stroke={palette.navy} strokeWidth="18" strokeLinecap="round" opacity="0.36" />
      <path d="M55 65H465M55 105H465M55 185H465M55 225H465" stroke={palette.gold} strokeOpacity="0.2" />
    </g>
  );
}

function Laptop({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="310" height="205" rx="18" fill="#C6C9CD" />
      <rect x="18" y="18" width="274" height="160" rx="8" fill={palette.navy} />
      <path d="M54 142L105 92L150 120L205 64L260 105" fill="none" stroke={palette.goldLight} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M-25 205H335L292 240H18Z" fill="#9DA3AA" />
    </g>
  );
}

function Passport({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="150" height="200" rx="16" fill={palette.navy} stroke={palette.gold} strokeWidth="4" />
      <circle cx="75" cy="92" r="34" fill="none" stroke={palette.goldLight} strokeWidth="5" />
      <path d="M44 92H106M75 58V126M54 68C68 83 68 102 54 116M96 68C82 83 82 102 96 116" stroke={palette.goldLight} strokeWidth="3" fill="none" />
      <path d="M35 155H115M48 171H102" stroke={palette.gold} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Planner({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="230" height="220" rx="18" fill={palette.paper} />
      <path d="M115 0V220" stroke={palette.stone} strokeWidth="4" />
      {[48, 82, 116, 150, 184].map((line) => <path key={line} d={`M25 ${line}H95M135 ${line}H205`} stroke={palette.navySoft} strokeOpacity="0.46" strokeWidth="6" strokeLinecap="round" />)}
      {[48, 82, 116, 150].map((line) => <circle key={line} cx="22" cy={line} r="5" fill={palette.gold} />)}
    </g>
  );
}

function ChartSheet({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="295" height="195" rx="18" fill={palette.paper} />
      <path d="M35 150V40M35 150H260" stroke={palette.navy} strokeWidth="5" />
      {[70, 115, 160, 205].map((bar, index) => <rect key={bar} x={bar} y={150 - (index + 2) * 22} width="26" height={(index + 2) * 22} fill={index % 2 === 0 ? palette.gold : palette.navySoft} opacity="0.82" />)}
      <circle cx="232" cy="62" r="28" fill="none" stroke={palette.gold} strokeWidth="11" strokeDasharray="65 130" transform="rotate(-40 232 62)" />
    </g>
  );
}

function Compass({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="62" fill="#261B16" stroke={palette.gold} strokeWidth="7" />
      <circle r="43" fill="none" stroke={palette.goldLight} strokeOpacity="0.45" strokeWidth="3" />
      <path d="M0 -45L14 0L0 45L-14 0Z" fill={palette.goldLight} />
      <path d="M-45 0L0 14L45 0L0 -14Z" fill={palette.gold} opacity="0.7" />
    </g>
  );
}

function Document({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} 115 150)`}>
      <rect width="230" height="300" rx="12" fill={palette.paper} stroke={palette.goldLight} strokeWidth="4" />
      <path d="M40 55H190M40 88H175M40 126H190M40 160H160M40 198H190" stroke={palette.navySoft} strokeOpacity="0.5" strokeWidth="7" strokeLinecap="round" />
      <circle cx="175" cy="245" r="28" fill="none" stroke={palette.gold} strokeWidth="8" />
      <path d="M45 250H125" stroke={palette.navy} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Folder({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 30H115L145 0H350V190H0Z" fill={palette.navy} stroke={palette.gold} strokeWidth="4" />
      <path d="M55 95H292M55 125H250" stroke={palette.goldLight} strokeWidth="7" strokeLinecap="round" opacity="0.72" />
    </g>
  );
}

function Stamp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-38 30C-35 -25 35 -25 38 30L25 95H-25Z" fill="#2D211A" stroke={palette.gold} strokeWidth="5" />
      <rect x="-72" y="92" width="144" height="35" rx="10" fill={palette.gold} />
      <rect x="-82" y="125" width="164" height="26" rx="8" fill={palette.navy} />
    </g>
  );
}

function Bookshelf({ x, y, width }: { x: number; y: number; width: number }) {
  const shelfY = [0, 150, 300, 450, 600];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={width} height="680" rx="18" fill="#2D2019" stroke={palette.gold} strokeOpacity="0.35" />
      {shelfY.map((level) => <rect key={level} x="20" y={level + 115} width={width - 40} height="12" fill="#765235" />)}
      {Array.from({ length: 30 }, (_, index) => {
        const row = Math.floor(index / 6);
        const column = index % 6;
        const bookHeight = 74 + (index % 3) * 14;
        return <rect key={index} x={35 + column * 61} y={128 + row * 150 - bookHeight} width="42" height={bookHeight} rx="4" fill={index % 3 === 0 ? palette.navy : index % 3 === 1 ? "#6D442A" : "#8C6E3D"} />;
      })}
    </g>
  );
}

function MetricCard({ x, y, labelWidth, valueWidth, progress }: { x: number; y: number; labelWidth: number; valueWidth: number; progress: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={labelWidth} height="9" rx="4.5" fill={palette.stone} />
      <rect y="33" width={valueWidth} height="27" rx="8" fill={palette.navy} />
      <rect y="95" width="220" height="15" rx="7.5" fill={palette.mist} />
      <rect y="95" width={220 * progress} height="15" rx="7.5" fill={palette.gold} />
    </g>
  );
}

function NetworkMap({ x, y }: { x: number; y: number }) {
  const points = [
    [20, 75], [95, 25], [165, 95], [235, 35], [310, 115], [390, 45], [480, 100],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M10 130C110 10 250 180 500 38" fill="none" stroke={palette.stone} strokeWidth="24" strokeLinecap="round" opacity="0.35" />
      {points.slice(0, -1).map((point, index) => <path key={index} d={`M${point[0]} ${point[1]}L${points[index + 1][0]} ${points[index + 1][1]}`} stroke={palette.gold} strokeWidth="5" opacity="0.7" />)}
      {points.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r={index % 2 === 0 ? 13 : 10} fill={index % 2 === 0 ? palette.navy : palette.gold} />)}
    </g>
  );
}

function ComparisonPanel({ x, y, accent, score }: { x: number; y: number; accent: string; score: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="310" height="430" rx="28" fill="#102947" stroke={accent} strokeOpacity="0.7" strokeWidth="3" />
      <circle cx="155" cy="96" r="53" fill={accent} opacity="0.18" />
      <circle cx="155" cy="96" r="38" fill="none" stroke={accent} strokeWidth="10" strokeDasharray={`${Number(score) * 2.4} 240`} transform="rotate(-90 155 96)" />
      <path d="M95 182H215M72 228H238M72 278H238M72 328H238" stroke={palette.paper} strokeOpacity="0.56" strokeWidth="12" strokeLinecap="round" />
      <path d="M72 228H${72 + Number(score) * 1.65}" stroke={accent} strokeWidth="12" strokeLinecap="round" />
      <path d="M72 278H${72 + Number(score) * 1.35}" stroke={accent} strokeWidth="12" strokeLinecap="round" />
      <path d="M72 328H${72 + Number(score) * 1.5}" stroke={accent} strokeWidth="12" strokeLinecap="round" />
      <rect x="72" y="372" width="166" height="20" rx="10" fill={accent} opacity="0.75" />
    </g>
  );
}
